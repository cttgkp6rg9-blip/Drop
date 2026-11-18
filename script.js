(() => {
  "use strict";
  const S = window.SALON;
  const $ = (sel, root = document) => root.querySelector(sel);
  const JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const euro = n => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const toMin = hhmm => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  const fmtMin = m => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  const fmtDuree = m => m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? String(m % 60).padStart(2, "0") : ""}` : `${m} min`;

  /* ---------- Textes liés à la config ---------- */
  document.querySelectorAll("[data-bind]").forEach(el => { el.textContent = S[el.dataset.bind]; });
  $("#year").textContent = new Date().getFullYear();
  $("#tel-link").textContent = S.telephone;
  $("#tel-link").href = "tel:" + S.telephone.replace(/\s/g, "");
  $("#mail-link").textContent = S.email;
  $("#mail-link").href = "mailto:" + S.email;
  $("#maps-link").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.mapsQuery || S.adresse);
  $("#insta-link").href = "https://instagram.com/" + S.instagram;

  /* ---------- Menu mobile ---------- */
  const burger = $(".burger"), menu = $(".menu");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", e => { if (e.target.tagName === "A") menu.classList.remove("open"); });

  /* ---------- Ouvert / fermé ---------- */
  function openStatus() {
    const now = new Date(), d = now.getDay(), cur = now.getHours() * 60 + now.getMinutes();
    const h = S.horaires[d];
    const el = $("#open-status");
    if (h && cur >= toMin(h[0]) && cur < toMin(h[1])) {
      el.innerHTML = `<span class="dot" style="background:#2ecc71"></span>Ouvert maintenant · jusqu'à ${h[1]}`;
      return;
    }
    for (let i = 0; i < 8; i++) {
      const day = (d + i) % 7, slot = S.horaires[day];
      if (slot && (i > 0 || cur < toMin(slot[0]))) {
        const quand = i === 0 ? "aujourd'hui" : i === 1 ? "demain" : JOURS[day].toLowerCase();
        el.innerHTML = `<span class="dot" style="background:#e74c3c"></span>Fermé · ouvre ${quand} à ${slot[0]}`;
        return;
      }
    }
  }
  openStatus();
  setInterval(openStatus, 60000);

  /* ---------- Horaires ---------- */
  const today = new Date().getDay();
  $("#hours").innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => {
    const h = S.horaires[d];
    return `<li class="${d === today ? "today" : ""}"><span>${JOURS[d]}</span><span>${h ? `${h[0]} – ${h[1]}` : "Fermé"}</span></li>`;
  }).join("");

  /* ---------- Prestations ---------- */
  const cats = [...new Set(S.prestations.map(p => p.cat))];
  const tabs = $("#tabs"), services = $("#services");
  function showCat(cat) {
    tabs.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.cat === cat));
    services.innerHTML = S.prestations.filter(p => cat === "Tout" || p.cat === cat).map(p => `
      <article class="service">
        <div class="service-head"><h3>${esc(p.nom)}</h3><span class="price">${euro(p.prix)}</span></div>
        <span class="duration">${fmtDuree(p.duree)}</span>
        <p>${esc(p.desc)}</p>
      </article>`).join("");
  }
  tabs.innerHTML = ["Tout", ...cats].map(c => `<button class="tab" role="tab" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  tabs.addEventListener("click", e => { if (e.target.dataset.cat) showCat(e.target.dataset.cat); });
  showCat("Tout");

  /* ---------- Galerie (visuels CSS, remplaçables par des photos) ---------- */
  const styles = [
    ["French classique", "linear-gradient(160deg,#fff 0 30%,#f6dfe3 31%)"],
    ["Rouge passion", "linear-gradient(160deg,#e05470,#7a1f3a)"],
    ["Baby boomer", "linear-gradient(180deg,#fff,#f3c9d2)"],
    ["Effet chrome", "linear-gradient(135deg,#d7d7e0,#8b8ba0 40%,#f4f4fa 55%,#6d6d80)"],
    ["Nude élégant", "linear-gradient(160deg,#e8c9b7,#b98a73)"],
    ["Paillettes or", "radial-gradient(circle,#fff6 1px,transparent 2px) 0 0/10px 10px,linear-gradient(160deg,#e9d7a8,#a8823f)"],
    ["Pastel printemps", "linear-gradient(135deg,#bde0fe,#ffc8dd,#cdb4db)"],
    ["Bordeaux mat", "linear-gradient(160deg,#5e1a2e,#2b0f18)"]
  ];
  $("#gallery").innerHTML = styles.map(([n, bg]) => `<div class="tile" style="background:${bg}">${n}</div>`).join("");

  /* ---------- Équipe ---------- */
  $("#team").innerHTML = S.equipe.map(m => `
    <div class="member">
      <div class="avatar">${esc(m.nom[0])}</div>
      <h3>${esc(m.nom)}</h3>
      <p>${esc(m.role)}</p>
      <p><em>${esc(m.specialite)}</em></p>
    </div>`).join("");

  /* ---------- Avis ---------- */
  $("#reviews").innerHTML = S.avis.map(a => `
    <figure class="review">
      <div class="stars" aria-label="${a.note} sur 5">${"★".repeat(a.note)}${"☆".repeat(5 - a.note)}</div>
      <blockquote>« ${esc(a.texte)} »</blockquote>
      <cite>— ${esc(a.auteur)}</cite>
    </figure>`).join("");

  /* ---------- FAQ ---------- */
  $("#faq").innerHTML = S.faq.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.r)}</p></details>`).join("");

  /* ---------- Réservation ---------- */
  const form = $("#booking");
  $("#booking-services").innerHTML = S.prestations.map((p, i) => `
    <label class="check"><input type="checkbox" name="svc" value="${i}">
      <span>${esc(p.nom)}<small>${euro(p.prix)} · ${fmtDuree(p.duree)}</small></span></label>`).join("");

  const selected = () => [...form.querySelectorAll("input[name=svc]:checked")].map(c => S.prestations[c.value]);
  const totalDuree = () => selected().reduce((s, p) => s + p.duree, 0);

  const dateInput = form.date, heureSelect = form.heure;
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  dateInput.min = iso(new Date());
  const max = new Date(); max.setDate(max.getDate() + 60); dateInput.max = iso(max);

  function fillSlots() {
    const prev = heureSelect.value;
    heureSelect.innerHTML = "";
    if (!dateInput.value) { heureSelect.innerHTML = `<option value="">— Choisir une date —</option>`; return; }
    const d = new Date(dateInput.value + "T00:00");
    const h = S.horaires[d.getDay()];
    if (!h) { heureSelect.innerHTML = `<option value="">Fermé ce jour-là</option>`; return; }
    const dur = Math.max(totalDuree(), 15);
    let start = toMin(h[0]);
    const end = toMin(h[1]) - dur;
    const now = new Date();
    if (iso(d) === iso(now)) start = Math.max(start, Math.ceil((now.getHours() * 60 + now.getMinutes() + 30) / 15) * 15);
    const opts = [];
    for (let m = start; m <= end; m += 15) opts.push(fmtMin(m));
    heureSelect.innerHTML = opts.length
      ? `<option value="">— Choisir —</option>` + opts.map(o => `<option${o === prev ? " selected" : ""}>${o}</option>`).join("")
      : `<option value="">Plus de créneau ce jour-là</option>`;
  }

  function updateSummary() {
    const sel = selected();
    $("#summary").textContent = sel.length
      ? `${sel.length} prestation${sel.length > 1 ? "s" : ""} · ${fmtDuree(totalDuree())} · Total estimé ${euro(sel.reduce((s, p) => s + p.prix, 0))}`
      : "Aucune prestation sélectionnée.";
    fillSlots();
  }
  form.addEventListener("change", e => {
    if (e.target.name === "svc") updateSummary();
    if (e.target === dateInput) fillSlots();
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const via = e.submitter?.dataset.via || "whatsapp";
    const err = $("#form-error");
    const sel = selected();
    if (!sel.length) return (err.textContent = "Sélectionnez au moins une prestation.");
    if (!dateInput.value || !heureSelect.value) return (err.textContent = "Choisissez une date et une heure.");
    if (!form.nom.value.trim() || !form.tel.value.trim()) return (err.textContent = "Indiquez votre nom et votre téléphone.");
    err.textContent = "";

    const dateFr = new Date(dateInput.value + "T00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    const total = sel.reduce((s, p) => s + p.prix, 0);
    const msg = [
      `Bonjour ${S.nom}, je souhaite réserver :`,
      ...sel.map(p => `• ${p.nom} (${euro(p.prix)})`),
      `Date : ${dateFr} à ${heureSelect.value}`,
      `Durée estimée : ${fmtDuree(totalDuree())} — Total estimé : ${euro(total)}`,
      `Nom : ${form.nom.value.trim()}`,
      `Téléphone : ${form.tel.value.trim()}`,
      form.message.value.trim() ? `Message : ${form.message.value.trim()}` : ""
    ].filter(Boolean).join("\n");

    const url = via === "email"
      ? `mailto:${S.email}?subject=${encodeURIComponent("Demande de rendez-vous")}&body=${encodeURIComponent(msg)}`
      : `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
  });
})();
