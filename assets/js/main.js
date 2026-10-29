/* Ghani — Portfolio · vanilla JS, no dependencies */
(function () {
  document.documentElement.classList.remove('no-js');

  /* Header background on scroll */
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 30); };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile nav */
  var toggle = document.querySelector('.nav__toggle');
  toggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    a.addEventListener('click', function () {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Reveal on scroll */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* Gallery filters */
  var filters = document.querySelectorAll('.filter');
  var items = document.querySelectorAll('.masonry figure');
  function applyFilter(cat) {
    filters.forEach(function (f) { f.setAttribute('aria-pressed', f.dataset.filter === cat); });
    items.forEach(function (it) { it.classList.toggle('hidden', cat !== 'all' && it.dataset.cat !== cat); });
  }
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () { applyFilter(btn.dataset.filter); });
  });
  /* TOC / service links like #work?filter=branding */
  document.querySelectorAll('[data-goto-filter]').forEach(function (a) {
    a.addEventListener('click', function () { applyFilter(a.dataset.gotoFilter); });
  });

  /* Lightbox */
  var lb = document.querySelector('.lightbox');
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('.lb__caption');
  var lbCount = lb.querySelector('.lb__count');
  var group = [], index = 0, lastFocus = null;

  function visibleLinks(groupName) {
    return Array.prototype.filter.call(document.querySelectorAll('[data-lightbox="' + groupName + '"]'), function (a) {
      return !a.closest('figure.hidden');
    });
  }
  function show(i) {
    index = (i + group.length) % group.length;
    var a = group[index];
    lbImg.src = a.getAttribute('href');
    lbImg.alt = a.querySelector('img').alt;
    lbCap.innerHTML = '';
    var t = document.createElement('span'); t.textContent = a.dataset.title || '';
    var c = document.createElement('small'); c.textContent = a.dataset.client || '';
    lbCap.appendChild(c); lbCap.appendChild(t);
    lbCount.textContent = (index + 1) + ' / ' + group.length;
    /* preload neighbours */
    [index + 1, index - 1].forEach(function (n) {
      var b = group[(n + group.length) % group.length]; if (b) { var im = new Image(); im.src = b.getAttribute('href'); }
    });
  }
  function open(a) {
    group = visibleLinks(a.dataset.lightbox);
    lastFocus = document.activeElement;
    show(group.indexOf(a));
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb__close').focus();
  }
  function close() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-lightbox]');
    if (a) { e.preventDefault(); open(a); }
  });
  lb.querySelector('.lb__close').addEventListener('click', close);
  lb.querySelector('.lb__prev').addEventListener('click', function () { show(index - 1); });
  lb.querySelector('.lb__next').addEventListener('click', function () { show(index + 1); });
  lb.addEventListener('click', function (e) { if (e.target.classList.contains('lb__stage')) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'Tab') { /* simple focus trap */
      var f = lb.querySelectorAll('button'); var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  /* swipe */
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1)); x0 = null;
  });

  /* Year */
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
