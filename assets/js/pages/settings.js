/**
 * Lingora - Settings Page (Fase 7 + Fase 28 Tema & Kustomisasi)
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!Router.guard()) return;

  const user = Auth.getActiveUser();
  App.init('settings');

  const MODULES = [
    { id: 'hiragana',   char: 'あ', name: 'Hiragana', total: 104 },
    { id: 'katakana',   char: 'ア', name: 'Katakana', total: 104 },
    { id: 'kanji',      char: '漢', name: 'Kanji',    total: 153 },
    { id: 'hanzi',      char: '汉', name: 'Hanzi',    total: 208 },
    { id: 'zh-vocab',   char: '词', name: 'Kosakata ZH', total: 600 },
    { id: 'hangul',     char: '한', name: 'Hangul',   total: 35 },
    { id: 'kr-vocab',   char: '어', name: 'Kosakata KR', total: 155 },
    { id: 'kr-grammar', char: '문', name: 'Grammar KR',  total: 27 },
    { id: 'kr-dialog',  char: '대', name: 'Dialog KR',   total: 6 },
  ];

  // ── Load settings ────────────────────────────────────────
  let settings = Storage.getUser(user.id, 'settings', {
    showRomaji: true,
    showPinyin: true,
    animationEnabled: true,
    timerEnabled: true,
    audioAutoPlay: false,
  });

  function saveSettings() {
    Storage.setUser(user.id, 'settings', settings);
  }

  // ── Bind toggles ──────────────────────────────────────────
  function bindToggle(id, key) {
    const el = document.getElementById(id);
    if (!el) return;
    el.checked = settings[key] !== false; // default true if undefined
    el.addEventListener('change', () => {
      settings[key] = el.checked;
      saveSettings();
      App.toast(`Pengaturan disimpan`, 'success', 2000);
    });
  }

  bindToggle('toggle-romaji', 'showRomaji');
  bindToggle('toggle-pinyin', 'showPinyin');
  bindToggle('toggle-romanization', 'showRomanization');
  bindToggle('toggle-animation', 'animationEnabled');
  bindToggle('toggle-timer', 'timerEnabled');
  bindToggle('toggle-autoplay', 'audioAutoPlay');

  // ── Dark mode toggle ───────────────────────────────────────
  const darkToggle = document.getElementById('toggle-darkmode');
  if (darkToggle) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    darkToggle.checked = currentTheme === 'dark';
    darkToggle.addEventListener('change', () => {
      App.toggleTheme();
    });
  }

  // ── Audio section ──────────────────────────────────────────
  const audioNotSupported = document.getElementById('audio-not-supported');
  if (AudioEngine && AudioEngine.isSupported()) {
    if (audioNotSupported) audioNotSupported.style.display = 'none';
    AudioEngine.init(user.id);
  } else {
    if (audioNotSupported) audioNotSupported.style.display = 'block';
    const toggleAutoPlay = document.getElementById('toggle-autoplay');
    if (toggleAutoPlay) toggleAutoPlay.disabled = true;
  }

  const testJPBtn = document.getElementById('test-jp-voice');
  const testZHBtn = document.getElementById('test-zh-voice');
  if (testJPBtn) {
    testJPBtn.addEventListener('click', () => {
      if (!AudioEngine.isSupported()) { App.toast('Browser tidak mendukung TTS', 'error'); return; }
      AudioEngine.speakJP('こんにちは、日本語です');
      App.toast('Memutar suara Jepang... 🔊', 'default', 2000);
    });
  }
  if (testZHBtn) {
    testZHBtn.addEventListener('click', () => {
      if (!AudioEngine.isSupported()) { App.toast('Browser tidak mendukung TTS', 'error'); return; }
      AudioEngine.speakZH('你好，这是中文');
      App.toast('Memutar suara Mandarin... 🔊', 'default', 2000);
    });
  }

  // ── Render reset buttons ──────────────────────────────────
  const resetGrid = document.getElementById('reset-grid');
  const progress = Storage.getUser(user.id, 'progress', {});

  if (resetGrid) {
    resetGrid.innerHTML = MODULES.map(mod => {
      const learned = progress[mod.id]?.learned?.length || 0;
      return `
        <button class="reset-module-btn" data-module="${mod.id}" data-name="${mod.name}">
          <span class="reset-module-char">${mod.char}</span>
          <span class="reset-module-name">${mod.name}</span>
          <span class="reset-module-count">${learned} dipelajari</span>
        </button>
      `;
    }).join('');

    resetGrid.querySelectorAll('.reset-module-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showConfirm(
          `Reset ${btn.dataset.name}?`,
          `Seluruh progress belajar modul <strong>${btn.dataset.name}</strong> akan dihapus permanen.`,
          () => resetModule(btn.dataset.module, btn.dataset.name)
        );
      });
    });
  }

  // ── Reset all ─────────────────────────────────────────────
  const btnResetAll = document.getElementById('btn-reset-all');
  if (btnResetAll) {
    btnResetAll.addEventListener('click', () => {
      showConfirm(
        'Reset Semua Progress?',
        'Seluruh data belajar, quiz, dan badge akan dihapus. Akun tidak akan dihapus.',
        resetAll
      );
    });
  }

  function resetModule(moduleId, name) {
    const all = Storage.getUser(user.id, 'progress', {});
    delete all[moduleId];
    Storage.setUser(user.id, 'progress', all);
    // Update totalLearned
    let total = 0;
    Object.values(all).forEach(m => { total += (m.learned?.length || 0); });
    const stats = Storage.getUser(user.id, 'stats', {});
    stats.totalLearned = total;
    Storage.setUser(user.id, 'stats', stats);
    // Refresh counts
    refreshResetGrid();
    App.toast(`Progress ${name} berhasil direset.`, 'success', 3000);
  }

  function resetAll() {
    Storage.setUser(user.id, 'progress', {});
    Storage.setUser(user.id, 'stats', { totalLearned: 0, quizCompleted: 0, totalCorrect: 0, totalQuestions: 0 });
    Storage.setUser(user.id, 'badges', {});
    Storage.setUser(user.id, 'activity', {});
    refreshResetGrid();
    App.toast('Semua progress berhasil direset.', 'success', 3000);
  }

  function refreshResetGrid() {
    const all = Storage.getUser(user.id, 'progress', {});
    resetGrid.querySelectorAll('.reset-module-btn').forEach(btn => {
      const mid = btn.dataset.module;
      const learned = all[mid]?.learned?.length || 0;
      btn.querySelector('.reset-module-count').textContent = learned + ' dipelajari';
    });
  }

  // ── Reminder Section ───────────────────────────────────────
  const reminderNotSupported = document.getElementById('reminder-not-supported');
  const reminderDeniedMsg    = document.getElementById('reminder-denied-msg');
  const toggleReminder       = document.getElementById('toggle-reminder');
  const reminderTimeRow      = document.getElementById('reminder-time-row');
  const reminderTimeInput    = document.getElementById('reminder-time-input');
  const btnTestReminder      = document.getElementById('btn-test-reminder');
  const reminderStatusBar    = document.getElementById('reminder-status');

  function renderReminderStatus() {
    if (!reminderStatusBar) return;
    const s = ReminderSystem.getSettings();
    if (!s.enabled) {
      reminderStatusBar.style.display = 'none';
      return;
    }
    reminderStatusBar.style.display = 'flex';
    reminderStatusBar.className = 'reminder-status-bar status-ok';
    reminderStatusBar.innerHTML = `✅ Pengingat aktif — akan muncul setiap hari pukul <strong>${ReminderSystem.formatTime(s.hour, s.minute)}</strong>`;
  }

  if (!ReminderSystem.isSupported()) {
    if (reminderNotSupported) reminderNotSupported.style.display = 'block';
    if (toggleReminder) toggleReminder.disabled = true;
    if (reminderTimeInput) reminderTimeInput.disabled = true;
    if (btnTestReminder) btnTestReminder.disabled = true;
  } else {
    ReminderSystem.init(user.id);
    const rs = ReminderSystem.getSettings();

    // Load initial state
    if (toggleReminder) {
      toggleReminder.checked = rs.enabled;
      if (reminderTimeRow) reminderTimeRow.style.opacity = rs.enabled ? '1' : '0.5';
    }
    if (reminderTimeInput) {
      reminderTimeInput.value = ReminderSystem.formatTime(rs.hour, rs.minute);
      reminderTimeInput.disabled = !rs.enabled;
    }

    if (ReminderSystem.getPermission() === 'denied') {
      if (reminderDeniedMsg) reminderDeniedMsg.style.display = 'block';
      if (toggleReminder) toggleReminder.disabled = true;
    }

    renderReminderStatus();

    // Toggle reminder on/off
    if (toggleReminder) {
      toggleReminder.addEventListener('change', async () => {
        if (toggleReminder.checked) {
          // Request permission first
          const granted = await ReminderSystem.requestPermission();
          if (!granted) {
            toggleReminder.checked = false;
            if (reminderDeniedMsg) reminderDeniedMsg.style.display = 'block';
            App.toast('Izin notifikasi diperlukan untuk mengaktifkan pengingat.', 'error', 3000);
            return;
          }
          const s = ReminderSystem.getSettings();
          s.enabled = true;
          ReminderSystem.saveSettings(s);
          ReminderSystem.schedule();
          if (reminderTimeInput) reminderTimeInput.disabled = false;
          if (reminderTimeRow) reminderTimeRow.style.opacity = '1';
          App.toast(`Pengingat diaktifkan pukul ${ReminderSystem.formatTime(s.hour, s.minute)} 🔔`, 'success', 3000);
        } else {
          const s = ReminderSystem.getSettings();
          s.enabled = false;
          ReminderSystem.saveSettings(s);
          ReminderSystem.cancel();
          if (reminderTimeInput) reminderTimeInput.disabled = true;
          if (reminderTimeRow) reminderTimeRow.style.opacity = '0.5';
          App.toast('Pengingat dimatikan.', 'default', 2000);
        }
        renderReminderStatus();
      });
    }

    // Time input change
    if (reminderTimeInput) {
      reminderTimeInput.addEventListener('change', () => {
        const parsed = ReminderSystem.parseTime(reminderTimeInput.value);
        const s = ReminderSystem.getSettings();
        s.hour = parsed.hour;
        s.minute = parsed.minute;
        ReminderSystem.saveSettings(s);
        if (s.enabled) {
          ReminderSystem.schedule();
          App.toast(`Waktu pengingat diubah ke ${ReminderSystem.formatTime(s.hour, s.minute)} ✅`, 'success', 2500);
        }
        renderReminderStatus();
      });
    }

    // Test button
    if (btnTestReminder) {
      btnTestReminder.addEventListener('click', async () => {
        const result = await ReminderSystem.preview();
        if (result.ok) {
          App.toast('Notifikasi dikirim! Cek area notifikasi browser. 🔔', 'success', 3000);
        } else if (result.reason === 'not_supported') {
          App.toast('Browser tidak mendukung Web Notifications.', 'error', 3000);
        } else if (result.reason === 'denied') {
          App.toast('Izin notifikasi ditolak. Ubah di pengaturan browser.', 'error', 3000);
          if (reminderDeniedMsg) reminderDeniedMsg.style.display = 'block';
        } else {
          App.toast('Gagal menampilkan notifikasi.', 'error', 2000);
        }
      });
    }
  }

  // ── Tema & Kustomisasi (Fase 28) ─────────────────────────
  if (window.ThemeSystem) {
    const customization = ThemeSystem.getCustomization(user.id);

    // Render color theme grid
    const colorGrid = document.getElementById('color-theme-grid');
    if (colorGrid) {
      colorGrid.innerHTML = ThemeSystem.getThemes().map(t => `
        <div class="theme-card ${t.cls} ${customization.colorTheme === t.id ? 'active' : ''}"
             data-theme-id="${t.id}" title="${t.desc}">
          <div class="theme-preview">
            <div class="theme-preview-dot tp-d1"></div>
            <div class="theme-preview-dot tp-d2"></div>
            <div class="theme-preview-dot tp-d3"></div>
            <div class="theme-preview-dot tp-d4"></div>
          </div>
          <div class="theme-name">${t.emoji} ${t.name}</div>
        </div>
      `).join('');

      colorGrid.addEventListener('click', e => {
        const card = e.target.closest('[data-theme-id]');
        if (!card) return;
        const themeId = card.dataset.themeId;
        ThemeSystem.setColorTheme(user.id, themeId);
        colorGrid.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        // Update preview badge name
        const themedName = ThemeSystem.getThemes().find(t => t.id === themeId);
        const previewBadge = document.getElementById('preview-theme-name');
        if (previewBadge && themedName) previewBadge.textContent = themedName.name;
        App.toast(`Tema ${themedName ? themedName.name : themeId} diterapkan! 🎨`, 'success', 2000);
      });
    }

    // Initial preview badge
    const initTheme = ThemeSystem.getThemes().find(t => t.id === customization.colorTheme);
    const previewBadge = document.getElementById('preview-theme-name');
    if (previewBadge && initTheme) previewBadge.textContent = initTheme.name;

    // Render font picker
    const fontGrid = document.getElementById('font-picker-grid');
    if (fontGrid) {
      fontGrid.innerHTML = ThemeSystem.getFonts().map(f => `
        <div class="font-card font-${f.id} ${(customization.font || 'default') === f.id ? 'active' : ''}"
             data-font-id="${f.id}" title="${f.desc}">
          <div class="font-card-preview">${f.preview}</div>
          <div class="font-card-label">${f.name} — ${f.desc}</div>
        </div>
      `).join('');

      fontGrid.addEventListener('click', e => {
        const card = e.target.closest('[data-font-id]');
        if (!card) return;
        const fontId = card.dataset.fontId;
        ThemeSystem.setFont(user.id, fontId);
        fontGrid.querySelectorAll('.font-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        App.toast(`Font diubah ke ${fontId}`, 'success', 2000);
      });
    }

    // Render radius picker
    const radiusPicker = document.getElementById('radius-picker');
    if (radiusPicker) {
      radiusPicker.innerHTML = ThemeSystem.getRadiusOptions().map(r => `
        <button class="radius-btn ${(customization.radius || 'default') === r.id ? 'active' : ''}"
                data-radius-id="${r.id}" title="${r.desc}">${r.label}</button>
      `).join('');

      radiusPicker.addEventListener('click', e => {
        const btn = e.target.closest('[data-radius-id]');
        if (!btn) return;
        const rid = btn.dataset.radiusId;
        ThemeSystem.setRadius(user.id, rid);
        radiusPicker.querySelectorAll('.radius-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        App.toast(`Sudut UI diubah ke: ${rid}`, 'success', 2000);
      });
    }

    // Reset theme button
    const btnResetTheme = document.getElementById('btn-reset-theme');
    if (btnResetTheme) {
      btnResetTheme.addEventListener('click', () => {
        ThemeSystem.setColorTheme(user.id, 'sakura');
        ThemeSystem.setFont(user.id, 'default');
        ThemeSystem.setRadius(user.id, 'default');

        // Re-render UI
        colorGrid && colorGrid.querySelectorAll('.theme-card').forEach(c => {
          c.classList.toggle('active', c.dataset.themeId === 'sakura');
        });
        fontGrid && fontGrid.querySelectorAll('.font-card').forEach(c => {
          c.classList.toggle('active', c.dataset.fontId === 'default');
        });
        radiusPicker && radiusPicker.querySelectorAll('.radius-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.radiusId === 'default');
        });
        if (previewBadge) previewBadge.textContent = 'Sakura';
        App.toast('Tema dikembalikan ke Sakura (default) 🌸', 'success', 2500);
      });
    }
  }

  // ── Confirm dialog ────────────────────────────────────────
  const backdrop   = document.getElementById('confirm-backdrop');
  const titleEl    = document.getElementById('confirm-title');
  const msgEl      = document.getElementById('confirm-msg');
  const btnOk      = document.getElementById('confirm-ok');
  const btnCancel  = document.getElementById('confirm-cancel');
  let confirmCb    = null;

  function showConfirm(title, msg, cb) {
    titleEl.textContent = title;
    msgEl.innerHTML = msg;
    confirmCb = cb;
    backdrop.classList.add('show');
  }

  function hideConfirm() {
    backdrop.classList.remove('show');
    confirmCb = null;
  }

  if (btnOk) {
    btnOk.addEventListener('click', () => {
      if (confirmCb) confirmCb();
      hideConfirm();
    });
  }

  if (btnCancel) btnCancel.addEventListener('click', hideConfirm);
  if (backdrop) backdrop.addEventListener('click', e => {
    if (e.target === backdrop) hideConfirm();
  });
});

// ── PWA Section (Fase 20) ────────────────────────────────────────────
(function initPWASection() {
  const installStatus = document.getElementById('pwa-install-status');
  const offlineStatus = document.getElementById('pwa-offline-status');
  const onlineBadge   = document.getElementById('pwa-online-badge');
  const btnInstall    = document.getElementById('btn-pwa-install');

  if (!installStatus) return;

  // Cek apakah sudah terinstall (standalone mode)
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;

  if (isInstalled) {
    installStatus.textContent = '✅ Lingora sudah terinstall di perangkat ini';
  } else if ('BeforeInstallPromptEvent' in window || 'serviceWorker' in navigator) {
    installStatus.textContent = 'Belum terinstall — klik tombol untuk install';
    if (btnInstall) btnInstall.style.display = '';
  } else {
    installStatus.textContent = 'Browser tidak mendukung instalasi PWA';
  }

  // Cek status online/offline
  function updateOnlineStatus() {
    if (!onlineBadge || !offlineStatus) return;
    if (navigator.onLine) {
      onlineBadge.textContent = '🟢 Online';
      onlineBadge.style.background = 'var(--green, #27ae60)';
      offlineStatus.textContent = 'Konten di-cache untuk akses offline ✓';
    } else {
      onlineBadge.textContent = '🔴 Offline';
      onlineBadge.style.background = '#c0392b';
      offlineStatus.textContent = 'Sedang offline — menggunakan cache lokal';
    }
  }
  updateOnlineStatus();
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // Cek apakah cache sudah ada
  if ('caches' in window) {
    caches.has('lingora-v1').then(has => {
      if (offlineStatus && has) {
        offlineStatus.textContent = 'Cache aktif — semua konten tersedia offline ✓';
      }
    });
  }

  // Tombol install
  if (btnInstall) {
    btnInstall.addEventListener('click', () => {
      // Trigger dari PWAManager jika tersedia
      if (window.PWAManager) {
        // deferredPrompt tersimpan di PWAManager
        installStatus.textContent = 'Silakan ikuti dialog instalasi dari browser...';
      }
    });
  }
})();
