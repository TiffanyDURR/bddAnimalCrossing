import { villageois } from "../data.js";

let dataAmiibo = [...villageois];

const searchInput = document.getElementById("search");
const filterByNumberButton = document.getElementById("numero");
const filterByBirthdayDateButton = document.getElementById("anniversaire");
const serieContainer = document.getElementById("serie");
const raceContainer = document.getElementById("race");
const caractereContainer = document.getElementById("caractere");
const couleurContainer = document.getElementById("couleur");
const resultatContainer = document.getElementById("resultat");
const cards = document.querySelector(".cards");
const birthdayBoii = document.getElementById("luckyone");
const selectedFilters = document.getElementById("selected-filters");

const birthdayIcon = `
<svg viewBox="0 0 640 640" aria-hidden="true">
  <path d="M182.4 53.5L157.8 95.6C154 102.1 152 109.6 152 117.2L152 120C152 142.1 169.9 160 192 160C214.1 160 232 142.1 232 120L232 117.2C232 109.6 230 102.2 226.2 95.6L201.6 53.5C199.6 50.1 195.9 48 192 48C188.1 48 184.4 50.1 182.4 53.5zM310.4 53.5L285.8 95.6C282 102.1 280 109.6 280 117.2L280 120C280 142.1 297.9 160 320 160C342.1 160 360 142.1 360 120L360 117.2C360 109.6 358 102.2 354.2 95.6L329.6 53.5C327.6 50.1 323.9 48 320 48C316.1 48 312.4 50.1 310.4 53.5zM413.8 95.6C410 102.1 408 109.6 408 117.2L408 120C408 142.1 425.9 160 448 160C470.1 160 488 142.1 488 120L488 117.2C488 109.6 486 102.2 482.2 95.6L457.6 53.5C455.6 50.1 451.9 48 448 48C444.1 48 440.4 50.1 438.4 53.5L413.8 95.6zM224 224C224 206.3 209.7 192 192 192C174.3 192 160 206.3 160 224L160 277.5C122.7 290.6 96 326.2 96 368L96 388.8C116.9 390.1 137.6 396.1 156.3 406.8L163.4 410.9C189.7 425.9 222.3 424.3 247 406.7C290.7 375.5 349.3 375.5 393 406.7C417.6 424.3 450.3 426 476.6 410.9L483.7 406.8C502.4 396.1 523 390.1 544 388.8L544 368C544 326.2 517.3 290.6 480 277.5L480 224C480 206.3 465.7 192 448 192C430.3 192 416 206.3 416 224L416 272L352 272L352 224C352 206.3 337.7 192 320 192C302.3 192 288 206.3 288 224L288 272L224 272L224 224zM544 437C531.3 438.2 518.9 442 507.5 448.5L500.4 452.6C457.8 476.9 405 474.3 365.1 445.8C338.1 426.5 301.9 426.5 274.9 445.8C235 474.3 182.2 477 139.6 452.6L132.5 448.5C121.1 442 108.7 438.1 96 437L96 512C96 547.3 124.7 576 160 576L480 576C515.3 576 544 547.3 544 512L544 437z"/>
</svg>`.trim();

function card(amiibo) {
  return `
  <div class="card">
    <div class="img">
      <img src="assets/${amiibo.nomEN}.png" alt="${amiibo.nomFR}" />
    </div>
    <div class="inner">
      <span class="race">${amiibo.race}</span>
      <span class="serie">Série : ${amiibo.serie}</span>
      <span class="serie">${amiibo.numero}</span>
      <h1><span>EN</span> ${amiibo.nomEN}</h1>
      <h2><span>FR</span> ${amiibo.nomFR}</h2>
      <span class="caractere">${amiibo.caractere}</span>
      <span class="anniversaire">${birthdayIcon} ${amiibo.anniversaire}</span>
    </div>
  </div>`;
}

function render(list) {
  cards.innerHTML = list.map(card).join("");
  resultatContainer.textContent = list.length;
}

function filterByNumber(a, b) {
  const getRank = (num) => {
    if (/^\d+$/.test(num)) return 0;
    if (num.startsWith("WA")) return 1;
    if (num.startsWith("S")) return 2;
    return 3;
  };
  const ra = getRank(a.numero);
  const rb = getRank(b.numero);
  if (ra !== rb) return ra - rb;
  if (ra === 0) return parseInt(a.numero) - parseInt(b.numero);
  return a.numero.localeCompare(b.numero);
}

function filterByBirthday(a, b) {
  const [da, ma] = a.anniversaire.split("/").map(Number);
  const [db, mb] = b.anniversaire.split("/").map(Number);
  return ma - mb || da - db || a.nomFR.localeCompare(b.nomFR);
}

function init() {
  render(dataAmiibo);
}
init();

function findTodayBirthdayIndex() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const todayStr = `${dd}/${mm}`;
  const index = dataAmiibo.findIndex((v) => v.anniversaire === todayStr);
  if (index !== -1) {
    birthdayBoii.innerHTML = `
      <div class="card">
    <div class="img">
      <img src="assets/${dataAmiibo[index].nomEN}.png" alt="${dataAmiibo[index].nomFR}" />
    </div>
    <div class="inner">
    <h1>Aujourd'hui, c'est son anniversaire !</h1>
          <span class="anniversaire">${birthdayIcon} ${dataAmiibo[index].anniversaire}</span>
      <h1><span>EN</span> ${dataAmiibo[index].nomEN}</h1>
      <h2><span>FR</span> ${dataAmiibo[index].nomFR}</h2>
    </div>
  </div>`;
  } else {
    console.log("Personne ne fête son putain d'anniversaire");
  }
  return index;
}
findTodayBirthdayIndex();

function unique(arr) {
  return [...new Set(arr)];
}
function bySel(sel, root = document) {
  return root.querySelector(sel);
}
function bySelAll(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}
function norm(s) {
  return (s ?? "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

const selectedBox = bySel("#selected-filters");
const listsRoot = bySel(".filtres-inner");
const serieBox = bySel("#serie");
const caractereBox = bySel("#caractere");
const couleurBox = bySel("#couleur");
const raceBox = bySel("#race");

function buildSerieList() {
  const order = ["1", "2", "3", "4", "5", "Welcome Amiibo", "Sanrio"];
  const vals = unique(dataAmiibo.map((v) => v.serie)).sort((a, b) => order.indexOf(a) - order.indexOf(b));
  serieBox.innerHTML = vals.map((s) => `<span class="filterL" data-cat="serie" data-value="${s}">Série : ${s}</span>`).join("");
}
function buildCaractereList() {
  const vals = unique(dataAmiibo.map((v) => v.caractere));
  caractereBox.innerHTML = vals.map((s) => `<span class="filterL" data-cat="caractere" data-value="${s}">${s}</span>`).join("");
}
function buildCouleurList() {
  const vals = unique(dataAmiibo.flatMap((v) => v.couleur || []));
  couleurBox.innerHTML = vals.map((c) => `<span class="filterL" data-cat="couleur" data-value="${c}">${c}</span>`).join("");
}
function buildRaceList() {
  const vals = unique(dataAmiibo.map((v) => v.race));
  raceBox.innerHTML = vals.map((r) => `<span class="filterL" data-cat="race" data-value="${r}">${r}</span>`).join("");
}

function addTag(cat, val) {
  const exists = bySel(`.tag[data-cat="${cat}"][data-value="${CSS.escape(val)}"]`, selectedBox);
  if (exists) return;
  selectedBox.insertAdjacentHTML(
    "beforeend",
    `
    <span class="tag" data-cat="${cat}" data-value="${val}">
      ${val}
      <button class="tag-x" aria-label="retirer">x</button>
    </span>
  `
  );
  const src = bySel(`.filterL[data-cat="${cat}"][data-value="${CSS.escape(val)}"]`);
  src?.classList.add("active");
  applyFilters();
}

function removeTag(elTag) {
  const cat = elTag.dataset.cat;
  const val = elTag.dataset.value;
  const src = bySel(`.filterL[data-cat="${cat}"][data-value="${CSS.escape(val)}"]`);
  src?.classList.remove("active");
  elTag.remove();
  applyFilters();
}

let currentSort = null;
let currentSearch = "";

function applyFilters() {
  const tags = bySelAll(".tag", selectedBox).reduce((acc, t) => {
    const cat = t.dataset.cat,
      val = t.dataset.value;
    (acc[cat] ||= []).push(val);
    return acc;
  }, {});
  const q = norm(currentSearch);
  const list = dataAmiibo.filter((v) => {
    if (tags.serie && tags.serie.length && !tags.serie.includes(v.serie)) return false;
    if (tags.caractere && tags.caractere.length && !tags.caractere.includes(v.caractere)) return false;
    if (tags.race && tags.race.length && !tags.race.includes(v.race)) return false;
    if (tags.couleur && tags.couleur.length) {
      const has = (v.couleur || []).some((c) => tags.couleur.includes(c));
      if (!has) return false;
    }
    if (q) {
      const hay = [v.nomFR, v.nomEN].map(norm).join(" ");
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  if (currentSort === "number") list.sort(filterByNumber);
  else if (currentSort === "birthday") list.sort(filterByBirthday);
  render(list);
}

listsRoot.addEventListener("click", (e) => {
  const chip = e.target.closest(".filterL");
  if (!chip) return;
  addTag(chip.dataset.cat, chip.dataset.value);
});

selectedBox.addEventListener("click", (e) => {
  const btn = e.target.closest(".tag-x");
  if (!btn) return;
  const tag = btn.closest(".tag");
  removeTag(tag);
});

filterByNumberButton.addEventListener("click", () => {
  currentSort = "number";
  applyFilters();
});

filterByBirthdayDateButton.addEventListener("click", () => {
  currentSort = "birthday";
  applyFilters();
});

searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value || "";
  applyFilters();
});

buildSerieList();
buildCaractereList();
buildCouleurList();
buildRaceList();
applyFilters();
