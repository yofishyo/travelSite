# travelSite

個人旅遊行程表，透過 GitHub Pages 發佈，方便分享給同行者在手機上查看。

**網站：** https://yofishyo.github.io/travelSite/

## 行程

| 行程 | 日期 | 路徑 |
|---|---|---|
| 釜山五天四夜 | 2026/11/03 – 11/07 | [`busan-2026/`](busan-2026/) |
| 沖繩五天四夜 | 2026/09/28 – 10/02 | [`okinawa-2026/`](okinawa-2026/) |

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
   ```

   其中 **`viewport` 這行絕對不能少** —— 少了手機會用桌面寬度渲染，字小到看不清楚。
   檔案結尾記得收 `</body></html>`。

3. 編輯根目錄 `index.html`，複製一個 `<a class="trip">` 區塊改成新行程。
4. 推送：

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
