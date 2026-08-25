/* ============================================================
   Max Resch Website — Navigation, Scroll-Reveal, Kalender,
   Veranstaltungsliste, Buchungsformular
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initBookingForm();

  const list = document.getElementById("event-list");
  const calRoot = document.getElementById("calendar");
  if (list || calRoot) {
    if (list) list.innerHTML = '<p class="lead">Termine werden geladen …</p>';
    loadEvents().then((events) => {
      initEventList(events);
      initCalendar(events);
    });
  }
});

/* ---------- Mobile Navigation ---------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* ---------- Scroll-Reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal:not(.visible)");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }
  let ioFired = false;
  const io = new IntersectionObserver(
    (entries) => {
      ioFired = true;
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));

  // Sicherheitsnetz: falls der Observer nicht anspringt (z.B. in
  // eingebetteten Vorschau-Umgebungen), alles sichtbar machen.
  setTimeout(() => {
    if (!ioFired) els.forEach((el) => el.classList.add("visible"));
  }, 900);
}

/* ---------- Hilfsfunktionen ---------- */
const MONTHS_DE = [
  "Jänner", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];
const MONTHS_SHORT_DE = [
  "Jän", "Feb", "Mär", "Apr", "Mai", "Jun",
  "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
];

function parseISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/* ---------- Veranstaltungsliste (kommende Termine) ---------- */
function initEventList(events) {
  const list = document.getElementById("event-list");
  if (!list) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .filter((ev) => parseISO(ev.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (!upcoming.length) {
    list.innerHTML =
      '<p class="lead">Derzeit sind keine Termine online — neue Workshops werden laufend angekündigt. Schau bald wieder vorbei oder stelle eine <a href="buchung.html">Anfrage</a>!</p>';
    return;
  }

  list.innerHTML = upcoming
    .map((ev) => {
      const d = parseISO(ev.date);
      const badge = ev.badge
        ? `<span class="event-badge">${ev.badge}</span>`
        : "";
      return `
      <article class="event-item reveal">
        <div class="event-date" aria-hidden="true">
          <span class="day">${d.getDate()}</span>
          <span class="month">${MONTHS_SHORT_DE[d.getMonth()]} ${String(d.getFullYear()).slice(2)}</span>
        </div>
        <div class="event-info">
          <h3>${ev.title}${badge}</h3>
          <p>${ev.time} Uhr · ${ev.place}</p>
          <p>${ev.desc}</p>
        </div>
        <a class="btn btn--ghost" href="buchung.html">Platz sichern</a>
      </article>`;
    })
    .join("");

  // Reveal für dynamisch erzeugte Elemente aktivieren
  initReveal();
}

/* ---------- Kalender ---------- */
function initCalendar(events) {
  const calRoot = document.getElementById("calendar");
  if (!calRoot) return;

  const eventsByDate = {};
  events.forEach((ev) => {
    (eventsByDate[ev.date] = eventsByDate[ev.date] || []).push(ev);
  });

  const now = new Date();
  let viewYear = now.getFullYear();
  let viewMonth = now.getMonth();

  const title = calRoot.querySelector(".cal-title");
  const grid = calRoot.querySelector(".calendar-grid");
  const detail = calRoot.querySelector(".cal-detail");

  calRoot.querySelector(".cal-prev").addEventListener("click", () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    render();
  });
  calRoot.querySelector(".cal-next").addEventListener("click", () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    render();
  });

  function render() {
    title.textContent = `${MONTHS_DE[viewMonth]} ${viewYear}`;
    detail.classList.remove("show");
    detail.innerHTML = "";

    const dows = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    let html = dows.map((d) => `<div class="dow">${d}</div>`).join("");

    const firstDay = new Date(viewYear, viewMonth, 1);
    // Montag als Wochenstart
    const offset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const today = new Date();
    const todayISO = isoOf(today.getFullYear(), today.getMonth(), today.getDate());

    for (let i = 0; i < offset; i++) {
      html += '<div class="cal-day empty"></div>';
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const iso = isoOf(viewYear, viewMonth, day);
      const has = eventsByDate[iso];
      const cls = [
        "cal-day",
        iso === todayISO ? "today" : "",
        has ? "has-event" : ""
      ].join(" ").trim();
      if (has) {
        html += `<button type="button" class="${cls}" data-date="${iso}" aria-label="Termin am ${day}. ${MONTHS_DE[viewMonth]}"><span>${day}</span><span class="dot"></span></button>`;
      } else {
        html += `<div class="${cls}"><span>${day}</span></div>`;
      }
    }
    grid.innerHTML = html;

    grid.querySelectorAll(".cal-day.has-event").forEach((btn) => {
      btn.addEventListener("click", () => {
        grid.querySelectorAll(".cal-day.selected").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        showDetail(btn.dataset.date);
      });
    });
  }

  function showDetail(iso) {
    const evs = eventsByDate[iso] || [];
    detail.innerHTML = evs
      .map(
        (ev) => `
        <h4>${ev.title}</h4>
        <p>${formatDateDE(iso)} · ${ev.time} Uhr · ${ev.place}</p>
        <p>${ev.desc}</p>
        <a class="btn btn--primary" href="buchung.html">Jetzt buchen <span class="arrow">→</span></a>`
      )
      .join("<hr style='margin:1rem 0;border:none;border-top:1px dashed #ccc'>");
    detail.classList.add("show");
  }

  function isoOf(y, m, d) {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  function formatDateDE(iso) {
    const d = parseISO(iso);
    return `${d.getDate()}. ${MONTHS_DE[d.getMonth()]} ${d.getFullYear()}`;
  }

  render();
}

/* ---------- Buchungsformular (mailto-Fallback / Formspree-ready) ---------- */
function initBookingForm() {
  const form = document.getElementById("booking-form");
  if (!form) return;

  /* OPTION FORMSPREE (empfohlen, sobald Account vorhanden):
     1. Gratis-Account auf formspree.io anlegen, Formular erstellen
     2. Die Endpoint-URL unten eintragen, z.B. "https://formspree.io/f/abcdwxyz"
     Solange FORMSPREE_ENDPOINT leer ist, öffnet das Formular das
     E-Mail-Programm der Besucher:in (mailto-Fallback). */
  const FORMSPREE_ENDPOINT = "";
  const CONTACT_EMAIL = "info@maxresch.eu"; // ACHTUNG: Postfach muss eingerichtet sein!

  const msg = document.getElementById("form-msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.className = "form-msg";

    const data = Object.fromEntries(new FormData(form).entries());

    if (FORMSPREE_ENDPOINT) {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("send failed");
        msg.textContent = "Danke für deine Anfrage! Du bekommst so bald wie möglich eine Antwort.";
        msg.classList.add("ok");
        form.reset();
      } catch (err) {
        msg.textContent = "Ups — das hat leider nicht geklappt. Bitte versuche es später erneut oder schreib direkt an " + CONTACT_EMAIL;
        msg.classList.add("err");
      }
    } else {
      // mailto-Fallback: öffnet das E-Mail-Programm mit vorausgefüllter Nachricht
      const subject = encodeURIComponent(`Buchungsanfrage: ${data.angebot || "Allgemein"}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nE-Mail: ${data.email}\nAngebot: ${data.angebot}\nWunschtermin: ${data.termin || "-"}\n\nNachricht:\n${data.nachricht || "-"}`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      msg.textContent = "Dein E-Mail-Programm öffnet sich mit der vorbereiteten Anfrage — einfach absenden!";
      msg.classList.add("ok");
    }
  });
}

/* ---------- Cal.com-Einbindung (derzeit NICHT aktiv) ---------- */
/* Die Buchungsseite bietet auf Kundenwunsch nur das Anfrage-Formular an.
   Diese Funktion bleibt vorbereitet, falls die Online-Buchung später doch
   kommen soll: dazu in buchung.html einen Container <div id="cal-embed">
   einfügen und mountCalEmbed("benutzer/event-typ") aufrufen. */
function mountCalEmbed(calLink) {
  const target = document.getElementById("cal-embed");
  const placeholder = document.getElementById("cal-placeholder");
  if (!target || !calLink) return;

  if (placeholder) placeholder.style.display = "none";
  target.style.display = "block";

  const script = document.createElement("script");
  script.src = "https://app.cal.com/embed/embed.js";
  script.onload = () => {
    /* global Cal */
    Cal("init", { origin: "https://cal.com" });
    Cal("inline", {
      elementOrSelector: "#cal-embed",
      calLink: calLink,
      layout: "month_view"
    });
  };
  document.head.appendChild(script);
}
