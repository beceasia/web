# BECE Content Studio (standalone)

Aplikasi internal editorial Instagram @bece.asia, bersumber dari arsip `BECE_Content_Studio_v2_Paket_21_Hari.zip`.

## Struktur

- `archive.b64` menyimpan paket sumber v2 dalam format ZIP base64.
- `build.cjs` mengekstrak ZIP ke `dist/` sewaktu build.
- `package.json` mendefinisikan proses build statis.
- `vercel.json` mengatur output hosting Vercel.

Jalankan `npm run build` pada folder ini dan terbitkan isi `dist/`.

Data editorial tetap berada dalam `localStorage` browser, tanpa login, sinkronisasi, AI aktif, atau publikasi otomatis. Gunakan fitur ekspor JSON untuk mencadangkan data. Publikasi Instagram tetap manual dan setiap draf wajib diperiksa. Proyek ini sengaja dipisahkan dari aplikasi website utama bece.asia.
