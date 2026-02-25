/**
 * Lingora - Statistics Page (Fase 7)
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!Router.guard()) return;

  const user = Auth.getActiveUser();
  App.init('stats');

  const MODULES = [
    { id: 'hiragana', char: 'あ', name: 'Hiragana',     total: 104 },
    { id: 'katakana', char: 'ア', name: 'Katakana',     total: 104 },
    { id: 'kanji',    char: '漢', name: 'Kanji',         total: 153 },
    { id: 'pinyin',   char: '拼', name: 'Pinyin',        total: 59  },
    { id: 'hanzi',    char: '汉', name: 'Hanzi',         total: 208 },
    { id: 'zh-vocab', char: '词', name: 'Kosakata ZH',  total: 600 },
  ];

  // ── Summary stats ─────────────────────────────────────────
  const stats   = Storage.getUser(user.id, 'stats', { totalLearned: 0, quizCompleted: 0, totalCorrect: 0, totalQuestions: 0 });
  const streak  = Storage.getUser(user.id, 'streak', { count: 0, best: 0 });

  document.getElementById('s-total').textContent    = stats.totalLearned || 0;
  document.getElementById('s-streak').textContent   = streak.best || streak.count || 0;
  document.getElementById('s-quiz').textContent     = stats.quizCompleted || 0;
  document.getElementById('s-accuracy').textContent =
    stats.totalQuestions > 0
      ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) + '%'
      : '-';

  // ── Module progress ───────────────────────────────────────
  const progress = Storage.getUser(user.id, 'progress', {});
  const listEl   = document.getElementById('module-progress-list');

  if (listEl) {
    listEl.innerHTML = MODULES.map(mod => {
      const learned = progress[mod.id]?.learned?.length || 0;
      const pct     = Math.min(Math.round((learned / mod.total) * 100), 100);
      return `
        <div class="module-progress-item">
          <div class="module-progress-char">${mod.char}</div>
          <div class="module-progress-info">
            <div class="module-progress-name">${mod.name} <span style="color:var(--text-3);font-weight:400;font-size:0.75rem;">${learned}/${mod.total}</span></div>
            <div class="module-progress-bar-row">
              <div class="module-progress-bar">
                <div class="module-progress-fill" data-pct="${pct}"></div>
              </div>
              <span class="module-progress-pct">${pct}%</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Animate progress bars after paint
    requestAnimationFrame(() => {
      listEl.querySelectorAll('.module-progress-fill').forEach(el => {
        el.style.width = el.dataset.pct + '%';
      });
    });
  }

  // ── Quiz history ──────────────────────────────────────────
  const historyEl = document.getElementById('quiz-history-list');
  const allScores = [];

  Object.entries(progress).forEach(([moduleId, data]) => {
    if (data.quiz_scores) {
      data.quiz_scores.forEach(entry => {
        allScores.push({ moduleId, ...entry });
      });
    }
  });

  // Sort by date desc, take last 10
  allScores.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const recent = allScores.slice(0, 10);

  if (historyEl) {
    if (recent.length === 0) {
      historyEl.innerHTML = '<div class="empty-state">Belum ada riwayat quiz.</div>';
    } else {
      const moduleNames = {
        hiragana: 'Hiragana', katakana: 'Katakana', kanji: 'Kanji',
        hanzi: 'Hanzi', 'zh-vocab': 'Kosakata ZH',
        'quiz-jp-hiragana': 'Quiz Hiragana', 'quiz-jp-katakana': 'Quiz Katakana',
        'quiz-jp-kanji': 'Quiz Kanji', 'quiz-zh-hanzi': 'Quiz Hanzi',
        'quiz-zh-vocab': 'Quiz Kosakata ZH', 'quiz-zh-pinyin': 'Quiz Pinyin',
      };
      historyEl.innerHTML = recent.map(s => {
        const acc = Math.round((s.score / s.total) * 100);
        const isPerfect = s.score === s.total;
        const name = moduleNames[s.moduleId] || s.moduleId;
        return `
          <div class="quiz-history-item">
            <div class="quiz-history-score${isPerfect ? ' perfect' : ''}">${s.score}/${s.total}</div>
            <div class="quiz-history-info">
              <div class="quiz-history-module">${name}</div>
              <div class="quiz-history-meta">${s.date || '-'}</div>
            </div>
            <div class="quiz-history-acc">${acc}%</div>
          </div>
        `;
      }).join('');

      // Average accuracy label
      const avgAcc = recent.length > 0
        ? Math.round(recent.reduce((s, e) => s + (e.score / e.total * 100), 0) / recent.length)
        : 0;
      const lbl = document.getElementById('quiz-avg-label');
      if (lbl) lbl.textContent = `Rata-rata: ${avgAcc}%`;
    }
  }

  // ── Badge stats ───────────────────────────────────────────
  const badgeGridEl = document.getElementById('badge-stats-grid');
  const badgeCountEl = document.getElementById('badge-count-label');

  // Inline badge defs (copy from quiz.js)
  const ALL_BADGES = [
    { id:'first_quiz',       name:'Pemula Berani',      icon:'🎯' },
    { id:'quiz_10',          name:'Rajin Berlatih',     icon:'📝' },
    { id:'quiz_perfect',     name:'Nilai Sempurna',     icon:'💯' },
    { id:'learned_10',       name:'Karakter Pertama',   icon:'✨' },
    { id:'learned_50',       name:'Pelajar Serius',     icon:'📚' },
    { id:'learned_100',      name:'Setengah Jalan',     icon:'🏅' },
    { id:'learned_200',      name:'Hampir Master',      icon:'🌟' },
    { id:'streak_3',         name:'3 Hari Berturut',    icon:'🔥' },
    { id:'streak_7',         name:'Seminggu Penuh',     icon:'🔥' },
    { id:'streak_30',        name:'Master Dedikasi',    icon:'👑' },
    { id:'accuracy_80',      name:'Akurat',             icon:'🎯' },
    { id:'perfect_streak',   name:'Streak Sempurna',    icon:'⭐' },
  ];

  const earnedBadges = Storage.getUser(user.id, 'badges', {});
  const earnedCount  = Object.keys(earnedBadges).length;

  if (badgeCountEl) badgeCountEl.textContent = `${earnedCount} / ${ALL_BADGES.length}`;

  if (badgeGridEl) {
    badgeGridEl.innerHTML = ALL_BADGES.map(b => {
      const isEarned = !!earnedBadges[b.id];
      const earnedDate = isEarned
        ? new Date(earnedBadges[b.id].earnedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        : '';
      return `
        <div class="badge-stat-item${isEarned ? ' earned' : ''}" title="${b.name}${earnedDate ? '\nDiraih: ' + earnedDate : ''}">
          <div class="badge-stat-icon">${b.icon}</div>
          <div class="badge-stat-name">${b.name}</div>
        </div>
      `;
    }).join('');
  }

  // ── Heatmap (28 days) ─────────────────────────────────────
  const heatmapGrid = document.getElementById('heatmap-grid');
  const heatmapLabel = document.getElementById('heatmap-total-label');
  const activity = Storage.getUser(user.id, 'activity', {});
  const now = new Date();
  let totalActivity = 0;

  if (heatmapGrid) {
    const cells = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const k = d.toISOString().split('T')[0];
      const c = activity[k] || 0;
      totalActivity += c;
      cells.push({ k, c, isToday: i === 0, date: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) });
    }

    const maxActivity = Math.max(...cells.map(c => c.c), 1);

    heatmapGrid.innerHTML = cells.map(cell => {
      let level = 0;
      if (cell.c > 0)                        level = 1;
      if (cell.c >= maxActivity * 0.25)      level = 2;
      if (cell.c >= maxActivity * 0.5)       level = 3;
      if (cell.c >= maxActivity * 0.75)      level = 4;
      return `<div class="heatmap-cell level-${level}" title="${cell.date}: ${cell.c} sesi"></div>`;
    }).join('');

    if (heatmapLabel) heatmapLabel.textContent = `${totalActivity} sesi dalam 28 hari`;
  }

  // ── Favorit Summary ───────────────────────────────────────
  const FAV_MODULES = [
    { id: 'hiragana', icon: 'あ',  name: 'Hiragana' },
    { id: 'katakana', icon: 'ア',  name: 'Katakana' },
    { id: 'kanji',    icon: '漢',  name: 'Kanji' },
    { id: 'jp-vocab', icon: '語',  name: 'Kosakata JP' },
    { id: 'hanzi',    icon: '汉',  name: 'Hanzi' },
    { id: 'zh-vocab', icon: '词',  name: 'Kosakata ZH' },
  ];

  const favStatsEl = document.getElementById('fav-stats-grid');
  if (favStatsEl) {
    const favData = Progress.getFavoritesAll();
    let totalFavs = 0;
    FAV_MODULES.forEach(m => {
      const count = favData[m.id] ? favData[m.id].length : 0;
      totalFavs += count;
    });

    document.getElementById('fav-total').textContent = totalFavs;

    favStatsEl.innerHTML = FAV_MODULES.map(m => {
      const count = favData[m.id] ? favData[m.id].length : 0;
      return `
        <div class="fav-stat-card">
          <div class="fav-stat-icon">${m.icon}</div>
          <div class="fav-stat-info">
            <div class="fav-stat-name">${m.name}</div>
            <div class="fav-stat-count">${count}</div>
            <div class="fav-stat-label">favorit</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ── XP & Level (Fase 14) ──────────────────────────────────
  if (typeof XPSystem !== 'undefined') {
    const totalXP = XPSystem.getTotalXP();
    const info    = XPSystem.getLevelInfo(totalXP);
    const { current, next, pct, xpInLevel, xpNeeded } = info;

    const xpTotalBadge = document.getElementById('stats-xp-total');
    if (xpTotalBadge) xpTotalBadge.textContent = totalXP + ' XP Total';

    const xpProgressEl = document.getElementById('stats-xp-progress');
    if (xpProgressEl) {
      xpProgressEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
          <div style="width:48px;height:48px;border-radius:50%;background:${current.color};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.1rem;flex-shrink:0;">Lv.${current.level}</div>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span style="font-weight:700;color:var(--text);">${current.name} ${current.nameID}</span>
              <span style="font-size:0.8rem;color:var(--text-3);">${next ? xpInLevel + ' / ' + xpNeeded + ' XP' : 'MAX LEVEL'}</span>
            </div>
            <div style="height:10px;background:var(--border);border-radius:99px;overflow:hidden;">
              <div style="height:100%;width:${pct}%;background:${current.color};border-radius:99px;transition:width 0.6s;"></div>
            </div>
            ${next ? `<div style="font-size:0.75rem;color:var(--text-3);margin-top:4px;">Level ${next.level}: ${next.name} ${next.nameID} — perlu ${next.xpRequired - totalXP} XP lagi</div>` : '<div style="font-size:0.75rem;color:var(--gold-dark);margin-top:4px;">🏆 Kamu sudah mencapai level tertinggi!</div>'}
          </div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
          ${XPSystem.getAllLevels().map(lvl => {
            const isPassed = totalXP >= lvl.xpRequired;
            return `<div style="padding:4px 10px;border-radius:99px;font-size:0.72rem;font-weight:600;background:${isPassed ? lvl.color : 'var(--border)'};color:${isPassed ? '#fff' : 'var(--text-3)'};">${lvl.name} ${lvl.nameID}</div>`;
          }).join('')}
        </div>
      `;
    }

    const xpHistoryEl = document.getElementById('stats-xp-history');
    if (xpHistoryEl) {
      const history = XPSystem.getHistory().slice().reverse().slice(0, 15);
      if (history.length === 0) {
        xpHistoryEl.innerHTML = '<div style="font-size:0.85rem;color:var(--text-3);text-align:center;padding:16px;">Belum ada riwayat XP. Mulai belajar!</div>';
      } else {
        const actionIcons = {
          learn_item:    '📖',
          quiz_complete: '✅',
          quiz_perfect:  '🔥',
          streak_day:    '⚡',
          badge_unlock:  '🏅',
          srs_session:   '🔁',
          first_module:  '🆕',
        };
        xpHistoryEl.innerHTML = `
          <div style="font-size:0.82rem;font-weight:600;color:var(--text-2);margin-bottom:8px;">Riwayat XP (${history.length} terbaru)</div>
          <div style="display:flex;flex-direction:column;gap:5px;">
            ${history.map(e => {
              const icon = actionIcons[e.action] || '⚡';
              const d = new Date(e.date);
              const dateStr = d.toLocaleDateString('id-ID', { day:'numeric', month:'short' }) + ' ' + d.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
              return `<div style="display:flex;align-items:center;gap:10px;padding:7px 12px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);font-size:0.8rem;">
                <span>${icon}</span>
                <span style="flex:1;color:var(--text);font-weight:500;">${e.label}</span>
                <span style="color:var(--text-3);font-size:0.72rem;">${dateStr}</span>
                <span style="color:#8e44ad;font-weight:700;min-width:44px;text-align:right;">+${e.amount} XP</span>
              </div>`;
            }).join('')}
          </div>
        `;
      }
    }
  }

  // ── Challenge History (Fase 15) ──────────────────────────
  if (typeof ChallengeSystem !== 'undefined') {
    const summary = ChallengeSystem.getSummary();
    const histEl  = document.getElementById('challenge-history-list');
    const badgeEl = document.getElementById('challenge-history-badge');

    if (badgeEl) {
      badgeEl.textContent = summary.totalCompleted + ' Selesai • ' + summary.totalXPEarned + ' XP';
    }

    if (histEl) {
      const history = ChallengeSystem.getHistory().slice().reverse().slice(0, 20);
      if (history.length === 0) {
        histEl.innerHTML = '<div style="font-size:0.85rem;color:var(--text-3);padding:12px 0;">Belum ada challenge yang diselesaikan. Kunjungi Dashboard untuk melihat tantangan hari ini!</div>';
      } else {
        histEl.innerHTML = history.map(h => {
          return `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);font-size:0.82rem;margin-bottom:6px;">
              <span style="font-size:1.3rem;">${h.icon || '🏆'}</span>
              <div style="flex:1;">
                <div style="font-weight:600;color:var(--text);">${h.title}</div>
                <div style="color:var(--text-3);font-size:0.74rem;">${h.date}</div>
              </div>
              <span style="font-weight:700;color:#e67e22;">+${h.xp} XP</span>
            </div>
          `;
        }).join('');
      }
    }
  }
});
