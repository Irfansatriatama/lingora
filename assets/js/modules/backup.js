/**
 * Lingora - BackupSystem Module (Fase 29)
 * Export/Import seluruh data progress user ke file JSON
 * Auto-backup lokal setiap 7 hari (max 3 snapshot di localStorage)
 */
const BackupSystem = (() => {
  const BACKUP_VERSION = '2.0';
  const APP_NAME = 'Lingora';
  const MAX_AUTO_BACKUPS = 3;
  const AUTO_BACKUP_INTERVAL_DAYS = 7;

  // Semua section data yang dibackup per user
  const DATA_SECTIONS = [
    'progress', 'srs_hiragana', 'srs_katakana', 'srs_kanji',
    'srs_jp-vocab', 'srs_hanzi', 'srs_zh-vocab',
    'srs_hangul', 'srs_kr-vocab', 'srs_kr-grammar', 'srs_kr-dialog',
    'favorites', 'xp', 'badges', 'activity', 'streak',
    'challenges', 'stats', 'settings', 'reminder',
    'onboarding', 'planner', 'customization'
  ];

  /**
   * Export semua data user ke objek JSON
   */
  function exportData(userId) {
    const users = Storage.get('users', []);
    const user = users.find(u => u.id === userId);
    if (!user) return null;

    const data = {};
    DATA_SECTIONS.forEach(section => {
      const val = Storage.getUser(userId, section, null);
      if (val !== null) data[section] = val;
    });

    return {
      version: BACKUP_VERSION,
      appName: APP_NAME,
      exportDate: new Date().toISOString().slice(0, 10),
      exportTimestamp: Date.now(),
      userId: userId,
      userName: user.name || 'Pengguna',
      userEmail: user.email || '',
      data
    };
  }

  /**
   * Download backup sebagai file JSON
   */
  function downloadBackup(userId) {
    const backupObj = exportData(userId);
    if (!backupObj) return { ok: false, reason: 'user_not_found' };

    try {
      const json = JSON.stringify(backupObj, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lingora-backup-${backupObj.exportDate}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      // Update last backup timestamp
      Storage.setUser(userId, 'last_backup', { timestamp: Date.now(), date: backupObj.exportDate });
      return { ok: true, date: backupObj.exportDate };
    } catch (e) {
      console.error('[BackupSystem] downloadBackup error:', e);
      return { ok: false, reason: 'download_failed' };
    }
  }

  /**
   * Validasi struktur file backup
   */
  function validate(backupObj) {
    if (!backupObj || typeof backupObj !== 'object') {
      return { valid: false, reason: 'Bukan format JSON yang valid.' };
    }
    if (backupObj.appName !== APP_NAME) {
      return { valid: false, reason: 'File bukan backup dari Lingora.' };
    }
    if (!backupObj.version || !backupObj.data) {
      return { valid: false, reason: 'File backup tidak lengkap atau rusak.' };
    }
    if (!backupObj.userId) {
      return { valid: false, reason: 'ID user tidak ditemukan di backup.' };
    }
    return { valid: true };
  }

  /**
   * Import data dari objek backup ke user aktif
   * Merge: data backup ditimpa ke user aktif (tidak ganti akun)
   */
  function importData(userId, backupObj, options = {}) {
    const check = validate(backupObj);
    if (!check.valid) return { ok: false, reason: check.reason };

    try {
      const { data } = backupObj;
      const sectionsToImport = options.sections || DATA_SECTIONS;

      sectionsToImport.forEach(section => {
        if (data[section] !== undefined) {
          Storage.setUser(userId, section, data[section]);
        }
      });

      // Tandai waktu restore
      Storage.setUser(userId, 'last_restore', {
        timestamp: Date.now(),
        fromDate: backupObj.exportDate,
        fromUser: backupObj.userName
      });

      return { ok: true, userName: backupObj.userName, exportDate: backupObj.exportDate };
    } catch (e) {
      console.error('[BackupSystem] importData error:', e);
      return { ok: false, reason: 'Gagal memulihkan data. ' + e.message };
    }
  }

  /**
   * Baca file JSON dari input[type=file]
   */
  function readFile(file) {
    return new Promise((resolve, reject) => {
      if (!file || file.type !== 'application/json') {
        reject(new Error('Pilih file JSON yang valid.'));
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const obj = JSON.parse(e.target.result);
          resolve(obj);
        } catch {
          reject(new Error('File tidak bisa dibaca sebagai JSON.'));
        }
      };
      reader.onerror = () => reject(new Error('Gagal membaca file.'));
      reader.readAsText(file);
    });
  }

  /**
   * Auto-backup: simpan snapshot ke localStorage (max 3)
   * Dipanggil dari init() saat app dimuat jika interval sudah lewat
   */
  function autoBackup(userId) {
    const lastInfo = Storage.getUser(userId, 'last_backup', null);
    const now = Date.now();
    const intervalMs = AUTO_BACKUP_INTERVAL_DAYS * 24 * 60 * 60 * 1000;

    if (lastInfo && (now - lastInfo.timestamp) < intervalMs) return false;

    const backupObj = exportData(userId);
    if (!backupObj) return false;

    // Simpan ke auto-backup list
    const autoBackups = Storage.get('auto_backups_' + userId, []);
    autoBackups.unshift({ timestamp: now, data: backupObj });

    // Batasi max 3 snapshot
    if (autoBackups.length > MAX_AUTO_BACKUPS) autoBackups.splice(MAX_AUTO_BACKUPS);

    Storage.set('auto_backups_' + userId, autoBackups);
    Storage.setUser(userId, 'last_backup', { timestamp: now, date: backupObj.exportDate });
    console.log('[BackupSystem] Auto-backup selesai:', backupObj.exportDate);
    return true;
  }

  /**
   * Ambil daftar auto-backup yang tersimpan
   */
  function getAutoBackups(userId) {
    return Storage.get('auto_backups_' + userId, []);
  }

  /**
   * Restore dari auto-backup (by index)
   */
  function restoreAutoBackup(userId, index) {
    const autoBackups = getAutoBackups(userId);
    if (!autoBackups[index]) return { ok: false, reason: 'Snapshot tidak ditemukan.' };
    return importData(userId, autoBackups[index].data);
  }

  /**
   * Info backup terakhir
   */
  function getLastBackupInfo(userId) {
    return Storage.getUser(userId, 'last_backup', null);
  }

  /**
   * Info restore terakhir
   */
  function getLastRestoreInfo(userId) {
    return Storage.getUser(userId, 'last_restore', null);
  }

  /**
   * Format tanggal untuk ditampilkan
   */
  function formatDate(timestamp) {
    if (!timestamp) return '-';
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  return {
    exportData,
    downloadBackup,
    validate,
    importData,
    readFile,
    autoBackup,
    getAutoBackups,
    restoreAutoBackup,
    getLastBackupInfo,
    getLastRestoreInfo,
    formatDate,
    DATA_SECTIONS
  };
})();

window.BackupSystem = BackupSystem;
