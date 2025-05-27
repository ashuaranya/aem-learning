document.addEventListener('DOMContentLoaded', () => {
    /* ───────────────────────────────── backdrop (one-time) ─────────────────────────────── */
    const backdrop = document.createElement('div');
    backdrop.className = 'inpagenavigation-backdrop';
    document.body.appendChild(backdrop);

    /* ───────────────────────────────── useful nodes ────────────────────────────────────── */
    const toggleBtn = document.querySelector('.inpagenavigation-dropdown__menu-title'); // button
    const menuWrap = document.querySelector('.inpagenavigation-dropdown__menu'); // outer wrapper
    const menuPanel = document.querySelector('.inpagenavigation-dropdown__menu-container'); // collapsible panel
    const menuLinks = menuPanel.querySelectorAll('a.navigation-links'); // links inside dropdown
    const allLinks = document.querySelectorAll('.navigation-links'); // desktop + mobile
    const stickyNav = document.querySelector('.inpagenavigation');

    /* ───────────────────────────────── open / close helpers ───────────────────────────── */
    const openMenu = () => {
        menuWrap.classList.add('active');
        backdrop.classList.add('show');

        /* ARIA updates */
        toggleBtn.setAttribute('aria-expanded', 'true');
        menuPanel.setAttribute('aria-hidden', 'false');
        menuPanel.inert = false;

        /* keyboard focus into first menu item */
        menuLinks[0]?.focus();
    };

    const closeMenu = () => {
        menuWrap.classList.remove('active');
        backdrop.classList.remove('show');

        toggleBtn.setAttribute('aria-expanded', 'false');
        menuPanel.setAttribute('aria-hidden', 'true');
        menuPanel.inert = true;

        /* return focus to the button */
        toggleBtn.focus();
    };

    /* initialise as closed */
    closeMenu();

    /* ───────────────────────────────── dropdown toggle ────────────────────────────────── */
    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        menuWrap.classList.contains('active') ? closeMenu() : openMenu();
    });

    /* ESC key inside panel closes it */
    menuPanel.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    /* click on backdrop closes it */
    backdrop.addEventListener('click', closeMenu);

    /* click outside dropdown (desktop area) closes it */
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.inpagenavigation-dropdown__menu') &&
            menuWrap.classList.contains('active')) {
            closeMenu();
        }
    });

    /* ───────────────────────────────── scrolling & active state ───────────────────────── */
    const scrollWithOffset = (targetEl) => {
        const navH = stickyNav?.getBoundingClientRect().height || 0;
        const y = targetEl.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (!target) return;

            /* highlight active link in both menus */
            allLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            scrollWithOffset(target);
            /* If you ever want it to close on click again, call closeMenu() here */

        });
    });
});