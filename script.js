// =========================================
// 1. LOADER & UI INITIALIZATION
// =========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => { 
        loader.style.display = 'none'; 
    }, 500);
});

// =========================================
// 2. MENU MOBILE (HAMBURGER)
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const menuOverlay = document.getElementById('menu-overlay');

function toggleMenu() { 
    navLinks.classList.toggle('active'); 
    hamburger.classList.toggle('active'); 
    if (menuOverlay) menuOverlay.classList.toggle('active');
}

function closeMenu() { 
    navLinks.classList.remove('active'); 
    hamburger.classList.remove('active'); 
    if (menuOverlay) menuOverlay.classList.remove('active');
}

hamburger.addEventListener('click', toggleMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

// =========================================
// 3. AOS ANIMATION LIBRARY INIT
// =========================================
AOS.init({ 
    duration: 800, 
    once: true, 
    offset: 50 
});

// =========================================
// 4. FOOTER YEAR AUTO-UPDATE
// =========================================
document.getElementById('year').textContent = new Date().getFullYear();