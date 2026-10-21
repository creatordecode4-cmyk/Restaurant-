/* Kashi Thaal: page banana + scroll animation. Content ke liye js/data.js dekho. */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) { return; }
  var doc = document;
  var root = doc.documentElement;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function get(path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pad(n) { return (n < 10 ? "00" : n < 100 ? "0" : "") + n; }

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canAnimate = !reduced && window.gsap && window.ScrollTrigger;
  if (canAnimate) { root.classList.add("js"); } else { root.classList.add("static"); }

  /* ---------- 1. Text + links bind ---------- */
  $$("[data-bind]").forEach(function (el) {
    var v = get(el.getAttribute("data-bind"));
    if (v != null) { el.textContent = v; }
  });
  var waUrl = "https://wa.me/" + S.whatsappNumber + "?text=" + encodeURIComponent(S.whatsappMessage);
  var dirUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(S.addressOneLine);
  $$("[data-wa]").forEach(function (a) { a.href = waUrl; a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-tel]").forEach(function (a) { a.href = "tel:" + S.phoneTel; });
  $$("[data-ig]").forEach(function (a) { a.href = S.instagramUrl; });
  $$("[data-dir]").forEach(function (a) { a.href = dirUrl; });
  $("#addrLines").innerHTML = S.addressLines.map(esc).join("<br>");
  $("#year").textContent = new Date().getFullYear();
  $("#heroBeat1").innerHTML = '<p class="beat">' + esc(S.hero.beats[0].title) + "<em>" + esc(S.hero.beats[0].text) + "</em></p>";
  $("#heroBeat2").innerHTML = '<p class="beat">' + esc(S.hero.beats[1].title) + "<em>" + esc(S.hero.beats[1].text) + "</em></p>";

  /* ---------- 2. SEO ---------- */
  doc.title = S.seo.title;
  function meta(sel, attr, val) { var m = $(sel); if (m) { m.setAttribute(attr, val); } }
  meta('meta[name="description"]', "content", S.seo.description);
  meta('meta[property="og:title"]', "content", S.seo.title);
  meta('meta[property="og:description"]', "content", S.seo.description);
  var ld = doc.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: S.name,
    description: S.seo.description,
    url: S.url,
    image: new URL(S.seo.ogImage, location.href).href,
    telephone: S.phoneTel,
    servesCuisine: S.seo.cuisine,
    priceRange: S.seo.priceRange,
    address: { "@type": "PostalAddress", streetAddress: S.street, addressLocality: "Varanasi", addressRegion: S.region, postalCode: S.postalCode, addressCountry: "IN" },
    geo: { "@type": "GeoCoordinates", latitude: S.latitude, longitude: S.longitude },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: pad2(S.openHour) + ":00", closes: pad2(S.closeHour) + ":00"
    }],
    sameAs: [S.instagramUrl]
  });
  doc.head.appendChild(ld);
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- 3. Open now (IST) ---------- */
  (function () {
    var h = parseInt(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false }), 10) % 24;
    var open = h >= S.openHour && h < S.closeHour;
    var el = $("#openNow");
    function t12(x) { return (x % 12 || 12) + (x < 12 ? " AM" : " PM"); }
    el.className = "open-now " + (open ? "is-open" : "is-closed");
    el.textContent = open ? "Abhi khula hai, " + t12(S.closeHour) + " tak" : "Abhi band hai, " + t12(S.openHour) + " se khulta hai";
  })();

  /* ---------- 4. Render sections ---------- */
  $("#storyLines").innerHTML = S.story.lines.map(function (l) { return '<p class="story__line">' + esc(l) + "</p>"; }).join("");
  $("#facts").innerHTML = S.story.facts.map(function (f) { return '<li class="reveal"><b>' + esc(f.big) + "</b><span>" + esc(f.small) + "</span></li>"; }).join("");

  $("#sigGrid").innerHTML = S.signature.items.map(function (d) {
    return '<article class="sig__card"><div class="sig__media reveal"><img src="' + esc(d.img) + '" alt="' + esc(d.alt) + '" loading="lazy" decoding="async">' +
      '<span class="sig__price">' + esc(S.currency) + d.price + "</span></div>" +
      '<div class="sig__body reveal"><h3>' + esc(d.name) + "</h3><p>" + esc(d.text) + "</p></div></article>";
  }).join("");

  var tabs = $("#menuTabs"), panel = $("#menuPanel");
  tabs.innerHTML = S.menu.map(function (c, i) {
    return '<button class="tab" role="tab" type="button" id="tab-' + c.id + '" aria-controls="menuPanel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-i="' + i + '">' + esc(c.label) + "</button>";
  }).join("");
  function showCat(i, focus) {
    var c = S.menu[i];
    $$(".tab", tabs).forEach(function (t, k) { t.setAttribute("aria-selected", k === i); t.tabIndex = k === i ? 0 : -1; });
    panel.setAttribute("aria-labelledby", "tab-" + c.id);
    panel.innerHTML = c.items.map(function (it) {
      return '<div class="item"><div class="item__top"><span class="veg' + (it.veg ? "" : " veg--non") + '" role="img" aria-label="' + (it.veg ? "Veg" : "Non-veg") + '"></span>' +
        '<h3 class="item__name">' + esc(it.name) + "</h3>" + (it.pick ? '<span class="pick">Chef&rsquo;s pick</span>' : "") +
        '<span class="item__fill" aria-hidden="true"></span><span class="item__price">' + esc(S.currency) + it.price + "</span></div>" +
        '<p class="item__desc">' + esc(it.desc) + "</p></div>";
    }).join("");
    if (canAnimate) { gsap.fromTo($$(".item", panel), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, stagger: .04, ease: "power2.out", clearProps: "transform" }); }
    if (focus) { $$(".tab", tabs)[i].focus(); }
  }
  tabs.addEventListener("click", function (e) { var b = e.target.closest(".tab"); if (b) { showCat(+b.dataset.i); } });
  tabs.addEventListener("keydown", function (e) {
    var cur = +($(".tab[aria-selected='true']", tabs).dataset.i), n = S.menu.length, nx = null;
    if (e.key === "ArrowRight") { nx = (cur + 1) % n; } else if (e.key === "ArrowLeft") { nx = (cur + n - 1) % n; }
    else if (e.key === "Home") { nx = 0; } else if (e.key === "End") { nx = n - 1; }
    if (nx !== null) { e.preventDefault(); showCat(nx, true); }
  });
  showCat(0);

  $("#galleryGrid").innerHTML = S.gallery.map(function (g) {
    return '<figure class="gallery__item reveal' + (g.size === "wide" ? " gallery__item--wide" : "") + '" style="margin:0"><img src="' + esc(g.img) + '" alt="' + esc(g.alt) + '" loading="lazy" decoding="async"></figure>';
  }).join("");

  var track = $("#reviewTrack"), dots = $("#reviewDots");
  track.innerHTML = S.reviews.map(function (r, i) {
    return '<figure class="review" style="margin-block:0" aria-label="Review ' + (i + 1) + ' of ' + S.reviews.length + '"><div class="stars" role="img" aria-label="' + r.stars + ' star">' + "★".repeat(r.stars) + "☆".repeat(5 - r.stars) + "</div>" +
      "<p>" + esc(r.text) + "</p><footer><b>" + esc(r.name) + "</b><span>" + esc(r.place) + "</span>" + (S.showSampleTag ? '<span class="sample-tag">Sample</span>' : "") + "</footer></figure>";
  }).join("");
  dots.innerHTML = S.reviews.map(function (r, i) { return '<button class="dot" type="button" aria-label="Review ' + (i + 1) + ' pe jao" data-i="' + i + '"></button>'; }).join("");
  var cards = $$(".review", track), dotEls = $$(".dot", dots);
  function activeReview() {
    var left = track.scrollLeft, best = 0, d = 1e9;
    cards.forEach(function (c, i) { var x = Math.abs(c.offsetLeft - track.offsetLeft - left - parseFloat(getComputedStyle(track).paddingLeft || 0)); if (x < d) { d = x; best = i; } });
    return best;
  }
  function syncDots() { var a = activeReview(); dotEls.forEach(function (d, i) { if (i === a) { d.setAttribute("aria-current", "true"); } else { d.removeAttribute("aria-current"); } }); }
  function goReview(i) {
    i = Math.max(0, Math.min(cards.length - 1, i));
    track.scrollTo({ left: cards[i].offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft || 0), behavior: reduced ? "auto" : "smooth" });
  }
  $("#prevReview").addEventListener("click", function () { goReview(activeReview() - 1); });
  $("#nextReview").addEventListener("click", function () { goReview(activeReview() + 1); });
  dots.addEventListener("click", function (e) { var b = e.target.closest(".dot"); if (b) { goReview(+b.dataset.i); } });
  track.addEventListener("scroll", function () { window.requestAnimationFrame(syncDots); }, { passive: true });
  track.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") { goReview(activeReview() + 1); } if (e.key === "ArrowLeft") { goReview(activeReview() - 1); } });
  syncDots();

  var mapBox = $("#mapBox");
  if (S.mapEmbedUrl) {
    mapBox.innerHTML = '<iframe src="' + esc(S.mapEmbedUrl) + '" title="' + esc(S.name) + ' ka Google Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
  } else {
    mapBox.innerHTML = '<a class="mapcard" href="' + esc(dirUrl) + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg><strong>' +
      esc(S.visit.mapCardTitle) + "</strong><span>" + esc(S.addressOneLine) + "</span></a>";
  }

  /* ---------- 5. Nav ---------- */
  var nav = $("#nav");
  function navState() { nav.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", navState, { passive: true });
  navState();

  /* ---------- 6. Hero ---------- */
  var canvas = $("#heroCanvas");
  if (!canAnimate) { return; }

  gsap.registerPlugin(ScrollTrigger);
  var lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        var target = id.length > 1 ? $(id) : null;
        if (id === "#top") { e.preventDefault(); lenis.scrollTo(0); }
        else if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: 0, duration: 1.6 }); }
      });
    });
  }

  var isMobile = window.matchMedia("(max-width: 767px)").matches;
  var COUNT = isMobile ? 75 : 150;
  var frames = new Array(COUNT);
  var loaded = new Array(COUNT);
  var ctx = canvas.getContext("2d", { alpha: false });
  var FW = 1280, FH = 704;
  var W = 0, H = 0, dpr = 1;
  var target = 0, cur = 0, lastDrawn = -1, ready = false;

  function src(i) { return (isMobile ? "assets/frames-m/m" : "assets/frames/f") + pad(i + 1) + ".webp"; }
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 1.5);
    var r = canvas.getBoundingClientRect();
    W = Math.round(r.width * dpr); H = Math.round(r.height * dpr);
    canvas.width = W; canvas.height = H; lastDrawn = -1;
  }
  function draw(i) {
    var img = frames[i];
    if (!img) { return; }
    /* poster ke object-fit: cover jaisa hi geometry, taaki frame 1 par koi jump na ho */
    var fx = isMobile ? 0.5 : 0.6, fy = isMobile ? 0 : 0.5;
    var boxH = isMobile ? H * 0.56 : H;
    var s = Math.max(W / FW, boxH / FH), dw = FW * s, dh = FH * s;
    var dx = (W - dw) * fx, dy = (boxH - dh) * fy;
    ctx.fillStyle = "#0d0e10"; ctx.fillRect(0, 0, W, H);
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawn = i;
  }
  function nearest(i) {
    for (var d = 0; d < COUNT; d++) {
      if (loaded[i - d]) { return i - d; }
      if (loaded[i + d]) { return i + d; }
    }
    return -1;
  }
  function loadFrame(i) {
    return new Promise(function (res) {
      var im = new Image();
      im.decoding = "async";
      im.onload = function () { frames[i] = im; loaded[i] = true; res(); };
      im.onerror = function () { res(); };
      im.src = src(i);
    });
  }
  var order = [];
  for (var a = 0; a < COUNT; a += 6) { order.push(a); }
  for (var b = 0; b < COUNT; b++) { if (b % 6) { order.push(b); } }
  var qi = 0;
  function pump() {
    if (qi >= order.length) { return; }
    var i = order[qi++];
    loadFrame(i).then(function () {
      if (i === 0 && !ready) { ready = true; size(); draw(0); canvas.classList.add("is-ready"); }
      pump();
    });
  }
  size();
  for (var w = 0; w < 4; w++) { pump(); }
  window.addEventListener("resize", function () { size(); });

  gsap.ticker.add(function () {
    if (!ready) { return; }
    cur += (target - cur) * 0.2;
    if (Math.abs(target - cur) < 0.01) { cur = target; }
    var i = nearest(Math.round(cur));
    if (i >= 0 && i !== lastDrawn) { draw(i); }
  });

  /* Scroll timeline: push-in + text beats + frame progress */
  var tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: "#hero", start: "top top", end: "bottom bottom", scrub: true,
      onUpdate: function (self) { target = Math.min(1, self.progress / 0.94) * (COUNT - 1); }
    }
  });
  tl.to("#heroMedia", { scale: isMobile ? 1.18 : 1.16, duration: 1 }, 0)
    .to("#heroMain", { opacity: 0, y: -50, duration: 0.14 }, 0.06)
    .to("#heroHint", { opacity: 0, duration: 0.06 }, 0)
    .fromTo("#heroBeat1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1 }, 0.3)
    .to("#heroBeat1", { opacity: 0, y: -40, duration: 0.1 }, 0.52)
    .fromTo("#heroBeat2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1 }, 0.7);

  /* ---------- 7. Reveals & parallax ---------- */
  ScrollTrigger.batch(".reveal", {
    start: "top 88%", once: true,
    onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: true }); }
  });
  $$(".story__line").forEach(function (l) {
    gsap.to(l, { opacity: 1, ease: "none", scrollTrigger: { trigger: l, start: "top 82%", end: "top 48%", scrub: true } });
  });
  $$(".sig__media img").forEach(function (img) {
    gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: img.parentNode, start: "top bottom", end: "bottom top", scrub: true } });
  });
  ScrollTrigger.matchMedia({
    "(min-width: 700px)": function () {
      $$(".sig__card").forEach(function (c, i) {
        gsap.fromTo(c, { y: i % 2 ? 36 : -10 }, { y: i % 2 ? -24 : 22, ease: "none", scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }
  });
  $$(".gallery__item img").forEach(function (img) {
    gsap.fromTo(img, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: img.parentNode, start: "top bottom", end: "center center", scrub: true } });
  });
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
