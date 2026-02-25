/**
 * Lingora — Data Grammar Bahasa Korea
 * Fase 21.2 — 27 pola grammar, 5 kategori
 * Format: { id, pattern, category, meaning, level, explanation, examples:[{kr, roman, id}], notes? }
 * Romanisasi: Revised Romanization (표준 로마자 표기법)
 */
const KrGrammarData = (() => {

  const categories = [
    { id: 'copula',     label: 'Copula & Keberadaan', icon: '🔵' },
    { id: 'particles',  label: 'Partikel Dasar',       icon: '⚡' },
    { id: 'verbs',      label: 'Pola Verba Dasar',     icon: '🏃' },
    { id: 'honorifics', label: 'Honorifik & Tingkat Kesopanan', icon: '🙏' },
    { id: 'time',       label: 'Waktu & Aspek',        icon: '🕐' },
  ];

  const patterns = [

    // ── Copula & Keberadaan ──────────────────────────────────────────────────
    {
      id: 'kr-g-01',
      pattern: '~이에요/예요',
      category: 'copula',
      meaning: 'adalah (bentuk sopan-informal)',
      level: 'TOPIK1',
      explanation: 'Copula dasar bahasa Korea. Gunakan 이에요 setelah konsonan (받침), dan 예요 setelah vokal. Bentuk ini sangat umum digunakan dalam percakapan sehari-hari.',
      examples: [
        { kr: '저는 학생이에요.', roman: 'Jeoneun haksaengiyeyo.', id: 'Saya adalah pelajar.' },
        { kr: '이것은 책이에요.', roman: 'Igeoseun chaegiyeyo.', id: 'Ini adalah buku.' },
        { kr: '제 이름은 민준이에요.', roman: 'Je ireumeun Minjuniyeyo.', id: 'Nama saya adalah Minjun.' },
      ],
      notes: '이에요 → setelah konsonan: 학생이에요. 예요 → setelah vokal: 의사예요.',
    },
    {
      id: 'kr-g-02',
      pattern: '~이다 / 입니다',
      category: 'copula',
      meaning: 'adalah (bentuk formal)',
      level: 'TOPIK1',
      explanation: '입니다 adalah bentuk formal dari copula. Digunakan dalam konteks resmi, pidato, presentasi, atau dengan orang yang jauh lebih tua/berpangkat lebih tinggi.',
      examples: [
        { kr: '저는 회사원입니다.', roman: 'Jeoneun hoesawonipnida.', id: 'Saya adalah karyawan.' },
        { kr: '이것은 교과서입니다.', roman: 'Igeoseun gyogwaseoipnida.', id: 'Ini adalah buku pelajaran.' },
      ],
      notes: 'Hierarki: 입니다 (sangat formal) > 이에요/예요 (sopan) > 이야/야 (informal).',
    },
    {
      id: 'kr-g-03',
      pattern: '~이/가 아니에요',
      category: 'copula',
      meaning: 'bukan ~',
      level: 'TOPIK1',
      explanation: 'Bentuk negatif copula. Gunakan 이 setelah konsonan dan 가 setelah vokal. Digunakan untuk menyangkal suatu identitas atau klasifikasi.',
      examples: [
        { kr: '저는 선생님이 아니에요.', roman: 'Jeoneun seonsaengnimyi anieyo.', id: 'Saya bukan guru.' },
        { kr: '이것은 책이 아니에요.', roman: 'Igeoseun chaegyi anieyo.', id: 'Ini bukan buku.' },
      ],
      notes: 'Pola negatif: 이에요 → 이 아니에요.',
    },
    {
      id: 'kr-g-04',
      pattern: '~이/가 있어요 / 없어요',
      category: 'copula',
      meaning: 'ada / tidak ada; punya / tidak punya',
      level: 'TOPIK1',
      explanation: '있어요 menyatakan keberadaan atau kepemilikan. 없어요 adalah bentuk negatifnya. Partikel 이/가 menandai subjek — pakai 이 setelah konsonan, 가 setelah vokal.',
      examples: [
        { kr: '화장실이 있어요?', roman: 'Hwajangsilyi isseoyo?', id: 'Apakah ada toilet?' },
        { kr: '시간이 없어요.', roman: 'Sigani eopseoyo.', id: 'Tidak ada waktu.' },
        { kr: '돈이 있어요.', roman: 'Doni isseoyo.', id: 'Ada/punya uang.' },
      ],
    },

    // ── Partikel Dasar ───────────────────────────────────────────────────────
    {
      id: 'kr-g-05',
      pattern: '~은/는',
      category: 'particles',
      meaning: 'partikel topik (menandai topik kalimat)',
      level: 'TOPIK1',
      explanation: 'Partikel 은/는 menandai topik yang sedang dibicarakan. Gunakan 은 setelah konsonan, 는 setelah vokal. Sering digunakan untuk memperkenalkan topik baru atau membuat perbandingan.',
      examples: [
        { kr: '저는 학생이에요.', roman: 'Jeoneun haksaengiyeyo.', id: 'Saya (topik) adalah pelajar.' },
        { kr: '한국어는 재미있어요.', roman: 'Hangugeo-neun jaemiisseoyo.', id: 'Bahasa Korea (topik) menyenangkan.' },
        { kr: '오늘은 날씨가 좋아요.', roman: 'Oneureun nalssiga joayo.', id: 'Hari ini (topik) cuacanya bagus.' },
      ],
      notes: '은 → setelah konsonan (학생은, 책은). 는 → setelah vokal (저는, 나는).',
    },
    {
      id: 'kr-g-06',
      pattern: '~이/가',
      category: 'particles',
      meaning: 'partikel subjek',
      level: 'TOPIK1',
      explanation: 'Partikel 이/가 menandai subjek gramatikal kalimat. Gunakan 이 setelah konsonan, 가 setelah vokal. Berbeda dengan 은/는 yang menandai topik.',
      examples: [
        { kr: '비가 와요.', roman: 'Biga wayo.', id: 'Hujan turun (hujan = subjek).' },
        { kr: '학생이 공부해요.', roman: 'Haksaengi gongbuhaeyo.', id: 'Pelajar belajar.' },
        { kr: '꽃이 예뻐요.', roman: 'Kkochi yeppeoyo.', id: 'Bunganya cantik.' },
      ],
      notes: '이 → setelah konsonan. 가 → setelah vokal.',
    },
    {
      id: 'kr-g-07',
      pattern: '~을/를',
      category: 'particles',
      meaning: 'partikel objek langsung',
      level: 'TOPIK1',
      explanation: 'Partikel 을/를 menandai objek langsung kata kerja. Gunakan 을 setelah konsonan, 를 setelah vokal.',
      examples: [
        { kr: '밥을 먹어요.', roman: 'Babeul meogeoyo.', id: 'Makan nasi.' },
        { kr: '책을 읽어요.', roman: 'Chaekeul ilgeoyo.', id: 'Membaca buku.' },
        { kr: '음악을 들어요.', roman: 'Eumageul deoreoyo.', id: 'Mendengarkan musik.' },
      ],
      notes: '을 → setelah konsonan (밥을, 책을). 를 → setelah vokal (음악를 → 음악을, pengecualian bunyi).',
    },
    {
      id: 'kr-g-08',
      pattern: '~에',
      category: 'particles',
      meaning: 'partikel lokasi / waktu (di, ke, pada)',
      level: 'TOPIK1',
      explanation: '에 digunakan sebagai partikel lokasi statis (ada di mana) atau tujuan (pergi ke mana), dan juga untuk waktu/tanggal.',
      examples: [
        { kr: '학교에 가요.', roman: 'Hakgyoe gayo.', id: 'Pergi ke sekolah.' },
        { kr: '집에 있어요.', roman: 'Jibe isseoyo.', id: 'Ada di rumah.' },
        { kr: '오늘에 만나요.', roman: 'Oneule mannayo.', id: 'Bertemu hari ini.' },
      ],
      notes: 'Untuk lokasi aktif (melakukan sesuatu di suatu tempat) gunakan 에서, bukan 에.',
    },
    {
      id: 'kr-g-09',
      pattern: '~에서',
      category: 'particles',
      meaning: 'partikel lokasi aktif (di — melakukan aktivitas)',
      level: 'TOPIK1',
      explanation: '에서 digunakan untuk lokasi di mana suatu aktivitas berlangsung. Berbeda dengan 에 yang lebih umum, 에서 spesifik untuk tempat berlangsungnya aksi.',
      examples: [
        { kr: '식당에서 밥을 먹어요.', roman: 'Sikdangeseo babeul meogeoyo.', id: 'Makan di restoran.' },
        { kr: '도서관에서 공부해요.', roman: 'Dosoowaneseo gongbuhaeyo.', id: 'Belajar di perpustakaan.' },
      ],
      notes: '에 = keberadaan atau tujuan. 에서 = lokasi aksi berlangsung.',
    },
    {
      id: 'kr-g-10',
      pattern: '~도',
      category: 'particles',
      meaning: 'juga / pun',
      level: 'TOPIK1',
      explanation: '도 adalah partikel yang menambahkan makna "juga" atau "pun". Menggantikan 은/는 atau 이/가 saat digunakan.',
      examples: [
        { kr: '저도 학생이에요.', roman: 'Jeodo haksaengiyeyo.', id: 'Saya juga pelajar.' },
        { kr: '한국어도 배워요.', roman: 'Hangugeodo baewoyo.', id: 'Bahasa Korea juga dipelajari.' },
      ],
    },

    // ── Pola Verba Dasar ─────────────────────────────────────────────────────
    {
      id: 'kr-g-11',
      pattern: '~아/어요',
      category: 'verbs',
      meaning: 'akhiran verba/adjektiva sopan (sekarang)',
      level: 'TOPIK1',
      explanation: 'Akhiran 아요 atau 어요 membentuk kalimat sopan-informal untuk sekarang/umum. Gunakan 아요 jika vokal terakhir batang kata adalah ㅏ atau ㅗ, selain itu gunakan 어요.',
      examples: [
        { kr: '가요. (가다)', roman: 'Gayo. (gada)', id: 'Pergi.' },
        { kr: '먹어요. (먹다)', roman: 'Meogeoyo. (meokda)', id: 'Makan.' },
        { kr: '좋아요. (좋다)', roman: 'Joayo. (jota)', id: 'Bagus / suka.' },
      ],
      notes: 'Aturan: vokal ㅏ/ㅗ → 아요 (가다→가요). Vokal lainnya → 어요 (먹다→먹어요). 하다 khusus → 해요.',
    },
    {
      id: 'kr-g-12',
      pattern: '~ㅂ/습니다',
      category: 'verbs',
      meaning: 'akhiran verba formal (sekarang)',
      level: 'TOPIK1',
      explanation: '습니다/ㅂ니다 adalah akhiran paling formal untuk kalimat pernyataan. Digunakan dalam situasi resmi, berita, atau presentasi.',
      examples: [
        { kr: '먹습니다.', roman: 'Meoksseumnida.', id: 'Makan. (formal)' },
        { kr: '공부합니다.', roman: 'Gongbuhamnida.', id: 'Belajar. (formal)' },
      ],
      notes: 'ㅂ니다 → setelah vokal (가+ㅂ니다 = 갑니다). 습니다 → setelah konsonan (먹+습니다).',
    },
    {
      id: 'kr-g-13',
      pattern: '~지 않아요',
      category: 'verbs',
      meaning: 'tidak ~ (bentuk negatif umum)',
      level: 'TOPIK1',
      explanation: '지 않아요 adalah bentuk negatif umum yang bisa digunakan untuk verba maupun adjektiva. Ditambahkan setelah batang kata tanpa perubahan apapun.',
      examples: [
        { kr: '안 가요. / 가지 않아요.', roman: 'An gayo. / Gaji anayo.', id: 'Tidak pergi.' },
        { kr: '안 먹어요. / 먹지 않아요.', roman: 'An meogeoyo. / Meokji anayo.', id: 'Tidak makan.' },
      ],
      notes: 'Cara singkat: 안 + verba (안 가요). Cara panjang: verba + 지 않아요 (가지 않아요). Keduanya benar.',
    },
    {
      id: 'kr-g-14',
      pattern: '~고 싶어요',
      category: 'verbs',
      meaning: 'ingin ~',
      level: 'TOPIK1',
      explanation: 'Pola 고 싶어요 menyatakan keinginan subjek pertama (saya). Ditambahkan setelah batang kata verba. Untuk orang ketiga, gunakan 고 싶어해요.',
      examples: [
        { kr: '한국에 가고 싶어요.', roman: 'Hanguge gago sipeoyo.', id: 'Ingin pergi ke Korea.' },
        { kr: '커피를 마시고 싶어요.', roman: 'Keopyireul masigo sipeoyo.', id: 'Ingin minum kopi.' },
      ],
    },
    {
      id: 'kr-g-15',
      pattern: '~을/를 좋아해요',
      category: 'verbs',
      meaning: 'suka ~',
      level: 'TOPIK1',
      explanation: 'Digunakan untuk menyatakan kesukaan. Objek yang disukai ditandai dengan partikel 을/를.',
      examples: [
        { kr: '한국 음식을 좋아해요.', roman: 'Hanguk eumsigeul joahaeyo.', id: 'Suka makanan Korea.' },
        { kr: '음악을 좋아해요.', roman: 'Eumageul joahaeyo.', id: 'Suka musik.' },
      ],
    },
    {
      id: 'kr-g-16',
      pattern: '~할 수 있어요/없어요',
      category: 'verbs',
      meaning: 'bisa / tidak bisa ~',
      level: 'TOPIK1',
      explanation: 'Pola 할 수 있어요 menyatakan kemampuan. Gunakan 을/ㄹ 수 있어요 untuk "bisa" dan 을/ㄹ 수 없어요 untuk "tidak bisa".',
      examples: [
        { kr: '한국어를 말할 수 있어요.', roman: 'Hangugeoreul malhal su isseoyo.', id: 'Bisa berbicara bahasa Korea.' },
        { kr: '수영을 할 수 없어요.', roman: 'Suyeongeul hal su eopseoyo.', id: 'Tidak bisa berenang.' },
      ],
    },

    // ── Honorifik & Tingkat Kesopanan ────────────────────────────────────────
    {
      id: 'kr-g-17',
      pattern: '저/나',
      category: 'honorifics',
      meaning: '저 = saya (sopan), 나 = saya (informal)',
      level: 'TOPIK1',
      explanation: 'Bahasa Korea memiliki dua kata untuk "saya". 저 digunakan dalam konteks sopan (dengan orang yang lebih tua atau tidak dikenal), 나 digunakan dalam konteks akrab.',
      examples: [
        { kr: '저는 인도네시아 사람이에요.', roman: 'Jeoneun Indonesiya saramieyeyo.', id: 'Saya orang Indonesia. (sopan)' },
        { kr: '나는 학생이야.', roman: 'Naneun haksaengiya.', id: 'Aku pelajar. (informal)' },
      ],
      notes: '저 → konteks sopan. 나 → konteks informal/akrab dengan teman sebaya.',
    },
    {
      id: 'kr-g-18',
      pattern: '~세요/으세요',
      category: 'honorifics',
      meaning: 'tolong ~ / silakan ~ (perintah sopan)',
      level: 'TOPIK1',
      explanation: 'Akhiran 세요/으세요 digunakan untuk membuat kalimat perintah atau permintaan yang sopan. Juga digunakan untuk mendeskripsikan tindakan orang yang lebih tua dengan hormat.',
      examples: [
        { kr: '앉으세요.', roman: 'Anjeuseyo.', id: 'Silakan duduk.' },
        { kr: '잠깐 기다리세요.', roman: 'Jamkkan gidariseyo.', id: 'Tolong tunggu sebentar.' },
        { kr: '선생님이 가르치세요.', roman: 'Seonsaengnimyi gareuchiseyo.', id: 'Guru (hormat) mengajar.' },
      ],
      notes: 'Untuk perintah sangat formal: 십시오/으십시오 (더 가 주십시오 = tolong pergi lebih jauh).',
    },
    {
      id: 'kr-g-19',
      pattern: '~주세요',
      category: 'honorifics',
      meaning: 'tolong berikan / tolong lakukan ~',
      level: 'TOPIK1',
      explanation: '주세요 (dari 주다 = memberi) digunakan untuk meminta sesuatu dengan sopan. Sangat umum di restoran, toko, atau situasi pelayanan.',
      examples: [
        { kr: '물 주세요.', roman: 'Mul juseyo.', id: 'Tolong (beri saya) air.' },
        { kr: '메뉴 주세요.', roman: 'Menyu juseyo.', id: 'Tolong (beri) menunya.' },
        { kr: '조금 기다려 주세요.', roman: 'Jogeum gidaryeo juseyo.', id: 'Tolong tunggu sebentar.' },
      ],
    },

    // ── Waktu & Aspek ────────────────────────────────────────────────────────
    {
      id: 'kr-g-20',
      pattern: '~았어요/었어요',
      category: 'time',
      meaning: 'sudah ~ / ~-lah (lampau)',
      level: 'TOPIK1',
      explanation: 'Akhiran 았/었어요 membentuk kalimat lampau. Gunakan 았어요 jika vokal terakhir batang kata adalah ㅏ atau ㅗ, selain itu gunakan 었어요.',
      examples: [
        { kr: '밥을 먹었어요.', roman: 'Babeul meogeo-sseoyo.', id: 'Sudah makan nasi.' },
        { kr: '학교에 갔어요.', roman: 'Hakgyoe gasseoyo.', id: 'Sudah pergi ke sekolah.' },
        { kr: '영화를 봤어요.', roman: 'Yeonghwareul bwasseoyo.', id: 'Sudah nonton film.' },
      ],
      notes: '가다 → 갔어요 (ㅏ+았=아서 diringkas). 먹다 → 먹었어요. 하다 → 했어요.',
    },
    {
      id: 'kr-g-21',
      pattern: '~고 있어요',
      category: 'time',
      meaning: 'sedang ~',
      level: 'TOPIK1',
      explanation: 'Pola 고 있어요 menyatakan aksi yang sedang berlangsung saat ini (bentuk progresif). Konsisten untuk verba aksi.',
      examples: [
        { kr: '공부하고 있어요.', roman: 'Gongbuhago isseoyo.', id: 'Sedang belajar.' },
        { kr: '밥을 먹고 있어요.', roman: 'Babeul meokgo isseoyo.', id: 'Sedang makan nasi.' },
        { kr: '전화하고 있어요.', roman: 'Jeonhwahago isseoyo.', id: 'Sedang menelepon.' },
      ],
    },
    {
      id: 'kr-g-22',
      pattern: '~ㄹ/을 거예요',
      category: 'time',
      meaning: 'akan ~ (rencana masa depan)',
      level: 'TOPIK1',
      explanation: 'Akhiran ㄹ/을 거예요 menyatakan niat atau prediksi masa depan. Gunakan ㄹ거예요 setelah vokal, 을 거예요 setelah konsonan.',
      examples: [
        { kr: '내일 한국에 갈 거예요.', roman: 'Naeil Hanguke gal geoyeyo.', id: 'Besok akan pergi ke Korea.' },
        { kr: '공부할 거예요.', roman: 'Gongbuhal geoyeyo.', id: 'Akan belajar.' },
      ],
    },
    {
      id: 'kr-g-23',
      pattern: '~아/어서',
      category: 'time',
      meaning: 'karena ~ / setelah ~ (sebab-akibat / urutan)',
      level: 'TOPIK2',
      explanation: '아/어서 memiliki dua fungsi: menyatakan sebab-akibat ("karena...") atau urutan aksi ("setelah... lalu..."). Subjek kedua klausa harus sama.',
      examples: [
        { kr: '배가 고파서 밥을 먹어요.', roman: 'Baega gopaseo babeul meogeoyo.', id: 'Karena lapar, makan nasi.' },
        { kr: '학교에 가서 공부해요.', roman: 'Hakgyoe gaseo gongbuhaeyo.', id: 'Pergi ke sekolah lalu belajar.' },
      ],
    },
    {
      id: 'kr-g-24',
      pattern: '~(으)면',
      category: 'time',
      meaning: 'kalau ~ / jika ~ (kondisional)',
      level: 'TOPIK2',
      explanation: 'Akhiran (으)면 membentuk klausa kondisional. Gunakan 으면 setelah konsonan, 면 setelah vokal.',
      examples: [
        { kr: '시간이 있으면 가겠어요.', roman: 'Sigani isseumyeon gagensseoyo.', id: 'Kalau ada waktu, akan pergi.' },
        { kr: '비가 오면 집에 있어요.', roman: 'Biga omyeon jibe isseoyo.', id: 'Kalau hujan, di rumah.' },
      ],
    },
    {
      id: 'kr-g-25',
      pattern: '~지만',
      category: 'time',
      meaning: 'tetapi ~ / namun ~ (kontras)',
      level: 'TOPIK1',
      explanation: '지만 digunakan untuk menghubungkan dua klausa yang kontras ("tapi..."). Ditambahkan langsung setelah batang kata atau akhiran.',
      examples: [
        { kr: '비싸지만 맛있어요.', roman: 'Bissajiman massisseoyo.', id: 'Mahal, tapi enak.' },
        { kr: '피곤하지만 공부해요.', roman: 'Pigonhajiman gongbuhaeyo.', id: 'Meskipun lelah, belajar.' },
      ],
    },
    {
      id: 'kr-g-26',
      pattern: '~고',
      category: 'time',
      meaning: 'dan / lalu (menggabungkan klausa)',
      level: 'TOPIK1',
      explanation: '고 menggabungkan dua klausa atau dua kata sifat/verba. Bisa berarti "dan" (daftar sifat) atau "lalu" (urutan aksi).',
      examples: [
        { kr: '빵을 먹고 커피를 마셔요.', roman: 'Ppaangeul meokgo keopireul mashyeoyo.', id: 'Makan roti lalu minum kopi.' },
        { kr: '예쁘고 착해요.', roman: 'Yeppeugeo chakaeyo.', id: 'Cantik dan baik hati.' },
      ],
    },
    {
      id: 'kr-g-27',
      pattern: '~은/는 어때요?',
      category: 'verbs',
      meaning: 'bagaimana ~? / apakah ~ oke?',
      level: 'TOPIK1',
      explanation: 'Pola ini digunakan untuk meminta pendapat atau saran. Sangat umum dalam percakapan sehari-hari.',
      examples: [
        { kr: '한국 음식은 어때요?', roman: 'Hanguk eumsigenneun eottaeyo?', id: 'Bagaimana makanan Korea?' },
        { kr: '내일은 어때요?', roman: 'Naeilleun eottaeyo?', id: 'Bagaimana (kalau) besok?' },
      ],
    },
  ];

  return {
    getAll: () => patterns,
    getCategories: () => categories,
    getByCategory: (catId) => patterns.filter(p => p.category === catId),
    getByLevel: (level) => patterns.filter(p => p.level === level),
  };

})();
