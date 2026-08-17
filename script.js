// Types out "whoami" in the hero prompt. The static text is already in the
// HTML, so a no-JS visitor sees the finished line; this only replays it.
(function () {
  var el = document.getElementById("typed");
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var text = el.textContent;
  el.textContent = "";
  var i = 0;
  var timer = setInterval(function () {
    el.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(timer);
  }, 110);
})();
