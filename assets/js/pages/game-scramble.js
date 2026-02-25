/**
 * Lingora — Game: Word Scramble (Fase 27)
 * Susun huruf yang diacak menjadi kata yang benar
 */
const GameScramble = (() => {

  let state = {
    lang: 'jp',
    count: 5,
    questions: [],  // [{word, romaji, hint, tiles, answer}]
    current: 0,
    score: 0,
    xpTotal: 0,
    answerTiles: [], // {char, srcIdx}
    tileStates: [],  // true = available
    answered: false,
  };

  // ── Build question pool ────────────────────────────────────
  function buildPool(lang, count) {
    let allWords = [];

    if (lang === 'jp') {
      // Use romaji of words — scramble the romaji letters
      const vocab = JpVocabData.vocab;
      allWords = vocab.filter(v => v.romaji && v.romaji.length >= 3 && v.romaji.length <= 10 && !v.romaji.includes(' '))
        .map(v => ({
          word: v.romaji,
          hint: `${v.word} — ${v.meaning}`,
          answer: v.romaji,
          display: v.word
        }));
    } else if (lang === 'zh') {
      // Use pinyin
      const vocab = ZhVocabData.vocab;
      allWords = vocab.filter(v => v.pinyin && v.pinyin.length >= 2 && v.pinyin.length <= 10 && !v.pinyin.includes(' '))
        .map(v => ({
          word: v.pinyin,
          hint: `${v.word} — ${v.meaning}`,
          answer: v.pinyin,
          display: v.word
        }));
    } else if (lang === 'kr') {
      // Use romanization
      const vocab = KrVocabData.getAll();
      allWords = vocab.filter(v => v.romanization && v.romanization.length >= 2 && v.romanization.length <= 10 && !v.romanization.includes(' '))
        .map(v => ({
          word: v.romanization,
          hint: `${v.word} — ${v.meaning}`,
          answer: v.romanization,
          display: v.word
        }));
    }

    // Pick random subset and scramble each
    const picked = allWords.sort(() => Math.random() - 0.5).slice(0, count);
    return picked.map(q => ({
      ...q,
      tiles: scrambleStr(q.answer),
    }));
  }

  function scrambleStr(str) {
    // Ensure scramble is different from original
    let arr = str.split('');
    let attempts = 0;
    do {
      arr = arr.sort(() => Math.random() - 0.5);
      attempts++;
    } while (arr.join('') === str && attempts < 20 && str.length > 1);
    return arr;
  }

  // ── Render ────────────────────────────────────────────────
  function renderQuestion() {
    const q = state.questions[state.current];
    state.answerTiles = [];
    state.tileStates = q.tiles.map(() => true); // all available
    state.answered = false;

    // Update stat bar
    document.getElementById('q-num').textContent = state.current + 1;
    document.getElementById('q-total').textContent = state.questions.length;
    document.getElementById('score-val').textContent = state.score;
    document.getElementById('progress-fill').style.width = `${(state.current / state.questions.length) * 100}%`;

    // Hint
    document.getElementById('scramble-hint').textContent = q.hint;

    // Hide feedback
    const fb = document.getElementById('scramble-feedback');
    fb.style.display = 'none';
    fb.className = 'scramble-feedback';

    renderTiles();
    renderAnswer();
  }

  function renderTiles() {
    const q = state.questions[state.current];
    const area = document.getElementById('tiles-area');
    area.innerHTML = '';
    q.tiles.forEach((ch, i) => {
      const tile = document.createElement('div');
      tile.className = 'scramble-tile' + (state.tileStates[i] ? '' : ' placed');
      tile.textContent = ch;
      tile.dataset.idx = i;
      if (state.tileStates[i]) {
        tile.addEventListener('click', () => placeTile(i));
      }
      area.appendChild(tile);
    });
  }

  function renderAnswer() {
    const area = document.getElementById('answer-area');
    area.innerHTML = '';
    if (state.answerTiles.length === 0) {
      area.style.opacity = '0.5';
      return;
    }
    area.style.opacity = '1';
    state.answerTiles.forEach((t, ansIdx) => {
      const tile = document.createElement('div');
      tile.className = 'scramble-answer-tile';
      tile.textContent = t.char;
      tile.addEventListener('click', () => removeTile(ansIdx));
      area.appendChild(tile);
    });
  }

  function placeTile(srcIdx) {
    if (!state.tileStates[srcIdx] || state.answered) return;
    const q = state.questions[state.current];
    state.tileStates[srcIdx] = false;
    state.answerTiles.push({ char: q.tiles[srcIdx], srcIdx });
    renderTiles();
    renderAnswer();
  }

  function removeTile(ansIdx) {
    if (state.answered) return;
    const t = state.answerTiles[ansIdx];
    state.tileStates[t.srcIdx] = true;
    state.answerTiles.splice(ansIdx, 1);
    renderTiles();
    renderAnswer();
  }

  function clearAnswer() {
    if (state.answered) return;
    state.answerTiles.forEach(t => { state.tileStates[t.srcIdx] = true; });
    state.answerTiles = [];
    renderTiles();
    renderAnswer();
  }

  function checkAnswer() {
    if (state.answered) { nextQuestion(); return; }
    const q = state.questions[state.current];
    const userAnswer = state.answerTiles.map(t => t.char).join('');
    const correct = userAnswer.toLowerCase() === q.answer.toLowerCase();
    state.answered = true;

    const fb = document.getElementById('scramble-feedback');
    fb.style.display = '';

    if (correct) {
      state.score++;
      state.xpTotal += 3;
      XPSystem.addXP(3, 'Word Scramble');
      fb.className = 'scramble-feedback correct';
      fb.textContent = `✅ Benar! "${q.display}" = ${q.answer}`;
    } else {
      fb.className = 'scramble-feedback wrong';
      fb.textContent = `❌ Kurang tepat. Jawaban: ${q.answer} (${q.display})`;
    }

    document.getElementById('check-btn').textContent = 'Lanjut →';
    document.getElementById('score-val').textContent = state.score;
  }

  function nextQuestion() {
    state.current++;
    if (state.current >= state.questions.length) {
      showResult();
    } else {
      document.getElementById('check-btn').textContent = '✓ Cek Jawaban';
      renderQuestion();
    }
  }

  // ── Result ────────────────────────────────────────────────
  function showResult() {
    const total = state.questions.length;
    const pct = Math.round((state.score / total) * 100);
    let emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '💪';
    let title = pct >= 80 ? 'Luar Biasa!' : pct >= 60 ? 'Bagus!' : 'Terus Berlatih!';

    document.getElementById('result-screen').innerHTML = `
      <div class="game-result">
        <div class="game-result-emoji">${emoji}</div>
        <div class="game-result-title">${title}</div>
        <div class="game-result-sub">Kamu menyelesaikan ${total} soal Word Scramble</div>
        <div class="game-result-stats">
          <div class="game-result-stat">
            <div class="game-result-stat-val">${state.score}/${total}</div>
            <div class="game-result-stat-label">Benar</div>
          </div>
          <div class="game-result-stat">
            <div class="game-result-stat-val">${pct}%</div>
            <div class="game-result-stat-label">Akurasi</div>
          </div>
          <div class="game-result-stat">
            <div class="game-result-stat-val">+${state.xpTotal}</div>
            <div class="game-result-stat-label">XP</div>
          </div>
        </div>
        <div class="game-result-buttons">
          <button class="game-btn game-btn-primary" id="play-again-btn">🔄 Main Lagi</button>
          <button class="game-btn game-btn-outline" id="back-hub-btn">🏠 Hub Game</button>
        </div>
      </div>
    `;

    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = '';

    document.getElementById('play-again-btn').addEventListener('click', startGame);
    document.getElementById('back-hub-btn').addEventListener('click', () => { window.location.href = '../games.html'; });

    App.toast(`+${state.xpTotal} XP dari Word Scramble!`, 'success');
  }

  // ── Start / Setup ──────────────────────────────────────────
  function startGame() {
    state.questions = buildPool(state.lang, state.count);
    state.current = 0;
    state.score = 0;
    state.xpTotal = 0;

    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = '';
    document.getElementById('check-btn').textContent = '✓ Cek Jawaban';

    renderQuestion();
  }

  function init() {
    Router.guard();

    document.getElementById('lang-btns').addEventListener('click', e => {
      const btn = e.target.closest('[data-lang]');
      if (!btn) return;
      state.lang = btn.dataset.lang;
      document.querySelectorAll('#lang-btns .game-option-btn').forEach(b => b.classList.toggle('active', b === btn));
    });

    document.getElementById('count-btns').addEventListener('click', e => {
      const btn = e.target.closest('[data-count]');
      if (!btn) return;
      state.count = parseInt(btn.dataset.count);
      document.querySelectorAll('#count-btns .game-option-btn').forEach(b => b.classList.toggle('active', b === btn));
    });

    document.getElementById('start-btn').addEventListener('click', startGame);

    document.getElementById('clear-btn').addEventListener('click', clearAnswer);

    document.getElementById('check-btn').addEventListener('click', checkAnswer);

    document.getElementById('quit-btn').addEventListener('click', () => {
      document.getElementById('game-screen').style.display = 'none';
      document.getElementById('setup-screen').style.display = '';
    });
  }

  return { init };
})();
