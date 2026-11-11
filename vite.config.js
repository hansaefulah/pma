import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function viteBackendPlugin() {
  return {
    name: 'vite-backend-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';

        // 1. DATABASE SYNC ENDPOINT: /api/data or /api/data.php
        if (url === '/api/data' || url === '/api/data.php' || url === '/data.php') {
          const dbFile = path.resolve(__dirname, 'data/database.json');
          const targetFiles = [
            dbFile,
            path.resolve(__dirname, 'public/data/database.json'),
            path.resolve(__dirname, 'dist/data/database.json'),
          ];

          if (req.method === 'GET') {
            for (const f of targetFiles) {
              if (fs.existsSync(f)) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(fs.readFileSync(f, 'utf-8'));
                return;
              }
            }
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Database not initialized.' }));
            return;
          }

          if (req.method === 'POST') {
            const chunks = [];
            req.on('data', (chunk) => chunks.push(chunk));
            req.on('end', () => {
              try {
                const body = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
                let currentDb = {};
                if (fs.existsSync(dbFile)) {
                  try {
                    currentDb = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
                  } catch (e) {}
                }

                if (body.key && body.data !== undefined) {
                  currentDb[body.key] = body.data;
                } else {
                  for (const k of Object.keys(body)) {
                    currentDb[k] = body[k];
                  }
                }

                const jsonStr = JSON.stringify(currentDb, null, 2);
                for (const f of targetFiles) {
                  const dir = path.dirname(f);
                  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                  fs.writeFileSync(f, jsonStr, 'utf-8');
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Data synced successfully to database.json' }));
              } catch (e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: e.message }));
              }
            });
            return;
          }
        }

        // 2. FILE UPLOAD ENDPOINT: /api/upload or /api/upload.php
        if ((url === '/api/upload' || url === '/api/upload.php' || url === '/upload.php') && req.method === 'POST') {
          const contentType = req.headers['content-type'] || '';
          const chunks = [];

          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              let filename = '';
              let fileData = null;

              if (contentType.includes('application/json')) {
                const body = JSON.parse(buffer.toString('utf-8'));
                filename = body.filename || `upload_${Date.now()}.png`;
                const base64Data = body.base64 ? body.base64.replace(/^data:[^;]+;base64,/, '') : '';
                fileData = Buffer.from(base64Data, 'base64');
              } else if (contentType.includes('multipart/form-data')) {
                const boundary = contentType.split('boundary=')[1]?.trim();
                if (boundary) {
                  const boundaryBuffer = Buffer.from(`--${boundary}`);
                  let start = buffer.indexOf(boundaryBuffer);

                  while (start !== -1) {
                    const nextStart = buffer.indexOf(boundaryBuffer, start + boundaryBuffer.length);
                    const part = nextStart !== -1 ? buffer.slice(start, nextStart) : buffer.slice(start);

                    const headerEndIndex = part.indexOf(Buffer.from('\r\n\r\n'));
                    if (headerEndIndex !== -1) {
                      const headerStr = part.slice(0, headerEndIndex).toString('utf-8');
                      const matchFilename = headerStr.match(/filename="([^"]+)"/i);
                      if (matchFilename) {
                        filename = matchFilename[1];
                        let endOffset = part.length;
                        if (part[endOffset - 1] === 10 && part[endOffset - 2] === 13) endOffset -= 2;
                        fileData = part.slice(headerEndIndex + 4, endOffset);
                        break;
                      }
                    }
                    start = nextStart;
                  }
                }
              }

              if (!filename || !fileData) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Tidak ada file yang ditemukan dalam upload.' }));
                return;
              }

              const ext = path.extname(filename) || '.png';
              const cleanBase = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
              const uniqueFilename = `${Date.now()}_${Math.floor(Math.random() * 900 + 100)}_${cleanBase}${ext}`;

              const targetDirs = [
                path.resolve(__dirname, 'public/uploads'),
                path.resolve(__dirname, 'dist/uploads'),
                path.resolve(__dirname, 'uploads'),
              ];

              for (const dir of targetDirs) {
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }
                fs.writeFileSync(path.join(dir, uniqueFilename), fileData);
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                filename: uniqueFilename,
                url: `./uploads/${uniqueFilename}`,
                message: 'File berhasil diunggah dan disimpan ke folder uploads!'
              }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Gagal memproses file upload: ' + err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteBackendPlugin()],
  base: './',
  server: {
    watch: {
      ignored: [
        '**/data/**',
        '**/public/data/**',
        '**/dist/**',
        '**/uploads/**',
        '**/public/uploads/**',
        '**/database.json',
      ],
    },
  },
});
