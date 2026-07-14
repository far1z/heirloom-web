/* Heirloom landing — tiny vanilla enhancements, no dependencies. */
(function () {
  "use strict";

  /* Scroll-reveal for sections below the fold. */
  var revealTargets = document.querySelectorAll(
    ".diagram, .steps > li, .plan, .trust__card, .honesty, .source__inner, .waitlist__card"
  );
  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el, i) {
      el.classList.add("will-reveal");
      el.style.setProperty("--d", (i % 4).toString());
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("will-reveal");
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* Waitlist form: no backend. Store intent locally + mailto fallback,
     and be honest about what happens. */
  var form = document.getElementById("waitlist-form");
  var note = document.getElementById("wl-note");
  if (form && note) {
    var input = document.getElementById("email");
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = (input.value || "").trim();

      if (!emailRe.test(value)) {
        input.setAttribute("aria-invalid", "true");
        input.focus();
        note.textContent = "That email doesn't look right — mind checking it?";
        note.classList.remove("wl-note--ok");
        return;
      }
      input.removeAttribute("aria-invalid");

      /* Persist intent client-side so a returning visitor sees they're on it. */
      try {
        var list = JSON.parse(localStorage.getItem("heirloom.waitlist") || "[]");
        if (list.indexOf(value) === -1) list.push(value);
        localStorage.setItem("heirloom.waitlist", JSON.stringify(list));
      } catch (err) { /* private mode — non-fatal */ }

      form.hidden = true;
      note.classList.add("wl-note--ok");
      note.innerHTML =
        "You're on the list — thank you. We'll be in touch when the signet " +
        "beta opens. Want to be sure we have you? " +
        '<a href="mailto:hello@heirloomcrypto.com?subject=Heirloom%20waitlist&body=' +
        encodeURIComponent("Please add me to the Heirloom waitlist: " + value) +
        '">Send us a note →</a>';
    });

    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true" && emailRe.test(input.value.trim())) {
        input.removeAttribute("aria-invalid");
      }
    });
  }

  /* Subtle active-nav highlight based on section in view. */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__links a[href^='#']"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var navIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (a) {
            a.style.color = a.getAttribute("href") === "#" + entry.target.id
              ? "var(--fg)" : "";
          });
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach(function (s) { navIo.observe(s); });
  }
})();
