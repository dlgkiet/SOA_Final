# 🚀 SOA Final Project

## 📌 Giới thiệu
Dự án *SOA Final* là một hệ thống quản lý khóa học trực tuyến, được xây dựng theo mô hình *Layered Architecture*. Dự án bao gồm các thành phần chính:
- **🖥 Backend:** Được phát triển bằng *.NET Core*
- **🌐 Frontend:** Được phát triển bằng *React + TypeScript*
- **🗄 Database:** Sử dụng *PostgreSQL*

## 🏛 Kiến trúc Layered Architecture trong dự án
Dự án sử dụng kiến trúc *Layered Architecture* với các lớp chính:
- **🔍 Presentation Layer** (Frontend - React) : Hiển thị giao diện người dùng, gọi API.
- **⚙️ Service Layer**: Xử lý logic nghiệp vụ, giao tiếp với tầng dữ liệu.
- **🗄 Data Access Layer**: Quản lý truy cập dữ liệu bằng Entity Framework Core.
- **📦 Core Layer**: Chứa các thực thể và mô hình dữ liệu chung.

Mỗi lớp có vai trò riêng biệt, giúp cải thiện tính bảo trì và mở rộng của hệ thống.

## 📂 Cấu trúc thư mục
```
dlgkiet-soa_final/
├── SOA_Final.sln
├── API/  # Backend API Server
│   ├── Controllers/
│   ├── appsettings.json
│   ├── Program.cs
├── Core/  # Core Entities & Models
├── DataAccess/  # Data Access Layer
├── frontend/  # Frontend React Application
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
└── Service/  # Service Layer
```

## ⚙️ Cài đặt
### 1️⃣ Cài đặt Backend (.NET Core + PostgreSQL + JWT)
#### 🛠 Yêu cầu hệ thống
- *.NET SDK 8.0.10*
- *PostgreSQL 14+*

#### 🔧 Các bước cài đặt
Cài đặt thư viện PostgreSQL và JWT Authentication bằng lệnh:
```sh
cd API
# Cài đặt thư viện PostgreSQL và JWT
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

Cấu hình kết nối PostgreSQL trong `appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=soa_db;Username=postgres;Password=yourpassword"
}
```

Chạy ứng dụng backend:
```sh
dotnet restore
dotnet run
```

### 2️⃣ Cài đặt Frontend (React + TypeScript)
#### 🛠 Yêu cầu hệ thống
- *Node.js 18+*
- *npm 9+ hoặc yarn*

#### 🔧 Các bước cài đặt
```sh
cd frontend
# Cài đặt dependencies
npm install
# Chạy ứng dụng frontend
npm run dev
```

## 🏗 Công nghệ sử dụng
### 🔙 Backend:
- *ASP.NET Core 8.0.10* - Xây dựng API
- *Entity Framework Core* - ORM cho PostgreSQL
- *JWT Authentication* - Xác thực người dùng
- *FluentValidation* - Kiểm tra dữ liệu đầu vào

### 🎨 Frontend:
- *React 18* - Thư viện UI chính
- *TypeScript* - Ngôn ngữ lập trình
- *TailwindCSS* - Framework UI
- *Axios* - Thư viện gọi API
- *Zustand* - Quản lý state
- *React Router* - Quản lý điều hướng

## 🚀 Triển khai (Deployment)
### 🖥 Backend:
- Sử dụng *Docker* để container hóa ứng dụng.
- Cấu hình trong `appsettings.json` để kết nối với PostgreSQL.
- **Triển khai trên Render** thay vì AWS hoặc Azure.

### 🌍 Frontend:
- Build ứng dụng bằng lệnh:
  ```sh
  npm run build
  ```
- Triển khai trên **Vercel**, **Netlify** hoặc **Render**.

## 👨‍💻 Tác giả
- *👤 Dương Lâm Gia Kiệt* - [GitHub](https://github.com/dlgkiet)
- *👤 Đoàn Thanh Lâm* - [GitHub](https://github.com/thanhlamcode)
- *👤 Đỗ Trọng Hiếu* - [GitHub](https://github.com/Hiu11)

📢 Dự án vẫn đang trong quá trình phát triển. Nếu bạn có góp ý hoặc phát hiện lỗi, vui lòng liên hệ qua email hoặc tạo issue trên GitHub!
