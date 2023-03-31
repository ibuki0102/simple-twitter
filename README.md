# Simple Twitter

Simple Twitter 是一個可以讓使用者互相交流的社交網站。
使用者可以藉由推文、回覆推文、喜歡推文、查看他人資訊頁與追隨使用者等，與其他使用者進行互動。使用者還可以編輯個人資訊、上傳照片等打造專屬於自己獨特的個人資料。

## 預覽圖片


**查看所有推文**
![image](/public/查看所有推文.png)

**編輯個人資料**
![image](/public/編輯個人資料.png)

- 網站連結：[Simple Twitter](https://ibuki0102.github.io/simple-twitter/)
- 前台測試帳號：`user1` 密碼：`12345678`
- 後台測試帳號：`root` 密碼：`12345678`
- 為 ALPHA Camp 小組協作之畢業專案，由兩位前端與兩位後端以前後分離模式進行開發。

## 專案功能

- 前台使用者可以
  - 註冊帳號、密碼。
  - 登入網站。
  - 在「首頁」查看所有推文。
  - 看到推薦跟隨 (熱門前 10 位)。
  - 點擊「推文」進行推文。
  - 在「個人資料頁」查看使用者的「推文」、「回覆」、「喜歡的內容」、「跟隨中」及「跟隨者」。
  - 點擊特定使用者頭像進入他人資料頁查看其他使用者資訊。
  - 點擊特定推文進行回覆。
  - 對推文按喜歡/取消喜歡。
  - 追隨/取消追隨其他使用者。
  - 點擊「編輯個人資料」修改簡介、上傳頭貼與封面照片。
  - 在「設定」編輯個人資訊。
- 後台管理員可以
  - 查看網站上所有推文。
  - 刪除特定推文。
  - 查看網站上所有使用者。

## 安裝流程

1. 確認本地環境已下載 npm 及 Node.js。

2. 開啟終端機 (Terminal)，輸入以下指令下載本專案。

```
git clone https://github.com/ibuki0102/simple-twitter.git
```

3. 輸入以下指令進入此專案的資料夾。

```
cd simple-twitter
```

4. 輸入 npm 安裝指令。

```
npm install
```

5. 安裝完成後輸入以下指令開啟專案。

```
npm start
```

6. 瀏覽器自動開啟畫面即成功。

## 開發工具

- React 18.2.0
- Axios 0.27.2
- React Router 6.4.1
- Sass 1.59.3

## 開發人員

- [雪央](https://github.com/ibuki0102)
- [Jasmine](https://github.com/chenchiahsiu)
- [Watson](https://github.com/hl94vul3h6)
- [Ray](https://github.com/RayYangTW)
