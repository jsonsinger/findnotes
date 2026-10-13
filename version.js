// Fills in the app's current version wherever a page has [data-app-version]. The version lives
// only in the app's sw.js, so read it from there. If that fails (offline, or opened locally),
// the slot stays empty and the stage label still reads fine on its own.
(() => {
  const slots = document.querySelectorAll('[data-app-version]');
  if (!slots.length) return;
  fetch('https://app.findnotes.io/sw.js', { cache: 'no-cache' })
    .then((r) => (r.ok ? r.text() : ''))
    .then((text) => {
      const v = /const VERSION = '([^']+)'/.exec(text)?.[1];
      if (v) slots.forEach((el) => { el.textContent = v; });
    })
    .catch(() => {});
})();
