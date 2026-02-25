/**
 * Lingora — Game: Falling Kana (Fase 27)
 * Karakter jatuh dari atas, user ketik romanisasi sebelum menyentuh garis
 */
const GameFalling = (() => {

  // ── Config ────────────────────────────────────────────────
  const BASE_SPEED = 40;    // px per second at level 1
  const SPEED_INC  = 8;     // px/s added per level
  const LEVEL_EVERY = 10;   // correct answers per level
  const SPAWN_INTERVAL_BASE = 2200; // ms between spawns at level 1
  const SPAWN_MIN = 800;

  let cfg = {
    category: 'hiragana',
    maxLives: 5,
  };

  let state = {
    running: false,
    score: 0,
    correct: 0,
    missed: 0,
    lives: 5,
    level: 1,
    items: [],       // falling items: {char, answer, x, y, speed, color}
    pool: [],        // char pool
    lastSpawn: 0,
    spawnInterval: 2200,
    raf: null,
    lastTime: null,
    xpTotal: 0,
  };

  let canvas, ctx;
  const COLORS = ['#C0392B','#2980b9','#27ae60','#8e44ad','#e67e22','#16a085'];

  // ── Pool ─────────────────────────────────────────────────
  function buildPool(cat) {
    let pool = [];
    if (cat === 'hiragana' || cat === 'mix') {
      HiraganaData.basic.forEach(c => {
        if (c.romaji) pool.push({ char: c.char, answer: c.romaji });
      });
    }
    if (cat === 'katakana' || cat === 'mix') {
      KatakanaData.basic.forEach(c => {
        if (c.romaji) pool.push({ char: c.char, answer: c.romaji });
      });
    }
    if (cat === 'hangul') {
      HangulData.getConsonants().forEach(c => {
        pool.push({ char: c.jamo, answer: c.romanization.split('/')[0].trim() });
      });
      HangulData.getVowels().forEach(c => {
        pool.push({ char: c.jamo, answer: c.romanization.split('/')[0].trim() });
      });
    }
    return pool;
  }

  function pickRandom() {
    return state.pool[Math.floor(Math.random() * state.pool.length)];
  }

  // ── Canvas Render ─────────────────────────────────────────
  function resizeCanvas() {
    const wrap = document.getElementById('falling-canvas-wrap');
    canvas.width = wrap.clientWidth;
    canvas.height = Math.min(350, window.innerHeight * 0.4);
  }

  function drawFrame(timestamp) {
    if (!state.running) return;
    if (!state.lastTime) state.lastTime = timestamp;
    const dt = (timestamp - state.lastTime) / 1000; // seconds
    state.lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw danger line
    const dangerY = canvas.height - 44;
    ctx.save();
    ctx.strokeStyle = '#e74c3c44';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(0, dangerY);
    ctx.lineTo(canvas.width, dangerY);
    ctx.stroke();
    ctx.restore();

    // Spawn new item
    if (timestamp - state.lastSpawn > state.spawnInterval && state.items.length < 5) {
      spawnItem();
      state.lastSpawn = timestamp;
    }

    // Update & draw items
    const survived = [];
    state.items.forEach(item => {
      item.y += item.speed * dt;

      // Draw char bubble
      const radius = 28;
      ctx.save();
      ctx.beginPath();
      ctx.arc(item.x, item.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = item.color + 'cc';
      ctx.fill();
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.font = `bold ${canvas.width < 400 ? 18 : 22}px var(--font-cjk, serif)`;
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.char, item.x, item.y);
      ctx.restore();

      if (item.y + radius >= dangerY + 40) {
        // Missed
        onMiss(item);
      } else {
        survived.push(item);
      }
    });
    state.items = survived;

    state.raf = requestAnimationFrame(drawFrame);
  }

  function spawnItem() {
    const pick = pickRandom();
    const radius = 28;
    const x = radius + Math.random() * (canvas.width - 2 * radius);
    const speed = BASE_SPEED + (state.level - 1) * SPEED_INC;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    state.items.push({ char: pick.char, answer: pick.answer, x, y: -30, speed, color });
  }

  // ── Game Events ────────────────────────────────────────────
  function onHit(item) {
    state.correct++;
    state.score += 10 + state.level;
    state.xpTotal++;
    XPSystem.addXP(1, 'Falling Kana');

    // Level up?
    const newLevel = Math.floor(state.correct / LEVEL_EVERY) + 1;
    if (newLevel > state.level) {
      state.level = newLevel;
      state.spawnInterval = Math.max(SPAWN_MIN, SPAWN_INTERVAL_BASE - (state.level - 1) * 200);
      updateSpeedBadge();
    }

    // Flash input green
    const inp = document.getElementById('falling-input');
    inp.classList.add('correct-flash');
    setTimeout(() => inp.classList.remove('correct-flash'), 300);

    document.getElementById('score-val').textContent = state.score;
  }

  function onMiss(item) {
    state.missed++;
    state.lives--;
    updateLives();

    // Flash input red briefly
    const inp = document.getElementById('falling-input');
    inp.classList.add('wrong-flash');
    setTimeout(() => inp.classList.remove('wrong-flash'), 300);

    if (state.lives <= 0) {
      state.running = false;
      cancelAnimationFrame(state.raf);
      showGameOver();
    }
  }

  function checkInput(val) {
    const input = val.trim().toLowerCase();
    for (let i = 0; i < state.items.length; i++) {
      const item = state.items[i];
      if (item.answer.toLowerCase() === input) {
        state.items.splice(i, 1);
        onHit(item);
        return true;
      }
    }
    return false;
  }

  // ── UI Updates ─────────────────────────────────────────────
  function updateLives() {
    document.getElementById('lives-display').innerHTML = '❤️'.repeat(state.lives) + (state.lives < cfg.maxLives ? '🖤'.repeat(cfg.maxLives - state.lives) : '');
  }

  function updateSpeedBadge() {
    document.getElementById('speed-badge').textContent = `Lv.${state.level}`;
  }

  function showGameOver() {
    // Draw gameover overlay on canvas
    const wrap = document.getElementById('falling-canvas-wrap');
    const overlay = document.createElement('div');
    overlay.className = 'falling-gameover-overlay';
    overlay.id = 'gameover-overlay';
    overlay.innerHTML = `
      <div class="falling-gameover-box">
        <div style="font-size:2rem;margin-bottom:0.5rem;">💀</div>
        <h3>Game Over!</h3>
        <p>Skor: <strong>${state.score}</strong> | Level: <strong>${state.level}</strong></p>
        <button class="game-btn game-btn-primary" id="go-result-btn" style="width:100%;">Lihat Hasil</button>
      </div>
    `;
    wrap.appendChild(overlay);
    document.getElementById('go-result-btn').addEventListener('click', showResult);
  }

  function showResult() {
    const xpFinal = state.xpTotal + Math.floor(state.score / 10);
    XPSystem.addXP(Math.floor(state.score / 10), 'Falling Kana Bonus');

    let emoji = state.level >= 5 ? '🏆' : state.level >= 3 ? '🎉' : '💪';
    let title = state.level >= 5 ? 'Master Kana!' : state.level >= 3 ? 'Hebat!' : 'Terus Berlatih!';

    document.getElementById('result-screen').innerHTML = `
      <div class="game-result">
        <div class="game-result-emoji">${emoji}</div>
        <div class="game-result-title">${title}</div>
        <div class="game-result-sub">Kamu mencapai Level ${state.level}!</div>
        <div class="game-result-stats">
          <div class="game-result-stat">
            <div class="game-result-stat-val">${state.score}</div>
            <div class="game-result-stat-label">Skor</div>
          </div>
          <div class="game-result-stat">
            <div class="game-result-stat-val">${state.correct}</div>
            <div class="game-result-stat-label">Benar</div>
          </div>
          <div class="game-result-stat">
            <div class="game-result-stat-val">${state.missed}</div>
            <div class="game-result-stat-label">Terlewat</div>
          </div>
          <div class="game-result-stat">
            <div class="game-result-stat-val">+${xpFinal}</div>
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

    App.toast(`+${xpFinal} XP dari Falling Kana!`, 'success');
  }

  // ── Start ──────────────────────────────────────────────────
  function startGame() {
    state = {
      running: true,
      score: 0,
      correct: 0,
      missed: 0,
      lives: cfg.maxLives,
      level: 1,
      items: [],
      pool: buildPool(cfg.category),
      lastSpawn: 0,
      spawnInterval: SPAWN_INTERVAL_BASE,
      raf: null,
      lastTime: null,
      xpTotal: 0,
    };

    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = '';

    // Remove old overlay if any
    const old = document.getElementById('gameover-overlay');
    if (old) old.remove();

    resizeCanvas();
    updateLives();
    updateSpeedBadge();
    document.getElementById('score-val').textContent = '0';
    document.getElementById('falling-input').value = '';
    document.getElementById('falling-input').focus();

    state.lastTime = null;
    state.raf = requestAnimationFrame(drawFrame);
  }

  // ── Init ───────────────────────────────────────────────────
  function init() {
    Router.guard();

    canvas = document.getElementById('falling-canvas');
    ctx = canvas.getContext('2d');

    document.getElementById('cat-btns').addEventListener('click', e => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      cfg.category = btn.dataset.cat;
      document.querySelectorAll('#cat-btns .game-option-btn').forEach(b => b.classList.toggle('active', b === btn));
    });

    document.getElementById('lives-btns').addEventListener('click', e => {
      const btn = e.target.closest('[data-lives]');
      if (!btn) return;
      cfg.maxLives = parseInt(btn.dataset.lives);
      document.querySelectorAll('#lives-btns .game-option-btn').forEach(b => b.classList.toggle('active', b === btn));
    });

    document.getElementById('start-btn').addEventListener('click', startGame);

    document.getElementById('quit-btn').addEventListener('click', () => {
      state.running = false;
      cancelAnimationFrame(state.raf);
      document.getElementById('game-screen').style.display = 'none';
      document.getElementById('setup-screen').style.display = '';
    });

    // Input: submit on Enter
    document.getElementById('falling-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = e.target.value;
        const hit = checkInput(val);
        e.target.value = '';
        if (!hit && val.trim()) {
          e.target.classList.add('wrong-flash');
          setTimeout(() => e.target.classList.remove('wrong-flash'), 300);
        }
      }
    });

    document.getElementById('submit-btn').addEventListener('click', () => {
      const inp = document.getElementById('falling-input');
      const val = inp.value;
      checkInput(val);
      inp.value = '';
      inp.focus();
    });

    window.addEventListener('resize', () => {
      if (state.running) resizeCanvas();
    });
  }

  return { init };
})();
