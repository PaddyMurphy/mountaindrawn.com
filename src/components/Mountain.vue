<template>
  <div class="mountaindrawn">
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

      <h1 class="title">{{ title }}</h1>

      <div class="title-nav">

        <router-link
          class="nav-arrow nav-left"
          :to="previousMountainId">
          <svg class="arrow-left" viewBox="0 0 56 49">
            <use xlink:href="#arrow-left" />
          </svg>
        </router-link>

        <router-link
          class="nav-earth"
          :to="'earth'"
          @click.native="navigateEarth">
        </router-link>

        <router-link
          class="nav-arrow nav-right"
          :to="nextMountainId">
          <svg class="arrow-right" viewBox="0 0 56 49">
            <use xlink:href="#arrow-left" />
          </svg>
        </router-link>
      </div>

      <div class="mountains-wrapper">

        <svg-mountains
          :id="id"
          :currentMountain="currentMountain"
          v-on:setEarthMtnActive="setEarthMtnActive"
        />

        <div class="data" :class="{transparent: !photos}" @click="clickData">
          <div class="data-content">
            <h2 class="data-title">{{ title }}</h2>
            <p class="data-elevation">elevation
              <b>{{ elevation }}</b></p>
            <p class="data-prominence">prominence {{ prominence }}</p>
            <p class="data-description">{{ description }}</p>
          </div>

          <div class="data-photos">
            <photos
              v-for="photo in photos"
              :photo="photo"
              :key="photo.src"
            >
            </photos>
          </div>
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

        <about />

        <div class="photos-container">
          <h3>The Mountains</h3>

          <mountain-photo-nav
            v-for="(mountain, index) in mountains"
            :mountain="mountain"
            :key="mountain.id"
            :index="index"
            :setCurrentMountain="setCurrentMountain"
            >
          </mountain-photo-nav>
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
// TODO: only using debounce so far - should remove or limit
import _ from 'lodash';
import mountaindata from '../mountaindata.json';
import Blazy from 'bLazy';
import Baguettebox from 'baguettebox.js';
import About from '@/components/About';
import SvgMountains from '@/components/SvgMountains';
import Photos from '@/components/Photos';
import MountainPhotoNav from '@/components/MountainPhotoNav';

export default {

  name: 'mountain',
  data () {
    return {
      currentMountain: 0,
      description: undefined,
      earthMtnActive: undefined,
      elevation: undefined,
      id: 'earth',
      length: mountaindata.mountains.length - 1,
      mountains: mountaindata.mountains,
      photos: undefined,
      prominence: undefined,
      shootingStarTimeout: undefined,
      showData: false,
      showShootingStar: false,
      starLeft: undefined,
      starTop: undefined,
      starWidth: undefined,
      title: undefined
    }
  },
  components: {
    'about': About,
    'svg-mountains': SvgMountains,
    'photos': Photos,
    'mountain-photo-nav': MountainPhotoNav
  },
  mounted () {
    var vm = this;

    // navigate to bookmarked url
    if (vm.$route.name === 'MountainUrl') {
      vm.currentMountain = vm.mountains.findIndex(vm.returnIndex);
    }

    // init earth sequence
    if (vm.$route.path === ('/') ||
        vm.$route.path === ('/earth')) {
      vm.earthSequence();
    }

    vm.setEvents();

    setTimeout(function () {
      var bLazy = new Blazy({ // eslint-disable-line
        offset: -70
      });
    }, 1000);
  },
  watch: {
    currentMountain: 'navigate',
    '$route' (to, from) {
      const vm = this;
      // navigate by setting mountain
      vm.setCurrentMountain(to.params.mountain);
      // enable earth sequence
      if (from.path === '/' || from.path === '/earth') {
        vm.clearStarTimeout();
      }
      // disable earth sequence
      if (to.path === '/' || to.path === '/earth') {
        vm.earthSequence();
      }
    }
  },
  computed: {
    nextMountainIndex: function () {
      return (this.currentMountain === this.length) ? 0 : (this.currentMountain + 1);
    },
    nextMountainId: function () {
      return this.mountains[this.nextMountainIndex].id;
    },
    previousMountainIndex: function () {
      return (this.currentMountain === 0) ? this.length : (this.currentMountain - 1);
    },
    previousMountainId: function () {
      return this.mountains[this.previousMountainIndex].id;
    }
  },
  methods: {
    setEvents: function () {
      // window.addEventListener('resize', this.sizeRocks);
      document.onkeydown = _.debounce(this.checkKey, 500);
      // TODO: vue handles transitionend event
      this.$el.querySelector('.shooting-star')
        .addEventListener('transitionend', this.shootingStarEnd, false);
    },
    navigateRight: function () {
      // start at beginning again if at end
      this.currentMountain = this.nextMountainIndex;
    },
    navigateLeft: function () {
      // start at end again if at beginning
      this.currentMountain = this.previousMountainIndex;
    },
    navigate: function () {
      var mountainId = this.mountains[this.currentMountain].id;

      // get id and set to body dataset
      document.body.dataset.mountain = mountainId;

      this.setData();
    },
    returnIndex: function (el) {
      // find index from route mountain param
      return el.id === this.$route.params.mountain;
    },
    setCurrentMountain: _.debounce(function (index) {
      // @index (string or number)
      // TODO: convert all params to index or id
      if (typeof (index) === 'string') {
        this.currentMountain = this.mountains.findIndex(this.returnIndex);
      } else {
        this.currentMountain = index;
      }
    }, 300),
    findMountainIndex: function (name) {
      // @requires name (string)
      return this.mountains.findIndex(function (o) {
        return o.id === name;
      });
    },
    setData: function (id) {
      var vm = this;
      // @id (optional) pass in mountain or use currentMountain
      // used to navigate and set photos
      var mountain = this.mountains[id] || this.mountains[this.currentMountain];

      // set title, description, elevation, & prominence
      this.title = mountain.title;
      this.description = mountain.description;
      this.elevation = mountain.elevation;
      this.id = mountain.id;
      this.prominence = mountain.prominence;
      this.photos = this.mountains[vm.findMountainIndex(mountain.id)].photos;
      this.setupPhotoGallery();
    },
    setupPhotoGallery: function () {
      // TODO: should only init once.
      setTimeout(function () {
        Baguettebox.run('.data-photos', {
          fullScreen: false
        });
      }, 0);
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
      var vm = this;
      // reset the mountain shortcuts
      // mtnShortcutReset();

      // animate the shooting star
      // NOTE: ensure timing exceeds transition timing
      (function loop () {
        // activate shooting star at random interval
        vm.shootingStarTimeout = window.setTimeout(function () {
          vm.animateShootingStar();
          loop();
        }, vm.getRandomInRange(5000, 12000));
      }());
    },
    clearStarTimeout: function () {
      if (this.shootingStarTimeout) {
        window.clearTimeout(this.shootingStarTimeout);
      }
    },
    setEarthMtnActive: function (active) {
      this.earthMtnActive = active;
      this.setData(active);
    },
    clickData: function () {
      // only click if earth
      // TODO: earthMtnActive is in svgMountains
      if (this.currentMountain === 0) {
        this.currentMountain = this.earthMtnActive;
      }
    },
    checkKey: function (e) {
      // TODO: update url on key navigation
      if (e.keyCode === 37) {
        // left arrow
        this.navigateLeft();
      } else if (e.keyCode === 39) {
        // right arrow
        this.navigateRight();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/scss/_baguetteBox.scss';
@import '../assets/scss/_variables.scss';
@import '../assets/scss/_utilities.scss';
@import '../assets/scss/_earth.scss';
@import '../assets/scss/_bugaboo.scss';
@import '../assets/scss/_blanca-traverse.scss';
@import '../assets/scss/_glacier-peak.scss';
@import '../assets/scss/_tetons.scss';
</style>
