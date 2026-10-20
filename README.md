# travelSite

個人旅遊行程表，透過 GitHub Pages 發佈，方便分享給同行者在手機上查看。

**網站：** https://yofishyo.github.io/travelSite/

## 行程

| 行程 | 日期 | 路徑 |
|---|---|---|
| 釜山五天四夜 | 2026/11/03 – 11/07 | [`busan-2026/`](busan-2026/) |
| 沖繩五天四夜 | 2026/09/28 – 10/02 | [`okinawa-2026/`](okinawa-2026/) |

## assets/ — 共用明暗主題

`assets/theme.css` 與 `assets/theme.js` **只負責明暗切換這件事**，不定義任何行程的配色。
各行程頁保留自己的色票（釜山是 `--bg`／`--camellia`，沖繩是 `--ground`／`--accent`），互不干擾。

- 切換鈕是三態循環：**🌓 跟隨系統 → ☀️ 亮色 → 🌙 暗色 → 🌓**
- 偏好存在共用 key `travelsite.theme`，所以在任一頁切換，整站都會跟著變
- 各頁自己的勾選狀態（`busan2611.checks`、`okinawa-2026-done`）不受影響

## 如何新增一個行程

1. 在根目錄開一個新資料夾，**用英文/數字命名**（例：`kyoto-2027`）。
   中文資料夾名在網址會變成 `%E4%BA%AC%E9%83%BD` 這種亂碼。
2. 把行程 HTML 放進去並命名為 `index.html`，開頭必須帶這段檔頭：

   ```html
   <!DOCTYPE html>
   <html lang="zh-Hant">
   <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta name="color-scheme" content="light dark">
   <meta name="robots" content="noindex, nofollow">
   <title>行程名稱</title>
   <script>try{var t=localStorage.getItem("travelsite.theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}</script>
   <link rel="stylesheet" href="../assets/theme.css">
   <script defer src="../assets/theme.js"></script>
   ```

   - **`viewport` 這行絕對不能少** —— 少了手機會用桌面寬度渲染，字小到看不清楚。
   - **那段 inline `<script>` 要留在 `<style>` 之前**，它負責在畫面繪製前就套好主題，少了會在重整時閃一下白底。
   - 檔案結尾記得收 `</body></html>`。

3. 頁面的配色要寫成三段式，切換鈕才有作用：

   ```css
   :root{ /* 亮色色票 */ }
   @media (prefers-color-scheme:dark){
     :root:not([data-theme="light"]){ /* 暗色色票 */ }
   }
   :root[data-theme="dark"]{ /* 同一份暗色色票 */ }
   ```

4. 導覽列外層包一個 `.themebar`，把切換鈕放在可捲動連結列的後面：

   ```html
   <nav>
     <div class="themebar">
       <div class="scroller"><!-- 日期連結 --></div>
       <button id="themeBtn" class="themebtn" type="button" aria-label="切換明暗模式">🌓</button>
     </div>
   </nav>
   ```

5. 編輯根目錄 `index.html`，複製一個 `<a class="trip">` 區塊改成新行程。
6. 推送：

   ```bash
   git add .
   git commit -m "新增京都行程"
   git push
   ```

約 1 分鐘後自動上線於 `https://yofishyo.github.io/travelSite/kyoto-2027/`。

## 注意事項

- 這是 **public repository**，網頁與原始碼任何人都看得到，commit 歷史也刪不乾淨。
- **請勿放入**：護照影本、訂房確認號、機票訂位代號（PNR）、信用卡資訊、同行者全名與電話。
- 網址路徑**區分大小寫**，分享時 `travelSite` 的 `S` 要大寫。
