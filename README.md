# 🌐 Alla — Bolalar uchun xavfsiz internet makoni

> **Next.js 15**, **TypeScript**, **Ant Design**, **React Query** va **Modular folder structure** asosida qurilgan web platforma.  
> Maqsad — bolalar uchun **ta’limiy va tarbiyaviy** kontentni xavfsiz tarzda taqdim etish.

---

## 🚀 Texnologiyalar

| Texnologiya                         | Tavsif                                                     |
| ----------------------------------- | ---------------------------------------------------------- |
| **Next.js 15 (App Router)**         | Server & client komponentlar asosida zamonaviy arxitektura |
| **TypeScript**                      | Kuchli tiplash va ishonchli kod                            |
| **Ant Design**                      | UI komponentlar va dizayn tizimi                           |
| **React Query**                     | Data fetching va caching uchun                             |
| **Axios (custom request instance)** | API chaqiriqlari uchun                                     |
| **Tailwind CSS**                    | Minimalistik va responsive styling                         |
| **Framer Motion**                   | Animatsiyalar va UI o‘tishlari uchun                       |
| **ESLint + Prettier**               | Kod sifatini saqlash                                       |

---

## 🧱 Loyihaning tuzilmasi

```
src/
├─ app/
│  ├─ (admin)/               # Admin panel layout va sahifalari
│  ├─ (client)/              # Foydalanuvchi uchun sahifalar
│  ├─ _components/           # Umumiy komponentlar (Navbar, Sidebar, Header va b.)
│  ├─ layout.tsx             # Root layout
│  ├─ globals.css            # Umumiy style fayllar
│  └─ page.tsx               # Home sahifa
│
├─ entities/
│  ├─ Auth/                  # Auth (send-otp, verify-otp) API va hooklar
│  └─ Categories/            # Kategoriya bilan bog‘liq querylar
│
├─ providers/
│  ├─ AuthProvider.tsx
│  ├─ QueryProvider.tsx
│  └─ AntdProvider.tsx
│
├─ services/
│  └─ api.ts                 # Axios instance
│
└─ public/
   └─ fonts/                 # Nunito font fayllari
```

---

## ⚙️ O‘rnatish

### 1️⃣ Clone repository

```bash
git clone https://github.com/yourusername/alla.git
cd alla
```

### 2️⃣ Dependensiyalarni o‘rnatish

```bash
npm install
```

### 4️⃣ Ishga tushirish

```bash
npm run dev
```

Brauzerda oching 👉 `http://localhost:3000`

---

## 🔑 Auth API (OTP tizimi)

| Hook             | Endpoint           | Tavsif                       |
| ---------------- | ------------------ | ---------------------------- |
| `useSendOtp()`   | `/auth/send-otp`   | Telefon raqamga OTP yuboradi |
| `useVerifyOtp()` | `/auth/verify-otp` | OTP kodni tekshiradi         |

**Example:**

```ts
const { mutate: sendOtp, isLoading } = useSendOtp();

sendOtp("+998901234567", {
  onSuccess: () => console.log("OTP yuborildi!"),
});
```

---

## 🎨 Fontlar

**Nunito** shrift ishlatiladi (local versiya):

```
public/fonts/Nunito-Regular.ttf
public/fonts/Nunito-Bold.ttf
```

`globals.css`:

```css
@font-face {
  font-family: "Nunito";
  src: url("/fonts/Nunito-Regular.ttf") format("truetype");
  font-weight: 400;
}
body {
  font-family: "Nunito", sans-serif;
}
```

---

## 🧠 Xususiyatlar

✅ OTP asosida autentifikatsiya  
✅ Admin va foydalanuvchi layoutlari ajratilgan  
✅ Protected route (faqat token bilan kirish mumkin bo‘lgan sahifalar)  
✅ Ant Design asosida yagona UI  
✅ Query caching (React Query bilan)  
✅ Responsive va tez ishlaydigan interfeys

---
