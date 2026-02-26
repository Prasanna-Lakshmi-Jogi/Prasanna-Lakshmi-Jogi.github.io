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
