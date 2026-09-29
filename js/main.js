(function () {
  var items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var status = btn.parentNode.querySelector('.copied');
      navigator.clipboard.writeText(btn.dataset.copy).then(function () {
        status.textContent = 'Copied';
        setTimeout(function () { status.textContent = ''; }, 2000);
      });
    });
  });

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // Address pill: shows the path of the section in the middle of the screen (sections carry data-path).
  var where = document.querySelector('[data-where]');
  var pathed = document.querySelectorAll('main section[data-path]');
  var setWhere = null;
  if (where && pathed.length) {
    var pill = where.closest('.where');
    var spyLinks = document.querySelectorAll('.nav a[data-spy]');
    setWhere = function (section) {
      var path = section.getAttribute('data-path');
      where.textContent = path;
      pill.classList.toggle('root', !path);
      pill.setAttribute('href', '#' + section.id);
      spyLinks.forEach(function (a) {
        if (a.getAttribute('data-spy') === section.id) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    };
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) setWhere(e.target); });
      }, { rootMargin: '-40% 0px -55% 0px' });
      pathed.forEach(function (s) { spy.observe(s); });
    }
  }

  // Sticky bar: a hairline appears once the page has scrolled. At the very bottom, the last section
  // wins even if it's too short to reach the middle of a tall screen.
  var bar = document.getElementById('bar');
  if (bar) {
    var onScroll = function () {
      bar.classList.toggle('scrolled', window.scrollY > 4);
      if (setWhere && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setWhere(pathed[pathed.length - 1]);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Menu sheet (phones and tablets).
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (menuBtn && menu) {
    var setMenu = function (open) {
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? 'Close' : 'Menu';
      document.body.classList.toggle('menu-open', open);
      if (open) { var first = menu.querySelector('a'); if (first) first.focus(); }
    };
    menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); }
    });
    var wide = window.matchMedia('(min-width: 1025px)');
    if (wide.addEventListener) wide.addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }
})();
