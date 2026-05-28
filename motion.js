const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  document.documentElement.classList.add("motion-ready");

  const revealItems = document.querySelectorAll(
    ".feature-card, .insight-card, .post-card, .method, .article h2, .article-figure, .code-table, .note-block"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));

  const progress = document.querySelector(".read-progress");
  if (progress) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? scrollTop / max : 0})`;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
  }
}
