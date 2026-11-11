@echo off
title KSPPS PMA - Build Produksi
echo ========================================================
echo  KSPPS PERAMBABULAN MAKMUR ABADI - BUILD PRODUCTION
echo ========================================================
echo.
echo Melakukan kompilasi ke folder dist...
npm.cmd run build
echo.
echo Selesai! Website siap diakses via XAMPP di:
echo - Beranda: http://localhost/ksppspma/
echo - Portal Admin: http://localhost/ksppspma/adminkspps
pause

