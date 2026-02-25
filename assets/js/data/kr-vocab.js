/**
 * Lingora — Data Kosakata Bahasa Korea
 * Fase 21.2 — 155 kata, 15 tema, level TOPIK1 / TOPIK2
 * Format: { word, romanization, meaning, theme, level, example: { kr, roman, id } }
 * Romanisasi: Revised Romanization (표준 로마자 표기법)
 */
const KrVocabData = (() => {

  const themes = [
    { id: 'greetings',   label: 'Salam & Sapaan',    icon: '👋' },
    { id: 'family',      label: 'Keluarga',           icon: '👨‍👩‍👧‍👦' },
    { id: 'food',        label: 'Makanan & Minuman',  icon: '🍜' },
    { id: 'time',        label: 'Waktu & Tanggal',    icon: '🕐' },
    { id: 'places',      label: 'Tempat & Lokasi',    icon: '📍' },
    { id: 'transport',   label: 'Transportasi',       icon: '🚌' },
    { id: 'shopping',    label: 'Belanja',            icon: '🛍️' },
    { id: 'weather',     label: 'Cuaca',              icon: '⛅' },
    { id: 'body',        label: 'Tubuh & Kesehatan',  icon: '🏥' },
    { id: 'school',      label: 'Sekolah & Belajar',  icon: '📚' },
    { id: 'work',        label: 'Pekerjaan',          icon: '💼' },
    { id: 'hobby',       label: 'Hobi & Hiburan',     icon: '🎨' },
    { id: 'feelings',    label: 'Perasaan & Emosi',   icon: '😊' },
    { id: 'colors',      label: 'Warna & Bentuk',     icon: '🎨' },
    { id: 'numbers',     label: 'Angka & Ukuran',     icon: '🔢' },
  ];

  const vocab = [
    // ── Greetings 👋 ──────────────────────────────────────────────────────────
    {
      word: '안녕하세요',
      romanization: 'annyeonghaseyo',
      meaning: 'halo (formal)',
      theme: 'greetings', level: 'TOPIK1',
      example: { kr: '안녕하세요, 선생님.', roman: 'Annyeonghaseyo, seonsaengnim.', id: 'Halo, Pak/Bu Guru.' }
    },
    {
      word: '안녕',
      romanization: 'annyeong',
      meaning: 'halo / sampai jumpa (informal)',
      theme: 'greetings', level: 'TOPIK1',
      example: { kr: '친구야, 안녕!', roman: 'Chinguya, annyeong!', id: 'Hei teman, halo!' }
    },
    {
      word: '감사합니다',
      romanization: 'gamsahamnida',
      meaning: 'terima kasih (sangat formal)',
      theme: 'greetings', level: 'TOPIK1',
      example: { kr: '도와주셔서 감사합니다.', roman: 'Dowajusyeoseo gamsahamnida.', id: 'Terima kasih sudah membantu.' }
    },
    {
      word: '고마워요',
      romanization: 'gomawoyo',
      meaning: 'terima kasih (sopan-informal)',
      theme: 'greetings', level: 'TOPIK1',
      example: { kr: '선물 고마워요!', roman: 'Seonmul gomawoyo!', id: 'Terima kasih hadiahnya!' }
    },
    {
      word: '죄송합니다',
      romanization: 'joesonghamnida',
      meaning: 'maaf (sangat formal)',
      theme: 'greetings', level: 'TOPIK1',
      example: { kr: '늦어서 죄송합니다.', roman: 'Neujeoseo joesonghamnida.', id: 'Maaf karena terlambat.' }
    },
    {
      word: '미안해요',
      romanization: 'mianhaeyo',
      meaning: 'maaf (sopan-informal)',
      theme: 'greetings', level: 'TOPIK1',
      example: { kr: '미안해요, 제 실수예요.', roman: 'Mianhaeyo, je silsuyeyo.', id: 'Maaf, itu kesalahan saya.' }
    },
    {
      word: '괜찮아요',
      romanization: 'gwaenchanayo',
      meaning: 'tidak apa-apa / baik-baik saja',
      theme: 'greetings', level: 'TOPIK1',
      example: { kr: '괜찮아요, 걱정 마세요.', roman: 'Gwaenchanayo, geokjeong maseyo.', id: 'Tidak apa-apa, jangan khawatir.' }
    },
    {
      word: '잘 지내요?',
      romanization: 'jal jinaeyo?',
      meaning: 'apa kabar?',
      theme: 'greetings', level: 'TOPIK1',
      example: { kr: '잘 지내요? 저는 잘 지내요!', roman: 'Jal jinaeyo? Jeoneun jal jinaeyo!', id: 'Apa kabar? Saya baik!' }
    },
    {
      word: '안녕히 가세요',
      romanization: 'annyeonghi gaseyo',
      meaning: 'selamat jalan (dikatakan oleh yang tinggal)',
      theme: 'greetings', level: 'TOPIK1',
      example: { kr: '내일 봐요! 안녕히 가세요.', roman: 'Naeil bwayo! Annyeonghi gaseyo.', id: 'Sampai jumpa besok! Selamat jalan.' }
    },
    {
      word: '처음 뵙겠습니다',
      romanization: 'cheoeum boepgesseumnida',
      meaning: 'senang bertemu pertama kali (sangat formal)',
      theme: 'greetings', level: 'TOPIK1',
      example: { kr: '처음 뵙겠습니다. 김민준이라고 합니다.', roman: 'Cheoeum boepgesseumnida. Gimminijunirago hamnida.', id: 'Senang bertemu Anda. Nama saya Kim Minjun.' }
    },

    // ── Family 👨‍👩‍👧‍👦 ──────────────────────────────────────────────────────────
    {
      word: '가족',
      romanization: 'gajok',
      meaning: 'keluarga',
      theme: 'family', level: 'TOPIK1',
      example: { kr: '우리 가족은 넷이에요.', roman: 'Uri gajogeun nesieyo.', id: 'Keluarga kami berempat.' }
    },
    {
      word: '아버지',
      romanization: 'abeoji',
      meaning: 'ayah',
      theme: 'family', level: 'TOPIK1',
      example: { kr: '아버지는 회사원이에요.', roman: 'Abeojineun hoesawoniyeyo.', id: 'Ayah adalah karyawan kantor.' }
    },
    {
      word: '어머니',
      romanization: 'eomeoni',
      meaning: 'ibu',
      theme: 'family', level: 'TOPIK1',
      example: { kr: '어머니는 요리를 잘 해요.', roman: 'Eomeonineun yorireul jal haeyo.', id: 'Ibu pandai memasak.' }
    },
    {
      word: '형',
      romanization: 'hyeong',
      meaning: 'kakak laki-laki (sebutan laki-laki)',
      theme: 'family', level: 'TOPIK1',
      example: { kr: '형이 대학생이에요.', roman: 'Hyeongi daehaksaengiyeyo.', id: 'Kakak laki-laki adalah mahasiswa.' }
    },
    {
      word: '언니',
      romanization: 'eonni',
      meaning: 'kakak perempuan (sebutan perempuan)',
      theme: 'family', level: 'TOPIK1',
      example: { kr: '언니가 예뻐요.', roman: 'Eonniga yeppeoyo.', id: 'Kakak perempuan cantik.' }
    },
    {
      word: '동생',
      romanization: 'dongsaeng',
      meaning: 'adik (laki-laki atau perempuan)',
      theme: 'family', level: 'TOPIK1',
      example: { kr: '동생이 귀여워요.', roman: 'Dongsaengi gwiyeowoyo.', id: 'Adik lucu.' }
    },
    {
      word: '할머니',
      romanization: 'halmeoni',
      meaning: 'nenek',
      theme: 'family', level: 'TOPIK1',
      example: { kr: '할머니가 건강하세요.', roman: 'Halmeoni-ga geonganghaseyo.', id: 'Nenek sehat.' }
    },
    {
      word: '할아버지',
      romanization: 'harabeoji',
      meaning: 'kakek',
      theme: 'family', level: 'TOPIK1',
      example: { kr: '할아버지는 정원을 좋아하세요.', roman: 'Harabeojineun jeongwoneul joahaseyo.', id: 'Kakek suka taman.' }
    },
    {
      word: '남편',
      romanization: 'nampyeon',
      meaning: 'suami',
      theme: 'family', level: 'TOPIK2',
      example: { kr: '남편이 요리를 해요.', roman: 'Nampyeoni yorireul haeyo.', id: 'Suami memasak.' }
    },
    {
      word: '아내',
      romanization: 'anae',
      meaning: 'istri',
      theme: 'family', level: 'TOPIK2',
      example: { kr: '아내가 선생님이에요.', roman: 'Anaega seonsaengnimiyo.', id: 'Istri adalah guru.' }
    },

    // ── Food 🍜 ────────────────────────────────────────────────────────────────
    {
      word: '밥',
      romanization: 'bap',
      meaning: 'nasi / makan',
      theme: 'food', level: 'TOPIK1',
      example: { kr: '밥을 먹어요.', roman: 'Babeul meogeoyo.', id: 'Makan nasi.' }
    },
    {
      word: '물',
      romanization: 'mul',
      meaning: 'air',
      theme: 'food', level: 'TOPIK1',
      example: { kr: '물을 마셔요.', roman: 'Mureul mashyeoyo.', id: 'Minum air.' }
    },
    {
      word: '커피',
      romanization: 'keopi',
      meaning: 'kopi',
      theme: 'food', level: 'TOPIK1',
      example: { kr: '커피 한 잔 주세요.', roman: 'Keopi han jan juseyo.', id: 'Tolong satu cangkir kopi.' }
    },
    {
      word: '김치',
      romanization: 'gimchi',
      meaning: 'kimchi',
      theme: 'food', level: 'TOPIK1',
      example: { kr: '김치는 맛있어요.', roman: 'Gimchineun massisseoyo.', id: 'Kimchi enak.' }
    },
    {
      word: '불고기',
      romanization: 'bulgogi',
      meaning: 'bulgogi (daging panggang bumbu)',
      theme: 'food', level: 'TOPIK1',
      example: { kr: '불고기가 제일 좋아요.', roman: 'Bulgogiga jeil joayo.', id: 'Bulgogi paling saya suka.' }
    },
    {
      word: '비빔밥',
      romanization: 'bibimbap',
      meaning: 'bibimbap (nasi campur)',
      theme: 'food', level: 'TOPIK1',
      example: { kr: '비빔밥 주세요.', roman: 'Bibimbap juseyo.', id: 'Tolong (satu) bibimbap.' }
    },
    {
      word: '떡볶이',
      romanization: 'tteokbokki',
      meaning: 'tteokbokki (kue beras pedas)',
      theme: 'food', level: 'TOPIK1',
      example: { kr: '떡볶이가 매워요.', roman: 'Tteokbokkiga maewoyo.', id: 'Tteokbokki pedas.' }
    },
    {
      word: '맛있다',
      romanization: 'masitda',
      meaning: 'enak / lezat',
      theme: 'food', level: 'TOPIK1',
      example: { kr: '이 음식은 정말 맛있어요!', roman: 'I eumsigeneun jeongmal massisseoyo!', id: 'Makanan ini benar-benar enak!' }
    },
    {
      word: '맵다',
      romanization: 'maepda',
      meaning: 'pedas',
      theme: 'food', level: 'TOPIK1',
      example: { kr: '이 음식 너무 매워요.', roman: 'I eumsig neomu maewoyo.', id: 'Makanan ini terlalu pedas.' }
    },
    {
      word: '배고프다',
      romanization: 'baegopuda',
      meaning: 'lapar',
      theme: 'food', level: 'TOPIK1',
      example: { kr: '배고파요. 밥 먹어요.', roman: 'Baegopayo. Bap meogeoyo.', id: 'Lapar. Mari makan.' }
    },

    // ── Time 🕐 ────────────────────────────────────────────────────────────────
    {
      word: '오늘',
      romanization: 'oneul',
      meaning: 'hari ini',
      theme: 'time', level: 'TOPIK1',
      example: { kr: '오늘 날씨가 좋아요.', roman: 'Oneul nalssiga joayo.', id: 'Cuaca hari ini bagus.' }
    },
    {
      word: '내일',
      romanization: 'naeil',
      meaning: 'besok',
      theme: 'time', level: 'TOPIK1',
      example: { kr: '내일 만나요.', roman: 'Naeil mannayo.', id: 'Bertemu besok ya.' }
    },
    {
      word: '어제',
      romanization: 'eoje',
      meaning: 'kemarin',
      theme: 'time', level: 'TOPIK1',
      example: { kr: '어제 영화를 봤어요.', roman: 'Eoje yeonghwareul bwassseoyo.', id: 'Kemarin nonton film.' }
    },
    {
      word: '지금',
      romanization: 'jigeum',
      meaning: 'sekarang',
      theme: 'time', level: 'TOPIK1',
      example: { kr: '지금 몇 시예요?', roman: 'Jigeum myeot siyeyo?', id: 'Sekarang jam berapa?' }
    },
    {
      word: '아침',
      romanization: 'achim',
      meaning: 'pagi / sarapan',
      theme: 'time', level: 'TOPIK1',
      example: { kr: '아침 일찍 일어나요.', roman: 'Achim iljjik ireonayo.', id: 'Bangun pagi-pagi.' }
    },
    {
      word: '점심',
      romanization: 'jeomsim',
      meaning: 'siang / makan siang',
      theme: 'time', level: 'TOPIK1',
      example: { kr: '점심에 뭐 먹어요?', roman: 'Jeomsime mwo meogeoyo?', id: 'Makan apa saat siang?' }
    },
    {
      word: '저녁',
      romanization: 'jeonyeok',
      meaning: 'malam / makan malam',
      theme: 'time', level: 'TOPIK1',
      example: { kr: '저녁 같이 먹어요.', roman: 'Jeonyeok gachi meogeoyo.', id: 'Makan malam bersama.' }
    },
    {
      word: '주말',
      romanization: 'jumal',
      meaning: 'akhir pekan',
      theme: 'time', level: 'TOPIK1',
      example: { kr: '주말에 뭐 해요?', roman: 'Jumale mwo haeyo?', id: 'Mau ngapain di akhir pekan?' }
    },

    // ── Places 📍 ─────────────────────────────────────────────────────────────
    {
      word: '학교',
      romanization: 'hakgyo',
      meaning: 'sekolah',
      theme: 'places', level: 'TOPIK1',
      example: { kr: '학교에 가요.', roman: 'Hakgyoe gayo.', id: 'Pergi ke sekolah.' }
    },
    {
      word: '집',
      romanization: 'jip',
      meaning: 'rumah',
      theme: 'places', level: 'TOPIK1',
      example: { kr: '집에 있어요.', roman: 'Jibe isseoyo.', id: 'Ada di rumah.' }
    },
    {
      word: '병원',
      romanization: 'byeongwon',
      meaning: 'rumah sakit',
      theme: 'places', level: 'TOPIK1',
      example: { kr: '병원에 가야 해요.', roman: 'Byeongwone gaya haeyo.', id: 'Harus pergi ke rumah sakit.' }
    },
    {
      word: '식당',
      romanization: 'sikdang',
      meaning: 'restoran / kantin',
      theme: 'places', level: 'TOPIK1',
      example: { kr: '식당에서 밥을 먹어요.', roman: 'Sikdangeseo babeul meogeoyo.', id: 'Makan di restoran.' }
    },
    {
      word: '은행',
      romanization: 'eunhaeng',
      meaning: 'bank',
      theme: 'places', level: 'TOPIK1',
      example: { kr: '은행에서 돈을 찾아요.', roman: 'Eunhaengeseo doneul chajayo.', id: 'Ambil uang di bank.' }
    },
    {
      word: '편의점',
      romanization: 'pyeoniejeom',
      meaning: 'toko serba ada / convenience store',
      theme: 'places', level: 'TOPIK1',
      example: { kr: '편의점에서 물을 사요.', roman: 'Pyeoniejeomeseo mureul sayo.', id: 'Beli air di convenience store.' }
    },
    {
      word: '공항',
      romanization: 'gonghang',
      meaning: 'bandara',
      theme: 'places', level: 'TOPIK1',
      example: { kr: '공항에 가야 해요.', roman: 'Gonghan-ge gaya haeyo.', id: 'Harus pergi ke bandara.' }
    },
    {
      word: '화장실',
      romanization: 'hwajangsil',
      meaning: 'toilet / kamar mandi',
      theme: 'places', level: 'TOPIK1',
      example: { kr: '화장실이 어디에 있어요?', roman: 'Hwajangsilyi eodiye isseoyo?', id: 'Di mana toiletnya?' }
    },

    // ── Transport 🚌 ──────────────────────────────────────────────────────────
    {
      word: '지하철',
      romanization: 'jihacheol',
      meaning: 'kereta bawah tanah / MRT',
      theme: 'transport', level: 'TOPIK1',
      example: { kr: '지하철을 타요.', roman: 'Jihacheoreul tayo.', id: 'Naik MRT.' }
    },
    {
      word: '버스',
      romanization: 'beoseu',
      meaning: 'bus',
      theme: 'transport', level: 'TOPIK1',
      example: { kr: '버스를 타고 가요.', roman: 'Beoseureul tago gayo.', id: 'Pergi naik bus.' }
    },
    {
      word: '택시',
      romanization: 'taeksi',
      meaning: 'taksi',
      theme: 'transport', level: 'TOPIK1',
      example: { kr: '택시를 불러요.', roman: 'Taeksireul bulleoyo.', id: 'Memanggil taksi.' }
    },
    {
      word: '기차',
      romanization: 'gicha',
      meaning: 'kereta api',
      theme: 'transport', level: 'TOPIK1',
      example: { kr: '기차를 타고 부산에 가요.', roman: 'Gichareul tago Busane gayo.', id: 'Naik kereta ke Busan.' }
    },
    {
      word: '비행기',
      romanization: 'bihaenggi',
      meaning: 'pesawat terbang',
      theme: 'transport', level: 'TOPIK1',
      example: { kr: '비행기로 여행해요.', roman: 'Bihaenggiro yeohaenghaeyo.', id: 'Bepergian dengan pesawat.' }
    },
    {
      word: '자전거',
      romanization: 'jajeongeo',
      meaning: 'sepeda',
      theme: 'transport', level: 'TOPIK1',
      example: { kr: '자전거를 타요.', roman: 'Jajeongoreul tayo.', id: 'Naik sepeda.' }
    },

    // ── Shopping 🛍️ ───────────────────────────────────────────────────────────
    {
      word: '얼마예요?',
      romanization: 'eolmayeyo?',
      meaning: 'berapa harganya?',
      theme: 'shopping', level: 'TOPIK1',
      example: { kr: '이거 얼마예요?', roman: 'Igeo eolmayeyo?', id: 'Ini berapa harganya?' }
    },
    {
      word: '싸다',
      romanization: 'ssada',
      meaning: 'murah',
      theme: 'shopping', level: 'TOPIK1',
      example: { kr: '이거 정말 싸요!', roman: 'Igeo jeongmal ssayo!', id: 'Ini benar-benar murah!' }
    },
    {
      word: '비싸다',
      romanization: 'bissada',
      meaning: 'mahal',
      theme: 'shopping', level: 'TOPIK1',
      example: { kr: '이 가방은 너무 비싸요.', roman: 'I gabangeun neomu bissayo.', id: 'Tas ini terlalu mahal.' }
    },
    {
      word: '할인',
      romanization: 'halin',
      meaning: 'diskon',
      theme: 'shopping', level: 'TOPIK1',
      example: { kr: '할인이 있어요?', roman: 'Halini isseoyo?', id: 'Ada diskon?' }
    },
    {
      word: '영수증',
      romanization: 'yeongsujeung',
      meaning: 'kwitansi / struk',
      theme: 'shopping', level: 'TOPIK2',
      example: { kr: '영수증 주세요.', roman: 'Yeongsujeung juseyo.', id: 'Tolong kwitansinya.' }
    },

    // ── Weather ⛅ ─────────────────────────────────────────────────────────────
    {
      word: '날씨',
      romanization: 'nalssi',
      meaning: 'cuaca',
      theme: 'weather', level: 'TOPIK1',
      example: { kr: '오늘 날씨가 어때요?', roman: 'Oneul nalssiga eottaeyo?', id: 'Bagaimana cuaca hari ini?' }
    },
    {
      word: '덥다',
      romanization: 'deopda',
      meaning: 'panas',
      theme: 'weather', level: 'TOPIK1',
      example: { kr: '여름에 너무 더워요.', roman: 'Yeoreume neomu deowoyo.', id: 'Di musim panas sangat panas.' }
    },
    {
      word: '춥다',
      romanization: 'chupda',
      meaning: 'dingin',
      theme: 'weather', level: 'TOPIK1',
      example: { kr: '겨울에 너무 추워요.', roman: 'Gyeowure neomu chuwoyo.', id: 'Di musim dingin sangat dingin.' }
    },
    {
      word: '비',
      romanization: 'bi',
      meaning: 'hujan',
      theme: 'weather', level: 'TOPIK1',
      example: { kr: '비가 와요.', roman: 'Biga wayo.', id: 'Hujan turun.' }
    },
    {
      word: '눈',
      romanization: 'nun',
      meaning: 'salju / mata',
      theme: 'weather', level: 'TOPIK1',
      example: { kr: '눈이 내려요.', roman: 'Nuni naeryeoyo.', id: 'Salju turun.' }
    },
    {
      word: '바람',
      romanization: 'baram',
      meaning: 'angin',
      theme: 'weather', level: 'TOPIK1',
      example: { kr: '바람이 강해요.', roman: 'Barami ganghaeyo.', id: 'Anginnya kencang.' }
    },

    // ── Body & Health 🏥 ───────────────────────────────────────────────────────
    {
      word: '머리',
      romanization: 'meori',
      meaning: 'kepala / rambut',
      theme: 'body', level: 'TOPIK1',
      example: { kr: '머리가 아파요.', roman: 'Meoriga apayo.', id: 'Kepala sakit.' }
    },
    {
      word: '손',
      romanization: 'son',
      meaning: 'tangan',
      theme: 'body', level: 'TOPIK1',
      example: { kr: '손을 씻어요.', roman: 'Soneul ssiseoyo.', id: 'Cuci tangan.' }
    },
    {
      word: '눈',
      romanization: 'nun',
      meaning: 'mata',
      theme: 'body', level: 'TOPIK1',
      example: { kr: '눈이 피로해요.', roman: 'Nuni pirohaeyo.', id: 'Mata lelah.' }
    },
    {
      word: '아프다',
      romanization: 'apeuda',
      meaning: 'sakit',
      theme: 'body', level: 'TOPIK1',
      example: { kr: '배가 아파요.', roman: 'Baega apayo.', id: 'Sakit perut.' }
    },
    {
      word: '약',
      romanization: 'yak',
      meaning: 'obat',
      theme: 'body', level: 'TOPIK1',
      example: { kr: '약을 먹어요.', roman: 'Yageul meogeoyo.', id: 'Minum obat.' }
    },
    {
      word: '의사',
      romanization: 'uisa',
      meaning: 'dokter',
      theme: 'body', level: 'TOPIK1',
      example: { kr: '의사 선생님이에요.', roman: 'Uisa seonsaengnimieyeyo.', id: 'Dia adalah dokter.' }
    },
    {
      word: '피곤하다',
      romanization: 'pigonhada',
      meaning: 'lelah / capek',
      theme: 'body', level: 'TOPIK1',
      example: { kr: '오늘 너무 피곤해요.', roman: 'Oneul neomu pigonhaeyo.', id: 'Hari ini sangat lelah.' }
    },

    // ── School 📚 ─────────────────────────────────────────────────────────────
    {
      word: '공부하다',
      romanization: 'gongbuhada',
      meaning: 'belajar',
      theme: 'school', level: 'TOPIK1',
      example: { kr: '열심히 공부해요.', roman: 'Yeolsimhi gongbuhaeyo.', id: 'Belajar dengan sungguh-sungguh.' }
    },
    {
      word: '책',
      romanization: 'chaek',
      meaning: 'buku',
      theme: 'school', level: 'TOPIK1',
      example: { kr: '책을 읽어요.', roman: 'Chaekeul ilgeoyo.', id: 'Membaca buku.' }
    },
    {
      word: '선생님',
      romanization: 'seonsaengnim',
      meaning: 'guru / pak/bu guru',
      theme: 'school', level: 'TOPIK1',
      example: { kr: '선생님이 설명해요.', roman: 'Seonsaengnimyi seolmyeonghaeyo.', id: 'Guru menjelaskan.' }
    },
    {
      word: '학생',
      romanization: 'haksaeng',
      meaning: 'pelajar / murid',
      theme: 'school', level: 'TOPIK1',
      example: { kr: '저는 학생이에요.', roman: 'Jeoneun haksaengiyeyo.', id: 'Saya adalah pelajar.' }
    },
    {
      word: '숙제',
      romanization: 'sukje',
      meaning: 'pekerjaan rumah / PR',
      theme: 'school', level: 'TOPIK1',
      example: { kr: '숙제를 해요.', roman: 'Sukjereul haeyo.', id: 'Mengerjakan PR.' }
    },
    {
      word: '시험',
      romanization: 'siheom',
      meaning: 'ujian / tes',
      theme: 'school', level: 'TOPIK1',
      example: { kr: '시험이 어려워요.', roman: 'Siheomi eoryeowoyo.', id: 'Ujiannya sulit.' }
    },
    {
      word: '대학교',
      romanization: 'daehakgyo',
      meaning: 'universitas',
      theme: 'school', level: 'TOPIK1',
      example: { kr: '대학교에 다녀요.', roman: 'Daehakgyoe danyeoyo.', id: 'Kuliah di universitas.' }
    },

    // ── Work 💼 ───────────────────────────────────────────────────────────────
    {
      word: '일',
      romanization: 'il',
      meaning: 'pekerjaan / kerja',
      theme: 'work', level: 'TOPIK1',
      example: { kr: '일을 해요.', roman: 'Ireul haeyo.', id: 'Bekerja.' }
    },
    {
      word: '회사',
      romanization: 'hoesa',
      meaning: 'perusahaan / kantor',
      theme: 'work', level: 'TOPIK1',
      example: { kr: '회사에 다녀요.', roman: 'Hoesae danyeoyo.', id: 'Pergi ke kantor.' }
    },
    {
      word: '직업',
      romanization: 'jigeop',
      meaning: 'pekerjaan / profesi',
      theme: 'work', level: 'TOPIK1',
      example: { kr: '직업이 뭐예요?', roman: 'Jigeobi mwoyeyo?', id: 'Apa pekerjaannya?' }
    },
    {
      word: '월급',
      romanization: 'wolgeum',
      meaning: 'gaji bulanan',
      theme: 'work', level: 'TOPIK2',
      example: { kr: '월급이 나왔어요.', roman: 'Wolgeumiyo nawasseoyo.', id: 'Gaji sudah keluar.' }
    },
    {
      word: '회의',
      romanization: 'hoeuyi',
      meaning: 'rapat / pertemuan',
      theme: 'work', level: 'TOPIK2',
      example: { kr: '오늘 회의가 있어요.', roman: 'Oneul hoeuyiga isseoyo.', id: 'Hari ini ada rapat.' }
    },

    // ── Hobby 🎨 ──────────────────────────────────────────────────────────────
    {
      word: '영화',
      romanization: 'yeonghwa',
      meaning: 'film',
      theme: 'hobby', level: 'TOPIK1',
      example: { kr: '영화를 봐요.', roman: 'Yeonghwareul bwayo.', id: 'Nonton film.' }
    },
    {
      word: '음악',
      romanization: 'eumak',
      meaning: 'musik',
      theme: 'hobby', level: 'TOPIK1',
      example: { kr: '음악을 들어요.', roman: 'Eumageul deoreoyo.', id: 'Mendengarkan musik.' }
    },
    {
      word: '운동',
      romanization: 'undong',
      meaning: 'olahraga',
      theme: 'hobby', level: 'TOPIK1',
      example: { kr: '매일 운동해요.', roman: 'Maeil undonghaeyo.', id: 'Olahraga setiap hari.' }
    },
    {
      word: '여행',
      romanization: 'yeohaeng',
      meaning: 'perjalanan / wisata',
      theme: 'hobby', level: 'TOPIK1',
      example: { kr: '한국 여행을 해요.', roman: 'Hanguk yeohaengeul haeyo.', id: 'Berwisata ke Korea.' }
    },
    {
      word: '독서',
      romanization: 'dokseo',
      meaning: 'membaca buku',
      theme: 'hobby', level: 'TOPIK2',
      example: { kr: '독서를 좋아해요.', roman: 'Dokseoreul joahaeyo.', id: 'Suka membaca buku.' }
    },
    {
      word: 'K-팝',
      romanization: 'K-pop',
      meaning: 'K-Pop (musik pop Korea)',
      theme: 'hobby', level: 'TOPIK1',
      example: { kr: 'K-팝을 좋아해요.', roman: 'K-pobeul joahaeyo.', id: 'Suka K-Pop.' }
    },

    // ── Feelings 😊 ───────────────────────────────────────────────────────────
    {
      word: '기쁘다',
      romanization: 'gippeuda',
      meaning: 'gembira / senang',
      theme: 'feelings', level: 'TOPIK1',
      example: { kr: '오늘 너무 기뻐요!', roman: 'Oneul neomu gippeoyo!', id: 'Hari ini sangat senang!' }
    },
    {
      word: '슬프다',
      romanization: 'seulpeuda',
      meaning: 'sedih',
      theme: 'feelings', level: 'TOPIK1',
      example: { kr: '영화를 보고 슬펐어요.', roman: 'Yeonghwareul bogo seulpeosseoyo.', id: 'Setelah nonton film jadi sedih.' }
    },
    {
      word: '화나다',
      romanization: 'hwanada',
      meaning: 'marah',
      theme: 'feelings', level: 'TOPIK1',
      example: { kr: '왜 화가 났어요?', roman: 'Wae hwaga nasseoyo?', id: 'Kenapa marah?' }
    },
    {
      word: '무섭다',
      romanization: 'museopda',
      meaning: 'takut / menakutkan',
      theme: 'feelings', level: 'TOPIK1',
      example: { kr: '귀신이 무서워요.', roman: 'Gwisini museowoyo.', id: 'Takut hantu.' }
    },
    {
      word: '좋아하다',
      romanization: 'joahada',
      meaning: 'menyukai',
      theme: 'feelings', level: 'TOPIK1',
      example: { kr: '한국어를 좋아해요.', roman: 'Hangugereul joahaeyo.', id: 'Suka bahasa Korea.' }
    },
    {
      word: '사랑하다',
      romanization: 'saranghada',
      meaning: 'mencintai',
      theme: 'feelings', level: 'TOPIK1',
      example: { kr: '사랑해요!', roman: 'Saranghaeyo!', id: 'Saya cinta kamu!' }
    },

    // ── Colors 🎨 ─────────────────────────────────────────────────────────────
    {
      word: '빨간색',
      romanization: 'ppalgan-saek',
      meaning: 'warna merah',
      theme: 'colors', level: 'TOPIK1',
      example: { kr: '빨간색 옷을 입어요.', roman: 'Ppalgan-saek oseul ibeoyo.', id: 'Pakai baju merah.' }
    },
    {
      word: '파란색',
      romanization: 'paran-saek',
      meaning: 'warna biru',
      theme: 'colors', level: 'TOPIK1',
      example: { kr: '파란색 하늘이에요.', roman: 'Paran-saek haneulieyeyo.', id: 'Langit berwarna biru.' }
    },
    {
      word: '노란색',
      romanization: 'noran-saek',
      meaning: 'warna kuning',
      theme: 'colors', level: 'TOPIK1',
      example: { kr: '노란색 꽃이 예뻐요.', roman: 'Noran-saek kkochi yeppeoyo.', id: 'Bunga kuning cantik.' }
    },
    {
      word: '하얀색',
      romanization: 'hayan-saek',
      meaning: 'warna putih',
      theme: 'colors', level: 'TOPIK1',
      example: { kr: '하얀색 눈이 내려요.', roman: 'Hayan-saek nuni naeryeoyo.', id: 'Salju putih turun.' }
    },
    {
      word: '검은색',
      romanization: 'geomneun-saek',
      meaning: 'warna hitam',
      theme: 'colors', level: 'TOPIK1',
      example: { kr: '검은색 가방이에요.', roman: 'Geomneun-saek gaban-giyeyo.', id: 'Tas berwarna hitam.' }
    },
    {
      word: '초록색',
      romanization: 'chorok-saek',
      meaning: 'warna hijau',
      theme: 'colors', level: 'TOPIK1',
      example: { kr: '초록색 잎이 예뻐요.', roman: 'Chorok-saek ipi yeppeoyo.', id: 'Daun hijau cantik.' }
    },

    // ── Numbers 🔢 ────────────────────────────────────────────────────────────
    {
      word: '일',
      romanization: 'il',
      meaning: '1 (satu - sistem Sino-Korea)',
      theme: 'numbers', level: 'TOPIK1',
      example: { kr: '일 층이에요.', roman: 'Il cheungieyeyo.', id: 'Ini lantai satu.' }
    },
    {
      word: '이',
      romanization: 'i',
      meaning: '2 (dua - sistem Sino-Korea)',
      theme: 'numbers', level: 'TOPIK1',
      example: { kr: '이 층에 있어요.', roman: 'I cheunge isseoyo.', id: 'Ada di lantai dua.' }
    },
    {
      word: '삼',
      romanization: 'sam',
      meaning: '3 (tiga - sistem Sino-Korea)',
      theme: 'numbers', level: 'TOPIK1',
      example: { kr: '삼 월이에요.', roman: 'Sam worieyeyo.', id: 'Ini bulan Maret.' }
    },
    {
      word: '하나',
      romanization: 'hana',
      meaning: '1 (satu - sistem Korea asli)',
      theme: 'numbers', level: 'TOPIK1',
      example: { kr: '하나 주세요.', roman: 'Hana juseyo.', id: 'Tolong satu.' }
    },
    {
      word: '둘',
      romanization: 'dul',
      meaning: '2 (dua - sistem Korea asli)',
      theme: 'numbers', level: 'TOPIK1',
      example: { kr: '사람이 둘이에요.', roman: 'Sarami durieyeyo.', id: 'Orangnya dua.' }
    },
    {
      word: '백',
      romanization: 'baek',
      meaning: '100 (seratus)',
      theme: 'numbers', level: 'TOPIK1',
      example: { kr: '백 원이에요.', roman: 'Baek woniyeyo.', id: 'Seratus won.' }
    },
    {
      word: '만',
      romanization: 'man',
      meaning: '10.000 (sepuluh ribu)',
      theme: 'numbers', level: 'TOPIK1',
      example: { kr: '만 원이에요.', roman: 'Man woniyeyo.', id: 'Sepuluh ribu won.' }
    },
  ];

  return {
    getAll: () => vocab,
    getThemes: () => themes,
    getByTheme: (themeId) => vocab.filter(v => v.theme === themeId),
    getByLevel: (level) => vocab.filter(v => v.level === level),
  };

})();
