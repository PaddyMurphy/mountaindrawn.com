<template>
  <div class="mountains" v-bind:style="{ height: mountainHeight + 'px', width: mountainWidth + 'px' }">

    <svg
      width="90%"
      height="90%"
      id="svg-mountains"
      :viewBox="svgCurrentMountain.viewBox"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      v-if="svgMountainsData.length"
      >

      <defs>
        <filter id="earthShine" height="200%" width="200%" x="-75%" y="-75%">
          <!-- Thicken out the original shape -->
          <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="thicken" />
          <!-- Use a gaussian blur to create the soft blurriness of the glow -->
          <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />
          <!-- Change the colour -->
          <feFlood flood-color="rgba(0,186,255,0.5)" result="glowColor" />
          <!-- Color in the glows -->
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
          <!--  Layer the effects together -->
          <feMerge>
            <feMergeNode in="softGlow_colored"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon v-if="currentMountain === 0" id="earth-outline" filter="url(#earthShine)" fill="#CCE6F1" points="17.8025863 60.0757894 2.8334088 95.9172722 0.741210938 112.623692 10.2806369 164.704173 22.0597875 182.779748 48.5494647 209.860974 65.6242517 220.506497 73.0561523 223.449304 113.957471 235.847656 163.4824 232.924325 194.204371 222.403448 235.914213 191.666597 257.949348 154.136554 263.741211 121.370315 263.229657 103.292792 247.497939 60.2218586 233.571028 42.7753551 203.464071 19.4432373 189.238275 12.3637508 168.178349 4.98238798 125.104364 0.84765625 109.556575 1.56047387 78.08739 11.4990212 55.8146793 22.6002793 40.4642313 33.6820614"></polygon>

            <path transform="translate(327.000000, 110.000000)" d="M27,225 C44,222 97,178 104,171 C111,164 161,147 174,154 C187,161 202,197 221,199 C240,201 224,176 245,168 C266,160 288,170 291,156 C294,142 314,145 321,127 C328,109 316,81 335,84 C354,87 369,76 365,52 C364.346975,48.0818471 352,1 342,5 C332,9 299,46 281,58 C263,70 246,84 226,80 C206,76 190,74 179,66 C168,58 146,30 142,30 C138,30 132,37 138,44 C144,51 161,60 166,62 C171,64 196,78 209,91 C222,104 211,116 201,124 C191,132 90,170 68,173 C46,176 14,195 6,206 C-2,217 10,228 27,225 Z" id="motion-path"></path>

            <!-- display intially and then let js change values -->
            <polygon v-once
              v-for="n in svgCurrentMountain.rocks"
              :id="n.id"
              :fill="n.fill"
              :points="n.value">
            </polygon>

            <g v-show="currentMountain === 0" class="svg-nav">
              <!-- NOTE: using router-link prevents display -->
              <a href=""
                v-for="svg in svgNavData"
                :key="svg.name"
                @click.prevent="navigate(svg.name)"
                @mouseover="hoverMtnShortcut">
                  <polygon :data-index="svg.index" class="earth-mtn" :class="svg.class" :fill="svg.fill" :points="svg.value"></polygon>
              </a>
            </g>
        </g>
    </svg>
  </div>
</template>

<script>
// NOTE: tried using gsap with morphSvg plugin
//       but it requires a paid membership
// Animejs seems to be the only other library that animates polygons
import mountaindata from '../mountaindata.json';
import Animejs from 'animejs';

export default {
  name: 'svg-mountains',
  props: {
    id: {
      type: String,
      required: true
    },
    currentMountain: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      earthMtnActive: undefined,
      mountainHeight: 500,
      mountainWidth: 500,
      mountains: mountaindata.mountains,
      // TODO: get all svgs from images/mountains
      svgMountains: [
        require('!!raw-loader!../assets/images/earth.svg'),
        require('!!raw-loader!../assets/images/bugaboo.svg'),
        require('!!raw-loader!../assets/images/tetons.svg'),
        require('!!raw-loader!../assets/images/blanca-traverse.svg')
      ],
      svgMountainsData: [], // extracted points & fill
      svgNavData: [] // extracted points & fill
    }
  },
  computed: {
    svgCurrentMountain: function () {
      return this.svgMountainsData[this.currentMountain];
    }
  },
  watch: {
    currentMountain: 'animateSvg'
  },
  mounted: function () {
    const vm = this;

    vm.$once(vm.parseSvgList());
    vm.$once(vm.createNav());
    vm.sizeRocks();
    vm.setEvents();

    setTimeout(function () {
      vm.sizeRocks;
    }, 1000);
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.sizeRocks);
  },
  methods: {
    setEvents: function () {
      window.addEventListener('resize', this.sizeRocks);
    },
    navigate: function (mountain) {
      this.$router.push(mountain);
    },
    hover: function (mountain) {
      this.$emit('hover', mountain);
    },
    parseSvgList: function () {
      const vm = this;

      vm.svgMountains.forEach(function (d, i) {
        vm.parseSvg(i);
      })
    },
    parseSvg: function (number) {
      let polygon;
      // parse svg to grab polygon points and fill
      const vm = this;
      // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
      const parser = new DOMParser();
      const svg = parser.parseFromString(vm.svgMountains[number], 'image/svg+xml');
      // select polygons that have id with "shard-"
      const polygons = svg.querySelectorAll('polygon[id*="shard-"]');
      // create mountain object to save
      const mountain = {
        id: svg.querySelector('svg').id,
        viewBox: svg.querySelector('svg').getAttribute('viewBox'),
        rocks: [] // contains points, id, and fill
      }

      // get points, id, and fill (and viewBox?)
      // create object and push to svgMountainsData
      polygons.forEach(function (d, i) {
        // create polygon
        polygon = {
          value: d.getAttribute('points'),
          fill: d.getAttribute('fill'),
          id: d.getAttribute('id')
        }

        mountain.rocks.push(polygon);
      });

      if (mountain) {
        vm.svgMountainsData.push(mountain);
      }

      return mountain;
    },
    findMountainIndex: function (name) {
      return this.svgMountainsData.findIndex(function (o) {
        return o.id === name;
      });
    },
    createNav: function () {
      // TODO: dry this up
      let polygon;
      // parse svg to grab polygon points and fill
      const vm = this;
      // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
      const parser = new DOMParser();
      // parse earth only
      const svg = parser.parseFromString(vm.svgMountains[0], 'image/svg+xml');
      // select polygons that have id with "shard-"
      const polygons = svg.querySelectorAll('polygon[id*="nav-"]');
      // create mountain object to save
      const nav = [];

      // get points, id, and fill (and viewBox?)
      // create object and push to svgMountainsData
      polygons.forEach(function (d, i) {
        // create polygon
        polygon = {
          value: d.getAttribute('points'),
          fill: d.getAttribute('fill'),
          name: d.getAttribute('id').replace('nav-', ''),
          index: vm.findMountainIndex(d.getAttribute('id').replace('nav-', '')),
          class: d.getAttribute('id')
        }

        vm.svgNavData.push(polygon);
      });

      return nav;
    },
    animateSvg: function () {
      const vm = this;
      let delay = 0;
      let count = 0;
      let duration = 2500;
      let stagger = 33;
      let mountain = vm.svgCurrentMountain;
      let anime = Animejs.timeline();

      if (mountain.id === 'earth') {
        this.mtnShortcutReset();
      }

      mountain.rocks.forEach(function (d) {
        let selector = '#' + d.id;

        anime.add({
          delay: delay += stagger,
          duration: duration,
          easing: 'easeOutElastic',
          elasticity: 100,
          fill: d.fill,
          offset: -100 + stagger,
          points: d.value,
          targets: selector,
          complete: function (anim) {
            // start climbers
            count++;
            console.log(count);
            if (count === 30) {
              vm.$once(vm.animateClimbers());
            }
          }
        });
      });
    },
    animateClimbers: function () {
      let anime = Animejs;
      const time = 10000;
      // TODO: convert this to use #animatable
      //       hide animatables at start
      const animatables = this.$el.querySelectorAll('#shard-3, #shard-4, #shard-5');
      const path = anime.path('#motion-path');

      anime({
        targets: animatables,
        translateX: path('x'),
        translateY: path('y'),
        duration: function (el, i, l) {
          return time + (i * 600);
        },
        // delay: function (el, i, l) {
        //   return i * 100;
        // },
        loop: true,
        easing: 'linear',
        update: function (up) {
          // console.log(up);
        }
      });
    },
    sizeRocks: function () {
      // NOTE: maintain aspect ration of 5:3
      // calc height & width
      // height = new width * (original height / original width)
      // i.e. (600 / 1000) x 500 = 300
      // width = new height * (original width / original height)
      var width = document.body.offsetWidth;
      var maxHeight = this.$el.offsetHeight;
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
    mtnShortcutReset: function () {
      const earthMountains = this.$el.querySelectorAll('.earth-mtn');
      // remove hover class from icons
      earthMountains.forEach(function (mtn) {
        mtn.classList.remove('hover');
      });
    },
    hoverMtnShortcut: function (e) {
      // set active icon
      const vm = this;
      let active = parseInt(e.target.dataset.index, 10);

      vm.earthMtnActive = active
      this.$emit('setEarthMtnActive', active)

      // keep selected until another icon is hovered
      this.mtnShortcutReset();
      e.target.classList.add('hover');
    }
  }
}
</script>

<style scoped lang="scss">
  svg {
    overflow: visible;
    z-index: 1;

    polygon {
      transform-origin: 50% 50%;
    }
  }

  #motion-path {}

  .earth-mtn {
    animation: earth-mtn-out 0.2s ease-in forwards;
    transform-origin: center;
  }

  .earth-mtn.hover {
    animation: earth-mtn-hover 0.3s ease-out forwards;
  }

  @keyframes earth-mtn-out {
      0% {
        transform: scale(1.4);
      }
      100% {
        transform: scale(1);
      }
  }

  @keyframes earth-mtn-hover {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.4);
        fill: #37264B;
      }
  }
</style>
