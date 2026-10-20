/* ===========================================================
   travelSite 共用顯示設定
   -----------------------------------------------------------
   明暗：三態循環 auto（跟隨系統）→ light → dark → auto
   字級：四段 17 / 19 / 21 / 24（數字是內文的實際 px）

   兩項偏好都存共用 key，所以在任一頁調整，整站都跟著變。
   各頁自己的勾選狀態 key（busan2611.checks / okinawa-2026-done）
   不受影響。
   =========================================================== */
(function () {
  "use strict";

  var THEME_KEY = "travelsite.theme";
  var FS_KEY = "travelsite.fontscale";

  /* 頁面 CSS 的字級基準。--fs = 想要的 px / BASE */
  var FS_BASE = 15;
  var FS_DEFAULT = 17;

  var ORDER = ["auto", "light", "dark"];
  var ICON = { auto: "\uD83C\uDF13", light: "\u2600\uFE0F", dark: "\uD83C\uDF19" };
  var LABEL = { auto: "跟隨系統", light: "亮色", dark: "暗色" };

  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function write(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch (e) {}
  }

  /* ---------------- 明暗 ---------------- */

  function readTheme() {
    var v = read(THEME_KEY);
    return v === "light" || v === "dark" ? v : "auto";
  }

  function applyTheme(mode) {
    var root = document.documentElement;
    if (mode === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", mode);
  }

  function initTheme() {
    var btn = document.getElementById("themeBtn");
    if (!btn) return;

    var mode = readTheme();

    function paint() {
      btn.textContent = ICON[mode];
      btn.title = "主題：" + LABEL[mode];
      btn.setAttribute("aria-label", "主題：" + LABEL[mode] + "，點擊切換");
    }

    applyTheme(mode);
    paint();

    btn.addEventListener("click", function () {
      mode = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
      applyTheme(mode);
      write(THEME_KEY, mode === "auto" ? null : mode);
      paint();
    });
  }

  /* ---------------- 字級 ---------------- */

  function readFontSize(allowed) {
    var v = parseFloat(read(FS_KEY));
    return allowed.indexOf(v) !== -1 ? v : FS_DEFAULT;
  }

  function applyFontSize(px) {
    document.documentElement.style.setProperty("--fs", px / FS_BASE);
  }

  function initFontSize() {
    var group = document.getElementById("fsGroup");
    if (!group) return;

    var btns = [].slice.call(group.querySelectorAll(".fsbtn"));
    if (!btns.length) return;

    var allowed = btns.map(function (b) { return parseFloat(b.dataset.px); });
    var px = readFontSize(allowed);

    function paint() {
      btns.forEach(function (b) {
        b.setAttribute("aria-pressed", parseFloat(b.dataset.px) === px ? "true" : "false");
      });
    }

    applyFontSize(px);
    paint();

    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        px = parseFloat(b.dataset.px);
        applyFontSize(px);
        write(FS_KEY, px === FS_DEFAULT ? null : String(px));
        paint();
      });
    });
  }

  function init() {
    initTheme();
    initFontSize();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
