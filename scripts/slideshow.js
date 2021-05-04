(function (window) {
  function multiSlideShow() {
    var slideIndex = 1;
    var _multiSlideShow = {};
    var options;
    this.waitCaptainTimer = 0;
    this.perLoadItems = 10;
    this.listRange = 0;
    this.temp = [];

    _multiSlideShow.setSlideShowOptions = async function (values) {
      var slides = document.querySelectorAll('.slide');
      var images = document.querySelectorAll('.imageClip');
      var captains = document.querySelectorAll('.captain');
      var descriptions = document.querySelectorAll('.description');

      if (!slides && !images && !captains && !descriptions) {
        slides[slideIndex - 1].style.display = 'none';
        images[slideIndex - 1].style.display = 'none';
        captains[slideIndex - 1].style.display = 'none';
        descriptions[slideIndex - 1].style.display = 'none';
      }

      options = values;
      slideIndex = 1;

      options.selector.innerHTML = '';

      addStyle();
      if (options.youtube) {
        options.contents = [];
        options.captains = [];
        options.descriptions = [];
        options.fileType = [];
        temp = [];
        nextPage = '';
        await getYoutubeVideoList();
      }
      if (options.effectType == 'transition') createTransitionEffect();
      else createFadeEffect();

    };

    this.addStyle = function () {
      var active = document.createElement('style');
      active.type = 'text/css';
      active.innerHTML = '.active {background-color: ' + options.navigationBackgroundColor + 99 + ';}';
      document.getElementsByTagName('head')[0].appendChild(active);

      var prevHover = document.createElement('style');
      prevHover.type = 'text/css';
      prevHover.innerHTML = '.prev:hover, .next:hover {background-color: ' + options.arrowBackgroundColor + 'cc;}';
      document.getElementsByTagName('head')[0].appendChild(prevHover);

      var dotHover = document.createElement('style');
      dotHover.type = 'text/css';
      dotHover.innerHTML = '.dot:hover {background-color: ' + options.navigationBackgroundColor + 99 + ';}';
      document.getElementsByTagName('head')[0].appendChild(dotHover);

      importFontFamily(options.captainFontFamily);
      importFontFamily(options.descriptionFontFamily);
    };

    this.addButton = function (slideShow, prev, next, dotContainer) {
      prev.classList.add('prev');
      prev.style.color = options.arrowColor;
      prev.setAttribute('onclick', 'plusSlides(-1)');
      prev.innerHTML = options.arrowIcon;
      next.classList.add('next');
      next.style.color = options.arrowColor;
      next.setAttribute('onclick', 'plusSlides(1)');
      next.innerHTML = options.arrowIcon;
      dotContainer.classList.add('dot-container');
      dotContainer.style.display = 'flex';
      if (options.navigationDirection == 'vertical') dotContainer.style.flexDirection = 'column';
      dotContainer.classList.add(options.navigationPosition);

      if (options.hasArrow) {
        slideShow.appendChild(prev);
        slideShow.appendChild(next);
      }
      if (options.hasNavigation) slideShow.appendChild(dotContainer);
    };

    // make every slide and then append to transition slide panel
    this.createTransitionEffect = function () {
      console.log('transition');
      var transitionContainer = document.createElement('div');
      var transitionPanel = document.createElement('div');
      var prev = document.createElement('a');
      var next = document.createElement('a');
      var dotContainer = document.createElement('div');

      this.beforeSlideIndex = 1;

      transitionContainer.classList.add('transitionContainer');
      transitionContainer.style.background = 'grey';
      transitionPanel.classList.add('transitionPanel');
      if (options.slideDirection != 'vertical') transitionPanel.style.whiteSpace = 'nowrap';

      for (let i = 0; i < options.contents.length; i++) {
        var transitionItem = document.createElement('div');
        var transitionImageItem = document.createElement('div');
        var textArea = document.createElement('div');
        var captain = document.createElement('div');
        var description = document.createElement('div');
        var playButton = document.createElement('a');
        var img;
        var dot = document.createElement('span');

        if (options.slideDirection == 'vertical') transitionItem.classList.add('transitionVerticalItem');
        else transitionItem.classList.add('transitionHorizontalItem');
        if (i == 0) {
          if (options.slideDirection == 'horizontal') transitionItem.style.marginLeft = '15%';
          else transitionItem.style.marginTop = '15%';
        }
        if (i == options.contents.length - 1) {
          if (options.slideDirection == 'horizontal') transitionItem.style.marginRight = '15%';
          else transitionItem.style.marginBottom = '15%';
        }
        transitionImageItem.classList.add('transitionImageItem');

        if (options.fileType[i] == 'image') {
          img = document.createElement('img');
        } else img = document.createElement('iframe');
        img.setAttribute('src', options.contents[i]);
        img.classList.add('imageClip');
        transitionImageItem.appendChild(img);

        textArea.classList.add('textArea');
        textArea.classList.add(options.textPosition);
        textArea.style.padding = '10%';
        captain.classList.add('captain');
        captain.style.fontSize = options.captainFontSize + 'px';
        captain.style.fontFamily = options.captainFontFamily;
        captain.style.color = options.captainColor;
        captain.style.display = 'flex';
        // captain.append(options.captains[i]);
        for (let j = 0; j < options.captains[i].length; j++) {
          var word = document.createElement('div');
          word.append(options.captains[i][j]);
          word.display = 'none';
          captain.appendChild(word);
        }

        description.classList.add('description');
        description.style.fontSize = options.descritpionFontSize + 'px';
        description.style.fontFamily = options.descriptionFontFamily;
        description.style.color = options.descriptionColor;

        var sub = '';
        for (let j = 0; j < options.descriptions[i].length; j++) {
          sub = sub + options.descriptions[i][j] + '<br />';
        }
        description.innerHTML = sub;

        playButton.classList.add('playButton')
        playButton.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" style="fill-opacity: 0.8"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>'
        playButton.setAttribute('onclick', 'showVideo()');

        dot.classList.add('dot');
        dot.style.border = '2px solid ' + options.navigationBorderColor;
        dot.style.width = options.navigationSize + 'px';
        dot.style.height = options.navigationSize + 'px';
        dot.style.margin = '0px ' + options.navigationSpace + 'px';
        dot.setAttribute('onclick', 'currentSlide(' + (i + 1) + ')');

        if (options.hasCaptain)
          textArea.appendChild(captain);
        if (options.hasDescription)
          textArea.appendChild(description);
        transitionItem.appendChild(transitionImageItem);
        transitionItem.appendChild(playButton);
        transitionItem.appendChild(textArea);
        dotContainer.appendChild(dot);

        transitionPanel.appendChild(transitionItem);
      }
      transitionPanel.setAttribute('onmouseenter', 'activePlayButton()');
      transitionPanel.setAttribute('onmouseleave', 'inactivePlayButton()');

      transitionContainer.appendChild(transitionPanel);
      options.selector.appendChild(transitionContainer);

      this.addButton(options.selector, prev, next, dotContainer);

      transitionSlide(slideIndex);
      killTimer();
      autoPlay();
    };

    // make every slide and then append to fade slide panel
    this.createFadeEffect = function () {
      console.log('createFadeEffect');
      var panel = document.createElement('div');
      var prev = document.createElement('a');
      var next = document.createElement('a');
      var dotContainer = document.createElement('div');
      var img;

      // options.selector.innerHTML = '';
      panel.classList.add('panel');

      for (let i = 0; i < options.contents.length; i++) {
        var playButton = document.createElement('a');
        var slide = document.createElement('div');
        var textArea = document.createElement('div');
        var captain = document.createElement('div');
        var description = document.createElement('div');
        var dot = document.createElement('span');
        slide.classList.add('slide');
        if (options.fileType[i] == 'image') {
          img = document.createElement('img');
        } else img = document.createElement('iframe');
        img.setAttribute('src', options.contents[i]);
        img.classList.add('imageClip');
        textArea.classList.add('textArea');
        textArea.classList.add(options.textPosition);
        captain.classList.add('captain');
        captain.style.fontSize = options.captainFontSize + 'px';
        captain.style.fontFamily = options.captainFontFamily;
        captain.style.color = options.captainColor;
        captain.append(options.captains[i]);
        description.classList.add('description');
        description.style.fontSize = options.descritpionFontSize + 'px';
        description.style.fontFamily = options.descriptionFontFamily;
        description.style.color = options.descriptionColor;

        playButton.classList.add('playButton')
        playButton.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" style="fill-opacity: 0.8"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>'
        playButton.setAttribute('onclick', 'showVideo()');

        var sub = '';
        for (let j = 0; j < options.descriptions[i].length; j++) {
          sub = sub + options.descriptions[i][j] + '<br />';
        }
        description.innerHTML = sub;

        dot.classList.add('dot');
        dot.style.border = '2px solid ' + options.navigationBorderColor;
        dot.style.width = options.navigationSize + 'px';
        dot.style.height = options.navigationSize + 'px';
        dot.style.margin = '0px ' + options.navigationSpace + 'px';
        dot.setAttribute('onclick', 'currentSlide(' + (i + 1) + ')');

        textArea.appendChild(captain);
        textArea.appendChild(description);
        slide.appendChild(img);
        slide.appendChild(playButton);
        slide.appendChild(textArea);
        dotContainer.appendChild(dot);

        panel.appendChild(slide);
      }
      panel.setAttribute('onmouseenter', 'activePlayButton()');
      panel.setAttribute('onmouseleave', 'inactivePlayButton()');

      options.selector.appendChild(panel);

      this.addButton(options.selector, prev, next, dotContainer);

      fadeSlide(slideIndex);
      killTimer();
      autoPlay();
    };

    return _multiSlideShow;
  }

  // transition animation
  this.transitionSlide = function (n) {
    var i;
    var transitionPanel = document.querySelector('.transitionPanel');
    var item = document.querySelectorAll('.transitionImageItem');
    var captains = document.querySelectorAll('.captain');
    var descriptions = document.querySelectorAll('.description');
    var dots = document.querySelectorAll('.dot');

    if (options.hasCaptain)
      for (let i = 0; i < options.captains.length; i++)
        for (let j = 0; j < captains[i].children.length; j++) captains[i].children[j].style.opacity = '0';

    if (options.hasDescription)
      for (let i = 0; i < options.descriptions.length; i++) descriptions[i].style.opacity = '0';

    slideIndex = n;
    if (n > options.contents.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = options.contents.length;
    }

    if (options.hasNavigation)
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
      }

    item[this.beforeSlideIndex - 1].style.transform = 'scale(0.8)';
    if (options.slideDirection == 'vertical')
      setTimeout(() => {
        transitionPanel.style.transform = 'translateY(' + -70 * (slideIndex - 1) + '%)';
      }, 600);
    else
      setTimeout(() => {
        transitionPanel.style.transform = 'translateX(' + -70 * (slideIndex - 1) + '%)';
      }, 600);
    setTimeout(() => {
      item[slideIndex - 1].style.transform = 'scale(1)';
    }, 1600 + 50 * options.captains[slideIndex - 1].length);

    item[beforeSlideIndex - 1].animate({
      transform: ['scale(1)', 'scale(0.8)']
    }, {
      duration: 500,
    });

    if (options.slideDirection == 'vertical')
      transitionPanel.animate({
        transform: ['translateY(' + -70 * (beforeSlideIndex - 1) + '%)', 'translateY(' + -70 * (slideIndex - 1) + '%)']
      }, {
        duration: 500,
        delay: 500,
        easing: 'ease'
      });
    else
      transitionPanel.animate({
        transform: ['translateX(' + -70 * (beforeSlideIndex - 1) + '%)', 'translateX(' + -70 * (slideIndex - 1) + '%)']
      }, {
        duration: 500,
        delay: 500,
        easing: 'ease'
      });

    item[slideIndex - 1].animate({
      transform: ['scale(0.8)', 'scale(1)']
    }, {
      duration: 500,
      delay: 1500 + 50 * options.captains[slideIndex - 1].length,
    });

    if (options.hasCaptain) {

      // Text Effect
      var words = captains[this.beforeSlideIndex - 1].children;
      var beforeWords = captains[slideIndex - 1].children;

      //captain when it is disappeaer
      for (let i = 0; i < words.length; i++) {
        words[i].style.opacity = 0;
      }

      for (let i = 0; i < words.length; i++) {
        words[i].animate({
          opacity: [1, 0]
        }, {
          duration: 500,
        });
      }

      //captain when it is appeaer
      for (let i = 0; i < beforeWords.length; i++) {
        beforeWords[i].style.transformOrigin = 'left top';
        setTimeout(() => {
          beforeWords[i].style.opacity = 1;
          beforeWords[i].style.transform = 'rotateX(0deg) scale(1)';
        }, 1090 + 50 * i);
      }

      for (let i = 0; i < beforeWords.length; i++) {
        beforeWords[i].animate(
          [{
              opacity: 0,
              transform: 'rotateX(360deg) scale(0)'
            },
            {
              opacity: 1,
              transform: 'rotateX(0deg) scale(1)'
            },
          ], {
            duration: 500,
            delay: 1000 + 50 * i,
          }
        );
      }
    }

    if (options.hasDescription) {
      //description when it is disappeaer

      setTimeout(() => {
        descriptions[this.beforeSlideIndex - 1].style.opacity = 0;
        descriptions[this.beforeSlideIndex - 1].style.transform = 'translate(0, 100%)';
        // descriptions[this.beforeSlideIndex - 1].style.display = 'block';
      }, 600);

      descriptions[this.beforeSlideIndex - 1].animate(
        [{
            transform: 'none',
            opacity: 1
          },
          {
            transform: 'translate(0, 100%)',
            opacity: 0
          },
        ], {
          duration: 500,
        }
      );

      //description when it is appear
      setTimeout(() => {
        descriptions[slideIndex - 1].style.opacity = 1;
        descriptions[slideIndex - 1].style.transform = 'none';
      }, 1500);

      descriptions[slideIndex - 1].animate(
        [{
            transform: 'translate(0, 100%)',
            opacity: 0
          },
          {
            transform: 'none',
            opacity: 1
          },
        ], {
          duration: 500,
          delay: 1000,
        }
      );
    }

    if (options.hasNavigation) dots[slideIndex - 1].className += ' active';
  };

  // fade effect
  this.fadeSlide = function (n) {
    var i;
    var slides = document.querySelectorAll('.slide');
    var images = document.querySelectorAll('.imageClip');
    var captains = document.querySelectorAll('.captain');
    var descriptions = document.querySelectorAll('.description');
    var dots = document.querySelectorAll('.dot');

    slideIndex = n;
    if (n > options.contents.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = images.length;
    }

    images[slideIndex - 1].animate({
      opacity: [0.4, 1]
    }, {
      duration: options.backgroundDuration * 1000,
      delay: options.backgroundDelay * 1000,
    });
    if (!options.youtube)
      setTextEffect(slideIndex, captains, descriptions);

    for (i = 0; i < images.length; i++) {
      slides[i].style.display = 'none';
      images[i].style.display = 'none';
      if (!options.youtube) {
        captains[i].style.display = 'none';
        descriptions[i].style.display = 'none';
      }
    }

    if (options.hasNavigation)
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
      }
    slides[slideIndex - 1].style.display = 'block';
    images[slideIndex - 1].style.display = 'block';

    if (options.captainDelay != 0 && options.hasCaptain) {
      this.capainTimer = setTimeout(() => {
        captains[slideIndex - 1].style.display = 'block';
      }, options.captainDelay * 1000 + 100);
    }
    if (options.descriptionDelay != 0 && options.hasDescription) {
      if (!options.textPosition.toLowerCase().includes('left') && !options.textPosition.toLowerCase().includes('right')) {
        this.waitCaptainTimer = setTimeout(() => {
          descriptions[slideIndex - 1].style.opacity = 0;
          descriptions[slideIndex - 1].style.display = 'block';
        }, options.captainDelay * 1000 + 100);
        this.descriptionTimer = setTimeout(() => {
          descriptions[slideIndex - 1].style.opacity = 1;
        }, options.descriptionDuration * 1000 + options.captainDelay * 1000 + 100);
      } else {
        this.descriptionTimer = setTimeout(() => {
          descriptions[slideIndex - 1].style.display = 'block';
          descriptions[slideIndex - 1].style.opacity = 0;
          descriptions[slideIndex - 1].style.opacity = 1;
        }, options.descriptionDelay * 1000 + 100);
      }
    }

    if (options.hasNavigation) dots[slideIndex - 1].className += ' active';
  };

  // effect to the captain and description
  this.setTextEffect = function (slideIndex, captains, descriptions) {
    captains[slideIndex - 1].animate({
      opacity: [0, 1]
    }, {
      duration: options.captainDuration * 1000,
      delay: options.captainDelay * 1000,
    });

    if (options.textPosition.toLowerCase().includes('left')) {
      descriptions[slideIndex - 1].animate([{
        transform: 'translate(-200%, 0)'
      }, {
        transform: 'translate(-100%, 0)'
      }, {
        transform: 'none'
      }], {
        duration: options.descriptionDuration * 1000,
        delay: options.descriptionDelay * 1000,
      });
    } else if (options.textPosition.toLowerCase().includes('right')) {
      descriptions[slideIndex - 1].animate([{
        transform: 'translate(200%, 0)'
      }, {
        transform: 'translate(100%, 0)'
      }, {
        transform: 'none'
      }], {
        duration: options.descriptionDuration * 1000,
        delay: options.descriptionDelay * 1000,
      });
    } else {
      descriptions[slideIndex - 1].animate({
        opacity: [0, 1]
      }, {
        duration: options.descriptionDuration * 1000,
        delay: options.captainDuration * 1000 + options.captainDelay * 1000,
      });
    }
  };

  // get the info of the youtube channel ( 10 times everytime )
  this.getYoutubeVideoList = function () {
    return new Promise((resolve, reject) => {
      var key = 'AIzaSyAatNKZJw7ty6iRK9kUDOXX8iO5_x_aePs';
      var part = 'snippet';
      var pageToken = nextPage;
      var maxResults = this.perLoadItems;
      var channelId = options.channelId;
      var order = options.order;

      var url = 'https://youtube.googleapis.com/youtube/v3/search?part=' + part + '&key=' + key + '&pageToken=' + pageToken + '&maxResults=' + maxResults + '&channelId=' + channelId + '&order=' + order + '&type=video';
      console.log(url)

      $.getJSON(url, function (data) {
        console.log(data)
        if (data.nextPageToken) {
          nextPage = data.nextPageToken;
        }

        for (let i = 0; i < data.items.length; i++) {
          temp.push('https://www.youtube.com/embed/' + data.items[i].id.videoId + '?autoplay=1')
          options.contents.push(data.items[i].snippet.thumbnails.high.url);
          options.fileType.push('image');
          options.captains.push('');
          options.descriptions.push('');
        }

        resolve(data.nextPageToken)
      });

    })
  }

  // append 10 items to slide every time 
  this.addYoutubeVideoSlide = async function () {
    await getYoutubeVideoList();

    if (options.effectType == 'fade') {
      var img;
      var panel = document.querySelector('.panel');

      for (let i = options.contents.length - 10; i < options.contents.length; i++) {
        var slide = document.createElement('div');
        var playButton = document.createElement('a');

        slide.classList.add('slide');
        slide.style.display = "none"

        if (options.fileType[i] == 'image') {
          img = document.createElement('img');
        } else img = document.createElement('iframe');
        img.setAttribute('src', options.contents[i]);
        img.classList.add('imageClip');

        playButton.classList.add('playButton')
        playButton.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" style="fill-opacity: 0.8"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>'
        playButton.setAttribute('onclick', 'showVideo()');

        slide.appendChild(img);
        slide.appendChild(playButton);

        panel.appendChild(slide);
      }
    } else {
      var transitionPanel = document.querySelector('.transitionPanel');
      transitionPanel.lastChild.style.marginRight = 0;

      for (let i = options.contents.length - 10; i < options.contents.length; i++) {
        var transitionItem = document.createElement('div');
        var transitionImageItem = document.createElement('div');
        var playButton = document.createElement('a');
        var img;

        if (options.slideDirection == 'vertical') transitionItem.classList.add('transitionVerticalItem');
        else transitionItem.classList.add('transitionHorizontalItem');
        if (i == 0) {
          if (options.slideDirection == 'horizontal') transitionItem.style.marginLeft = '15%';
          else transitionItem.style.marginTop = '15%';
        }
        if (i == options.contents.length - 1) {
          if (options.slideDirection == 'horizontal') transitionItem.style.marginRight = '15%';
          else transitionItem.style.marginBottom = '15%';
        }
        transitionImageItem.classList.add('transitionImageItem');

        if (options.fileType[i] == 'image') {
          img = document.createElement('img');
        } else img = document.createElement('iframe');
        img.setAttribute('src', options.contents[i]);
        img.classList.add('imageClip');

        playButton.classList.add('playButton')
        playButton.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" style="fill-opacity: 0.8"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>'
        playButton.setAttribute('onclick', 'showVideo()');

        transitionImageItem.appendChild(img);
        transitionItem.appendChild(transitionImageItem);
        transitionItem.appendChild(playButton);
        transitionPanel.appendChild(transitionItem);
      }
    }


    // Click prev or push
    this.plusSlides = function (n) {
      this.beforeSlideIndex = slideIndex;
      clearTimeout(this.capainTimer);
      clearTimeout(this.descriptionTimer);
      clearTimeout(this.waitCaptainTimer);
      clearInterval(this.autoPlayTimer);
      autoPlay();

      if (options.youtube && options.contents.length - slideIndex < 5) {
        addYoutubeVideoSlide();
        this.listRange += this.perLoadItems;
      }

      if (options.effectType == 'transition') transitionSlide((slideIndex += n));
      else fadeSlide((slideIndex += n));
    };

    // Click bottom button
    this.currentSlide = function (n) {
      this.beforeSlideIndex = slideIndex;
      clearTimeout(this.capainTimer);
      clearTimeout(this.descriptionTimer);
      clearTimeout(this.waitCaptainTimer);
      clearInterval(this.autoPlayTimer);
      autoPlay();
      if (options.effectType == 'transition') transitionSlide((slideIndex = n));
      else fadeSlide((slideIndex = n));
    };

    // When youtube thumbnail is clicked, it will be shown as video.
    this.showVideo = function () {
      console.log(temp)
      var slide;
      var iframe = document.createElement('iframe')

      if (options.effectType == 'fade')
        slide = document.querySelector('.panel').children[slideIndex - 1];
      else {
        slide = document.querySelector('.transitionPanel').children[slideIndex - 1];
      }

      iframe.setAttribute('src', temp[slideIndex - 1]);
      iframe.setAttribute('allow', 'autoplay');
      iframe.classList.add('imageClip');
      slide.querySelector('img').parentElement.appendChild(iframe);

      slide.querySelector('img').remove();
      slide.querySelector('.playButton')?.remove();

    };
  }

  
  // get google font family
  this.importFontFamily = function (font) {
    var fontFamily = font;
    var fontUrl = `https://fonts.googleapis.com/css?family=${fontFamily.replace(' ', '+')}`;
    var pos = fontFamily.indexOf(':');
    if (pos > 0) {
      fontFamily = fontFamily.substring(0, pos);
    }
    var link = document.createElement('link');
    link.id = 'myfontlink';
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', fontUrl);
    document.head.appendChild(link);
  };

  // slide auto play
  this.autoPlay = function () {
    if (options.autoPlay) {
      if (options.effectType == 'fade')
        this.autoPlayTimer = setInterval(() => {
          fadeSlide((slideIndex += 1));
        }, options.displayDuration * 1000);
      else
        this.autoPlayTimer = setInterval(() => {
          this.beforeSlideIndex = slideIndex;
          transitionSlide((slideIndex += 1));
        }, 3000 + 50 * options.captains[slideIndex - 1].length);
    } else {
      clearInterval(this.autoPlayTimer);
    }
  };

  // active to play button
  this.activePlayButton = function () {
    var btnPath;

    if (options.effectType == 'fade')
      btnPath = document.querySelectorAll('.slide')[slideIndex - 1].querySelector('.playButton')?.firstChild.firstChild;
    else {
      if (options.slideDirection == 'vertical') btnPath = document.querySelectorAll('.transitionVerticalItem')[slideIndex - 1].querySelector('.playButton')?.firstChild.firstChild;
      else btnPath = document.querySelectorAll('.transitionHorizontalItem')[slideIndex - 1].querySelector('.playButton')?.firstChild.firstChild;
    }

    if (btnPath) {
      btnPath.setAttribute('fill', 'rgb(255, 0, 0)');
      btnPath.style.fillOpacity = 1;
    }
  }

  // inactive to play button
  this.inactivePlayButton = function () {
    var btnPath;

    if (options.effectType == 'fade')
      btnPath = document.querySelectorAll('.slide')[slideIndex - 1].querySelector('.playButton')?.firstChild.firstChild;
    else {
      if (options.slideDirection == 'vertical') btnPath = document.querySelectorAll('.transitionVerticalItem')[slideIndex - 1].querySelector('.playButton')?.firstChild.firstChild;
      else btnPath = document.querySelectorAll('.transitionHorizontalItem')[slideIndex - 1].querySelector('.playButton')?.firstChild.firstChild;
    }

    if (btnPath) {
      btnPath.setAttribute('fill', '#212121');
      btnPath.style.fillOpacity = 0.8;
    }
  }

  this.killTimer = function () {
    clearInterval(this.autoPlayTimer);
  };

  if (typeof window.myWindowGlobalLibraryName === 'undefined') {
    window.myWindowGlobalLibraryName = multiSlideShow();
  }
})(window);