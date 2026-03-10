// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links li a');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations (Intersection Observer)
const observers = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            
            // If it's the skills section, animate the bars
            if (entry.target.id === 'skills') {
                const skillBars = document.querySelectorAll('.skill-bar .bar span');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    // Reset to 0 then set to target width to trigger CSS transition
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll('.fade-in').forEach((el) => {
    observers.observe(el);
});

// Lightbox Implementation
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');
const projectImages = document.querySelectorAll('.project-image');
const prevBtn = document.querySelector('.prev-lightbox');
const nextBtn = document.querySelector('.next-lightbox');
const lightboxLinkBtn = document.getElementById('lightbox-link');

let currentGallery = [];
let currentIndex = 0;

function openLightbox(gallery, link = null) {
    currentGallery = gallery;
    currentIndex = 0;
    updateLightboxImage();
    
    if (lightboxLinkBtn) {
        if (link && link !== "#" && link !== "") {
            lightboxLinkBtn.href = link;
            lightboxLinkBtn.style.display = 'inline-flex';
        } else {
            lightboxLinkBtn.style.display = 'none';
        }
    }

    lightbox.classList.add('active');
    
    if(currentGallery.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
}

projectImages.forEach(img => {
    img.style.cursor = 'pointer'; // indicates it's clickable
    
    img.addEventListener('click', () => {
        const imagesData = img.getAttribute('data-images');
        let gallery = [];
        if (imagesData) {
            gallery = imagesData.split(',').map(s => s.trim());
        } else {
            // Fallback to single image if data-images isn't set
            gallery = [img.src];
        }
        openLightbox(gallery, null);
    });
});

// Certificates Lightbox
const certificateItems = document.querySelectorAll('.certificate-item');
certificateItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const img = item.querySelector('img');
        if (!img) return;
        
        let linkHref = item.getAttribute('href');
        if (linkHref === '#') {
            linkHref = null;
        }

        openLightbox([img.src], linkHref);
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Close when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

function updateLightboxImage() {
    lightboxImg.src = currentGallery[currentIndex];
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? currentGallery.length - 1 : currentIndex - 1;
    updateLightboxImage();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === currentGallery.length - 1) ? 0 : currentIndex + 1;
    updateLightboxImage();
});
