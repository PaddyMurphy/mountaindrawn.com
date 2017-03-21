<!--
  TODO: change to svg animation
  - use velocityjs (does not support morphing)
  - gsap alternative: http://thednp.github.io/kute.js/svg.html
  - NOTE: smil animate is depricated
  <polygon id="shard-1" points="..start points..">
    <animate attributeName="points" dur="500ms" to="..end points.." />
  </polygon>
-->
<template>
  <div class="mountaindrawn" v-bind:class="{ supportsClipPath }">
    <svg style="display: none;">
      <symbol viewBox="0 0 56 49" version="1.1">
        <g id="arrow-left" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon id="arrow-top" points="1 24.8554688 55.6601562 0.23828125 53.0319031 24.8554688"></polygon>
            <polygon id="arrow-bottom" points="0.74609375 25.4101562 55.40625 48.859375 53.3203125 24.2421875"></polygon>
        </g>
      </symbol>
    </svg>

    <div class="container">
      <div class="logo">MountainDrawn</div>

      <h1 class="title"></h1>

      <div class="title-nav">
        <a href="#" class="nav-arrow nav-left" v-on:click="navigateLeft">
          <svg class="arrow-left" viewBox="0 0 56 49">
            <use xlink:href="#arrow-left" />
          </svg>
        </a>

        <a href="#" class="nav-earth" v-on:click="navigateEarth"></a>

        <a href="#" class="nav-arrow nav-right" v-on:click="navigateRight">
          <svg class="arrow-right" viewBox="0 0 56 49">
            <use xlink:href="#arrow-left" />
          </svg>
        </a>
      </div>

      <div class="mountains-wrapper">
        <div class="mountains" v-bind:style="{ height: mountainHeight + 'px', width: mountainWidth + 'px' }">
          <div v-for="n in 30" class="rock"></div>

          <!-- earth's mountains -->
          <div class="earth-mtn earth-mtn-bugaboo" data-mountain="bugaboo" data-index="1" v-on:mouseover="hoverMtnShortcut"></div>
          <div class="earth-mtn earth-mtn-tetons" data-mountain="tetons" data-index="2" v-on:mouseover="hoverMtnShortcut"></div>
          <div class="earth-mtn earth-mtn-blanca-traverse" data-mountain="blanca-traverse" data-index="3" v-on:mouseover="hoverMtnShortcut"></div>
          <div class="earth-mtn earth-mtn-glacier-peak" data-mountain="glacier-peak" data-index="4" v-on:mouseover="hoverMtnShortcut"></div>

          <div class="earth-outline"></div>
        </div>

        <!-- no clip-path support -->
        <div class="static-mountains">
            <div class="static-mountain"></div>
        </div>

        <div class="data" v-if="title">
          <span class="data-close"></span>
          <div class="data-content">
            <h2 class="data-title">{{ title }}</h2>
            <p class="data-elevation">elevation
              <b>{{ elevation }}</b></p>
            <p class="data-prominence">prominence {{ prominence }}</p>
            <p class="data-description">{{ description }}</p>
          </div>
          <div class="data-photos"></div>
        </div>
      </div><!-- END .mountains-wrapper -->

    </div><!-- END .container -->

    <div class="content">
      <svg class="svg-camping" width="74px" height="43px" viewBox="0 0 78 43">
          <g class="svg-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M66.6605656,36.6542958 L65.5026649,42 L73.1301837,42 L70.5028819,36.6542958 L77.2353516,36.6542958 L65.6220703,10 L60,36.6542958 L66.6605656,36.6542958 Z" class="svg-part svg-tree-1"></path>
            <path d="M32,42 L48.0947266,22 L61.9858398,42 L32,42 Z M38.5556641,41.1205474 L44.8624445,31.2734957 L50.2522381,41.0467904 L38.5556641,41.1205474 Z" class="svg-part svg-tent"></path>
            <path d="M23.9510131,35.9025137 L22.5026649,42 L30.1301837,42 L28.1930637,35.3999763 L36.2460938,34.4459685 L26.6230469,0.275390625 L17,36.7259703 L23.9510131,35.9025137 Z" class="svg-part svg-tree-2"></path>
            <path d="M9.69876136,38.3261376 L10.5302734,42.0888672 L2.11914062,42.0888672 L5.04362045,38.172106 L0.580078125,38.0244141 L17.7207031,10.2939453 L14.0087891,38.46875 L9.69876136,38.3261376 Z" class="svg-part svg-tree-3"></path>
          </g>
      </svg>
      <div class="about-container">
        <div class="about-block">
          <h3>About</h3>
          <p>Mountaindrawn is the personal site of UI/UX developer Patrick Lewis. The original site  built 7 years ago was a challenge for myself to create a hand drawn website featuring climbing trips (I kept an <a href="/dist/archived/blog/index.html">archived version</a>).</p>

          <p>The current revision of mountaindrawn illustrates climbing trips using more recent technology than the pen & ink and watercolor used to create the original. The idea was to use all svg but after reading the <a href="https://www.html5rocks.com/en/tutorials/masking/adobe/">htmlrocks article on clipping</a> and seeing the amazingly simple <a href="http://species-in-pieces.com/">species-in-pieces</a> project I went with css clip-path. Svg illustrations are displayed if clip-path is not supported. (see <a href="http://caniuse.com/#search=clip-path">current support</a>)</p>

          <p>The main purpose for doing this project was to learn some new technologies and techniques. Much of what I learned came from other blog posts, articles and examples on codepen. Feel free to learn from and use the <a href="https://github.com/PaddyMurphy/paddymurphy.github.io">source of this project.</a></p>

          <p>There are several more mountains and route I plan on adding soon. A few at the top of the list are El Portrero Chico featuring the classic Estrallita, Mt Rainier Kautz Glacier Route, and the Mt Baker Coleman Headwall.</p>

          <p>The <a href="/riverflow">Texas Riverflow app</a> is still available.</p>
        </div>

        <div class="photos-container">
          <h3>The Mountains</h3>
          <a href="#/bugaboo" class="earth-mtn-hover" data-mountain="bugaboo">
            <img data-original="dist/images/photos/mtn-sm-bugaboo-1.jpg" width="150" height="150" title="The Bugaboos">
          </a>
          <a href="#/blanca-traverse" class="earth-mtn-hover" data-mountain="blanca-traverse">
            <img data-original="dist/images/photos/mtn-sm-blanca-traverse-1.jpg" width="150" height="150" title="Little Bear - Blanca Traverse">
          </a>
          <a href="#/tetons" class="earth-mtn-hover" data-mountain="tetons">
            <img data-original="dist/images/photos/mtn-sm-tetons-1.jpg" width="150" height="150" title="The Grand Teton">
          </a>
          <a href="#/glacier-peak" class="earth-mtn-hover" data-mountain="glacier-peak">
            <img data-original="dist/images/photos/mtn-sm-glacier-peak-1.jpg" width="150" height="150" title="Glacier peak">
          </a>
        </div>
      </div>
      <footer>This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike</a>. Take what you need and share.</footer>
    </div>
    <div class="satellite-wrapper">
      <div class="earth-satellite earth-satellite-1"></div>
      <div class="earth-satellite earth-satellite-2"></div>
    </div>
    <div class="starfield-wrapper">
      <div class="starfield starfield-1"></div>
      <div class="starfield starfield-2"></div>
      <div class="starfield starfield-3"></div>
      <transition name="animate">
        <div class="shooting-star"
          v-bind:class="{ animate: showShootingStar }"
          v-bind:style="{ top: starTop, left: starLeft, width: starWidth }"
        ></div>
      </transition>
    </div>
  </div>
</template>

<script>
import mountaindata from '../mountaindata.json';
import supports from '../test-clip-path.js';

export default {
  name: 'mountain',
  data () {
    return {
      currentMountain: 0,
      description: '',
      elevation: '',
      prominence: '',
      title: '',
      earthStarted: false,
      earthMtnActive: '',
      mountains: mountaindata.mountains,
      length: mountaindata.mountains.length - 1,
      mountainHeight: 500,
      mountainWidth: 500,
      showShootingStar: false,
      supportsClipPath: 'no-clip-path',
      starTop: null,
      starLeft: null,
      starWidth: null
    }
  },
  mounted: function () {
    this.sizeshards();
    this.setEvents();
    // init earth sequence
    if (document.body.dataset.mountain === 'earth') {
      this.earthSequence();
    }
    // test for clip-path support
    if (supports.areClipPathShapesSupported()) {
      this.supportsClipPath = 'supports-clip-path';
      // TODO: setMtnClickEvents();
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.sizeshards);
  },
  watch: {
    currentMountain: 'navigate'
  },
  methods: {
    setEvents: function () {
      window.addEventListener('resize', this.sizeshards);
      // TODO: does vue handle transitionend event?
      this.$el.querySelector('.shooting-star')
        .addEventListener('transitionend', this.shootingStarEnd, false);
    },
    navigateRight: function () {
      // start at beginning again if at end
      this.currentMountain = (this.currentMountain === this.length) ? 0 : (this.currentMountain + 1);
    },
    navigateLeft: function () {
      // start at end again if at beginning
      this.currentMountain = (this.currentMountain === 0) ? this.length : (this.currentMountain - 1);
    },
    navigate: function () {
      // navigate accepts position in array
      // @requires mewMountain (number)
      var mountainId = this.mountains[this.currentMountain].id;
      // get id and set to body dataset
      document.body.dataset.mountain = mountainId;
      this.setData();
      // TODO
      // Router.navigate('#/' + mountain);
      // getMountainImages(mountain);
    },
    setData: function () {
      // set title, description, elevation, & prominence
      var mountain = this.mountains[this.currentMountain];

      this.title = mountain.title;
      this.description = mountain.description;
      this.elevation = mountain.elevation;
      this.prominence = mountain.prominence;

      // only show if there is a title
      // earth is blank so hide it
      // if (this.title.length) {
      //   // show the data box
      //   data.classList.remove('transparent');
      // } else {
      //   // hide data for earth
      //   data.classList.add('transparent');
      // }
    },
    sizeshards: function () {
      // NOTE: maintain aspect ration of 5:3
      // calc height & width
      // height = new width * (original height / original width)
      // i.e. (600 / 1000) x 500 = 300
      // width = new height * (original width / original height)
      var width = document.body.offsetWidth;
      var maxHeight = this.$el.querySelector('.container').offsetHeight - 50;
      var w = width;
      var h = Math.round(0.60 * w);
      var ratio = (w / h); // 5:3

      if (h > maxHeight) {
        // console.log('maxed');
        w = maxHeight * ratio;
        h = maxHeight;
      }

      this.mountainWidth = w;
      this.mountainHeight = h;
    },
    getRandomInRange: function (min, max) {
      // return an integer from a range
      return Math.round((Math.random() * (max - min) + min));
    },
    animateShootingStar: function () {
      // keep at top half of screen
      // set new top, left, and width
      this.starTop = this.getRandomInRange(-10, 30) + 'vh';
      this.starLeft = this.getRandomInRange(-20, 70) + 'vw';
      this.starWidth = this.getRandomInRange(10, 35) + 'vw';
      // start animation
      this.showShootingStar = true;
    },
    shootingStarEnd: function () {
      this.showShootingStar = false;
    },
    navigateEarth: function () {
      this.currentMountain = 0;
    },
    earthSequence: function () {
      // reset the mountain shortcuts
      // mtnShortcutReset();
      // only execute once - occurs on /#/earth bookmarked route
      var that = this;

      if (this.earthStarted) {
        return;
      }
      // animate the shooting star
      // NOTE: ensure timing exceeds transition timing
      (function loop () {
        // activate shooting star at random interval
        setTimeout(function () {
          that.animateShootingStar();
          loop();
        }, that.getRandomInRange(5000, 12000));
      }());

      this.earthStarted = true;
    },
    hoverMtnShortcut: function (e) {
      this.earthMtnActive = e.target.dataset.mountain;
      // console.log(this.earthMtnActive);
      // console.log(this.getMountainIndex());
      // show mountain info on hover
      this.setData(this.earthMtnActive);
      // // keep selected until another hover
      // mtnShortcutReset();
      // // show the photos
      // getMountainImages(e.target.dataset.mountain);

      // e.target.classList.add('hover');
      // data.classList.add('animate');
    }
  }
}

// TODO:
// event handlers:
//   nav, keyboard, resize

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/scss/_variables.scss';
@import '../assets/scss/_utilities.scss';
@import '../assets/scss/_earth.scss';
@import '../assets/scss/_bugaboo.scss';
@import '../assets/scss/_blanca-traverse.scss';
@import '../assets/scss/_glacier-peak.scss';
@import '../assets/scss/_tetons.scss';

h1 {
  color: $link-dark;
}
</style>
