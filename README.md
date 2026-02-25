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
8. [Riwayat Fase (1–29)](#8-riwayat-fase-129)
9. [Bug Fix yang Sudah Diperbaiki](#9-bug-fix-yang-sudah-diperbaiki)
10. [Roadmap — Fase Selanjutnya (Di-hold)](#10-roadmap--fase-selanjutnya-di-hold)
11. [Panduan untuk Claude Selanjutnya](#11-panduan-untuk-claude-selanjutnya)
12. [Log Pengerjaan & Versi](#12-log-pengerjaan--versi)

---

## 1. Status & Versi

| Info | Detail |
|------|--------|
| **Versi App** | 3.3.4 |
| **Fase Saat Ini** | FASE 29.4 ✅ Bug Fix Settings Layout |
| **Fase Terakhir** | Backup & Restore Progress (Fase 29) |
| **Fokus Berikutnya** | 🐛 Bug Fixing — **tidak ada fase baru untuk sementara** |
| **Nama Lama** | NihonHan (hanya JP + ZH) |
| **Nama Baru** | Lingora (JP + ZH + KR) — berlaku mulai Fase 21.1 |
| **Fase 16** | Di-hold (konten N3/N2 lanjutan — effort besar) |
| **Fase 30+** | Di-hold sampai bug fixing selesai |
| **Deploy** | GitHub Pages / Netlify (butuh HTTPS agar PWA penuh berfungsi) |
| **Service Worker Cache** | `lingora-v12` |

> **⚠️ Fokus Saat Ini: Bug Fixing**  
> Setelah Fase 29 selesai, pengembangan difokuskan pada **bug fixing** terlebih dahulu sebelum melanjutkan ke fase baru. Tidak ada penambahan fitur sampai app berjalan stabil tanpa bug yang diketahui.

> **Catatan Rename:** Mulai Fase 21.1, nama proyek berubah dari **NihonHan** → **Lingora**.  
> *Lingua* (Latin: bahasa/suara) + *-ora* — menggambarkan suara dan aksara dari tiga bahasa Asia Timur.

---

## 2. Deskripsi Proyek

Lingora adalah aplikasi web belajar bahasa yang berjalan **100% di browser** tanpa server, database, atau koneksi internet setelah diunduh. Seluruh data user tersimpan di `localStorage`.

### Tiga Bahasa yang Didukung

| Bahasa | Modul | Konten |
|--------|-------|--------|
| 🇯🇵 **Jepang** | Hiragana, Katakana, Kanji, Kosakata, Grammar, Dialog, Quiz | 104+104 kana, 278 kanji (N5–N1), 225 kata, 35 grammar, 8 dialog |
| 🇨🇳 **Mandarin** | Pinyin, Nada, Hanzi, Kosakata, Dialog, Quiz | 21+38 pinyin, 5 nada, 208 hanzi (HSK 1–3), 120+ kata, 7 dialog |
| 🇰🇷 **Korea** | Hangul, Kosakata, Grammar, Dialog, Quiz | 35 jamo, 155 kata (TOPIK I/II), 27 grammar, 6 dialog |

### Fitur Unggulan

- **Spaced Repetition System (SM-2)** — Algoritma hafalan cerdas layaknya Anki
- **Gamifikasi lengkap** — XP, Level, Badge, Challenge Harian, Streak
- **Quiz multi-mode** — Pilihan ganda, ketik jawaban, listening mode (audio)
- **Vocabulary Builder** — 2–3 kalimat kontekstual per kata + quiz fill-in-the-blank
- **Stroke Order** — Animasi SVG urutan coretan Hiragana, Katakana (46 masing-masing), dan Kanji
- **Audio pengucapan** — Web Speech API (JP/ZH/KR)
- **Mini Game** — Memory Match, Word Scramble, Falling Kana (arcade Canvas API)
- **Study Planner** — Jadwal belajar otomatis berdasarkan target JLPT/HSK/TOPIK
- **Onboarding & Placement Test** — Wizard 5-langkah untuk user baru
- **Backup & Restore** — Export/import JSON + auto-snapshot lokal berkala
- **Tema & Kustomisasi** — 5 tema warna, 4 font, 3 radius UI dengan preview real-time
- **Export laporan PDF** — Dari semua progress via laporan PDF standalone
- **PWA** — Install di HP/laptop, berjalan offline penuh
- **Dark mode** — Anti-FOUC, persistensi per-user
- **Pengingat belajar** — Browser notification dengan jadwal kustom
- **Multi-user** — Beberapa akun di satu device

---

## 3. Cara Menjalankan

### Lokal (tanpa server)

```
1. Buka folder lingora/ di file explorer
2. Double klik index.html
3. Daftar akun baru → langsung bisa digunakan
4. Tidak perlu npm, pip, server, atau koneksi internet
```

### GitHub Pages / Netlify (untuk PWA penuh)

```
1. Upload folder lingora/ ke repo GitHub
2. Aktifkan GitHub Pages dari root
3. Akses via HTTPS → PWA install prompt akan muncul
4. Service Worker aktif → offline berfungsi penuh
```

> **Catatan:** Service Worker (`sw.js`) hanya aktif di HTTPS atau `localhost`. Di `file://`, fitur PWA tidak aktif tapi app tetap berfungsi normal.

---

## 4. Struktur Folder

```
lingora/
├── index.html                          ← Landing page & redirect ke dashboard/login
├── 404.html                            ← Halaman not found custom
├── manifest.json                       ← PWA manifest (v4, 6 shortcuts)
├── sw.js                               ← Service Worker cache-first (lingora-v12)
├── README.md                           ← Dokumentasi lengkap proyek (file ini)
│
├── components/
│   └── sidebar.html                    ← Template referensi sidebar
│
├── pages/
│   ├── login.html                      ← Login (dua kolom, hero kiri)
│   ├── register.html                   ← Daftar akun → redirect ke onboarding
│   ├── onboarding.html                 ← Wizard 5 langkah untuk user baru [Fase 25]
│   ├── dashboard.html                  ← Hub utama: streak, XP, challenge, SRS due, planner, game
│   ├── profile.html                    ← Edit profil, avatar (10 opsi), bio, statistik
│   ├── change-password.html            ← Ganti password
│   ├── settings.html                   ← Semua pengaturan app (versi 3.3)
│   ├── stats.html                      ← Statistik lengkap, heatmap 30 hari, badge, riwayat quiz
│   ├── report.html                     ← Laporan PDF standalone (tanpa sidebar)
│   ├── planner.html                    ← Study Planner: target ujian + jadwal otomatis [Fase 26]
│   ├── games.html                      ← Hub mini game (3 game card) [Fase 27]
│   │
│   ├── japanese/
│   │   ├── hiragana.html               ← Tab: Tabel / Flashcard / SRS / Menulis (stroke)
│   │   ├── katakana.html               ← Tab: Tabel / Flashcard / SRS / Menulis (stroke)
│   │   ├── kanji.html                  ← Tab: Jelajah / SRS | Filter N5–N1
│   │   ├── vocabulary.html             ← Tab: Jelajah / SRS / Kalimat Quiz | Filter tema & level
│   │   ├── grammar.html                ← Accordion 35 pola N5–N4, 5 kategori, search
│   │   ├── dialog.html                 ← 8 percakapan situasional + playthrough TTS
│   │   └── quiz.html                   ← Quiz JP: pilih / ketik / listening, modul pilihan
│   │
│   ├── mandarin/
│   │   ├── pinyin.html                 ← Tabel inisial/final + audio per kombinasi
│   │   ├── tones.html                  ← 5 nada + kurva SVG + audio + contoh kata
│   │   ├── hanzi.html                  ← Tab: Jelajah / SRS | Filter HSK 1–3
│   │   ├── vocabulary.html             ← Tab: Jelajah / SRS / Kalimat Quiz | Filter tema & level
│   │   ├── dialog.html                 ← 7 percakapan situasional + playthrough TTS
│   │   └── quiz.html                   ← Quiz ZH: pilih / ketik / listening, modul pilihan
│   │
│   ├── korean/
│   │   ├── hangul.html                 ← Tab: Tabel / Flashcard / SRS (jamo + suku kata)
│   │   ├── vocabulary.html             ← Tab: Jelajah / SRS / Kalimat Quiz | Filter tema & TOPIK
│   │   ├── grammar.html                ← Accordion 5 kategori, 27 pola, filter TOPIK I/II
│   │   ├── dialog.html                 ← 6 dialog TOPIK I + playthrough TTS ko-KR
│   │   └── quiz.html                   ← Quiz KR: pilih / ketik / listening, modul Hangul & Vocab
│   │
│   └── games/
│       ├── memory.html                 ← Memory Match: kartu pasangan flip 3D [Fase 27]
│       ├── scramble.html               ← Word Scramble: susun tile huruf acak [Fase 27]
│       └── falling-kana.html           ← Falling Kana: arcade Canvas API [Fase 27]
│
└── assets/
    ├── css/
    │   ├── main.css                    ← CSS variables global, dark mode, toast, XP bar
    │   ├── layout.css                  ← Sidebar, main-content, topbar, responsive
    │   ├── components.css              ← Shared: modal, badge, SRS, audio btn, fav, vocab-builder
    │   ├── auth.css                    ← Login & register (dua kolom, hero)
    │   ├── dashboard.css               ← XP bar, challenge, clock, planner section, game quicklink
    │   ├── transitions.css             ← Animasi fade-in antar halaman
    │   ├── japanese.css                ← Hiragana/Katakana/Kanji/Vocab/Grammar/Stroke JP
    │   ├── kanji.css                   ← Kanji grid, modal, badge N5–N1, stroke order widget
    │   ├── mandarin.css                ← Pinyin, Hanzi, Nada, Vocab ZH
    │   ├── korean.css                  ← Hangul, Vocab KR, Grammar KR, badge TOPIK I/II
    │   ├── quiz.css                    ← Quiz engine UI, mode pilih/ketik/listening
    │   ├── dialog.css                  ← Dialog viewer, playthrough, vocab chip
    │   ├── settings.css                ← Settings page, reminder, dark mode, tema, backup section
    │   ├── report.css                  ← Laporan PDF, @media print
    │   ├── onboarding.css              ← Wizard: card, step dots, progress bar, lang selector
    │   ├── planner.css                 ← Study Planner: exam grid, timeline, countdown
    │   ├── games.css                   ← Mini Game: memory-grid, flip 3D, scramble-tile, canvas
    │   └── themes.css                  ← 5 tema warna, font & radius override [Fase 28]
    │
    ├── icons/
    │   └── [ikon PWA berbagai ukuran]
    │
    └── js/
        ├── core/
        │   ├── storage.js              ← Storage wrapper: get/set/del per user namespace
        │   ├── auth.js                 ← Register, login, logout, session, streak harian
        │   ├── router.js               ← Guard auth, getBase() path resolver
        │   └── app.js                  ← Init app, sidebar, toast, dark mode, theme
        │
        ├── data/
        │   ├── hiragana.js             ← 104 karakter hiragana + metadata (row/col, romaji)
        │   ├── katakana.js             ← 104 karakter katakana + metadata
        │   ├── kana-strokes.js         ← SVG path stroke order 46 hiragana + 46 katakana dasar
        │   ├── kanji.js                ← 278 kanji (N5–N1): onyomi/kunyomi/contoh/radikal/stroke count
        │   ├── jp-vocab.js             ← 225 kata JP, 15 tema, field `sentences` di kata kunci
        │   ├── jp-grammar.js           ← 35 pola grammar N5–N4, 5 kategori
        │   ├── jp-dialogs.js           ← 8 dialog situasional JP
        │   ├── pinyin.js               ← 21 inisial + 38 final + kombinasi tabel
        │   ├── zh-tones.js             ← 5 nada + kurva SVG path + contoh kata
        │   ├── hanzi.js                ← 208 karakter HSK 1–3
        │   ├── zh-vocab.js             ← 120+ kata ZH, 15 tema, field `sentences` di kata kunci
        │   ├── zh-dialogs.js           ← 7 dialog situasional ZH
        │   ├── hangul.js               ← 14 konsonan + 21 vokal + 70 suku kata dasar
        │   ├── kr-vocab.js             ← 155 kata KR, 15 tema, TOPIK I/II, field `sentences`
        │   ├── kr-grammar.js           ← 27 pola grammar, 5 kategori, level TOPIK I/II
        │   └── kr-dialogs.js           ← 6 dialog situasional TOPIK I
        │
        ├── modules/
        │   ├── audio.js                ← AudioEngine: Web Speech API (JP/ZH/KR voice)
        │   ├── flashcard.js            ← Flashcard engine: 3D flip CSS, navigasi prev/next
        │   ├── progress.js             ← markLearned, getLearned, favorites, quiz score
        │   ├── quiz.js                 ← QuizEngine: multiple choice, shuffle, BadgeSystem
        │   ├── stroke.js               ← Stroke order widget Kanji (SVG animasi)
        │   ├── kana-stroke-ui.js       ← KanaStrokeUI: animasi stroke Hiragana/Katakana SVG
        │   ├── srs.js                  ← SRS Engine: SM-2 algorithm (quality 0–5)
        │   ├── srs-ui.js               ← SRS UI renderer: card flip, rating buttons (reusable)
        │   ├── xp.js                   ← XPSystem: addXP, level calc, history, toast XP
        │   ├── challenge.js            ← ChallengeSystem: challenge harian, seed tanggal
        │   ├── reminder.js             ← ReminderSystem: browser notification, jadwal kustom
        │   ├── pwa.js                  ← PWA Manager: install prompt, update SW, offline banner
        │   ├── vocab-builder.js        ← VocabBuilder: kalimat kontekstual, quiz fill-in-blank
        │   ├── planner.js              ← StudyPlanner engine: calcSchedule, calcTodayTodo
        │   ├── theme.js                ← ThemeSystem: 5 tema, font, radius, anti-FOUC helper
        │   └── backup.js               ← BackupSystem: export JSON, import, auto-snapshot
        │
        └── pages/
            ├── dashboard.js            ← XP bar, streak, challenge, SRS due, planner today, clock
            ├── stats.js                ← Statistik, heatmap 30 hari, badge, XP history, favorit
            ├── report.js               ← Generate laporan PDF dari localStorage
            ├── settings.js             ← Semua toggle, preferensi, tema picker, backup UI
            ├── onboarding.js           ← Wizard 5 langkah, bank soal placement 30 soal
            ├── planner.js              ← Halaman planner: setup, active view, catch-up
            ├── hiragana.js             ← Grid, flashcard, SRS, favorit, audio, stroke tab (lazy-init)
            ├── katakana.js             ← Grid, flashcard, SRS, favorit, audio, stroke tab (lazy-init)
            ├── kanji.js                ← Grid, modal detail, SRS, favorit, audio, stroke order
            ├── jp-vocab.js             ← Grid kartu, SRS, favorit, sentences, kalimat quiz
            ├── jp-grammar.js           ← Accordion, mark hafal, search, filter level
            ├── jp-dialog.js            ← Grid dialog, viewer step, playthrough TTS, XP
            ├── quiz-jp.js              ← QuizEngine JP: kana/kanji/vocab, listening mode
            ├── hanzi.js                ← Grid, modal, SRS, favorit, audio
            ├── pinyin.js               ← Tabel inisial/final, audio per sel
            ├── tones.js                ← 5 nada, kurva SVG, audio, contoh kata
            ├── zh-vocab.js             ← Grid kartu, SRS, favorit, sentences, kalimat quiz
            ├── zh-dialog.js            ← Grid dialog, viewer step, playthrough TTS, XP
            ├── quiz-zh.js              ← QuizEngine ZH: pinyin/hanzi/vocab, listening mode
            ├── hangul.js               ← Grid jamo, modal, flashcard, SRS, favorit, audio
            ├── kr-vocab.js             ← Grid kartu, SRS, favorit, sentences, kalimat quiz
            ├── kr-grammar.js           ← Accordion, mark hafal, search, filter TOPIK
            ├── kr-dialog.js            ← Grid dialog, viewer step, playthrough TTS ko-KR, XP
            ├── quiz-kr.js              ← QuizEngine KR: hangul/vocab, listening mode
            ├── game-memory.js          ← Memory Match: flip 3D CSS, timer, skor, XP
            ├── game-scramble.js        ← Word Scramble: tile klik susun/ambil, 3 bahasa, XP
            └── game-falling.js         ← Falling Kana: Canvas requestAnimationFrame, arcade, nyawa
```

---

## 5. Arsitektur & Pola Kode

### Stack Teknologi

**100% Vanilla** — HTML5 + CSS3 + JavaScript ES6+. Tidak ada framework, tidak ada build tool, tidak ada npm. Buka `index.html` langsung berjalan.

### Pola Inisialisasi Halaman

Setiap halaman authenticated mengikuti pola ini:

```html
<!-- Di <head>: Anti-FOUC dark mode + tema lengkap -->
<script>
  (function() {
    const dm = localStorage.getItem('nh_dark_mode');
    if (dm === 'true') document.documentElement.setAttribute('data-theme', 'dark');
    const ct = localStorage.getItem('nh_color_theme');
    if (ct) document.documentElement.setAttribute('data-color-theme', ct);
    const fn = localStorage.getItem('nh_font');
    if (fn) document.documentElement.setAttribute('data-font', fn);
    const rd = localStorage.getItem('nh_radius');
    if (rd) document.documentElement.setAttribute('data-radius', rd);
  })();
</script>
```

```javascript
// Di script halaman
Router.guard();          // Redirect ke login jika tidak authenticated
App.init('page-id');    // Init sidebar, toast, dark mode toggle, theme toggle
```

### Module Pattern

Semua module JS menggunakan IIFE atau object literal untuk namespace:

```javascript
const ModuleName = (function() {
  // private state
  return {
    init() {},
    publicMethod() {}
  };
})();
```

### Storage Pattern

**WAJIB** menggunakan wrapper — **JANGAN** akses `localStorage` langsung:

```javascript
// ✅ Benar
const userData = Storage.getUser(userId, 'progress');
Storage.setUser(userId, 'progress', newData);

// ❌ Salah — jangan lakukan ini
const raw = localStorage.getItem('nh_user_123_progress');
```

### Sistem XP & Progress

```javascript
// Tambah XP
XPSystem.addXP(userId, amount, 'source-label');

// Mark item hafal
Progress.markLearned(userId, moduleId, itemId);
const learned = Progress.getLearned(userId, moduleId);

// Challenge System
ChallengeSystem.onLearnItem(userId, moduleId);
ChallengeSystem.onModuleVisit(userId, moduleId);
```

---

## 6. localStorage Key Reference

### Keys Global (tidak per-user)

| Key | Nilai | Keterangan |
|-----|-------|------------|
| `nh_dark_mode` | `'true'` / `'false'` | Dark mode status |
| `nh_color_theme` | `'sakura'` / `'zen'` / `'neon-seoul'` / `'bamboo'` / `'midnight'` | Tema warna aktif |
| `nh_font` | `'default'` / `'rounded'` / `'serif'` / `'mono'` | Font aktif |
| `nh_radius` | `'sharp'` / `'default'` / `'rounded'` | Sudut UI aktif |
| `nh_current_user` | userId string | User yang sedang login |
| `nh_users` | JSON array | Daftar semua user terdaftar |

### Keys Per-User (`nh_user_{id}_...`)

| Key Suffix | Tipe | Keterangan |
|------------|------|------------|
| `profile` | Object | `{name, username, email, avatar, bio, createdAt}` |
| `progress` | Object | Progress belajar semua modul (learned items) |
| `favorites` | Object | Bookmark per modul |
| `quiz_scores` | Array | Riwayat skor quiz |
| `xp` | Number | Total XP |
| `xp_history` | Array | Riwayat XP `{amount, source, date}` |
| `level` | Number | Level user saat ini |
| `streak` | Number | Streak hari berturut-turut |
| `last_active` | ISO date string | Tanggal terakhir aktif |
| `activity_log` | Array | Log aktivitas `{date, modules[]}` |
| `badges` | Array | Badge yang diraih |
| `challenge` | Object | Challenge harian `{date, tasks[], completed}` |
| `srs_{moduleId}` | Object | Data SRS per modul (SM-2) |
| `settings` | Object | Semua preferensi app |
| `onboarding` | Object | `{completed, focusLang, level, dailyGoal}` |
| `planner` | Object | `{examId, targetDate, startDate, createdAt}` |
| `customization` | Object | `{colorTheme, font, radius, compactSidebar}` |
| `last_backup` | Object | `{timestamp, date}` info backup terakhir |
| `last_restore` | Object | `{timestamp, fromDate, fromUser}` |

### Keys Auto-Backup

| Key | Tipe | Keterangan |
|-----|------|------------|
| `auto_backups_{userId}` | Array | Max 3 snapshot: `[{timestamp, data: BackupObj}]` |

### Module IDs (untuk Progress & SRS)

| Module ID | Bahasa | Konten |
|-----------|--------|--------|
| `hiragana` | JP | 104 karakter hiragana |
| `katakana` | JP | 104 karakter katakana |
| `kanji` | JP | 278 kanji N5–N1 |
| `jp-vocab` | JP | 225 kosakata Jepang |
| `jp-grammar` | JP | 35 pola grammar |
| `pinyin` | ZH | 59 unit pinyin |
| `hanzi` | ZH | 208 karakter HSK 1–3 |
| `zh-vocab` | ZH | 120+ kosakata Mandarin |
| `hangul` | KR | 35 jamo + suku kata |
| `kr-vocab` | KR | 155 kosakata Korea |
| `kr-grammar` | KR | 27 pola grammar |

---

## 7. Ringkasan Konten

### 🇯🇵 Bahasa Jepang

| Modul | Jumlah | Detail |
|-------|--------|--------|
| Hiragana | 104 karakter | Gojūon + dakuten + kombinasi; animasi stroke 46 dasar |
| Katakana | 104 karakter | Gojūon + dakuten + kombinasi; animasi stroke 46 dasar |
| Kanji | 278 karakter | N5 (103) + N4 (55) + N3 (70) + N2 (30) + N1 (20); onyomi/kunyomi/contoh |
| Kosakata | 225 kata | 15 tema; 2–3 kalimat kontekstual per kata kunci |
| Grammar | 35 pola | N5 + N4; 5 kategori: Dasar, Tenses, Partikel, Negatif, Pertanyaan |
| Dialog | 8 percakapan | Salam, Toko, Restoran, Arah, Hotel, Rumah Sakit, dll |

### 🇨🇳 Bahasa Mandarin

| Modul | Jumlah | Detail |
|-------|--------|--------|
| Pinyin | 59 unit | 21 inisial + 38 final + tabel kombinasi + audio |
| Nada | 5 nada | Kurva SVG + contoh kata + audio tiap nada |
| Hanzi | 208 karakter | HSK 1 (150) + HSK 2 (38) + HSK 3 (20) |
| Kosakata | 120+ kata | 15 tema; kalimat kontekstual per kata kunci |
| Dialog | 7 percakapan | Perkenalan, Belanja, Makan, Transportasi, dll |

### 🇰🇷 Bahasa Korea

| Modul | Jumlah | Detail |
|-------|--------|--------|
| Hangul | 35+ unit | 14 konsonan + 21 vokal + 70 suku kata dasar |
| Kosakata | 155 kata | 15 tema; TOPIK I + TOPIK II; kalimat kontekstual |
| Grammar | 27 pola | 5 kategori; level TOPIK I + TOPIK II |
| Dialog | 6 percakapan | Situasional TOPIK I: Salam, Perkenalan, Belanja, dll |

### 🎮 Mini Game

| Game | Konten | XP per sesi |
|------|--------|-------------|
| Memory Match | Hiragana/Katakana/Hangul/Kanji N5; 8–18 pasang kartu | +20 + skor/20 |
| Word Scramble | JP/ZH/KR; 5–15 soal; tile klik susun | +3 per kata benar |
| Falling Kana | Hiragana/Katakana/Hangul; arcade Canvas; leveling adaptif | +1 per karakter + bonus |

### 🏆 Badge System

| Badge | ID | Cara Dapat |
|-------|----|-----------|
| 🌸 Kana Master | `kana_master` | Hafal semua hiragana + katakana |
| ⛩️ Kanji Novice | `kanji_novice` | Hafal 50 kanji |
| 📚 Kanji Scholar | `kanji_scholar` | Hafal 150 kanji |
| 🎌 Nihongo | `nihongo` | Hafal 100+ item JP |
| 🌙 Hanŭl | `hangul_master` | Hafal item dari semua modul KR |
| 🌏 Poliglot | `polyglot` | Hafal item dari JP + ZH + KR |
| 🔥 Streak 7 | `streak_7` | Streak 7 hari berturut-turut |
| ⚡ Streak 30 | `streak_30` | Streak 30 hari berturut-turut |
| 🎯 Quiz Perfect | `quiz_perfect` | Skor sempurna di 1 quiz |
| 📖 Vocab Master | `vocab_master` | Hafal 100 kosakata |

---

## 8. Riwayat Fase (1–29)

### FASE 1 — Fondasi & Autentikasi ✅

Fondasi teknis proyek: struktur folder, autentikasi multi-user, routing, localStorage wrapper, komponen UI dasar.

**File yang dibuat:**
- `assets/js/core/storage.js` — namespace per-user di localStorage (`nh_user_{id}_*`)
- `assets/js/core/auth.js` — register, login, logout, session management, streak
- `assets/js/core/router.js` — guard autentikasi, `getBase()` path resolver
- `assets/js/core/app.js` — init sidebar, toast notification, dark mode toggle
- `index.html` — landing page + redirect otomatis
- `pages/login.html`, `pages/register.html` — form autentikasi

---

### FASE 2 — Transisi & 404 ✅

Transisi halaman (fade-in CSS), halaman 404 custom, perbaikan redirect flow.

**File:**
- `assets/css/transitions.css` — animasi fade-in antar halaman
- `404.html` — halaman not found dengan link kembali ke dashboard

---

### FASE 3 — Hiragana & Katakana ✅

Dua modul kana lengkap dengan tiga mode belajar.

**Fitur per modul:**
- **Tab Tabel** — grid 10×10 per baris, hover detail, klik untuk audio
- **Tab Flashcard** — engine 3D flip CSS, navigasi prev/next, shuffle
- **Tab SRS** — SM-2 algorithm, rating 1–5, interval adaptif
- Favorit, audio Web Speech API `ja-JP`

---

### FASE 4 — Kanji N5–N1 ✅

278 kanji dari lima level JLPT dengan data lengkap.

**Data per kanji:** karakter, makna, onyomi, kunyomi, contoh kata, radikal, jumlah stroke, level (N5/N4/N3/N2/N1)

**Fitur:** grid filter N5–N1, modal detail, SRS, stroke order widget (SVG animasi), favorit, audio

---

### FASE 5 — Bahasa Mandarin ✅

Empat modul Mandarin: Pinyin, Nada, Hanzi, Kosakata.

**Fitur:**
- `pinyin.html` — tabel inisial + final + audio per kombinasi
- `tones.html` — 5 nada + kurva SVG + audio contoh
- `hanzi.html` — 208 karakter HSK 1–3, grid + SRS
- `vocabulary.html` ZH — 120+ kata, 15 tema

---

### FASE 6 — Quiz & Gamifikasi Awal ✅

Sistem quiz multi-modul dan fondasi gamifikasi (BadgeSystem dasar).

**Fitur:** pilihan ganda 4 opsi, acak soal, timer, review jawaban, modul: Hiragana/Katakana/Kanji/Vocab JP & ZH

---

### FASE 7 — Polish & Pengaturan ✅

Halaman pengaturan, profil user, stats awal.

**File:** `settings.html` + `settings.js`, `profile.html` (avatar 10 opsi, bio), `stats.html`

---

### FASE 8 — Konten Lengkap JP + Sub-fase ✅

**8** — Vocab JP 225 kata (15 tema), Grammar JP 35 pola (5 kategori, N5–N4)  
**8.1** — Redesign login/register (dua kolom, hero image kiri)  
**8.2** — Bug fix quiz JP (opsi duplikat, timer tidak reset antar soal)  
**8.3** — Kanji N2 + N1 (total 278), hapus duplikat kanji  
**8.4** — Enhance profil: bio, detail stats, edit inline

---

### FASE 9 — Audio & Pelafalan ✅

Web Speech API terintegrasi di semua modul yang relevan.

**`audio.js` — AudioEngine:**
- `speakJP(text)` — voice `ja-JP`
- `speakZH(text)` — voice `zh-CN`
- `speakKR(text)` — voice `ko-KR` (ditambah Fase 21.3)
- `getVoices()`, `hasJPVoice()`, `hasZHVoice()`, `hasKRVoice()`
- Fallback graceful jika suara tidak tersedia di OS/browser

**9.2** — Pelengkap audio Mandarin: tones + dialog ZH

---

### FASE 10 — Dark Mode + Anti-FOUC ✅

Dark mode lengkap dengan anti-flash-of-unstyled-content.

**Implementasi:**
- CSS variables `[data-theme="dark"]` di `main.css` — semua elemen mengikuti
- Inline script `<head>` di semua halaman — apply sebelum render (cegah flash)
- Toggle tombol 🌙/☀️ di topbar setiap halaman
- Persistensi di `localStorage` → `nh_dark_mode`

---

### FASE 11 — Spaced Repetition System (SM-2) ✅

Algoritma hafalan cerdas terintegrasi ke semua modul.

**`srs.js` — SRS Engine:**
- Algoritma SM-2: kualitas 0–5 → hitung interval + EF (easiness factor)
- `getReviewItems(userId, moduleId, data)` — ambil item jatuh tempo
- `updateCard(userId, moduleId, itemId, quality)` — update setelah review
- `getStats(userId, moduleId)` — statistik SRS (due, new, learned)

**`srs-ui.js` — SRS UI (reusable):**
- Kartu flip 3D (front: pertanyaan / back: jawaban)
- Rating buttons: Lagi / Susah / Oke / Mudah
- Progress session, counter item

---

### FASE 12 — Favorit & Bookmark ✅

Sistem bookmark untuk semua item di semua modul.

- Tombol ❤️ per item (karakter, kata, kanji)
- Filter "Tampilkan Favorit" di grid
- Data: `nh_user_{id}_favorites` (object per moduleId)
- Statistik favorit di halaman Stats

---

### FASE 13 — Mode Quiz Ketik Jawaban ✅

Mode quiz kedua: user mengetik jawaban (bukan memilih).

**Fitur:**
- Toggle mode di selector: Pilihan Ganda ↔ Ketik Jawaban
- Normalisasi input (huruf kecil, strip spasi ekstra)
- Romanisasi diterima selain karakter asli (JP/KR)
- Feedback langsung setelah submit

---

### FASE 14 — XPSystem & Level ✅

Sistem poin pengalaman dan level terintegrasi ke seluruh app.

**`xp.js` — XPSystem:**
- `addXP(userId, amount, source)` — tambah XP + toast animasi
- `getLevel(xp)` — hitung level (threshold non-linear)
- `getLevelProgress(xp)` — persentase ke level berikutnya
- XP bar animated di dashboard
- Riwayat XP di `xp_history`

---

### FASE 15 — Challenge Harian ✅

Tantangan belajar harian yang di-generate otomatis berdasarkan tanggal.

**`challenge.js` — ChallengeSystem:**
- Seed tanggal → challenge deterministik (sama untuk semua user di hari yang sama)
- 3 tugas per hari dari 30+ template (JP + ZH + KR)
- Progress real-time per task
- Reward XP saat semua task selesai
- Hooks: `onLearnItem()`, `onModuleVisit()`, `onQuizComplete()`

---

### FASE 16 — [DI-HOLD] ⏸️

Konten lanjutan N3/N2 JP. Di-hold karena effort besar; dikerjakan setelah bug fixing.

---

### FASE 17 — Dialog & Percakapan (JP + ZH) ✅

Modul dialog situasional interaktif untuk Jepang dan Mandarin.

**Fitur:**
- Grid dialog dengan kategori situasi dan level
- Viewer percakapan: balon chat A/B (alternating)
- Playthrough otomatis: setiap baris dibaca TTS dengan jeda natural
- Toggle romanisasi (furigana JP / pinyin ZH) dan terjemahan Indonesia
- Vocab chip: kata sulit di-highlight, klik → popup arti
- XP +5 per dialog diselesaikan

---

### FASE 18 — Streak Reminder (Browser Notification) ✅

Pengingat belajar via browser notification.

**`reminder.js` — ReminderSystem:**
- `Notification.requestPermission()` — minta izin
- Jadwal kustom: hari dalam seminggu + jam notifikasi
- Pesan notifikasi kustom per user
- Cek streak saat app dibuka → peringatan jika streak terancam putus

---

### FASE 19 — Export Laporan Progress ke PDF ✅

Laporan progress lengkap yang bisa dicetak atau disimpan sebagai PDF.

**`pages/report.html` + `report.js`:**
- Standalone tanpa sidebar → layout bersih untuk cetak
- Mencakup: profil, XP/level, semua modul JP/ZH/KR, badge, riwayat quiz
- `@media print` — optimasi layout untuk kertas A4
- `window.print()` → cetak atau simpan sebagai PDF via browser

---

### FASE 20 — PWA (Service Worker, Install, Offline) ✅

Progressive Web App lengkap.

**`sw.js` — Service Worker (cache-first):**
- Pre-cache semua asset saat install
- Update detection → tombol "Perbarui App"
- Offline fallback ke cache

**`manifest.json`:** ikon berbagai ukuran, shortcuts ke halaman utama

**`pwa.js` — PWA Manager:**
- `beforeinstallprompt` → tombol install kustom
- SW registration + update flow
- Offline banner saat koneksi terputus

**20.4** — Live clock di topbar dashboard (update tiap detik via `setInterval`)

---

### FASE 21 — Korea + Rebranding Lingora ✅ (2026-02-25)

Fase terbesar: rename proyek + 5 sub-fase penambahan modul Korea lengkap.

**21.1 — Rename & Rebranding (v2.0):**
- NihonHan → Lingora di semua 23 HTML, 43 JS, manifest, sw.js
- Tagline diupdate ke tiga bahasa

**21.2 — Data Korea (v2.1):**
- `hangul.js` — 14 konsonan + 21 vokal + 70 suku kata dasar Korea
- `kr-vocab.js` — 155 kata, 15 tema, level TOPIK I/II
- `kr-grammar.js` — 27 pola grammar, 5 kategori
- `kr-dialogs.js` — 6 dialog situasional TOPIK I

**21.3 — Modul Hangul (v2.2):**
- `pages/korean/hangul.html` — Tab Tabel/Flashcard/SRS
- `AudioEngine.speakKR()` — TTS ko-KR
- Sidebar 20 halaman: section 🇰🇷 Korea + Quiz Korea ditambahkan

**21.4 — Vocab & Grammar Korea (v2.3):**
- `pages/korean/vocabulary.html` — Jelajah + SRS + Kalimat Quiz
- `pages/korean/grammar.html` — Accordion + filter TOPIK I/II
- Badge TOPIK I/II di `korean.css`

**21.5 — Dialog & Quiz Korea (v2.4):**
- `pages/korean/dialog.html` — viewer A/B, playthrough TTS ko-KR
- `pages/korean/quiz.html` — mode pilih/ketik, modul Hangul & Vocab KR

**21.6 — Integrasi Penuh Korea (v2.6):**
- Dashboard: section Korea + 4 progress bar modul
- Stats: 4 modul KR + badge Hanŭl & Poliglot
- Settings: toggle romanisasi Hangul (Revised Romanization)
- Report PDF: 4 modul KR + badge baru
- BadgeSystem: `hangul_master` + `polyglot` (check logic berbasis progress)
- Challenge: 3 template task KR baru
- Manifest: shortcut Quiz Korea
- SW: `lingora-v4` → `lingora-v5`

---

### FASE 22 — Listening Mode (Audio Quiz) ✅ (2026-02-25)

Mode belajar via audio — karakter disembunyikan, user jawab berdasarkan pendengaran.

**Fitur:**
- Tombol 🎧 Listening di selector mode (JP/ZH/KR)
- Karakter soal diblur CSS → terungkap setelah menjawab
- Tombol 🔊 besar + animasi pulse → auto-play audio saat soal muncul
- User pilih arti dari 4 opsi
- Timer 25 detik (5 detik lebih panjang dari mode normal)
- Bonus XP +5 per soal benar di Listening mode
- Badge UI `listening_mode` di layar hasil

**File diupdate:** `quiz.css` (`.quiz-char-hidden`, `.listening-play-btn`, animasi `listenPulse`), `pages/japanese/quiz.html`, `pages/mandarin/quiz.html`, `pages/korean/quiz.html`, `assets/js/pages/quiz-jp.js`, `quiz-zh.js`, `quiz-kr.js`

Cache: `lingora-v3` → `lingora-v4`

---

### FASE 23 — Stroke Order Animasi Kana ✅ (2026-02-25)

Tab "✍️ Menulis" baru di Hiragana dan Katakana dengan animasi SVG step-by-step.

**File baru:**
- `assets/js/data/kana-strokes.js` — SVG path stroke order 46 hiragana dasar + 46 katakana dasar (92 karakter total)
- `assets/js/modules/kana-stroke-ui.js` — `KanaStrokeUI`: render panel animasi, grid karakter, kontrol

**Fitur:**
- Grid 46 karakter di panel kiri, klik → animasi di panel kanan
- Kontrol: ▶ Play / ⏸ Pause / ← Prev Stroke / → Next Stroke / 🔄 Reset
- Animasi per path via `strokeDashoffset` CSS transition
- Panah arah stroke di overlay SVG
- Lazy-init (hanya load saat tab Menulis diklik)

Cache: `lingora-v5` → `lingora-v6`

---

### FASE 24 — Vocabulary Builder (Kalimat Kontekstual) ✅ (2026-02-25)

Kalimat contoh kontekstual per kata kunci + tab quiz fill-in-the-blank.

**File baru:**
- `assets/js/modules/vocab-builder.js` — `VocabBuilder` module:
  - `renderSentences(vocab, lang)` — section expandable per vocab card
  - `buildQuizItems(vocabArray)` — ekstrak soal fill-in-the-blank
  - `startQuiz(container, vocabArray, lang, onDone)` — jalankan quiz

**Data ditambah** (field `sentences` di vocab):
- JP: 10 kata kunci (greetings + food + verbs), 2–3 kalimat per kata
- ZH: 7 kata kunci (greetings + food), 2–3 kalimat per kata
- KR: 5 kata kunci (greetings), 2–3 kalimat per kata

**Format field `sentences`:**
```javascript
sentences: [
  {
    original: '毎日ご飯を食べます。',
    romanization: 'Mainichi gohan wo tabemasu.',
    translation: 'Saya makan nasi setiap hari.',
    level: 'N5'
  }
]
```

**Fitur Kalimat Quiz (tab "🧩 Kalimat Quiz"):**
- Kalimat dengan satu kata dikosongkan `___`
- Hint: huruf pertama + terakhir kata
- 10 soal per sesi, feedback langsung, skor + XP

Cache: `lingora-v6` → `lingora-v7`

---

### FASE 25 — Onboarding & Placement Test ✅ (2026-02-25)

Wizard 5 langkah agar user baru tidak overwhelmed saat pertama buka app.

**Alur:**
1. Welcome screen (karakter dari tiga bahasa)
2. Pilih bahasa fokus: 🇯🇵 Jepang / 🇨🇳 Mandarin / 🇰🇷 Korea / Semua
3. Placement Test: 10 soal acak (bank 30 soal, mencakup 3 bahasa) → Pemula / Menengah
4. Hasil + 3 rekomendasi modul berdasarkan bahasa & level
5. Set target harian (5, 15, 30, atau 60 menit/hari)

**File baru:**
- `pages/onboarding.html` — wizard HTML multi-step
- `assets/js/pages/onboarding.js` — logika wizard + bank soal
- `assets/css/onboarding.css` — card, step dots, progress bar

**Integrasi:**
- `register.html` → redirect ke onboarding setelah daftar berhasil
- Dashboard: section "Profil Belajarmu" (prompt atau status)
- Sidebar: link "Profil Belajar" di 23 halaman
- Bonus +50 XP saat wizard selesai

Cache: `lingora-v7` → `lingora-v8`

---

### FASE 26 — Study Planner ✅ (2026-02-25)

Jadwal belajar otomatis berdasarkan target ujian bahasa.

**9 target ujian didukung:**
- Jepang: JLPT N5, N4, N3
- Mandarin: HSK 1, 2, 3, 4
- Korea: TOPIK I, TOPIK II

**Fitur:**
- Setup wizard: pilih ujian + tanggal ujian
- Auto-kalkulasi kuota item/hari berdasarkan sisa hari
- Daily To-Do: modul apa saja hari ini + direct link ke halaman modul
- Progress timeline chart 7 hari (progress nyata vs jadwal ideal)
- Countdown hari tersisa ke ujian
- Overall progress bar per modul
- Catch-up Mode: jadwal menyesuaikan jika ada hari terlewat

**File baru:** `pages/planner.html`, `assets/js/pages/planner.js`, `assets/js/modules/planner.js` (`StudyPlanner` engine), `assets/css/planner.css`

**Integrasi:** Dashboard section "📅 Target Planner Hari Ini", sidebar 24 halaman, manifest shortcut

Cache: `lingora-v8` → `lingora-v9`

---

### FASE 27 — Mini Game ✅ (2026-02-25)

3 game interaktif sebagai variasi belajar yang menyenangkan.

**Game 1 — Memory Match (`pages/games/memory.html`):**
- Grid kartu terbalik (8/12/18 pasang = 4×4 / 4×3 / 6×3)
- Cocokkan: karakter asli ↔ artinya dalam bahasa Indonesia
- Kategori: Hiragana / Katakana / Hangul / Kanji N5
- Animasi flip 3D CSS, shake on mismatch, glow on match
- Timer berjalan + skor combo

**Game 2 — Word Scramble (`pages/games/scramble.html`):**
- Huruf romanisasi diacak → tile klik untuk susun jawaban
- Klik tile di area jawaban → kembalikan ke bawah; Clear → reset semua
- 3 bahasa (JP/ZH/KR), 5/10/15 soal per sesi

**Game 3 — Falling Kana (`pages/games/falling-kana.html`):**
- Canvas API + `requestAnimationFrame` — karakter jatuh dari atas
- Ketik romanisasi + Enter untuk menembak karakter
- Leveling: speed bertambah tiap 10 jawaban benar
- Pilih nyawa (3/5/10) dan kategori kana
- Game over overlay + skor akhir

**File baru:** `pages/games.html`, 3 HTML game, `game-memory.js`, `game-scramble.js`, `game-falling.js`, `assets/css/games.css`

**Integrasi:** Dashboard quick-access, sidebar 24 halaman, manifest shortcut

Cache: `lingora-v9` → `lingora-v10`

---

### FASE 28 — Tema & Kustomisasi UI ✅ (2026-02-25)

5 tema warna + pilihan font dan sudut UI dengan preview real-time di settings.

**5 tema:**

| Tema | Warna Utama | Aksen | Karakter |
|------|-------------|-------|---------|
| 🌸 Sakura *(default)* | #C0392B | #D4AF37 | Tradisional Jepang |
| 🍃 Zen | #4A7C59 | Sage muted | Minimalis |
| 🌆 Neon Seoul | #7C3AED | #06B6D4 | Futuristik K-Pop |
| 🎋 Bamboo | #2D6A4F | #D4A017 | Alam Asia Timur |
| 🌙 Midnight | #0A0A0F | #FF6B35 | Dark mode kuat |

**Pilihan font:** DM Sans (default) / Nunito (bulat) / Playfair Display (serif) / Monospace

**Pilihan radius:** Tajam / Default / Bulat

**Implementasi teknis:**
- `[data-color-theme]` di `<html>` → CSS variables otomatis mengikuti via `themes.css`
- `[data-font]` dan `[data-radius]` attribute → override variable global
- Anti-FOUC: semua 30+ halaman HTML punya inline script 4-property di `<head>`
- Tema Midnight otomatis toggle dark mode
- Per-user storage: `nh_user_{id}_customization`

**File baru:** `assets/css/themes.css`, `assets/js/modules/theme.js`

**Diupdate:** `settings.html` (section baru), `settings.js`, `app.js` (loadTheme diperluas), 30 halaman HTML

Cache: `lingora-v10` → `lingora-v11`

---

### FASE 29 — Backup & Restore Progress ✅ (2026-02-25)

Perlindungan data user: export/import JSON + auto-snapshot lokal.

**`assets/js/modules/backup.js` — BackupSystem:**

| Method | Fungsi |
|--------|--------|
| `exportData(userId)` | Kumpulkan semua data user ke satu object terstruktur |
| `downloadBackup(userId)` | Generate + trigger download `lingora-backup-YYYY-MM-DD.json` |
| `validate(backupObj)` | Cek format: `appName`, `version`, integritas data |
| `importData(userId, backupObj)` | Timpa data user aktif dengan data backup |
| `readFile(file)` | Parse file JSON dari file input (Promise) |
| `autoBackup(userId)` | Buat snapshot lokal jika sudah 7+ hari (max 3 tersimpan) |
| `getAutoBackups(userId)` | Ambil list snapshot + metadata |
| `restoreAutoBackup(userId, idx)` | Restore dari snapshot indeks tertentu |
| `formatDate(ts)` | Format timestamp ke tanggal Indonesia |

**Isi file backup (JSON):**
- Profil user
- Progress semua modul (SRS 11 modul, XP, badge, activity log, streak)
- Challenge state, settings, onboarding, planner, customization

**Fitur UI di Settings:**
- Tombol "📥 Download Backup" → unduh file JSON
- Area drag-and-drop atau klik untuk pilih file backup
- Validasi otomatis → konfirmasi modal sebelum restore
- Status bar: info backup & restore terakhir (tanggal format ID)
- Auto-backup list: tampil 3 snapshot + tombol Restore/Download per snapshot

**File diupdate:** `settings.html` (versi → 3.3), `settings.js`, `settings.css`, `sw.js`

Cache: `lingora-v11` → `lingora-v12`

---

## 9. Bug Fix yang Sudah Diperbaiki

> ⚠️ Sesi berikutnya difokuskan untuk bug fixing menyeluruh. Daftar ini akan diperbarui seiring bug ditemukan dan diperbaiki.

| ID | Lokasi | Deskripsi | Fase Fix | Status |
|----|--------|-----------|----------|--------|
| BF-001 | Quiz JP | Opsi pilihan ganda bisa duplikat jika pool data kecil | Fase 8.2 | ✅ Selesai |
| BF-002 | Quiz JP | Timer tidak reset saat pindah ke soal berikutnya | Fase 8.2 | ✅ Selesai |
| BF-003 | Kanji | Duplikat kanji antar level N5–N1 | Fase 8.3.1 | ✅ Selesai |
| BF-004 | SRS | Interval tidak terupdate saat quality=0 (Again) | Fase 11 | ✅ Selesai |
| BF-005 | Audio | Voice tidak ditemukan di beberapa browser/OS | Fase 9.2 | ✅ Fallback ditambah |
| BF-006 | Dark mode | Flash putih (FOUC) saat halaman pertama load | Fase 10 | ✅ Anti-FOUC inline script |
| BF-007 | Path | File tidak ditemukan di GitHub Pages (path relatif salah) | Fase 20 | ✅ `getBase()` universal |
| BF-008 | Service Worker | App versi lama masih terserve setelah update | Fase 20 | ✅ Update detection flow |
| BF-009 | Sidebar — semua halaman | HTML korup: teks sisa `#127919;</span>Profil Belajar</a>` menempel setelah link Study Planner di 15+ halaman | Fase 29.1 | ✅ Selesai |
| BF-010 | Sidebar — stats, settings, profile, change-password | Menu Quiz Korea (🇰🇷) tidak muncul di section Latihan | Fase 29.1 | ✅ Selesai |
| BF-011 | Sidebar — dashboard | Link ganda `Profil Belajar` dan `Study Planner` muncul di dalam area `bottom-nav` (mobile) | Fase 29.1 | ✅ Selesai |
| BF-012 | Sidebar — quiz-jp, quiz-zh, profile | Link ganda `nav-item` onboarding + planner di dalam `bottom-nav` | Fase 29.1 | ✅ Selesai |
| BF-014 | Settings — halaman settings | Element `.backup-status-bar` dan `.auto-backup-list` di dalam `settings-card` tidak punya padding horizontal sehingga teks nempel ke tepi kiri kartu | Fase 29.2 | ✅ Selesai |
| BF-015 | Settings — halaman settings | Section "Snapshot Otomatis" menggunakan `.settings-row-info` langsung di dalam card tanpa padding — teks nempel ke kiri | Fase 29.2 | ✅ Selesai |
| BF-016 | Settings — halaman settings | Beberapa section title menggunakan HTML entity icon yang kecil/tidak terlihat jelas (`★`, `⚠`, `ℹ`) — diganti emoji yang lebih jelas | Fase 29.2 | ✅ Selesai |
| BF-018 | Kosakata KR & Grammar KR | `vocabulary.html` dan `grammar.html` Korea tidak meng-include `japanese.css` dan `kanji.css` — menyebabkan `.vocab-grid`, `.vocab-card`, `.theme-tab`, `.grammar-card`, `.vocab-toolbar`, `.grid-count`, dll tidak punya styling sehingga tampilan berantakan | Fase 29.3 | ✅ Selesai — ditambah `japanese.css` + `kanji.css` ke kedua halaman KR |
| BF-019 | Settings — halaman settings | `.theme-picker-section` (Tema Warna & Gaya Font) tidak punya padding sehingga konten nempel ke tepi kiri/kanan card. `.customization-live-preview` hanya punya `margin-top: 8px` tanpa margin kiri/kanan sehingga melebar penuh ke tepi card. `.settings-divider` menggunakan `margin: 0 20px` sehingga tidak konsisten dengan elemen lain. `.backup-status-bar` tidak punya margin atas sehingga nempel ke atas card. | Fase 29.4 | ✅ Selesai — padding konsisten 20px di semua elemen theme/font section, preview margin diperbaiki, divider full-width, backup status bar punya top margin |
| ENH-001 | Hangul — Tab Tabel | Tabel suku kata dasar monoton, scrollable panjang, tidak interaktif — diganti dengan **matriks interaktif konsonan × vokal** yang dapat di-hover untuk highlight baris/kolom, klik per sel untuk audio + detail, serta bagian batchim terpisah dalam grid kartu | Fase 29.3 | ✅ Selesai |

### Area yang Perlu Diperiksa di Sesi Bug Fixing

1. **Listening Mode (Fase 22)** — Autoplay audio bisa diblokir di Safari/iOS (policy ketat)
2. **Stroke Order Kana (Fase 23)** — Animasi SVG di browser lama (Edge legacy, Firefox <70)
3. **Kalimat Quiz (Fase 24)** — Normalisasi input: aksara CJK vs romanisasi, case sensitivity
4. **Onboarding redirect (Fase 25)** — Flow jika user sudah onboarding tapi `localStorage` clear
5. **Study Planner (Fase 26)** — Kalkulasi jadwal jika tanggal ujian sudah lewat atau hari ini
6. **Falling Kana Canvas (Fase 27)** — Performance throttle di device lemah / layar kecil
7. **Anti-FOUC tema (Fase 28)** — Verifikasi semua 30+ halaman punya 4-property inline script
8. **Backup Import (Fase 29)** — Validasi backward compatibility dari versi app sebelumnya (v3.0, v3.1, v3.2)
9. **SRS modul Korea** — Pastikan `srs_{moduleId}` tidak tumpang tindih antar modul KR yang ditambah belakangan
10. **Challenge KR (Fase 21.6)** — Verifikasi trigger `onLearnItem` + `onModuleVisit` di halaman KR berjalan benar
11. **Badge Polyglot** — Pastikan logic `check()` membaca progress dari 3 bahasa dengan benar
12. **Service Worker Cache** — Verifikasi `lingora-v12` mencakup semua file yang ditambah di Fase 27–29

---

## 10. Roadmap — Fase Selanjutnya (Di-hold)

> ⏸️ **Semua fase berikut di-hold sampai sesi bug fixing selesai.**

### FASE 30 — Konten Lanjutan JP: Kosakata & Grammar N3

**Tujuan:** Buka konten intermediate untuk pelajar JP yang sudah kuasai N5/N4.

**Target konten:**
- `assets/js/data/jp-vocab-n3.js` — 300+ kata N3, 15 tema (berita, emosi, masyarakat, teknologi)
- `assets/js/data/jp-grammar-n3.js` — 30+ pola N3 (〜ば、〜ようだ、〜らしい、〜ことにする、〜てしまう)

**File yang diupdate:**
- `pages/japanese/vocabulary.html` — filter tambah N3
- `pages/japanese/grammar.html` — filter tambah N3
- `pages/dashboard.html` — progress card N3

---

### FASE 31 — Konten Lanjutan ZH: Hanzi & Kosakata HSK 4

**Tujuan:** Buka konten intermediate untuk pelajar ZH yang sudah kuasai HSK 1–3.

**Target konten:**
- `assets/js/data/hanzi-hsk4.js` — 300 karakter HSK 4
- `assets/js/data/zh-vocab-hsk4.js` — 300+ kata kosakata HSK 4

---

### FASE 32 — Leaderboard Lokal & Tantangan Teman

**Tujuan:** Persaingan antar user di device yang sama (cocok untuk HP keluarga atau lab sekolah).

**Fitur:**
- Leaderboard: peringkat semua user di device (XP, streak, badge, 3 bahasa)
- Perbandingan progress: side-by-side chart dua user
- Challenge Teman: user A tantang user B dengan target spesifik

*Data multi-user sudah ada di localStorage sejak Fase 1 — hanya butuh halaman visualisasi baru.*

---

### Ide Jangka Panjang

| Kode | Fitur | Keterangan |
|------|-------|------------|
| B1 | TTS Custom Voice | Google TTS / OpenAI TTS lebih natural dari Web Speech API |
| B2 | OCR: Scan & Terjemah | Foto teks JP/ZH/KR → kenali karakter via Tesseract.js (offline) |
| B3 | Kamus Inline | Tap kata di dialog/teks → popup arti langsung |
| B4 | Konten Korea TOPIK II | Kosakata + grammar tingkat lanjut Korea |
| B5 | Multi-Platform Sync | Backend + sync antar device (keluar dari prinsip offline-first) |

---

## 11. Panduan untuk Claude Selanjutnya

### Konteks Penting

Kamu sedang melanjutkan pengembangan **Lingora** — aplikasi belajar bahasa Asia Timur yang berjalan **100% di browser tanpa server**. App sudah selesai Fase 29 (dari 29 fase) dengan tiga bahasa lengkap (JP + ZH + KR).

**Fokus saat ini: Bug Fixing.** Tidak ada penambahan fitur atau fase baru sampai bug fixing selesai. Prioritas adalah memastikan semua fitur yang sudah ada berjalan benar di berbagai browser dan kondisi edge case.

### Stack Teknologi

Vanilla HTML + CSS + JavaScript ES6+. **Tidak ada** framework, build tool, atau npm. Semua berjalan dengan buka `index.html` di browser. Tidak ada `package.json`, tidak ada node_modules.

### Sebelum Mulai Bug Fixing

1. **Baca README ini dulu** secara keseluruhan — pahami apa yang sudah ada
2. **Baca file yang akan diperbaiki** sebelum mengubahnya — jangan asumsikan isinya
3. **Test di Chrome** (dukungan Web Speech API paling lengkap) dan **Firefox**
4. **Test di GitHub Pages juga** — bug path sering tidak terlihat di file://

### Aturan Wajib

- ✅ **WAJIB** gunakan `Storage.getUser()` / `Storage.setUser()` — **JANGAN** `localStorage` langsung
- ✅ Gunakan `Progress.markLearned()` / `Progress.getLearned()` untuk tracking hafalan
- ✅ Gunakan `getBase()` untuk semua path relatif — jangan hardcode `/lingora/` atau `./`
- ✅ Ikuti pola `App.init('page-id')` dan `Router.guard()` di setiap halaman
- ✅ Tambahkan `ChallengeSystem.onLearnItem()` / `onModuleVisit()` di modul dengan aktivitas belajar
- ✅ Tambahkan `XPSystem.addXP()` di modul yang relevan

### Anti-Pattern yang Harus Dihindari

- ❌ Jangan gunakan `localStorage` langsung — selalu pakai `Storage.getUser()`
- ❌ Jangan hardcode path — selalu gunakan `getBase()` untuk path relatif
- ❌ Jangan gabungkan data konten besar ke 1 file — pisah per level/modul
- ❌ Jangan lupa update sidebar di SEMUA halaman saat ada link/halaman baru
- ❌ Jangan lupa bump cache di `sw.js` dan tambahkan file baru ke `ASSETS_TO_CACHE`
- ❌ Jangan hardcode nama "NihonHan" — gunakan "Lingora"

### Anti-FOUC Script Wajib (4 property)

Setiap halaman authenticated **wajib** punya script ini di `<head>` sebelum CSS:

```html
<script>
  (function() {
    const dm = localStorage.getItem('nh_dark_mode');
    if (dm === 'true') document.documentElement.setAttribute('data-theme', 'dark');
    const ct = localStorage.getItem('nh_color_theme');
    if (ct) document.documentElement.setAttribute('data-color-theme', ct);
    const fn = localStorage.getItem('nh_font');
    if (fn) document.documentElement.setAttribute('data-font', fn);
    const rd = localStorage.getItem('nh_radius');
    if (rd) document.documentElement.setAttribute('data-radius', rd);
  })();
</script>
```

### Naming Convention

```
Halaman HTML    → pages/{bahasa}/{nama-modul}.html
Script halaman  → assets/js/pages/{nama-halaman}.js
Data konten     → assets/js/data/{prefix}-{keterangan}.js
Modul reusable  → assets/js/modules/{nama-modul}.js
CSS per fitur   → assets/css/{nama-fitur}.css
```

**Prefix bahasa:**
- Jepang: `jp-` (vocab, grammar, dialog) atau tanpa prefix (hiragana, katakana, kanji)
- Mandarin: `zh-` (vocab, dialog) atau tanpa prefix (pinyin, hanzi)
- Korea: `kr-` (vocab, grammar, dialog) atau tanpa prefix (hangul)

### Checklist Halaman Baru (untuk fase mendatang)

- [ ] Anti-FOUC 4-property di `<head>`
- [ ] `<link rel="manifest" href="...manifest.json">`
- [ ] Meta PWA (`apple-mobile-web-app-capable`, `theme-color`, dll)
- [ ] Script `pwa.js` sebelum `</body>`
- [ ] Tombol `.theme-toggle-btn` di topbar
- [ ] `Router.guard()` + `App.init('nama-halaman')`
- [ ] Link halaman di sidebar **semua** halaman lain
- [ ] Script `challenge.js` jika ada aktivitas belajar
- [ ] Script `xp.js` jika ada aktivitas yang memberi XP
- [ ] Tambah file ke `ASSETS_TO_CACHE` di `sw.js` + bump versi cache

### Setelah Setiap Bug Fix / Fase Selesai

1. Update section **Bug Fix** di README (tambah baris baru di tabel)
2. Update **Log Pengerjaan** di bagian bawah README
3. Update **Struktur Folder** jika ada file baru/dihapus
4. Update **localStorage Key Reference** jika ada key baru
5. Buat zip baru: `lingora_bugfix_{N}.zip` atau `lingora_fase{N}.zip`

---

## 12. Log Pengerjaan & Versi

| Versi / Fase | Tanggal | Yang Dikerjakan | Status |
|---|---|---|---|
| **v1.0 — Fase 1** | — | Fondasi & Autentikasi: storage, auth, router, app, login, register | ✅ |
| **v1.1 — Fase 2** | — | Transisi halaman fade-in, 404 custom, perbaikan redirect | ✅ |
| **v1.2 — Fase 3** | — | Hiragana & Katakana: grid, flashcard 3D flip, SRS, favorit, audio | ✅ |
| **v1.3 — Fase 4** | — | Kanji 278 karakter N5–N1: grid, modal, SRS, stroke order SVG | ✅ |
| **v1.4 — Fase 5** | — | Mandarin: Pinyin (59 unit), Nada (5 nada SVG), Hanzi (208), Vocab ZH (120+) | ✅ |
| **v1.5 — Fase 6** | — | Quiz multi-modul pilihan ganda + BadgeSystem dasar | ✅ |
| **v1.6 — Fase 7** | — | Settings, profil user (avatar 10 opsi, bio), stats awal | ✅ |
| **v1.7 — Fase 8** | — | Vocab JP (225 kata, 15 tema), Grammar JP (35 pola, N5–N4) | ✅ |
| **v1.7.1 — Fase 8.1** | — | Redesign login/register dua kolom dengan hero image | ✅ |
| **v1.7.2 — Fase 8.2** | — | Bug fix: duplikat opsi quiz, timer tidak reset antar soal | ✅ |
| **v1.7.3 — Fase 8.3** | — | Kanji N2 + N1 (total 278), hapus duplikat, validasi data | ✅ |
| **v1.7.5 — Fase 8.4** | — | Enhance profil: bio, detail stats, avatar picker, edit inline | ✅ |
| **v1.8 — Fase 9** | — | AudioEngine Web Speech API JP + ZH di semua modul | ✅ |
| **v1.8.1 — Fase 9.2** | — | Pelengkap audio Mandarin: nada + dialog ZH | ✅ |
| **v1.9 — Fase 10** | — | Dark mode + anti-FOUC inline script di semua halaman | ✅ |
| **v1.10 — Fase 11** | — | SRS Engine SM-2, SRS UI renderer reusable, tab SRS semua modul | ✅ |
| **v1.11 — Fase 12** | — | Sistem favorit/bookmark: tombol ❤️, filter, stats favorit | ✅ |
| **v1.12 — Fase 13** | — | Mode quiz Ketik Jawaban: normalisasi input, romanisasi diterima | ✅ |
| **v1.13 — Fase 14** | — | XPSystem: addXP, level calc, XP bar dashboard, riwayat XP | ✅ |
| **v1.14 — Fase 15** | — | ChallengeSystem: seed tanggal, 30+ template task JP/ZH | ✅ |
| **v1.15 — Fase 17** | — | Dialog JP (8) + ZH (7): viewer A/B, playthrough TTS, vocab chip | ✅ |
| **v1.16 — Fase 18** | — | ReminderSystem: browser notification, jadwal kustom hari + jam | ✅ |
| **v1.17 — Fase 19** | — | Laporan PDF: report.html standalone, semua modul, @media print | ✅ |
| **v1.18 — Fase 20** | — | PWA: Service Worker cache-first, manifest, install prompt, offline | ✅ |
| **v1.19 — Fase 20.4** | — | Live clock topbar dashboard, update tiap detik | ✅ |
| **v2.0 — Fase 21.1** | 2026-02-25 | Rename NihonHan → Lingora: 23 HTML, 43 JS, manifest v3, SW lingora-v3 | ✅ |
| **v2.1 — Fase 21.2** | 2026-02-25 | Data Korea: hangul.js (35 jamo+suku kata), kr-vocab.js (155), kr-grammar.js (27), kr-dialogs.js (6) | ✅ |
| **v2.2 — Fase 21.3** | 2026-02-25 | Modul Hangul: 3 tab, audio ko-KR, sidebar 20 halaman diupdate | ✅ |
| **v2.3 — Fase 21.4** | 2026-02-25 | Vocab KR + Grammar KR: halaman, page JS, CSS badge TOPIK I/II | ✅ |
| **v2.4 — Fase 21.5** | 2026-02-25 | Dialog KR + Quiz KR: viewer TTS ko-KR, mode pilih/ketik | ✅ |
| **v2.5 — Fase 22** | 2026-02-25 | Listening Mode 3 quiz (JP/ZH/KR): blur char, auto-play TTS, +5 XP bonus, SW v4 | ✅ |
| **v2.6 — Fase 21.6** | 2026-02-25 | Integrasi penuh Korea: dashboard, stats, settings, report, badge (Hanŭl+Poliglot), challenge KR, SW v5 | ✅ |
| **v2.7 — Fase 23** | 2026-02-25 | Stroke order animasi kana: kana-strokes.js (92 path SVG), kana-stroke-ui.js, tab Menulis, SW v6 | ✅ |
| **v2.8 — Fase 24** | 2026-02-25 | Vocabulary Builder: vocab-builder.js, kalimat kontekstual JP/ZH/KR, tab Kalimat Quiz, SW v7 | ✅ |
| **v2.9 — Fase 25** | 2026-02-25 | Onboarding wizard 5 langkah: placement test 30 soal, rekomendasi modul, target harian, SW v8 | ✅ |
| **v3.0 — Fase 26** | 2026-02-25 | Study Planner: 9 ujian, kalkulasi kuota/hari, catch-up mode, timeline 7 hari, SW v9 | ✅ |
| **v3.1 — Fase 27** | 2026-02-25 | Mini Game 3x: Memory Match (flip 3D), Word Scramble (tile), Falling Kana (Canvas), SW v10 | ✅ |
| **v3.2 — Fase 28** | 2026-02-25 | Tema & Kustomisasi: 5 tema+4 font+3 radius, themes.css, theme.js, anti-FOUC 30 halaman, SW v11 | ✅ |
| **v3.3 — Fase 29** | 2026-02-25 | Backup & Restore: BackupSystem export/import JSON, auto-snapshot 3x, drag-drop UI, SW v12 | ✅ |
| **v3.3.3 — Fase 29.3** | 2026-02-26 | 🐛 Bug Fix Korea UI + Enhancement Hangul: (1) Tambah `japanese.css` + `kanji.css` ke `vocabulary.html` & `grammar.html` Korea — perbaiki layout berantakan (vocab-grid, vocab-card, grammar-card, theme-tabs, toolbar, dll tidak ter-style). (2) Tambah `data-lang="kr"` ke semua halaman Korea + override warna biru di korean.css. (3) Ganti tabel suku kata hangul dengan **matriks interaktif** konsonan × vokal: hover highlight, klik per sel untuk audio+detail, batchim jadi grid kartu terpisah. Cache: `lingora-v12` → `lingora-v13` | ✅ |
| **v3.3.2 — Fase 29.2** | 2026-02-26 | 🐛 Bug Fix Settings & Tema Global: padding/margin teks nempel kiri di settings (backup-status-bar, auto-backup-list, snapshot otomatis), icon section title diperbaiki, `themes.css` ditambahkan ke semua 32 halaman agar tema berlaku global | ✅ |
| **v3.3.1 — Fase 29.1** | 2026-02-26 | 🐛 Bug Fix Sidebar: HTML korup di 15+ halaman, Quiz Korea hilang di 4 halaman, link duplikat di bottom-nav (dashboard/quiz-jp/quiz-zh/profile), update template sidebar.html | ✅ |
| **v3.3.4 — Fase 29.4** | 2026-02-26 | 🐛 Bug Fix Settings UI — Rapikan tata letak halaman pengaturan: (1) `.theme-picker-section` ditambah `padding: 16px 20px` agar konten Tema Warna & Gaya Font tidak nempel ke tepi card. (2) `.customization-live-preview` diubah dari `margin-top: 8px` ke `margin: 16px 20px` agar preview tema punya jarak konsisten dari tepi card. (3) `.settings-divider` diubah dari `margin: 0 20px` ke `margin: 0` (full-width) agar pemisah antar section konsisten dan rapi. (4) `.backup-status-bar` diubah dari `margin: 0 20px 16px` ke `margin: 16px 20px` agar ada jarak atas di dalam card. | ✅ |
| **Bug Fixing** | TBD | 🐛 Review menyeluruh berlanjut — tidak ada fase baru untuk sementara | 🔄 In Progress |

---

> **Fase saat ini:** Fase 29 ✅ SELESAI → **Bug Fixing** 🐛 (fokus berikutnya)
>
> *Lingora — 日本語も、中文も、한국어도. Belajar itu indah, satu karakter dalam satu waktu.*
>
> *Dokumen ini adalah sumber kebenaran tunggal untuk proyek Lingora — mencakup arsitektur, semua 29 fase, localStorage reference, checklist, dan panduan pengembangan. Perbarui dokumen ini setiap selesai bug fix atau fase baru.*
