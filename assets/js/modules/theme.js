/**
 * Lingora — ThemeSystem (Fase 28)
 * Manajemen tema warna, font, radius, dan preferensi kustomisasi UI.
 * Disimpan di nh_user_{id}_customization (localStorage via Storage)
 * Global: window.ThemeSystem
 */

const ThemeSystem = (() => {

  const THEMES = [
    {
      id: 'sakura',
      name: 'Sakura',
      desc: 'Tradisional Jepang — merah & emas',
      emoji: '🌸',
      cls: 'tp-sakura',
    },
    {
      id: 'zen',
      name: 'Zen',
      desc: 'Minimalis — hijau sage',
      emoji: '🍃',
      cls: 'tp-zen',
    },
    {
      id: 'neon-seoul',
      name: 'Neon Seoul',
      desc: 'Futuristik — ungu & cyan',
      emoji: '🌆',
      cls: 'tp-neon-seoul',
    },
    {
      id: 'bamboo',
      name: 'Bamboo',
      desc: 'Alam Asia Timur — hijau & kuning',
      emoji: '🎋',
      cls: 'tp-bamboo',
    },
    {
      id: 'midnight',
      name: 'Midnight',
      desc: 'Dark mode kuat — oranye menyala',
      emoji: '🌙',
      cls: 'tp-midnight',
    },
  ];

  const FONTS = [
    { id: 'default', name: 'DM Sans', desc: 'Modern & bersih (bawaan)', preview: 'Aa 日 한 中' },
    { id: 'rounded', name: 'Nunito',  desc: 'Bulat & ramah',            preview: 'Aa 日 한 中' },
    { id: 'serif',   name: 'Playfair', desc: 'Elegan & formal',          preview: 'Aa 日 한 中' },
    { id: 'mono',    name: 'Monospace', desc: 'Teknis & tajam',           preview: 'Aa 日 한 中' },
  ];

  const RADIUS_OPTIONS = [
    { id: 'sharp',   label: 'Tajam',   desc: 'Sudut kotak' },
    { id: 'default', label: 'Default', desc: 'Sudut sedang' },
    { id: 'rounded', label: 'Bulat',   desc: 'Sudut membulat' },
  ];

  const DEFAULT_CUSTOMIZATION = {
    colorTheme: 'sakura',
    font: 'default',
    radius: 'default',
    compactSidebar: false,
  };

  // ── Load & Apply ─────────────────────────────────────────

  function getCustomization(userId) {
    if (!userId) return { ...DEFAULT_CUSTOMIZATION };
    return Storage.getUser(userId, 'customization', { ...DEFAULT_CUSTOMIZATION });
  }

  function saveCustomization(userId, data) {
    if (!userId) return;
    Storage.setUser(userId, 'customization', data);
  }

  function applyAll(userId) {
    const c = getCustomization(userId);
    applyColorTheme(c.colorTheme || 'sakura');
    applyFont(c.font || 'default');
    applyRadius(c.radius || 'default');
    applyCompactSidebar(c.compactSidebar || false);
  }

  function applyColorTheme(themeId) {
    document.documentElement.setAttribute('data-color-theme', themeId);
    // Simpan ke localStorage untuk anti-FOUC
    try { localStorage.setItem('nh_color_theme', themeId); } catch(e) {}

    // Jika tema midnight, otomatis aktifkan dark mode
    if (themeId === 'midnight') {
      if (document.documentElement.getAttribute('data-theme') !== 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        try { localStorage.setItem('nh_last_theme', 'dark'); } catch(e) {}
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
          btn.textContent = '☀️';
          btn.title = 'Beralih ke Mode Terang';
        });
        const settingsToggle = document.getElementById('toggle-darkmode');
        if (settingsToggle) settingsToggle.checked = true;
      }
    }
  }

  function applyFont(fontId) {
    // Hapus semua data-font lama
    document.documentElement.removeAttribute('data-font');
    if (fontId && fontId !== 'default') {
      document.documentElement.setAttribute('data-font', fontId);
    }
    try { localStorage.setItem('nh_font', fontId); } catch(e) {}
  }

  function applyRadius(radiusId) {
    document.documentElement.setAttribute('data-radius', radiusId || 'default');
    try { localStorage.setItem('nh_radius', radiusId); } catch(e) {}
  }

  function applyCompactSidebar(compact) {
    document.documentElement.setAttribute('data-sidebar-compact', compact ? 'true' : 'false');
  }

  // ── Anti-FOUC ─────────────────────────────────────────────
  // Dipanggil via inline script di <head> sebelum body render

  function applyFromLocalStorage() {
    try {
      const colorTheme = localStorage.getItem('nh_color_theme') || 'sakura';
      const font       = localStorage.getItem('nh_font')         || 'default';
      const radius     = localStorage.getItem('nh_radius')       || 'default';
      document.documentElement.setAttribute('data-color-theme', colorTheme);
      if (font && font !== 'default') {
        document.documentElement.setAttribute('data-font', font);
      }
      document.documentElement.setAttribute('data-radius', radius);
    } catch(e) {}
  }

  // ── Setters ────────────────────────────────────────────────

  function setColorTheme(userId, themeId) {
    const c = getCustomization(userId);
    c.colorTheme = themeId;
    saveCustomization(userId, c);
    applyColorTheme(themeId);

    // Simpan dark mode state ke user settings jika midnight
    if (themeId === 'midnight' && userId) {
      const s = Storage.getUser(userId, 'settings', {});
      s.theme = 'dark';
      Storage.setUser(userId, 'settings', s);
    }
  }

  function setFont(userId, fontId) {
    const c = getCustomization(userId);
    c.font = fontId;
    saveCustomization(userId, c);
    applyFont(fontId);
  }

  function setRadius(userId, radiusId) {
    const c = getCustomization(userId);
    c.radius = radiusId;
    saveCustomization(userId, c);
    applyRadius(radiusId);
  }

  function setCompactSidebar(userId, compact) {
    const c = getCustomization(userId);
    c.compactSidebar = compact;
    saveCustomization(userId, c);
    applyCompactSidebar(compact);
  }

  // ── Getters ────────────────────────────────────────────────

  function getThemes()       { return THEMES; }
  function getFonts()        { return FONTS; }
  function getRadiusOptions(){ return RADIUS_OPTIONS; }

  // ── Public API ────────────────────────────────────────────
  return {
    getThemes, getFonts, getRadiusOptions,
    getCustomization, saveCustomization,
    applyAll, applyColorTheme, applyFont, applyRadius, applyCompactSidebar,
    applyFromLocalStorage,
    setColorTheme, setFont, setRadius, setCompactSidebar,
    DEFAULT_CUSTOMIZATION,
  };

})();

window.ThemeSystem = ThemeSystem;
