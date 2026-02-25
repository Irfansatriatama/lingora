/**
 * Lingora — Hangul Page JS
 * Fase 21.3 — Grid Jamo, Flashcard 3D, SRS, Favorit, Audio KR
 * Tab: Tabel / Flashcard / SRS
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!Router.guard()) return;
  App.init('hangul');

  const MODULE_ID = 'hangul';
  const consonants = HangulData.getConsonants();  // 14
  const vowels     = HangulData.getVowels();       // 21
  const allJamo    = HangulData.getAll();           // 35
  const TOTAL      = allJamo.length;

  let currentChar  = null;
  let fcInstance   = null;
  let activeFilter = 'all';
  let activeTab    = 'table';
  let showFavOnly  = false;

  // Settings
  const _user     = Auth.getActiveUser();
  const _settings = Storage.getUser(_user.id, 'settings', { showRomanization: true });
  const showRoman = _settings.showRomanization !== false;

  // Audio
  if (AudioEngine.isSupported()) AudioEngine.init(_user.id);

  // ── Header progress ──────────────────────────────────────
  function updateHeader() {
    const learned = Progress.getLearned(MODULE_ID);
    const pct     = Math.round((learned.length / TOTAL) * 100);
    document.getElementById('hdr-pct').textContent = pct + '%';
    document.getElementById('hdr-sub').textContent = learned.length + ' / ' + TOTAL + ' hafal';
  }

  updateHeader();

  // ── Tabs ─────────────────────────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      activeTab = tab;

      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById('tab-' + tab).classList.add('active');

      if (tab === 'flashcard') initFlashcard('all');
      if (tab === 'srs')       initSrsTab();

      if (tab !== 'flashcard' && fcInstance) {
        fcInstance.destroy();
        fcInstance = null;
      }
    });
  });

  // ── TABLE TAB ────────────────────────────────────────────
  function renderTable(filter) {
    activeFilter = filter;

    let dataToShow = [];
    let showConsonants = (filter === 'all' || filter === 'consonant');
    let showVowels     = (filter === 'all' || filter === 'vowel');

    const learned = Progress.getLearned(MODULE_ID);
    const favs    = Progress.getFavorites(MODULE_ID);

    const tableContent = document.getElementById('table-content');

    if (showFavOnly) {
      const favData = allJamo.filter(j => favs.includes(j.jamo));
      if (favData.length === 0) {
        tableContent.innerHTML = '<div class="empty-state" style="padding:40px;text-align:center;color:var(--text-3)">Belum ada jamo favorit. Klik ★ pada jamo untuk menandai.</div>';
        return;
      }
      tableContent.innerHTML = `
        <div class="hangul-section-title">⭐ Favorit <span>(${favData.length} jamo)</span></div>
        <div class="hangul-grid" id="grid-favs">${favData.map(j => renderJamoCell(j, learned, favs)).join('')}</div>
      `;
      bindGridEvents(tableContent.querySelector('#grid-favs'));
      return;
    }

    let html = '';

    if (showConsonants) {
      html += `<div class="hangul-section-title">🔵 Konsonan (자음) <span>— ${consonants.length} jamo</span></div>`;
      html += `<div class="hangul-grid" id="grid-consonant">${consonants.map(j => renderJamoCell(j, learned, favs)).join('')}</div>`;
    }

    if (showVowels) {
      html += `<div class="hangul-section-title">🔴 Vokal (모음) <span>— ${vowels.length} jamo</span></div>`;
      html += `<div class="hangul-grid" id="grid-vowel">${vowels.map(j => renderJamoCell(j, learned, favs)).join('')}</div>`;
    }

    // Suku kata dasar hanya di mode "Semua"
    if (filter === 'all') {
      const syllables = HangulData.getSyllables();
      html += `
        <div class="hangul-section-title">📋 Suku Kata Dasar (음절) <span>— contoh kombinasi</span></div>
        <p style="font-size:0.85rem;color:var(--text-3);margin-bottom:12px">Klik suku kata untuk melihat detail. Jamo Konsonan + Vokal membentuk satu blok suku kata.</p>
        <div class="syllable-table-wrap">
          <table class="syllable-table">
            <thead>
              <tr>
                <th>Suku Kata</th>
                <th>Konsonan</th>
                <th>Vokal</th>
                <th>Romanisasi</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              ${syllables.map(s => `
                <tr class="syllable-row${s.batchim ? ' syl-batchim' : ''}" data-syl='${JSON.stringify(s).replace(/'/g,"&#39;")}' style="cursor:pointer">
                  <td><span class="syl-block">${s.block}</span></td>
                  <td>${s.consonant}</td>
                  <td>${s.vowel}</td>
                  <td><span class="syl-roman">${s.romanization}</span></td>
                  <td>${s.batchim ? `<span style="font-size:0.75rem;color:var(--text-3)">받침: ${s.batchim}</span>` : ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    tableContent.innerHTML = html;

    // Bind events untuk grid
    if (showConsonants) {
      const cGrid = tableContent.querySelector('#grid-consonant');
      if (cGrid) bindGridEvents(cGrid);
    }
    if (showVowels) {
      const vGrid = tableContent.querySelector('#grid-vowel');
      if (vGrid) bindGridEvents(vGrid);
    }

    // Bind syllable row clicks
    tableContent.querySelectorAll('.syllable-row').forEach(row => {
      row.addEventListener('click', () => {
        try {
          const syl = JSON.parse(row.getAttribute('data-syl').replace(/&#39;/g,"'"));
          openSyllableModal(syl);
        } catch(e) {}
      });
    });
  }

  function renderJamoCell(j, learned, favs) {
    const isLearned = learned.includes(j.jamo);
    const isFav     = favs.includes(j.jamo);
    return `
      <div class="hangul-cell${isLearned ? ' learned' : ''}" data-jamo="${j.jamo}">
        <div class="char-main">${j.jamo}</div>
        ${showRoman ? `<div class="char-romaji">${j.romanization}</div>` : ''}
        <div class="char-name">${j.name}</div>
        <button class="fav-btn${isFav ? ' active' : ''}" data-fav="${j.jamo}" title="Favorit">&#9733;</button>
      </div>
    `;
  }

  function bindGridEvents(grid) {
    if (!grid) return;

    // Gunakan replaceWith untuk menghindari duplikasi event listener
    const newGrid = grid.cloneNode(true);
    grid.parentNode.replaceChild(newGrid, grid);

    newGrid.addEventListener('click', e => {
      const favBtn = e.target.closest('.fav-btn');
      if (favBtn) {
        e.stopPropagation();
        const isNowFav = Progress.toggleFavorite(MODULE_ID, favBtn.dataset.fav);
        favBtn.classList.toggle('active', isNowFav);
        App.toast(isNowFav ? '⭐ Ditambahkan ke favorit' : 'Favorit dihapus', 'default', 1400);
        return;
      }

      const cell = e.target.closest('.hangul-cell');
      if (!cell) return;

      const jamo = cell.dataset.jamo;
      const charData = allJamo.find(j => j.jamo === jamo);
      if (charData) openModal(charData, consonants.includes(charData) ? 'consonant' : 'vowel');
    });
  }

  renderTable('all');

  // Filter buttons
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showFavOnly = false;
      const favFilterBtn = document.getElementById('fav-filter-btn');
      if (favFilterBtn) favFilterBtn.classList.remove('active');
      renderTable(btn.dataset.filter);
    });
  });

  // Favorit filter button
  const favFilterBtn = document.getElementById('fav-filter-btn');
  if (favFilterBtn) {
    favFilterBtn.addEventListener('click', () => {
      showFavOnly = !showFavOnly;
      favFilterBtn.classList.toggle('active', showFavOnly);
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      if (!showFavOnly) document.querySelector('[data-filter="all"]').classList.add('active');
      renderTable(activeFilter);
    });
  }

  // ── MODAL DETAIL JAMO ─────────────────────────────────────
  function openModal(charData, type) {
    currentChar = charData;
    const isLearned = Progress.isLearned(MODULE_ID, charData.jamo);
    const markBtn   = document.getElementById('modal-mark-btn');

    const _audioBtn = AudioEngine.isSupported()
      ? `<div style="margin:8px 0">${AudioEngine.btnHTML(charData.example.syllable, 'ko', 'audio-btn-lg')}</div>`
      : '';
    const _wordAudio = AudioEngine.isSupported()
      ? AudioEngine.btnHTML(charData.example.word, 'ko', 'audio-btn-sm')
      : '';

    const typeBadge = type === 'consonant'
      ? `<span class="hangul-modal-type-badge consonant">Konsonan (자음)</span>`
      : `<span class="hangul-modal-type-badge vowel">Vokal (모음)</span>`;

    document.getElementById('modal-content').innerHTML = `
      <div class="hangul-modal-jamo">${charData.jamo}</div>
      ${_audioBtn}
      <div class="hangul-modal-name">${charData.name}</div>
      <div class="hangul-modal-roman">${charData.romanization}</div>
      <div style="text-align:center;margin-bottom:16px">${typeBadge}</div>
      <div class="hangul-modal-example">
        <div class="ex-label">Contoh Suku Kata &amp; Kata ${_wordAudio}</div>
        <span class="ex-syllable">${charData.example.syllable}</span>
        <div class="ex-word" style="font-family:var(--font-cjk);font-size:1.2rem;font-weight:700;color:var(--text)">${charData.example.word}</div>
        <div class="ex-meaning" style="font-size:0.85rem;color:var(--text-2);margin-top:4px">${charData.example.meaning}</div>
      </div>
    `;

    // Bind audio buttons
    document.getElementById('modal-content').querySelectorAll('.audio-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        AudioEngine.speak(btn.dataset.speak, 'ko-KR');
      });
    });

    if (AudioEngine.isSupported() && AudioEngine.getAutoPlay()) {
      AudioEngine.speak(charData.example.syllable, 'ko-KR');
    }

    markBtn.textContent = isLearned ? 'Hapus Tanda' : 'Tandai Hafal';
    markBtn.className   = isLearned ? 'btn btn-ghost btn-sm' : 'btn btn-outline btn-sm';

    const modalFavBtn = document.getElementById('modal-fav-btn');
    if (modalFavBtn) {
      const nowFav = Progress.isFavorite(MODULE_ID, charData.jamo);
      modalFavBtn.classList.toggle('active', nowFav);
      modalFavBtn.title = nowFav ? 'Hapus dari favorit' : 'Tambah ke favorit';
    }

    document.getElementById('char-modal').classList.add('open');
  }

  function closeModal() {
    document.getElementById('char-modal').classList.remove('open');
    currentChar = null;
  }

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('char-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.getElementById('modal-mark-btn').addEventListener('click', () => {
    if (!currentChar) return;
    const isLearned = Progress.isLearned(MODULE_ID, currentChar.jamo);
    if (isLearned) {
      Progress.unmarkLearned(MODULE_ID, currentChar.jamo);
      App.toast('Tanda dihapus', 'default', 1500);
    } else {
      Progress.markLearned(MODULE_ID, currentChar.jamo);
      App.toast('Ditandai hafal! +5 XP', 'success', 1500);
      ChallengeSystem.onLearnItem(MODULE_ID);
    }
    updateHeader();
    renderTable(activeFilter);
    const markBtn = document.getElementById('modal-mark-btn');
    const nowLearned = Progress.isLearned(MODULE_ID, currentChar.jamo);
    markBtn.textContent = nowLearned ? 'Hapus Tanda' : 'Tandai Hafal';
    markBtn.className   = nowLearned ? 'btn btn-ghost btn-sm' : 'btn btn-outline btn-sm';
  });

  const _modalFavBtn = document.getElementById('modal-fav-btn');
  if (_modalFavBtn) {
    _modalFavBtn.addEventListener('click', () => {
      if (!currentChar) return;
      const isNowFav = Progress.toggleFavorite(MODULE_ID, currentChar.jamo);
      _modalFavBtn.classList.toggle('active', isNowFav);
      _modalFavBtn.title = isNowFav ? 'Hapus dari favorit' : 'Tambah ke favorit';
      App.toast(isNowFav ? '\u2b50 Ditambahkan ke favorit' : 'Favorit dihapus', 'default', 1400);
      renderTable(activeFilter);
    });
  }

  // ── SYLLABLE MODAL ───────────────────────────────────────
  function openSyllableModal(syl) {
    const _audioBtn = AudioEngine.isSupported()
      ? AudioEngine.btnHTML(syl.block, 'ko', 'audio-btn-lg')
      : '';

    document.getElementById('syllable-modal-content').innerHTML = `
      <div style="text-align:center;margin-bottom:12px">
        <div style="font-family:var(--font-cjk);font-size:4.5rem;font-weight:700;color:var(--kr-blue);line-height:1.1">${syl.block}</div>
        <div style="margin:8px 0">${_audioBtn}</div>
        <div style="font-size:1rem;font-weight:700;color:var(--text-2);margin-bottom:4px">${syl.romanization}</div>
        <div style="font-size:0.85rem;color:var(--text-3)">${syl.consonant} + ${syl.vowel}${syl.batchim ? ' + ' + syl.batchim + ' (받침)' : ''}</div>
      </div>
      <div style="background:var(--surface-2);border-radius:var(--radius);padding:14px 16px;margin-top:8px">
        <div style="font-size:0.75rem;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">Struktur Suku Kata</div>
        <div style="display:grid;grid-template-columns:1fr 1fr${syl.batchim ? ' 1fr' : ''};gap:8px;text-align:center">
          <div style="background:rgba(26,111,187,0.1);border-radius:var(--radius);padding:10px">
            <div style="font-family:var(--font-cjk);font-size:1.5rem;font-weight:700;color:var(--kr-blue)">${syl.consonant}</div>
            <div style="font-size:0.7rem;color:var(--text-3)">Konsonan awal</div>
          </div>
          <div style="background:rgba(192,57,43,0.1);border-radius:var(--radius);padding:10px">
            <div style="font-family:var(--font-cjk);font-size:1.5rem;font-weight:700;color:var(--kr-red)">${syl.vowel}</div>
            <div style="font-size:0.7rem;color:var(--text-3)">Vokal</div>
          </div>
          ${syl.batchim ? `
          <div style="background:rgba(0,0,0,0.05);border-radius:var(--radius);padding:10px">
            <div style="font-family:var(--font-cjk);font-size:1.5rem;font-weight:700;color:var(--text)">${syl.batchim}</div>
            <div style="font-size:0.7rem;color:var(--text-3)">받침 (akhir)</div>
          </div>` : ''}
        </div>
      </div>
    `;

    // Bind audio
    document.getElementById('syllable-modal-content').querySelectorAll('.audio-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        AudioEngine.speak(btn.dataset.speak, 'ko-KR');
      });
    });

    if (AudioEngine.isSupported() && AudioEngine.getAutoPlay()) {
      AudioEngine.speak(syl.block, 'ko-KR');
    }

    document.getElementById('syllable-modal').classList.add('open');
  }

  function closeSyllableModal() {
    document.getElementById('syllable-modal').classList.remove('open');
  }

  document.getElementById('syllable-modal-close').addEventListener('click', closeSyllableModal);
  document.getElementById('syllable-close-btn').addEventListener('click', closeSyllableModal);
  document.getElementById('syllable-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSyllableModal();
  });

  // ── FLASHCARD TAB ─────────────────────────────────────────
  function initFlashcard(filter) {
    if (fcInstance) { fcInstance.destroy(); fcInstance = null; }

    let data = allJamo;
    if (filter === 'consonant') data = consonants;
    if (filter === 'vowel')     data = vowels;
    if (filter === 'unlearned') {
      const learned = Progress.getLearned(MODULE_ID);
      data = allJamo.filter(j => !learned.includes(j.jamo));
      if (data.length === 0) {
        document.getElementById('flashcard-container').innerHTML =
          '<div class="empty-state"><p>Semua jamo sudah ditandai hafal! 🎉</p></div>';
        return;
      }
    }
    if (filter === 'favorites') {
      const favs = Progress.getFavorites(MODULE_ID);
      data = allJamo.filter(j => favs.includes(j.jamo));
      if (data.length === 0) {
        document.getElementById('flashcard-container').innerHTML =
          '<div class="empty-state"><p>Belum ada jamo favorit.</p></div>';
        return;
      }
    }

    // Normalisasi data agar kompatibel dengan Flashcard module
    // Flashcard module membaca .char dan .romaji
    const normalizedData = data.map(j => ({
      char: j.jamo,
      romaji: j.romanization,
      name: j.name,
      type: consonants.includes(j) ? 'consonant' : 'vowel',
      example: {
        word: j.example.word,
        reading: j.romanization,
        meaning: j.example.meaning,
      },
      _original: j,
    }));

    fcInstance = new Flashcard({
      container: document.getElementById('flashcard-container'),
      data: normalizedData,
      moduleId: MODULE_ID,
      onProgress: () => { updateHeader(); renderTable(activeFilter); },
    });
  }

  document.querySelectorAll('[data-fcfilter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-fcfilter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      initFlashcard(btn.dataset.fcfilter);
    });
  });

  // ── SRS TAB ──────────────────────────────────────────────
  function initSrsTab() {
    SrsUI.init({
      containerId: 'tab-srs',
      moduleId: MODULE_ID,
      items: allJamo,
      getItemId: item => item.jamo,
      renderFront: item => `
        <div class="srs-char kr">${item.jamo}</div>
      `,
      renderBack: item => `
        <div class="srs-reading">${item.romanization}</div>
        <div class="srs-meaning" style="margin-top:4px;color:var(--text-3);font-size:0.85rem">${item.name}</div>
        <div class="srs-meaning">
          ${item.example ? `${item.example.word} — ${item.example.meaning}` : ''}
        </div>
        ${AudioEngine.isSupported() ? AudioEngine.btnHTML(item.jamo, 'ko', 'audio-btn') : ''}
      `,
    });

    // Bind SRS audio buttons
    document.getElementById('tab-srs').addEventListener('click', e => {
      const audioBtn = e.target.closest('.audio-btn');
      if (audioBtn) {
        e.stopPropagation();
        AudioEngine.speak(audioBtn.dataset.speak, 'ko-KR');
      }
    });
  }

  // Challenge tracking on module visit
  if (typeof ChallengeSystem !== 'undefined') {
    ChallengeSystem.onModuleVisit(MODULE_ID);
  }

});
