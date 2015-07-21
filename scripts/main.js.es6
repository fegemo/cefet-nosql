var bespoke = require('bespoke'),
    isMobile = require('ismobilejs'),
    fancy = require('bespoke-theme-fancy'),
    keys = require('bespoke-keys'),
    touch = require('bespoke-touch'),
    bullets = require('bespoke-bullets'),
    scale = require('bespoke-scale'),
    hash = require('bespoke-hash'),
    progress = require('bespoke-progress'),
    state = require('bespoke-state'),
    math = require('bespoke-math'),
    markdown = require('bespoke-meta-markdown'),
    backdrop = require('bespoke-backdrop'),
    overview = require('bespoke-overview'),
    tutorial = require('./tutorial'),
    sleek = require('./sleek-menu');

// Bespoke.js
bespoke.from('article', [
  fancy(),
  markdown({
    backdrop: function(slide, value) {
      slide.setAttribute('data-bespoke-backdrop', value);
    },
    classes: function(slide, value) {
      value.split(' ').forEach(aClass => slide.classList.add(aClass));
    },
    scripts: function(slide, url) {
      var placeToPutScripts = document.body;
      url = !Array.isArray(url) ? [url] : url;

      function loadScriptChain(i) {
        var s = document.createElement('script');
        s.src = url[i];
        if (i < url.length - 1) {
          s.addEventListener('load', function () {
              loadScriptChain(i+1);
          });
        }
        placeToPutScripts.appendChild(s);
      }
      loadScriptChain(0);
    },
    styles: function(slide, value) {
      var placeToPutStyles= document.head;
      value = !Array.isArray(value) ? [value] : value;
      value.forEach(url => {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = url;
        placeToPutStyles.appendChild(l);
      });
    }
  }),
  keys(),
  touch(),
  hash(),
  progress(),
  math(),
  state(),
  backdrop(),
  bullets('.bespoke-slide:not(.no-bullet) li:not(.no-bullet), .bullet'),
  overview(),
  tutorial(document.getElementsByClassName('tutorial')[0]),
  function() {
    var deck = arguments[0],
      delayedScale = () => {
        return scale(isMobile.any ? 'transform' : 'zoom')(deck);
      };
    setTimeout(delayedScale, 700);
  }
]);

sleek();
