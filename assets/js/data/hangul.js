/**
 * Lingora — Data Hangul (Jamo Korea)
 * Fase 21.2 — 14 konsonan + 21 vokal + suku kata contoh
 * Format konsonan: { jamo, romanization, name, example: { syllable, word, meaning } }
 * Format vokal:    { jamo, romanization, name, example: { syllable, word, meaning } }
 * Format suku kata:{ block, consonant, vowel, romanization }
 */
const HangulData = (() => {

  // ── 14 Konsonan Dasar (자음) ──────────────────────────────────────────────
  const consonants = [
    {
      jamo: 'ㄱ',
      romanization: 'g / k',
      name: 'giyeok',
      example: { syllable: '가', word: '가방', meaning: 'tas' }
    },
    {
      jamo: 'ㄴ',
      romanization: 'n',
      name: 'nieun',
      example: { syllable: '나', word: '나무', meaning: 'pohon' }
    },
    {
      jamo: 'ㄷ',
      romanization: 'd / t',
      name: 'digeut',
      example: { syllable: '다', word: '다리', meaning: 'kaki / jembatan' }
    },
    {
      jamo: 'ㄹ',
      romanization: 'r / l',
      name: 'rieul',
      example: { syllable: '라', word: '라디오', meaning: 'radio' }
    },
    {
      jamo: 'ㅁ',
      romanization: 'm',
      name: 'mieum',
      example: { syllable: '마', word: '마음', meaning: 'hati / pikiran' }
    },
    {
      jamo: 'ㅂ',
      romanization: 'b / p',
      name: 'bieup',
      example: { syllable: '바', word: '바다', meaning: 'laut' }
    },
    {
      jamo: 'ㅅ',
      romanization: 's',
      name: 'siot',
      example: { syllable: '사', word: '사람', meaning: 'orang' }
    },
    {
      jamo: 'ㅇ',
      romanization: '- / ng',
      name: 'ieung',
      example: { syllable: '아', word: '아이', meaning: 'anak' }
    },
    {
      jamo: 'ㅈ',
      romanization: 'j',
      name: 'jieut',
      example: { syllable: '자', word: '자동차', meaning: 'mobil' }
    },
    {
      jamo: 'ㅊ',
      romanization: 'ch',
      name: 'chieut',
      example: { syllable: '차', word: '차', meaning: 'teh / mobil' }
    },
    {
      jamo: 'ㅋ',
      romanization: 'k',
      name: 'kieuk',
      example: { syllable: '카', word: '카메라', meaning: 'kamera' }
    },
    {
      jamo: 'ㅌ',
      romanization: 't',
      name: 'tieut',
      example: { syllable: '타', word: '타자기', meaning: 'mesin tik' }
    },
    {
      jamo: 'ㅍ',
      romanization: 'p',
      name: 'pieup',
      example: { syllable: '파', word: '파란색', meaning: 'warna biru' }
    },
    {
      jamo: 'ㅎ',
      romanization: 'h',
      name: 'hieut',
      example: { syllable: '하', word: '하늘', meaning: 'langit' }
    },
  ];

  // ── 21 Vokal Dasar (모음) ──────────────────────────────────────────────────
  const vowels = [
    {
      jamo: 'ㅏ',
      romanization: 'a',
      name: 'a',
      example: { syllable: '아', word: '아버지', meaning: 'ayah' }
    },
    {
      jamo: 'ㅐ',
      romanization: 'ae',
      name: 'ae',
      example: { syllable: '애', word: '애인', meaning: 'kekasih' }
    },
    {
      jamo: 'ㅑ',
      romanization: 'ya',
      name: 'ya',
      example: { syllable: '야', word: '야구', meaning: 'bisbol' }
    },
    {
      jamo: 'ㅒ',
      romanization: 'yae',
      name: 'yae',
      example: { syllable: '얘', word: '얘기', meaning: 'cerita / obrolan' }
    },
    {
      jamo: 'ㅓ',
      romanization: 'eo',
      name: 'eo',
      example: { syllable: '어', word: '어머니', meaning: 'ibu' }
    },
    {
      jamo: 'ㅔ',
      romanization: 'e',
      name: 'e',
      example: { syllable: '에', word: '에너지', meaning: 'energi' }
    },
    {
      jamo: 'ㅕ',
      romanization: 'yeo',
      name: 'yeo',
      example: { syllable: '여', word: '여자', meaning: 'perempuan' }
    },
    {
      jamo: 'ㅖ',
      romanization: 'ye',
      name: 'ye',
      example: { syllable: '예', word: '예쁘다', meaning: 'cantik' }
    },
    {
      jamo: 'ㅗ',
      romanization: 'o',
      name: 'o',
      example: { syllable: '오', word: '오빠', meaning: 'kakak laki-laki (dari perempuan)' }
    },
    {
      jamo: 'ㅘ',
      romanization: 'wa',
      name: 'wa',
      example: { syllable: '와', word: '와인', meaning: 'wine / anggur' }
    },
    {
      jamo: 'ㅙ',
      romanization: 'wae',
      name: 'wae',
      example: { syllable: '왜', word: '왜요?', meaning: 'kenapa?' }
    },
    {
      jamo: 'ㅚ',
      romanization: 'oe',
      name: 'oe',
      example: { syllable: '외', word: '외국', meaning: 'luar negeri' }
    },
    {
      jamo: 'ㅛ',
      romanization: 'yo',
      name: 'yo',
      example: { syllable: '요', word: '요리', meaning: 'masakan / memasak' }
    },
    {
      jamo: 'ㅜ',
      romanization: 'u',
      name: 'u',
      example: { syllable: '우', word: '우산', meaning: 'payung' }
    },
    {
      jamo: 'ㅝ',
      romanization: 'wo',
      name: 'wo',
      example: { syllable: '워', word: '워크숍', meaning: 'workshop' }
    },
    {
      jamo: 'ㅞ',
      romanization: 'we',
      name: 'we',
      example: { syllable: '웨', word: '웨이터', meaning: 'pelayan (pria)' }
    },
    {
      jamo: 'ㅟ',
      romanization: 'wi',
      name: 'wi',
      example: { syllable: '위', word: '위험', meaning: 'bahaya' }
    },
    {
      jamo: 'ㅠ',
      romanization: 'yu',
      name: 'yu',
      example: { syllable: '유', word: '유리', meaning: 'kaca / nama Yuri' }
    },
    {
      jamo: 'ㅡ',
      romanization: 'eu',
      name: 'eu',
      example: { syllable: '으', word: '으뜸', meaning: 'yang terbaik / utama' }
    },
    {
      jamo: 'ㅢ',
      romanization: 'ui',
      name: 'ui',
      example: { syllable: '의', word: '의사', meaning: 'dokter' }
    },
    {
      jamo: 'ㅣ',
      romanization: 'i',
      name: 'i',
      example: { syllable: '이', word: '이름', meaning: 'nama' }
    },
  ];

  // ── Suku Kata Dasar (Konsonan + Vokal) ───────────────────────────────────
  // Pola dasar: C + V (tanpa batchim/konsonan akhir)
  const syllables = [
    // ㄱ + vokal
    { block: '가', consonant: 'ㄱ', vowel: 'ㅏ', romanization: 'ga' },
    { block: '고', consonant: 'ㄱ', vowel: 'ㅗ', romanization: 'go' },
    { block: '구', consonant: 'ㄱ', vowel: 'ㅜ', romanization: 'gu' },
    { block: '기', consonant: 'ㄱ', vowel: 'ㅣ', romanization: 'gi' },
    // ㄴ + vokal
    { block: '나', consonant: 'ㄴ', vowel: 'ㅏ', romanization: 'na' },
    { block: '노', consonant: 'ㄴ', vowel: 'ㅗ', romanization: 'no' },
    { block: '누', consonant: 'ㄴ', vowel: 'ㅜ', romanization: 'nu' },
    { block: '니', consonant: 'ㄴ', vowel: 'ㅣ', romanization: 'ni' },
    // ㄷ + vokal
    { block: '다', consonant: 'ㄷ', vowel: 'ㅏ', romanization: 'da' },
    { block: '도', consonant: 'ㄷ', vowel: 'ㅗ', romanization: 'do' },
    { block: '두', consonant: 'ㄷ', vowel: 'ㅜ', romanization: 'du' },
    { block: '디', consonant: 'ㄷ', vowel: 'ㅣ', romanization: 'di' },
    // ㄹ + vokal
    { block: '라', consonant: 'ㄹ', vowel: 'ㅏ', romanization: 'ra' },
    { block: '로', consonant: 'ㄹ', vowel: 'ㅗ', romanization: 'ro' },
    { block: '루', consonant: 'ㄹ', vowel: 'ㅜ', romanization: 'ru' },
    { block: '리', consonant: 'ㄹ', vowel: 'ㅣ', romanization: 'ri' },
    // ㅁ + vokal
    { block: '마', consonant: 'ㅁ', vowel: 'ㅏ', romanization: 'ma' },
    { block: '모', consonant: 'ㅁ', vowel: 'ㅗ', romanization: 'mo' },
    { block: '무', consonant: 'ㅁ', vowel: 'ㅜ', romanization: 'mu' },
    { block: '미', consonant: 'ㅁ', vowel: 'ㅣ', romanization: 'mi' },
    // ㅂ + vokal
    { block: '바', consonant: 'ㅂ', vowel: 'ㅏ', romanization: 'ba' },
    { block: '보', consonant: 'ㅂ', vowel: 'ㅗ', romanization: 'bo' },
    { block: '부', consonant: 'ㅂ', vowel: 'ㅜ', romanization: 'bu' },
    { block: '비', consonant: 'ㅂ', vowel: 'ㅣ', romanization: 'bi' },
    // ㅅ + vokal
    { block: '사', consonant: 'ㅅ', vowel: 'ㅏ', romanization: 'sa' },
    { block: '소', consonant: 'ㅅ', vowel: 'ㅗ', romanization: 'so' },
    { block: '수', consonant: 'ㅅ', vowel: 'ㅜ', romanization: 'su' },
    { block: '시', consonant: 'ㅅ', vowel: 'ㅣ', romanization: 'si' },
    // ㅇ + vokal (ㅇ di posisi awal = tanpa bunyi)
    { block: '아', consonant: 'ㅇ', vowel: 'ㅏ', romanization: 'a' },
    { block: '오', consonant: 'ㅇ', vowel: 'ㅗ', romanization: 'o' },
    { block: '우', consonant: 'ㅇ', vowel: 'ㅜ', romanization: 'u' },
    { block: '이', consonant: 'ㅇ', vowel: 'ㅣ', romanization: 'i' },
    // ㅈ + vokal
    { block: '자', consonant: 'ㅈ', vowel: 'ㅏ', romanization: 'ja' },
    { block: '조', consonant: 'ㅈ', vowel: 'ㅗ', romanization: 'jo' },
    { block: '주', consonant: 'ㅈ', vowel: 'ㅜ', romanization: 'ju' },
    { block: '지', consonant: 'ㅈ', vowel: 'ㅣ', romanization: 'ji' },
    // ㅊ + vokal
    { block: '차', consonant: 'ㅊ', vowel: 'ㅏ', romanization: 'cha' },
    { block: '초', consonant: 'ㅊ', vowel: 'ㅗ', romanization: 'cho' },
    { block: '추', consonant: 'ㅊ', vowel: 'ㅜ', romanization: 'chu' },
    { block: '치', consonant: 'ㅊ', vowel: 'ㅣ', romanization: 'chi' },
    // ㅋ + vokal
    { block: '카', consonant: 'ㅋ', vowel: 'ㅏ', romanization: 'ka' },
    { block: '코', consonant: 'ㅋ', vowel: 'ㅗ', romanization: 'ko' },
    { block: '쿠', consonant: 'ㅋ', vowel: 'ㅜ', romanization: 'ku' },
    { block: '키', consonant: 'ㅋ', vowel: 'ㅣ', romanization: 'ki' },
    // ㅌ + vokal
    { block: '타', consonant: 'ㅌ', vowel: 'ㅏ', romanization: 'ta' },
    { block: '토', consonant: 'ㅌ', vowel: 'ㅗ', romanization: 'to' },
    { block: '투', consonant: 'ㅌ', vowel: 'ㅜ', romanization: 'tu' },
    { block: '티', consonant: 'ㅌ', vowel: 'ㅣ', romanization: 'ti' },
    // ㅍ + vokal
    { block: '파', consonant: 'ㅍ', vowel: 'ㅏ', romanization: 'pa' },
    { block: '포', consonant: 'ㅍ', vowel: 'ㅗ', romanization: 'po' },
    { block: '푸', consonant: 'ㅍ', vowel: 'ㅜ', romanization: 'pu' },
    { block: '피', consonant: 'ㅍ', vowel: 'ㅣ', romanization: 'pi' },
    // ㅎ + vokal
    { block: '하', consonant: 'ㅎ', vowel: 'ㅏ', romanization: 'ha' },
    { block: '호', consonant: 'ㅎ', vowel: 'ㅗ', romanization: 'ho' },
    { block: '후', consonant: 'ㅎ', vowel: 'ㅜ', romanization: 'hu' },
    { block: '히', consonant: 'ㅎ', vowel: 'ㅣ', romanization: 'hi' },
    // Suku kata penting dengan vokal kompleks
    { block: '여', consonant: 'ㅇ', vowel: 'ㅕ', romanization: 'yeo' },
    { block: '야', consonant: 'ㅇ', vowel: 'ㅑ', romanization: 'ya' },
    { block: '요', consonant: 'ㅇ', vowel: 'ㅛ', romanization: 'yo' },
    { block: '유', consonant: 'ㅇ', vowel: 'ㅠ', romanization: 'yu' },
    { block: '에', consonant: 'ㅇ', vowel: 'ㅔ', romanization: 'e' },
    { block: '의', consonant: 'ㅇ', vowel: 'ㅢ', romanization: 'ui' },
    { block: '와', consonant: 'ㅇ', vowel: 'ㅘ', romanization: 'wa' },
    { block: '위', consonant: 'ㅇ', vowel: 'ㅟ', romanization: 'wi' },
    { block: '왜', consonant: 'ㅇ', vowel: 'ㅙ', romanization: 'wae' },
    // Beberapa suku kata dengan batchim (konsonan akhir) — contoh umum
    { block: '한', consonant: 'ㅎ', vowel: 'ㅏ', romanization: 'han', batchim: 'ㄴ' },
    { block: '국', consonant: 'ㄱ', vowel: 'ㅜ', romanization: 'guk', batchim: 'ㄱ' },
    { block: '말', consonant: 'ㅁ', vowel: 'ㅏ', romanization: 'mal', batchim: 'ㄹ' },
    { block: '밥', consonant: 'ㅂ', vowel: 'ㅏ', romanization: 'bap', batchim: 'ㅂ' },
    { block: '책', consonant: 'ㅊ', vowel: 'ㅐ', romanization: 'chaek', batchim: 'ㄱ' },
    { block: '물', consonant: 'ㅁ', vowel: 'ㅜ', romanization: 'mul', batchim: 'ㄹ' },
    { block: '집', consonant: 'ㅈ', vowel: 'ㅣ', romanization: 'jip', batchim: 'ㅂ' },
    { block: '선', consonant: 'ㅅ', vowel: 'ㅓ', romanization: 'seon', batchim: 'ㄴ' },
    { block: '학', consonant: 'ㅎ', vowel: 'ㅏ', romanization: 'hak', batchim: 'ㄱ' },
    { block: '생', consonant: 'ㅅ', vowel: 'ㅐ', romanization: 'saeng', batchim: 'ㅇ' },
  ];

  return {
    getConsonants: () => consonants,
    getVowels: () => vowels,
    getSyllables: () => syllables,
    getAll: () => [...consonants, ...vowels],
  };

})();
