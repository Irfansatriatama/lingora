/**
 * Lingora - Korean Vocabulary Page JS (Fase 21.4)
 * Module: kr-vocab | Data: KrVocabData | Audio: ko-KR
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!Router.guard()) return;
  App.init('kr-vocab');

  const MODULE_ID  = 'kr-vocab';
  let activeTheme  = 'all';
  let activeLevel  = 'all';
  let showFavOnly  = false;
  let searchQuery  = '';

  // Load settings & user
  const user     = Auth.getActiveUser();
  const settings = Storage.getUser(user.id, 'settings', { showRomanization: true });

  // Audio
  if (AudioEngine.isSupported()) AudioEngine.init(user.id);

  // ── Header ─────────────────────────────────────────────────
  function updateHeader() {
    const learned = Progress.getLearned(MODULE_ID);
    const total   = KrVocabData.getAll().length;
    const pct     = total > 0 ? Math.round((learned.length / total) * 100) : 0;
    document.getElementById('hdr-pct').textContent = pct + '%';
    document.getElementById('hdr-sub').textContent = learned.length + ' / ' + total + ' hafal';
  }

  updateHeader();

  // ── Theme tabs ─────────────────────────────────────────────
  function renderThemeTabs() {
    const container = document.getElementById('theme-tabs');
    const allCount  = getFiltered('all', activeLevel).length;
    const allBtn    = `<button class="theme-tab active" data-theme="all">Semua (${allCount})</button>`;
    const themeBtns = KrVocabData.getThemes().map(t => {
      const count = KrVocabData.getByTheme(t.id).length;
      return `<button class="theme-tab" data-theme="${t.id}">${t.icon} ${t.label} (${count})</button>`;
    }).join('');
    container.innerHTML = allBtn + themeBtns;

    container.querySelectorAll('.theme-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.theme-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTheme = btn.dataset.theme;
        searchQuery = '';
        document.getElementById('vocab-search').value = '';
        renderGrid();
      });
    });
  }

  renderThemeTabs();

  // ── Level filter ───────────────────────────────────────────
  document.querySelectorAll('.filter-level').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-level').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeLevel = btn.dataset.level;
      renderGrid();
    });
  });

  // ── Search ─────────────────────────────────────────────────
  document.getElementById('vocab-search').addEventListener('input', e => {
    searchQuery = e.target.value.trim().toLowerCase();
    if (searchQuery) {
      document.querySelectorAll('.theme-tab').forEach(b => b.classList.remove('active'));
      document.querySelector('[data-theme="all"]').classList.add('active');
      activeTheme = 'all';
    }
    renderGrid();
  });

  // ── Reset ──────────────────────────────────────────────────
  document.getElementById('reset-btn').addEventListener('click', () => {
    searchQuery = '';
    activeTheme = 'all';
    activeLevel = 'all';
    showFavOnly = false;
    document.getElementById('vocab-search').value = '';
    document.querySelectorAll('.theme-tab').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-theme="all"]').classList.add('active');
    document.querySelectorAll('.filter-level').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-level="all"]').classList.add('active');
    const favBtn = document.getElementById('fav-filter-btn');
    if (favBtn) favBtn.classList.remove('active');
    renderGrid();
  });

  const favFilterBtn = document.getElementById('fav-filter-btn');
  if (favFilterBtn) {
    favFilterBtn.addEventListener('click', () => {
      showFavOnly = !showFavOnly;
      favFilterBtn.classList.toggle('active', showFavOnly);
      if (showFavOnly) {
        document.querySelectorAll('.filter-level').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-level[data-level="all"]').classList.add('active');
        activeLevel = 'all';
      }
      renderGrid();
    });
  }

  // ── Filter helper ──────────────────────────────────────────
  function getFiltered(theme, level) {
    let data = theme === 'all' ? KrVocabData.getAll() : KrVocabData.getByTheme(theme);
    if (level !== 'all') data = data.filter(v => v.level === level);
    return data;
  }

  function searchVocab(q) {
    return KrVocabData.getAll().filter(v =>
      v.word.includes(q) ||
      v.romanization.toLowerCase().includes(q) ||
      v.meaning.toLowerCase().includes(q) ||
      (v.example && v.example.kr && v.example.kr.includes(q))
    );
  }

  // ── Grid render ────────────────────────────────────────────
  function renderGrid() {
    const grid    = document.getElementById('vocab-grid');
    const learned = Progress.getLearned(MODULE_ID);
    const favs    = Progress.getFavorites ? Progress.getFavorites(MODULE_ID) : [];
    const showRoman = settings.showRomanization !== false;

    let data = searchQuery
      ? searchVocab(searchQuery)
      : getFiltered(activeTheme, activeLevel);

    if (searchQuery && activeLevel !== 'all') {
      data = data.filter(v => v.level === activeLevel);
    }
    if (showFavOnly) data = data.filter(v => favs.includes(v.word));

    document.getElementById('grid-count').textContent = data.length + ' kata';

    if (data.length === 0) {
      if (showFavOnly) {
        grid.innerHTML = '<div class="zh-empty"><div class="zh-empty-icon">★</div><p>Belum ada kosakata favorit. Klik ★ pada kartu untuk menandai.</p></div>';
      } else {
        grid.innerHTML = '<div class="zh-empty"><div class="zh-empty-icon">어</div><p>Tidak ada kata ditemukan.</p></div>';
      }
      return;
    }

    const levelClass = (level) => level === 'TOPIK1' ? 'kr-badge-topik1' : 'kr-badge-topik2';
    const levelLabel = (level) => level === 'TOPIK1' ? 'TOPIK I' : 'TOPIK II';

    grid.innerHTML = data.map(v => {
      const isLearned = learned.includes(v.word);
      const isFav = favs.includes(v.word);
      const hasAudio = AudioEngine.isSupported() && (typeof AudioEngine.hasKRVoice === 'function' ? true : true);

      return `
        <div class="vocab-card${isLearned ? ' learned' : ''}" data-word="${v.word}">
          ${isLearned ? '<div class="vocab-card-check">&#10003; Hafal</div>' : ''}
          <button class="fav-btn${isFav ? ' active' : ''}" data-fav="${v.word}" title="Favorit">&#9733;</button>
          <div class="vocab-card-top">
            <div class="vocab-word kr-word">${v.word}</div>
            <span class="badge ${levelClass(v.level)}" style="font-size:0.65rem">${levelLabel(v.level)}</span>
            ${hasAudio ? AudioEngine.btnHTML(v.word, 'kr', 'audio-btn-sm') : ''}
          </div>
          ${showRoman ? `<div class="vocab-pinyin kr-romanization">${v.romanization}</div>` : ''}
          <div class="vocab-meaning">${v.meaning}</div>
          <div class="vocab-example">
            <div class="vocab-example-jp kr-example">${v.example.kr}</div>
            ${showRoman ? `<div class="vocab-example-roman">${v.example.roman}</div>` : ''}
            <div class="vocab-example-tr">${v.example.id}</div>
          </div>
        </div>
      `;
    }).join('');

    // Event delegation untuk klik
    grid.onclick = null;
    grid.addEventListener('click', e => {
      // Audio button
      const aBtn = e.target.closest('.audio-btn');
      if (aBtn) {
        e.stopPropagation();
        if (typeof AudioEngine.speakKR === 'function') {
          AudioEngine.speakKR(aBtn.dataset.speak);
        } else {
          AudioEngine.speak(aBtn.dataset.speak, 'ko-KR');
        }
        return;
      }

      // Fav button
      const favBtn = e.target.closest('.fav-btn');
      if (favBtn) {
        e.stopPropagation();
        if (Progress.toggleFavorite) {
          const isNowFav = Progress.toggleFavorite(MODULE_ID, favBtn.dataset.fav);
          favBtn.classList.toggle('active', isNowFav);
          App.toast(isNowFav ? '\u2b50 Ditambahkan ke favorit' : 'Favorit dihapus', 'default', 1400);
        }
        return;
      }

      // Card click → toggle learned
      const card = e.target.closest('.vocab-card');
      if (card) {
        const word = card.dataset.word;
        const wasLearned = Progress.isLearned(MODULE_ID, word);
        if (wasLearned) {
          Progress.unmarkLearned(MODULE_ID, word);
          card.classList.remove('learned');
          const check = card.querySelector('.vocab-card-check');
          if (check) check.remove();
        } else {
          Progress.markLearned(MODULE_ID, word);
          card.classList.add('learned');
          const checkEl = document.createElement('div');
          checkEl.className = 'vocab-card-check';
          checkEl.textContent = '\u2713 Hafal';
          card.prepend(checkEl);
          // XP
          if (typeof XPSystem !== 'undefined') {
            XPSystem.addXP(user.id, 'learn_item', 5, 'Hafal kosakata Korea: ' + word);
          }
          // Challenge
          if (typeof ChallengeSystem !== 'undefined') {
            ChallengeSystem.onLearnItem && ChallengeSystem.onLearnItem(MODULE_ID);
          }
        }
        updateHeader();
      }
    });
  }

  renderGrid();

  // ── Tabs (Browse / SRS) ───────────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      if (btn.dataset.tab === 'srs') initSrsTab();
    });
  });

  function initSrsTab() {
    const showRoman = settings.showRomanization !== false;
    SrsUI.init({
      containerId: 'tab-srs',
      moduleId: MODULE_ID,
      items: KrVocabData.getAll(),
      getItemId: item => item.word,
      renderFront: item => `
        <div class="srs-char kr-srs-char">${item.word}</div>
        <div class="srs-reading" style="font-size:0.78rem;color:var(--text-3);">${item.level === 'TOPIK1' ? 'TOPIK I' : 'TOPIK II'}</div>
      `,
      renderBack: item => `
        ${showRoman ? `<div class="srs-reading">${item.romanization}</div>` : ''}
        <div class="srs-meaning">${item.meaning}</div>
        ${item.example ? `<div class="srs-meaning" style="margin-top:6px;font-size:0.85rem;">${item.example.kr}${showRoman ? `<br><span style="color:var(--text-3)">${item.example.roman}</span>` : ''}<br><span style="color:var(--text-3)">${item.example.id}</span></div>` : ''}
        ${AudioEngine.isSupported() ? AudioEngine.btnHTML(item.word, 'kr', 'audio-btn') : ''}
      `,
    });

    // Audio in SRS
    document.getElementById('tab-srs').addEventListener('click', e => {
      const aBtn = e.target.closest('.audio-btn');
      if (aBtn) {
        e.stopPropagation();
        if (typeof AudioEngine.speakKR === 'function') {
          AudioEngine.speakKR(aBtn.dataset.speak);
        } else {
          AudioEngine.speak(aBtn.dataset.speak, 'ko-KR');
        }
      }
    });
  }
});
