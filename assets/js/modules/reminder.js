/**
 * Lingora - Reminder System (Fase 18)
 * Streak reminder via Web Notifications API + setTimeout scheduling.
 * Hanya bekerja saat tab browser masih terbuka.
 */
const ReminderSystem = (() => {
  let _timerId = null;
  let _userId = null;

  // ── Permission ──────────────────────────────────────────────
  function isSupported() {
    return 'Notification' in window;
  }

  function getPermission() {
    if (!isSupported()) return 'denied';
    return Notification.permission; // 'default' | 'granted' | 'denied'
  }

  async function requestPermission() {
    if (!isSupported()) return false;
    if (Notification.permission === 'granted') return true;
    const result = await Notification.requestPermission();
    return result === 'granted';
  }

  // ── Settings ────────────────────────────────────────────────
  function getSettings() {
    if (!_userId) return _defaultSettings();
    return Storage.getUser(_userId, 'reminder', _defaultSettings());
  }

  function _defaultSettings() {
    return {
      enabled: false,
      hour: 20,   // jam pengingat (0-23)
      minute: 0,  // menit pengingat
    };
  }

  function saveSettings(data) {
    if (!_userId) return;
    Storage.setUser(_userId, 'reminder', data);
  }

  // ── Scheduling ──────────────────────────────────────────────
  /**
   * Hitung milidetik sampai jam target berikutnya.
   * Jika jam target sudah lewat hari ini, schedule besok.
   */
  function _msUntilNext(hour, minute) {
    const now = new Date();
    const target = new Date();
    target.setHours(hour, minute, 0, 0);
    if (target <= now) {
      // Sudah lewat hari ini → schedule besok
      target.setDate(target.getDate() + 1);
    }
    return target.getTime() - now.getTime();
  }

  /**
   * Mulai timer pengingat berdasarkan settings.
   * Cancel timer sebelumnya jika ada.
   */
  function schedule() {
    cancel(); // clear existing timer

    const s = getSettings();
    if (!s.enabled) return;
    if (getPermission() !== 'granted') return;

    const delay = _msUntilNext(s.hour, s.minute);

    _timerId = setTimeout(() => {
      _fireNotification();
      // Auto reschedule untuk besok
      _timerId = null;
      schedule();
    }, delay);

    console.log(`[ReminderSystem] Dijadwalkan dalam ${Math.round(delay / 60000)} menit`);
  }

  function cancel() {
    if (_timerId !== null) {
      clearTimeout(_timerId);
      _timerId = null;
    }
  }

  function _fireNotification() {
    // Cek apakah user sudah belajar hari ini
    if (_userId && _hasLearnedToday()) return; // sudah belajar, tidak perlu reminder

    const messages = [
      '🔥 Jangan putus streak-mu! Belajar sekarang di Lingora.',
      '📚 Sudah belajar Jepang atau Mandarin hari ini? Jaga streak-mu!',
      '日 Waktu belajar! Satu karakter sehari membuat perbedaan besar.',
      '✨ Lingora menantimu! Jaga streak belajarmu tetap menyala.',
      '🎯 Targetmu menanti! Buka Lingora dan belajar sekarang.',
    ];
    const body = messages[Math.floor(Math.random() * messages.length)];

    try {
      const notif = new Notification('Lingora — Pengingat Belajar', {
        body,
        icon: '../../assets/icons/icon-192.png', // opsional, mungkin tidak ada
        badge: '../../assets/icons/icon-192.png',
        tag: 'lingora-streak-reminder', // prevent duplicate
        requireInteraction: false,
        silent: false,
      });

      // Klik notifikasi → fokus tab
      notif.onclick = () => {
        window.focus();
        notif.close();
      };

      // Auto-close setelah 10 detik
      setTimeout(() => notif.close(), 10000);
    } catch (e) {
      console.warn('[ReminderSystem] Gagal menampilkan notifikasi:', e);
    }
  }

  function _hasLearnedToday() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const activity = Storage.getUser(_userId, 'activity', {});
      return !!activity[today];
    } catch (e) {
      return false;
    }
  }

  // ── Preview (test notification) ─────────────────────────────
  async function preview() {
    if (!isSupported()) return { ok: false, reason: 'not_supported' };

    const granted = await requestPermission();
    if (!granted) return { ok: false, reason: 'denied' };

    try {
      const notif = new Notification('Lingora — Tes Pengingat 🔥', {
        body: 'Ini adalah contoh notifikasi pengingat belajar dari Lingora!',
        tag: 'lingora-preview',
      });
      setTimeout(() => notif.close(), 5000);
      return { ok: true };
    } catch (e) {
      return { ok: false, reason: 'error', error: e.message };
    }
  }

  // ── Init ────────────────────────────────────────────────────
  function init(userId) {
    _userId = userId;
    schedule(); // mulai schedule jika settings sudah ada
  }

  // ── Format display helper ───────────────────────────────────
  function formatTime(hour, minute) {
    const h = String(hour).padStart(2, '0');
    const m = String(minute).padStart(2, '0');
    return `${h}:${m}`;
  }

  function parseTime(str) {
    const [h, m] = str.split(':').map(Number);
    return { hour: isNaN(h) ? 20 : Math.max(0, Math.min(23, h)), minute: isNaN(m) ? 0 : Math.max(0, Math.min(59, m)) };
  }

  return {
    isSupported,
    getPermission,
    requestPermission,
    getSettings,
    saveSettings,
    schedule,
    cancel,
    preview,
    init,
    formatTime,
    parseTime,
  };
})();

window.ReminderSystem = ReminderSystem;
