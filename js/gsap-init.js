(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.CANOPY_REDUCED = reduced;

  if (typeof gsap === "undefined") return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if (window.Flip) gsap.registerPlugin(Flip);

  let lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  function runPreloader() {
    const el = document.getElementById("preloader");
    if (!el) return;
    const ring = el.querySelector(".copper-ring");
    const veins = el.querySelectorAll(".canopy-draw, .vein");
    const fill = el.querySelector(".canopy-fill");
    if (reduced) {
      el.classList.add("is-done");
      document.documentElement.style.overflow = "";
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const tl = gsap.timeline({
      onComplete() {
        el.classList.add("is-done");
        document.documentElement.style.overflow = "";
        setTimeout(() => el.remove(), 800);
      },
    });
    gsap.set(veins, { strokeDasharray: 1, strokeDashoffset: 1 });
    tl.from(".preloader .seed", { scale: 0.4, transformOrigin: "50% 90%", duration: 0.35, ease: "back.out(1.6)" })
      .to(veins, { strokeDashoffset: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }, 0.15)
      .to(fill, { opacity: 0.9, duration: 0.35 }, "-=0.2")
      .to(ring, { "--p": 100, duration: 0.9, ease: "none" }, 0.2)
      .to(".preloader-inner", { y: -12, opacity: 0.2, duration: 0.25 }, "+=0.15");
    gsap.set(ring, { "--p": 0 });
  }

  function splitHero() {
    const h = document.querySelector("[data-split]");
    if (!h) return;
    if (reduced || typeof SplitType === "undefined") return;
    const split = new SplitType(h, { types: "words,chars" });
    gsap.from(split.chars, {
      yPercent: 110,
      opacity: 0,
      rotate: 4,
      stagger: 0.018,
      duration: 0.9,
      ease: "power3.out",
      delay: 1.55,
    });
  }

  function parallaxHero() {
    if (reduced || !window.ScrollTrigger) return;
    document.querySelectorAll("[data-parallax]").forEach((layer) => {
      const d = Number(layer.getAttribute("data-parallax")) || 40;
      gsap.to(layer, {
        y: d,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    });
    const card = document.querySelector(".ecard-float");
    if (card) {
      gsap.fromTo(
        card,
        { rotate: -3, y: 0 },
        { rotate: -1.4, y: -10, duration: 4.5, yoyo: true, repeat: -1, ease: "sine.inOut" }
      );
    }
  }

  function pinClaim() {
    const pin = document.querySelector(".claim-pin");
    const scroller = document.querySelector(".claim-scroller");
    if (!pin || !scroller || !window.ScrollTrigger) return;
    if (reduced) {
      const rail = pin.querySelector(".claim-rail");
      if (rail) rail.style.overflowX = "auto";
      return;
    }
    const distance = () => Math.max(0, scroller.scrollWidth - pin.offsetWidth);
    gsap.to(scroller, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => "+=" + (distance() + window.innerWidth * 0.25),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }

  function paperDrop() {
    if (reduced) return;
    gsap.from(".certificate", {
      y: 40,
      opacity: 0,
      rotate: -3,
      stagger: 0.08,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cert-shelf", start: "top 78%" },
    });
  }

  function countUps() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const end = parseFloat(el.getAttribute("data-count"));
      const dec = el.getAttribute("data-dec") === "1";
      const suffix = el.getAttribute("data-suffix") || "";
      const obj = { v: 0 };
      const tween = () => {
        gsap.to(obj, {
          v: end,
          duration: reduced ? 0 : 1.6,
          ease: "power2.out",
          onUpdate() {
            el.textContent = (dec ? obj.v.toFixed(1) : Math.round(obj.v).toLocaleString("en-IN")) + suffix;
          },
        });
      };
      if (window.ScrollTrigger && !reduced) {
        ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: tween });
      } else tween();
    });
  }

  function magnetic() {
    if (reduced) return;
    document.querySelectorAll(".btn-copper").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.35, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
      });
    });
  }

  function headerState() {
    const header = document.getElementById("site-header");
    if (!header) return;
    const onHero = document.querySelector(".hero, .page-hero");
    function apply() {
      if (window.scrollY > 40) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
      if (!onHero) header.classList.add("is-scrolled");
    }
    apply();
    window.addEventListener("scroll", apply, { passive: true });
  }

  window.addEventListener("DOMContentLoaded", () => {
    runPreloader();
    headerState();
    splitHero();
    parallaxHero();
    pinClaim();
    paperDrop();
    countUps();
    magnetic();
  });
})();
