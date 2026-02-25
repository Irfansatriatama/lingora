/**
 * Lingora - Onboarding & Placement Test (Fase 25)
 * Multi-step wizard: Welcome → Pilih Bahasa → Placement Test → Hasil → Daily Goal
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!Router.guard()) return;

  const user = Auth.getActiveUser();

  // ── Cek apakah sudah onboarding ──────────────────────────
  const existing = Storage.getUser(user.id, 'onboarding', null);
  if (existing && existing.completed) {
    Router.go('pages/dashboard.html');
    return;
  }

  // ── State ─────────────────────────────────────────────────
  let currentStep = 1;
  const TOTAL_STEPS = 5;
  let selectedLang = null;  // 'jp' | 'zh' | 'kr' | 'all'
  let selectedGoal = 15;
  let testScore = 0;
  let testAnswered = 0;
  let testLevel = 'beginner'; // 'beginner' | 'intermediate'
  let testSlideBack = false;

  // ── Step progress ─────────────────────────────────────────
  function updateProgress(step) {
    const fill = document.getElementById('ob-progress-fill');
    const dots  = document.querySelectorAll('.ob-step-dot');
    if (fill) fill.style.width = (step / TOTAL_STEPS * 100) + '%';
    dots.forEach((d, i) => {
      d.classList.toggle('active', i + 1 === step);
      d.classList.toggle('done',   i + 1 < step);
    });
  }

  function showStep(n, back = false) {
    document.querySelectorAll('.ob-step').forEach(el => el.classList.remove('active', 'slide-back'));
    const target = document.getElementById('step-' + n);
    if (target) {
      target.classList.add('active');
      if (back) target.classList.add('slide-back');
    }
    currentStep = n;
    updateProgress(n);
  }

  function goNext() { showStep(currentStep + 1); }
  function goBack() { showStep(currentStep - 1, true); }

  // ── Skip / selesaikan dengan default ─────────────────────
  function finishOnboarding(skipTo = false) {
    const data = {
      completed: true,
      focusLang: selectedLang || 'all',
      level:     testLevel,
      dailyGoal: selectedGoal,
      completedAt: new Date().toISOString(),
      testScore:   testScore,
      testAnswered: testAnswered
    };
    Storage.setUser(user.id, 'onboarding', data);

    // Bonus XP untuk menyelesaikan onboarding
    if (typeof XPSystem !== 'undefined') {
      XPSystem.addXP(user.id, 'onboarding_done', 50, 'Selesaikan Onboarding');
    }

    Router.go('pages/dashboard.html');
  }

  // ── Listeners skip ────────────────────────────────────────
  ['btn-skip-onboarding', 'btn-skip-step2', 'btn-skip-test'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', finishOnboarding);
  });

  // ── STEP 1: Welcome → next ────────────────────────────────
  document.getElementById('btn-step1-next').addEventListener('click', goNext);

  // ── STEP 2: Pilih Bahasa ──────────────────────────────────
  const langBtns = document.querySelectorAll('.ob-lang-btn[data-lang]');
  const nextStep2 = document.getElementById('btn-step2-next');

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedLang = btn.dataset.lang;
      nextStep2.disabled = false;
    });
  });

  document.getElementById('btn-step2-back').addEventListener('click', goBack);
  nextStep2.addEventListener('click', () => {
    if (!selectedLang) return;
    buildTest();
    goNext();
  });

  // ── STEP 3: Placement Test ────────────────────────────────

  // Bank soal per bahasa (10 soal)
  const QUESTION_BANKS = {
    jp: [
      { char: 'あ', hint: 'Hiragana', answer: 'a', choices: ['a', 'i', 'u', 'e'] },
      { char: 'か', hint: 'Hiragana', answer: 'ka', choices: ['ka', 'ki', 'ku', 'ke'] },
      { char: '水', hint: 'Kanji N5', answer: 'Air', choices: ['Air', 'Api', 'Tanah', 'Angin'] },
      { char: '日本', hint: 'Kanji — negara', answer: 'Jepang', choices: ['Jepang', 'Korea', 'China', 'Thailand'] },
      { char: 'ありがとう', hint: 'Kosakata umum', answer: 'Terima kasih', choices: ['Terima kasih', 'Maaf', 'Halo', 'Selamat tinggal'] },
      { char: '食べる', hint: 'Kata kerja N5', answer: 'Makan', choices: ['Makan', 'Minum', 'Tidur', 'Berlari'] },
      { char: '高い', hint: 'Kata sifat N5', answer: 'Mahal / Tinggi', choices: ['Mahal / Tinggi', 'Murah / Rendah', 'Besar', 'Kecil'] },
      { char: '先生', hint: 'Kosakata N5', answer: 'Guru', choices: ['Guru', 'Murid', 'Dokter', 'Polisi'] },
      { char: 'どこ', hint: 'Kata tanya N5', answer: 'Di mana', choices: ['Di mana', 'Kapan', 'Siapa', 'Mengapa'] },
      { char: '友達', hint: 'Kosakata N4', answer: 'Teman', choices: ['Teman', 'Keluarga', 'Musuh', 'Tetangga'] }
    ],
    zh: [
      { char: '你好', hint: 'Sapaan umum', answer: 'Halo', choices: ['Halo', 'Selamat tinggal', 'Terima kasih', 'Maaf'] },
      { char: '水', hint: 'Karakter dasar', answer: 'Air', choices: ['Air', 'Api', 'Tanah', 'Udara'] },
      { char: '一', hint: 'Angka HSK1', answer: 'Satu', choices: ['Satu', 'Dua', 'Tiga', 'Empat'] },
      { char: '吃', hint: 'Kata kerja HSK1', answer: 'Makan', choices: ['Makan', 'Minum', 'Pergi', 'Datang'] },
      { char: '中国', hint: 'Negara', answer: 'China / Tiongkok', choices: ['China / Tiongkok', 'Jepang', 'Korea', 'Amerika'] },
      { char: '谢谢', hint: 'Ungkapan umum', answer: 'Terima kasih', choices: ['Terima kasih', 'Maaf', 'Permisi', 'Halo'] },
      { char: '大', hint: 'Karakter HSK1', answer: 'Besar', choices: ['Besar', 'Kecil', 'Tinggi', 'Pendek'] },
      { char: '朋友', hint: 'Kosakata HSK1', answer: 'Teman', choices: ['Teman', 'Keluarga', 'Guru', 'Dokter'] },
      { char: '今天', hint: 'Kosakata waktu', answer: 'Hari ini', choices: ['Hari ini', 'Kemarin', 'Besok', 'Minggu lalu'] },
      { char: '学校', hint: 'Tempat HSK2', answer: 'Sekolah', choices: ['Sekolah', 'Rumah sakit', 'Kantor', 'Toko'] }
    ],
    kr: [
      { char: 'ㄱ', hint: 'Konsonan Hangul', answer: 'g/k', choices: ['g/k', 'n', 'm', 'b/p'] },
      { char: '안녕하세요', hint: 'Sapaan formal', answer: 'Halo (formal)', choices: ['Halo (formal)', 'Terima kasih', 'Maaf', 'Selamat tinggal'] },
      { char: '물', hint: 'Kosakata dasar', answer: 'Air', choices: ['Air', 'Api', 'Nasi', 'Buku'] },
      { char: '사람', hint: 'Kosakata TOPIK1', answer: 'Orang', choices: ['Orang', 'Hewan', 'Anak', 'Teman'] },
      { char: '감사합니다', hint: 'Ungkapan sopan', answer: 'Terima kasih (formal)', choices: ['Terima kasih (formal)', 'Maaf (formal)', 'Permisi', 'Sampai jumpa'] },
      { char: '이다', hint: 'Grammar copula', answer: 'Adalah (to be)', choices: ['Adalah (to be)', 'Memiliki', 'Pergi', 'Makan'] },
      { char: '학교', hint: 'Tempat TOPIK1', answer: 'Sekolah', choices: ['Sekolah', 'Rumah', 'Toko', 'Kantor'] },
      { char: '먹다', hint: 'Kata kerja', answer: 'Makan', choices: ['Makan', 'Minum', 'Tidur', 'Pergi'] },
      { char: 'ㅏ', hint: 'Vokal Hangul', answer: 'a', choices: ['a', 'i', 'o', 'u'] },
      { char: '친구', hint: 'Kosakata TOPIK1', answer: 'Teman', choices: ['Teman', 'Keluarga', 'Guru', 'Dokter'] }
    ],
    all: [] // Campuran, diisi saat build
  };

  // Jika 'all', gabungkan dan ambil dari tiap bahasa
  function buildMixedBank() {
    const jp = QUESTION_BANKS.jp.slice(0, 3);
    const zh = QUESTION_BANKS.zh.slice(0, 4);
    const kr = QUESTION_BANKS.kr.slice(0, 3);
    // Acak urutan
    return [...jp, ...zh, ...kr].sort(() => Math.random() - 0.5);
  }

  let testQuestions = [];
  let testQIndex = 0;

  function buildTest() {
    if (selectedLang === 'all') {
      testQuestions = buildMixedBank();
    } else {
      testQuestions = [...(QUESTION_BANKS[selectedLang] || QUESTION_BANKS.jp)];
    }
    testQIndex = 0;
    testScore = 0;
    testAnswered = 0;
    renderTestQuestion();
  }

  function renderTestQuestion() {
    const q = testQuestions[testQIndex];
    if (!q) {
      showTestResult();
      return;
    }

    // Update header
    document.getElementById('test-q-count').textContent = (testQIndex + 1) + ' / ' + testQuestions.length;
    document.getElementById('test-mini-fill').style.width = (testQIndex / testQuestions.length * 100) + '%';
    document.getElementById('test-char').textContent = q.char;
    document.getElementById('test-hint').textContent = q.hint;

    // Acak choices
    const shuffled = [...q.choices].sort(() => Math.random() - 0.5);
    const choicesEl = document.getElementById('test-choices');
    choicesEl.innerHTML = '';
    shuffled.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'ob-choice-btn';
      btn.textContent = choice;
      btn.addEventListener('click', () => onTestAnswer(choice, q.answer, choicesEl));
      choicesEl.appendChild(btn);
    });
  }

  function onTestAnswer(chosen, correct, container) {
    // Disable semua
    container.querySelectorAll('.ob-choice-btn').forEach(b => {
      b.disabled = true;
      if (b.textContent === correct) b.classList.add('correct');
      else if (b.textContent === chosen && chosen !== correct) b.classList.add('wrong');
    });

    if (chosen === correct) testScore++;
    testAnswered++;

    setTimeout(() => {
      testQIndex++;
      if (testQIndex >= testQuestions.length) {
        showTestResult();
      } else {
        renderTestQuestion();
      }
    }, 700);
  }

  function showTestResult() {
    // Tentukan level berdasarkan skor
    const pct = testScore / (testQuestions.length || 10);
    if (pct >= 0.7) {
      testLevel = 'intermediate';
    } else {
      testLevel = 'beginner';
    }
    renderResult();
    showStep(4);
  }

  // Skip test
  document.getElementById('btn-skip-test').addEventListener('click', () => {
    testLevel = 'beginner';
    testScore = 0;
    testAnswered = 0;
    renderResult();
    showStep(4);
  });

  // ── STEP 4: Hasil Placement ───────────────────────────────

  const RECOMMENDATIONS = {
    jp: {
      beginner:     [
        { icon: 'あ', name: 'Hiragana', sub: 'Mulai dari alfabet dasar Jepang', path: 'pages/japanese/hiragana.html' },
        { icon: 'ア', name: 'Katakana', sub: 'Alfabet untuk kata serapan', path: 'pages/japanese/katakana.html' },
        { icon: '日', name: 'Kanji N5', sub: '105 kanji paling dasar', path: 'pages/japanese/kanji.html' }
      ],
      intermediate: [
        { icon: '漢', name: 'Kanji N4/N3', sub: 'Lanjutkan ke level lebih tinggi', path: 'pages/japanese/kanji.html' },
        { icon: '語', name: 'Kosakata JP', sub: '225+ kata N5–N4', path: 'pages/japanese/vocabulary.html' },
        { icon: '📝', name: 'Grammar JP', sub: '35 pola tata bahasa', path: 'pages/japanese/grammar.html' }
      ]
    },
    zh: {
      beginner:     [
        { icon: '声', name: 'Pinyin', sub: 'Sistem romanisasi Mandarin', path: 'pages/mandarin/pinyin.html' },
        { icon: '调', name: 'Nada (Tone)', sub: '5 nada dasar Mandarin', path: 'pages/mandarin/tones.html' },
        { icon: '汉', name: 'Hanzi HSK1', sub: 'Karakter Mandarin dasar', path: 'pages/mandarin/hanzi.html' }
      ],
      intermediate: [
        { icon: '汉', name: 'Hanzi HSK2–3', sub: 'Perluas kosakata karakter', path: 'pages/mandarin/hanzi.html' },
        { icon: '词', name: 'Kosakata ZH', sub: '120+ kata HSK 1–3', path: 'pages/mandarin/vocabulary.html' },
        { icon: '💬', name: 'Dialog ZH', sub: 'Percakapan situasional', path: 'pages/mandarin/dialog.html' }
      ]
    },
    kr: {
      beginner:     [
        { icon: '한', name: 'Hangul', sub: 'Alfabet Korea — mulai di sini', path: 'pages/korean/hangul.html' },
        { icon: '어', name: 'Kosakata KR', sub: '150+ kata TOPIK I', path: 'pages/korean/vocabulary.html' },
        { icon: '📖', name: 'Grammar KR', sub: 'Pola dasar bahasa Korea', path: 'pages/korean/grammar.html' }
      ],
      intermediate: [
        { icon: '語', name: 'Kosakata KR', sub: 'Kosakata TOPIK I & II', path: 'pages/korean/vocabulary.html' },
        { icon: '📖', name: 'Grammar KR', sub: 'Pola tata bahasa lanjutan', path: 'pages/korean/grammar.html' },
        { icon: '💬', name: 'Dialog KR', sub: 'Percakapan situasional', path: 'pages/korean/dialog.html' }
      ]
    },
    all: {
      beginner:     [
        { icon: 'あ', name: 'Hiragana (JP)', sub: 'Mulai dari alfabet Jepang', path: 'pages/japanese/hiragana.html' },
        { icon: '声', name: 'Pinyin (ZH)', sub: 'Romanisasi Mandarin', path: 'pages/mandarin/pinyin.html' },
        { icon: '한', name: 'Hangul (KR)', sub: 'Alfabet Korea', path: 'pages/korean/hangul.html' }
      ],
      intermediate: [
        { icon: '語', name: 'Kosakata JP', sub: 'Perluas kosakata Jepang', path: 'pages/japanese/vocabulary.html' },
        { icon: '词', name: 'Kosakata ZH', sub: 'Perluas kosakata Mandarin', path: 'pages/mandarin/vocabulary.html' },
        { icon: '어', name: 'Kosakata KR', sub: 'Perluas kosakata Korea', path: 'pages/korean/vocabulary.html' }
      ]
    }
  };

  const LEVEL_INFO = {
    beginner: {
      emoji: '🌱',
      label: 'Pemula',
      desc: 'Kamu baru memulai perjalanan! Kami akan membimbingmu dari dasar — huruf, kosakata sederhana, dan pola kalimat pertama.'
    },
    intermediate: {
      emoji: '🌿',
      label: 'Menengah',
      desc: 'Kamu sudah punya dasar yang bagus! Saatnya memperluas kosakata, memperdalam grammar, dan berlatih percakapan lebih kompleks.'
    }
  };

  function renderResult() {
    const info = LEVEL_INFO[testLevel];
    document.getElementById('result-emoji').textContent = info.emoji;
    document.getElementById('result-level').textContent = info.label;

    const total = testAnswered || testQuestions.length;
    document.getElementById('result-score').textContent =
      testAnswered > 0 ? testScore + ' dari ' + total + ' soal benar' : 'Tes dilewati';
    document.getElementById('result-desc').textContent = info.desc;

    // Rekomendasi modul
    const lang = selectedLang || 'all';
    const recs = (RECOMMENDATIONS[lang] || RECOMMENDATIONS.all)[testLevel] || [];
    const recsEl = document.getElementById('result-recs');
    recsEl.innerHTML = '';
    recs.forEach(rec => {
      const div = document.createElement('div');
      div.className = 'ob-module-rec';
      div.innerHTML = `<span class="omr-icon">${rec.icon}</span>
        <div>
          <div class="omr-name">${rec.name}</div>
          <div class="omr-sub">${rec.sub}</div>
        </div>`;
      recsEl.appendChild(div);
    });
  }

  document.getElementById('btn-step4-next').addEventListener('click', goNext);

  // ── STEP 5: Daily Goal ────────────────────────────────────
  const goalBtns = document.querySelectorAll('.ob-goal-btn[data-goal]');
  goalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goalBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedGoal = parseInt(btn.dataset.goal);
    });
  });

  document.getElementById('btn-finish').addEventListener('click', finishOnboarding);

  // ── Init ──────────────────────────────────────────────────
  updateProgress(1);
});
