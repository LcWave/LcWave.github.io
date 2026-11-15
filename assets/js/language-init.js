(function () {
  var language = 'en';
  try {
    var requested = new URLSearchParams(window.location.search).get('lang');
    var saved = localStorage.getItem('homepage-language');
    if (requested === 'zh' || requested === 'en') language = requested;
    else if (saved === 'zh' || saved === 'en') language = saved;
  } catch (error) { /* Storage may be unavailable in private browsing. */ }
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
})();
