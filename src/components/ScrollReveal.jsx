import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in', 'fade'
  delay = 0, // delay in ms
  duration = 600, // duration in ms
  threshold = 0.12,
  className = '',
  once = true,
  style = {},
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px', // trigger slightly before it reaches the viewport
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, once]);

  // Determine initial and active transform/opacity styles based on animation type
  const getTransformStyle = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      };
    }

    switch (animation) {
      case 'fade-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 32px, 0)',
        };
      case 'fade-down':
        return {
          opacity: 0,
          transform: 'translate3d(0, -32px, 0)',
        };
      case 'fade-left':
        return {
          opacity: 0,
          transform: 'translate3d(36px, 0, 0)',
        };
      case 'fade-right':
        return {
          opacity: 0,
          transform: 'translate3d(-36px, 0, 0)',
        };
      case 'zoom-in':
        return {
          opacity: 0,
          transform: 'scale(0.92) translate3d(0, 16px, 0)',
        };
      case 'fade':
      default:
        return {
          opacity: 0,
          transform: 'none',
        };
    }
  };

  const transformStyle = getTransformStyle();

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-element ${className}`}
      style={{
        ...style,
        ...transformStyle,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

