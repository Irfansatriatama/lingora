/**
 * Lingora — Quiz Korea Page
 * Fase 21.5: Hangul & Kosakata KR quiz dengan multiple choice dan input ketik.
 * Fase 22: Tambah Listening Mode (Audio Quiz)
 */
(() => {
  if (!Router.guard()) return;
  App.init('quiz-kr');

  const user = Auth.getActiveUser();

  // ── State ──────────────────────────────────────────────
  let selectedModule  = null;
  let selectedType    = 'word-to-meaning';
  let selectedCount   = 10;
  let selectedTLevel  = 'all';
  let selectedMode    = 'choice'; // 'choice' | 'input' | 'listening'
  let isSessionActive = false;
  let listeningXpBonus = 0;

  // ── DOM ────────────────────────────────────────────────
  const selectScreen  = document.getElementById('selectScreen');
  const sessionScreen = document.getElementById('sessionScreen');
  const resultScreen  = document.getElementById('resultScreen');
  const startBtn      = document.getElementById('startBtn');

  // ── Init ───────────────────────────────────────────────
  renderBadges();
  bindModuleCards();
  bindModeOptions();
  bindTypeOptions();
  bindCountOptions();
  bindTopikLevelOptions();
  bindQuizControls();

  // ── Module cards ───────────────────────────────────────
  function bindModuleCards() {
    document.querySelectorAll('.quiz-module-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.quiz-module-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedModule = card.dataset.module;
        document.getElementById('topikLevelPanel').style.display = selectedModule === 'kr-vocab' ? '' : 'none';
        updateTypeOptionsForModule();
        startBtn.disabled = false;
        startBtn.textContent = `Mulai Quiz ${card.querySelector('.card-title').textContent}`;
      });
    });
  }

  function updateTypeOptionsForModule() {
    const allTypeBtns = document.querySelectorAll('#typeOptions .quiz-type-btn');
    const wtm = document.querySelector('[data-type="word-to-meaning"]');
    const mtw = document.querySelector('[data-type="meaning-to-word"]');
    const wtr = document.querySelector('[data-type="word-to-roman"]');
    if (selectedModule === 'hangul') {
      allTypeBtns.forEach(btn => {
        const t = btn.dataset.type;
        btn.style.display = (t === 'word-to-meaning' || t === 'word-to-roman' || t === 'meaning-to-word') ? '' : 'none';
      });
      if (wtm) wtm.textContent = 'Jamo → Arti';
      if (mtw) mtw.textContent = 'Arti → Jamo';
      if (wtr) wtr.textContent = 'Jamo → Romanisasi';
    } else {
      allTypeBtns.forEach(btn => { btn.style.display = ''; });
      if (wtm) wtm.textContent = 'Kata → Arti';
      if (mtw) mtw.textContent = 'Arti → Kata';
      if (wtr) wtr.textContent = 'Kata → Romanisasi';
    }
    selectedType = 'word-to-meaning';
    document.querySelectorAll('#typeOptions .quiz-type-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.type === selectedType);
    });
  }

  function bindModeOptions() {
    document.querySelectorAll('#modeOptions .quiz-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#modeOptions .quiz-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedMode = btn.dataset.mode;
      });
    });
  }

  function bindTypeOptions() {
    document.querySelectorAll('#typeOptions .quiz-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#typeOptions .quiz-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedType = btn.dataset.type;
      });
    });
  }

  function bindCountOptions() {
    document.querySelectorAll('#countOptions .quiz-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#countOptions .quiz-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCount = parseInt(btn.dataset.count);
      });
    });
  }

  function bindTopikLevelOptions() {
    document.querySelectorAll('#topikLevelOptions .quiz-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#topikLevelOptions .quiz-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTLevel = btn.dataset.tlevel;
      });
    });
  }

  // ── Start quiz ─────────────────────────────────────────
  startBtn.addEventListener('click', () => {
    if (!selectedModule) return;
    const items = getDataset();
    if (!items || items.length < 4) {
      App.toast('Data tidak cukup untuk membuat quiz.', 'error');
      return;
    }

    if (selectedMode === 'listening' && !AudioEngine.isSupported()) {
      App.toast('Browser tidak mendukung audio. Coba Chrome atau Safari.', 'error');
      return;
    }

    const timerSecs = selectedMode === 'input' ? 30 : selectedMode === 'listening' ? 25 : 20;
    listeningXpBonus = 0;

    const ok = QuizEngine.start(
      items,
      (item, all) => buildQuestion(item, all),
      { totalQuestions: selectedCount, timerSeconds: timerSecs, moduleId: `quiz-kr-${selectedModule}` },
      onFinish
    );

    if (!ok) { App.toast('Gagal membuat soal.', 'error'); return; }

    isSessionActive = true;
    showScreen('session');
    renderQuestion();
  });

  // ── Dataset helper ─────────────────────────────────────
  function getDataset() {
    if (selectedModule === 'hangul') {
      const consonants = HangulData.getConsonants ? HangulData.getConsonants() : [];
      const vowels = HangulData.getVowels ? HangulData.getVowels() : [];
      return [...consonants, ...vowels];
    }
    if (selectedModule === 'kr-vocab') {
      const all = KrVocabData.getAll();
      if (selectedTLevel === 'all') return all;
      return all.filter(v => v.level === selectedTLevel);
    }
    return [];
  }

  // ── Build question ─────────────────────────────────────
  function buildQuestion(item, allItems) {
    if (selectedModule === 'hangul') return buildHangulQuestion(item, allItems);
    return buildVocabQuestion(item, allItems);
  }

  function buildHangulQuestion(item, allItems) {
    const meaning = item.example ? item.example.meaning : item.name;

    // Fase 22: Listening mode
    if (selectedMode === 'listening') {
      const wrongs = QuizEngine.pickWrongAnswers(allItems, meaning, x => (x.example ? x.example.meaning : x.name), 3);
      return {
        question: item.jamo, questionType: 'char',
        answer: meaning,
        choices: QuizEngine.shuffleChoices([meaning, ...wrongs]),
        hint: '', explanation: `${item.jamo} (${item.name}) = "${meaning}"`,
        _listeningText: item.example ? item.example.syllable || item.jamo : item.jamo,
      };
    }

    if (selectedType === 'word-to-meaning') {
      const wrongs = QuizEngine.pickWrongAnswers(allItems, meaning, x => (x.example ? x.example.meaning : x.name), 3);
      return {
        question: item.jamo, questionType: 'char', answer: meaning,
        choices: QuizEngine.shuffleChoices([meaning, ...wrongs]),
        hint: `Romanisasi: ${item.romanization}`,
        explanation: `${item.jamo} (${item.name}) = "${meaning}"`,
      };
    }
    if (selectedType === 'word-to-roman') {
      const roman = item.romanization.split('/')[0].trim();
      const wrongs = QuizEngine.pickWrongAnswers(allItems, item.romanization, x => x.romanization, 3);
      return {
        question: item.jamo, questionType: 'char', answer: item.romanization,
        choices: QuizEngine.shuffleChoices([item.romanization, ...wrongs]),
        hint: '', explanation: `${item.jamo} diromanisasi sebagai "${item.romanization}"`,
        alternatives: [roman],
      };
    }
    const wrongs = QuizEngine.pickWrongAnswers(allItems, item.jamo, x => x.jamo, 3);
    return {
      question: meaning, questionType: 'text', answer: item.jamo,
      choices: QuizEngine.shuffleChoices([item.jamo, ...wrongs]),
      hint: `Nama: ${item.name}`, explanation: `"${meaning}" dalam hangul adalah ${item.jamo}`,
    };
  }

  function buildVocabQuestion(item, allItems) {
    // Fase 22: Listening mode
    if (selectedMode === 'listening') {
      const wrongs = QuizEngine.pickWrongAnswers(allItems, item.meaning, x => x.meaning, 3);
      return {
        question: item.word, questionType: 'char',
        answer: item.meaning,
        choices: QuizEngine.shuffleChoices([item.meaning, ...wrongs]),
        hint: '', explanation: `${item.word} (${item.romanization}) = "${item.meaning}"`,
        _listeningText: item.word,
      };
    }

    if (selectedType === 'word-to-meaning') {
      const wrongs = QuizEngine.pickWrongAnswers(allItems, item.meaning, x => x.meaning, 3);
      return {
        question: item.word, questionType: 'char', answer: item.meaning,
        choices: QuizEngine.shuffleChoices([item.meaning, ...wrongs]),
        hint: '', explanation: `${item.word} (${item.romanization}) = "${item.meaning}"`,
      };
    }
    if (selectedType === 'word-to-roman') {
      const wrongs = QuizEngine.pickWrongAnswers(allItems, item.romanization, x => x.romanization, 3);
      return {
        question: item.word, questionType: 'char', answer: item.romanization,
        choices: QuizEngine.shuffleChoices([item.romanization, ...wrongs]),
        hint: `Arti: ${item.meaning}`, explanation: `${item.word} diromanisasi sebagai "${item.romanization}"`,
      };
    }
    const wrongs = QuizEngine.pickWrongAnswers(allItems, item.word, x => x.word, 3);
    return {
      question: item.meaning, questionType: 'text', answer: item.word,
      choices: QuizEngine.shuffleChoices([item.word, ...wrongs]),
      hint: '', explanation: `"${item.meaning}" dalam bahasa Korea adalah ${item.word} (${item.romanization})`,
      alternatives: [item.romanization],
    };
  }

  // ── Render Question ────────────────────────────────────
  function renderQuestion() {
    const q = QuizEngine.getQuestion();
    if (!q) return;

    const prog = QuizEngine.getProgress();
    document.getElementById('progressLabel').textContent = `Soal ${prog.current} dari ${prog.total}`;
    document.getElementById('progressFill').style.width = `${((prog.current - 1) / prog.total) * 100}%`;
    document.getElementById('scoreNum').textContent = prog.score;

    const labelMap = {
      'word-to-meaning' : selectedModule === 'hangul' ? 'Apa arti jamo ini?' : 'Apa arti kata ini?',
      'meaning-to-word' : selectedModule === 'hangul' ? 'Pilih jamo yang sesuai' : 'Tulis dalam bahasa Korea',
      'word-to-roman'   : 'Bagaimana romanisasinya?',
    };
    const qLabel = document.getElementById('qLabel');
    const qChar = document.getElementById('qChar');
    const qText = document.getElementById('qText');
    const qHint = document.getElementById('qHint');

    const listeningWrap     = document.getElementById('listeningWrap');
    const listeningPlayBtn  = document.getElementById('listeningPlayBtn');
    const listeningPlayCountEl = document.getElementById('listeningPlayCount');

    if (selectedMode === 'listening') {
      qLabel.textContent = 'Dengar dan pilih arti yang benar';
      if (q.questionType === 'char') {
        qChar.innerHTML = '<span class="quiz-char-hidden" id="hiddenChar">' + q.question + '</span>';
        qChar.style.display = ''; qText.style.display = 'none';
      } else {
        qText.innerHTML = '<span class="quiz-char-hidden" id="hiddenChar">' + q.question + '</span>';
        qText.style.display = ''; qChar.style.display = 'none';
      }
      qHint.textContent = '';

      listeningWrap.style.display = 'block';
      let playCount = 0;
      listeningPlayCountEl.textContent = '';
      listeningPlayBtn.classList.remove('playing');
      setTimeout(() => { playCount++; playListeningAudio(q, listeningPlayBtn, listeningPlayCountEl, playCount); }, 400);
      listeningPlayBtn.onclick = () => { playCount++; playListeningAudio(q, listeningPlayBtn, listeningPlayCountEl, playCount); };

    } else {
      listeningWrap.style.display = 'none';
      qLabel.textContent = labelMap[selectedType] || 'Jawab soal berikut:';
      if (q.questionType === 'char') {
        qChar.textContent = q.question; qChar.style.display = ''; qText.style.display = 'none';
      } else {
        qText.textContent = q.question; qText.style.display = ''; qChar.style.display = 'none';
      }
      qHint.textContent = q.hint || '';
    }

    document.getElementById('feedback').className = 'quiz-feedback';
    document.getElementById('nextBtn').style.display = 'none';

    startTimer();

    if (selectedMode === 'choice') {
      renderChoices(q);
    } else if (selectedMode === 'listening') {
      renderListeningChoices(q);
    } else {
      renderInputMode(q);
    }
  }

  // ── Timer ──────────────────────────────────────────────
  let timerInterval = null;

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    const timerEl = document.getElementById('quizTimer');
    let seconds = selectedMode === 'input' ? 30 : selectedMode === 'listening' ? 25 : 20;
    timerEl.textContent = seconds;
    timerEl.className = 'quiz-timer';

    timerInterval = setInterval(() => {
      seconds--;
      timerEl.textContent = seconds;
      if (seconds <= 5) timerEl.classList.add('urgent');
      if (seconds <= 0) {
        clearInterval(timerInterval);
        if (selectedMode === 'input') submitInputAnswer(QuizEngine.getQuestion(), true);
        else if (selectedMode === 'listening') onAnswerListening(null, QuizEngine.getQuestion());
        else onAnswer(null);
      }
    }, 1000);
  }

  // ── Fase 22: Audio helpers ─────────────────────────────
  function playListeningAudio(q, btn, countEl, count) {
    const text = q._listeningText || q.question;
    btn.classList.add('playing');
    AudioEngine.speakKR(text);
    if (count > 1) countEl.textContent = 'Diputar ' + count + 'x';
    setTimeout(() => btn.classList.remove('playing'), 2000);
  }

  function renderListeningChoices(q) {
    const grid = document.getElementById('choicesGrid');
    const inputWrap = document.getElementById('inputWrap');
    grid.style.display = ''; inputWrap.style.display = 'none';
    grid.innerHTML = q.choices.map(choice => `<button class="quiz-choice">${choice}</button>`).join('');
    grid.querySelectorAll('.quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval);
        onAnswerListening(btn.textContent, q);
      });
    });
  }

  function onAnswerListening(choice, q) {
    const result = QuizEngine.answer(choice);
    if (!result) return;

    const hiddenChar = document.getElementById('hiddenChar');
    if (hiddenChar) hiddenChar.classList.add('revealed');

    document.querySelectorAll('.quiz-choice').forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === result.answer) btn.classList.add('correct');
      if (btn.textContent === choice && !result.correct) btn.classList.add('wrong');
    });

    const fb     = document.getElementById('feedback');
    const fbIcon = document.getElementById('feedbackIcon');
    const fbText = document.getElementById('feedbackText');

    if (result.correct) {
      listeningXpBonus += 5;
      XPSystem.addXP('listening_correct', 5, '🎧 Listening benar');
      fb.className = 'quiz-feedback correct show'; fbIcon.textContent = '✅';
      fbText.innerHTML = `<strong>Benar!</strong> <span class="listening-bonus-badge">+5 XP Listening</span><br>${result.explanation}`;
      App.toast('Benar! +5 XP 🎧', 'success', 1500);
    } else {
      fb.className = 'quiz-feedback wrong show';
      fbIcon.textContent = choice === null ? '⏰' : '❌';
      fbText.innerHTML = `<strong>${choice === null ? 'Waktu habis!' : 'Kurang tepat.'}</strong> ${result.explanation}`;
    }
    document.getElementById('scoreNum').textContent = QuizEngine.getProgress().score;
    document.getElementById('nextBtn').style.display = 'block';
  }

  // ── Choices mode ───────────────────────────────────────
  function renderChoices(q) {
    const grid = document.getElementById('choicesGrid');
    const inputWrap = document.getElementById('inputWrap');
    grid.style.display = ''; inputWrap.style.display = 'none';
    grid.innerHTML = q.choices.map(choice => `<button class="quiz-choice">${choice}</button>`).join('');
    grid.querySelectorAll('.quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval);
        onAnswer(btn.textContent);
      });
    });
  }

  // ── Input mode ─────────────────────────────────────────
  function renderInputMode(q) {
    const grid = document.getElementById('choicesGrid');
    const inputWrap = document.getElementById('inputWrap');
    const inputField = document.getElementById('quizInputField');
    const correctReveal = document.getElementById('correctReveal');
    grid.style.display = 'none'; inputWrap.style.display = '';
    inputField.value = ''; inputField.disabled = false;
    inputField.className = 'quiz-input-field';
    document.getElementById('inputSubmitBtn').disabled = false;
    correctReveal.style.display = 'none';
    setTimeout(() => inputField.focus(), 100);
    document.getElementById('inputSubmitBtn').onclick = () => {
      if (timerInterval) clearInterval(timerInterval);
      submitInputAnswer(q);
    };
    document.getElementById('inputSkipBtn').onclick = () => {
      if (timerInterval) clearInterval(timerInterval);
      submitInputAnswer(q, true);
    };
    inputField.onkeydown = e => {
      if (e.key === 'Enter') {
        if (timerInterval) clearInterval(timerInterval);
        submitInputAnswer(q);
      }
    };
  }

  // ── Submit Input Answer ────────────────────────────────
  function submitInputAnswer(q, skip = false) {
    const inputField    = document.getElementById('quizInputField');
    const inputSubmit   = document.getElementById('inputSubmitBtn');
    const correctReveal = document.getElementById('correctReveal');
    const userRaw = skip ? '' : (inputField ? inputField.value.trim() : '');

    const normalize = s => s.toLowerCase().trim()
      .replace(/[ŏ]/g, 'o').replace(/[ŭ]/g, 'u').replace(/\s+/g, ' ');

    const userNorm = normalize(userRaw);
    const correctNorm = normalize(q.answer);
    const alternatives = (q.alternatives || []).map(normalize);
    const isCorrect = !skip && (userNorm === correctNorm || alternatives.some(a => a === userNorm));

    const choice = skip ? null : (userRaw || null);
    const result = QuizEngine.answer(isCorrect ? q.answer : (choice || '__wrong__'));
    if (!result) return;

    if (inputField) {
      inputField.disabled = true;
      if (!skip && userRaw) inputField.className = `quiz-input-field ${isCorrect ? 'input-correct' : 'input-wrong'}`;
    }
    if (inputSubmit) inputSubmit.disabled = true;
    if (!isCorrect) {
      correctReveal.style.display = 'block';
      correctReveal.innerHTML = `Jawaban benar: <strong>${result.answer}</strong>`;
    }
    showFeedback(isCorrect, result, skip ? 'skip' : null);
  }

  // ── On answer ──────────────────────────────────────────
  function onAnswer(choice) {
    const result = QuizEngine.answer(choice);
    if (!result) return;
    document.querySelectorAll('.quiz-choice').forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === result.answer) btn.classList.add('correct');
      if (btn.textContent === choice && !result.correct) btn.classList.add('wrong');
    });
    showFeedback(result.correct, result, choice === null ? 'timeout' : null);
  }

  function showFeedback(correct, result, reason) {
    const fb = document.getElementById('feedback');
    const fbIcon = document.getElementById('feedbackIcon');
    const fbText = document.getElementById('feedbackText');
    if (correct) {
      fb.className = 'quiz-feedback correct show'; fbIcon.textContent = '✅';
      fbText.innerHTML = `<strong>Benar!</strong> ${result.explanation}`;
      App.toast('Benar! +1', 'success', 1200);
    } else {
      fb.className = 'quiz-feedback wrong show';
      fbIcon.textContent = reason === 'skip' ? '⏩' : reason === 'timeout' ? '⏰' : '❌';
      const label = reason === 'skip' ? 'Dilewati.' : reason === 'timeout' ? 'Waktu habis!' : 'Kurang tepat.';
      fbText.innerHTML = `<strong>${label}</strong> ${result.explanation}`;
    }
    document.getElementById('scoreNum').textContent = QuizEngine.getProgress().score;
    document.getElementById('nextBtn').style.display = 'block';
  }

  // ── Quiz Controls ──────────────────────────────────────
  function bindQuizControls() {
    document.getElementById('nextBtn').addEventListener('click', () => {
      const hasMore = QuizEngine.next();
      if (hasMore) renderQuestion();
    });

    document.getElementById('retryBtn').addEventListener('click', () => {
      showScreen('session');
      listeningXpBonus = 0;
      const items = getDataset();
      const timerSecs = selectedMode === 'input' ? 30 : selectedMode === 'listening' ? 25 : 20;
      QuizEngine.start(items, (item, all) => buildQuestion(item, all), {
        totalQuestions: selectedCount, timerSeconds: timerSecs, moduleId: `quiz-kr-${selectedModule}`
      }, onFinish);
      renderQuestion();
    });

    document.getElementById('backToSelectBtn').addEventListener('click', () => {
      showScreen('select'); renderBadges();
    });
  }

  // ── Finish ─────────────────────────────────────────────
  function onFinish(results, score, total) {
    isSessionActive = false;
    if (timerInterval) clearInterval(timerInterval);
    showScreen('result');

    const pct = Math.round((score / total) * 100);
    let emoji = '😔', title = 'Coba Lagi!';
    if (pct === 100) { emoji = '🏆'; title = 'Sempurna!'; }
    else if (pct >= 80) { emoji = '🎉'; title = 'Luar Biasa!'; }
    else if (pct >= 60) { emoji = '👍'; title = 'Bagus!'; }
    else if (pct >= 40) { emoji = '🙂'; title = 'Lumayan!'; }

    document.getElementById('resultEmoji').textContent    = emoji;
    document.getElementById('resultTitle').textContent    = title;
    document.getElementById('resultSubtitle').textContent = `Kamu menjawab ${score} dari ${total} soal dengan benar.`;
    document.getElementById('resultScoreBig').textContent = score;
    document.getElementById('resultDenom').textContent    = `/ ${total}`;
    document.getElementById('statAccuracy').textContent   = pct + '%';
    document.getElementById('statCorrect').textContent    = score;
    document.getElementById('statWrong').textContent      = total - score;

    // Fase 22: listening bonus XP
    const listeningXpStat = document.getElementById('listeningXpStat');
    if (selectedMode === 'listening' && listeningXpBonus > 0) {
      listeningXpStat.style.display = '';
      document.getElementById('statListeningXP').textContent = `+${listeningXpBonus} XP`;
    } else { listeningXpStat.style.display = 'none'; }

    const circumference = 2 * Math.PI * 60;
    const fillLen = (score / total) * circumference;
    document.getElementById('ringFill').setAttribute('stroke-dasharray', `${fillLen} ${circumference}`);

    document.getElementById('reviewList').innerHTML = results.map(r => `
      <div class="quiz-review-item">
        <div class="review-icon">${r.correct ? '✅' : '❌'}</div>
        <div class="review-q">${r.question}</div>
        <div class="review-a ${r.correct ? 'review-correct' : 'review-wrong'}">
          ${r.correct ? r.answer : `${r.userAnswer || '—'} → ${r.answer}`}
        </div>
      </div>
    `).join('');

    renderBadges();
  }

  // ── Screen helpers ─────────────────────────────────────
  function showScreen(name) {
    selectScreen.className  = 'quiz-select-screen'  + (name === 'select'  ? '' : ' hidden');
    sessionScreen.className = 'quiz-session-screen' + (name === 'session' ? ' active' : '');
    resultScreen.className  = 'quiz-result-screen'  + (name === 'result'  ? ' active' : '');
  }

  // ── Badges ─────────────────────────────────────────────
  function renderBadges() {
    const grid = document.getElementById('badgesGrid');
    if (!grid) return;
    const owned = typeof BadgeSystem !== 'undefined' ? BadgeSystem.getBadges() : {};
    const defs  = typeof BadgeSystem !== 'undefined' ? BadgeSystem.getAllBadgeDefs() : [];
    grid.innerHTML = defs.map(b => {
      const has = !!owned[b.id];
      const date = has ? new Date(owned[b.id].earnedAt).toLocaleDateString('id-ID') : '';
      return `<div class="badge-item ${has ? '' : 'locked'}">
        <div class="badge-icon">${b.icon}</div>
        <div class="badge-name">${b.name}</div>
        <div class="badge-desc">${b.desc}</div>
        ${has ? `<div class="badge-date">${date}</div>` : ''}
      </div>`;
    }).join('');
  }

})();
