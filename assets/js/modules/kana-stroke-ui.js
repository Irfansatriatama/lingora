/**
 * Lingora - Kana Stroke UI Module (Fase 23)
 * Menampilkan animasi stroke order untuk Hiragana dan Katakana.
 * Menggunakan SVG path animation dengan CSS strokeDashoffset.
 */
const KanaStrokeUI = (() => {

  // Warna per stroke (urutan: merah, biru, hijau, ungu, oranye, ...)
  const STROKE_COLORS = [
    '#C0392B', '#2980B9', '#27AE60', '#8E44AD',
    '#E67E22', '#16A085', '#D35400', '#2C3E50'
  ];

  /**
   * Render panel stroke order di dalam container.
   * @param {HTMLElement} container - elemen target
   * @param {Object} strokeData - { strokes: [{d, tip}], tips }
   * @param {string} char - karakter yang ditampilkan
   * @param {string} script - 'hiragana' | 'katakana'
   */
  function render(container, strokeData, char, script) {
    if (!container || !strokeData) {
      container.innerHTML = `
        <div class="kana-stroke-unavailable">
          <div class="kana-stroke-unavail-icon">✍️</div>
          <div class="kana-stroke-unavail-msg">Data urutan coretan untuk <strong class="cjk">${char}</strong> belum tersedia.</div>
          <div class="kana-stroke-unavail-hint">Pilih karakter dasar (bukan dakuten/kombinasi) untuk melihat animasi stroke.</div>
        </div>`;
      return;
    }

    const { strokes, tips } = strokeData;
    const strokeCount = strokes.length;

    // Buat panel
    container.innerHTML = `
      <div class="kana-stroke-panel" data-char="${char}">
        <div class="kana-stroke-top">
          <div class="kana-stroke-svg-wrap">
            <svg class="kana-stroke-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrowhead-${char.codePointAt(0)}" markerWidth="6" markerHeight="6"
                  refX="5" refY="3" orient="auto">
                  <path d="M 0 0 L 6 3 L 0 6 Z" fill="currentColor"/>
                </marker>
              </defs>
              <!-- Guide karakter di belakang (transparan) -->
              <text x="50" y="75" text-anchor="middle" font-size="78"
                    font-family="serif" fill="var(--text-4,#ccc)" opacity="0.12"
                    class="kana-stroke-guide-char">${char}</text>
              <!-- Stroke paths (dirender oleh JS) -->
              <g id="stroke-paths-${char.codePointAt(0)}"></g>
            </svg>
          </div>

          <div class="kana-stroke-info">
            <div class="kana-stroke-char-display cjk">${char}</div>
            <div class="kana-stroke-count-badge">${strokeCount} coretan</div>
            <div class="kana-stroke-step-label" id="step-label-${char.codePointAt(0)}">
              Tekan ▶ untuk animasi
            </div>
          </div>
        </div>

        <!-- Kontrol animasi -->
        <div class="kana-stroke-controls">
          <button class="kana-stroke-btn kana-stroke-prev" id="btn-prev-${char.codePointAt(0)}" title="Coretan sebelumnya" disabled>◀</button>
          <button class="kana-stroke-btn kana-stroke-play" id="btn-play-${char.codePointAt(0)}" title="Putar animasi">▶ Animasi</button>
          <button class="kana-stroke-btn kana-stroke-next" id="btn-next-${char.codePointAt(0)}" title="Coretan berikutnya">▶</button>
          <button class="kana-stroke-btn kana-stroke-reset" id="btn-reset-${char.codePointAt(0)}" title="Reset">↺</button>
        </div>

        <!-- Daftar stroke -->
        <div class="kana-stroke-list">
          ${strokes.map((s, i) => `
            <div class="kana-stroke-item" id="stroke-item-${char.codePointAt(0)}-${i}" data-index="${i}">
              <div class="kana-stroke-num" style="background:${STROKE_COLORS[i] || '#666'}">${i + 1}</div>
              <div class="kana-stroke-tip">${s.tip}</div>
            </div>
          `).join('')}
        </div>

        ${tips ? `<div class="kana-stroke-tips"><span>💡</span><span>${tips}</span></div>` : ''}
      </div>
    `;

    // Inisialisasi SVG stroke paths
    _initStrokes(container, char, strokes);
    _bindControls(container, char, strokes);
  }

  /**
   * Buat elemen path SVG untuk setiap stroke (awalnya transparan)
   */
  function _initStrokes(container, char, strokes) {
    const code = char.codePointAt(0);
    const group = container.querySelector(`#stroke-paths-${code}`);
    if (!group) return;

    group.innerHTML = strokes.map((s, i) => {
      const color = STROKE_COLORS[i] || '#666';
      return `
        <path
          class="kana-stroke-path"
          d="${s.d}"
          stroke="${color}"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          opacity="0"
          data-stroke-idx="${i}"
          marker-end="url(#arrowhead-${code})"
        />`;
    }).join('');
  }

  /**
   * Bind event ke tombol kontrol animasi
   */
  function _bindControls(container, char, strokes) {
    const code = char.codePointAt(0);
    const total = strokes.length;
    let currentStep = 0;
    let isPlaying = false;
    let playTimer = null;

    const btnPrev  = container.querySelector(`#btn-prev-${code}`);
    const btnPlay  = container.querySelector(`#btn-play-${code}`);
    const btnNext  = container.querySelector(`#btn-next-${code}`);
    const btnReset = container.querySelector(`#btn-reset-${code}`);
    const label    = container.querySelector(`#step-label-${code}`);

    function getPaths() {
      return container.querySelectorAll(`.kana-stroke-path`);
    }

    function getStrokeItems() {
      return container.querySelectorAll(`[id^="stroke-item-${code}-"]`);
    }

    function showUpTo(step) {
      // step: 0 = semua tersembunyi, 1 = stroke 1 tampil, dst.
      const paths = getPaths();
      const items = getStrokeItems();
      paths.forEach((p, i) => {
        if (i < step) {
          p.setAttribute('opacity', '1');
          _animatePath(p);
        } else {
          p.setAttribute('opacity', '0');
          p.style.strokeDasharray = '';
          p.style.strokeDashoffset = '';
        }
      });
      items.forEach((item, i) => {
        item.classList.toggle('active', i === step - 1);
        item.classList.toggle('done', i < step - 1);
      });

      if (step === 0) {
        label.textContent = 'Tekan ▶ untuk animasi';
      } else if (step === total) {
        label.textContent = `✓ Selesai (${total} coretan)`;
      } else {
        label.textContent = `Coretan ${step} dari ${total}: ${strokes[step - 1].tip}`;
      }

      btnPrev.disabled = (step === 0);
      btnNext.disabled = (step >= total);
    }

    function animateAll() {
      if (isPlaying) return;
      isPlaying = true;
      btnPlay.textContent = '⏸';
      btnPlay.title = 'Berhenti';
      currentStep = 0;
      showUpTo(0);

      function playNext() {
        if (currentStep >= total) {
          isPlaying = false;
          btnPlay.textContent = '▶ Ulang';
          btnPlay.title = 'Putar ulang';
          return;
        }
        currentStep++;
        showUpTo(currentStep);
        playTimer = setTimeout(playNext, 900);
      }
      playTimer = setTimeout(playNext, 300);
    }

    function stopPlay() {
      clearTimeout(playTimer);
      isPlaying = false;
      btnPlay.textContent = '▶ Ulang';
      btnPlay.title = 'Putar ulang';
    }

    btnPlay.addEventListener('click', () => {
      if (isPlaying) {
        stopPlay();
      } else {
        animateAll();
      }
    });

    btnNext.addEventListener('click', () => {
      stopPlay();
      if (currentStep < total) {
        currentStep++;
        showUpTo(currentStep);
      }
    });

    btnPrev.addEventListener('click', () => {
      stopPlay();
      if (currentStep > 0) {
        currentStep--;
        showUpTo(currentStep);
      }
    });

    btnReset.addEventListener('click', () => {
      stopPlay();
      currentStep = 0;
      showUpTo(0);
      btnPlay.textContent = '▶ Animasi';
      btnPlay.title = 'Putar animasi';
    });

    // Click pada stroke item untuk loncat ke step itu
    container.querySelectorAll(`[id^="stroke-item-${code}-"]`).forEach((item) => {
      item.addEventListener('click', () => {
        stopPlay();
        const idx = parseInt(item.dataset.index);
        currentStep = idx + 1;
        showUpTo(currentStep);
      });
    });
  }

  /**
   * Animasi path dengan strokeDashoffset
   */
  function _animatePath(pathEl) {
    try {
      const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 100;
      pathEl.style.strokeDasharray = length;
      pathEl.style.strokeDashoffset = length;
      // Trigger reflow
      void pathEl.getBoundingClientRect();
      pathEl.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
      pathEl.style.strokeDashoffset = '0';
    } catch (e) {
      // Fallback jika getTotalLength tidak tersedia
      pathEl.style.strokeDasharray = '';
      pathEl.style.strokeDashoffset = '';
    }
  }

  /**
   * Render tab "Menulis" lengkap dengan grid pilihan karakter
   * @param {HTMLElement} tabEl - elemen tab panel
   * @param {Array} characters - array karakter (dari HiraganaData.all atau KatakanaData.all)
   * @param {string} script - 'hiragana' | 'katakana'
   */
  function renderWritingTab(tabEl, characters, script) {
    // Hanya tampilkan karakter dasar yang punya data stroke
    const available = characters.filter(c => {
      return script === 'hiragana'
        ? KanaStrokes.hasHiragana(c.char)
        : KanaStrokes.hasKatakana(c.char);
    });

    tabEl.innerHTML = `
      <div class="kana-writing-layout">
        <div class="kana-writing-sidebar">
          <div class="kana-writing-sidebar-title">Pilih Karakter</div>
          <div class="kana-writing-char-grid" id="writing-char-grid">
            ${available.map(c => `
              <button class="kana-writing-char-btn" data-char="${c.char}" title="${c.romaji}">
                <span class="cjk">${c.char}</span>
                <span class="kana-writing-romaji">${c.romaji}</span>
              </button>
            `).join('')}
          </div>
          <div class="kana-writing-unavail-note">
            ℹ️ Karakter dakuten dan kombinasi mengikuti pola karakter dasar.
          </div>
        </div>
        <div class="kana-writing-main" id="kana-stroke-display">
          <div class="kana-stroke-placeholder">
            <div class="kana-stroke-placeholder-icon">✍️</div>
            <div class="kana-stroke-placeholder-text">Pilih karakter di sebelah kiri untuk melihat animasi urutan coretan</div>
          </div>
        </div>
      </div>
    `;

    // Bind karakter grid click
    const grid = tabEl.querySelector('#writing-char-grid');
    const display = tabEl.querySelector('#kana-stroke-display');

    grid.addEventListener('click', e => {
      const btn = e.target.closest('.kana-writing-char-btn');
      if (!btn) return;

      const char = btn.dataset.char;
      const strokeData = script === 'hiragana'
        ? KanaStrokes.getHiragana(char)
        : KanaStrokes.getKatakana(char);

      // Update active state
      grid.querySelectorAll('.kana-writing-char-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Render stroke panel
      render(display, strokeData, char, script);
    });
  }

  return { render, renderWritingTab };
})();
