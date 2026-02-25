# Lingora — Belajar Bahasa Jepang, Mandarin, dan Korea

Aplikasi web interaktif untuk mempelajari Bahasa Jepang, Mandarin, dan Korea.  
**Offline-first · Pure localStorage · Tanpa server · Tanpa instalasi**

---

## Daftar Isi

1. [Status & Versi](#1-status--versi)
2. [Deskripsi Proyek](#2-deskripsi-proyek)
3. [Cara Menjalankan](#3-cara-menjalankan)
4. [Struktur Folder](#4-struktur-folder)
5. [Arsitektur & Pola Kode](#5-arsitektur--pola-kode)
6. [localStorage Key Reference](#6-localstorage-key-reference)
7. [Ringkasan Konten](#7-ringkasan-konten)
8. [Riwayat Fase (1–21.1)](#8-riwayat-fase-1211)
9. [Bug Fix yang Sudah Diperbaiki](#9-bug-fix-yang-sudah-diperbaiki)
10. [Roadmap Fase 21 ke Atas](#10-roadmap-fase-21-ke-atas)
11. [Panduan untuk Claude Selanjutnya](#11-panduan-untuk-claude-selanjutnya)
12. [Log Pengerjaan & Versi](#12-log-pengerjaan--versi)

---

## 1. Status & Versi

| Info | Detail |
|------|--------|
| **Fase Saat Ini** | FASE 21.1 ✅ SELESAI |
| **Fase Terakhir Dikerjakan** | Rename & Rebranding → Lingora (Phase 21.1) |
| **Nama Lama** | NihonHan (hanya JP + ZH) |
| **Nama Baru** | Lingora (JP + ZH + KR) — ✅ berlaku mulai Fase 21.1 |
| **Fase 16** | Di-hold (konten N3/N2 lanjutan — effort besar) |
| **Fase 21 Lama** | Konten N3/HSK4 — sekarang di-hold, masuk daftar fase lanjutan |
| **Fase 25 Lama** | Leaderboard Lokal — di-hold, masuk daftar fase lanjutan |
| **Deploy** | GitHub Pages / Netlify (butuh HTTPS agar PWA penuh berfungsi) |

> **Catatan Rename:** Mulai Fase 21, nama proyek berubah dari **NihonHan** → **Lingora**.
> - *Nihon (日本)* = Jepang, *Han (漢)* = Mandarin/Hanzi — nama lama hanya mencerminkan dua bahasa
> - *Lingora* = Lingua (Latin: bahasa/suara) + -ora — menggambarkan suara dan aksara dari tiga bahasa Asia Timur
> - Semua referensi kode, manifest, dan aset akan diupdate di Fase 21 bersamaan dengan penambahan modul Korea

---

## 2. Deskripsi Proyek

Lingora adalah aplikasi web belajar bahasa yang berjalan 100% di browser tanpa server, database, atau koneksi internet setelah diunduh. Seluruh data user tersimpan di `localStorage`.

**Tiga bahasa yang didukung (setelah Fase 21):**
- 🇯🇵 **Bahasa Jepang** — Hiragana, Katakana, Kanji (N5–N1), Kosakata, Grammar, Dialog
- 🇨🇳 **Bahasa Mandarin** — Pinyin, Nada, Hanzi (HSK 1–3), Kosakata, Dialog
- 🇰🇷 **Bahasa Korea** — Hangul, Kosakata, Grammar, Dialog *(baru di Fase 21)*

**Fitur unggulan:**
- Spaced Repetition System (SM-2) layaknya Anki
- Gamifikasi: XP, Level, Badge, Challenge Harian, Streak
- Quiz ganda: mode pilih + mode ketik jawaban
- Audio pengucapan via Web Speech API
- Export laporan progress ke PDF
- PWA: bisa di-install di HP/laptop, berjalan offline
- Dark mode dengan anti-FOUC
- Pengingat belajar (browser notification)
- Multi-user: beberapa akun di device yang sama

---

## 3. Cara Menjalankan

**Lokal (tanpa server):**
1. Buka folder project di file explorer
2. Double klik `index.html`
3. Daftar akun baru → langsung bisa digunakan
4. Tidak perlu npm, pip, server, atau koneksi internet

**GitHub Pages / Netlify (untuk PWA penuh):**
1. Upload folder ke repo GitHub
2. Aktifkan GitHub Pages dari root
3. Akses via HTTPS → PWA install prompt akan muncul
4. Service Worker aktif → offline berfungsi penuh

> **Catatan:** Service Worker (`sw.js`) hanya aktif di HTTPS atau `localhost`. Di `file://`, fitur PWA tidak aktif tapi app tetap berfungsi normal.

---

## 4. Struktur Folder

```
lingora/
├── index.html                          ← Landing page & redirect
├── 404.html                            ← Halaman not found
├── manifest.json                       ← PWA manifest
├── sw.js                               ← Service Worker (cache-first)
├── README.md                           ← File ini
│
├── components/
│   └── sidebar.html                    ← Referensi template sidebar
│
├── pages/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html                  ← Hub utama: streak, XP, challenge, SRS due
│   ├── profile.html                    ← Edit profil, avatar, statistik
│   ├── change-password.html
│   ├── settings.html                   ← Semua pengaturan app
│   ├── stats.html                      ← Statistik lengkap, heatmap, badge, riwayat
│   ├── report.html                     ← Laporan PDF (standalone, tanpa sidebar)
│   ├── japanese/
│   │   ├── hiragana.html               ← Tab: Tabel / Flashcard / SRS
│   │   ├── katakana.html               ← Tab: Tabel / Flashcard / SRS
│   │   ├── kanji.html                  ← Tab: Jelajah / SRS | Filter N5–N1
│   │   ├── vocabulary.html             ← Tab: Jelajah / SRS | Filter tema & level
│   │   ├── grammar.html                ← Accordion pola grammar N5–N4
│   │   ├── dialog.html                 ← Percakapan situasional 8 dialog
│   │   └── quiz.html                   ← Quiz JP: pilih/ketik, modul pilihan
│   ├── mandarin/
│   │   ├── pinyin.html                 ← Inisial, Final, Kombinasi + audio
│   │   ├── tones.html                  ← 5 nada + kurva SVG + audio
│   │   ├── hanzi.html                  ← Tab: Jelajah / SRS | Filter HSK 1–3
│   │   ├── vocabulary.html             ← Tab: Jelajah / SRS | Filter tema & level
│   │   ├── dialog.html                 ← Percakapan situasional 7 dialog
│   │   └── quiz.html                   ← Quiz ZH: pilih/ketik, modul pilihan
│   └── korean/                         ← [BARU — Fase 21]
│       ├── hangul.html                 ← Tab: Tabel / Flashcard / SRS (Jamo dasar)
│       ├── vocabulary.html             ← Tab: Jelajah / SRS | Filter tema & level
│       ├── grammar.html                ← Accordion pola grammar dasar–menengah
│       ├── dialog.html                 ← Percakapan situasional 6+ dialog
│       └── quiz.html                   ← Quiz KR: pilih/ketik, modul pilihan
│
├── assets/
│   ├── css/
│   │   ├── main.css                    ← Variabel global, dark mode, toast, XP
│   │   ├── layout.css                  ← Sidebar, main-content, topbar, responsive
│   │   ├── components.css              ← Shared: modal, badge, SRS, audio btn, fav
│   │   ├── auth.css                    ← Login & register (dua kolom)
│   │   ├── dashboard.css               ← XP bar, challenge, clock, dark mode
│   │   ├── transitions.css             ← Animasi fade-in halaman
│   │   ├── japanese.css                ← Hiragana/Katakana/Kanji/Vocab/Grammar JP
│   │   ├── kanji.css                   ← Grid, modal, badge N5–N1, stroke widget
│   │   ├── mandarin.css                ← Pinyin, Hanzi, Nada, Vocab ZH
│   │   ├── korean.css                  ← [BARU — Fase 21] Hangul, Vocab, Grammar KR
│   │   ├── quiz.css                    ← Quiz engine UI, mode pilih & ketik
│   │   ├── settings.css                ← Settings page, reminder, dark mode
│   │   ├── dialog.css                  ← Dialog viewer, playthrough, vocab chip
│   │   └── report.css                  ← Laporan PDF, @media print
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── storage.js              ← Storage wrapper (get/set per user)
│   │   │   ├── auth.js                 ← Register, login, logout, session, streak
│   │   │   ├── router.js               ← Guard auth, getBase() path resolver
│   │   │   └── app.js                  ← Init, sidebar, toast, dark mode toggle
│   │   │
│   │   ├── data/
│   │   │   ├── hiragana.js             ← 104 karakter + metadata
│   │   │   ├── katakana.js             ← 104 karakter + metadata
│   │   │   ├── kanji.js                ← 278 kanji (N5–N1) + onyomi/kunyomi/contoh
│   │   │   ├── jp-vocab.js             ← 225 kata JP, 15 tema
│   │   │   ├── jp-grammar.js           ← 35 pola grammar N5–N4, 5 kategori
│   │   │   ├── jp-dialogs.js           ← 8 dialog situasional JP
│   │   │   ├── pinyin.js               ← 21 inisial + 38 final + kombinasi
│   │   │   ├── zh-tones.js             ← 5 nada + contoh kata
│   │   │   ├── hanzi.js                ← 208 karakter HSK 1–3
│   │   │   ├── zh-vocab.js             ← 120+ kata ZH, 15 tema
│   │   │   ├── zh-dialogs.js           ← 7 dialog situasional ZH
│   │   │   ├── hangul.js               ← [BARU — Fase 21] Jamo + suku kata dasar
│   │   │   ├── kr-vocab.js             ← [BARU — Fase 21] 150+ kata KR, 15 tema
│   │   │   ├── kr-grammar.js           ← [BARU — Fase 21] 25+ pola grammar dasar
│   │   │   └── kr-dialogs.js           ← [BARU — Fase 21] 6+ dialog situasional KR
│   │   │
│   │   ├── modules/
│   │   │   ├── audio.js                ← AudioEngine (Web Speech API)
│   │   │   ├── flashcard.js            ← Flashcard 3D flip engine
│   │   │   ├── progress.js             ← markLearned, favorites, quiz score
│   │   │   ├── quiz.js                 ← QuizEngine (multiple choice)
│   │   │   ├── stroke.js               ← Stroke order widget (SVG, Kanji)
│   │   │   ├── srs.js                  ← SRS Engine (SM-2 algorithm)
│   │   │   ├── srs-ui.js               ← SRS UI renderer (reusable)
│   │   │   ├── xp.js                   ← XPSystem (level, history, toast)
│   │   │   ├── challenge.js            ← ChallengeSystem (harian, seed tanggal)
│   │   │   ├── reminder.js             ← ReminderSystem (notifikasi browser)
│   │   │   └── pwa.js                  ← PWA Manager (install, update, offline)
│   │   │
│   │   └── pages/
│   │       ├── dashboard.js            ← XP, streak, challenge, SRS due, clock
│   │       ├── stats.js                ← Statistik, heatmap, badge, XP, favorit
│   │       ├── report.js               ← Generate laporan PDF dari localStorage
│   │       ├── settings.js             ← Semua toggle & preferensi
│   │       ├── hiragana.js             ← Grid, flashcard, SRS, favorit, audio
│   │       ├── katakana.js             ← Grid, flashcard, SRS, favorit, audio
│   │       ├── kanji.js                ← Grid, modal stroke, SRS, favorit, audio
│   │       ├── jp-vocab.js             ← Vocab cards, SRS, favorit, audio
│   │       ├── jp-grammar.js           ← Accordion grammar, filter, tandai hafal
│   │       ├── jp-dialog.js            ← Dialog grid, viewer, playthrough, TTS
│   │       ├── quiz-jp.js              ← Quiz JP (pilih + ketik), normalisasi romaji
│   │       ├── pinyin.js               ← Grid pinyin, modal, audio hover
│   │       ├── tones.js                ← Kartu nada, SVG, audio
│   │       ├── hanzi.js                ← Grid hanzi, modal, SRS, favorit, audio
│   │       ├── zh-vocab.js             ← Vocab cards ZH, SRS, favorit, audio
│   │       ├── zh-dialog.js            ← Dialog grid ZH, viewer, playthrough, TTS
│   │       ├── quiz-zh.js              ← Quiz ZH (pilih + ketik), normalisasi pinyin
│   │       ├── hangul.js               ← [BARU — Fase 21] Grid, flashcard, SRS, audio
│   │       ├── kr-vocab.js             ← [BARU — Fase 21] Vocab cards KR, SRS, audio
│   │       ├── kr-grammar.js           ← [BARU — Fase 21] Accordion grammar KR
│   │       ├── kr-dialog.js            ← [BARU — Fase 21] Dialog viewer KR, TTS
│   │       └── quiz-kr.js              ← [BARU — Fase 21] Quiz KR (pilih + ketik)
│   │
│   └── icons/
│       ├── icon-192.png                ← Ikon PWA 192×192
│       └── icon-512.png                ← Ikon PWA 512×512
```

---

## 5. Arsitektur & Pola Kode

### Prinsip Utama

- **Offline-first, pure localStorage** — tidak ada API call, tidak ada database eksternal
- **Multi-user** — setiap user punya namespace `nh_user_{id}_*` di localStorage
- **Modular** — setiap fitur di module terpisah, halaman hanya pakai modul yang diperlukan
- **Vanilla JS** — tidak ada framework; hanya HTML, CSS, dan JavaScript murni

### Pola Inisialisasi Halaman

Setiap halaman authenticated mengikuti pola ini:

```javascript
// Di atas setiap script halaman:
Router.guard();                          // Redirect ke login jika belum auth
const user = Auth.getActiveUser();       // Ambil user aktif
App.init('nama-halaman');                // Init sidebar, toast, dark mode, topbar

// Lalu load data dan render:
const data = Progress.getLearned('modul-id');
renderGrid(data);
```

### Pola Path Resolution

`router.js` dan `auth.js` menggunakan `getBase()` untuk menghitung path relatif secara dinamis agar berfungsi di semua level kedalaman folder (lokal maupun GitHub Pages subdirectory):

```javascript
function getBase() {
  const parts = window.location.pathname.split('/');
  const pagesIdx = parts.indexOf('pages');
  if (pagesIdx === -1) return '';
  const afterPages = parts.slice(pagesIdx + 1).filter(p => p && !p.includes('.'));
  const depth = 1 + afterPages.length;
  return '../'.repeat(depth);
}
```

> **Penting:** Semua halaman di bawah `pages/korean/` akan berada di kedalaman 2 (sama seperti `pages/japanese/` dan `pages/mandarin/`). `getBase()` sudah menangani ini secara otomatis.

### Pola Storage

```javascript
// Baca data user
const progress = Storage.getUser(userId, 'progress', {});
const settings = Storage.getUser(userId, 'settings', { showRomaji: true });

// Simpan data user
Storage.setUser(userId, 'progress', updatedProgress);

// Tandai item dipelajari (otomatis update stats, XP, challenge)
Progress.markLearned('hangul', 'ㄱ');

// Favorit
Progress.toggleFavorite('kr-vocab', '안녕하세요');
const isFav = Progress.isFavorite('kr-vocab', '안녕하세요');

// SRS
SRS.rate(userId, 'hangul', 'ㄱ', 2);  // rating: 0=lupa, 1=sulit, 2=mudah, 3=hafal
const due = SRS.getDueIds(userId, 'hangul');

// XP
XPSystem.addXP(userId, 'learn_item', 5, 'Hafal ㄱ');
const lvl = XPSystem.getLevelInfo(userId);
```

### Pola Toast Notifikasi

```javascript
App.toast('Berhasil disimpan!', 'success');  // hijau
App.toast('Ada kesalahan', 'error');          // merah
App.toastXP('+5 XP', 'Hafal karakter baru'); // ungu (XP)
// Level up otomatis di-handle oleh XPSystem.addXP()
```

### Pola Modul Quiz

Quiz engine (`quiz.js`) menerima config dan callbacks:

```javascript
QuizEngine.start({
  items: filteredItems,
  mode: 'choice' | 'input',
  timer: 20,
  onAnswer: (item, isCorrect) => { /* update progress */ },
  onComplete: (score, total) => { /* simpan skor */ }
});
```

### Pola Penambahan Bahasa Baru

Saat menambahkan bahasa baru (seperti Korea), ikuti pola yang sudah ada:

```javascript
// 1. Data file: assets/js/data/kr-vocab.js
const KrVocabData = (() => {
  const themes = [ /* sama dengan JpVocabData */ ];
  const vocab = [
    {
      word: '안녕하세요',
      romanization: 'annyeonghaseyo',  // romanisasi RR (Revised Romanization)
      meaning: 'halo (formal)',
      theme: 'greetings',
      level: 'TOPIK1',
      example: { kr: '선생님, 안녕하세요.', roman: 'Seonsaengnim, annyeonghaseyo.', id: 'Halo, Pak/Bu Guru.' }
    }
  ];
  return { getAll: () => vocab, getThemes: () => themes };
})();

// 2. Module ID baru:
// 'hangul', 'kr-vocab', 'kr-grammar', 'kr-dialog'
// Tambahkan ke Progress.validModules jika ada validasi

// 3. Audio — AudioEngine sudah support 'ko-KR':
AudioEngine.speak('안녕하세요', 'ko-KR');
```

---

## 6. localStorage Key Reference

```
nh_users                          → semua akun user terdaftar (array)
nh_session                        → session aktif { userId, loginAt }
nh_last_theme                     → 'light' | 'dark' (global, sebelum login)
```

> **Catatan prefix `nh_`:** Prefix localStorage tetap menggunakan `nh_` (dari NihonHan) untuk menjaga kompatibilitas data user yang sudah ada. Tidak perlu diganti ke `lingora_` karena akan menghapus semua progress user lama.

```
nh_user_{id}_settings             → { showRomaji, showPinyin, showRomanization,
                                      animationEnabled, timerEnabled, audioAutoPlay,
                                      theme, reminder: { enabled, hour, minute } }
nh_user_{id}_progress             → { [moduleId]: { learned: [], quiz_scores: [] } }
nh_user_{id}_streak               → { count, best, lastDate }
nh_user_{id}_stats                → { totalLearned, quizCompleted,
                                      totalCorrect, totalQuestions }
nh_user_{id}_badges               → { [badgeId]: { earnedAt } }
nh_user_{id}_activity             → { "YYYY-MM-DD": jumlah_sesi }
nh_user_{id}_xp                   → { total, history: [{action, amount, label,
                                      date, totalAfter}] }
nh_user_{id}_srs_{moduleId}       → { [itemId]: { interval, repetitions,
                                      easeFactor, nextReview, lastRating,
                                      lastReview } }
nh_user_{id}_favorites            → { [moduleId]: [itemId, ...] }
nh_user_{id}_challenges           → { byDate: { "YYYY-MM-DD": [challenge...] },
                                      history: [{id, title, icon, xp, date}] }
nh_user_{id}_reminder             → { enabled: bool, hour: int, minute: int }
```

> **Catatan Fase 21:** Key `nh_user_{id}_settings` akan ditambah field `showRomanization` (boolean) untuk mengontrol tampilan romanisasi Hangul (Revised Romanization), konsisten dengan `showRomaji` dan `showPinyin` yang sudah ada.

**Module ID yang valid untuk progress, SRS, dan favorites:**

| Module ID | Halaman |
|-----------|---------|
| `hiragana` | pages/japanese/hiragana.html |
| `katakana` | pages/japanese/katakana.html |
| `kanji` | pages/japanese/kanji.html |
| `jp-vocab` | pages/japanese/vocabulary.html |
| `jp-grammar` | pages/japanese/grammar.html |
| `jp-dialog` | pages/japanese/dialog.html |
| `hanzi` | pages/mandarin/hanzi.html |
| `zh-vocab` | pages/mandarin/vocabulary.html |
| `zh-dialog` | pages/mandarin/dialog.html |
| `hangul` | pages/korean/hangul.html *(baru — Fase 21)* |
| `kr-vocab` | pages/korean/vocabulary.html *(baru — Fase 21)* |
| `kr-grammar` | pages/korean/grammar.html *(baru — Fase 21)* |
| `kr-dialog` | pages/korean/dialog.html *(baru — Fase 21)* |

---

## 7. Ringkasan Konten

### Kondisi Saat Ini (Fase 20.4)

| Modul | Jumlah | Level / Cakupan |
|-------|--------|-----------------|
| Hiragana | 104 karakter | Dasar + dakuten + kombinasi |
| Katakana | 104 karakter | Dasar + dakuten + kombinasi |
| Kanji | 278 karakter | N5 (105) / N4 (30) / N3 (20) / N2 (93) / N1 (30) |
| Kosakata JP | 225 kata | N5/N4, 15 tema |
| Grammar JP | 35 pola | N5/N4, 5 kategori |
| Dialog JP | 8 dialog | N5–N4, 8 situasi |
| Pinyin | 59 elemen | 21 inisial + 38 final + kombinasi |
| Nada Mandarin | 5 nada | + kurva SVG + contoh kata |
| Hanzi | 208 karakter | HSK 1 / HSK 2 / HSK 3 |
| Kosakata ZH | 120+ kata | HSK 1–3, 15 tema |
| Dialog ZH | 7 dialog | HSK 1–3, 7 situasi |
| **Total** | **~1.200+ item** | |

### Target Setelah Fase 21 (dengan Korea)

| Modul Baru | Target Jumlah | Level / Cakupan |
|------------|---------------|-----------------|
| Hangul | 40 Jamo + 140 suku kata | Konsonan dasar + vokal + konsonan akhir (받침) |
| Kosakata KR | 150+ kata | TOPIK I, 15 tema |
| Grammar KR | 25+ pola | Pola dasar–menengah (copula, partikel, honorifik) |
| Dialog KR | 6+ dialog | TOPIK I, 6 situasi |
| **Tambahan** | **~360+ item** | |

**12 Badge Saat Ini + Rencana Badge Korea:**

| Badge | Kondisi |
|-------|---------|
| 🌸 Pemula | Daftar pertama kali |
| 📚 Rajin | Hafal 10 item |
| 🔥 Streaker | Streak 3 hari |
| ⚡ Kilat | Selesaikan quiz pertama |
| 🎯 Tepat | Akurasi quiz ≥90% |
| 🏆 Juara | Akurasi quiz 100% |
| 💎 Berlian | Streak 7 hari |
| 🌟 Bintang | Hafal 50 item |
| 🦅 Elang | Hafal 100 item |
| 👑 Raja | Level 5 (Mahir) |
| 🎌 Samurai | Selesaikan semua modul JP |
| 🐉 Naga | Selesaikan semua modul ZH |
| 🌙 Haŋŭl | *(Baru — Fase 21)* Selesaikan semua modul KR |
| 🌏 Poliglot | *(Baru — Fase 21)* Selesaikan modul dari 3 bahasa |

**7 Level XP:**

| Level | Nama JP | Nama ID | XP Butuh | Warna |
|-------|---------|---------|----------|-------|
| 1 | 入門 | Pemula | 0 | Abu |
| 2 | 初級 | Dasar | 100 | Hijau |
| 3 | 中級 | Menengah | 300 | Biru |
| 4 | 上級 | Lanjutan | 700 | Ungu |
| 5 | 達人 | Mahir | 1.500 | Oranye |
| 6 | 師範 | Ahli | 3.000 | Merah |
| 7 | 名人 | Master | 6.000 | Emas |

---

## 8. Riwayat Fase (1–21.1)

### FASE 1 — Fondasi & Autentikasi ✅
Register, login, logout, session aktif, streak harian, dashboard awal, profil, ganti password, sidebar navigasi, toast notifikasi, layout responsif.

### FASE 2 — Transisi & 404 ✅
Halaman `404.html`, `transitions.css` dengan animasi fade-in antar halaman.

### FASE 3 — Hiragana & Katakana ✅
104 hiragana + 104 katakana. Tiga tab: Tabel (grid dengan filter row), Flashcard (3D flip), Quiz Mini. Filter romaji on/off.

### FASE 4 — Kanji ✅
153 kanji awal (N5/N4/N3). Filter JLPT. Search real-time. Stroke order widget (SVG animasi). Modal detail (onyomi, kunyomi, contoh kata).

### FASE 5 — Mandarin ✅
Pinyin (21 inisial + 38 final + kombinasi), Nada (5 tone + kurva SVG), Hanzi (HSK 1–3 = 208 karakter), Kosakata ZH (120+ kata, 15 tema).

### FASE 6 — Quiz & Gamifikasi Awal ✅
QuizEngine (multiple choice, timer, feedback), BadgeSystem (12 badge), halaman Quiz JP dan Quiz ZH fungsional penuh.

### FASE 7 — Polish & Pengaturan ✅
Bug fix dashboard chart. Halaman Settings (toggle romaji/pinyin/animasi/timer, reset progress). Halaman Statistik (progress bar modul, riwayat quiz, badge grid, heatmap 28 hari). Sidebar update semua halaman.

### FASE 8 — Konten Lengkap & Finalisasi ✅
- `jp-vocab.js` — 225 kata JP, 15 tema
- `jp-grammar.js` — 35 pola grammar N5–N4 dalam 5 kategori
- Halaman `vocabulary.html` dan `grammar.html` JP fungsional
- Integrasi setting `showRomaji`/`showPinyin`

### FASE 8.1 — Redesign Login & Register ✅
Layout dua kolom (panel dekoratif + form). Live validation. Password strength indicator. Success state button. Mobile responsive.

### FASE 8.2 — Bug Fix Quiz JP ✅
Fix bug kritis: `bindQuizControls()` tidak terdefinisi → Quiz JP sama sekali tidak bisa digunakan. Fix closure di `retryBtn`.

### FASE 8.3 — Kanji N2 & N1 ✅
Tambah ~96 kanji N2 dan 30 kanji N1. Total kanji: 278. Badge level N2 (hijau) dan N1 (ungu) di halaman Kanji.

### FASE 8.3.1 — Hapus Duplikat Kanji ✅
Hapus 4 duplikat: `聞`, `況`, `的`, `悲`. Koreksi penghitungan N5 = 105 (bukan 103).

### FASE 8.4 — Enhance Profil ✅
Profile hero bergradient dengan achievement badges dinamis, stats strip 4 kolom, layout dua kolom, avatar grid dengan hover animasi.

### FASE 9 — Audio & Pelafalan ✅
`AudioEngine` (`modules/audio.js`) via Web Speech API. Tombol 🔊 di modal (hiragana, katakana, kanji), kartu vocab (JP & ZH), nada Mandarin. Auto-play on open. Settings toggle audio. Fallback graceful jika browser tidak support.

### FASE 9.2 — Pelengkap Audio Mandarin ✅
Tombol 🔊 hover di grid cell Pinyin dan Hanzi. Modal Pinyin + contoh kata audio. Cakupan audio kini lengkap di semua 8 modul.

### FASE 10 — Dark Mode ✅
CSS custom properties `[data-theme="dark"]`. Toggle di topbar (🌙/☀️) dan Settings. Default ikut `prefers-color-scheme` OS. Anti-FOUC: tema diapply sebelum body render via inline script di `<head>`. Disimpan per-user di settings.

### FASE 11 — Spaced Repetition System (SRS) ✅
Algoritma SM-2. Modul: `srs.js` (engine) + `srs-ui.js` (UI renderer reusable). Tab SRS di Hiragana, Katakana, Kanji, Vocab JP, Hanzi, Vocab ZH. Rating 4 tingkat (Lupa/Sulit/Mudah/Hafal). Preview interval di tombol. Queue: due → baru (max 20/sesi). Dashboard section "🔁 Kartu SRS Hari Ini".

### FASE 12 — Favorit & Bookmark ✅
Tombol ★ hover di setiap sel/kartu. Toggle favorit di modal header. Filter "★ Favorit" per halaman. Flashcard mode favorit (Hiragana & Katakana). Section favorit di halaman Statistik.

### FASE 13 — Mode Input Jawaban (Quiz) ✅
Toggle "🔘 Pilih / ⌨️ Ketik" sebelum mulai quiz. Input field dengan fokus otomatis. Submit via tombol atau Enter. Tombol "Lewati". Normalisasi romaji (ā→a) dan pinyin (ā→a). Alternatif jawaban didukung. Timer diperpanjang 30 detik di mode ketik. Berlaku untuk Quiz JP dan Quiz ZH.

### FASE 14 — Gamifikasi Lanjutan: XP & Level ✅
`xp.js`: `addXP()`, `getLevelInfo()`, `getAllLevels()`. XP bar bergradient di dashboard. Level progression dots (7 level). Toast `+X XP` (ungu). Toast Level Naik. Sidebar menampilkan level saat ini. XP per aktivitas: hafal item (+5), selesai quiz (+10), akurasi 100% (+25), streak (+15), badge baru (+30), SRS session (+8), modul pertama kali (+20).

### FASE 15 — Challenge Harian ✅
`challenge.js`: generate 3 challenge/hari deterministik (seed dari tanggal, algoritma LCG). 6 tipe challenge: `learn_items`, `quiz_complete`, `quiz_accuracy`, `srs_review`, `multi_module`, `streak_active`. Tombol "Klaim XP". Konfeti 40 partikel CSS-only saat semua challenge diklaim. Badge "X/3 Selesai". Riwayat di halaman Statistik.

### FASE 16 — Di-hold ⏸️
Konten lanjutan N3/N2/N1/HSK4 — effort terlalu besar, ditunda. Masuk sebagai **Fase Lanjutan (TBD)** di roadmap.

### FASE 17 — Dialog & Percakapan ✅
8 dialog JP (situasi N5–N4): restoran, stasiun, berkenalan, belanja, arah, dokter, kantor, telepon. 7 dialog ZH (HSK 1–3). Filter per level. Viewer dengan warna A/B berbeda. Toggle romaji/pinyin & terjemahan. Mode Playthrough (highlight per baris + TTS). Tombol 🔊 per baris dan per kosakata kunci.

### FASE 18 — Streak Reminder ✅
`reminder.js`: `ReminderSystem` dengan `init()`, `schedule()`, `cancel()`, `preview()`. Web Notifications API + `setTimeout`. Set jam pengingat di Settings (default 20:00). Smart skip: tidak notif jika sudah belajar hari itu. 5 pesan motivasi berbeda (acak).

### FASE 19 — Export Progress ke PDF ✅
`window.print()` + CSS `@media print`. Halaman `report.html` standalone (tanpa sidebar). Konten: header bergradient, kartu user, ringkasan 8 pencapaian, XP progress dots, progress per modul, heatmap 28 hari, badge grid 12, tabel 15 quiz terbaru, item dipelajari per modul (max 20).

### FASE 20 — PWA (Progressive Web App) ✅
`manifest.json` lengkap (shortcuts: Dashboard, Quiz JP, Quiz ZH). `sw.js` dengan dual strategy: Cache-First (CSS/JS/gambar) + Network-First (HTML). `pwa.js`: install prompt banner, update banner, offline indicator. Ikon app 192×192 dan 512×512.

### FASE 20.4 — Live Clock di Topbar Dashboard ✅
Tampilan jam real-time (HH:MM:SS WIB) di topbar kanan dashboard. Format dua baris: tanggal (atas) + jam merah besar (bawah). `updateClock()` + `setInterval(updateClock, 1000)`. Hidden di mobile. Fix sidebar Katakana + fix layout `.main-content` dan `.page-body`.

### FASE 21.1 — Rename & Rebranding: NihonHan → Lingora ✅
Rename resmi proyek dari **NihonHan** ke **Lingora**. 23 file HTML, 43 file JS, `manifest.json`, `sw.js` (cache bump `nihonhan-v2` → `lingora-v3`), `index.html` semuanya diupdate. Tagline sidebar diupdate ke `"Jepang, Mandarin & Korea"`. Folder project: `nihonhan/` → `lingora/`. Prefix localStorage `nh_` tetap dipertahankan untuk kompatibilitas data user.

---

## 9. Bug Fix yang Sudah Diperbaiki

### BF-1 — Missing closing brace di `progress.js` ✅
Fungsi `saveQuizScore()` kehilangan `}` → seluruh modul Progress gagal load → semua halaman modul tidak bisa render.

### BF-2 — Salah path di `pwa.js` ✅
Kalkulasi path relatif ke `sw.js` salah → Service Worker tidak terdaftar.

### BF-3 — GitHub Pages: Hiragana/Katakana/Kanji tidak muncul ✅
**Root cause:** `getBase()` lama tidak menghitung kedalaman subfolder. Halaman di `/pages/japanese/hiragana.html` butuh `'../../'` tapi hanya dapat `'../'` → redirect ke path salah → 404.

**Fix:** `getBase()` baru menghitung depth secara dinamis dengan `parts.indexOf('pages')`. Diapply ke `router.js`, `auth.js`, dan `pwa.js`.

**Kenapa tidak ketahuan lokal:** Lokal, user biasanya sudah login → `Router.guard()` tidak trigger redirect.

> **Catatan untuk Fase 21:** Halaman `pages/korean/*.html` berada di kedalaman yang sama dengan Japanese dan Mandarin. `getBase()` sudah menangani ini — tidak perlu modifikasi tambahan.

### BF-4 — Quiz JP tidak bisa digunakan ✅
`bindQuizControls()` dipanggil tapi tidak terdefinisi → script crash → semua event listener quiz tidak terpasang.

### BF-5 — Duplikat Kanji ✅
4 kanji duplikat ditemukan dan dihapus/digabung: `聞`, `況`, `的`, `悲`.

### BF-6 — Sidebar Katakana: dua menu aktif sekaligus ✅
Nav-item Hiragana di `katakana.html` punya class `active` dan `href` salah → fix: hapus `active`, perbaiki href.

### BF-7 — Konten tidak ter-center di area main ✅
`.main-content` tidak punya `align-items: center` dan `.page-body` tidak punya `margin: 0 auto` → konten menempel kiri.

---

## 10. Roadmap Fase 21 ke Atas

> **Prinsip tetap:** Lingora selalu **offline-first, pure localStorage, tanpa server**.

### Gambaran Urutan Prioritas

```
Fase 21 (Penambahan Korea + Rename Proyek)  ← PRIORITAS UTAMA
  ↓
Fase 22 (Listening Quiz)                    ← Fitur belajar baru
  ↓
Fase 23 (Stroke Animasi Kana)               ← Visual menarik
  ↓
Fase 24 (Kalimat Kontekstual Vocab)         ← Depth konten
  ↓
Fase 26 (Onboarding & Placement Test)       ← First impression UX
  ↓
Fase 27 (Study Planner)                     ← Untuk user serius
  ↓
Fase 28 (Mini Game)                         ← Fun factor
  ↓
Fase 29 (Tema & Kustomisasi)                ← Polish
  ↓
Fase 30 (Backup & Restore)                  ← Keamanan data
  ↓
Fase 31 (Konten Lanjutan JP — eks Fase 16)  ← Dulu di-hold
Fase 32 (Konten Lanjutan ZH — eks Fase 21) ← Dulu di-hold
Fase 33 (Leaderboard — eks Fase 25)        ← Dulu di-hold
```

| Prioritas | Fase | Nama | Kategori | Estimasi Effort |
|-----------|------|------|----------|-----------------|
| 🔴 Tinggi | 21 | Bahasa Korea (Hangul) + Rename Proyek | Bahasa Baru + Revamp | Besar |
| 🔴 Tinggi | 22 | Listening Mode (Audio Quiz) | Fitur Belajar | Sedang |
| 🔴 Tinggi | 23 | Stroke Order Animasi (Hiragana/Katakana) | UX | Sedang-Besar |
| 🟡 Sedang | 24 | Vocabulary Builder (Kalimat Kontekstual) | Konten | Sedang |
| 🟡 Sedang | 26 | Onboarding & Placement Test | UX | Sedang |
| 🟡 Sedang | 27 | Study Planner / Jadwal Belajar | Produktivitas | Sedang-Besar |
| 🟢 Rendah | 28 | Mini Game | Gamifikasi | Sedang |
| 🟢 Rendah | 29 | Tema & Kustomisasi UI | UX | Kecil-Sedang |
| 🟢 Rendah | 30 | Backup & Restore Progress | Data | Kecil |
| ⏸️ Hold | 31 | Konten Lanjutan JP N3 (eks Fase 16) | Konten | Besar |
| ⏸️ Hold | 32 | Konten Lanjutan ZH HSK4 (eks Fase 21) | Konten | Besar |
| ⏸️ Hold | 33 | Leaderboard Lokal (eks Fase 25) | Gamifikasi | Sedang |

---

### FASE 21 — Bahasa Korea (Hangul) + Rename Proyek ke Lingora

**Tujuan:** Memperluas Lingora menjadi platform tiga bahasa — Jepang, Mandarin, dan Korea — sekaligus melakukan rename resmi proyek dari NihonHan ke Lingora.

**Status keseluruhan Fase 21:**

| Sub-Fase | Nama | Isi | Status |
|----------|------|-----|--------|
| **21.1** | Rename & Rebranding | Update nama di semua file (HTML, JS, manifest, sw.js) | ✅ SELESAI |
| **21.2** | Data Korea | 4 file data: `hangul.js`, `kr-vocab.js`, `kr-grammar.js`, `kr-dialogs.js` | ✅ SELESAI |
| **21.3** | Modul Hangul | `hangul.html` + `hangul.js` + `korean.css` (3 tab: Tabel, Flashcard, SRS) | 🔲 Belum |
| **21.4** | Modul Vocab & Grammar | `vocabulary.html` + `kr-vocab.js`, `grammar.html` + `kr-grammar.js` | 🔲 Belum |
| **21.5** | Modul Dialog & Quiz | `dialog.html` + `kr-dialog.js`, `quiz.html` + `quiz-kr.js` | 🔲 Belum |
| **21.6** | Integrasi Penuh | Sidebar semua halaman, Dashboard KR, Stats, Settings, Badge, Challenge | 🔲 Belum |

---

#### FASE 21.1 — Rename & Rebranding ✅ SELESAI (2026-02-25)

Seluruh referensi `NihonHan`/`nihonhan` di-rename ke `Lingora`/`lingora` sebelum penambahan modul Korea, agar basis kode konsisten lebih dulu.

**Yang dikerjakan:**
- 23 file HTML: `<title>`, `<meta apple-mobile-web-app-title>`, sidebar logo (`.logo-main`, `.logo-sub`), topbar logo, auth pages, report page
- 43 file JS: semua header komentar + semua string user-facing (notifikasi reminder, PWA banner, offline indicator)
- `manifest.json`: `name` → `"Lingora — Belajar Jepang, Mandarin & Korea"`, `short_name` → `"Lingora"`, `description` diupdate ke 3 bahasa
- `sw.js`: cache bump `nihonhan-v2` → `lingora-v3`, CACHE_VERSION 2 → 3 (force refresh cache lama)
- `index.html`: splash logo, title, meta description, tagline
- Tagline seluruh sidebar: `"Jepang & Mandarin"` → `"Jepang, Mandarin & Korea"`
- Folder project: `nihonhan/` → `lingora/`

> **Catatan:** Prefix localStorage `nh_` **sengaja dipertahankan** untuk kompatibilitas data user yang sudah ada. Tidak diganti ke `lingora_`.

---

#### FASE 21.2 — Data Korea ✅ SELESAI (2026-02-25)

Buat 4 file data Korea murni (belum ada halaman UI). Semua data di `assets/js/data/`.

**File baru:**

**`hangul.js`** — Jamo konsonan (14) + vokal (21) + suku kata contoh (~100):
```javascript
const HangulData = (() => {
  const consonants = [
    { jamo: 'ㄱ', romanization: 'g/k', name: 'giyeok',
      example: { syllable: '가', word: '가방', meaning: 'tas' } },
    // ... 13 lainnya
  ];
  const vowels = [
    { jamo: 'ㅏ', romanization: 'a', name: 'a',
      example: { syllable: '아', word: '아버지', meaning: 'ayah' } },
    // ... 20 lainnya
  ];
  const syllables = [
    { block: '가', consonant: 'ㄱ', vowel: 'ㅏ', romanization: 'ga' },
    // ...
  ];
  return { getConsonants: () => consonants, getVowels: () => vowels, getSyllables: () => syllables };
})();
```

**`kr-vocab.js`** — 150+ kata, 15 tema, level TOPIK1/TOPIK2:
```javascript
const KrVocabData = (() => {
  const themes = [
    { id: 'greetings', label: 'Salam & Sapaan', icon: '👋' },
    // ... 14 tema lainnya
  ];
  const vocab = [
    {
      word: '안녕하세요', romanization: 'annyeonghaseyo',
      meaning: 'halo (formal)', theme: 'greetings', level: 'TOPIK1',
      example: { kr: '안녕하세요, 선생님.', roman: 'Annyeonghaseyo, seonsaengnim.', id: 'Halo, Pak/Bu Guru.' }
    },
    // ...
  ];
  return { getAll: () => vocab, getThemes: () => themes };
})();
```

**`kr-grammar.js`** — 25+ pola, 5 kategori (Copula, Partikel, Verba, Honorifik, Waktu):
```javascript
const KrGrammarData = (() => {
  const patterns = [
    {
      id: 'kr-g-01', pattern: '~이에요/예요', category: 'copula',
      meaning: 'adalah (bentuk sopan informal)', level: 'TOPIK1',
      example: { kr: '저는 학생이에요.', roman: 'Jeoneun haksaengieyo.', id: 'Saya adalah pelajar.' },
      notes: 'Pakai 이에요 setelah konsonan, 예요 setelah vokal'
    },
    // ...
  ];
  const categories = [
    { id: 'copula', label: 'Copula & Keberadaan', icon: '🔵' },
    // ...
  ];
  return { getAll: () => patterns, getCategories: () => categories };
})();
```

**`kr-dialogs.js`** — 6 dialog situasional TOPIK I:

| # | Situasi | Level |
|---|---------|-------|
| 1 | Perkenalan diri | TOPIK I |
| 2 | Di restoran | TOPIK I |
| 3 | Arah & transportasi | TOPIK I |
| 4 | Belanja | TOPIK I |
| 5 | Di klinik/rumah sakit | TOPIK I |
| 6 | Percakapan di kampus | TOPIK I–II |

---

#### FASE 21.3 — Modul Hangul 🔲

Buat halaman Hangul lengkap dengan 3 tab, CSS Korea, dan script halaman.

**File baru:**
```
pages/korean/hangul.html          ← 3 tab: Tabel / Flashcard / SRS
assets/js/pages/hangul.js         ← Grid, flashcard 3D, SRS, favorit, audio
assets/css/korean.css             ← Semua style Korea (dipakai semua halaman KR)
```

**Tab "Tabel":** Grid konsonan (14 baris) + grid vokal (21 baris). Kolom: Jamo, Nama, Romanisasi, Contoh Suku Kata. Tombol 🔊 per sel (`ko-KR`).

**Tab "Flashcard":** 3D flip — depan: Jamo besar, belakang: nama + romanisasi + contoh kata. Filter konsonan/vokal/semua. Mode favorit.

**Tab "SRS":** SRS Engine (SM-2) untuk semua Jamo. Rating Lupa/Sulit/Mudah/Hafal. Konsisten dengan Hiragana dan Hanzi.

---

#### FASE 21.4 — Modul Kosakata & Grammar Korea 🔲

**File baru:**
```
pages/korean/vocabulary.html      ← Tab: Jelajah / SRS | Filter tema & level
assets/js/pages/kr-vocab.js       ← Vocab cards KR, SRS, favorit, audio ko-KR
pages/korean/grammar.html         ← Accordion pola grammar dasar–menengah
assets/js/pages/kr-grammar.js     ← Accordion, search, filter level, tandai hafal
```

**Vocabulary:** Konsisten dengan Vocab JP dan ZH — Tab Jelajah (kartu dengan word/romanisasi/arti/contoh) dan Tab SRS. Filter per tema dan level TOPIK. Tombol ★ favorit. Audio `ko-KR`.

**Grammar:** Accordion per 5 kategori. Search real-time. Filter TOPIK I / TOPIK II. Tombol "Tandai Hafal" per pola. Integrasi `Progress.markLearned('kr-grammar', id)` dan `XPSystem.addXP()`.

---

#### FASE 21.5 — Modul Dialog & Quiz Korea 🔲

**File baru:**
```
pages/korean/dialog.html          ← Viewer dialog A/B, playthrough, TTS
assets/js/pages/kr-dialog.js      ← Dialog grid KR, viewer, toggle romanisasi
pages/korean/quiz.html            ← Quiz KR: pilih/ketik, modul pilihan
assets/js/pages/quiz-kr.js        ← Quiz KR, normalisasi romanisasi RR
```

**Dialog:** Konsisten dengan Dialog JP dan ZH — viewer A/B berwarna berbeda, toggle romanisasi (`showRomanization`) dan terjemahan, Mode Playthrough (highlight per baris + TTS `ko-KR`), tombol 🔊 per baris.

**Quiz:** Mode pilih + mode ketik. Normalisasi romanisasi (abaikan tanda diakritik). Dua jenis soal: lihat kata Korea → pilih arti, atau lihat arti → ketik romanisasi.

---

#### FASE 21.6 — Integrasi Penuh 🔲

Update semua bagian app yang sudah ada agar mengenal modul Korea.

**File yang diupdate:**

```
components/sidebar.html           ← Tambah section 🇰🇷 Korea (5 link)
SEMUA halaman HTML (24 file)      ← Sidebar update: link Korea
pages/dashboard.html              ← Card progress KR + badge baru
assets/js/pages/dashboard.js      ← Render progress KR, badge Hanŭl & Poliglot
pages/stats.html                  ← Progress bar modul KR
assets/js/pages/stats.js          ← Data modul KR di statistik
pages/settings.html               ← Toggle showRomanization
assets/js/pages/settings.js       ← Handler showRomanization
pages/report.html                 ← Konten KR di laporan PDF
assets/js/pages/report.js         ← Data KR masuk laporan
assets/js/modules/xp.js           ← Badge 🌙 Hanŭl + 🌏 Poliglot
assets/js/modules/challenge.js    ← Challenge dari modul KR
manifest.json                     ← Tambah shortcut Quiz Korea
sw.js                             ← Cache file-file Korea baru
```

**Badge baru:**

| Badge | Kondisi | Sistem |
|-------|---------|--------|
| 🌙 Hanŭl | Selesaikan semua modul KR | `xp.js` BadgeSystem |
| 🌏 Poliglot | Hafal item dari 3 bahasa (JP + ZH + KR) | `xp.js` BadgeSystem |

**Setting baru:** `showRomanization` (boolean, default: `true`) di `nh_user_{id}_settings` — konsisten dengan `showRomaji` (JP) dan `showPinyin` (ZH).

---

**Catatan penting Fase 21:**
- Urutan wajib: 21.1 → 21.2 → 21.3 → 21.4 → 21.5 → 21.6
- Gunakan **Revised Romanization (표준 로마자 표기법)**, bukan McCune–Reischauer
- Verifikasi audio `ko-KR` di Chrome dan Safari — kualitas TTS berbeda per browser
- Prioritaskan akurasi konten (arti, partikel, honorifik) di atas kuantitas
- `getBase()` di `router.js` sudah menangani kedalaman `pages/korean/` secara otomatis
---

### FASE 22 — Listening Mode (Audio Quiz)

**Tujuan:** Mode quiz baru di mana soal berupa audio. User mendengar kata lalu memilih/mengetik artinya — melatih kemampuan listening, bukan hanya reading.

**Cara kerja:**
1. Quiz dimulai dalam "Listening Mode"
2. Karakter/kata **disembunyikan** — hanya ada tombol 🔊
3. Audio di-play otomatis saat soal muncul
4. User memilih arti yang benar (atau mengetik romanisasi)
5. Setelah jawab, karakter baru terungkap
6. Skor bonus +5 XP tiap soal Listening yang benar

**Berlaku untuk:** Quiz JP, Quiz ZH, dan Quiz KR (Fase 22 dierjakan setelah Fase 21 selesai).

| | Quiz Normal | Listening Mode |
|--|-------------|----------------|
| Soal | Teks karakter | Audio (tersembunyi) |
| Skill | Reading | Listening |
| Timer | 20 detik | 25 detik |

**File yang diupdate:**
```
pages/japanese/quiz.html          [UPDATE] — tambah pilihan mode "Listening"
pages/mandarin/quiz.html          [UPDATE]
pages/korean/quiz.html            [UPDATE]
assets/js/pages/quiz-jp.js        [UPDATE] — listening mode logic
assets/js/pages/quiz-zh.js        [UPDATE]
assets/js/pages/quiz-kr.js        [UPDATE]
assets/css/quiz.css               [UPDATE] — UI hidden-character card
```

**Catatan:** Gunakan `AudioEngine` yang sudah ada. Fallback graceful jika browser tidak punya voice `ko-KR`.

---

### FASE 23 — Stroke Order Animasi (Hiragana & Katakana)

**Tujuan:** Animasi urutan coretan (stroke order) untuk semua hiragana dan katakana. Kanji sudah punya stroke widget (Fase 4) — sekarang gilirannya kana.

**Rencana implementasi:**
- Data SVG stroke order untuk 46 hiragana dasar + dakuten + kombinasi
- Data SVG stroke order untuk 46 katakana dasar + dakuten + kombinasi
- Tab "✍️ Menulis" baru di halaman Hiragana dan Katakana
- Animasi: stroke muncul satu per satu, panah arah + nomor urutan
- Mode latihan (Fase 23.2): canvas kosong, user trace dengan mouse/finger

**File yang diupdate:**
```
assets/js/data/hiragana-strokes.js   [BARU] — data SVG stroke order
assets/js/data/katakana-strokes.js   [BARU]
pages/japanese/hiragana.html         [UPDATE] — tab Menulis
pages/japanese/katakana.html         [UPDATE]
assets/js/pages/hiragana.js          [UPDATE]
assets/js/pages/katakana.js          [UPDATE]
assets/css/japanese.css              [UPDATE] — animasi stroke + canvas trace
```

**Catatan:** Data SVG stroke open-source tersedia (format KanjiVG). Prioritaskan animasi dulu; mode trace (Canvas API) bisa jadi Fase 23.2.

---

### FASE 24 — Vocabulary Builder (Kalimat Kontekstual)

**Tujuan:** Setiap kata kosakata punya 2–3 contoh kalimat dengan level kesulitan berbeda, memperlihatkan kata dalam konteks nyata.

**Fitur:**
- Section "Contoh Kalimat" di modal kosakata (expandable)
- 2–3 kalimat per kata (dari sederhana ke kompleks)
- Setiap kalimat: kata asli + romanisasi + terjemahan + tombol 🔊
- "Kalimat Quiz": kalimat dengan satu kata dikosongkan, user isi

**Format data yang ditambahkan ke vocab yang ada:**
```javascript
{
  word: '食べる',
  // ... field yang sudah ada ...
  sentences: [
    {
      original: '毎日ご飯を食べます。',
      romanization: 'Mainichi gohan wo tabemasu.',
      translation: 'Saya makan nasi setiap hari.',
      level: 'N5'
    },
    {
      original: '友達と一緒に食べるのが好きです。',
      romanization: 'Tomodachi to issho ni taberu no ga suki desu.',
      translation: 'Saya suka makan bersama teman.',
      level: 'N4'
    }
  ]
}
```

**Berlaku untuk:** `jp-vocab.js`, `zh-vocab.js`, dan `kr-vocab.js` (Fase 24 setelah Fase 21).

**File yang diupdate:**
```
assets/js/data/jp-vocab.js          [UPDATE] — tambah field 'sentences'
assets/js/data/zh-vocab.js          [UPDATE]
assets/js/data/kr-vocab.js          [UPDATE]
assets/js/pages/jp-vocab.js         [UPDATE] — render sentences di modal
assets/js/pages/zh-vocab.js         [UPDATE]
assets/js/pages/kr-vocab.js         [UPDATE]
assets/css/japanese.css             [UPDATE] — sentence list styling
assets/css/mandarin.css             [UPDATE]
assets/css/korean.css               [UPDATE]
```

---

### FASE 26 — Onboarding & Placement Test

**Tujuan:** User baru tidak langsung "nyemplung" ke semua konten. Ada proses onboarding yang menentukan level awal dan memberikan rekomendasi modul.

**Alur (5 langkah — wizard multi-step):**
1. Welcome screen dengan animasi karakter dari tiga bahasa
2. Pilih bahasa fokus: Jepang / Mandarin / Korea / Semua
3. Placement Test: 10 soal singkat → tentukan Pemula / Menengah
4. Rekomendasi modul berdasarkan hasil test + bahasa pilihan
5. Set target harian (menit/hari) → Dashboard tampilkan modul rekomendasi

**localStorage keys baru:**
```
nh_user_{id}_onboarding   → {
  completed: bool,
  focusLang: 'jp' | 'zh' | 'kr' | 'all',
  level: 'beginner' | 'intermediate',
  dailyGoal: 15
}
```

**File yang diupdate:**
```
pages/onboarding.html               [BARU] — multi-step wizard
assets/js/pages/onboarding.js       [BARU]
assets/css/onboarding.css           [BARU]
assets/js/core/auth.js              [UPDATE] — redirect ke onboarding setelah register
pages/dashboard.html                [UPDATE] — section "Modul Direkomendasikan"
assets/js/pages/dashboard.js        [UPDATE]
```

---

### FASE 27 — Study Planner / Jadwal Belajar

**Tujuan:** User bisa set target ujian (JLPT N5/N4/N3, HSK 1–4, TOPIK I/II) + tanggal ujian → sistem buatkan jadwal belajar harian otomatis.

**Fitur:**
- Goal Setting: pilih target ujian + tanggal ujian
- Auto Schedule: sistem hitung berapa item perlu dipelajari/hari
- Daily To-Do: dashboard tampilkan "hari ini: 5 kanji + 3 grammar + 1 quiz"
- Progress Timeline: grafik progress vs jadwal ideal
- Catch-up Mode: jadwal menyesuaikan jika ada hari terlewat

**Ujian yang didukung:**
- Jepang: JLPT N5, N4, N3, N2, N1
- Mandarin: HSK 1, 2, 3, 4
- Korea: TOPIK I, TOPIK II *(tersedia setelah Fase 21)*

**localStorage keys baru:**
```
nh_user_{id}_planner   → { goal, targetDate, dailyQuota, schedule: {...} }
```

**File yang diupdate:**
```
pages/planner.html                  [BARU]
assets/js/pages/planner.js          [BARU]
assets/js/modules/planner.js        [BARU] — schedule calculation engine
assets/css/planner.css              [BARU]
pages/dashboard.html                [UPDATE] — daily to-do dari planner
assets/js/pages/dashboard.js        [UPDATE]
```

---

### FASE 28 — Mini Game

**Tujuan:** Variasi belajar melalui game ringan yang tetap melatih hafalan.

**Tiga game yang direncanakan:**

**Game 1 — Memory Match (Kartu Pasangan):**
- Grid 4×4 atau 6×6 kartu terbalik
- Klik 2 kartu: cocok (karakter + artinya) → menghilang
- Timer + skor combo
- Berlaku untuk Hiragana, Katakana, Hangul, dan Kosakata

**Game 2 — Word Scramble:**
- Kata/kalimat diacak hurufnya
- User susun kembali dengan drag-and-drop
- Tingkat kesulitan bertahap

**Game 3 — Falling Kana (Arcade):**
- Karakter hiragana/katakana/hangul jatuh dari atas layar
- User ketik romanisasi sebelum menyentuh garis bawah
- Semakin lama semakin cepat

**File yang dibuat:**
```
pages/games.html                    [BARU] — hub semua game
pages/games/memory.html             [BARU]
pages/games/scramble.html           [BARU]
pages/games/falling-kana.html       [BARU]
assets/js/pages/game-memory.js      [BARU]
assets/js/pages/game-scramble.js    [BARU]
assets/js/pages/game-falling.js     [BARU]
assets/css/games.css                [BARU]
```

---

### FASE 29 — Tema & Kustomisasi UI

**Tujuan:** User bisa ganti tema warna sesuai preferensi.

**5 tema yang direncanakan:**

| Tema | Warna Utama | Aksen | Vibe |
|------|-------------|-------|------|
| Sakura (default) | Merah #C0392B | Gold #D4AF37 | Tradisional Jepang |
| Zen | Abu gelap | Hijau sage | Minimalis |
| Neon Seoul | Ungu tua | Cyan neon | Futuristik |
| Bamboo | Hijau tua | Kuning | Alam Asia Timur |
| Midnight | Hitam | Oranye | Dark mode kuat |

**Implementasi:** CSS custom properties di `main.css` sudah ada — tinggal buat override per tema. Pilihan di Settings → Tampilan dengan preview real-time.

**File yang diupdate:**
```
assets/css/themes.css               [BARU] — semua theme variable overrides
assets/js/modules/theme.js          [BARU] — ThemeSystem
pages/settings.html                 [UPDATE] — theme picker + preview
assets/js/pages/settings.js         [UPDATE]
```

---

### FASE 30 — Backup & Restore Progress

**Tujuan:** User bisa export semua data progress ke file JSON dan import kembali di device lain — mengatasi ketakutan kehilangan progress jika localStorage terhapus.

**Fitur:**
- Export: tombol "Backup Data" → download `lingora-backup-[tanggal].json`
- Import: tombol "Restore Data" → pilih file → semua progress pulih
- Auto-backup lokal: setiap 7 hari simpan snapshot ke localStorage (max 3 snapshot)
- Validasi: cek integritas file backup sebelum import

**Format backup:**
```json
{
  "version": "2.0",
  "appName": "Lingora",
  "exportDate": "2026-02-25",
  "userId": "usr_xxx",
  "userName": "Nama User",
  "data": {
    "progress": {},
    "srs": {},
    "favorites": {},
    "xp": {},
    "badges": {},
    "activity": {},
    "streak": {},
    "challenges": {}
  }
}
```

**File yang diupdate:**
```
assets/js/modules/backup.js         [BARU] — BackupSystem: export(), import(), validate()
pages/settings.html                 [UPDATE] — section "Backup & Restore"
assets/js/pages/settings.js         [UPDATE]
```

---

### FASE 31 — Konten Lanjutan JP: Kosakata & Grammar N3 (eks Fase 16)

> ⏸️ **Di-hold** — dikerjakan setelah Fase 30 selesai dan app sudah stabil dengan tiga bahasa.

**Tujuan:** Membuka konten intermediate untuk pelajar Jepang yang sudah kuasai N5/N4.

**Target konten:**
- `jp-vocab-n3.js` — 300+ kata kosakata N3, 15 tema (berita, emosi, masyarakat, teknologi, dll)
- `jp-grammar-n3.js` — 30+ pola grammar N3: 〜ば, 〜ようだ, 〜らしい, 〜ことにする, 〜てしまう, dll

**File yang diupdate:**
```
assets/js/data/jp-vocab-n3.js       [BARU]
assets/js/data/jp-grammar-n3.js     [BARU]
pages/japanese/vocabulary.html      [UPDATE] — filter tambah N3
pages/japanese/grammar.html         [UPDATE] — filter tambah N3
pages/dashboard.html                [UPDATE] — progress card N3
```

**Catatan:** Pisahkan file data per level agar tidak berat. Verifikasi akurasi konten sebelum commit.

---

### FASE 32 — Konten Lanjutan ZH: Hanzi & Kosakata HSK 4 (eks Fase 21 lama)

> ⏸️ **Di-hold** — dikerjakan bersamaan atau setelah Fase 31.

**Tujuan:** Membuka konten intermediate untuk pelajar Mandarin yang sudah kuasai HSK 1–3.

**Target konten:**
- `hanzi-hsk4.js` — 300 karakter baru HSK 4
- `zh-vocab-hsk4.js` — 300+ kata kosakata HSK 4

**File yang diupdate:**
```
assets/js/data/hanzi-hsk4.js        [BARU]
assets/js/data/zh-vocab-hsk4.js     [BARU]
pages/mandarin/hanzi.html           [UPDATE] — filter tambah HSK4
pages/mandarin/vocabulary.html      [UPDATE] — filter tambah HSK4
pages/dashboard.html                [UPDATE] — progress card HSK4
```

---

### FASE 33 — Leaderboard Lokal & Tantangan Teman (eks Fase 25 lama)

> ⏸️ **Di-hold** — dikerjakan setelah tiga bahasa stabil dan konten lanjutan ada.

**Tujuan:** Beberapa user di device yang sama bisa lihat progress masing-masing dan bersaing (cocok untuk HP keluarga atau lab sekolah).

**Fitur:**
- Leaderboard: tabel peringkat semua user di device (XP, streak, badge, tiga bahasa)
- Perbandingan Progress: side-by-side chart dua user
- Challenge Teman: user A tantang user B dengan target spesifik

**Catatan:** Semua data multi-user sudah ada di localStorage sejak Fase 1 — hanya perlu halaman visualisasi baru. Tidak butuh server.

**File yang dibuat:**
```
pages/leaderboard.html              [BARU]
assets/js/pages/leaderboard.js      [BARU]
assets/css/leaderboard.css          [BARU]
pages/dashboard.html                [UPDATE] — link ke leaderboard
```

---

### FASE BONUS — Ide Jangka Panjang

**B1 — Text-to-Speech Custom Voice:** Integrasi API TTS yang lebih natural (Google TTS atau OpenAI TTS) sebagai pengganti/pelengkap Web Speech API yang kualitas suaranya bergantung OS. Penting terutama untuk Korea.

**B2 — OCR: Scan & Terjemah:** User foto teks Jepang/Mandarin/Korea → app kenali karakter dan tampilkan arti. Implementasi via Tesseract.js (OCR offline, tidak butuh server).

**B3 — Kamus Inline:** Tap/klik kata di dialog atau teks untuk muncul popup arti langsung. Butuh database kamus yang lebih lengkap untuk ketiga bahasa.

**B4 — Konten Korea Lanjutan (TOPIK II):** Setelah TOPIK I stabil, tambahkan kosakata dan grammar TOPIK II — konsisten dengan pola N3/HSK4 di JP dan ZH.

**B5 — Multi-Platform Sync:** Jika suatu saat ada backend, progress bisa sync antar device. Saat ini di luar prinsip "offline-first pure localStorage".

---

---

## 12. Log Pengerjaan & Versi

| Versi / Fase | Tanggal | Yang Dikerjakan | Status |
|---|---|---|---|
| **v1.0 — Fase 1** | — | Fondasi & Autentikasi | ✅ |
| **v1.1 — Fase 2** | — | Transisi & 404 | ✅ |
| **v1.2 — Fase 3** | — | Hiragana & Katakana | ✅ |
| **v1.3 — Fase 4** | — | Kanji (278 karakter, N5–N1) | ✅ |
| **v1.4 — Fase 5** | — | Mandarin (Pinyin, Nada, Hanzi, Vocab ZH) | ✅ |
| **v1.5 — Fase 6** | — | Quiz & Gamifikasi Awal | ✅ |
| **v1.6 — Fase 7** | — | Polish & Pengaturan | ✅ |
| **v1.7 — Fase 8** | — | Konten Lengkap JP (Vocab 225, Grammar 35) | ✅ |
| **v1.7.1 — Fase 8.1** | — | Redesign Login & Register | ✅ |
| **v1.7.2 — Fase 8.2** | — | Bug Fix Quiz JP | ✅ |
| **v1.7.3 — Fase 8.3** | — | Kanji N2 & N1 (total 278) | ✅ |
| **v1.7.4 — Fase 8.3.1** | — | Hapus Duplikat Kanji | ✅ |
| **v1.7.5 — Fase 8.4** | — | Enhance Profil | ✅ |
| **v1.8 — Fase 9** | — | Audio & Pelafalan (Web Speech API) | ✅ |
| **v1.8.1 — Fase 9.2** | — | Pelengkap Audio Mandarin | ✅ |
| **v1.9 — Fase 10** | — | Dark Mode + Anti-FOUC | ✅ |
| **v1.10 — Fase 11** | — | Spaced Repetition System (SM-2) | ✅ |
| **v1.11 — Fase 12** | — | Favorit & Bookmark | ✅ |
| **v1.12 — Fase 13** | — | Mode Input Jawaban (Quiz Ketik) | ✅ |
| **v1.13 — Fase 14** | — | Gamifikasi Lanjutan: XP & Level | ✅ |
| **v1.14 — Fase 15** | — | Challenge Harian | ✅ |
| **v1.15 — Fase 17** | — | Dialog & Percakapan (JP + ZH) | ✅ |
| **v1.16 — Fase 18** | — | Streak Reminder (Browser Notification) | ✅ |
| **v1.17 — Fase 19** | — | Export Progress ke PDF | ✅ |
| **v1.18 — Fase 20** | — | PWA (Service Worker, Install, Offline) | ✅ |
| **v1.19 — Fase 20.4** | — | Live Clock di Topbar Dashboard | ✅ |
| **v2.0 — Fase 21.1** | 2026-02-25 | Rename & Rebranding NihonHan → Lingora. Update: semua 23 HTML, 43 JS, manifest.json (v3 bump), sw.js (lingora-v3), index.html, 404.html. Tagline diupdate ke 3 bahasa. Folder proyek: `lingora/`. | ✅ |
| **v2.1 — Fase 21.2** | 2026-02-25 | Data Korea: `hangul.js` (14 konsonan + 21 vokal + 70 suku kata), `kr-vocab.js` (155 kata, 15 tema, TOPIK1/2), `kr-grammar.js` (27 pola, 5 kategori), `kr-dialogs.js` (6 dialog situasional TOPIK I). | ✅ |

## 11. Panduan untuk Claude Selanjutnya

### Konteks Proyek Saat Ini

Kamu sedang melanjutkan pengembangan **Lingora** (sebelumnya Lingora), aplikasi web belajar bahasa Asia Timur yang berjalan **100% di browser tanpa server**. App sudah berjalan stabil di Fase 20.4 dengan dua bahasa (JP + ZH). Fase 21 adalah langkah besar berikutnya: menambahkan Korea dan merename proyek.

**Stack:** Vanilla HTML + CSS + JavaScript. Tidak ada framework, tidak ada build tool, tidak ada npm. Semua berjalan dengan buka `index.html` di browser.

### Sebelum Mulai Fase Baru

1. **Baca README ini dulu** secara keseluruhan — pahami struktur, pola kode, dan bug fix yang sudah ada
2. **Baca kode file yang akan diubah** sebelum mulai coding — jangan asumsikan isi file
3. **Tentukan fase yang dikerjakan** berdasarkan Roadmap di atas

### Aturan Wajib

- Ikuti pola `App.init('page-id')` dan `Router.guard()` di setiap halaman baru
- Gunakan `Storage.getUser()` / `Storage.setUser()` untuk semua data persisten — **JANGAN** gunakan `localStorage` langsung
- Gunakan `Progress.markLearned()` / `Progress.getLearned()` untuk tracking hafalan
- Tambahkan `ChallengeSystem.onLearnItem()` / `onModuleVisit()` di setiap modul baru
- Tambahkan `XPSystem.addXP()` di modul yang relevan
- Setiap halaman authenticated **wajib** punya: anti-FOUC script di head, link manifest PWA, script `pwa.js`, dan tombol theme toggle di topbar

### Naming Convention

```
Halaman HTML    → pages/{bahasa}/{nama-modul}.html   (bahasa: japanese/mandarin/korean)
Script halaman  → assets/js/pages/{nama-halaman}.js
Data konten     → assets/js/data/{modul}-{keterangan}.js
Modul reusable  → assets/js/modules/{nama-modul}.js
CSS per fitur   → assets/css/{nama-fitur}.css
```

**Prefix bahasa untuk file data dan module ID:**
- Jepang: `jp-` (vocab, grammar, dialog) atau tanpa prefix (hiragana, katakana, kanji)
- Mandarin: `zh-` (vocab, dialog) atau tanpa prefix (pinyin, hanzi)
- Korea: `kr-` (vocab, grammar, dialog) atau tanpa prefix (hangul)

### Anti-Pattern yang Harus Dihindari

- ❌ Jangan gunakan `localStorage` langsung — selalu pakai `Storage.getUser()`
- ❌ Jangan hardcode path — selalu gunakan `getBase()` untuk path relatif
- ❌ Jangan gabungkan data konten besar ke 1 file — pisah per level/modul
- ❌ Jangan lupa tambahkan script baru ke semua halaman yang relevan (termasuk sidebar update)
- ❌ Jangan lupa test di GitHub Pages (bukan hanya lokal) — bug path sering tidak ketahuan lokal
- ❌ Untuk Fase 21: jangan hardcode nama "NihonHan" di file baru — gunakan "Lingora"

### Checklist Halaman Baru

Untuk setiap halaman authenticated baru, pastikan memiliki:
- [ ] Anti-FOUC script di `<head>` untuk dark mode
- [ ] `<link rel="manifest" href="...manifest.json">`
- [ ] Meta PWA (`apple-mobile-web-app-capable`, `theme-color`, dll)
- [ ] Script `pwa.js` sebelum closing `</body>`
- [ ] Tombol `.theme-toggle-btn` di topbar
- [ ] `Router.guard()` di script halaman
- [ ] `App.init('nama-halaman')` di script halaman
- [ ] Link halaman ini di sidebar semua halaman lain
- [ ] Script `challenge.js` jika halaman punya aktivitas belajar
- [ ] Script `xp.js` jika halaman punya aktivitas yang memberi XP

### Setelah Setiap Fase Selesai

1. Update section **Riwayat Fase** di README ini
2. Update section **Struktur Folder** jika ada file baru
3. Update **localStorage Key Reference** jika ada key baru
4. Update **Ringkasan Konten** jika ada konten baru
5. Buat zip baru dengan nama `lingora_fase{N}.zip`

### Catatan Khusus untuk Fase 21

Fase 21 adalah fase terbesar sejak Fase 1 karena mencakup:
1. Rename seluruh proyek (branding, manifest, ikon)
2. Penambahan satu bahasa baru lengkap (Hangul + Vocab + Grammar + Dialog + Quiz)
3. Update semua sidebar (jumlahnya banyak)
4. Penambahan badge baru (Hanŭl + Poliglot) ke BadgeSystem

**Disarankan dikerjakan per sub-fase:** 21.A dulu (rename) → verifikasi semua berjalan → 21.B (Hangul) → verifikasi → dst. Jangan kerjakan semua sekaligus dalam satu sesi.

---

*Lingora — 日本語も、中文も、한국어도. Belajar itu indah, satu karakter dalam satu waktu.*

*Dokumen ini adalah README tunggal yang mencakup semua informasi proyek — dari konteks, arsitektur, riwayat pengembangan, hingga roadmap lengkap fase 21 dan seterusnya. Perbarui dokumen ini setiap selesai fase.*
