module.exports = function() {
  var pageHeaderEl = document.getElementById('page-header'),
    bodyClasses = document.body.classList;

  if (pageHeaderEl) {
    pageHeaderEl.addEventListener('mouseover', () => bodyClasses.add('menu-open'));
    pageHeaderEl.addEventListener('mouseleave', () => bodyClasses.remove('menu-open'));
  }
};
