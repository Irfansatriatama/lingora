/**
 * Lingora - Study Planner Module (Fase 26)
 * Engine kalkulasi jadwal belajar otomatis berdasarkan target ujian.
 */
const StudyPlanner = (() => {

  // ── Target Ujian ─────────────────────────────────────────────
  const EXAMS = [
    {
      id: 'jlpt-n5', lang: 'jp', label: 'JLPT N5', icon: '🇯🇵',
      description: 'Level dasar Jepang',
      modules: [
        { id: 'hiragana', name: 'Hiragana', total: 104, priority: 1 },
        { id: 'katakana', name: 'Katakana', total: 104, priority: 1 },
        { id: 'kanji',    name: 'Kanji N5', total: 103, priority: 2 },
        { id: 'jp-vocab', name: 'Kosakata', total: 500, priority: 3 },
        { id: 'jp-grammar', name: 'Grammar', total: 50, priority: 2 },
      ]
    },
    {
      id: 'jlpt-n4', lang: 'jp', label: 'JLPT N4', icon: '🇯🇵',
      description: 'Level dasar-menengah Jepang',
      modules: [
        { id: 'hiragana', name: 'Hiragana', total: 104, priority: 1 },
        { id: 'katakana', name: 'Katakana', total: 104, priority: 1 },
        { id: 'kanji',    name: 'Kanji N4', total: 103, priority: 2 },
        { id: 'jp-vocab', name: 'Kosakata', total: 500, priority: 3 },
        { id: 'jp-grammar', name: 'Grammar', total: 50, priority: 2 },
      ]
    },
    {
      id: 'jlpt-n3', lang: 'jp', label: 'JLPT N3', icon: '🇯🇵',
      description: 'Level menengah Jepang',
      modules: [
        { id: 'kanji',    name: 'Kanji', total: 103, priority: 1 },
        { id: 'jp-vocab', name: 'Kosakata', total: 500, priority: 2 },
        { id: 'jp-grammar', name: 'Grammar', total: 50, priority: 1 },
      ]
    },
    {
      id: 'hsk-1', lang: 'zh', label: 'HSK 1', icon: '🇨🇳',
      description: 'Level dasar Mandarin',
      modules: [
        { id: 'pinyin',   name: 'Pinyin',   total: 59,  priority: 1 },
        { id: 'tones',    name: 'Nada',     total: 5,   priority: 1 },
        { id: 'hanzi',    name: 'Hanzi HSK1', total: 150, priority: 2 },
        { id: 'zh-vocab', name: 'Kosakata', total: 500, priority: 3 },
      ]
    },
    {
      id: 'hsk-2', lang: 'zh', label: 'HSK 2', icon: '🇨🇳',
      description: 'Level dasar-menengah Mandarin',
      modules: [
        { id: 'pinyin',   name: 'Pinyin',   total: 59,  priority: 1 },
        { id: 'hanzi',    name: 'Hanzi',    total: 150, priority: 1 },
        { id: 'zh-vocab', name: 'Kosakata', total: 500, priority: 2 },
      ]
    },
    {
      id: 'hsk-3', lang: 'zh', label: 'HSK 3', icon: '🇨🇳',
      description: 'Level menengah Mandarin',
      modules: [
        { id: 'hanzi',    name: 'Hanzi',    total: 150, priority: 1 },
        { id: 'zh-vocab', name: 'Kosakata', total: 500, priority: 2 },
      ]
    },
    {
      id: 'hsk-4', lang: 'zh', label: 'HSK 4', icon: '🇨🇳',
      description: 'Level menengah-atas Mandarin',
      modules: [
        { id: 'hanzi',    name: 'Hanzi',    total: 150, priority: 1 },
        { id: 'zh-vocab', name: 'Kosakata', total: 500, priority: 2 },
      ]
    },
    {
      id: 'topik-1', lang: 'kr', label: 'TOPIK I', icon: '🇰🇷',
      description: 'Level dasar Korea',
      modules: [
        { id: 'hangul',     name: 'Hangul',   total: 35,  priority: 1 },
        { id: 'kr-vocab',   name: 'Kosakata', total: 155, priority: 2 },
        { id: 'kr-grammar', name: 'Grammar',  total: 27,  priority: 2 },
      ]
    },
    {
      id: 'topik-2', lang: 'kr', label: 'TOPIK II', icon: '🇰🇷',
      description: 'Level menengah-atas Korea',
      modules: [
        { id: 'hangul',     name: 'Hangul',   total: 35,  priority: 1 },
        { id: 'kr-vocab',   name: 'Kosakata', total: 155, priority: 1 },
        { id: 'kr-grammar', name: 'Grammar',  total: 27,  priority: 2 },
      ]
    },
  ];

  // ── Helpers ──────────────────────────────────────────────────
  function dateStr(d) { return d.toISOString().split('T')[0]; }
  function today()    { return dateStr(new Date()); }
  function daysUntil(targetDate) {
    const now = new Date(); now.setHours(0,0,0,0);
    const tgt = new Date(targetDate); tgt.setHours(0,0,0,0);
    return Math.max(0, Math.round((tgt - now) / 86400000));
  }

  function getExam(id)   { return EXAMS.find(e => e.id === id) || null; }
  function getAllExams()  { return EXAMS; }

  // ── Kalkulasi Kuota Harian ───────────────────────────────────
  /**
   * Hitung jumlah item yang perlu dipelajari per hari per modul.
   * @param {string} examId
   * @param {string} targetDate  — ISO date string (YYYY-MM-DD)
   * @param {Object} progress    — hasil Storage.getUser(uid, 'progress', {})
   * @returns {{ totalRemaining, daysLeft, quotaPerDay, breakdown: [...] }}
   */
  function calcSchedule(examId, targetDate, progress) {
    const exam = getExam(examId);
    if (!exam) return null;

    const daysLeft = daysUntil(targetDate);
    const safeDays = Math.max(daysLeft, 1);

    const breakdown = exam.modules.map(mod => {
      const learned = (progress[mod.id] && progress[mod.id].learned)
        ? progress[mod.id].learned.length : 0;
      const remaining = Math.max(0, mod.total - learned);
      // Items per day for this module — distribute by priority weight
      const dailyRaw = remaining / safeDays;
      return {
        id: mod.id,
        name: mod.name,
        total: mod.total,
        learned,
        remaining,
        priority: mod.priority,
        dailyTarget: Math.ceil(dailyRaw),
        pct: mod.total > 0 ? Math.round((learned / mod.total) * 100) : 100,
      };
    });

    const totalRemaining = breakdown.reduce((s, b) => s + b.remaining, 0);
    const quotaPerDay    = breakdown.reduce((s, b) => s + b.dailyTarget, 0);

    return { totalRemaining, daysLeft, safeDays, quotaPerDay, breakdown, exam };
  }

  // ── Hitung To-Do Hari Ini ─────────────────────────────────────
  /**
   * Bandingkan progress aktual vs target kumulatif jadwal.
   * Jika ada hari terlewat, distribusikan sisa ke hari tersisa (catch-up).
   */
  function calcTodayTodo(planner, progress) {
    if (!planner || !planner.examId || !planner.targetDate) return [];

    const exam = getExam(planner.examId);
    if (!exam) return [];

    const daysLeft = daysUntil(planner.targetDate);
    const safeDays = Math.max(daysLeft, 1);

    const startDate = planner.startDate || today();
    const daysPassed = Math.max(0, Math.round(
      (new Date().setHours(0,0,0,0) - new Date(startDate).setHours(0,0,0,0)) / 86400000
    ));

    return exam.modules.map(mod => {
      const learned   = (progress[mod.id] && progress[mod.id].learned)
        ? progress[mod.id].learned.length : 0;
      const remaining = Math.max(0, mod.total - learned);

      // Catch-up: berapa yang seharusnya sudah dipelajari sampai hari ini
      const totalDays = daysPassed + safeDays;
      const idealPerDay   = mod.total / Math.max(totalDays, 1);
      const shouldHaveDone = Math.min(Math.round(idealPerDay * (daysPassed + 1)), mod.total);
      const behindBy      = Math.max(0, shouldHaveDone - learned);

      // Today's target = normal daily + catch-up
      const normalDaily  = Math.ceil(remaining / safeDays);
      const todayTarget  = Math.min(Math.max(normalDaily, normalDaily + behindBy), remaining);

      return {
        id: mod.id,
        name: mod.name,
        learned,
        total: mod.total,
        remaining,
        todayTarget: todayTarget,
        pct: mod.total > 0 ? Math.round((learned / mod.total) * 100) : 100,
        done: remaining === 0,
      };
    }).filter(m => m.remaining > 0);
  }

  // ── Simpan & Baca Planner ────────────────────────────────────
  function savePlanner(userId, data) {
    Storage.setUser(userId, 'planner', data);
  }

  function loadPlanner(userId) {
    return Storage.getUser(userId, 'planner', null);
  }

  function clearPlanner(userId) {
    Storage.setUser(userId, 'planner', null);
  }

  // ── Progress timeline ─────────────────────────────────────────
  /**
   * Hitung data untuk grafik progress vs jadwal ideal (7 hari ke belakang).
   */
  function calcTimeline(planner, progress) {
    if (!planner || !planner.examId) return [];

    const exam     = getExam(planner.examId);
    if (!exam) return [];

    const startDate = new Date(planner.startDate || today());
    const endDate   = new Date(planner.targetDate);
    const totalDays = Math.max(1, Math.round((endDate - startDate) / 86400000));
    const totalItems = exam.modules.reduce((s, m) => s + m.total, 0);

    const days = [];
    const now  = new Date(); now.setHours(0,0,0,0);

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dayNum = Math.max(0, Math.round((d - startDate) / 86400000));
      const idealPct = Math.min(100, Math.round((dayNum / totalDays) * 100));
      days.push({
        label: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'][d.getDay()],
        idealPct,
        isToday: i === 0,
      });
    }

    // Actual progress (hanya bisa tahu untuk hari ini)
    const actualLearned = exam.modules.reduce((s, m) => {
      const learned = (progress[m.id] && progress[m.id].learned)
        ? progress[m.id].learned.length : 0;
      return s + Math.min(learned, m.total);
    }, 0);
    const actualPct = totalItems > 0
      ? Math.round((actualLearned / totalItems) * 100)
      : 0;

    // Mark today with actual
    days[6].actualPct = actualPct;

    return { days, actualPct, totalItems, actualLearned };
  }

  return {
    getAllExams,
    getExam,
    calcSchedule,
    calcTodayTodo,
    calcTimeline,
    savePlanner,
    loadPlanner,
    clearPlanner,
    today,
    daysUntil,
  };
})();

window.StudyPlanner = StudyPlanner;
