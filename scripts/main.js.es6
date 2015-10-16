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
    search = require('bespoke-search'),
    qr = require('qr-image'),
    tutorial = require('./tutorial'),
    sleek = require('./sleek-menu');

// Bespoke.js
window.deck = bespoke.from('article', [
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
    },
    bespokeEvent: function(slide, events) {
      setTimeout(function() {
        events.split(' ').forEach(function(event) {
          deck.fire(event);
        });
      },100);
    },
    bespokeState: function(slide, classNames) {
      slide.setAttribute('data-bespoke-state', classNames);
    }
  }),
  keys(),
  function() {
    // bypass bespoke-bullets
    var deck = arguments[0];
    document.addEventListener('keydown', function(e) {
      if ((e.which == 40) || // DOWN
          (e.which == 38)) { // UP
        deck.fire('bullets.disable');
        if (e.which == 40) deck.next();
        else deck.prev();
        deck.fire('bullets.enable');
      }
    });
  },
  function () {
    // qr code with link to current slide
    var deck = arguments[0],
      qrContainer = document.querySelector('#qr-container'),
      imagesCache = {};
    document.addEventListener('keydown', (e) => {
      if (e.which == 81   // 'q'
          && qrContainer
          && !qrContainer.classList.contains('showing')) {
        let image = imagesCache[location.href] || (imagesCache[location.href] = qr.imageSync(location.href, { type: 'svg' }));
        qrContainer.innerHTML = image;
        qrContainer.classList.add('showing');
      } else if (qrContainer) {
        qrContainer.classList.remove('showing');
      }
    });
  },
  touch(),
  hash(),
  progress(),
  math(),
  state(),
  backdrop(),
  bullets('.bespoke-slide:not(.no-bullet) ul:not(.no-bullet) li:not(.no-bullet), .bullet'),
  overview(),
  search(),
  tutorial(document.getElementsByClassName('tutorial')[0])
  // ,
  // function() {
  //   var deck = arguments[0],
  //     delayedScale = () => {
  //       return scale(isMobile.any ? 'transform' : 'zoom')(deck);
  //     };
  //   setTimeout(delayedScale, 700);
  // }
]);

sleek();
