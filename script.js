/*
 ═══════════════════════════════════════════
  LifeTimeMemories — Main Script
  Album-based layout with lazy loading
 ═══════════════════════════════════════════
*/

document.addEventListener('DOMContentLoaded', () => {

  const cfg = SITE_CONFIG;

  // ──────────────────────────────────────────
  // 1. POPULATE SITE FROM CONFIG
  // ──────────────────────────────────────────
  document.getElementById('heroName1').textContent = cfg.name1;
  document.getElementById('heroName2').textContent = cfg.name2;
  document.getElementById('heroDate').innerHTML = `❋ ${cfg.weddingDate} ❋`;
  document.getElementById('heroMessage').textContent = cfg.heroMessage;

  document.getElementById('milestoneYears').dataset.target = cfg.milestones.yearsTogther;
  document.getElementById('milestoneHomes').dataset.target = cfg.milestones.homesMade;
  document.getElementById('milestoneChildren').dataset.target = cfg.milestones.childrenRaised;

  document.getElementById('dedicationText').innerHTML = cfg.dedication;
  document.getElementById('dedicationSignName').textContent = cfg.signName;
  document.getElementById('dedicationSignFrom').textContent = cfg.signFrom;


  // ──────────────────────────────────────────
  // 2. BUILD MARRIAGE GALLERY (Eager - no lazy load)
  // ──────────────────────────────────────────
  const marriageAlbum = ALBUMS.marriage;
  const marriageGrid = document.getElementById('marriageGrid');

  marriageAlbum.photos.forEach((file, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item fade-in';
    item.dataset.album = 'marriage';
    item.dataset.index = i;
    item.innerHTML = `
      <img src="images/${marriageAlbum.folder}/${file}"
           alt="పెళ్ళి ఫోటో ${i + 1}">
      <div class="overlay">
        <h4>పెళ్ళి ఫోటో ${i + 1}</h4>
      </div>
    `;
    marriageGrid.appendChild(item);
  });


  // ──────────────────────────────────────────
  // 3. BUILD ALBUM CARDS & SECTIONS
  // ──────────────────────────────────────────
  const otherAlbumKeys = Object.keys(ALBUMS).filter(k => k !== 'marriage');
  const albumCardsContainer = document.getElementById('albumCards');
  const albumSectionsContainer = document.getElementById('albumSections');

  otherAlbumKeys.forEach(key => {
    const album = ALBUMS[key];

    // Album card link
    const card = document.createElement('a');
    card.href = `#album-${album.id}`;
    card.className = 'album-card fade-in';
    card.innerHTML = `
      <div class="album-card-icon">${album.icon}</div>
      <h3 class="album-card-title">${album.title}</h3>
      <p class="album-card-desc">${album.desc}</p>
      <span class="album-card-count">${album.photos.length} ఫోటోలు</span>
    `;
    albumCardsContainer.appendChild(card);

    // Album gallery section (lazy loaded)
    const section = document.createElement('section');
    section.className = 'gallery-section album-gallery';
    section.id = `album-${album.id}`;
    section.innerHTML = `
      <div class="section-header fade-in">
        <p class="section-label">${album.subtitle}</p>
        <h2 class="section-title">${album.title}</h2>
        <p class="section-desc">${album.desc}</p>
        <div class="ornament-line"><span>✦</span></div>
      </div>
      <div class="gallery-grid album-grid" data-album="${key}" data-folder="${album.folder}"></div>
      <div class="back-to-albums">
        <a href="#albums">↑ ఆల్బమ్‌లకు తిరిగి వెళ్ళు </a>
      </div>
    `;
    albumSectionsContainer.appendChild(section);
  });

  // Add album links to nav
  const navLinks = document.getElementById('navLinks');
  const albumsNavItem = navLinks.querySelector('a[href="#albums"]').parentElement;
  otherAlbumKeys.forEach(key => {
    const album = ALBUMS[key];
    const li = document.createElement('li');
    li.className = 'nav-album-link';
    li.innerHTML = `<a href="#album-${album.id}">${album.icon} ${album.title}</a>`;
    albumsNavItem.after(li);
  });


  // ──────────────────────────────────────────
  // 4. LAZY LOAD ALBUM GALLERIES
  // ──────────────────────────────────────────
  const albumGrids = document.querySelectorAll('.album-grid');
  const loadedAlbums = new Set();

  const albumObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const grid = entry.target;
      const albumKey = grid.dataset.album;
      if (loadedAlbums.has(albumKey)) return;
      loadedAlbums.add(albumKey);

      const album = ALBUMS[albumKey];
      album.photos.forEach((file, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-item fade-in';
        item.dataset.album = albumKey;
        item.dataset.index = i;
        item.innerHTML = `
          <img src="images/${album.folder}/${file}"
               alt="${album.title} ${i + 1}"
               loading="lazy">
          <div class="overlay">
            <h4>${album.title} ${i + 1}</h4>
          </div>
        `;
        grid.appendChild(item);
      });

      // Observe new fade-in items
      grid.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
      albumObserver.unobserve(grid);
    });
  }, { rootMargin: '200px 0px' });

  albumGrids.forEach(grid => albumObserver.observe(grid));


  // ──────────────────────────────────────────
  // 5. PRELOADER
  // ──────────────────────────────────────────
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('preloader').classList.add('hidden');
    }, 800);
  });
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 3000);


  // ──────────────────────────────────────────
  // 6. NAVIGATION
  // ──────────────────────────────────────────
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));
  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinksEl.classList.remove('open'));
  });


  // ──────────────────────────────────────────
  // 7. SCROLL FADE-IN OBSERVER
  // ──────────────────────────────────────────
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


  // ──────────────────────────────────────────
  // 8. FLOATING PETALS (hero)
  // ──────────────────────────────────────────
  const hero = document.querySelector('.hero');
  const petalColors = ['var(--rose-blush)', 'var(--golden-light)', 'var(--rose-mist)', 'var(--petal-pink)', 'var(--marigold)'];
  for (let i = 0; i < 15; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = Math.random() * 100 + '%';
    petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
    const size = (5 + Math.random() * 8) + 'px';
    petal.style.width = size;
    petal.style.height = size;
    petal.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    petal.style.setProperty('--dy', (Math.random() * 200 - 100) + 'px');
    petal.style.animationDuration = (6 + Math.random() * 10) + 's';
    petal.style.animationDelay = (Math.random() * 8) + 's';
    hero.appendChild(petal);
  }


  // ──────────────────────────────────────────
  // 9. LIGHTBOX (works across all galleries)
  // ──────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxSub = document.getElementById('lightboxSub');
  const lightboxCounter = document.getElementById('lightboxCounterText');
  let currentLightboxIndex = 0;
  let currentLightboxItems = [];

  function openLightbox(items, index) {
    currentLightboxItems = items;
    currentLightboxIndex = index;
    const item = items[index];
    const img = item.querySelector('img');

    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.display = 'block';
    } else {
      lightboxImg.style.display = 'none';
    }

    const overlay = item.querySelector('.overlay h4');
    lightboxCaption.textContent = overlay ? overlay.textContent : '';
    lightboxSub.textContent = '';
    lightboxCounter.textContent = `${index + 1} / ${items.length}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navLightbox(dir) {
    currentLightboxIndex = (currentLightboxIndex + dir + currentLightboxItems.length) % currentLightboxItems.length;
    openLightbox(currentLightboxItems, currentLightboxIndex);
  }

  // Delegate clicks on all gallery grids
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const grid = item.closest('.gallery-grid');
    if (!grid) return;
    const items = Array.from(grid.querySelectorAll('.gallery-item'));
    const idx = items.indexOf(item);
    if (idx >= 0) openLightbox(items, idx);
  });

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.getElementById('lightboxPrev').addEventListener('click', (e) => { e.stopPropagation(); navLightbox(-1); });
  document.getElementById('lightboxNext').addEventListener('click', (e) => { e.stopPropagation(); navLightbox(1); });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) navLightbox(diff > 0 ? -1 : 1);
  }, { passive: true });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });


  // ──────────────────────────────────────────
  // 10. QUOTES CAROUSEL
  // ──────────────────────────────────────────
  const slides = document.querySelectorAll('.quote-slide');
  const dots = document.querySelectorAll('.quote-dot');
  let currentSlide = 0;
  let quoteInterval;

  function showSlide(idx) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
    currentSlide = idx;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(quoteInterval);
      showSlide(parseInt(dot.dataset.index));
      quoteInterval = setInterval(nextSlide, 6000);
    });
  });

  quoteInterval = setInterval(nextSlide, 6000);


  // ──────────────────────────────────────────
  // 11. MILESTONE COUNTER ANIMATION
  // ──────────────────────────────────────────
  const counters = document.querySelectorAll('.milestone-number:not(.no-count)');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        if (isNaN(target)) return;
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current;
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  // ──────────────────────────────────────────
  // 12. SMOOTH SCROLL
  // ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
