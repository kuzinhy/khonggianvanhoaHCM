import { useEffect } from 'react';

/**
 * Hook tự động kích hoạt hiệu ứng xuất hiện (fade-in, slide-up, scale)
 * cho các thành phần mang class `scroll-reveal`, `scroll-reveal-scale`,
 * `scroll-reveal-left`, `scroll-reveal-right` khi người dùng cuộn chuột.
 */
export function useScrollReveal(deps: React.DependencyList = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Kiểm tra hỗ trợ IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll('.scroll-reveal, .scroll-reveal-scale, .scroll-reveal-left, .scroll-reveal-right')
        .forEach((el) => el.classList.add('revealed'));
      return;
    }

    const checkAndReveal = () => {
      const elements = document.querySelectorAll(
        '.scroll-reveal:not(.revealed), .scroll-reveal-scale:not(.revealed), .scroll-reveal-left:not(.revealed), .scroll-reveal-right:not(.revealed)'
      );

      const triggerBottom = window.innerHeight + 120;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerBottom && rect.bottom >= -50) {
          el.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '160px 0px 100px 0px',
      }
    );

    const observeElements = () => {
      checkAndReveal();
      const elements = document.querySelectorAll(
        '.scroll-reveal:not(.revealed), .scroll-reveal-scale:not(.revealed), .scroll-reveal-left:not(.revealed), .scroll-reveal-right:not(.revealed)'
      );
      elements.forEach((el) => observer.observe(el));
    };

    // Chạy ngay khi mount
    observeElements();
    const t1 = setTimeout(observeElements, 80);
    const t2 = setTimeout(observeElements, 250);

    // Lắng nghe thêm sự kiện cuộn với rAF để hỗ trợ người dùng cuộn nhanh / kéo thanh cuộn
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkAndReveal();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, deps);
}
