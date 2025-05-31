# React + Vite - Trang Web Cá Nhân

Đây là project web cá nhân sử dụng React + Vite, giao diện hiện đại, responsive, có các button: Giới thiệu, Blog, Contact. Khi click từng button sẽ hiện phần nội dung tương ứng (SPA, không reload trang).

## Chạy local

```powershell
npm install
npm run dev
```

## Build và deploy lên GitHub Pages

1. Mở `vite.config.js` và chỉnh sửa trường `base` thành `/tên-repo-của-bạn/` (ví dụ: `/3105_test-git-pro/`).
2. Build project:

```powershell
npm run build
```

3. Cài đặt package hỗ trợ deploy (chạy 1 lần):
```powershell
npm install --save-dev gh-pages
```

4. Thêm vào `package.json`:
```json
"homepage": "https://<tên-tài-khoản-github>.github.io/<tên-repo>/",
"scripts": {
  ...existing scripts...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

5. Deploy:
```powershell
npm run deploy
```

6. Truy cập trang: `https://<tên-tài-khoản-github>.github.io/<tên-repo>/`

---

- Đổi thông tin cá nhân, blog, contact trong `src/App.jsx` theo ý bạn.
- Giao diện responsive, tối ưu cho cả mobile và desktop.
