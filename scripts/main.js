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
  overview = require('bespoke-simple-overview'),
  //search = require('bespoke-search'),
  qrcode = require('bespoke-qrcode'),
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
          window.deck.fire(event);
        });
      },100);
    },
    bespokeState: function(slide, classNames) {
      slide.setAttribute('data-bespoke-state', classNames);
    },
    transition: function(slide, classNames) {
      var deckParent = slide.parentElement;
      classNames.split(' ').forEach(aClass => deckParent.classList.add(aClass));
      // TODO tirar as classes quando sair deste slide
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
  touch(),
  overview({ insertStyles: false }),
  bullets('.bespoke-slide:not(.no-bullet) ul:not(.no-bullet) li:not(.no-bullet), .bullet'),
  hash(),
  progress(),
  math(),
  state(),
  backdrop(),
  //search(),
  qrcode(),
  tutorial(document.getElementsByClassName('tutorial')[0])
  ,
  function() {
    var deck = arguments[0],

      delayedScale = () => {
        return scale(isMobile.any ? 'transform' : 'zoom')(deck);
      };
    if (isMobile.any) setTimeout(delayedScale, 700);
  }
]);

sleek();
