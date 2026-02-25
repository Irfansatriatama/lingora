/**
 * Lingora - Quiz Mandarin Page
 * Hanzi, Pinyin, Kosakata quiz dengan multiple choice & mode ketik.
 * Fase 13: Tambah Mode Input Jawaban
 * Fase 22: Tambah Listening Mode (Audio Quiz)
 */
(() => {
  if (!Router.guard()) return;
  App.init('quiz-zh');

  const user = Auth.getActiveUser();

  // ── State ──────────────────────────────────────────────
  let selectedModule = null;
  let selectedType   = 'char-to-meaning';
  let selectedCount  = 10;
  let selectedHLevel = 'all';
  let selectedTheme  = 'all';
  let selectedMode   = 'choice'; // 'choice' | 'input' | 'listening'
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
  bindHskLevelOptions();
  bindVocabThemeOptions();
  bindQuizControls();

  function bindModuleCards() {
    document.querySelectorAll('.quiz-module-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.quiz-module-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedModule = card.dataset.module;
        document.getElementById('hskLevelPanel').style.display  = selectedModule === 'hanzi' ? 'block' : 'none';
        document.getElementById('vocabThemePanel').style.display = selectedModule === 'vocab' ? 'block' : 'none';
        updateTypeOptionsForModule();
        startBtn.disabled    = false;
        startBtn.textContent = 'Mulai Quiz ' + card.querySelector('.card-title').textContent;
      });
    });
  }

  function updateTypeOptionsForModule() {
    const pinyinBtn = document.querySelector('[data-type="char-to-pinyin"]');
    if (selectedModule === 'vocab') {
      pinyinBtn.style.display = 'none';
      if (selectedType === 'char-to-pinyin') { selectedType = 'char-to-meaning'; syncActiveType(); }
    } else { pinyinBtn.style.display = ''; }
  }

  function syncActiveType() {
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

  function bindHskLevelOptions() {
    document.querySelectorAll('#hskLevelOptions .quiz-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#hskLevelOptions .quiz-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedHLevel = btn.dataset.hlevel;
      });
    });
  }

  function bindVocabThemeOptions() {
    document.querySelectorAll('#vocabThemeOptions .quiz-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#vocabThemeOptions .quiz-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTheme = btn.dataset.theme;
      });
    });
  }

  startBtn.addEventListener('click', () => {
    if (!selectedModule) return;
    const items = getDataset();
    if (!items || items.length < 4) { App.toast('Data tidak cukup.', 'error'); return; }

    if (selectedMode === 'listening' && !AudioEngine.isSupported()) {
      App.toast('Browser tidak mendukung audio. Coba Chrome atau Safari.', 'error');
      return;
    }

    const timerSecs = selectedMode === 'input' ? 30 : selectedMode === 'listening' ? 25 : 20;
    listeningXpBonus = 0;

    const ok = QuizEngine.start(
      items, (item, all) => buildQuestion(item, all),
      { totalQuestions: selectedCount, timerSeconds: timerSecs, moduleId: 'quiz-zh-' + selectedModule },
      onFinish
    );
    if (!ok) { App.toast('Gagal membuat soal.', 'error'); return; }
    showScreen('session');
    renderQuestion();
  });

  function getDataset() {
    if (selectedModule === 'hanzi' || selectedModule === 'pinyin') {
      if (selectedHLevel === 'all') return HanziData.all;
      return HanziData.getByHsk(parseInt(selectedHLevel));
    }
    if (selectedModule === 'vocab') {
      if (selectedTheme === 'all') return ZhVocabData.vocab;
      return ZhVocabData.getByTheme(selectedTheme);
    }
    return [];
  }

  function buildQuestion(item, allItems) {
    if (selectedModule === 'vocab') return buildVocabQuestion(item, allItems);
    return buildHanziQuestion(item, allItems);
  }

  function buildHanziQuestion(item, allItems) {
    if (selectedMode === 'listening') {
      const wrongs = QuizEngine.pickWrongAnswers(allItems, item.meaning[0], x => x.meaning[0], 3);
      return {
        question: item.char, questionType: 'char',
        answer: item.meaning[0],
        choices: QuizEngine.shuffleChoices([item.meaning[0], ...wrongs]),
        hint: '', explanation: item.char + ' (' + item.pinyin + ') = ' + item.meaning.join(', '),
        alternatives: item.meaning.slice(1), _listeningText: item.char,
      };
    }
    if (selectedType === 'char-to-meaning') {
      const wrongs = QuizEngine.pickWrongAnswers(allItems, item.meaning[0], x => x.meaning[0], 3);
      return { question: item.char, questionType: 'char', answer: item.meaning[0],
        choices: QuizEngine.shuffleChoices([item.meaning[0], ...wrongs]),
        hint: item.pinyin, explanation: item.char + ' (' + item.pinyin + ') = ' + item.meaning.join(', '),
        alternatives: item.meaning.slice(1) };
    }
    if (selectedType === 'char-to-pinyin') {
      const wrongs = QuizEngine.pickWrongAnswers(allItems, item.pinyin, x => x.pinyin, 3);
      return { question: item.char, questionType: 'char', answer: item.pinyin,
        choices: QuizEngine.shuffleChoices([item.pinyin, ...wrongs]),
        hint: 'Arti: ' + item.meaning[0], explanation: item.char + ' dibaca "' + item.pinyin + '" — ' + item.meaning[0] };
    }
    const wrongs = QuizEngine.pickWrongAnswers(allItems, item.char, x => x.char, 3);
    return { question: item.meaning[0], questionType: 'text', answer: item.char,
      choices: QuizEngine.shuffleChoices([item.char, ...wrongs]),
      hint: 'Pinyin: ' + item.pinyin, explanation: '"' + item.meaning[0] + '" ditulis sebagai ' + item.char + ' (' + item.pinyin + ')' };
  }

  function buildVocabQuestion(item, allItems) {
    if (selectedMode === 'listening') {
      const wrongs = QuizEngine.pickWrongAnswers(allItems, item.meaning, x => x.meaning, 3);
      return { question: item.word, questionType: 'char', answer: item.meaning,
        choices: QuizEngine.shuffleChoices([item.meaning, ...wrongs]),
        hint: '', explanation: item.word + ' (' + item.pinyin + ') = ' + item.meaning, _listeningText: item.word };
    }
    if (selectedType === 'char-to-meaning') {
      const wrongs = QuizEngine.pickWrongAnswers(allItems, item.meaning, x => x.meaning, 3);
      return { question: item.word, questionType: 'char', answer: item.meaning,
        choices: QuizEngine.shuffleChoices([item.meaning, ...wrongs]),
        hint: item.pinyin, explanation: item.word + ' (' + item.pinyin + ') = ' + item.meaning };
    }
    const wrongs = QuizEngine.pickWrongAnswers(allItems, item.word, x => x.word, 3);
    return { question: item.meaning, questionType: 'text', answer: item.word,
      choices: QuizEngine.shuffleChoices([item.word, ...wrongs]),
      hint: 'Pinyin: ' + item.pinyin, explanation: '"' + item.meaning + '" = ' + item.word + ' (' + item.pinyin + ')' };
  }

  function renderQuestion() {
    const q = QuizEngine.getQuestion();
    if (!q) return;
    const p = QuizEngine.getProgress();
    document.getElementById('progressLabel').textContent = 'Soal ' + (p.current + 1) + ' dari ' + p.total;
    document.getElementById('progressFill').style.width  = ((p.current / p.total) * 100) + '%';
    document.getElementById('scoreNum').textContent = p.score;

    const qChar = document.getElementById('qChar');
    const qText = document.getElementById('qText');
    const qHint = document.getElementById('qHint');
    const qLabel = document.getElementById('qLabel');
    const listeningWrap = document.getElementById('listeningWrap');
    const listeningPlayBtn = document.getElementById('listeningPlayBtn');
    const listeningPlayCountEl = document.getElementById('listeningPlayCount');

    if (selectedMode === 'listening') {
      if (q.questionType === 'char') {
        qChar.innerHTML = '<span class="quiz-char-hidden" id="hiddenChar">' + q.question + '</span>';
        qChar.style.display = 'flex'; qText.style.display = 'none';
      } else {
        qText.innerHTML = '<span class="quiz-char-hidden" id="hiddenChar">' + q.question + '</span>';
        qText.style.display = 'block'; qChar.style.display = 'none';
      }
      qLabel.textContent = 'Dengar dan pilih arti yang benar';
      qHint.textContent = '';
      listeningWrap.style.display = 'block';
      let playCount = 0;
      listeningPlayCountEl.textContent = '';
      listeningPlayBtn.classList.remove('playing');
      setTimeout(() => { playCount++; playListeningAudio(q, listeningPlayBtn, listeningPlayCountEl, playCount); }, 400);
      listeningPlayBtn.onclick = () => { playCount++; playListeningAudio(q, listeningPlayBtn, listeningPlayCountEl, playCount); };
    } else {
      listeningWrap.style.display = 'none';
      if (q.questionType === 'char') {
        qChar.textContent = q.question; qChar.style.display = 'flex'; qText.style.display = 'none';
        if (selectedType === 'char-to-meaning') qLabel.textContent = 'Apa arti karakter ini?';
        else if (selectedType === 'char-to-pinyin') qLabel.textContent = 'Bagaimana bacaan pinyin-nya?';
        else qLabel.textContent = 'Tebak artinya!';
      } else {
        qText.textContent = q.question; qText.style.display = 'block'; qChar.style.display = 'none';
        qLabel.textContent = selectedMode === 'input' ? 'Ketik karakternya!' : 'Pilih karakter yang sesuai';
      }
      qHint.textContent = q.hint || '';
    }

    document.getElementById('feedback').className = 'quiz-feedback';
    document.getElementById('nextBtn').style.display = 'none';
    const choicesGrid = document.getElementById('choicesGrid');
    const inputWrap = document.getElementById('inputWrap');

    if (selectedMode === 'input') {
      choicesGrid.style.display = 'none'; inputWrap.style.display = 'flex';
      const inputField = document.getElementById('quizInputField');
      const inputSubmit = document.getElementById('inputSubmitBtn');
      const inputSkip = document.getElementById('inputSkipBtn');
      const correctReveal = document.getElementById('correctReveal');
      const inputHint = document.getElementById('inputHint');
      inputField.value = ''; inputField.className = 'quiz-input-field';
      inputField.disabled = false; inputSubmit.disabled = false;
      correctReveal.style.display = 'none'; correctReveal.innerHTML = '';
      if (selectedType === 'char-to-pinyin') inputHint.textContent = 'Ketik dalam pinyin';
      else if (q.questionType === 'text') inputHint.textContent = 'Ketik karakter Mandarin yang tepat';
      else inputHint.textContent = 'Ketik arti dalam Bahasa Indonesia';
      setTimeout(() => inputField.focus(), 100);
      inputSubmit.onclick = () => submitInputAnswer(q);
      inputSkip.onclick = () => submitInputAnswer(q, true);
      inputField.onkeydown = e => { if (e.key === 'Enter' && !inputField.disabled) submitInputAnswer(q); };
    } else if (selectedMode === 'listening') {
      choicesGrid.style.display = ''; inputWrap.style.display = 'none';
      choicesGrid.innerHTML = '';
      q.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'quiz-choice'; btn.textContent = choice;
        btn.addEventListener('click', () => onAnswerListening(choice, q));
        choicesGrid.appendChild(btn);
      });
    } else {
      choicesGrid.style.display = ''; inputWrap.style.display = 'none';
      choicesGrid.innerHTML = '';
      q.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'quiz-choice'; btn.textContent = choice;
        btn.addEventListener('click', () => onAnswer(choice));
        choicesGrid.appendChild(btn);
      });
    }

    const timerEl = document.getElementById('quizTimer');
    timerEl.className = 'quiz-timer';
    QuizEngine.startTimer(
      t => { timerEl.textContent = t; if (t <= 5) timerEl.classList.add('urgent'); },
      () => {
        if (selectedMode === 'input') submitInputAnswer(QuizEngine.getQuestion(), true);
        else if (selectedMode === 'listening') onAnswerListening(null, QuizEngine.getQuestion());
        else onAnswer(null);
      }
    );
  }

  function playListeningAudio(q, btn, countEl, count) {
    const text = q._listeningText || q.question;
    btn.classList.add('playing');
    AudioEngine.speakZH(text);
    if (count > 1) countEl.textContent = 'Diputar ' + count + 'x';
    setTimeout(() => btn.classList.remove('playing'), 2000);
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
    const fb = document.getElementById('feedback');
    const fbIcon = document.getElementById('feedbackIcon');
    const fbText = document.getElementById('feedbackText');
    if (result.correct) {
      listeningXpBonus += 5;
      XPSystem.addXP('listening_correct', 5, '🎧 Listening benar');
      fb.className = 'quiz-feedback correct show'; fbIcon.textContent = '✅';
      fbText.innerHTML = '<strong>Benar!</strong> <span class="listening-bonus-badge">+5 XP Listening</span><br>' + result.explanation;
      App.toast('Benar! +5 XP 🎧', 'success', 1500);
    } else {
      fb.className = 'quiz-feedback wrong show';
      fbIcon.textContent = choice === null ? '⏰' : '❌';
      fbText.innerHTML = '<strong>' + (choice === null ? 'Waktu habis!' : 'Kurang tepat.') + '</strong>' + result.explanation;
    }
    document.getElementById('scoreNum').textContent = QuizEngine.getProgress().score;
    document.getElementById('nextBtn').style.display = 'block';
  }

  function submitInputAnswer(q, skip) {
    skip = skip || false;
    const inputField = document.getElementById('quizInputField');
    const inputSubmit = document.getElementById('inputSubmitBtn');
    const correctReveal = document.getElementById('correctReveal');
    const userRaw = skip ? '' : inputField.value.trim();

    function normPinyin(s) {
      return s.toLowerCase().trim()
        .replace(/[āáǎà]/g, 'a').replace(/[ēéěè]/g, 'e')
        .replace(/[īíǐì]/g, 'i').replace(/[ōóǒò]/g, 'o')
        .replace(/[ūúǔù]/g, 'u').replace(/[ǖǘǚǜ]/g, 'v');
    }
    const userNorm = normPinyin(userRaw);
    const correctNorm = normPinyin(q.answer);
    const alternatives = q.alternatives || [];
    const isCorrect = !skip && (userNorm === correctNorm || alternatives.some(a => normPinyin(a) === userNorm));
    const result = QuizEngine.answer(isCorrect ? q.answer : (userRaw || '__wrong__'));
    if (!result) return;

    inputField.disabled = true; inputSubmit.disabled = true;
    if (!skip && userRaw) inputField.className = 'quiz-input-field ' + (isCorrect ? 'input-correct' : 'input-wrong');
    if (!isCorrect) { correctReveal.style.display = 'block'; correctReveal.innerHTML = 'Jawaban benar: <strong>' + result.answer + '</strong>'; }

    const fb = document.getElementById('feedback');
    const fbIcon = document.getElementById('feedbackIcon');
    const fbText = document.getElementById('feedbackText');
    if (isCorrect) {
      fb.className = 'quiz-feedback correct show'; fbIcon.textContent = '✅';
      fbText.innerHTML = '<strong>Benar!</strong> ' + result.explanation;
      App.toast('Benar! +1', 'success', 1200);
    } else {
      fb.className = 'quiz-feedback wrong show';
      fbIcon.textContent = skip ? '⏩' : '❌';
      fbText.innerHTML = '<strong>' + (skip ? 'Dilewati.' : 'Kurang tepat.') + '</strong> ' + result.explanation;
    }
    document.getElementById('scoreNum').textContent = QuizEngine.getProgress().score;
    document.getElementById('nextBtn').style.display = 'block';
  }

  function onAnswer(choice) {
    const result = QuizEngine.answer(choice);
    if (!result) return;
    document.querySelectorAll('.quiz-choice').forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === result.answer) btn.classList.add('correct');
      if (btn.textContent === choice && !result.correct) btn.classList.add('wrong');
    });
    const fb = document.getElementById('feedback');
    if (result.correct) {
      fb.className = 'quiz-feedback correct show';
      document.getElementById('feedbackIcon').textContent = '✅';
      document.getElementById('feedbackText').innerHTML = '<strong>Benar!</strong>' + result.explanation;
      App.toast('Benar! +1', 'success', 1200);
    } else {
      fb.className = 'quiz-feedback wrong show';
      document.getElementById('feedbackIcon').textContent = '❌';
      document.getElementById('feedbackText').innerHTML = '<strong>' + (choice === null ? 'Waktu habis!' : 'Kurang tepat.') + '</strong>' + result.explanation;
    }
    document.getElementById('scoreNum').textContent = QuizEngine.getProgress().score;
    document.getElementById('nextBtn').style.display = 'block';
  }

  function bindQuizControls() {
    document.getElementById('nextBtn').addEventListener('click', () => {
      if (QuizEngine.next()) renderQuestion();
    });
    document.getElementById('retryBtn').addEventListener('click', () => {
      showScreen('session');
      listeningXpBonus = 0;
      const items = getDataset();
      const timerSecs = selectedMode === 'input' ? 30 : selectedMode === 'listening' ? 25 : 20;
      QuizEngine.start(items, buildQuestion, { totalQuestions: selectedCount, timerSeconds: timerSecs, moduleId: 'quiz-zh-' + selectedModule }, onFinish);
      renderQuestion();
    });
    document.getElementById('backToSelectBtn').addEventListener('click', () => { showScreen('select'); renderBadges(); });
  }

  function onFinish(results, score, total) {
    showScreen('result');
    const pct = Math.round((score / total) * 100);
    let emoji = '😔', title = 'Coba Lagi!';
    if (pct === 100) { emoji = '🏆'; title = 'Sempurna!'; }
    else if (pct >= 80) { emoji = '🎉'; title = 'Luar Biasa!'; }
    else if (pct >= 60) { emoji = '👍'; title = 'Bagus!'; }
    else if (pct >= 40) { emoji = '🙂'; title = 'Lumayan!'; }
    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultSubtitle').textContent = 'Kamu menjawab ' + score + ' dari ' + total + ' soal dengan benar.';
    document.getElementById('resultScoreBig').textContent = score;
    document.getElementById('resultDenom').textContent = '/ ' + total;
    document.getElementById('statAccuracy').textContent = pct + '%';
    document.getElementById('statCorrect').textContent = score;
    document.getElementById('statWrong').textContent = total - score;

    const listeningXpStat = document.getElementById('listeningXpStat');
    if (selectedMode === 'listening' && listeningXpBonus > 0) {
      listeningXpStat.style.display = '';
      document.getElementById('statListeningXP').textContent = '+' + listeningXpBonus + ' XP';
    } else { listeningXpStat.style.display = 'none'; }

    const circumference = 2 * Math.PI * 60;
    document.getElementById('ringFill').setAttribute('stroke-dasharray', (score / total) * circumference + ' ' + circumference);

    document.getElementById('reviewList').innerHTML = results.map(r =>
      '<div class="quiz-review-item"><div class="review-icon">' + (r.correct ? '✅' : '❌') + '</div>' +
      '<div class="review-q">' + r.question + '</div>' +
      '<div class="review-a ' + (r.correct ? 'review-correct' : 'review-wrong') + '">' +
      (r.correct ? r.answer : (r.userAnswer || '—') + ' → ' + r.answer) + '</div></div>'
    ).join('');
    renderBadges();
  }

  function showScreen(name) {
    selectScreen.className  = 'quiz-select-screen'  + (name === 'select'  ? '' : ' hidden');
    sessionScreen.className = 'quiz-session-screen' + (name === 'session' ? ' active' : '');
    resultScreen.className  = 'quiz-result-screen'  + (name === 'result'  ? ' active' : '');
  }

  function renderBadges() {
    const grid = document.getElementById('badgesGrid');
    const owned = BadgeSystem.getBadges();
    const defs = BadgeSystem.getAllBadgeDefs();
    grid.innerHTML = defs.map(b => {
      const has = !!owned[b.id];
      const date = has ? new Date(owned[b.id].earnedAt).toLocaleDateString('id-ID') : '';
      return '<div class="badge-item ' + (has ? '' : 'locked') + '">' +
        '<div class="badge-icon">' + b.icon + '</div>' +
        '<div class="badge-name">' + b.name + '</div>' +
        '<div class="badge-desc">' + b.desc + '</div>' +
        (has ? '<div class="badge-date">' + date + '</div>' : '') + '</div>';
    }).join('');
  }
})();
