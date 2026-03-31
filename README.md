# PerpusGas

Repositori ini berisi aplikasi perpustakaan dengan dua bagian utama:

- `Back End` - API berbasis PHP untuk operasi data buku.
- `Front End/UJIAN` - aplikasi React (Vite) sebagai antarmuka pengguna.

## Struktur Folder

```text
PerpusGas-main/
|- Back End/
|  |- db.php
|  `- index.php
`- Front End/
   `- UJIAN/
      |- src/
      |- package.json
      `- ...
```

## Menjalankan Project

### 1) Back End (PHP)

1. Pastikan XAMPP (Apache + MySQL jika dibutuhkan) sudah berjalan.
2. Simpan folder project di dalam `htdocs`.
3. Akses endpoint sesuai konfigurasi di file `Back End/index.php`.

### 2) Front End (React + Vite)

Masuk ke folder frontend lalu jalankan:

```bash
cd "Front End/UJIAN"
npm install
npm run dev
```

Setelah itu buka URL lokal yang ditampilkan Vite (umumnya `http://localhost:5173`).

## Environment Variables

1. Copy template:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# macOS/Linux
cp .env.example .env
```

2. Sesuaikan nilainya:

- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS` untuk koneksi MySQL backend.
- `VITE_API_BASE_URL` untuk endpoint API backend yang dipakai frontend.

Contoh default sudah tersedia di `.env.example`.

## Catatan

- File sensitif seperti `.env` tidak ikut ter-commit karena sudah diatur di `.gitignore` root.
- Template env tersedia di `.env.example`.
