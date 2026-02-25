/**
 * Lingora — Vocabulary Builder Module (Fase 24)
 * Mengelola tampilan kalimat kontekstual dan Kalimat Quiz (fill-in-the-blank)
 */
const VocabBuilder = (() => {

  // ── Render "Kalimat Kontekstual" section di dalam vocab card/modal ──────────
  function renderSentences(vocab, lang) {
    if (!vocab.sentences || vocab.sentences.length === 0) return '';

    const sentHtml = vocab.sentences.map((s, i) => {
      const levelBadge = s.level
        ? `<span class="vb-sent-level">${s.level}</span>`
        : '';
      const audioWord = vocab.word;
      const audioBtn = AudioEngine && AudioEngine.isSupported()
        ? `<button class="audio-btn vb-audio-btn" data-speak="${s.original}" data-lang="${lang}" title="Dengar kalimat">🔊</button>`
        : '';
      return `
        <div class="vb-sentence">
          <div class="vb-sent-header">
            <span class="vb-sent-num">${i + 1}</span>
            ${levelBadge}
            ${audioBtn}
          </div>
          <div class="vb-sent-original cjk">${s.original}</div>
          <div class="vb-sent-roman">${s.romanization}</div>
          <div class="vb-sent-trans">${s.translation}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="vb-sentences-wrap">
        <button class="vb-toggle-btn" type="button">
          <span class="vb-toggle-icon">📖</span>
          <span class="vb-toggle-label">Kalimat Kontekstual</span>
          <span class="vb-sent-count">${vocab.sentences.length}</span>
          <span class="vb-chevron">▼</span>
        </button>
        <div class="vb-sentences-body" hidden>
          ${sentHtml}
        </div>
      </div>
    `;
  }

  // ── Init toggle collapse untuk semua .vb-toggle-btn di container ──────────
  function initToggles(container) {
    container.querySelectorAll('.vb-toggle-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const body = btn.nextElementSibling;
        const isOpen = !body.hidden;
        body.hidden = isOpen;
        btn.querySelector('.vb-chevron').textContent = isOpen ? '▼' : '▲';
        btn.classList.toggle('open', !isOpen);
      });
    });

    // Audio buttons
    container.querySelectorAll('.vb-audio-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const text = btn.dataset.speak;
        const lang = btn.dataset.lang;
        if (!text || !AudioEngine || !AudioEngine.isSupported()) return;
        if (lang === 'jp') AudioEngine.speakJP(text);
        else if (lang === 'zh') AudioEngine.speakZH(text);
        else if (lang === 'kr') AudioEngine.speakKR(text);
      });
    });
  }

  // ── Kalimat Quiz (Fill-in-the-blank) ─────────────────────────────────────
  // Ambil semua vocab yang punya sentences untuk dijadikan soal
  function buildQuizItems(vocabArray) {
    const items = [];
    vocabArray.forEach(v => {
      if (!v.sentences || v.sentences.length === 0) return;
      v.sentences.forEach(s => {
        // Tentukan kata kunci yang akan dikosongkan (kata pertama yang muncul di kalimat)
        const keyword = v.word;
        if (!s.original.includes(keyword)) return; // skip jika kata tidak ada dalam kalimat
        items.push({
          vocab: v,
          sentence: s,
          keyword: keyword,
          blanked: s.original.replace(keyword, '___')
        });
      });
    });
    return items;
  }

  // ── Render Quiz Modal ──────────────────────────────────────────────────────
  let quizState = {};

  function startQuiz(container, vocabArray, lang, onDone) {
    const items = buildQuizItems(vocabArray);
    if (items.length === 0) {
      container.innerHTML = '<div class="vb-quiz-empty"><div class="vb-quiz-empty-icon">📖</div><p>Belum ada kalimat kontekstual yang tersedia untuk quiz ini.<br>Belajar lebih banyak kosakata terlebih dahulu!</p></div>';
      return;
    }

    // Shuffle
    const shuffled = items.sort(() => Math.random() - 0.5).slice(0, Math.min(10, items.length));
    quizState = { items: shuffled, idx: 0, score: 0, lang, answered: false };

    renderQuizQuestion(container, onDone);
  }

  function renderQuizQuestion(container, onDone) {
    const { items, idx, score } = quizState;
    if (idx >= items.length) {
      renderQuizResult(container, score, items.length, onDone);
      return;
    }

    const item = items[idx];
    const progress = `${idx + 1} / ${items.length}`;
    quizState.answered = false;

    container.innerHTML = `
      <div class="vb-quiz-wrap">
        <div class="vb-quiz-header">
          <span class="vb-quiz-label">🧩 Kalimat Quiz</span>
          <span class="vb-quiz-prog">${progress}</span>
          <span class="vb-quiz-score">✅ ${score}</span>
        </div>
        <div class="vb-quiz-progress-bar">
          <div class="vb-quiz-progress-fill" style="width:${(idx / items.length * 100)}%"></div>
        </div>
        <div class="vb-quiz-instruction">Lengkapi kalimat berikut dengan kata yang tepat:</div>
        <div class="vb-quiz-sentence cjk">${item.blanked}</div>
        <div class="vb-quiz-roman">${item.sentence.romanization.replace(item.vocab.word, '___').replace(item.vocab.romaji || '', '___')}</div>
        <div class="vb-quiz-trans">${item.sentence.translation}</div>
        <div class="vb-quiz-input-wrap">
          <input type="text" class="vb-quiz-input" id="vb-quiz-input" placeholder="Ketik jawabannya..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
          <button class="vb-quiz-submit" id="vb-quiz-submit">Cek ✓</button>
        </div>
        <div class="vb-quiz-hint" id="vb-quiz-hint"></div>
        <div class="vb-quiz-feedback" id="vb-quiz-feedback" hidden></div>
        <div class="vb-quiz-nav" id="vb-quiz-nav" hidden>
          <button class="vb-quiz-next" id="vb-quiz-next">Lanjut →</button>
        </div>
      </div>
    `;

    const input = container.querySelector('#vb-quiz-input');
    const submitBtn = container.querySelector('#vb-quiz-submit');
    const hintEl = container.querySelector('#vb-quiz-hint');

    // Focus input
    setTimeout(() => input && input.focus(), 100);

    // Hint button
    hintEl.innerHTML = `<button class="vb-quiz-hint-btn" id="vb-hint-btn">💡 Tampilkan petunjuk</button>`;
    container.querySelector('#vb-hint-btn').addEventListener('click', () => {
      const word = item.keyword;
      const hint = word.length <= 2 ? word[0] + '?' : word[0] + '_'.repeat(word.length - 2) + word[word.length - 1];
      hintEl.innerHTML = `<span class="vb-hint-text">Petunjuk: <strong>${hint}</strong> (${word.length} karakter)</span>`;
    });

    function checkAnswer() {
      if (quizState.answered) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;

      quizState.answered = true;
      submitBtn.disabled = true;
      input.disabled = true;

      const correct = userAnswer === item.keyword;
      // Also allow romaji answer
      const romajiCorrect = item.vocab.romaji && userAnswer.toLowerCase() === item.vocab.romaji.toLowerCase();
      const romajiKrCorrect = item.vocab.romanization && userAnswer.toLowerCase() === item.vocab.romanization.toLowerCase();
      const isCorrect = correct || romajiCorrect || romajiKrCorrect;

      const feedbackEl = container.querySelector('#vb-quiz-feedback');
      feedbackEl.hidden = false;

      if (isCorrect) {
        quizState.score++;
        feedbackEl.className = 'vb-quiz-feedback correct';
        feedbackEl.innerHTML = `<span class="vb-feedback-icon">✅</span> <strong>Benar!</strong> Jawabannya: <span class="vb-answer cjk">${item.keyword}</span>`;
        input.classList.add('correct');
      } else {
        feedbackEl.className = 'vb-quiz-feedback wrong';
        feedbackEl.innerHTML = `<span class="vb-feedback-icon">❌</span> <strong>Salah.</strong> Jawaban yang benar: <span class="vb-answer cjk">${item.keyword}</span>`;
        input.classList.add('wrong');
      }

      // Show full sentence
      feedbackEl.innerHTML += `<div class="vb-feedback-full cjk">${item.sentence.original}</div><div class="vb-feedback-trans">${item.sentence.translation}</div>`;

      container.querySelector('#vb-quiz-nav').hidden = false;
      container.querySelector('#vb-quiz-next').focus();
    }

    submitBtn.addEventListener('click', checkAnswer);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') checkAnswer();
    });

    container.querySelector('#vb-quiz-next').addEventListener('click', () => {
      quizState.idx++;
      renderQuizQuestion(container, onDone);
    });
  }

  function renderQuizResult(container, score, total, onDone) {
    const pct = Math.round(score / total * 100);
    let emoji = '😅';
    if (pct >= 90) emoji = '🏆';
    else if (pct >= 70) emoji = '🎉';
    else if (pct >= 50) emoji = '👍';

    container.innerHTML = `
      <div class="vb-quiz-result">
        <div class="vb-result-emoji">${emoji}</div>
        <div class="vb-result-title">Quiz Selesai!</div>
        <div class="vb-result-score">${score} / ${total}</div>
        <div class="vb-result-pct">${pct}%</div>
        <div class="vb-result-msg">${
          pct >= 90 ? 'Luar biasa! Kamu menguasai kalimat kontekstual dengan sangat baik.' :
          pct >= 70 ? 'Bagus! Terus latihan untuk menguasai lebih banyak kalimat.' :
          pct >= 50 ? 'Tidak apa-apa! Baca lagi contoh kalimat dan coba lagi.' :
          'Jangan menyerah! Pelajari kosakata dan contoh kalimat lebih banyak dulu.'
        }</div>
        <div class="vb-result-actions">
          <button class="vb-result-retry btn-accent">🔁 Coba Lagi</button>
          ${onDone ? '<button class="vb-result-done btn-outline">✓ Selesai</button>' : ''}
        </div>
      </div>
    `;

    container.querySelector('.vb-result-retry').addEventListener('click', () => {
      startQuiz(container, quizState._vocabArray, quizState.lang, onDone);
    });

    if (onDone) {
      container.querySelector('.vb-result-done').addEventListener('click', () => onDone(score, total));
    }
  }

  // Public API
  return {
    renderSentences,
    initToggles,
    startQuiz,
    buildQuizItems
  };

})();

window.VocabBuilder = VocabBuilder;
