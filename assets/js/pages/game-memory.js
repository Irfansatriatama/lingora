/**
 * Lingora — Game: Memory Match (Fase 27)
 * Cocokkan kartu pasangan karakter-arti
 */
const GameMemory = (() => {

  // ── State ────────────────────────────────────────────────
  let state = {
    category: 'hiragana',
    pairCount: 8,
    cards: [],         // [{id, pairId, type:'char'|'meaning', char, meaning, matched, flipped}]
    flipped: [],       // max 2 indices
    locked: false,
    moves: 0,
    matches: 0,
    timer: 0,
    timerInterval: null,
    started: false,
  };

  // ── Data Loaders ──────────────────────────────────────────
  function loadPool(cat) {
    let pool = [];
    if (cat === 'hiragana') {
      HiraganaData.basic.filter(c => c.romaji && !c.romaji.includes('(')).forEach(c => {
        pool.push({ char: c.char, meaning: c.romaji });
      });
    } else if (cat === 'katakana') {
      KatakanaData.basic.filter(c => c.romaji && !c.romaji.includes('(')).forEach(c => {
        pool.push({ char: c.char, meaning: c.romaji });
      });
    } else if (cat === 'hangul') {
      const consonants = HangulData.getConsonants();
      const vowels = HangulData.getVowels();
      consonants.forEach(c => pool.push({ char: c.jamo, meaning: c.romanization.split('/')[0].trim() }));
      vowels.forEach(c => pool.push({ char: c.jamo, meaning: c.romanization.split('/')[0].trim() }));
    } else if (cat === 'kanji') {
      // KanjiData exposes n5 array via getN5() or similar
      const kList = typeof KanjiData.getByLevel === 'function' 
        ? KanjiData.getByLevel('N5')
        : (KanjiData.n5 || KanjiData.all || []);
      kList.forEach(k => {
        pool.push({ char: k.char, meaning: Array.isArray(k.meaning) ? k.meaning[0] : k.meaning });
      });
    }
    return pool;
  }

  function buildCards(pool, pairCount) {
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, pairCount);
    const cards = [];
    shuffled.forEach((item, i) => {
      cards.push({ id: i * 2,     pairId: i, type: 'char',    char: item.char, meaning: item.meaning, matched: false, flipped: false });
      cards.push({ id: i * 2 + 1, pairId: i, type: 'meaning', char: item.char, meaning: item.meaning, matched: false, flipped: false });
    });
    return cards.sort(() => Math.random() - 0.5);
  }

  // ── Render ────────────────────────────────────────────────
  function renderGrid() {
    const grid = document.getElementById('memory-grid');
    const colCount = state.pairCount <= 8 ? 4 : state.pairCount <= 12 ? 4 : 6;
    grid.className = `memory-grid memory-grid-${colCount <= 4 ? '4x4' : '6x6'}`;

    grid.innerHTML = '';
    state.cards.forEach((card, idx) => {
      const el = document.createElement('div');
      el.className = 'memory-card' + (card.flipped || card.matched ? ' flipped' : '') + (card.matched ? ' matched matched-anim' : '');
      el.dataset.idx = idx;

      el.innerHTML = `
        <div class="memory-card-front"></div>
        <div class="memory-card-back">
          <div class="memory-card-char">${card.type === 'char' ? card.char : ''}</div>
          <div class="memory-card-meaning">${card.type === 'meaning' ? card.meaning : ''}</div>
        </div>
      `;

      el.addEventListener('click', () => onCardClick(idx));
      grid.appendChild(el);
    });

    document.getElementById('total-pairs-val').textContent = state.pairCount;
    document.getElementById('match-val').textContent = state.matches;
    document.getElementById('moves-val').textContent = state.moves;
  }

  function flipCardEl(idx, flipped) {
    const el = document.querySelector(`[data-idx="${idx}"]`);
    if (!el) return;
    if (flipped) el.classList.add('flipped');
    else el.classList.remove('flipped');
  }

  function markMatched(idx1, idx2) {
    [idx1, idx2].forEach(idx => {
      const el = document.querySelector(`[data-idx="${idx}"]`);
      if (el) el.classList.add('matched', 'matched-anim');
    });
    document.getElementById('match-val').textContent = state.matches;
  }

  function shakeCards(idx1, idx2) {
    [idx1, idx2].forEach(idx => {
      const el = document.querySelector(`[data-idx="${idx}"]`);
      if (el) {
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 400);
      }
    });
  }

  // ── Game Logic ─────────────────────────────────────────────
  function onCardClick(idx) {
    const card = state.cards[idx];
    if (state.locked || card.flipped || card.matched) return;

    if (!state.started) startTimer();

    card.flipped = true;
    flipCardEl(idx, true);
    state.flipped.push(idx);

    if (state.flipped.length === 2) {
      state.locked = true;
      state.moves++;
      document.getElementById('moves-val').textContent = state.moves;

      const [a, b] = state.flipped;
      const ca = state.cards[a];
      const cb = state.cards[b];

      if (ca.pairId === cb.pairId && ca.type !== cb.type) {
        // Match!
        ca.matched = true;
        cb.matched = true;
        state.matches++;
        markMatched(a, b);
        state.flipped = [];
        state.locked = false;

        if (state.matches === state.pairCount) {
          setTimeout(showResult, 600);
        }
      } else {
        // No match
        setTimeout(() => {
          shakeCards(a, b);
          setTimeout(() => {
            ca.flipped = false;
            cb.flipped = false;
            flipCardEl(a, false);
            flipCardEl(b, false);
            state.flipped = [];
            state.locked = false;
          }, 400);
        }, 600);
      }
    }
  }

  function startTimer() {
    state.started = true;
    state.timerInterval = setInterval(() => {
      state.timer++;
      document.getElementById('timer-val').textContent = state.timer;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }

  // ── Scoring & Result ──────────────────────────────────────
  function calcScore() {
    // Base score: pairs * 100, minus moves penalty, plus time bonus
    const base = state.pairCount * 100;
    const movePenalty = Math.max(0, (state.moves - state.pairCount) * 5);
    const timePenalty = Math.floor(state.timer * 0.5);
    return Math.max(10, base - movePenalty - timePenalty);
  }

  function showResult() {
    stopTimer();
    const score = calcScore();
    const xpEarned = 20 + Math.floor(score / 20);
    XPSystem.addXP(xpEarned, 'Game Memory Match');

    const catName = { hiragana:'Hiragana', katakana:'Katakana', hangul:'Hangul', kanji:'Kanji N5' }[state.category];
    const timeStr = `${Math.floor(state.timer/60)}:${String(state.timer%60).padStart(2,'0')}`;

    let emoji = '🎉';
    let title = 'Luar Biasa!';
    let sub = 'Kamu berhasil mencocokkan semua kartu!';
    if (state.moves <= state.pairCount + 2) { emoji = '🏆'; title = 'Sempurna!'; sub = 'Kamu menyelesaikannya dengan sangat efisien!'; }
    else if (state.moves > state.pairCount * 2.5) { emoji = '💪'; title = 'Berhasil!'; sub = 'Latih terus memorimu!'; }

    document.getElementById('result-screen').innerHTML = `
      <div class="game-result">
        <div class="game-result-emoji">${emoji}</div>
        <div class="game-result-title">${title}</div>
        <div class="game-result-sub">${sub}</div>
        <div class="game-result-stats">
          <div class="game-result-stat">
            <div class="game-result-stat-val">${state.moves}</div>
            <div class="game-result-stat-label">Langkah</div>
          </div>
          <div class="game-result-stat">
            <div class="game-result-stat-val">${timeStr}</div>
            <div class="game-result-stat-label">Waktu</div>
          </div>
          <div class="game-result-stat">
            <div class="game-result-stat-val">${score}</div>
            <div class="game-result-stat-label">Skor</div>
          </div>
          <div class="game-result-stat">
            <div class="game-result-stat-val">+${xpEarned}</div>
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

    document.getElementById('play-again-btn').addEventListener('click', () => startGame());
    document.getElementById('back-hub-btn').addEventListener('click', () => {
      window.location.href = '../games.html';
    });

    App.toast(`+${xpEarned} XP dari Memory Match!`, 'success');
  }

  // ── Start / Setup ──────────────────────────────────────────
  function startGame() {
    const pool = loadPool(state.category);
    if (pool.length < state.pairCount) {
      state.pairCount = Math.min(pool.length, 8);
    }

    state.cards = buildCards(pool, state.pairCount);
    state.flipped = [];
    state.locked = false;
    state.moves = 0;
    state.matches = 0;
    state.timer = 0;
    state.started = false;
    clearInterval(state.timerInterval);

    document.getElementById('timer-val').textContent = '0';

    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = '';

    renderGrid();
  }

  function init() {
    Router.guard();

    // Category buttons
    document.getElementById('category-btns').addEventListener('click', e => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      state.category = btn.dataset.cat;
      document.querySelectorAll('#category-btns .game-option-btn').forEach(b => b.classList.toggle('active', b === btn));
    });

    // Size buttons
    document.getElementById('size-btns').addEventListener('click', e => {
      const btn = e.target.closest('[data-size]');
      if (!btn) return;
      state.pairCount = parseInt(btn.dataset.size);
      document.querySelectorAll('#size-btns .game-option-btn').forEach(b => b.classList.toggle('active', b === btn));
    });

    // Start
    document.getElementById('start-btn').addEventListener('click', startGame);

    // Quit
    document.getElementById('quit-btn').addEventListener('click', () => {
      stopTimer();
      document.getElementById('game-screen').style.display = 'none';
      document.getElementById('setup-screen').style.display = '';
    });
  }

  return { init };
})();
