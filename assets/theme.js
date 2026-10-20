/* ===========================================================
   travelSite 共用明暗切換
   -----------------------------------------------------------
   三態循環：auto（跟隨系統）→ light → dark → auto
   偏好存在共用 key，所以在任一頁切換，整站都跟著變。
   各頁自己的勾選狀態 key（busan2611.checks / okinawa-2026-done）
   不受影響。
   =========================================================== */
(function () {
  "use strict";

  var KEY = "travelsite.theme";
  var ORDER = ["auto", "light", "dark"];
  var ICON = { auto: "\uD83C\uDF13", light: "\u2600\uFE0F", dark: "\uD83C\uDF19" };
  var LABEL = { auto: "跟隨系統", light: "亮色", dark: "暗色" };

  function read() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "light" || v === "dark" ? v : "auto";
    } catch (e) {
      return "auto";
    }
  }

  function write(mode) {
    try {
      if (mode === "auto") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, mode);
    } catch (e) {}
  }

  function apply(mode) {
    var root = document.documentElement;
    if (mode === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", mode);
  }

  function init() {
    var btn = document.getElementById("themeBtn");
    if (!btn) return;

    var mode = read();

    function paint() {
      btn.textContent = ICON[mode];
      btn.title = "主題：" + LABEL[mode];
      btn.setAttribute("aria-label", "主題：" + LABEL[mode] + "，點擊切換");
    }

    apply(mode);
    paint();

    btn.addEventListener("click", function () {
      mode = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
      apply(mode);
      write(mode);
      paint();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
