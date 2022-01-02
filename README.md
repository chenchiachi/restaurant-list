# 餐廳清單

## 基本功能
- 使用者可以透過Email註冊帳號

- 使用者可以透過Facebook登入

- 使用者可以在首頁看到所有餐廳與它們的簡單資料

- 使用者可以再點進去看餐廳的詳細資訊
  
- 使用者可以透過搜尋餐廳名稱來找到特定的餐廳

- 使用者可以新增一家餐廳

- 使用者可以修改一家餐廳的資訊

- 使用者可以刪除一家餐廳

- 使用者可以設定餐廳排序


## 安裝
- git clone  此專案
```
https://github.com/chenchiachi/restaurant-list.git
```
- cd 至專案資料夾
- 安裝 npm 套件
```
npm install
```
- 載入種子資料
```
npm run seed
```
- 使用 npm 開啟程式
```
npm run dev
```

## 版本
- bcryptjs: 2.4.3
- body-parser: 1.19.0
- Bootstrap: 4.2.1
- connect-flash: 0.1.1
- dotenv: 10.0.0
- express: 4.17.1
- express-handlebars: 5.3.3
- express-session: 1.17.2
- method-override: 3.0.0
- mongoose: 5.13.7
- passport: 0.5.2
- passport-facebook: 3.0.0
- passport-local: 1.0.0

## 種子資料
```
email: user1@example.com
password: 12345678
```
```
email: user2@example.com
password: 12345678
```