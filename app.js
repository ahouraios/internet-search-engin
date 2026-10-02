(() => {
  'use strict';

  const WIKI_API = 'https://{lang}.wikipedia.org/w/api.php';
  const POPULAR_QUERIES = [
    'هوش مصنوعی',
    'هوش مصنوعی به زبان ساده',
    'ایران و طبیعت‌گردی',
    'تغذیه سالم',
    'چطور خواب بهتری داشته باشیم',
    'انرژی خورشیدی',
    'شهرهای سبز آینده',
    'اقیانوس‌ها و حیات دریایی',
    'تاریخ معماری ایرانی'
  ];

  const LOCAL_INDEX = [
    {
      title: 'هوش مصنوعی',
      description: 'هوش مصنوعی شاخه‌ای از علوم رایانه است که به ساخت سامانه‌هایی برای انجام وظایفی می‌پردازد که معمولاً به توانایی‌های شناختی انسان نیاز دارند؛ مانند یادگیری، تشخیص الگو و درک زبان.',
      tags: ['فناوری', 'یادگیری ماشین', 'هوش', 'داده'],
      url: 'https://fa.wikipedia.org/wiki/هوش_مصنوعی',
      domain: 'fa.wikipedia.org'
    },
    {
      title: 'ایران',
      description: 'ایران کشوری در غرب آسیاست که با تاریخ، زبان‌ها و چشم‌اندازهای گوناگون شناخته می‌شود. رشته‌کوه‌ها، جنگل‌ها، دشت‌ها و سواحل، تنوع طبیعی چشمگیری به این سرزمین داده‌اند.',
      tags: ['سفر', 'جغرافیا', 'طبیعت', 'تاریخ'],
      url: 'https://fa.wikipedia.org/wiki/ایران',
      domain: 'fa.wikipedia.org'
    },
    {
      title: 'دماوند',
      description: 'دماوند آتشفشانی خفته و بلندترین کوه ایران است. این قله در رشته‌کوه البرز و در شمال ایران قرار دارد و یکی از نمادهای طبیعی و فرهنگی کشور به‌شمار می‌آید.',
      tags: ['کوه', 'طبیعت‌گردی', 'سفر', 'ایران'],
      url: 'https://fa.wikipedia.org/wiki/دماوند',
      domain: 'fa.wikipedia.org'
    },
    {
      title: 'انرژی خورشیدی',
      description: 'انرژی خورشیدی از تابش خورشید به دست می‌آید و می‌توان آن را به کمک پنل‌های فتوولتائیک به برق تبدیل کرد یا برای گرمایش به کار برد. این منبع، تجدیدپذیر و در دسترس است.',
      tags: ['فناوری', 'محیط زیست', 'انرژی', 'آینده'],
      url: 'https://fa.wikipedia.org/wiki/انرژی_خورشیدی',
      domain: 'fa.wikipedia.org'
    },
    {
      title: 'اقیانوس',
      description: 'اقیانوس پهنه‌ای بسیار بزرگ از آب شور است که بخش عمده‌ای از سطح زمین را می‌پوشاند. اقیانوس‌ها در تنظیم آب‌وهوا نقش دارند و زیستگاه گونه‌های فراوانی هستند.',
      tags: ['طبیعت', 'دریا', 'محیط زیست', 'جانوران'],
      url: 'https://fa.wikipedia.org/wiki/اقیانوس',
      domain: 'fa.wikipedia.org'
    },
    {
      title: 'خواب',
      description: 'خواب حالتی طبیعی و دوره‌ای از استراحت بدن و ذهن است. برنامهٔ منظم خواب و محیط آرام می‌توانند به کیفیت استراحت کمک کنند؛ نیاز افراد به خواب با سن و شرایط زندگی تفاوت دارد.',
      tags: ['سلامت', 'سبک زندگی', 'تغذیه', 'زندگی'],
      url: 'https://fa.wikipedia.org/wiki/خواب',
      domain: 'fa.wikipedia.org'
    },
    {
      title: 'یزد',
      description: 'یزد شهری تاریخی در مرکز ایران است که با معماری خشتی، بادگیرها و سازگاری دیرینه با آب‌وهوای گرم و خشک شناخته می‌شود. بافت تاریخی آن در فهرست میراث جهانی یونسکو ثبت شده است.',
      tags: ['سفر', 'معماری', 'تاریخ', 'ایران'],
      url: 'https://fa.wikipedia.org/wiki/یزد',
      domain: 'fa.wikipedia.org'
    },
    {
      title: 'تغییر اقلیم',
      description: 'تغییر اقلیم به دگرگونی‌های بلندمدت در الگوهای آب‌وهوایی گفته می‌شود. فعالیت‌های انسانی، به‌ویژه انتشار گازهای گلخانه‌ای، از عوامل مهم گرمایش جهانی در دوران معاصر هستند.',
      tags: ['محیط زیست', 'آب‌وهوا', 'طبیعت', 'آینده'],
      url: 'https://fa.wikipedia.org/wiki/تغییر_اقلیم',
      domain: 'fa.wikipedia.org'
    },
    {
      title: 'معماری ایرانی',
      description: 'معماری ایرانی در دوره‌های گوناگون با ویژگی‌هایی چون حیاط مرکزی، باغ، ایوان، گنبد و توجه به اقلیم شکل گرفته است. مصالح بومی و نور طبیعی در بسیاری از نمونه‌های آن نقش مهمی دارند.',
      tags: ['معماری', 'ایران', 'تاریخ', 'هنر'],
      url: 'https://fa.wikipedia.org/wiki/معماری_ایرانی',
      domain: 'fa.wikipedia.org'
    },
    {
      title: 'تغذیه',
      description: 'تغذیه فرایندی است که بدن از راه آن مواد لازم را برای رشد و فعالیت دریافت می‌کند. نیازهای غذایی هر فرد متفاوت است و به عواملی مانند سن، وضعیت سلامت و میزان فعالیت بستگی دارد.',
      tags: ['سلامت', 'غذا', 'سبک زندگی', 'زندگی'],
      url: 'https://fa.wikipedia.org/wiki/تغذیه',
      domain: 'fa.wikipedia.org'
    },
    {
      title: 'شهر پایدار',
      description: 'شهر پایدار می‌کوشد کیفیت زندگی ساکنان را با استفادهٔ سنجیده از منابع، حمل‌ونقل کارآمد، دسترسی به فضای سبز و کاهش آلودگی بهبود دهد.',
      tags: ['شهر', 'آینده', 'محیط زیست', 'معماری'],
      url: 'https://fa.wikipedia.org/wiki/شهر_پایدار',
      domain: 'fa.wikipedia.org'
    }
  ];

  const homeView = document.getElementById('homeView');
  const resultsView = document.getElementById('resultsView');
  const resultList = document.getElementById('resultList');
  const resultsTitle = document.getElementById('resultsTitle');
  const resultsDescription = document.getElementById('resultsDescription');
  const knowledgePanel = document.getElementById('knowledgePanel');
  const resultFooterNote = document.getElementById('resultFooterNote');
  const relatedSearches = document.getElementById('relatedSearches');
  const toastElement = document.getElementById('toast');

  let activeQuery = '';
  let activeTab = 'web';
  let activeResults = [];
  let resultOrigin = 'wikipedia';
  let activeController = null;
  let searchSequence = 0;
  let toastTimer = null;

  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);

  const normalizeText = (value) => String(value ?? '')
    .toLocaleLowerCase('fa-IR')
    .replace(/[\u064A\u0649]/g, 'ی')
    .replace(/\u0643/g, 'ک')
    .replace(/[\u200c\u200e\u200f]/g, ' ')
    .replace(/[\u064b-\u065f\u0670]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

  const tokensFor = (value) => normalizeText(value)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !['برای', 'این', 'آن', 'به', 'از', 'در', 'را', 'با', 'چطور', 'چیست', 'های'].includes(token));

  function safeHttpUrl(value) {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '#';
    } catch (_error) {
      return '#';
    }
  }

  function makeExternalUrl(target, query) {
    const queryValue = query.trim();
    const encoded = encodeURIComponent(queryValue);
    const urlMap = {
      web: `https://www.google.com/search?q=${encoded}`,
      images: `https://www.google.com/search?tbm=isch&q=${encoded}`,
      videos: `https://www.youtube.com/results?search_query=${encoded}`,
      news: `https://news.google.com/search?q=${encoded}`,
      maps: `https://www.google.com/maps/search/${encoded}`
    };
    return urlMap[target] || urlMap.web;
  }

  function searchLocalIndex(query) {
    const tokens = tokensFor(query);
    if (!tokens.length) return [];

    return LOCAL_INDEX.map((item) => {
      const title = normalizeText(item.title);
      const details = normalizeText(`${item.description} ${item.tags.join(' ')}`);
      let score = 0;
      for (const token of tokens) {
        if (title.includes(token)) score += title === token ? 9 : 5;
        if (item.tags.some((tag) => normalizeText(tag).includes(token))) score += 3;
        else if (details.includes(token)) score += 1;
      }
      const fullQuery = normalizeText(query);
      if (fullQuery && title.includes(fullQuery)) score += 8;
      return { item, score };
    })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ item }) => ({ ...item, source: 'ویکی‌پدیا', excerpt: item.description }));
  }

  async function searchWikipedia(query, signal) {
    const language = /[\u0600-\u06FF]/.test(query) ? 'fa' : 'en';
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: query,
      gsrnamespace: '0',
      gsrlimit: '8',
      prop: 'extracts|pageimages|info',
      exintro: '1',
      explaintext: '1',
      exchars: '430',
      pithumbsize: '420',
      inprop: 'url',
      format: 'json',
      origin: '*'
    });

    const url = WIKI_API.replace('{lang}', language) + `?${params.toString()}`;
    const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Search request failed: ${response.status}`);
    const payload = await response.json();
    const pages = Object.values(payload?.query?.pages || {})
      .sort((a, b) => (a.index ?? 999) - (b.index ?? 999));

    return pages
      .filter((page) => page.title)
      .map((page) => ({
        title: page.title,
        description: page.extract || `اطلاعات بیشتری دربارهٔ ${page.title} در این صفحه بخوانید.`,
        excerpt: page.extract || '',
        url: page.fullurl || `https://${language}.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
        domain: `${language}.wikipedia.org`,
        thumb: page.thumbnail?.source || '',
        source: 'ویکی‌پدیا'
      }));
  }

  function showToast(message) {
    toastElement.textContent = message;
    toastElement.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toastElement.classList.remove('show'), 2800);
  }

  function setView(view) {
    const showResults = view === 'results';
    homeView.hidden = showResults;
    resultsView.hidden = !showResults;
    if (!showResults) {
      searchSequence += 1;
      document.title = 'پیدا — جست‌وجوی وب، ساده‌تر';
      if (activeController) activeController.abort();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function renderSkeletons() {
    resultList.setAttribute('aria-busy', 'true');
    resultList.innerHTML = Array.from({ length: 4 }, () => `
      <div class="skeleton-card" aria-hidden="true">
        <div class="skeleton skeleton-domain"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-line"></div>
        <div class="skeleton skeleton-line short"></div>
      </div>
    `).join('');
    knowledgePanel.innerHTML = `
      <div class="knowledge-empty">
        <span class="empty-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.4"/><path d="m15.5 15.5 4 4"/></svg></span>
        <h2>یک لحظه صبر کن...</h2>
        <p>داریم موضوع‌های مرتبط را پیدا می‌کنیم.</p>
      </div>
    `;
    resultFooterNote.hidden = true;
    relatedSearches.hidden = true;
  }

  function updateTabButtons() {
    document.querySelectorAll('.result-tab').forEach((button) => {
      const isActive = button.dataset.tab === activeTab;
      button.classList.toggle('active', isActive);
      if (isActive) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }

  function performSearch(rawQuery) {
    const query = String(rawQuery || '').trim();
    if (!query) {
      showToast('اول چیزی که دنبالش هستی را بنویس.');
      (resultsView.hidden ? document.getElementById('homeInput') : document.getElementById('resultsInput')).focus();
      return;
    }

    activeQuery = query;
    activeResults = [];
    resultOrigin = 'wikipedia';
    activeTab = 'web';
    searchSequence += 1;
    const thisSearch = searchSequence;

    if (activeController) activeController.abort();
    const controller = new AbortController();
    activeController = controller;
    let timedOut = false;
    const timer = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 7800);

    document.getElementById('homeInput').value = query;
    document.getElementById('resultsInput').value = query;
    document.querySelectorAll('.clear-search').forEach((button) => { button.hidden = false; });
    document.querySelectorAll('.suggestions').forEach((list) => { list.hidden = true; list.innerHTML = ''; });
    document.querySelectorAll('[aria-autocomplete="list"]').forEach((input) => input.setAttribute('aria-expanded', 'false'));

    setView('results');
    resultsTitle.textContent = `نتایج برای «${query}»`;
    resultsDescription.textContent = 'در حال پیدا کردن نتیجه‌های مرتبط...';
    document.title = `نتایج «${query}» — پیدا`;
    updateTabButtons();
    renderSkeletons();

    (async () => {
      let wikiResults = [];
      try {
        wikiResults = await searchWikipedia(query, controller.signal);
      } catch (error) {
        if (thisSearch !== searchSequence) return;
        if (error?.name === 'AbortError' && !timedOut) return;
      } finally {
        window.clearTimeout(timer);
      }

      if (thisSearch !== searchSequence) return;
      if (wikiResults.length) {
        activeResults = wikiResults;
        resultOrigin = 'wikipedia';
      } else {
        activeResults = searchLocalIndex(query);
        resultOrigin = activeResults.length ? 'local' : 'none';
      }
      renderActiveTab();
    })();
  }

  function createResultCard(item, index) {
    const title = escapeHTML(item.title);
    const description = escapeHTML((item.description || '').replace(/\s+/g, ' ').trim());
    const url = safeHttpUrl(item.url);
    const domain = escapeHTML(item.domain || (url !== '#' ? new URL(url).hostname : 'web'));
    const thumbnail = safeHttpUrl(item.thumb || '');
    const source = escapeHTML(item.source || 'وب');
    const imageMarkup = thumbnail !== '#'
      ? `<img class="result-thumb" src="${escapeHTML(thumbnail)}" alt="" loading="lazy" referrerpolicy="no-referrer" />`
      : '';

    return `
      <article class="result-card" style="animation-delay:${Math.min(index * 45, 180)}ms">
        ${imageMarkup}
        <div class="result-domain-row"><span class="result-favicon">پ</span><span>${domain}</span><span class="result-breadcrumb">› پیدا</span></div>
        <h2><a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${title}</a></h2>
        <p>${description}</p>
        <div class="result-meta"><span>${source}</span><span>باز کردن در منبع</span></div>
      </article>
    `;
  }

  function renderKnowledge(item) {
    if (!item) {
      renderKnowledgeEmpty();
      return;
    }
    const title = escapeHTML(item.title);
    const description = escapeHTML((item.description || '').replace(/\s+/g, ' ').trim());
    const image = safeHttpUrl(item.thumb || '');
    const url = escapeHTML(safeHttpUrl(item.url));
    const cover = image !== '#'
      ? `<img src="${escapeHTML(image)}" alt="" loading="lazy" referrerpolicy="no-referrer" /><span class="cover-placeholder" hidden>${escapeHTML(item.title.slice(0, 1))}</span>`
      : `<span class="cover-placeholder">${escapeHTML(item.title.slice(0, 1))}</span>`;
    knowledgePanel.innerHTML = `
      <div class="knowledge-cover">${cover}</div>
      <div class="knowledge-content">
        <div class="knowledge-kicker"><span>در یک نگاه</span><span>${escapeHTML(item.source || 'ویکی‌پدیا')}</span></div>
        <h2>${title}</h2>
        <p>${description}</p>
        <a class="knowledge-link" href="${url}" target="_blank" rel="noopener noreferrer"><span>ادامه در منبع</span><span aria-hidden="true">↗</span></a>
      </div>
    `;
  }

  function renderKnowledgeEmpty(title = 'موضوع‌های مرتبط را کشف کن', description = 'با تغییر عبارت جست‌وجو، مسیرهای تازه‌ای برای پیدا کردن پاسخ‌ها باز می‌شود.') {
    knowledgePanel.innerHTML = `
      <div class="knowledge-empty">
        <span class="empty-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v12H7l-3 3V5Z"/><path d="M8 9h8m-8 4h5"/></svg></span>
        <h2>${escapeHTML(title)}</h2>
        <p>${escapeHTML(description)}</p>
      </div>
    `;
  }

  function makeExternalCard({ title, description, button, url, icon = 'search' }) {
    const safeUrl = escapeHTML(safeHttpUrl(url));
    const iconSvg = icon === 'image'
      ? '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9" r="1.5"/><path d="m4 17 5-5 3.5 3.5 2.5-2.5 5 5"/>'
      : icon === 'video'
        ? '<rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z"/>'
        : icon === 'news'
          ? '<path d="M5 4h14v16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M8 8h8m-8 4h8m-8 4h5"/>'
          : icon === 'map'
            ? '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>'
            : '<circle cx="10.8" cy="10.8" r="6.4"/><path d="m15.5 15.5 4 4"/>';
    return `
      <div class="external-search-card">
        <span class="external-search-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${iconSvg}</svg></span>
        <h2>${escapeHTML(title)}</h2>
        <p>${escapeHTML(description)}</p>
        <a class="external-search-link" href="${safeUrl}" target="_blank" rel="noopener noreferrer">${escapeHTML(button)} <span aria-hidden="true">↗</span></a>
      </div>
    `;
  }

  function renderImageResults() {
    const images = activeResults.filter((item) => safeHttpUrl(item.thumb || '') !== '#');
    if (!images.length) {
      const url = makeExternalUrl('images', activeQuery);
      resultList.innerHTML = makeExternalCard({
        title: `تصاویر مرتبط با «${activeQuery}»`,
        description: 'برای نمایش مجموعه‌ای گسترده از تصاویر، جست‌وجو را در سرویس تصاویر ادامه بده. این پیوند در یک زبانهٔ تازه باز می‌شود.',
        button: 'دیدن تصاویر در وب',
        url,
        icon: 'image'
      });
      resultsDescription.textContent = 'برای این موضوع، جست‌وجوی تصویری را در وب ادامه بده.';
      renderKnowledgeEmpty('یک تصویر، هزار داستان', 'جست‌وجوی تصویرت را در وب ادامه بده یا به بخش نتایج متنی برگرد.');
      return;
    }

    resultList.innerHTML = `<div class="image-results-grid">${images.map((item) => `
      <a class="image-result-card" href="${escapeHTML(safeHttpUrl(item.url))}" target="_blank" rel="noopener noreferrer">
        <img src="${escapeHTML(safeHttpUrl(item.thumb))}" alt="${escapeHTML(item.title)}" loading="lazy" referrerpolicy="no-referrer" />
        <span>${escapeHTML(item.title)}</span>
      </a>
    `).join('')}</div>`;
    resultsDescription.textContent = `${images.length} تصویر مرتبط از ${resultOrigin === 'wikipedia' ? 'ویکی‌پدیا' : 'موضوع‌های منتخب'}`;
    renderKnowledge(images[0]);
  }

  function renderSpecialTab(tab) {
    const destination = {
      videos: {
        title: `ویدئوهای «${activeQuery}»`,
        description: 'برای تماشای ویدئوهای مرتبط، جست‌وجو را در یوتیوب ادامه بده. نتیجه‌ها در یک زبانهٔ تازه باز می‌شوند.',
        button: 'جست‌وجوی ویدئوها',
        icon: 'video'
      },
      news: {
        title: `خبرهای «${activeQuery}»`,
        description: 'برای دیدن پوشش خبری تازه و منابع مختلف، جست‌وجو را در Google News ادامه بده. نتیجه‌ها در یک زبانهٔ تازه باز می‌شوند.',
        button: 'دیدن خبرها',
        icon: 'news'
      },
      maps: {
        title: `مکان‌های مرتبط با «${activeQuery}»`,
        description: 'برای دیدن مکان‌ها، مسیرها و اطلاعات محلی، جست‌وجو را در نقشه ادامه بده. نتیجه‌ها در یک زبانهٔ تازه باز می‌شوند.',
        button: 'باز کردن نقشه',
        icon: 'map'
      }
    }[tab];
    resultList.innerHTML = makeExternalCard({ ...destination, url: makeExternalUrl(tab, activeQuery) });
    resultsDescription.textContent = tab === 'news'
      ? 'تازه‌ترین پوشش خبری از وب.'
      : tab === 'maps'
        ? 'مکان‌ها و مسیرها روی نقشه.'
        : 'ویدئوهای پیشنهادی از وب.';
    const emptyCopy = {
      videos: ['ویدئو، یک راه دیگر برای یادگیری', 'نتیجه‌های ویدئویی در یک سرویس بیرونی باز می‌شوند.'],
      news: ['همیشه باخبر بمان', 'منابع خبری مختلف را برای این موضوع پیدا کن.'],
      maps: ['از این‌جا به آن‌جا', 'مکان یا نشانی را جست‌وجو کن تا روی نقشه ببینی.']
    }[tab];
    renderKnowledgeEmpty(emptyCopy[0], emptyCopy[1]);
  }

  function updateRelatedSearches() {
    const localMatches = searchLocalIndex(activeQuery)
      .map((item) => item.title)
      .filter((title) => normalizeText(title) !== normalizeText(activeQuery));
    const phrases = [...new Set([...localMatches, `${activeQuery} چیست؟`, `راهنمای ${activeQuery}`])].slice(0, 4);
    if (!phrases.length) {
      relatedSearches.hidden = true;
      return;
    }
    relatedSearches.hidden = false;
    relatedSearches.querySelector('.related-chips').innerHTML = phrases.map((phrase) => `
      <button class="related-chip" type="button" data-query="${escapeHTML(phrase)}">${escapeHTML(phrase)}</button>
    `).join('');
  }

  function renderActiveTab() {
    updateTabButtons();
    resultList.setAttribute('aria-busy', 'false');
    resultFooterNote.hidden = activeTab !== 'web';

    if (activeTab === 'web') {
      if (activeResults.length) {
        resultList.innerHTML = activeResults.map(createResultCard).join('');
        const sourceText = resultOrigin === 'wikipedia' ? 'ویکی‌پدیا' : 'پیشنهادهای منتخب پیدا';
        resultsDescription.textContent = `${activeResults.length} نتیجهٔ مرتبط از ${sourceText}`;
        renderKnowledge(activeResults[0]);
      } else {
        resultList.innerHTML = makeExternalCard({
          title: `جست‌وجوی وب برای «${activeQuery}»`,
          description: 'در نسخهٔ نمایشی پیدا، نتیجه‌های متنی از ویکی‌پدیا بارگیری می‌شوند. برای جست‌وجوی گسترده‌تر می‌توانی عبارتت را در وب دنبال کنی.',
          button: 'ادامهٔ جست‌وجو در وب',
          url: makeExternalUrl('web', activeQuery)
        });
        resultsDescription.textContent = 'نتیجه‌ای در فهرست آفلاین پیدا نشد.';
        renderKnowledgeEmpty('هنوز چیزی پیدا نشده', 'می‌توانی عبارت را کوتاه‌تر کنی یا جست‌وجوی کامل وب را ادامه بدهی.');
      }
      updateRelatedSearches();
      return;
    }

    relatedSearches.hidden = true;
    if (activeTab === 'images') renderImageResults();
    else renderSpecialTab(activeTab);
  }

  function showHome() {
    activeQuery = '';
    setView('home');
    document.getElementById('homeInput').value = '';
    document.getElementById('resultsInput').value = '';
    document.querySelectorAll('.clear-search').forEach((button) => { button.hidden = true; });
    window.setTimeout(() => document.getElementById('homeInput').focus({ preventScroll: true }), 180);
  }

  function getSuggestions(query) {
    const normalized = normalizeText(query);
    if (!normalized) return POPULAR_QUERIES.slice(0, 4);
    const matching = POPULAR_QUERIES.filter((phrase) => normalizeText(phrase).includes(normalized) || normalized.includes(normalizeText(phrase)));
    const local = searchLocalIndex(query).map((item) => item.title);
    const phrases = [...new Set([query, ...matching, ...local])];
    return phrases.slice(0, 5);
  }

  function hideSuggestions(list, input) {
    list.hidden = true;
    list.innerHTML = '';
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }

  function attachSearchForm(formId, inputId) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const suggestionList = document.getElementById(input.getAttribute('aria-controls'));
    const clearButton = form.querySelector('.clear-search');
    let highlightedIndex = -1;

    const drawSuggestions = () => {
      const query = input.value.trim();
      const phrases = getSuggestions(query);
      highlightedIndex = -1;
      if (!phrases.length || !document.activeElement.isSameNode(input)) {
        hideSuggestions(suggestionList, input);
        return;
      }
      suggestionList.innerHTML = `
        <div class="suggestion-title">${query ? 'پیشنهاد برای جست‌وجو' : 'چند پیشنهاد برای شروع'}</div>
        ${phrases.map((phrase, index) => `
          <button id="suggestion-${inputId}-${index}" class="suggestion-option" type="button" role="option" aria-selected="false" data-suggestion-index="${index}" data-query="${escapeHTML(phrase)}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.4"/><path d="m15.5 15.5 4 4"/></svg>
            <span>${escapeHTML(phrase)}</span>
          </button>
        `).join('')}
      `;
      suggestionList.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      suggestionList.querySelectorAll('.suggestion-option').forEach((button) => {
        button.addEventListener('mousedown', (event) => event.preventDefault());
        button.addEventListener('click', () => performSearch(button.dataset.query));
      });
    };

    input.addEventListener('focus', drawSuggestions);
    input.addEventListener('input', () => {
      clearButton.hidden = input.value.length === 0;
      drawSuggestions();
    });
    input.addEventListener('keydown', (event) => {
      const options = [...suggestionList.querySelectorAll('.suggestion-option')];
      if (event.key === 'ArrowDown' && options.length) {
        event.preventDefault();
        highlightedIndex = (highlightedIndex + 1) % options.length;
      } else if (event.key === 'ArrowUp' && options.length) {
        event.preventDefault();
        highlightedIndex = (highlightedIndex - 1 + options.length) % options.length;
      } else if (event.key === 'Escape') {
        hideSuggestions(suggestionList, input);
        return;
      } else if (event.key === 'Enter' && highlightedIndex >= 0 && options[highlightedIndex]) {
        event.preventDefault();
        performSearch(options[highlightedIndex].dataset.query);
        return;
      } else {
        return;
      }
      options.forEach((option, index) => {
        const selected = index === highlightedIndex;
        option.setAttribute('aria-selected', String(selected));
        if (selected) input.setAttribute('aria-activedescendant', option.id || `suggestion-${index}`);
      });
    });
    input.addEventListener('blur', () => window.setTimeout(() => hideSuggestions(suggestionList, input), 140));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      performSearch(input.value);
    });
    clearButton.addEventListener('click', () => {
      input.value = '';
      clearButton.hidden = true;
      input.focus();
      drawSuggestions();
    });
  }

  function attachVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    document.querySelectorAll('.voice-search').forEach((button) => {
      button.addEventListener('click', () => {
        if (!SpeechRecognition) {
          showToast('جست‌وجوی صوتی در این مرورگر در دسترس نیست.');
          return;
        }
        const input = button.closest('form')?.querySelector('input[type="search"]');
        if (!input) return;
        const recognition = new SpeechRecognition();
        recognition.lang = 'fa-IR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        button.classList.add('listening');
        showToast('دارم گوش می‌کنم؛ عبارتت را بگو.');
        recognition.onresult = (event) => {
          const transcript = event.results?.[0]?.[0]?.transcript || '';
          input.value = transcript;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          if (transcript.trim()) performSearch(transcript);
        };
        recognition.onerror = () => showToast('صدایت واضح نبود؛ دوباره تلاش کن.');
        recognition.onend = () => button.classList.remove('listening');
        try {
          recognition.start();
        } catch (_error) {
          button.classList.remove('listening');
          showToast('برای جست‌وجوی صوتی اجازهٔ میکروفن لازم است.');
        }
      });
    });
  }

  attachSearchForm('homeSearch', 'homeInput');
  attachSearchForm('resultsSearch', 'resultsInput');
  attachVoiceSearch();

  document.querySelectorAll('[data-query]').forEach((button) => {
    button.addEventListener('click', () => performSearch(button.dataset.query));
  });

  document.querySelectorAll('.result-tab').forEach((button) => {
    button.addEventListener('click', () => {
      activeTab = button.dataset.tab;
      renderActiveTab();
    });
  });

  document.getElementById('backHome').addEventListener('click', showHome);
  document.getElementById('brandHome').addEventListener('click', (event) => {
    event.preventDefault();
    showHome();
  });

  document.querySelectorAll('a[href="#discover"], a[href="#about"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!resultsView.hidden) {
        event.preventDefault();
        setView('home');
        window.setTimeout(() => document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 180);
      }
    });
  });

  relatedSearches.addEventListener('click', (event) => {
    const button = event.target.closest('[data-query]');
    if (button) performSearch(button.dataset.query);
  });

  const themeButton = document.querySelector('.theme-toggle');
  try {
    if (localStorage.getItem('peida-theme') === 'dark') document.documentElement.dataset.theme = 'dark';
  } catch (_error) { /* local storage may be disabled */ }
  themeButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try { localStorage.setItem('peida-theme', nextTheme); } catch (_error) { /* ignore */ }
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLElement && (
      target.matches('input, textarea, select') || target.isContentEditable
    );
    if (event.key === '/' && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      (resultsView.hidden ? document.getElementById('homeInput') : document.getElementById('resultsInput')).focus();
    }
    if (event.key === 'Escape') {
      document.querySelectorAll('.suggestions').forEach((list) => { list.hidden = true; });
    }
  });

  document.getElementById('footerYear').textContent = new Date().toLocaleDateString('fa-IR', { year: 'numeric' });
})();
