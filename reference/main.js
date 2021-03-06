// eslint settings
/* global areClipPathShapesSupported, LazyLoad, lightbox, mountainData, $, TemplateEngine, Router */
'use strict';
// mountaindrawn
$(function() {
  var navLeft = document.querySelector('.nav-left'),
    navRight = document.querySelector('.nav-right'),
    navEarth = document.querySelector('.nav-earth'),
    dataClose = document.querySelector('.data-close'),
    title = document.querySelector('.title'),
    data = document.querySelector('.data'),
    dataContent = data.querySelector('.data-content'),
    mtnShortcuts = document.querySelectorAll('.earth-mtn'),
    shootingStar = document.querySelector('.shooting-star'),
    mountainList = Object.keys(mountainData),
    length = mountainList.length,
    nLength = length - 1, // normalized length
    currentMountain,
    earthStarted = false,
    lazyload, // eslint-disable-line no-unused-vars
    newMountain;

  // events
  // DONE: navLeft.addEventListener('click', navigateLeft, false);
  // DONE: navRight.addEventListener('click', navigateRight, false);
  // DONE: navEarth.addEventListener('click', navigateEarth, false);
  // DONE: dataClose.addEventListener('click', closeDateBox, false);
  // DONE: data.addEventListener('click', viewMountain, false);
  // DONE: shootingStar.addEventListener('transitionend', shootingStarEnd, false);
  // DONE: window.addEventListener('resize', sizeshards, false);

  // keyboard navigation
  document.onkeydown = checkKey;

  // allow lightbox to launch
  $('.photos').on('click', 'a', function (e) {
    e.preventDefault();
  });

  function initialize () {
    // set up routes and mountain
    routes();
    sizeshards();
    // don't show images until scroll up
    lazyload = new LazyLoad({
      threshold: -50
    });
    // lightbox options
    lightbox.option({
      'resizeDuration': 250,
      'wrapAround': true
    });
    // init earth sequence
    if (document.body.dataset.mountain === 'earth') {
      earthSequence();
    }
    // test for clip-path support
    if (areClipPathShapesSupported()) {
      document.body.classList.remove('no-clip-path');
      document.body.classList.add('supports-clip-path');
      setMtnClickEvents();
    }
  }

  function navigateRight (e) {
    e.preventDefault();
    currentMountain = mountainList.indexOf(document.body.dataset.mountain);
    // start at beginning again if at end
    newMountain = (currentMountain === nLength) ? 0 : (currentMountain + 1);
    // change mountain
    navigate(newMountain);
  }

  function navigateLeft (e) {
    e.preventDefault();
    currentMountain = mountainList.indexOf(document.body.dataset.mountain);
    // start at end again if at beginning
    newMountain = (currentMountain === 0) ? nLength : (currentMountain - 1);
    // change mountain
    navigate(newMountain);
  }

  function navigateEarth (e) {
    e.preventDefault();
    // go back to earth
    navigate('earth');
  }

  function closeDateBox (e) {
    e.preventDefault();
    // go back to earth
    e.target.parentElement.classList.add('transparent');
    e.target.parentElement.classList.remove('animate');
  }

  function navigate (newMountain) {
    // navigate accepts string name or position in array
    // @requires mewMountain (string)
    // @optional mewMountain (number)
    var mountain = newMountain;

    if (typeof (newMountain) === 'number') {
      mountain = mountainList[newMountain];
    }

    document.body.dataset.mountain = mountain;
    setData(mountain);
    Router.navigate('#/' + mountain);
    getMountainImages(mountain);
  }

  function viewMountain (e) {
    // navigate to the mountain if it's not the close btn or img
    if (document.body.dataset.mountain === 'earth' &&
      !e.target.classList.contains('data-close') &&
      e.target.tagName !== 'IMG') {
      navigate(e.currentTarget.dataset.mountain);
    }
  }

  function setData (newMountain) {
    // @requires mewMountain (string)
    var newMountainData = mountainData[newMountain];
    var template = '<h2 class="data-title"><%this.title%></h2>' +
      '<p class="data-elevation">elevation <b><%this.elevation%></b></p>' +
      '<p class="data-prominence">prominence <%this.prominence%></p>' +
      '<p class="data-description"><%this.description%></p>';

    if (typeof newMountainData === 'undefined') {
      // set to earth
      newMountainData = mountainData['earth'];
    }

    // only show if there is a title
    // earth is blank so hide it
    if (newMountainData.title.length) {
      // set title
      title.innerHTML = TemplateEngine('<%this.title%>', newMountainData);
      // set data
      dataContent.innerHTML = TemplateEngine(template, newMountainData);
      // show the data box
      data.classList.remove('transparent', 'animate');
      data.dataset.mountain = newMountain;
    } else {
      // hide data for earth
      data.classList.add('transparent');
      title.innerHTML = '';
    }
  }

  function sizeshards () {
    // NOTE: maintain aspect ration of 5:3
    // calc height & width
    // height = new width * (original height / original width)
    // i.e. (600 / 1000) x 500 = 300
    // width = new height * (original width / original height)
    var width = document.body.offsetWidth;
    var maxHeight = document.querySelector('.container').offsetHeight - 50;
    var mountains = document.querySelector('.mountains');
    var w = width;
    var h = Math.round(0.60 * w);
    var ratio = (w / h); // 5:3

    if (h > maxHeight) {
      // console.log('maxed');
      w = maxHeight * ratio;
      h = maxHeight;
    }

    mountains.style.width = w + 'px';
    mountains.style.height = h + 'px';
  }

  function getRandomInRange (min, max) {
    // return an integer from a range
    return Math.round((Math.random() * (max - min) + min));
  }

  function animateShootingStar () {
    // keep at top half of screen
    // set new top, left, and width
    shootingStar.style.top = getRandomInRange(-10, 30) + 'vh';
    shootingStar.style.left = getRandomInRange(-20, 70) + 'vw';
    shootingStar.style.width = getRandomInRange(10, 35) + 'vw';
    // start animation
    // shootingStar.classList.add('animate');
  }

  function shootingStarEnd() {
    // remove animation class
    shootingStar.classList.remove('animate');
  }

  // earth sequence
  function earthSequence() {
    // reset the mountain shortcuts
    mtnShortcutReset();
    // only execute once - occurs on /#/earth bookmarked route
    if (earthStarted) {
      return;
    }
    // animate the shooting star
    // NOTE: ensure timing exceeds transition timing
    (function loop() {
      // activate shooting star at random interval
      setTimeout(function() {
        animateShootingStar();
        loop();
      }, getRandomInRange(5000, 12000));
    }());

    earthStarted = true;
  }

  // click mtn shortcut
  function setMtnClickEvents(e) {
    mtnShortcuts.forEach(function(mtn) {
      mtn.addEventListener('click', clickMtnShortcut);
      mtn.addEventListener('mouseover', hoverMtnShortcut);
    });
  }

  function mtnShortcutReset() {
    mtnShortcuts.forEach(function(mtn) {
      mtn.classList.remove('hover');
    });
  }

  function hoverMtnShortcut(e) {
    // show mountain info on hover
    setData(e.target.dataset.mountain);
    // keep selected until another hover
    mtnShortcutReset();
    // show the photos
    getMountainImages(e.target.dataset.mountain);

    e.target.classList.add('hover');
    data.classList.add('animate');
  }

  function clickMtnShortcut(e) {
    // navigate to the selected mountain
    navigate(e.target.dataset.mountain);
  }

  function getMountainImages (mountain) {
    // @ requires mountain (string)
    // format: mtn-lg-bugaboo-1.jpg
    var baseURL = '../dist/images/photos/mtn-',
      docFrag = document.createDocumentFragment(),
      images = document.querySelector('.data-photos'),
      exclude = ['earth'],
      // title = document.createElement('h3'),
      photo = '',
      photoHref = '',
      photoSmall = baseURL + 'sm-',
      photoLarge = baseURL + 'lg-';

    // clear photos
    images.innerHTML = '';

    // skip earth and anything else without photos
    if (!mountain || exclude.indexOf(mountain) !== -1) {
      return false;
    }

    // add title
    // title.textContent = mountainData[mountain].title + ' photos';
    // docFrag.append(title);

    // load 4 photos
    for (var i = 0; i < 4; i++) {
      photoHref = mountain + '-' + (i + 1) + '.jpg';
      photo = '<img src="' + photoSmall + photoHref + '"' + 'alt="' + mountain + '"' + ' />';
      // TODO: remove jquery
      $('<a/>').attr('href', photoLarge + photoHref)
        .attr('rel', 'prefetch')
        .attr('data-photohref', photoLarge + photoHref)
        .attr('data-lightbox', 'mountaindrawn')
        .appendTo(docFrag).append(photo);

      // var a = document.createElement('a');
      // a.href = photoLarge + photoHref;
      // a.rel = 'prefetch';
      // a.dataset.photohref = photoLarge + photoHref;
      // a.dataset.lightbox = 'mountaindrawn';
    } // END for photo loop

    // append images
    images.appendChild(docFrag);
  } // END getMountainImages

  function checkKey (e) {
    if (e.keyCode === 37) {
      // left arrow
      navigateLeft(e);
    } else if (e.keyCode === 39) {
      // right arrow
      navigateRight(e);
    }
  }

  function routes () {
    // TODO: use hashChange event to remove hash-router.js
    // change mountain
    var mainRoute = {
      path: '#/:name',
      before: function () {
        // if currentMountain is not === name then set mountain
        if (document.body.dataset.mountain !== this.params.name) {
          navigate(this.params.name);
        }
        if (document.body.dataset.mountain === 'earth') {
          // debounce
          window.setTimeout(function () {
            earthSequence();
          }, 0);
        }
        this.task.done();
      },
      on: function () {
        // check if name is list and redirect if undefined
        if (mountainList.indexOf(this.params.name) === -1) {
          // default to earth
          navigate(0);
        }
      }
    };

    var onRouteNotFound = function (route) {
      // suppress notfound error
    };

    Router.add(mainRoute);
    Router.init(null, onRouteNotFound);
  }

  initialize();
});
