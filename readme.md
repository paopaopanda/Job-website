# 簡易求職網站

LINK:http://3.27.197.123:5173/

測試帳號->
求職者: account:test pwd:test
公司: account:com pwd:com

## 簡述

這是一個模擬如 104 人力銀行的全端求職網站。不管是求職者或公司端都可以註冊使用，並在網站上發佈工作或應徵工作。
使用 React 作為前端，express 做為後端，並將資料儲存在 mysql

## 功能

- **註冊/登入:** 選擇身分(求職者或公司)並輸入註冊資料，如註冊成功會跳回首頁。由登入頁登入，如帳號密碼正確會跳至首頁。
- **求職者**
  - **瀏覽工作:** 瀏覽所有公司發佈的工作。
  - **應徵工作:** 可點選工作資訊頁下方的 apply 按鈕應徵工作，若已應徵 apply 按鈕不可使用且反灰。
  - **瀏覽已應徵工作:** 進入 My Apply 頁面可以瀏覽所有應徵的工作，若公司已閱讀該申請工作會反灰。
- **公司**
  - **創建工作:** 點擊 add job 進入創建工作的頁面，輸入工作資訊後發佈。
  - **瀏覽工作:** 可瀏覽自己公司創建的所有工作
  - **瀏覽應徵者:** 點選工作資訊頁最下方的按鈕可以瀏覽申請該工作的求職者，並可以點選 read 表示已閱讀應徵者資訊

## 技術使用

- **前端:** React
- **後端:** Express.js, Node.js，使用 session 進行身分驗證，Sequelize 進行資料庫操作
- **資料庫:** MySQL (經過正規化)
- **API:** 使用 RESTful API 設計模式
- **佈署:** 使用 aws ec2 服務，使用 docker compose 將應用容器化並執行

## 資料庫設計

[View on Eraser![](https://app.eraser.io/workspace/mLO9G12WzycNUAndcqCG/preview?elements=0AOmm5JPOfjzTiHA_dRpEQ&type=embed)](https://app.eraser.io/workspace/mLO9G12WzycNUAndcqCG?elements=0AOmm5JPOfjzTiHA_dRpEQ)
