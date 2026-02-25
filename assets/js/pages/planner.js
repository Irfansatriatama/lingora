/**
 * Lingora - Study Planner Page (Fase 26)
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!Router.guard()) return;

  const user = Auth.getActiveUser();
  App.init('planner');

  const root = document.getElementById('planner-root');
  const base = Router.getBase ? Router.getBase() : '../';

  // Module href map untuk navigasi
  const MODULE_HREFS = {
    'hiragana':   base + 'pages/japanese/hiragana.html',
    'katakana':   base + 'pages/japanese/katakana.html',
    'kanji':      base + 'pages/japanese/kanji.html',
    'jp-vocab':   base + 'pages/japanese/vocabulary.html',
    'jp-grammar': base + 'pages/japanese/grammar.html',
    'pinyin':     base + 'pages/mandarin/pinyin.html',
    'tones':      base + 'pages/mandarin/tones.html',
    'hanzi':      base + 'pages/mandarin/hanzi.html',
    'zh-vocab':   base + 'pages/mandarin/vocabulary.html',
    'hangul':     base + 'pages/korean/hangul.html',
    'kr-vocab':   base + 'pages/korean/vocabulary.html',
    'kr-grammar': base + 'pages/korean/grammar.html',
  };

  const MODULE_ICONS = {
    'hiragana': 'あ', 'katakana': 'ア', 'kanji': '漢',
    'jp-vocab': '語', 'jp-grammar': '文',
    'pinyin': '拼', 'tones': '声', 'hanzi': '汉', 'zh-vocab': '词',
    'hangul': '한', 'kr-vocab': '어', 'kr-grammar': '문',
  };

  let state = {
    view: 'loading', // 'setup' | 'active'
    selectedExam: null,
    targetDate: '',
    planner: null,
    progress: {},
    schedule: null,
  };

  // ── Init ─────────────────────────────────────────────────
  function init() {
    state.progress = Storage.getUser(user.id, 'progress', {});
    state.planner  = StudyPlanner.loadPlanner(user.id);

    if (state.planner && state.planner.examId) {
      state.view = 'active';
    } else {
      state.view = 'setup';
    }
    render();
  }

  // ── Render ────────────────────────────────────────────────
  function render() {
    if (state.view === 'setup') renderSetup();
    else renderActive();
  }

  // ── Setup View ────────────────────────────────────────────
  function renderSetup() {
    const exams = StudyPlanner.getAllExams();
    const byLang = {};
    exams.forEach(e => {
      if (!byLang[e.lang]) byLang[e.lang] = [];
      byLang[e.lang].push(e);
    });

    const langLabels = {
      jp: '🇯🇵 Bahasa Jepang',
      zh: '🇨🇳 Bahasa Mandarin',
      kr: '🇰🇷 Bahasa Korea',
    };

    let examGroupsHTML = Object.keys(byLang).map(lang => `
      <div class="planner-form-group">
        <div class="planner-form-label">${langLabels[lang]}</div>
        <div class="exam-options-grid" id="exam-grid-${lang}">
          ${byLang[lang].map(exam => `
            <div class="exam-option${state.selectedExam === exam.id ? ' selected' : ''}"
                 data-exam="${exam.id}" tabindex="0" role="button">
              <span class="exam-option-flag">${exam.icon}</span>
              <div class="exam-option-info">
                <span class="exam-option-label">${exam.label}</span>
                <span class="exam-option-desc">${exam.description}</span>
              </div>
              <span class="exam-option-check">✅</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Min date = tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    // Default target = 3 bulan ke depan
    const defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 3);
    const defDateStr = defaultDate.toISOString().split('T')[0];

    root.innerHTML = `
      <!-- Setup Card -->
      <div class="card">
        <div class="planner-setup-intro">
          <div class="planner-setup-icon">📅</div>
          <div>
            <div class="planner-setup-title">Buat Jadwal Belajarmu</div>
            <div class="planner-setup-desc">
              Pilih target ujian dan tanggal ujian. Sistem akan otomatis membuat
              jadwal belajar harian agar kamu siap tepat waktu.
            </div>
          </div>
        </div>

        <form class="planner-form" id="planner-form" onsubmit="return false;">
          <!-- Pilih ujian -->
          <div class="planner-form-group">
            <div class="planner-form-label">Target Ujian</div>
            ${examGroupsHTML}
          </div>

          <!-- Tanggal ujian -->
          <div class="planner-form-group">
            <div class="planner-form-label">Tanggal Ujian</div>
            <input type="date" class="planner-form-input" id="target-date"
                   min="${minDate}" value="${state.targetDate || defDateStr}">
            <div class="planner-form-hint">Sistem akan menghitung berapa item per hari yang perlu dipelajari.</div>
          </div>

          <!-- Preview jadwal -->
          <div class="planner-preview" id="planner-preview"></div>

          <button class="btn btn-primary" id="btn-start-planner" style="width:100%;margin-top:4px;" disabled>
            🚀 Mulai Jadwal Belajar
          </button>
        </form>
      </div>
    `;

    bindSetupEvents();
    // Jika sudah ada selection, update preview
    if (state.selectedExam && state.targetDate) updatePreview();
    else if (state.selectedExam) {
      state.targetDate = defDateStr;
      document.getElementById('target-date').value = defDateStr;
      updatePreview();
    }
  }

  function bindSetupEvents() {
    // Klik exam option
    root.querySelectorAll('.exam-option').forEach(el => {
      el.addEventListener('click', () => {
        root.querySelectorAll('.exam-option').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
        state.selectedExam = el.dataset.exam;
        updatePreview();
      });
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    });

    // Ubah tanggal
    const dateInput = document.getElementById('target-date');
    dateInput.addEventListener('change', () => {
      state.targetDate = dateInput.value;
      updatePreview();
    });

    // Submit
    const btnStart = document.getElementById('btn-start-planner');
    btnStart.addEventListener('click', () => {
      if (!state.selectedExam || !state.targetDate) return;
      const planner = {
        examId: state.selectedExam,
        targetDate: state.targetDate,
        startDate: StudyPlanner.today(),
        createdAt: new Date().toISOString(),
      };
      StudyPlanner.savePlanner(user.id, planner);
      state.planner = planner;
      state.view = 'active';
      if (typeof App !== 'undefined' && App.toast) {
        App.toast('📅 Jadwal belajar berhasil dibuat! Semangat!', 'success');
      }
      render();
    });
  }

  function updatePreview() {
    const preview = document.getElementById('planner-preview');
    const btnStart = document.getElementById('btn-start-planner');
    if (!preview || !state.selectedExam) return;

    const dateInput = document.getElementById('target-date');
    if (dateInput) state.targetDate = dateInput.value;

    if (!state.targetDate) {
      preview.classList.remove('visible');
      btnStart.disabled = true;
      return;
    }

    const schedule = StudyPlanner.calcSchedule(state.selectedExam, state.targetDate, state.progress);
    if (!schedule) return;

    state.schedule = schedule;
    btnStart.disabled = false;

    const daysLeft = schedule.daysLeft;
    const dayWord  = daysLeft === 1 ? 'hari' : 'hari';

    preview.classList.add('visible');
    preview.innerHTML = `
      <div class="planner-preview-title">Perkiraan Jadwal</div>
      <div class="planner-preview-stats">
        <div class="planner-preview-stat">
          <div class="planner-preview-stat-val">${daysLeft}</div>
          <div class="planner-preview-stat-lbl">${dayWord} tersisa</div>
        </div>
        <div class="planner-preview-stat">
          <div class="planner-preview-stat-val">${schedule.quotaPerDay}</div>
          <div class="planner-preview-stat-lbl">item/hari</div>
        </div>
        <div class="planner-preview-stat">
          <div class="planner-preview-stat-val">${schedule.totalRemaining}</div>
          <div class="planner-preview-stat-lbl">item tersisa</div>
        </div>
      </div>
      <div class="planner-preview-breakdown">
        ${schedule.breakdown.map(b => `
          <div class="planner-breakdown-row">
            <div class="planner-breakdown-name">${b.name}</div>
            <div class="planner-breakdown-bar-wrap">
              <div class="planner-breakdown-bar${b.remaining === 0 ? ' planner-breakdown-done' : ''}"
                   style="width:${b.pct}%"></div>
            </div>
            <div class="planner-breakdown-info">
              ${b.remaining === 0
                ? '✅ Selesai'
                : b.dailyTarget + '/hari (' + b.pct + '%)'}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── Active View ───────────────────────────────────────────
  function renderActive() {
    const planner  = state.planner;
    const progress = state.progress;
    const exam     = StudyPlanner.getExam(planner.examId);
    if (!exam) { state.view = 'setup'; renderSetup(); return; }

    const daysLeft = StudyPlanner.daysUntil(planner.targetDate);
    const schedule = StudyPlanner.calcSchedule(planner.examId, planner.targetDate, progress);
    const todos    = StudyPlanner.calcTodayTodo(planner, progress);
    const timeline = StudyPlanner.calcTimeline(planner, progress);

    // Overall progress
    const totalItems   = schedule.breakdown.reduce((s, b) => s + b.total, 0);
    const totalLearned = schedule.breakdown.reduce((s, b) => s + b.learned, 0);
    const overallPct   = totalItems > 0 ? Math.round((totalLearned / totalItems) * 100) : 0;

    // Status alert
    let alertHTML = '';
    if (daysLeft === 0) {
      alertHTML = `<div class="planner-alert danger">
        <span class="planner-alert-icon">⚠️</span>
        <div>Hari ujian sudah tiba! Semoga berhasil!</div>
      </div>`;
    } else if (daysLeft <= 7) {
      alertHTML = `<div class="planner-alert danger">
        <span class="planner-alert-icon">🔥</span>
        <div>Tinggal <strong>${daysLeft} hari</strong> lagi! Fokus penuh!</div>
      </div>`;
    } else if (daysLeft <= 30) {
      alertHTML = `<div class="planner-alert">
        <span class="planner-alert-icon">⏰</span>
        <div>Tinggal <strong>${daysLeft} hari</strong> — tetap konsisten belajar setiap hari!</div>
      </div>`;
    }

    // Today's to-do
    let todoHTML = '';
    if (todos.length === 0) {
      todoHTML = `<div class="planner-all-done">
        <div style="font-size:2.5rem;margin-bottom:8px;">🎉</div>
        <div style="font-weight:700;font-size:1rem;margin-bottom:4px;">Semua Modul Selesai!</div>
        <div style="font-size:0.83rem;color:var(--text-3);">Kamu sudah menguasai semua materi ${exam.label}. Luar biasa!</div>
      </div>`;
    } else {
      todoHTML = todos.map(t => {
        const href = MODULE_HREFS[t.id] || '#';
        const icon = MODULE_ICONS[t.id] || '📖';
        return `
          <a class="planner-todo-item${t.done ? ' done' : ''}" href="${href}">
            <div class="planner-todo-icon cjk">${icon}</div>
            <div class="planner-todo-info">
              <div class="planner-todo-name">${t.name}</div>
              <div class="planner-todo-progress">
                <div class="planner-todo-bar-wrap">
                  <div class="planner-todo-bar${t.pct === 100 ? ' done' : ''}" style="width:${t.pct}%"></div>
                </div>
                <span class="planner-todo-pct">${t.learned}/${t.total}</span>
              </div>
            </div>
            ${t.done
              ? `<span class="planner-todo-done-badge">✅</span>`
              : `<span class="planner-todo-target">+${t.todayTarget} hari ini</span>`}
          </a>`;
      }).join('');
    }

    // Module breakdown
    const modulesHTML = schedule.breakdown.map(b => {
      const href = MODULE_HREFS[b.id] || '#';
      return `
        <a class="planner-module-card" href="${href}">
          <div class="planner-module-card-top">
            <span class="planner-module-name">${b.name}</span>
            <span class="planner-module-pct">${b.pct}%</span>
          </div>
          <div class="planner-module-bar-wrap">
            <div class="planner-module-bar" style="width:${b.pct}%"></div>
          </div>
          <div class="planner-module-sub">${b.learned}/${b.total} dipelajari</div>
        </a>`;
    }).join('');

    // Timeline chart
    let timelineHTML = '';
    if (timeline && timeline.days) {
      const maxIdeal = Math.max(...timeline.days.map(d => d.idealPct), 1);
      const barHtmlArr = timeline.days.map(d => {
        const idealH  = Math.round((d.idealPct / 100) * 48);
        const actualH = d.actualPct != null ? Math.round((d.actualPct / 100) * 48) : null;
        return `
          <div class="planner-tl-bar-group">
            <div class="planner-tl-bar-ideal" style="height:${Math.max(idealH, 2)}px" title="Target ideal: ${d.idealPct}%"></div>
            ${actualH != null ? `<div class="planner-tl-bar-actual" style="height:${Math.max(actualH, 2)}px" title="Progress aktual: ${d.actualPct}%"></div>` : ''}
            <span class="planner-tl-label${d.isToday ? ' today' : ''}">${d.isToday ? 'Hari ini' : d.label}</span>
          </div>`;
      });
      timelineHTML = `
        <div class="planner-timeline-wrap">
          <div class="planner-timeline-title">Progress 7 Hari Terakhir</div>
          <div class="planner-timeline-chart">${barHtmlArr.join('')}</div>
          <div class="planner-timeline-legend">
            <span><span class="planner-legend-dot" style="background:var(--border-2)"></span>Target Ideal</span>
            <span><span class="planner-legend-dot" style="background:var(--red)"></span>Progress Aktual (${timeline.actualPct}%)</span>
          </div>
        </div>`;
    }

    // Tanggal ujian formatting
    const targetDateFormatted = new Date(planner.targetDate + 'T12:00:00')
      .toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    root.innerHTML = `
      <!-- Active Planner Card -->
      <div class="card">
        ${alertHTML}
        <div class="planner-active-header">
          <div class="planner-active-goal">
            <span class="planner-active-flag">${exam.icon}</span>
            <div>
              <div class="planner-active-title">${exam.label}</div>
              <div class="planner-active-meta">${exam.description} · ${targetDateFormatted}</div>
            </div>
          </div>
          <div class="planner-countdown">
            <div class="planner-countdown-num">${daysLeft}</div>
            <div class="planner-countdown-lbl">hari lagi</div>
          </div>
        </div>

        <!-- Overall progress -->
        <div class="planner-overall-progress">
          <div class="planner-overall-header">
            <span class="planner-overall-label">Progress Keseluruhan</span>
            <span class="planner-overall-pct">${overallPct}%</span>
          </div>
          <div class="planner-overall-bar-wrap">
            <div class="planner-overall-bar" style="width:${overallPct}%"></div>
          </div>
          <div class="planner-overall-sub">${totalLearned} dari ${totalItems} item sudah dipelajari</div>
        </div>
      </div>

      <!-- Today's To-Do -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">📋 Target Hari Ini</div>
          <span class="badge badge-red">${schedule.quotaPerDay} item/hari</span>
        </div>
        <div class="planner-todo-list">
          ${todoHTML}
        </div>
      </div>

      <!-- Timeline & Breakdown -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">📊 Detail Progress</div>
        </div>
        ${timelineHTML}
        <div class="planner-modules-grid">
          ${modulesHTML}
        </div>
        <div class="planner-actions">
          <button class="btn btn-outline" id="btn-edit-planner">✏️ Ubah Target</button>
          <button class="btn btn-outline btn-danger" id="btn-delete-planner">🗑 Hapus Jadwal</button>
        </div>
      </div>
    `;

    bindActiveEvents();
  }

  function bindActiveEvents() {
    const btnEdit = document.getElementById('btn-edit-planner');
    if (btnEdit) {
      btnEdit.addEventListener('click', () => {
        const planner = state.planner;
        if (planner) {
          state.selectedExam  = planner.examId;
          state.targetDate    = planner.targetDate;
        }
        state.view = 'setup';
        renderSetup();
        // Re-trigger preview
        if (state.selectedExam && state.targetDate) updatePreview();
      });
    }

    const btnDel = document.getElementById('btn-delete-planner');
    if (btnDel) {
      btnDel.addEventListener('click', () => {
        if (!confirm('Hapus jadwal belajar? Data ini tidak bisa dikembalikan.')) return;
        StudyPlanner.clearPlanner(user.id);
        state.planner      = null;
        state.selectedExam = null;
        state.targetDate   = '';
        state.view = 'setup';
        if (typeof App !== 'undefined' && App.toast) {
          App.toast('Jadwal berhasil dihapus.', 'info');
        }
        render();
      });
    }
  }

  init();
});
