(function () {
  'use strict';
  var translations = {
  "Homepage": "主页",
  "About": "简介",
  "News": "动态",
  "Publications": "论文",
  "Awards": "荣誉",
  "Education": "教育",
  "Canwei Liu": "刘灿葳",
  "Master's student at Central South University": "中南大学硕士研究生",
  "Master's Student at CSU": "中南大学硕士研究生",
  "Changsha, China": "中国·长沙",
  "Google Scholar": "谷歌学术",
  "Website": "个人网站"
};
  var nodes = [];
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (!node.parentElement || node.parentElement.closest('script, style, [data-lang], .language-switch')) continue;
    if (Object.prototype.hasOwnProperty.call(translations, node.nodeValue.trim())) nodes.push({node: node, original: node.nodeValue});
  }
  function applyLanguage(language, save) {
    language = language === 'zh' ? 'zh' : 'en';
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = language === 'zh' ? '刘灿葳 - 学术主页' : 'Canwei Liu - Homepage';
    nodes.forEach(function (item) {
      item.node.nodeValue = language === 'zh' ? item.original.replace(item.original.trim(), translations[item.original.trim()]) : item.original;
    });
    document.querySelectorAll('[data-set-language]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.setLanguage === language));
    });
    var nav = document.querySelector('#site-nav');
    if (nav) {
      nav.setAttribute('aria-label', language === 'zh' ? '主导航' : 'Main navigation');
      var menu = nav.querySelector('button');
      if (menu) menu.setAttribute('aria-label', language === 'zh' ? '展开导航菜单' : 'Open navigation menu');
    }
    if (save) {
      try { localStorage.setItem('homepage-language', language); } catch (error) {}
      // Keep an explicit language query consistent with the new selection.
      try { var url = new URL(location.href); if (url.searchParams.has('lang')) { url.searchParams.set('lang', language); history.replaceState(null, '', url); } } catch (error) {}
    }
    window.dispatchEvent(new Event('resize'));
  }
  document.querySelectorAll('[data-set-language]').forEach(function (button) {
    button.addEventListener('click', function () { applyLanguage(button.dataset.setLanguage, true); });
  });
  applyLanguage(document.documentElement.dataset.language, false);
})();
