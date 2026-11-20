(() => {
  const key = "pixelpay-ui-v3";
  const root = document.documentElement;
  const byId = id => document.getElementById(id);
  const progress = byId("pp-scroll-progress");
  const back = byId("pp-back-top");
  const faqSearch = byId("pp-faq-search");
  const faqEmpty = byId("pp-faq-empty");
  const share = byId("pp-share");
  const theme = byId("pp-contrast");
  const motion = byId("pp-motion");
  const faqList = [...document.querySelectorAll("#faq details, .faq details, section:has(#faqTitle) details")];
  const alertBox = byId("pp-ui-status");
  let toastTimer = 0;
  function announce(message) {
    clearTimeout(toastTimer);
    alertBox.textContent = message;
    alertBox.classList.add("is-visible");
    toastTimer = setTimeout(() => alertBox.classList.remove("is-visible"), 3200);
  }
  function save(flag, value) { try { localStorage.setItem(key + "-" + flag, value); } catch {} }
  function read(flag) { try { return localStorage.getItem(key + "-" + flag); } catch { return null; } }
  function preference(name, button, activeText, offText) {
    const enabled = read(name) === "true";
    root.dataset["pp" + name] = String(enabled);
    button.setAttribute("aria-pressed", String(enabled));
    button.textContent = enabled ? activeText : offText;
    button.addEventListener("click", () => {
      const value = button.getAttribute("aria-pressed") !== "true";
      root.dataset["pp" + name] = String(value);
      button.setAttribute("aria-pressed", String(value));
      button.textContent = value ? activeText : offText;
      save(name, String(value));
      announce(value ? "Preferensi diaktifkan." : "Preferensi dinonaktifkan.");
    });
  }
  function scrollState() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0) + ")";
    back.hidden = window.scrollY < 400;
  }
  let raf = false;
  window.addEventListener("scroll", () => {
    if (raf) return;
    raf = true;
    requestAnimationFrame(() => {scrollState();raf=false;});
  }, {passive:true});
  window.addEventListener("resize", scrollState, {passive:true});
  scrollState();
  back.addEventListener("click", () => window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}));
  preference("contrast", theme, "Kontras tinggi ✓", "Kontras tinggi");
  preference("motion", motion, "Animasi minim ✓", "Animasi minim");
  function searchFaq() {
    const value = faqSearch.value.trim().toLocaleLowerCase("id-ID");
    let visible = 0;
    for (const item of faqList) {
      const show = !value || item.textContent.toLocaleLowerCase("id-ID").includes(value);
      item.hidden = !show;
      if (show) visible++;
      if (value && show) item.open = true;
    }
    faqEmpty.hidden = visible !== 0;
    announce(visible + " pertanyaan ditemukan.");
  }
  faqSearch.addEventListener("input", searchFaq);
  byId("pp-faq-expand").addEventListener("click", () => faqList.forEach(item => {if(!item.hidden) item.open = true;}));
  byId("pp-faq-collapse").addEventListener("click", () => faqList.forEach(item => item.open = false));
  share.addEventListener("click", async () => {
    try {
      if (navigator.share) await navigator.share({title:document.title,url:location.href.split("#")[0]});
      else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(location.href.split("#")[0]);
        announce("Link website disalin.");
      } else announce("Fitur berbagi tidak tersedia pada browser ini.");
    } catch(e) { if(e.name !== "AbortError") announce("Tidak dapat membagikan saat ini."); }
  });
  for (const input of document.querySelectorAll("input:not([type=hidden]),select,textarea")) {
    if (!input.hasAttribute("autocomplete")) input.setAttribute("autocomplete", "off");
    if (input.type === "number") input.inputMode = "decimal";
  }
  const menu = byId("menuToggleBtn");
  if (menu) {
    menu.setAttribute("role","button");
    menu.setAttribute("tabindex","0");
    menu.setAttribute("aria-label","Buka atau tutup menu navigasi");
    menu.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){e.preventDefault();menu.click();}});
  }
  const lang = byId("langSwitchBtn");
  if (lang) {
    lang.setAttribute("role", "button");
    lang.setAttribute("tabindex","0");
    lang.setAttribute("aria-label","Ubah bahasa");
    lang.addEventListener("keydown", e => { if(e.key==="Enter"||e.key===" "){e.preventDefault();lang.click();}});
  }
  const names = ["fitur","cara-kerja","harga","faq","order"];
  const sections = names.map(id => byId(id)).filter(Boolean);
  const links = [...document.querySelectorAll(".nav-links a")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      for(const item of entries) if(item.isIntersecting) {
        links.forEach(a => {
          const yes = a.getAttribute("href") === "#" + item.target.id;
          a.classList.toggle("pp-active-link", yes);
          if(yes) a.setAttribute("aria-current","location");
          else a.removeAttribute("aria-current");
        });
      }
    },{rootMargin:"-28% 0px -60% 0px"});
    sections.forEach(x => observer.observe(x));
  }
  document.addEventListener("keydown", e => {
    const tag = document.activeElement?.tagName;
    const typing = ["INPUT","TEXTAREA","SELECT"].includes(tag);
    if(e.key === "/" && !typing && !e.ctrlKey && !e.metaKey){e.preventDefault();faqSearch.focus();byId("faq")?.scrollIntoView({behavior:"smooth"});}
    if(e.key === "Escape" && document.activeElement === faqSearch){faqSearch.value="";searchFaq();faqSearch.blur();}
  });
  document.querySelectorAll('a[target="_blank"]').forEach(a => a.rel = [a.rel, "noopener", "noreferrer"].join(" ").trim());
  const years = document.querySelectorAll("[data-pp-current-year]");
  years.forEach(e => e.textContent = String(new Date().getFullYear()));
  const labels = {"inputUserId":"User ID pemain", "inputServerId":"Server ID pemain"};
  Object.entries(labels).forEach(([id,label]) => {const el=byId(id);if(el && !el.hasAttribute("aria-label"))el.setAttribute("aria-label",label);});
  document.documentElement.classList.add("pp-ready");
})();