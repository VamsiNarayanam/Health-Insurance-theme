(function () {
  const KEY = "stacklyCanopyUser";
  const ACCOUNTS = "stacklyCanopyAccounts";

  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("is-in");
    setTimeout(() => t.classList.remove("is-in"), 2600);
  }

  function storageGet() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null");
    } catch {
      return null;
    }
  }
  function storageSet(u) {
    localStorage.setItem(KEY, JSON.stringify(u));
  }
  function storageClear() {
    localStorage.removeItem(KEY);
  }
  function accountsGet() {
    try {
      const list = JSON.parse(localStorage.getItem(ACCOUNTS) || "[]");
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }
  function accountsSave(list) {
    localStorage.setItem(ACCOUNTS, JSON.stringify(list));
  }

  function guardDash() {
    const page = document.body.dataset.dash;
    if (!page) return;
    const u = storageGet();
    if (!u) {
      location.href = "login.html";
      return;
    }
    if (page === "admin" && u.role !== "underwriter") location.href = "client-dashboard.html";
    if (page === "client" && u.role !== "policyholder") location.href = "admin-dashboard.html";
    const chip = document.querySelector("[data-user-chip]");
    if (chip) chip.textContent = u.name;
  }

  function mobileNav() {
    const btn = document.querySelector(".site-header .nav-toggle");
    const panel = document.getElementById("mobile-panel");
    if (!btn || !panel) return;
    function setOpen(open) {
      panel.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    }
    btn.addEventListener("click", () => setOpen(!panel.classList.contains("is-open")));
    panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function rainMarquee() {
    const host = document.querySelector("[data-rain]");
    if (!host || typeof RAIN_TICKS === "undefined") return;
    const track = document.createElement("div");
    track.className = "rain-track";
    const ticks = RAIN_TICKS.concat(RAIN_TICKS);
    ticks.forEach((text) => {
      const d = document.createElement("div");
      d.className = "rain-tick";
      d.innerHTML = `<span class="dot" aria-hidden="true"></span><span>${text}</span>`;
      track.appendChild(d);
    });
    host.appendChild(track);
  }

  function carousel(rootSel) {
    const root = document.querySelector(rootSel);
    if (!root) return;
    const track = root.querySelector("[data-track]");
    const prev = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");
    const live = root.querySelector("[data-live]");
    if (!track) return;
    const delay = Number(root.dataset.autoplay) || 0;
    let i = 0;
    let timer = 0;

    function tiles() {
      return [...track.children];
    }
    function mark() {
      const all = tiles();
      if (live) live.textContent = `Showing ${i + 1} of ${all.length}`;
      root.querySelectorAll(".dots button").forEach((b, n) => {
        b.setAttribute("aria-current", n === i ? "true" : "false");
      });
    }
    function goTo(n) {
      const all = tiles();
      if (!all.length) return;
      i = (n + all.length) % all.length;
      track.scrollTo({
        left: all[i].offsetLeft,
        behavior: window.CANOPY_REDUCED ? "auto" : "smooth",
      });
      mark();
    }
    function go(dir) {
      goTo(i + dir);
    }
    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = 0;
      }
    }
    function play() {
      stop();
      if (!delay || window.CANOPY_REDUCED) return;
      timer = window.setInterval(() => go(1), delay);
    }

    prev && prev.addEventListener("click", () => go(-1));
    next && next.addEventListener("click", () => go(1));
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    });
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", play);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", (e) => {
      if (!root.contains(e.relatedTarget)) play();
    });
    document.addEventListener("visibilitychange", () => {
      document.hidden ? stop() : play();
    });

    const dots = root.querySelector(".dots");
    if (dots) {
      tiles().forEach((_, n) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Go to slide " + (n + 1));
        if (n === 0) b.setAttribute("aria-current", "true");
        b.addEventListener("click", () => goTo(n));
        dots.appendChild(b);
      });
    }

    let ticking = false;
    track.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const all = tiles();
        let nearest = 0;
        let best = Infinity;
        all.forEach((t, n) => {
          const d = Math.abs(t.offsetLeft - track.scrollLeft);
          if (d < best) {
            best = d;
            nearest = n;
          }
        });
        i = nearest;
        mark();
        ticking = false;
      });
    });

    mark();
    play();
  }

  function fillCoverCarousel() {
    const track = document.querySelector("[data-cover-track]");
    if (!track || typeof PRODUCTS === "undefined") return;
    PRODUCTS.forEach((p, n) => {
      const a = document.createElement("a");
      a.className = "cover-tile";
      a.href = p.href;
      a.innerHTML = `<img src="${p.img}" alt="" ${n ? 'loading="lazy"' : 'fetchpriority="high"'}>
        <div class="pad">
          <span class="wax-seal" aria-hidden="true">${p.seal}</span>
          <p class="lane">${p.lane}</p>
          <h3>${p.name}</h3>
          <p>${p.line}</p>
          <p class="cover-meta">${p.si} · ${p.wait}</p>
          <p class="from">${p.from}</p>
        </div>`;
      track.appendChild(a);
    });
  }

  function faq() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const btn = item.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const open = item.classList.contains("is-open");
        const group = item.closest(".faq-list") || item.parentElement;
        group.querySelectorAll(".faq-item").forEach((x) => {
          x.classList.remove("is-open");
          const b = x.querySelector("button");
          if (b) b.setAttribute("aria-expanded", "false");
          const plus = x.querySelector(".faq-plus");
          if (plus) plus.textContent = "+";
        });
        if (!open) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          const plus = item.querySelector(".faq-plus");
          if (plus) plus.textContent = "−";
        }
      });
    });
  }

  function rootMap() {
    const card = document.querySelector("[data-root-card]");
    if (!card || typeof ROOTS === "undefined") return;
    const chips = document.querySelectorAll("[data-root-cities] button");
    const pins = document.querySelectorAll(".atlas .pin");
    function show(city) {
      const r = ROOTS[city];
      if (!r) return;
      card.innerHTML = `<img src="${r.img}" alt="Network hospital node in ${city}: ${r.hospital}">
        <div class="root-card-body">
          <p class="kicker">${city}</p>
          <h3>${r.hospital}</h3>
          <dl class="root-meta">
            <div><dt>City cluster</dt><dd>${r.count.toLocaleString("en-IN")} roots</dd></div>
            <div><dt>Cashless</dt><dd>Listed node</dd></div>
          </dl>
          <p>${r.note}</p>
          <p class="root-fine">Cashless is network-listed, not nationwide-unlimited.</p>
        </div>`;
      pins.forEach((p) => {
        const on = p.dataset.city === city;
        p.classList.toggle("is-on", on);
        p.setAttribute("aria-pressed", String(on));
      });
      chips.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.city === city)));
    }
    function bind(el) {
      el.addEventListener("click", () => show(el.dataset.city));
    }
    pins.forEach(bind);
    chips.forEach(bind);
    show("Mumbai");
  }

  function blogFilter() {
    const bar = document.querySelector("[data-lanes]");
    if (!bar) return;
    const countEl = document.querySelector("[data-grove-count]");
    const emptyEl = document.querySelector("[data-grove-empty]");
    const cards = [...document.querySelectorAll("[data-article]")];

    function apply(lane) {
      cards.forEach((card) => {
        card.hidden = lane !== "all" && card.dataset.lane !== lane;
      });
      const visible = cards.filter((card) => !card.hidden);
      cards.forEach((card) => {
        const i = visible.indexOf(card);
        card.classList.toggle("is-lead", i === 0 && visible.length !== 2);
        card.classList.toggle("is-wide", i === 0 && visible.length === 1);
      });
      const n = visible.length;
      if (countEl) {
        const label = lane === "all" ? "all lanes" : lane.toLowerCase();
        countEl.textContent = n === 1 ? `1 essay · ${label}` : `${n} essays · ${label}`;
      }
      if (emptyEl) emptyEl.hidden = n > 0;
    }

    bar.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      bar.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
      apply(b.dataset.lane);
    });
    apply("all");
  }

  function contactForm() {
    const form = document.getElementById("letter-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.reset();
      location.href = "404.html";
    });
  }

  function newsletter() {
    document.querySelectorAll("[data-news]").forEach((form) => {
      function sendToVault(e) {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        const value = email ? email.value.trim() : "";
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          if (email) {
            email.setCustomValidity("Enter a valid email address.");
            email.reportValidity();
            email.setCustomValidity("");
          }
          return;
        }
        form.reset();
        location.href = "404.html";
      }
      form.addEventListener("submit", sendToVault);
      const btn = form.querySelector("button");
      if (btn) btn.addEventListener("click", sendToVault);
    });
  }

  function pwdToggles() {
    document.querySelectorAll(".pwd-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.textContent = show ? "Hide" : "Show";
        btn.setAttribute("aria-pressed", String(show));
      });
    });
  }

  function validUser(name, email, password) {
    const errs = [];
    if (!name || name.trim().length < 2) errs.push("Name needs at least two letters.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) errs.push("Email looks incomplete.");
    if (!password || password.length < 6) errs.push("Password must be 6 characters or more.");
    return errs;
  }

  function loginPage() {
    const form = document.getElementById("login-form");
    if (!form) return;
    const params = new URLSearchParams(location.search);
    if (params.get("created")) {
      const note = document.querySelector("[data-created]");
      if (note) note.classList.add("is-show");
    }
    const wanted = params.get("role");
    if (wanted === "underwriter" || wanted === "policyholder") {
      const radio = form.querySelector(`input[name="role"][value="${wanted}"]`);
      if (radio) radio.checked = true;
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      const password = form.password.value;
      const role = form.role.value;
      const box = form.querySelector("[data-form-err]");
      const errs = [];
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) errs.push("Enter a valid email address.");
      if (!password || password.length < 6) errs.push("Password must be at least 6 characters.");
      if (errs.length) {
        box.textContent = errs.join(" ");
        return;
      }
      const emailKey = email.toLowerCase();
      const matches = accountsGet().filter(
        (a) => a.email && a.email.toLowerCase() === emailKey && a.password === password
      );
      const saved = matches.find((a) => a.role === role);
      const demo = role === "underwriter" ? DEMO.underwriter : DEMO.policyholder;
      let user = null;
      if (saved) {
        user = saved;
      } else if (matches.length) {
        box.textContent =
          role === "underwriter"
            ? "This email is a policyholder account. Choose Policyholder, or create an underwriter seat."
            : "This email is an underwriter seat. Choose Underwriter to open the rain desk.";
        return;
      } else if (emailKey === demo.email.toLowerCase() && password === demo.password) {
        user = demo;
      }
      if (!user) {
        box.textContent = "Email or password is incorrect for this account type.";
        return;
      }
      const session = { ...user };
      delete session.password;
      storageSet(session);
      location.href = session.role === "underwriter" ? "admin-dashboard.html" : "client-dashboard.html";
    });
  }

  function registerPage() {
    const form = document.getElementById("register-form");
    if (!form) return;
    const holderBlock = form.querySelector("[data-holder-only]");
    const kicker = document.querySelector("[data-enrol-kicker]");
    const lead = document.querySelector("[data-enrol-lead]");
    const termsHolder = form.querySelector("[data-terms-holder]");
    const termsDesk = form.querySelector("[data-terms-desk]");
    function isDesk() {
      return form.role.value === "underwriter";
    }
    function syncRole() {
      const desk = isDesk();
      if (holderBlock) holderBlock.hidden = desk;
      if (form.product) form.product.required = !desk;
      if (kicker) kicker.textContent = desk ? "Rain-desk appointment" : "Policyholder enrolment";
      if (lead) {
        lead.textContent = desk
          ? "A demo underwriter seat opens the rain desk in this browser. Live TPA appointments still go through Canopy House, BKC."
          : "Tell us who stands under the canopy. Quotes are not cashless guarantees. Named waiting periods apply.";
      }
      if (termsHolder) termsHolder.hidden = desk;
      if (termsDesk) termsDesk.hidden = !desk;
    }
    form.querySelectorAll('input[name="role"]').forEach((r) => r.addEventListener("change", syncRole));
    syncRole();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const box = form.querySelector("[data-form-err]");
      const name = form.fullname.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;
      const confirm = form.confirm.value;
      const role = form.role.value;
      const desk = role === "underwriter";
      const errs = validUser(name, email, password);
      if (password !== confirm) errs.push("Passwords do not match.");
      if (!form.terms.checked) errs.push("Please accept the specimen terms.");
      if (!desk && !form.product.value) errs.push("Select a cover line.");
      if (errs.length) {
        box.textContent = errs.join(" ");
        return;
      }
      const emailKey = email.toLowerCase();
      const list = accountsGet();
      if (list.some((a) => a.email && a.email.toLowerCase() === emailKey && a.role === role)) {
        box.textContent = "This email already has that account type. Sign in instead.";
        return;
      }
      const account = {
        name,
        email,
        password,
        role,
        city: form.city.value.trim(),
        mobile: form.mobile.value.trim(),
        product: desk ? "" : form.product.value,
        policy: desk ? "" : "CAN-KIN-DEMO",
        desk: desk ? "Claims Desk BKC" : "",
      };
      list.push(account);
      accountsSave(list);
      location.href = "login.html?created=1&role=" + encodeURIComponent(role);
    });
  }

  function logout() {
    document.querySelectorAll("[data-logout]").forEach((b) => {
      b.addEventListener("click", () => {
        storageClear();
        location.href = "login.html";
      });
    });
  }

  function dashPanels() {
    const nav = document.querySelector(".dash-nav");
    if (!nav) return;
    const side = document.querySelector(".dash-side");
    const scrim = document.querySelector(".dash-scrim");
    function setSide(open) {
      side?.classList.toggle("is-open", open);
      scrim?.classList.toggle("is-open", open);
      const drawer = document.querySelector(".dash-drawer-btn");
      if (drawer) {
        drawer.setAttribute("aria-expanded", String(open));
        drawer.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      }
    }
    nav.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-panel]");
      if (!b) return;
      nav.querySelectorAll("button").forEach((x) => x.removeAttribute("aria-current"));
      b.setAttribute("aria-current", "true");
      document.querySelectorAll(".panel").forEach((p) => p.classList.remove("is-on"));
      const panel = document.getElementById(b.dataset.panel);
      panel.classList.add("is-on");
      if (window.gsap && !window.CANOPY_REDUCED) {
        gsap.from(panel, { opacity: 0, y: 16, duration: 0.35, ease: "power2.out" });
      }
      setSide(false);
    });
    document.querySelector(".dash-drawer-btn")?.addEventListener("click", () => {
      setSide(!side.classList.contains("is-open"));
    });
    scrim?.addEventListener("click", () => setSide(false));
  }

  function fillAdmin() {
    if (!document.body.dataset.dash || document.body.dataset.dash !== "admin") return;
    const polBody = document.querySelector("[data-policy-rows]");
    if (polBody) {
      polBody.innerHTML = POLICIES.map(
        (p) => `<tr>
        <td data-label="Number">${p.no}</td>
        <td data-label="Product">${p.product}</td>
        <td data-label="Holder">${p.holder}</td>
        <td data-label="SI">${p.si}</td>
        <td data-label="City">${p.city}</td>
        <td data-label="Status"><span class="seal-status ok">${p.status}</span></td>
      </tr>`
      ).join("");
    }
    const claimBody = document.querySelector("[data-claim-rows]");
    if (claimBody) {
      claimBody.innerHTML = CLAIMS.map((c) => {
        const cls = c.stage === "declined" ? "bad" : c.stage === "queried" || c.stage === "intimated" ? "warn" : "ok";
        return `<tr>
          <td data-label="ID">${c.id}</td>
          <td data-label="Holder">${c.holder}</td>
          <td data-label="City">${c.city}</td>
          <td data-label="Stage"><span class="seal-status ${cls}">${c.stage}</span></td>
          <td data-label="Amount">${c.amount}</td>
          <td data-label="Note">${c.note}</td>
        </tr>`;
      }).join("");
    }
    const pre = document.querySelector("[data-preauth-rows]");
    if (pre) {
      pre.innerHTML = PREAUTHS.map(
        (p, i) => `<tr>
        <td data-label="Hospital">${p.hospital}</td>
        <td data-label="Procedure">${p.procedure}</td>
        <td data-label="Amount">${p.amount}</td>
        <td data-label="Age">${p.age}</td>
        <td data-label="Action">
          <button class="btn btn-copper" data-dummy="Approved in demo" type="button">Approve</button>
          <button class="btn btn-canopy" data-dummy="Query sent in demo" type="button">Query</button>
        </td>
      </tr>`
      ).join("");
    }
    const hosp = document.querySelector("[data-hosp-rows]");
    if (hosp) {
      hosp.innerHTML = HOSPITALS.map(
        (h) => `<tr>
        <td data-label="Hospital">${h.name}</td>
        <td data-label="City">${h.city}</td>
        <td data-label="Cashless">${h.cashless ? "Yes" : "No"}</td>
        <td data-label="Specialty">${h.spec}</td>
      </tr>`
      ).join("");
    }
    const led = document.querySelector("[data-ledger-rows]");
    if (led) {
      led.innerHTML = LEDGER.map(
        (r) => `<tr>
        <td data-label="Date">${r.date}</td>
        <td data-label="Policy">${r.policy}</td>
        <td data-label="Premium">${r.premium}</td>
        <td data-label="GST">${r.gst}</td>
        <td data-label="Total">${r.total}</td>
      </tr>`
      ).join("");
    }
    const ag = document.querySelector("[data-agent-rows]");
    if (ag) {
      ag.innerHTML = AGENTS.map(
        (a) => `<tr>
        <td data-label="Name">${a.name}</td>
        <td data-label="City">${a.city}</td>
        <td data-label="Live canopies">${a.live}</td>
      </tr>`
      ).join("");
    }
    const search = document.getElementById("policy-search");
    if (search && polBody) {
      search.addEventListener("input", () => {
        const q = search.value.toLowerCase();
        [...polBody.rows].forEach((row) => {
          row.hidden = !row.textContent.toLowerCase().includes(q);
        });
      });
    }
  }

  function dummyButtons() {
    document.body.addEventListener("click", (e) => {
      const b = e.target.closest("[data-dummy]");
      if (!b) return;
      e.preventDefault();
      location.href = "404.html";
    });
  }

  function intimation() {
    const form = document.getElementById("intimation-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) return form.reportValidity();
      form.reset();
      location.href = "404.html";
    });
  }

  function rootFinder() {
    const sel = document.getElementById("root-city");
    const list = document.querySelector("[data-root-list]");
    if (!sel || !list) return;
    function draw() {
      const city = sel.value;
      const rows = HOSPITALS.filter((h) => city === "all" || h.city === city);
      list.innerHTML =
        rows
          .map(
            (h) => `<div class="dash-root">
        <strong>${h.name}</strong><p class="meta">${h.city} · ${h.spec} · ${h.cashless ? "Cashless" : "Reimbursement only"}</p>
      </div>`
          )
          .join("") || `<p class="meta">No roots listed for that city in this demo.</p>`;
    }
    sel.addEventListener("change", draw);
    draw();
  }

  function spark() {
    const c = document.getElementById("spark");
    if (!c || !c.getContext) return;
    const ctx = c.getContext("2d");
    const w = (c.width = Math.max(c.offsetWidth, 280) * 2);
    const h = (c.height = 64 * 2);
    const pts = [12, 18, 16, 22, 28, 24, 31];
    ctx.strokeStyle = "#2F6A4A";
    ctx.lineWidth = 3;
    ctx.beginPath();
    pts.forEach((v, i) => {
      const x = (i / (pts.length - 1)) * (w - 16) + 8;
      const y = h - 12 - (v / 36) * (h - 24);
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.stroke();
  }

  document.addEventListener("DOMContentLoaded", () => {
    guardDash();
    mobileNav();
    rainMarquee();
    fillCoverCarousel();
    carousel(".cover-carousel");
    carousel(".stories-carousel");
    faq();
    rootMap();
    blogFilter();
    contactForm();
    newsletter();
    pwdToggles();
    loginPage();
    registerPage();
    logout();
    dashPanels();
    fillAdmin();
    dummyButtons();
    intimation();
    rootFinder();
    spark();
  });
})();
