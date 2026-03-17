function initMobileNav() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (!hamburger || !navLinks) return;
    if (hamburger.dataset.bound === "true") return;

    hamburger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        navLinks.classList.toggle("active");
    });

    hamburger.dataset.bound = "true";
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNav);
} else {
    initMobileNav();
}

const headerPlaceholder = document.getElementById("header-placeholder");
if (headerPlaceholder) {
    const observer = new MutationObserver(() => {
        initMobileNav();
    });
    observer.observe(headerPlaceholder, { childList: true, subtree: true });
}

function smoothScrollTo(target, duration) {
    const startY = window.pageYOffset;
    const targetY = target.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);
        window.scrollTo(0, startY + distance * eased);
        if (elapsed < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    smoothScrollTo(target, 1100);
});
