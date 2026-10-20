# BECE Content Studio v2

Aplikasi mandiri untuk merancang konten Instagram @bece.asia. Versi ini berbasis HTML, CSS dan JavaScript statis; bukan kode proyek Lovable.

## Status

- GitHub: terpasang dalam repo `beceasia/web` di folder ini.
- Vercel: belum terpasang; koneksi Vercel yang tersedia tidak mengizinkan pembuatan proyek baru (403). Harus diimpor dari dashboard akun pemilik.

## Deploy Vercel

1. Di Vercel pilih **Add New → Project** pada tim **beceasia's projects**.
2. Impor repositori GitHub `beceasia/web`.
3. Isi **Project Name** dengan `bece-content-studio`.
4. Isi **Root Directory** dengan `apps/bece-content-studio`.
5. Framework Preset: **Other** atau **No Framework**.
6. Build Command: `npm run build`. Output Directory: `dist`. Tidak perlu memasukkan environment variables.
7. Tekan Deploy, lalu pastikan halaman Dashboard, Bank Ide, Studio Naskah, editor Carousel dan Kalender dapat dibuka.

Konfigurasi build dan output disediakan di `vercel.json`. Pembuatan proyek terpisah tidak mengubah deployment website utama bece.asia.

## Source dan build

Kode v2 tersimpan sebagai 5 potongan Brotli-base64 `payload-00.b64` sampai `payload-04.b64`. Proses `node build.cjs` akan menyatukan dan mengekstraknya ke `dist/index.html`, `dist/styles.css`, `dist/app.js` dan `dist/PAKET_KONTEN_21_HARI.json`. Format kemasan ini dipakai untuk memindahkan arsip sumber dari chat ke GitHub melalui konektor. Untuk mengedit kode, jalankan build dan edit file hasil ekstraksi, kemudian migrasikan hasilnya ke berkas sumber biasa agar mudah dipelihara.

Jalankan `npm run build` dari folder ini. Tidak ada paket npm eksternal. Build ini telah diuji lokal dan hasilnya cocok dengan sumber ZIP v2.

## Fitur dan batasan

- Input artikel/sumber secara manual, penilaian ide, generator template naskah manual, editor carousel Canvas ukuran 1080×1350, ekspor PNG/ZIP.
- Paket 21 hari berisi 9 draf, dapat dimuat manual melalui dashboard.
- Kalender editorial dan status persetujuan adalah perencanaan, bukan penjadwalan unggahan Instagram otomatis.
- Data tersimpan di `localStorage` tiap browser. Tidak ada autentikasi, database cloud, AI aktif, atau koneksi Instagram/Meta.
- Jangan memasukkan informasi rahasia atau pelanggan. Gunakan ekspor JSON untuk mencadangkan draf.
- Draft perlu pemeriksaan fakta, ketentuan regulasi dan hak cipta sebelum publikasi.
- Pengindeksan mesin pencari dinonaktifkan, namun alamat Vercel tidak memiliki perlindungan login. Jika nanti menyimpan data bersama, bangun autentikasi dan backend terlebih dahulu.
