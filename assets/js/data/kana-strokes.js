/**
 * Lingora - Kana Stroke Order Data (Fase 23)
 * Data urutan coretan (stroke order) untuk Hiragana dan Katakana.
 *
 * Format per karakter:
 * {
 *   char: 'あ',
 *   strokes: [
 *     { d: 'SVG path', tip: 'Deskripsi coretan ini' },
 *     ...
 *   ],
 *   tips: 'Tips umum menulis karakter ini'
 * }
 *
 * ViewBox SVG: 0 0 100 100
 * Stroke direction ditandai dengan panah (arrowhead marker) di akhir path.
 * Setiap stroke dianimasikan satu per satu dari kiri ke kanan, atas ke bawah.
 */

const KanaStrokes = (() => {

  // ─── HIRAGANA ───────────────────────────────────────────────────────────────
  const hiragana = {
    'あ': {
      strokes: [
        { d: 'M 30,22 Q 55,18 65,22', tip: 'Garis horizontal atas' },
        { d: 'M 50,15 L 50,85', tip: 'Garis vertikal turun' },
        { d: 'M 20,55 Q 45,48 60,55 Q 80,68 70,82 Q 58,95 35,88 Q 18,78 22,65 Z', tip: 'Lingkaran besar (kurva melingkar)' }
      ],
      tips: 'Mulai dari coretan horizontal, lalu vertikal, lalu lingkaran besar searah jarum jam.'
    },
    'い': {
      strokes: [
        { d: 'M 30,20 Q 28,50 25,75 Q 22,88 32,90', tip: 'Garis kiri melengkung ke bawah' },
        { d: 'M 65,20 Q 60,50 55,75 Q 50,90 42,88', tip: 'Garis kanan melengkung ke bawah' }
      ],
      tips: 'Dua garis melengkung. Mulai dari atas, lengkung ke bawah-kiri.'
    },
    'う': {
      strokes: [
        { d: 'M 40,15 Q 60,12 65,18', tip: 'Garis pendek horizontal atas' },
        { d: 'M 50,22 Q 48,40 55,55 Q 65,70 55,82 Q 42,90 28,80 Q 18,68 30,55 Q 38,42 60,40', tip: 'Kurva besar melingkar' }
      ],
      tips: 'Mulai coretan pendek di atas, lalu kurva besar yang hampir menutup.'
    },
    'え': {
      strokes: [
        { d: 'M 25,30 Q 50,25 75,30', tip: 'Garis horizontal atas' },
        { d: 'M 50,15 Q 45,45 40,60 Q 30,78 18,82', tip: 'Garis vertikal kiri (miring)' },
        { d: 'M 55,45 Q 70,55 72,70 Q 68,85 55,88 Q 40,90 35,78', tip: 'Kurva kanan melingkar' }
      ],
      tips: 'Garis horizontal, lalu dua garis melengkung ke bawah.'
    },
    'お': {
      strokes: [
        { d: 'M 25,30 Q 55,25 70,30', tip: 'Garis horizontal atas' },
        { d: 'M 42,15 L 42,85', tip: 'Garis vertikal' },
        { d: 'M 58,40 Q 80,52 75,68 Q 65,85 48,82 Q 30,78 28,62 Q 28,48 50,45', tip: 'Lingkaran kanan' }
      ],
      tips: 'Horizontal atas, garis tegak, lalu lingkaran di kanan.'
    },

    'か': {
      strokes: [
        { d: 'M 25,30 Q 55,25 72,28', tip: 'Garis horizontal atas' },
        { d: 'M 45,15 Q 42,45 35,68 Q 28,82 20,88', tip: 'Garis vertikal miring kiri' },
        { d: 'M 55,45 Q 75,60 72,80 Q 65,92 50,88', tip: 'Kurva kanan melengkung' }
      ],
      tips: 'Horizontal, lalu dua garis ke bawah: kiri lurus, kanan melengkung.'
    },
    'き': {
      strokes: [
        { d: 'M 25,28 Q 55,22 75,28', tip: 'Garis horizontal 1' },
        { d: 'M 25,48 Q 55,42 72,48', tip: 'Garis horizontal 2' },
        { d: 'M 45,15 Q 42,40 38,60 Q 32,78 25,85', tip: 'Garis vertikal miring kiri' },
        { d: 'M 58,52 Q 78,65 75,80 Q 65,93 48,88', tip: 'Kurva kanan' }
      ],
      tips: 'Dua garis horizontal, lalu dua garis vertikal.'
    },
    'く': {
      strokes: [
        { d: 'M 68,18 Q 38,40 30,55 Q 30,70 55,80', tip: 'Garis tunggal berbentuk V miring' }
      ],
      tips: 'Satu coretan dari kanan atas, melengkung ke kiri bawah, lalu kanan bawah.'
    },
    'け': {
      strokes: [
        { d: 'M 30,15 L 30,85', tip: 'Garis vertikal kiri' },
        { d: 'M 28,35 Q 55,28 72,32', tip: 'Garis horizontal' },
        { d: 'M 58,32 Q 62,55 58,72 Q 52,85 40,88', tip: 'Kurva kanan' }
      ],
      tips: 'Garis tegak kiri, horizontal, lalu kurva kanan.'
    },
    'こ': {
      strokes: [
        { d: 'M 22,30 Q 55,22 72,28', tip: 'Garis horizontal atas' },
        { d: 'M 22,72 Q 55,65 72,70', tip: 'Garis horizontal bawah' }
      ],
      tips: 'Dua garis horizontal (atas dan bawah).'
    },

    'さ': {
      strokes: [
        { d: 'M 22,32 Q 55,25 72,30', tip: 'Garis horizontal atas' },
        { d: 'M 48,15 Q 45,48 38,65 Q 28,78 20,82', tip: 'Garis vertikal miring' },
        { d: 'M 52,52 Q 75,62 72,78 Q 62,90 45,86', tip: 'Kurva kanan' }
      ],
      tips: 'Horizontal, lalu dua garis ke bawah.'
    },
    'し': {
      strokes: [
        { d: 'M 45,15 Q 42,55 45,72 Q 50,85 65,82', tip: 'Garis melengkung — dari atas ke kanan bawah' }
      ],
      tips: 'Satu coretan. Turun dari atas, lalu lengkung ke kanan di bawah.'
    },
    'す': {
      strokes: [
        { d: 'M 22,30 Q 55,22 70,28', tip: 'Garis horizontal' },
        { d: 'M 48,15 Q 50,38 55,50 Q 72,65 65,80 Q 55,92 40,85 Q 25,75 28,60', tip: 'Kurva melingkar besar' }
      ],
      tips: 'Garis horizontal atas, lalu spiral/lingkaran besar.'
    },
    'せ': {
      strokes: [
        { d: 'M 30,25 L 30,75', tip: 'Garis vertikal kiri' },
        { d: 'M 22,50 Q 50,42 70,48', tip: 'Garis horizontal tengah' },
        { d: 'M 55,25 Q 62,48 58,68 Q 52,82 38,82', tip: 'Garis vertikal kanan melengkung' }
      ],
      tips: 'Vertikal kiri, horizontal tengah, lalu vertikal kanan.'
    },
    'そ': {
      strokes: [
        { d: 'M 25,25 Q 55,18 70,22 Q 65,35 48,38', tip: 'Lengkung atas kiri' },
        { d: 'M 55,38 Q 75,52 70,68 Q 60,85 42,82 Q 25,75 28,60', tip: 'Kurva bawah melingkar' }
      ],
      tips: 'Dua coretan melengkung yang menyambung membentuk S.'
    },

    'た': {
      strokes: [
        { d: 'M 22,32 Q 55,25 70,30', tip: 'Garis horizontal atas' },
        { d: 'M 44,15 Q 42,42 36,62 Q 28,78 20,84', tip: 'Garis vertikal kiri' },
        { d: 'M 55,38 Q 72,52 70,68 Q 62,82 48,82', tip: 'Kurva kanan atas' },
        { d: 'M 62,60 Q 78,70 75,82 Q 65,92 52,88', tip: 'Lengkung kanan bawah' }
      ],
      tips: 'Horizontal, lalu tiga garis ke bawah.'
    },
    'ち': {
      strokes: [
        { d: 'M 25,30 Q 55,22 70,28', tip: 'Garis horizontal' },
        { d: 'M 50,15 Q 55,40 62,55 Q 72,68 65,82 Q 52,93 35,85 Q 20,75 25,60', tip: 'Lengkung melingkar' }
      ],
      tips: 'Horizontal atas, lalu lingkaran besar ke kiri.'
    },
    'つ': {
      strokes: [
        { d: 'M 20,25 Q 55,18 75,35 Q 82,55 72,72 Q 60,88 40,85 Q 22,80 22,65', tip: 'Satu kurva melingkar besar' }
      ],
      tips: 'Satu coretan dari kiri atas, melengkung ke kanan, lalu melingkar ke bawah-kiri.'
    },
    'て': {
      strokes: [
        { d: 'M 20,38 Q 55,28 75,32', tip: 'Garis horizontal atas' },
        { d: 'M 50,32 Q 55,55 50,70 Q 42,85 28,82', tip: 'Garis vertikal melengkung' }
      ],
      tips: 'Garis horizontal, lalu coretan turun yang melengkung ke kiri.'
    },
    'と': {
      strokes: [
        { d: 'M 40,18 Q 38,45 32,68 Q 25,82 20,86', tip: 'Garis vertikal kiri' },
        { d: 'M 42,45 Q 62,38 72,48 Q 82,62 68,75 Q 55,85 40,78', tip: 'Kurva kanan melingkar' }
      ],
      tips: 'Garis lurus kiri, lalu kurva melingkar ke kanan.'
    },

    'な': {
      strokes: [
        { d: 'M 25,35 Q 55,28 68,32', tip: 'Garis horizontal' },
        { d: 'M 45,18 Q 42,45 38,65 Q 30,80 20,85', tip: 'Garis vertikal kiri' },
        { d: 'M 55,35 Q 65,48 60,62 Q 52,78 38,78', tip: 'Kurva tengah' },
        { d: 'M 65,55 Q 82,65 78,80 Q 68,92 55,88', tip: 'Kurva kanan bawah' }
      ],
      tips: 'Empat coretan: horizontal, vertikal, dan dua kurva.'
    },
    'に': {
      strokes: [
        { d: 'M 30,20 L 30,82', tip: 'Garis vertikal kiri' },
        { d: 'M 28,52 Q 55,45 68,50', tip: 'Garis horizontal' },
        { d: 'M 65,30 Q 68,55 65,75 Q 58,88 45,88', tip: 'Garis vertikal kanan melengkung' }
      ],
      tips: 'Vertikal kiri, horizontal, lalu vertikal kanan.'
    },
    'ぬ': {
      strokes: [
        { d: 'M 28,20 Q 25,50 22,72 Q 20,85 30,88', tip: 'Garis kiri' },
        { d: 'M 55,18 Q 62,35 68,55 Q 72,72 60,82 Q 45,90 30,82 Q 18,72 22,58 Q 28,42 50,38 Q 72,35 80,48', tip: 'Kurva besar melingkar dengan ekor' }
      ],
      tips: 'Garis kiri, lalu lingkaran besar dengan loop di bawah.'
    },
    'ね': {
      strokes: [
        { d: 'M 30,20 Q 28,52 25,72 Q 22,85 32,88', tip: 'Garis vertikal kiri' },
        { d: 'M 52,18 Q 58,35 65,55 Q 70,72 58,82 Q 44,90 30,82 Q 18,72 22,58 Q 28,42 52,38 Q 72,38 78,52', tip: 'Kurva melingkar dengan ekor' }
      ],
      tips: 'Garis kiri, lalu lingkaran dengan coretan ekor.'
    },
    'の': {
      strokes: [
        { d: 'M 65,20 Q 78,35 78,52 Q 75,72 55,82 Q 35,90 20,78 Q 10,65 18,48 Q 28,28 55,22 Q 72,20 78,35', tip: 'Satu oval/lingkaran penuh' }
      ],
      tips: 'Satu coretan oval. Mulai dari kanan atas, lingkaran berlawanan jarum jam.'
    },

    'は': {
      strokes: [
        { d: 'M 25,20 L 25,85', tip: 'Garis vertikal kiri' },
        { d: 'M 23,42 Q 52,35 68,40', tip: 'Garis horizontal' },
        { d: 'M 52,25 Q 55,45 52,62 Q 45,80 32,82', tip: 'Vertikal tengah melengkung' },
        { d: 'M 62,42 Q 80,55 78,72 Q 68,88 52,85', tip: 'Kurva kanan' }
      ],
      tips: 'Empat coretan: vertikal kiri, horizontal, vertikal tengah, kurva kanan.'
    },
    'ひ': {
      strokes: [
        { d: 'M 60,22 Q 72,35 72,52 Q 68,72 48,80 Q 28,85 18,72 Q 10,58 22,42 Q 35,28 60,28', tip: 'Loop utama' },
        { d: 'M 68,42 Q 82,52 85,65 Q 80,80 68,78', tip: 'Ekor kanan' }
      ],
      tips: 'Loop besar, lalu ekor kecil di kanan.'
    },
    'ふ': {
      strokes: [
        { d: 'M 28,22 Q 55,15 70,20', tip: 'Garis horizontal atas' },
        { d: 'M 50,18 Q 55,35 58,45', tip: 'Garis pendek turun' },
        { d: 'M 30,55 Q 48,45 68,55 Q 80,68 68,80 Q 55,90 40,85 Q 25,78 28,65', tip: 'Kurva bawah kiri' },
        { d: 'M 62,52 Q 80,42 85,52 Q 85,65 72,70', tip: 'Kurva bawah kanan' }
      ],
      tips: 'Horizontal atas, lalu tiga kurva di bawah.'
    },
    'へ': {
      strokes: [
        { d: 'M 18,55 Q 48,18 52,20 Q 58,22 82,58', tip: 'Garis tunggal berbentuk A' }
      ],
      tips: 'Satu coretan berbentuk segitiga terbalik / gunung.'
    },
    'ほ': {
      strokes: [
        { d: 'M 25,20 L 25,82', tip: 'Garis vertikal kiri' },
        { d: 'M 22,42 Q 50,35 68,40', tip: 'Garis horizontal' },
        { d: 'M 48,25 L 48,82', tip: 'Garis vertikal tengah' },
        { d: 'M 58,42 Q 80,55 78,72 Q 68,88 52,85 Q 38,82 38,68', tip: 'Kurva kanan melingkar' }
      ],
      tips: 'Empat coretan: dua vertikal, horizontal, dan kurva kanan.'
    },

    'ま': {
      strokes: [
        { d: 'M 22,30 Q 55,22 70,28', tip: 'Garis horizontal 1' },
        { d: 'M 22,50 Q 55,42 70,48', tip: 'Garis horizontal 2' },
        { d: 'M 48,48 Q 52,65 62,78 Q 70,88 58,92 Q 40,95 28,82 Q 18,68 32,55', tip: 'Kurva bawah' }
      ],
      tips: 'Dua horizontal, lalu kurva melingkar ke bawah.'
    },
    'み': {
      strokes: [
        { d: 'M 28,20 Q 25,48 22,68 Q 20,82 30,85', tip: 'Garis kiri' },
        { d: 'M 52,18 Q 55,35 60,50 Q 68,65 60,78 Q 48,88 32,80', tip: 'Kurva tengah' },
        { d: 'M 65,45 Q 82,55 82,70 Q 78,85 65,82', tip: 'Ekor kanan' }
      ],
      tips: 'Tiga coretan: garis kiri, kurva tengah, ekor kanan.'
    },
    'む': {
      strokes: [
        { d: 'M 35,22 Q 32,45 28,65 Q 25,80 35,85', tip: 'Garis kiri melengkung' },
        { d: 'M 52,18 Q 55,35 62,52 Q 72,65 65,78 Q 52,90 38,82 Q 25,72 30,58 Q 38,42 58,38', tip: 'Kurva besar melingkar' },
        { d: 'M 65,65 Q 80,62 82,72 Q 78,82 65,78', tip: 'Coretan kecil di tengah' }
      ],
      tips: 'Garis kiri, lingkaran besar, lalu coretan kecil.'
    },
    'め': {
      strokes: [
        { d: 'M 28,22 Q 25,48 22,68 Q 20,82 32,85', tip: 'Garis kiri' },
        { d: 'M 55,20 Q 62,35 68,55 Q 72,72 60,82 Q 45,90 30,80 Q 18,68 22,55 Q 28,40 55,35 Q 75,35 82,52', tip: 'Lingkaran dengan ekor' }
      ],
      tips: 'Garis kiri, lalu lingkaran besar dengan ekor di kanan.'
    },
    'も': {
      strokes: [
        { d: 'M 22,35 Q 55,28 70,32', tip: 'Garis horizontal 1' },
        { d: 'M 22,55 Q 55,48 70,52', tip: 'Garis horizontal 2' },
        { d: 'M 48,28 Q 52,58 48,75 Q 42,88 28,85', tip: 'Garis vertikal melengkung' }
      ],
      tips: 'Dua horizontal yang berpotongan dengan garis vertikal.'
    },

    'や': {
      strokes: [
        { d: 'M 35,25 Q 35,50 32,70 Q 28,85 18,88', tip: 'Garis kiri' },
        { d: 'M 52,18 Q 60,35 68,55 Q 78,72 68,85 Q 52,95 35,85 Q 22,75 25,60', tip: 'Kurva besar melingkar' }
      ],
      tips: 'Garis kiri, lalu lingkaran besar.'
    },
    'ゆ': {
      strokes: [
        { d: 'M 25,30 Q 22,55 20,75 Q 18,88 30,88', tip: 'Garis kiri' },
        { d: 'M 48,18 Q 55,35 62,55 Q 68,72 58,82 Q 45,92 32,82 Q 20,70 25,55 Q 32,38 55,32', tip: 'Kurva tengah' },
        { d: 'M 62,32 Q 78,32 82,45 Q 82,62 68,68', tip: 'Garis kanan' }
      ],
      tips: 'Tiga bagian: kiri, tengah melingkar, dan kanan.'
    },
    'よ': {
      strokes: [
        { d: 'M 35,22 Q 68,15 72,22', tip: 'Garis horizontal atas' },
        { d: 'M 22,52 Q 58,44 72,50', tip: 'Garis horizontal bawah' },
        { d: 'M 52,20 Q 55,48 50,70 Q 42,85 28,85', tip: 'Garis vertikal melengkung' }
      ],
      tips: 'Dua horizontal dan satu vertikal.'
    },

    'ら': {
      strokes: [
        { d: 'M 30,22 Q 58,15 70,20', tip: 'Garis horizontal atas' },
        { d: 'M 52,18 Q 58,38 65,55 Q 75,72 65,84 Q 52,94 35,86 Q 20,75 25,60', tip: 'Kurva melingkar' }
      ],
      tips: 'Horizontal atas, lalu kurva besar melingkar.'
    },
    'り': {
      strokes: [
        { d: 'M 32,20 Q 30,48 28,68 Q 25,82 32,85', tip: 'Garis kiri melengkung' },
        { d: 'M 65,20 Q 62,48 58,68 Q 52,85 40,88', tip: 'Garis kanan melengkung' }
      ],
      tips: 'Dua garis melengkung sejajar (seperti い tapi lebih lebar).'
    },
    'る': {
      strokes: [
        { d: 'M 35,22 Q 60,15 70,25 Q 75,40 62,50 Q 48,58 35,52 Q 22,45 25,32 Q 32,18 55,20', tip: 'Loop atas' },
        { d: 'M 65,50 Q 80,62 78,78 Q 68,92 50,88 Q 32,82 30,68', tip: 'Ekor melingkar bawah' }
      ],
      tips: 'Loop atas, lalu kurva bawah dengan ekor.'
    },
    'れ': {
      strokes: [
        { d: 'M 28,20 L 28,82', tip: 'Garis vertikal kiri' },
        { d: 'M 26,38 Q 52,30 68,36 Q 75,48 65,60 Q 52,70 38,66', tip: 'Garis horizontal melengkung' },
        { d: 'M 62,60 Q 78,72 76,85 Q 65,95 50,88', tip: 'Ekor kanan' }
      ],
      tips: 'Vertikal kiri, horizontal dengan kurva, lalu ekor.'
    },
    'ろ': {
      strokes: [
        { d: 'M 22,32 Q 55,22 72,28', tip: 'Garis horizontal atas' },
        { d: 'M 22,55 Q 55,45 72,52', tip: 'Garis horizontal tengah' },
        { d: 'M 68,52 Q 82,65 78,80 Q 65,92 45,86 Q 28,78 28,62', tip: 'Kurva bawah' }
      ],
      tips: 'Dua horizontal dan kurva bawah.'
    },

    'わ': {
      strokes: [
        { d: 'M 28,20 Q 25,50 22,72 Q 20,85 30,88', tip: 'Garis vertikal kiri' },
        { d: 'M 55,18 Q 62,35 68,55 Q 72,72 60,82 Q 45,90 30,80 Q 18,70 22,56', tip: 'Kurva melingkar kanan' }
      ],
      tips: 'Garis kiri, lalu lingkaran besar di kanan.'
    },
    'を': {
      strokes: [
        { d: 'M 22,25 Q 55,18 72,22', tip: 'Garis horizontal 1' },
        { d: 'M 22,40 Q 55,32 72,38', tip: 'Garis horizontal 2' },
        { d: 'M 48,18 Q 52,40 55,55 Q 65,72 55,84 Q 42,93 28,84 Q 16,72 20,58', tip: 'Kurva melingkar bawah' }
      ],
      tips: 'Dua horizontal atas, lalu kurva melingkar ke bawah.'
    },
    'ん': {
      strokes: [
        { d: 'M 35,22 Q 58,18 65,28 Q 68,42 55,50 Q 40,55 28,48 Q 18,40 22,28 Q 30,15 52,18', tip: 'Loop atas' },
        { d: 'M 55,50 Q 70,62 72,78 Q 65,90 50,88', tip: 'Ekor kanan melengkung' }
      ],
      tips: 'Loop atas, lalu ekor melengkung ke kanan bawah.'
    }
  };

  // ─── KATAKANA ───────────────────────────────────────────────────────────────
  const katakana = {
    'ア': {
      strokes: [
        { d: 'M 20,32 Q 55,22 75,28', tip: 'Garis horizontal atas' },
        { d: 'M 48,18 Q 42,45 30,68 Q 22,82 15,88', tip: 'Garis vertikal miring kiri' },
        { d: 'M 52,38 Q 68,55 78,78', tip: 'Garis diagonal kanan' }
      ],
      tips: 'Horizontal, lalu dua garis diagonal.'
    },
    'イ': {
      strokes: [
        { d: 'M 35,18 Q 28,42 22,68 Q 18,82 28,85', tip: 'Garis kiri miring' },
        { d: 'M 62,18 L 62,82', tip: 'Garis vertikal kanan' }
      ],
      tips: 'Garis diagonal kiri, lalu garis tegak kanan.'
    },
    'ウ': {
      strokes: [
        { d: 'M 38,18 Q 58,12 65,18', tip: 'Garis pendek atas' },
        { d: 'M 18,35 Q 50,25 78,32', tip: 'Garis horizontal' },
        { d: 'M 50,32 Q 48,55 50,70 Q 55,82 68,80', tip: 'Garis vertikal melengkung' }
      ],
      tips: 'Coretan pendek, horizontal, lalu vertikal melengkung.'
    },
    'エ': {
      strokes: [
        { d: 'M 20,30 Q 55,22 80,28', tip: 'Garis horizontal atas' },
        { d: 'M 50,28 L 50,72', tip: 'Garis vertikal' },
        { d: 'M 18,72 Q 55,65 82,70', tip: 'Garis horizontal bawah' }
      ],
      tips: 'Horizontal atas, vertikal, horizontal bawah (bentuk H).'
    },
    'オ': {
      strokes: [
        { d: 'M 20,32 Q 55,22 78,28', tip: 'Garis horizontal' },
        { d: 'M 48,15 L 48,85', tip: 'Garis vertikal' },
        { d: 'M 60,48 Q 78,60 80,75', tip: 'Garis pendek kanan bawah' }
      ],
      tips: 'Horizontal, vertikal, lalu coretan kecil di kanan.'
    },

    'カ': {
      strokes: [
        { d: 'M 25,28 Q 55,20 72,25', tip: 'Garis horizontal atas' },
        { d: 'M 42,15 Q 40,50 35,72 Q 28,85 20,88', tip: 'Garis vertikal kiri' },
        { d: 'M 60,38 Q 78,55 75,75', tip: 'Garis pendek kanan' }
      ],
      tips: 'Horizontal, vertikal kiri, coretan kanan.'
    },
    'キ': {
      strokes: [
        { d: 'M 22,28 Q 55,20 78,25', tip: 'Garis horizontal 1' },
        { d: 'M 22,48 Q 55,40 78,45', tip: 'Garis horizontal 2' },
        { d: 'M 50,15 L 50,85', tip: 'Garis vertikal' }
      ],
      tips: 'Dua horizontal dan satu vertikal.'
    },
    'ク': {
      strokes: [
        { d: 'M 35,18 Q 62,15 72,25', tip: 'Garis pendek atas' },
        { d: 'M 65,22 Q 58,45 42,62 Q 28,75 18,78', tip: 'Garis diagonal kiri' }
      ],
      tips: 'Coretan pendek atas, lalu diagonal ke kiri bawah.'
    },
    'ケ': {
      strokes: [
        { d: 'M 28,15 L 28,80', tip: 'Garis vertikal kiri' },
        { d: 'M 26,38 Q 55,30 72,35', tip: 'Garis horizontal' },
        { d: 'M 62,35 Q 68,52 62,68 Q 52,82 38,80', tip: 'Garis kanan melengkung' }
      ],
      tips: 'Vertikal kiri, horizontal, kurva kanan.'
    },
    'コ': {
      strokes: [
        { d: 'M 25,22 Q 68,15 75,22', tip: 'Garis horizontal atas' },
        { d: 'M 72,22 L 72,78', tip: 'Garis vertikal kanan' },
        { d: 'M 22,78 Q 55,70 72,75', tip: 'Garis horizontal bawah' }
      ],
      tips: 'Horizontal atas, vertikal kanan, horizontal bawah (bentuk ⊓).'
    },

    'サ': {
      strokes: [
        { d: 'M 30,22 Q 42,15 42,28 L 42,82', tip: 'Garis vertikal kiri' },
        { d: 'M 58,22 Q 70,15 70,28 L 70,82', tip: 'Garis vertikal kanan' },
        { d: 'M 18,48 Q 55,40 82,45', tip: 'Garis horizontal tengah' }
      ],
      tips: 'Dua vertikal, lalu horizontal yang memotong keduanya.'
    },
    'シ': {
      strokes: [
        { d: 'M 25,45 Q 38,35 45,45', tip: 'Titik kiri atas' },
        { d: 'M 25,65 Q 38,55 45,65', tip: 'Titik kiri bawah' },
        { d: 'M 58,18 Q 72,35 78,60 Q 78,78 62,82', tip: 'Kurva kanan' }
      ],
      tips: 'Dua titik kecil di kiri, lalu kurva besar di kanan.'
    },
    'ス': {
      strokes: [
        { d: 'M 20,28 Q 55,20 78,25', tip: 'Garis horizontal atas' },
        { d: 'M 50,25 Q 65,42 70,60 Q 72,78 55,85 Q 38,92 22,80', tip: 'Kurva melingkar bawah' }
      ],
      tips: 'Horizontal, lalu kurva besar melingkar ke bawah-kiri.'
    },
    'セ': {
      strokes: [
        { d: 'M 28,22 Q 68,15 72,22', tip: 'Garis horizontal atas' },
        { d: 'M 48,22 L 48,85', tip: 'Garis vertikal' },
        { d: 'M 18,58 Q 48,50 75,55', tip: 'Garis horizontal bawah' }
      ],
      tips: 'Horizontal atas, vertikal, horizontal bawah.'
    },
    'ソ': {
      strokes: [
        { d: 'M 28,22 Q 35,35 32,48', tip: 'Titik kiri' },
        { d: 'M 58,18 Q 70,35 75,55 Q 75,72 60,80', tip: 'Kurva kanan' }
      ],
      tips: 'Titik kecil kiri, lalu kurva kanan.'
    },

    'タ': {
      strokes: [
        { d: 'M 20,30 Q 55,22 78,28', tip: 'Garis horizontal 1' },
        { d: 'M 20,52 Q 55,44 78,50', tip: 'Garis horizontal 2' },
        { d: 'M 55,50 Q 70,65 78,82', tip: 'Garis diagonal kanan' }
      ],
      tips: 'Dua horizontal, lalu diagonal kanan.'
    },
    'チ': {
      strokes: [
        { d: 'M 20,32 Q 55,24 78,28', tip: 'Garis horizontal 1' },
        { d: 'M 20,52 Q 55,44 78,50', tip: 'Garis horizontal 2' },
        { d: 'M 50,50 L 50,85', tip: 'Garis vertikal' }
      ],
      tips: 'Dua horizontal dan satu vertikal.'
    },
    'ツ': {
      strokes: [
        { d: 'M 25,42 Q 35,30 38,42', tip: 'Titik kiri atas' },
        { d: 'M 45,42 Q 55,30 58,42', tip: 'Titik tengah' },
        { d: 'M 68,22 Q 80,38 82,58 Q 80,75 65,80', tip: 'Kurva kanan besar' }
      ],
      tips: 'Dua titik di kiri, lalu kurva besar di kanan.'
    },
    'テ': {
      strokes: [
        { d: 'M 20,30 Q 55,22 80,28', tip: 'Garis horizontal atas' },
        { d: 'M 22,52 Q 55,44 80,50', tip: 'Garis horizontal bawah' },
        { d: 'M 50,28 L 50,75', tip: 'Garis vertikal' }
      ],
      tips: 'Dua horizontal dan satu vertikal di tengah.'
    },
    'ト': {
      strokes: [
        { d: 'M 35,18 L 35,82', tip: 'Garis vertikal' },
        { d: 'M 35,42 Q 55,38 70,50', tip: 'Garis horizontal melengkung' }
      ],
      tips: 'Garis vertikal, lalu garis kecil melengkung ke kanan.'
    },

    'ナ': {
      strokes: [
        { d: 'M 20,42 Q 55,35 80,40', tip: 'Garis horizontal' },
        { d: 'M 50,18 L 50,82', tip: 'Garis vertikal' }
      ],
      tips: 'Garis horizontal, lalu vertikal (bentuk +).'
    },
    'ニ': {
      strokes: [
        { d: 'M 25,35 Q 55,28 75,32', tip: 'Garis horizontal atas (pendek)' },
        { d: 'M 18,65 Q 55,58 82,62', tip: 'Garis horizontal bawah (panjang)' }
      ],
      tips: 'Dua garis horizontal: atas lebih pendek, bawah lebih panjang.'
    },
    'ヌ': {
      strokes: [
        { d: 'M 20,35 Q 55,28 80,32', tip: 'Garis horizontal' },
        { d: 'M 62,32 Q 48,52 32,65 Q 20,75 15,82', tip: 'Diagonal kiri bawah' },
        { d: 'M 40,55 Q 62,65 72,80', tip: 'Ekor kanan bawah' }
      ],
      tips: 'Horizontal, lalu dua garis silang di bawah.'
    },
    'ネ': {
      strokes: [
        { d: 'M 20,32 Q 55,24 78,28', tip: 'Garis horizontal atas' },
        { d: 'M 48,18 L 48,85', tip: 'Garis vertikal' },
        { d: 'M 30,55 Q 48,48 65,55', tip: 'Garis horizontal tengah' },
        { d: 'M 35,65 Q 28,80 20,85', tip: 'Diagonal kiri bawah' },
        { d: 'M 60,65 Q 68,80 75,85', tip: 'Diagonal kanan bawah' }
      ],
      tips: 'Lima coretan membentuk karakter ネ.'
    },
    'ノ': {
      strokes: [
        { d: 'M 30,18 Q 50,42 62,68 Q 68,82 60,88', tip: 'Diagonal kanan bawah' }
      ],
      tips: 'Satu coretan diagonal dari kiri atas ke kanan bawah.'
    },

    'ハ': {
      strokes: [
        { d: 'M 38,28 Q 30,52 22,78', tip: 'Garis kiri diagonal' },
        { d: 'M 52,28 Q 62,52 72,78', tip: 'Garis kanan diagonal' }
      ],
      tips: 'Dua garis diagonal membuka ke bawah (seperti ∧ terbalik).'
    },
    'ヒ': {
      strokes: [
        { d: 'M 28,20 L 28,80', tip: 'Garis vertikal kiri' },
        { d: 'M 26,50 Q 55,42 72,48', tip: 'Garis horizontal tengah' },
        { d: 'M 26,80 Q 55,73 72,78', tip: 'Garis horizontal bawah' }
      ],
      tips: 'Vertikal kiri, dua garis horizontal.'
    },
    'フ': {
      strokes: [
        { d: 'M 22,28 Q 55,20 78,25', tip: 'Garis horizontal atas' },
        { d: 'M 72,25 Q 70,52 58,68 Q 45,80 30,80', tip: 'Garis vertikal melengkung kiri' }
      ],
      tips: 'Horizontal atas, lalu turun melengkung ke kiri.'
    },
    'ヘ': {
      strokes: [
        { d: 'M 18,60 Q 48,18 52,18 Q 58,18 82,62', tip: 'Satu garis berbentuk gunung' }
      ],
      tips: 'Satu coretan melengkung seperti gunung/caret.'
    },
    'ホ': {
      strokes: [
        { d: 'M 20,35 Q 55,28 80,32', tip: 'Garis horizontal atas' },
        { d: 'M 50,18 L 50,85', tip: 'Garis vertikal' },
        { d: 'M 25,65 Q 38,58 50,65', tip: 'Diagonal kiri bawah' },
        { d: 'M 50,65 Q 62,58 75,65', tip: 'Diagonal kanan bawah' }
      ],
      tips: 'Horizontal, vertikal, lalu dua diagonal bawah.'
    },

    'マ': {
      strokes: [
        { d: 'M 20,30 Q 55,22 78,28', tip: 'Garis horizontal' },
        { d: 'M 50,28 Q 58,50 68,68 Q 72,80 60,85', tip: 'Garis diagonal kanan' }
      ],
      tips: 'Horizontal, lalu garis miring ke kanan bawah.'
    },
    'ミ': {
      strokes: [
        { d: 'M 30,28 Q 55,20 70,25', tip: 'Garis horizontal 1 (atas)' },
        { d: 'M 22,48 Q 55,40 72,45', tip: 'Garis horizontal 2 (tengah)' },
        { d: 'M 25,68 Q 55,60 78,65', tip: 'Garis horizontal 3 (bawah)' }
      ],
      tips: 'Tiga garis horizontal sejajar.'
    },
    'ム': {
      strokes: [
        { d: 'M 50,18 Q 38,35 25,52 Q 18,65 28,72', tip: 'Garis kiri melengkung' },
        { d: 'M 50,18 Q 62,35 75,52 Q 82,65 72,72 Q 55,80 28,72', tip: 'Garis kanan melengkung ke basis' }
      ],
      tips: 'Dua garis dari puncak yang membentuk segitiga.'
    },
    'メ': {
      strokes: [
        { d: 'M 20,28 Q 42,45 65,78', tip: 'Diagonal kiri ke kanan bawah' },
        { d: 'M 80,28 Q 58,48 35,70 Q 25,80 18,85', tip: 'Diagonal kanan ke kiri bawah' }
      ],
      tips: 'Dua diagonal silang membentuk X.'
    },
    'モ': {
      strokes: [
        { d: 'M 20,30 Q 55,22 78,28', tip: 'Garis horizontal 1' },
        { d: 'M 20,52 Q 55,44 78,50', tip: 'Garis horizontal 2' },
        { d: 'M 50,28 L 50,75 Q 50,85 65,88', tip: 'Garis vertikal dengan kait' }
      ],
      tips: 'Dua horizontal, lalu vertikal dengan kait di bawah.'
    },

    'ヤ': {
      strokes: [
        { d: 'M 25,35 Q 22,55 20,72 Q 18,82 28,82', tip: 'Garis kiri' },
        { d: 'M 55,18 Q 62,38 68,58 Q 72,75 60,82 Q 45,90 30,78', tip: 'Kurva melingkar' }
      ],
      tips: 'Garis kiri, lalu lingkaran besar.'
    },
    'ユ': {
      strokes: [
        { d: 'M 25,32 Q 55,24 75,28', tip: 'Garis horizontal atas' },
        { d: 'M 50,28 L 50,72', tip: 'Garis vertikal' },
        { d: 'M 18,72 Q 55,65 80,70', tip: 'Garis horizontal bawah' }
      ],
      tips: 'Horizontal atas, vertikal, horizontal bawah.'
    },
    'ヨ': {
      strokes: [
        { d: 'M 28,22 Q 68,15 72,22', tip: 'Garis horizontal atas' },
        { d: 'M 28,52 Q 68,44 72,50', tip: 'Garis horizontal tengah' },
        { d: 'M 28,78 Q 68,70 72,76', tip: 'Garis horizontal bawah' },
        { d: 'M 72,22 L 72,76', tip: 'Garis vertikal kanan' }
      ],
      tips: 'Tiga horizontal dan vertikal kanan (bentuk ⊏ mirror).'
    },

    'ラ': {
      strokes: [
        { d: 'M 22,30 Q 55,22 75,28', tip: 'Garis horizontal atas' },
        { d: 'M 50,28 Q 60,45 65,62 Q 68,78 55,82', tip: 'Garis vertikal melengkung' }
      ],
      tips: 'Horizontal, lalu garis vertikal melengkung ke kanan.'
    },
    'リ': {
      strokes: [
        { d: 'M 30,18 Q 28,48 25,68 Q 22,80 30,82', tip: 'Garis kiri' },
        { d: 'M 65,18 L 65,80', tip: 'Garis vertikal kanan' }
      ],
      tips: 'Dua garis sejajar: kiri melengkung, kanan lurus.'
    },
    'ル': {
      strokes: [
        { d: 'M 30,18 Q 28,45 22,68 Q 18,82 30,85', tip: 'Garis kiri melengkung' },
        { d: 'M 60,18 Q 62,45 68,65 Q 72,80 62,88 Q 48,95 35,85', tip: 'Kurva kanan melingkar' }
      ],
      tips: 'Garis kiri, lalu kurva kanan yang melingkar.'
    },
    'レ': {
      strokes: [
        { d: 'M 35,18 Q 32,52 30,72 Q 28,85 42,88 Q 55,88 65,82', tip: 'Satu garis melengkung' }
      ],
      tips: 'Satu coretan dari atas kiri, turun, lalu belok ke kanan.'
    },
    'ロ': {
      strokes: [
        { d: 'M 22,22 Q 22,22 22,78', tip: 'Garis vertikal kiri' },
        { d: 'M 22,22 Q 55,15 78,20', tip: 'Garis horizontal atas' },
        { d: 'M 78,20 L 78,78', tip: 'Garis vertikal kanan' },
        { d: 'M 22,78 Q 55,72 78,78', tip: 'Garis horizontal bawah' }
      ],
      tips: 'Empat coretan membentuk kotak.'
    },

    'ワ': {
      strokes: [
        { d: 'M 22,28 Q 55,20 78,25', tip: 'Garis horizontal atas' },
        { d: 'M 22,25 L 22,80', tip: 'Garis vertikal kiri' },
        { d: 'M 72,25 Q 72,52 60,68 Q 48,80 32,78', tip: 'Garis kanan melengkung' }
      ],
      tips: 'Horizontal atas, vertikal kiri, kurva kanan.'
    },
    'ヲ': {
      strokes: [
        { d: 'M 22,25 Q 55,18 75,22', tip: 'Garis horizontal 1' },
        { d: 'M 22,42 Q 55,35 75,40', tip: 'Garis horizontal 2' },
        { d: 'M 50,20 Q 55,45 58,62 Q 62,78 50,84 Q 35,90 25,78', tip: 'Kurva melingkar bawah' }
      ],
      tips: 'Dua horizontal atas, lalu kurva melingkar ke kiri bawah.'
    },
    'ン': {
      strokes: [
        { d: 'M 25,40 Q 38,28 45,40', tip: 'Titik kiri atas' },
        { d: 'M 25,62 Q 38,50 45,62', tip: 'Titik kiri bawah' },
        { d: 'M 60,28 Q 52,50 45,68 Q 38,80 28,85', tip: 'Diagonal kiri bawah' }
      ],
      tips: 'Dua titik di kiri, lalu diagonal ke kiri bawah.'
    }
  };

  // Fungsi untuk mendapatkan data stroke
  function getHiragana(char) {
    return hiragana[char] || null;
  }

  function getKatakana(char) {
    return katakana[char] || null;
  }

  function hasHiragana(char) {
    return !!hiragana[char];
  }

  function hasKatakana(char) {
    return !!katakana[char];
  }

  function getAllHiragana() {
    return Object.keys(hiragana);
  }

  function getAllKatakana() {
    return Object.keys(katakana);
  }

  return {
    getHiragana,
    getKatakana,
    hasHiragana,
    hasKatakana,
    getAllHiragana,
    getAllKatakana
  };
})();
