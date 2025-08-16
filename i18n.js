(function() {
  const STORAGE_LANG = 'lang';
  const STORAGE_GEO_PROMPTED = 'geoPrompted';
  const STORAGE_SUGGEST_DISMISSED = 'langSuggestDismissed';

  const defaultLang = 'en';
  const translations = window.translations || {};
  const supported = Object.keys(translations);

  // Elements
  const geoConsentEl = document.getElementById('geoConsent');
  const geoAcceptBtn = document.getElementById('geoAccept');
  const geoDeclineBtn = document.getElementById('geoDecline');
  const langSuggestionEl = document.getElementById('langSuggestion');
  const langSuggestionText = document.getElementById('langSuggestionText');
  const suggestApplyBtn = document.getElementById('suggestApply');
  const suggestKeepBtn = document.getElementById('suggestKeep');

  function getSavedLang() {
    try {
      const l = localStorage.getItem(STORAGE_LANG);
      return (l && supported.includes(l)) ? l : null;
    } catch(e) { return null; }
  }

  function setSavedLang(l) {
    try { localStorage.setItem(STORAGE_LANG, l); } catch(e){}
  }

  function updateMeta(metaKey, content) {
    if (!content) return;
    if (metaKey === 'description') {
      let el = document.getElementById('metaDescription');
      if (!el) {
        el = document.createElement('meta');
        el.name = 'description';
        el.id = 'metaDescription';
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    }
  }

  function applyLang(lang) {
    const active = translations[lang] ? lang : defaultLang;
    document.documentElement.lang = active;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = translations[active] && translations[active][key];
      if (val) {
        el.textContent = val;
      } else if (translations[defaultLang] && translations[defaultLang][key]) {
        el.textContent = translations[defaultLang][key];
      }
    });

    // Title / meta
    const pageTitle = translations[active]?.title || translations[defaultLang]?.title;
    if (pageTitle) {
      document.title = pageTitle.replace(/<[^>]*>/g,'');
      const titleEl = document.getElementById('languageTitle');
      if (titleEl) titleEl.textContent = pageTitle.replace(/<[^>]*>/g,'');
    }
    const metaDesc = translations[active]?.meta_description || translations[defaultLang]?.meta_description;
    updateMeta('description', metaDesc);

    // Update aria-pressed on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === active));
    });
  }

  function switchLang(lang) {
    if (!supported.includes(lang)) return;
    applyLang(lang);
    setSavedLang(lang);
  }

  // Event delegation for language buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    const lang = btn.dataset.lang;
    if (lang) switchLang(lang);
  });

  // Initialize
  const initial = getSavedLang() || defaultLang;
  applyLang(initial);

  // GEO CONSENT
  const alreadyPrompted = localStorage.getItem(STORAGE_GEO_PROMPTED) === '1';
  if (!alreadyPrompted && geoConsentEl) {
    geoConsentEl.hidden = false;
  }

  geoAcceptBtn?.addEventListener('click', () => {
    localStorage.setItem(STORAGE_GEO_PROMPTED, '1');
    if (geoConsentEl) geoConsentEl.hidden = true;
    attemptCountryLookup();
  });

  geoDeclineBtn?.addEventListener('click', () => {
    localStorage.setItem(STORAGE_GEO_PROMPTED, '1');
    if (geoConsentEl) geoConsentEl.hidden = true;
  });

  // Country → language candidates
  const countryToLangCandidates = {
    DE: ['de'],
    AT: ['de'],
    CH: ['de','fr','it'],
    FR: ['fr'],
    ES: ['es'],
    MX: ['es'],
    US: ['en'],
    GB: ['en'],
    IT: ['it'],
    PT: ['pt'],
    BR: ['pt']
  };

  function attemptCountryLookup() {
    if (localStorage.getItem(STORAGE_SUGGEST_DISMISSED) === '1') return;
    // Use ipwho.is (free) – replace with your backend for better privacy if needed
    fetch('https://ipwho.is/?fields=country_code')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (!data?.country_code) return;
        const cc = data.country_code.toUpperCase();
        const candidates = countryToLangCandidates[cc];
        if (!candidates) return;
        const current = getSavedLang() || defaultLang;
        const proposal = candidates.find(c => supported.includes(c) && c !== current);
        if (!proposal) return;
        showLangSuggestion(proposal, current);
      })
      .catch(()=>{ /* silent */ });
  }

  function showLangSuggestion(proposed, current) {
    if (!langSuggestionEl || !langSuggestionText) return;
    const tr = translations;
    const phraseTemplate = tr[current]?.lang_suggestion || tr[defaultLang]?.lang_suggestion || 'We detected a language that might suit you: {lang}';
    langSuggestionText.textContent = phraseTemplate.replace('{lang}', proposed.toUpperCase());
    langSuggestionEl.dataset.proposed = proposed;
    langSuggestionEl.hidden = false;
  }

  suggestApplyBtn?.addEventListener('click', () => {
    const proposed = langSuggestionEl?.dataset.proposed;
    if (proposed && supported.includes(proposed)) {
      switchLang(proposed);
    }
    if (langSuggestionEl) langSuggestionEl.hidden = true;
    localStorage.setItem(STORAGE_SUGGEST_DISMISSED, '1');
  });

  suggestKeepBtn?.addEventListener('click', () => {
    if (langSuggestionEl) langSuggestionEl.hidden = true;
    localStorage.setItem(STORAGE_SUGGEST_DISMISSED, '1');
  });
})();
