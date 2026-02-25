/**
 * Lingora — Data Dialog Bahasa Korea
 * Fase 21.2 — 6 dialog situasional TOPIK I
 * Format: { id, situasi, icon, level, deskripsi, lines:[{speaker, kr, roman, id}], vocab:[{kr,roman,id}] }
 * Romanisasi: Revised Romanization (표준 로마자 표기법)
 */
const KR_DIALOGS = [
  {
    id: 'perkenalan',
    situasi: 'Perkenalan Diri',
    icon: '👋',
    level: 'TOPIK I',
    deskripsi: 'Percakapan saat berkenalan pertama kali dalam situasi formal-kasual.',
    lines: [
      {
        speaker: 'A',
        kr: '안녕하세요! 처음 뵙겠습니다.',
        roman: 'Annyeonghaseyo! Cheoeum boepgesseumnida.',
        id: 'Halo! Senang bertemu pertama kali.'
      },
      {
        speaker: 'B',
        kr: '안녕하세요! 반갑습니다.',
        roman: 'Annyeonghaseyo! Bangapseumnida.',
        id: 'Halo! Senang bertemu juga.'
      },
      {
        speaker: 'A',
        kr: '제 이름은 리나예요. 인도네시아 사람이에요.',
        roman: 'Je ireumeun Linayeyo. Indonesiya saramieyeyo.',
        id: 'Nama saya Lina. Saya orang Indonesia.'
      },
      {
        speaker: 'B',
        kr: '아, 그래요? 저는 김민준이에요. 한국 사람이에요.',
        roman: 'A, geulaeyo? Jeoneun Gimminijunieyeyo. Hanguk saramieyeyo.',
        id: 'Oh, begitu? Saya Kim Minjun. Saya orang Korea.'
      },
      {
        speaker: 'A',
        kr: '직업이 뭐예요?',
        roman: 'Jigeobi mwoyeyo?',
        id: 'Apa pekerjaan Anda?'
      },
      {
        speaker: 'B',
        kr: '저는 회사원이에요. 리나 씨는요?',
        roman: 'Jeoneun hoesawonieyeyo. Lina ssineunyeo?',
        id: 'Saya karyawan. Bagaimana dengan Lina?'
      },
      {
        speaker: 'A',
        kr: '저는 대학생이에요. 한국어를 배우고 있어요.',
        roman: 'Jeoneun daehaksaengiyeyo. Hangugeoreul baeugo isseoyo.',
        id: 'Saya mahasiswi. Sedang belajar bahasa Korea.'
      },
      {
        speaker: 'B',
        kr: '와, 한국어 정말 잘 하시네요!',
        roman: 'Wa, Hangugeo jeongmal jal hasineyyo!',
        id: 'Wah, bahasa Koreanya benar-benar bagus!'
      },
      {
        speaker: 'A',
        kr: '아니에요, 아직 많이 부족해요. 잘 부탁드립니다!',
        roman: 'Anieyo, ajik mani bujokaeyo. Jal butakdeuripsida!',
        id: 'Tidak, masih banyak kurangnya. Mohon bimbingannya!'
      },
    ],
    vocab: [
      { kr: '처음 뵙겠습니다', roman: 'cheoeum boepgesseumnida', id: 'senang bertemu pertama kali' },
      { kr: '반갑습니다', roman: 'bangapseumnida', id: 'senang bertemu' },
      { kr: '직업', roman: 'jigeop', id: 'pekerjaan' },
      { kr: '씨', roman: 'ssi', id: 'sebutan sopan (seperti Pak/Bu/Mas/Mba)' },
      { kr: '잘 부탁드립니다', roman: 'jal butakdeuripsida', id: 'mohon bimbingannya (sangat formal)' },
    ]
  },

  {
    id: 'restoran',
    situasi: 'Di Restoran',
    icon: '🍽️',
    level: 'TOPIK I',
    deskripsi: 'Percakapan saat memesan makanan di restoran Korea.',
    lines: [
      {
        speaker: 'A',
        kr: '어서 오세요! 몇 분이세요?',
        roman: 'Eoseo oseyo! Myeot buniseyo?',
        id: 'Selamat datang! Berapa orang?'
      },
      {
        speaker: 'B',
        kr: '두 명이요.',
        roman: 'Du myeongiyo.',
        id: 'Dua orang.'
      },
      {
        speaker: 'A',
        kr: '이쪽으로 앉으세요. 메뉴판 드릴까요?',
        roman: 'Ijjogeuro anjeuseyo. Menyupan deurilkkayo?',
        id: 'Silakan duduk di sini. Mau saya bawakan menu?'
      },
      {
        speaker: 'B',
        kr: '네, 주세요.',
        roman: 'Ne, juseyo.',
        id: 'Ya, tolong.'
      },
      {
        speaker: 'A',
        kr: '주문 받을까요?',
        roman: 'Jumun badeulkkayo?',
        id: 'Boleh saya ambil pesanannya?'
      },
      {
        speaker: 'B',
        kr: '비빔밥 하나하고 김치찌개 하나 주세요.',
        roman: 'Bibimbap hannahago gimchijjigae hana juseyo.',
        id: 'Satu bibimbap dan satu kimchi jjigae, tolong.'
      },
      {
        speaker: 'A',
        kr: '음료는요?',
        roman: 'Eumnyoneunyo?',
        id: 'Minumannya?'
      },
      {
        speaker: 'B',
        kr: '물만 주세요.',
        roman: 'Mulman juseyo.',
        id: 'Air putih saja, tolong.'
      },
      {
        speaker: 'B',
        kr: '저기요! 계산해 주세요.',
        roman: 'Jeogiyo! Gyesanhae juseyo.',
        id: 'Permisi! Tolong saya bayar.'
      },
      {
        speaker: 'A',
        kr: '모두 이만 원입니다. 카드 되세요?',
        roman: 'Modu iman wonimnida. Kadeu doeseyo?',
        id: 'Total dua puluh ribu won. Bisa kartu?'
      },
      {
        speaker: 'B',
        kr: '네, 카드로 할게요.',
        roman: 'Ne, kadeuro halgeyo.',
        id: 'Ya, pakai kartu.'
      },
    ],
    vocab: [
      { kr: '어서 오세요', roman: 'eoseo oseyo', id: 'selamat datang' },
      { kr: '몇 분', roman: 'myeot bun', id: 'berapa orang (honorifik)' },
      { kr: '메뉴판', roman: 'menyupan', id: 'buku menu' },
      { kr: '주문', roman: 'jumun', id: 'pesanan' },
      { kr: '저기요', roman: 'jeogiyo', id: 'permisi (memanggil pelayan)' },
      { kr: '계산', roman: 'gyesan', id: 'pembayaran / hitung' },
    ]
  },

  {
    id: 'arah',
    situasi: 'Arah & Transportasi',
    icon: '🗺️',
    level: 'TOPIK I',
    deskripsi: 'Percakapan saat bertanya arah dan menggunakan transportasi umum.',
    lines: [
      {
        speaker: 'A',
        kr: '실례합니다. 명동역이 어디에 있어요?',
        roman: 'Sillyehamnida. Myeongdongnyeogi eodie isseoyo?',
        id: 'Permisi. Di mana Stasiun Myeongdong?'
      },
      {
        speaker: 'B',
        kr: '이 길로 쭉 가다가 오른쪽으로 돌면 있어요.',
        roman: 'I gillo jjuk gadaga oreunjjogeuro dolmyeon isseoyo.',
        id: 'Lurus di jalan ini, lalu belok kanan.'
      },
      {
        speaker: 'A',
        kr: '걸어서 얼마나 걸려요?',
        roman: 'Georeoseo eolmana geollyeoyo?',
        id: 'Jalan kaki berapa lama?'
      },
      {
        speaker: 'B',
        kr: '한 오 분쯤 걸려요.',
        roman: 'Han o bunjjeum geollyeoyo.',
        id: 'Sekitar lima menit.'
      },
      {
        speaker: 'A',
        kr: '감사합니다! 지하철 몇 호선이에요?',
        roman: 'Gamsahamnida! Jihacheol myeot hosenieyeyo?',
        id: 'Terima kasih! Jalur berapa kereta bawah tanahnya?'
      },
      {
        speaker: 'B',
        kr: '4호선이에요.',
        roman: 'Sahosenieyeyo.',
        id: 'Jalur 4.'
      },
      {
        speaker: 'A',
        kr: '서울역까지 어떻게 가요?',
        roman: 'Seoulyeokkkaji eotteoke gayo?',
        id: 'Bagaimana caranya ke Stasiun Seoul?'
      },
      {
        speaker: 'B',
        kr: '4호선 타고 가다가 1호선으로 갈아타세요.',
        roman: 'Sahoseon tago gadaga ilhoseoneuro garataseyo.',
        id: 'Naik jalur 4 lalu pindah ke jalur 1.'
      },
    ],
    vocab: [
      { kr: '실례합니다', roman: 'sillyehamnida', id: 'permisi / maaf mengganggu' },
      { kr: '쭉', roman: 'jjuk', id: 'lurus' },
      { kr: '오른쪽', roman: 'oreunjjok', id: 'kanan' },
      { kr: '왼쪽', roman: 'oenjjok', id: 'kiri' },
      { kr: '~쯤', roman: '~jjeum', id: 'sekitar / kira-kira' },
      { kr: '갈아타다', roman: 'garatada', id: 'pindah / transit' },
      { kr: '호선', roman: 'hoseon', id: 'jalur / line (kereta)' },
    ]
  },

  {
    id: 'belanja',
    situasi: 'Belanja di Toko',
    icon: '🛍️',
    level: 'TOPIK I',
    deskripsi: 'Percakapan saat berbelanja di toko pakaian atau toko umum.',
    lines: [
      {
        speaker: 'A',
        kr: '어서 오세요! 찾으시는 게 있어요?',
        roman: 'Eoseo oseyo! Chajeuisineun ge isseoyo?',
        id: 'Selamat datang! Ada yang dicari?'
      },
      {
        speaker: 'B',
        kr: '이 티셔츠 있어요? 빨간색으로요.',
        roman: 'I tisyeocheu isseoyo? Ppalgan-saegeuloyo.',
        id: 'Ada kaos ini? Yang warna merah.'
      },
      {
        speaker: 'A',
        kr: '네, 있어요. 사이즈가 어떻게 되세요?',
        roman: 'Ne, isseoyo. Saijeuega eotteoke doeseyo?',
        id: 'Ada. Ukurannya berapa?'
      },
      {
        speaker: 'B',
        kr: '중간 사이즈요.',
        roman: 'Junggan saijeuyo.',
        id: 'Ukuran medium.'
      },
      {
        speaker: 'A',
        kr: '이건 어때요? 요즘 많이 팔려요.',
        roman: 'Igeon eottaeyo? Yojeum mani pallyeoyo.',
        id: 'Bagaimana yang ini? Sekarang banyak yang beli.'
      },
      {
        speaker: 'B',
        kr: '얼마예요?',
        roman: 'Eolmayeyo?',
        id: 'Berapa harganya?'
      },
      {
        speaker: 'A',
        kr: '삼만 원이에요. 지금 세일 중이라 이만오천 원이에요.',
        roman: 'Samman woniyeyo. Jigeum seil jungira imanocheon woniyeyo.',
        id: 'Tiga puluh ribu won. Sedang sale, jadi dua puluh lima ribu won.'
      },
      {
        speaker: 'B',
        kr: '그럼 이걸로 할게요. 카드 돼요?',
        roman: 'Geureom igeollo halgeyo. Kadeu dwaeyo?',
        id: 'Kalau begitu, ambil yang ini. Bisa kartu?'
      },
      {
        speaker: 'A',
        kr: '네, 됩니다. 영수증 필요하세요?',
        roman: 'Ne, doemnida. Yeongsujeung piryohaseyo?',
        id: 'Ya, bisa. Mau kwitansinya?'
      },
      {
        speaker: 'B',
        kr: '네, 주세요.',
        roman: 'Ne, juseyo.',
        id: 'Ya, tolong.'
      },
    ],
    vocab: [
      { kr: '티셔츠', roman: 'tisyeocheu', id: 'kaos' },
      { kr: '사이즈', roman: 'saijeu', id: 'ukuran' },
      { kr: '세일', roman: 'seil', id: 'sale / diskon' },
      { kr: '~로 할게요', roman: '~ro halgeyo', id: 'saya ambil yang ~' },
      { kr: '영수증', roman: 'yeongsujeung', id: 'kwitansi / struk' },
    ]
  },

  {
    id: 'klinik',
    situasi: 'Di Klinik / Rumah Sakit',
    icon: '🏥',
    level: 'TOPIK I',
    deskripsi: 'Percakapan saat berkunjung ke dokter atau klinik.',
    lines: [
      {
        speaker: 'A',
        kr: '어서 오세요. 어디가 불편하세요?',
        roman: 'Eoseo oseyo. Eodiga bulpyeonhaseyo?',
        id: 'Selamat datang. Sakit di bagian mana?'
      },
      {
        speaker: 'B',
        kr: '배가 많이 아파요. 어제부터 아팠어요.',
        roman: 'Baega mani apayo. Eojebuteo apasseoyo.',
        id: 'Perut sakit sekali. Sakitnya dari kemarin.'
      },
      {
        speaker: 'A',
        kr: '열은 있어요?',
        roman: 'Yeoreun isseoyo?',
        id: 'Ada demam?'
      },
      {
        speaker: 'B',
        kr: '네, 좀 있는 것 같아요.',
        roman: 'Ne, jom inneun geot gatayo.',
        id: 'Ya, sepertinya ada sedikit.'
      },
      {
        speaker: 'A',
        kr: '언제부터 이런 증상이 있었어요?',
        roman: 'Eonjebuteo ireon jeungsangi isseosseoyo?',
        id: 'Sejak kapan ada gejala seperti ini?'
      },
      {
        speaker: 'B',
        kr: '어제 저녁부터요. 뭔가 잘못 먹은 것 같아요.',
        roman: 'Eoje jeonyeokbuteoyo. Mwonga jalmot meogeun geot gatayo.',
        id: 'Dari kemarin malam. Sepertinya salah makan sesuatu.'
      },
      {
        speaker: 'A',
        kr: '알겠어요. 약을 처방해 드릴게요. 하루 세 번 드세요.',
        roman: 'Algeseoyo. Yageul cheobanghae deurilgeyo. Haru se beon deuseyo.',
        id: 'Baik. Saya akan resepkan obat. Diminum tiga kali sehari.'
      },
      {
        speaker: 'B',
        kr: '식후에 먹으면 되나요?',
        roman: 'Sikue meogeuumyeon doenayo?',
        id: 'Bisa diminum setelah makan?'
      },
      {
        speaker: 'A',
        kr: '네, 식후 삼십 분 후에 드세요. 이틀 후에 다시 오세요.',
        roman: 'Ne, siku samsip bun hue deuseyo. Iteul hue dasi oseyo.',
        id: 'Ya, minum 30 menit setelah makan. Datang lagi setelah dua hari.'
      },
    ],
    vocab: [
      { kr: '불편하다', roman: 'bulpyeonhada', id: 'tidak nyaman / sakit' },
      { kr: '열', roman: 'yeol', id: 'demam' },
      { kr: '증상', roman: 'jeungsang', id: 'gejala' },
      { kr: '처방', roman: 'cheobang', id: 'resep obat' },
      { kr: '하루 세 번', roman: 'haru se beon', id: 'tiga kali sehari' },
      { kr: '식후', roman: 'siku', id: 'setelah makan' },
    ]
  },

  {
    id: 'kampus',
    situasi: 'Percakapan di Kampus',
    icon: '🎓',
    level: 'TOPIK I–II',
    deskripsi: 'Percakapan antara mahasiswa di lingkungan kampus Korea.',
    lines: [
      {
        speaker: 'A',
        kr: '야, 오늘 한국어 수업 들어?',
        roman: 'Ya, oneul Hangugeo sueop deureo?',
        id: 'Hei, kamu ikut kelas bahasa Korea hari ini?'
      },
      {
        speaker: 'B',
        kr: '응, 들어. 너는?',
        roman: 'Eung, deureo. Neoneun?',
        id: 'Iya, ikut. Kamu?'
      },
      {
        speaker: 'A',
        kr: '나도. 오늘 시험이라서 좀 긴장돼.',
        roman: 'Nado. Oneul siheomiraso jom ginjangdwae.',
        id: 'Aku juga. Hari ini ada ujian, jadi agak nervous.'
      },
      {
        speaker: 'B',
        kr: '나도 그래. 어제 밤새 공부했는데 잘 모르겠어.',
        roman: 'Nado geulae. Eoje bamsae gongbuhaenneunde jal moreugesseo.',
        id: 'Aku juga. Belajar semalam suntuk tapi masih tidak yakin.'
      },
      {
        speaker: 'A',
        kr: '혹시 같이 공부할 수 있어? 도서관에서?',
        roman: 'Hoksi gachi gongbuhal su isseo? Dosoowaneseo?',
        id: 'Mungkin bisa belajar bareng? Di perpustakaan?'
      },
      {
        speaker: 'B',
        kr: '좋아! 몇 시에 만날까?',
        roman: 'Joa! Myeot sie mannalka?',
        id: 'Oke! Ketemu jam berapa?'
      },
      {
        speaker: 'A',
        kr: '두 시 어때? 수업 끝나고 바로.',
        roman: 'Du si eottae? Sueop kkeunnago baro.',
        id: 'Jam dua gimana? Langsung setelah kelas selesai.'
      },
      {
        speaker: 'B',
        kr: '괜찮아. 그럼 수업 끝나고 보자!',
        roman: 'Gwaenchana. Geureom sueop kkeunnago boja!',
        id: 'Oke. Kalau begitu sampai jumpa setelah kelas!'
      },
      {
        speaker: 'A',
        kr: '시험 잘 봐! 화이팅!',
        roman: 'Siheom jal bwa! Hwaiting!',
        id: 'Sukses ujiannya! Fighting!'
      },
    ],
    vocab: [
      { kr: '수업', roman: 'sueop', id: 'kelas / pelajaran' },
      { kr: '긴장되다', roman: 'ginjangdoeda', id: 'gugup / nervous' },
      { kr: '밤새', roman: 'bamsae', id: 'semalam suntuk' },
      { kr: '혹시', roman: 'hoksi', id: 'mungkin / kebetulan' },
      { kr: '화이팅', roman: 'hwaiting', id: 'fighting! (semangat!)' },
      { kr: '~고 나서 / ~고 바로', roman: '~go naseo / ~go baro', id: 'setelah ~ / langsung setelah ~' },
    ]
  },
];
