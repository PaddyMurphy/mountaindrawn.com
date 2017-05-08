webpackJsonp([0,2],[,,function(t,n,o){"use strict";var i=o(1),s=o(34),e=o(22),l=o.n(e);i.a.use(s.a),n.a=new s.a({routes:[{path:"/",name:"Mountain",component:l.a},{path:"/:mountain",name:"MountainUrl",component:l.a}]})},function(t,n,o){o(16);var i=o(0)(o(6),o(30),null,null);t.exports=i.exports},,,function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"app"}},function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"about"}},function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=o(37),s=o.n(i),e=o(5),l=o.n(e),a=o(13),r=o.n(a),p=o(21),d=o.n(p),g=o(26),h=o.n(g),u=o(25),c=o.n(u),f=o(23),v=o.n(f),y=o(24),m=o.n(y);n.default={name:"mountain",data:function(){return{currentMountain:0,description:null,earthMtnActive:null,earthStarted:!1,elevation:null,id:"earth",length:s.a.mountains.length-1,mountains:s.a.mountains,photos:null,prominence:null,showData:!1,showShootingStar:!1,starLeft:null,starTop:null,starWidth:null,title:null}},components:{about:d.a,"svg-mountains":h.a,photos:c.a,"mountain-photo-nav":m.a,"mountain-earth-nav":v.a},mounted:function(){var t=this;"MountainUrl"===t.$route.name&&(t.currentMountain=t.mountains.findIndex(t.returnIndex)),t.setEvents(),setTimeout(function(){new l.a({offset:-70})},1e3),"earth"===document.body.dataset.mountain&&t.earthSequence()},watch:{currentMountain:"navigate"},computed:{svgCurrentMountain:function(){return this.svgMountainsData[this.currentMountain]},nextMountainIndex:function(){return this.currentMountain===this.length?0:this.currentMountain+1},nextMountainId:function(){return this.mountains[this.nextMountainIndex].id},previousMountainIndex:function(){return 0===this.currentMountain?this.length:this.currentMountain-1},previousMountainId:function(){return this.mountains[this.previousMountainIndex].id}},methods:{setEvents:function(){document.onkeydown=this.checkKey,this.$el.querySelector(".shooting-star").addEventListener("transitionend",this.shootingStarEnd,!1)},navigateRight:function(){this.currentMountain=this.nextMountainIndex},navigateLeft:function(){this.currentMountain=this.previousMountainIndex},navigate:function(){var t=this.mountains[this.currentMountain].id;document.body.dataset.mountain=t,this.photos=this.mountains[this.currentMountain].photos,this.setData()},returnIndex:function(t){return t.id===this.$route.params.mountain},setCurrentMountain:function(t){"string"==typeof t?this.currentMountain=this.mountains.findIndex(this.returnIndex):this.currentMountain=t},setData:function(t){var n=this.mountains[t]||this.mountains[this.currentMountain];this.title=n.title,this.description=n.description,this.elevation=n.elevation,this.id=n.id,this.prominence=n.prominence,this.setupPhotoGallery()},setupPhotoGallery:function(){setTimeout(function(){r.a.run(".data-photos",{fullScreen:!1})},0)},getRandomInRange:function(t,n){return Math.round(Math.random()*(n-t)+t)},animateShootingStar:function(){this.starTop=this.getRandomInRange(-10,30)+"vh",this.starLeft=this.getRandomInRange(-20,70)+"vw",this.starWidth=this.getRandomInRange(10,35)+"vw",this.showShootingStar=!0},shootingStarEnd:function(){this.showShootingStar=!1},navigateEarth:function(){this.currentMountain=0},earthSequence:function(){var t=this;this.earthStarted||(!function n(){setTimeout(function(){t.animateShootingStar(),n()},t.getRandomInRange(5e3,12e3))}(),this.earthStarted=!0)},hoverMtnShortcut:function(t){this.earthMtnActive=parseInt(t.target.dataset.index,10),this.photos=this.mountains[this.earthMtnActive].photos,this.setData(this.earthMtnActive),this.mtnShortcutReset(),t.target.classList.add("hover")},mtnShortcutReset:function(){var t=this.$el.querySelectorAll(".earth-mtn");t.forEach(function(t){t.classList.remove("hover")})},clickMtnShortcut:function(t){this.currentMountain=parseInt(t.target.dataset.index,10)},clickData:function(){0===this.currentMountain&&(this.currentMountain=this.earthMtnActive)},checkKey:function(t){37===t.keyCode?this.navigateLeft():39===t.keyCode&&this.navigateRight()}}}},function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"mountain-earth-nav",props:["index","mountain","clickMtnShortcut","hoverMtnShortcut"]}},function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"mountain-photo-nav",props:["index","mountain","setCurrentMountain"]}},function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"photos",props:["photo"]}},function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=o(4),s=o.n(i);n.default={name:"svg",props:{id:{type:String,required:!0},currentMountain:{type:Number,required:!0}},data:function(){return{mountainHeight:500,mountainWidth:500,svgMountains:[o(19),o(18),o(20),o(17)],svgMountainsData:[]}},computed:{svgCurrentMountain:function(){return this.svgMountainsData[this.currentMountain]}},watch:{id:"animateSvg"},mounted:function(){var t=this;t.$once(t.parseSvgList()),t.sizeRocks(),t.setEvents()},beforeDestroy:function(){window.removeEventListener("resize",this.sizeRocks)},methods:{setEvents:function(){window.addEventListener("resize",this.sizeRocks)},parseSvgList:function(){var t=this;t.svgMountains.forEach(function(n,o){t.parseSvg(o)})},parseSvg:function(t){var n=void 0,o=this,i=new DOMParser,s=i.parseFromString(o.svgMountains[t],"image/svg+xml"),e=s.querySelectorAll('polygon[id*="shard-"]'),l={id:s.querySelector("svg").id,viewBox:s.querySelector("svg").getAttribute("viewBox"),rocks:[]};return e.forEach(function(t,o){n={value:t.getAttribute("points"),fill:t.getAttribute("fill"),id:t.getAttribute("id")},l.rocks.push(n)}),l&&o.svgMountainsData.push(l),l},animateSvg:function(){var t=this,n=0,o=2500,i=33,e=t.svgCurrentMountain,l=s.a.timeline();e.rocks.forEach(function(t){var s="#"+t.id;l.add({delay:n+=i,duration:o,easing:"easeOutElastic",elasticity:100,fill:t.fill,offset:-100+i,points:t.value,targets:s})})},sizeRocks:function(){var t=document.body.offsetWidth,n=this.$el.offsetHeight,o=t,i=Math.round(.6*o),s=o/i;i>n&&(o=n*s,i=n),this.mountainWidth=o,this.mountainHeight=i}}}},,function(t,n){},function(t,n){},function(t,n){},function(t,n){t.exports='<svg id="blanca-traverse" width="100%" height="100%" viewBox="0 0 470 258" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <polygon id="shard-1" fill="#2D354A" points="141.4375 25.2382812 324.867188 185.699219 65.9082031 145.662109"></polygon>\n        <polygon id="shard-2" fill="#64646E" points="242.566406 77.8066406 296.037109 163.134766 185 64.1542969"></polygon>\n        <polygon id="shard-3" fill="#93AFF8" points="6.359375 144.949219 33.4853454 196.625 329.332031 188.558594"></polygon>\n        <polygon id="shard-4" fill="#2D354A" points="242.327148 77.6523438 344.052734 85.4101562 313.823242 192.136719"></polygon>\n        <polygon id="shard-5" fill="#64646E" points="242.68457 78.0200195 368.445312 88.7441406 312.648438 13.1025391"></polygon>\n        <polygon id="shard-6" fill="#EBE5E7" points="204.913086 180.294922 333.953125 199.385742 246.170898 257.857422"></polygon>\n        <polygon id="shard-7" fill="#AEA8AA" points="204.634766 180.248047 332.928711 199.394531 236.737305 157.15625"></polygon>\n        <polygon id="shard-8" fill="#EBE5E7" points="257.618164 166.311523 334.283203 200.269531 277.982422 122.072266"></polygon>\n        <polygon id="shard-9" fill="#AEA8AA" points="277.723633 121.77832 333.547852 199.828125 395.291992 209.035156"></polygon>\n        <polygon id="shard-10" fill="#2D354A" points="369.367188 6.34277344 411.614502 86.736084 338.251953 103.421875"></polygon>\n        <polygon id="shard-11" fill="#EBE5E7" points="316.924805 74.2333984 345.266602 172.801758 302.935547 141.009766"></polygon>\n        <polygon id="shard-12" fill="#AEA8AA" points="317.063477 74.7519531 345.243164 172.490234 359.732422 91.3662109"></polygon>\n        <polygon id="shard-13" fill="#64646E" points="358.861328 91.2636719 345.392578 171.766602 399.918945 87.9384766"></polygon>\n        <polygon id="shard-14" fill="#64646E" points="470.029297 197.457031 448.820312 81.6992188 369.03125 6.00195312"></polygon>\n        <polygon id="shard-15" fill="#EBE5E7" points="400.077148 87.4023438 395.11084 209.119873 345.336914 171.943359"></polygon>\n        <polygon id="shard-16" fill="#AEA8AA" points="369.349609 6.27832031 338.101562 0.908203125 350.712891 14.2617188"></polygon>\n        <polygon id="shard-17" fill="#64646E" points="351.03418 14.1865234 369.805664 5.87011719 349.255371 69.0742188"></polygon>\n        <polygon id="shard-18" fill="#AEA8AA" points="417 80 400 88 395.136963 209.307617"></polygon>\n        <polygon id="shard-19" fill="#2D354A" points="351 14 349.255127 69.0418701 318.941406 22.7441406"></polygon>\n        <polygon id="shard-20" fill="#64646E" points="351.37207 14.0566406 318.894531 22.890625 338.351562 0.961914062"></polygon>\n        <polygon id="shard-21" fill="#AEA8AA" points="246.209225 257.516113 150.515625 172.997559 167.275391 108.703125"></polygon>\n        <polygon id="shard-22" fill="#64646E" points="167.240234 110.794922 151.117188 175.445312 106.544922 157.322266"></polygon>\n        <polygon id="shard-23" fill="#AEA8AA" points="151.260254 172.931641 107.036133 154.883789 110.304688 216.550781"></polygon>\n        <polygon id="shard-24" fill="#EBE5E7" points="151.070312 172.741699 246.308594 257.333008 109.852539 216.036112"></polygon>\n        <polygon id="shard-25" fill="#64646E" points="107.12793 154.865234 110.674805 216.754883 10.9648438 230.025391"></polygon>\n        <polygon id="shard-26" fill="#E91A5F" points="0 219 6.68554688 221.445312 4.57421875 240.873047"></polygon>\n        <polygon id="shard-27" fill="#E3E256" points="14.8900537 226 18.7809885 211.385781 13 209"></polygon>\n        <polygon id="shard-28" fill="#23AE2F" points="20.8900537 243 24.7809885 228.385781 19 226"></polygon>\n        <polygon id="shard-29" fill="#64646E" points="141.582031 25.0820312 66.2226562 145.808594 30.6640625 126.53125"></polygon>\n        <polygon id="shard-30" fill="#EBE5E7" points="417 80 470 198 395 209"></polygon>\n    </g>\n</svg>'},function(t,n){t.exports='<svg id="bugaboo" width="100%" height="100%" viewBox="0 0 376 275" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g id="mountain" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <polygon id="shard-30" fill="#E5DED9" points="163.355469 16.9257812 174.003906 25.8339844 169.189453 55.0039062"></polygon>\n        <polygon id="shard-29" fill="#C1B8AE" points="184.516602 28.7265625 205.601562 44.6699219 191.988281 68.6191406"></polygon>\n        <polygon id="shard-28" fill="#C1B8AE" points="174.074219 26.3710938 169.25 56.0703125 192.47168 69.0576172"></polygon>\n        <polygon id="shard-27" fill="#7D7771" points="164.348633 23.6757812 159.217773 51.1621094 169.375977 57.4443359"></polygon>\n        <polygon id="shard-26" fill="#7D7771" points="159.727539 51.2910156 161.03125 135.453125 134.839844 110.918945"></polygon>\n        <polygon id="shard-25" fill="#3E3D3D" points="159.569336 50.8740234 192.111328 68.5996094 160.310547 134.850586"></polygon>\n        <polygon id="shard-24" fill="#7D7771" points="174.172852 26.6708984 185 29 192.351562 68.7890625"></polygon>\n        <polygon id="shard-23" fill="#7D7771" points="192.247559 67.9799805 215.570312 149.859375 128.525391 201.425781"></polygon>\n        <polygon id="shard-22" fill="#3E3D3D" points="206 48 214.59375 48.5654297 215.762695 151.053711"></polygon>\n        <polygon id="shard-21" fill="#E5DED9" points="215.149414 54.1757812 287.6875 137.693359 242.014648 161.359375"></polygon>\n        <polygon id="shard-20" fill="#C3BAB0" points="214.692383 51.2348633 215.754883 150.134277 242.120117 162.006836"></polygon>\n        <polygon id="shard-19" fill="#C3BAB0" points="286.938477 137.374023 304.348633 188.4375 241.551758 161.62793"></polygon>\n        <polygon id="shard-18" fill="#7D7771" points="216.197266 149.578125 242.265625 161.681641 138.230469 249.066406"></polygon>\n        <polygon id="shard-17" fill="#C3BAB0" points="216.464844 149.318359 51.1347656 247.432617 139.268555 248.608398"></polygon>\n        <polygon id="shard-16" fill="#3E3D3D" points="242.325195 161.431641 138.974609 248.612305 244.625 232.123047"></polygon>\n        <polygon id="shard-15" fill="#7D7771" points="242.381836 161.864258 244.605469 232.345703 375.296875 274.274414"></polygon>\n        <polygon id="shard-14" fill="#E5DED9" points="242.22168 161.652344 328.919922 199.019531 303.277344 213.048828"></polygon>\n        <polygon id="shard-13" fill="#C3BAB0" points="302.907227 213.354492 374.789062 274.123047 328.475586 198.916992"></polygon>\n        <polygon id="shard-12" fill="#3E3D3D" points="160.847656 134.807617 128.870117 201.605469 135.000977 110.211914"></polygon>\n        <polygon id="shard-11" fill="#7D7771" points="134.074219 127.891602 107.791992 164.267578 129.18457 201.041992"></polygon>\n        <polygon id="shard-10" fill="#C3BAB0" points="108.208008 164.166016 6.38671875 253.28125 129.073242 200.449219"></polygon>\n        <polygon id="shard-9" fill="#7D7771" points="129.758789 200.439453 7.21191406 252.661133 52.5986328 247.354492"></polygon>\n        <polygon id="shard-8" fill="#E5DED9" points="135.515625 11.9882812 120.828125 5.19140625 122.810547 11.5996094"></polygon>\n        <polygon id="shard-7" fill="#E5DED9" points="147.675781 7.61523437 155.232422 4.65234375 152.251953 8.85742188"></polygon>\n        <polygon id="shard-6" fill="#C3BAB0" points="53.3652344 0.94921875 45.3261719 4.04101562 60.7734375 5.41210937"></polygon>\n        <polygon id="shard-5" fill="#2DA655" points="26 242 30.5742188 263.873047 32.6855469 244.445312"></polygon>\n        <polygon id="shard-4" fill="#D03C24" points="0 226 4.57421875 247.873047 6.68554688 228.445312"></polygon>\n        <polygon id="shard-3" fill="#DEE61A" points="8 242 12.5742188 263.873047 14.6855469 244.445312"></polygon>\n        <polygon id="shard-2" fill="#E5DED9" points="83 8 83 13.625 88 17"></polygon>\n        <polygon id="shard-1" fill="#E5DED9" points="192 68 216 151 206 44"></polygon>\n    </g>\n</svg>'},function(t,n){t.exports='<svg id="earth" width="100%" height="100%" viewBox="0 0 264 236" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <polygon id="earth-outline" fill="#CCE6F1" points="17.8025863 60.0757894 2.8334088 95.9172722 0.741210938 112.623692 10.2806369 164.704173 22.0597875 182.779748 48.5494647 209.860974 65.6242517 220.506497 73.0561523 223.449304 113.957471 235.847656 163.4824 232.924325 194.204371 222.403448 235.914213 191.666597 257.949348 154.136554 263.741211 121.370315 263.229657 103.292792 247.497939 60.2218586 233.571028 42.7753551 203.464071 19.4432373 189.238275 12.3637508 168.178349 4.98238798 125.104364 0.84765625 109.556575 1.56047387 78.08739 11.4990212 55.8146793 22.6002793 40.4642313 33.6820614"></polygon>\n        <polygon id="shard-1" fill="#A1C276" points="65.828125 17.7929688 18.6835938 84.734375 78.859375 33.0742188"></polygon>\n        <polygon id="shard-2" fill="#6C8649" points="78.9160156 32.7548828 64.2978516 70.0966797 44.7832031 62.2841797"></polygon>\n        <polygon id="shard-3" fill="#90B165" points="77.6777344 35.6679688 101.25 66.5761719 64.2675781 69.7226562"></polygon>\n        <polygon id="shard-4" fill="#AED180" points="45.2597656 62.2041016 118.392578 90.7011719 59.2099609 95.5107422"></polygon>\n        <polygon id="shard-5" fill="#A1C276" points="64.0478516 69.6835938 117.68457 64.9189453 104.432617 85.1796875"></polygon>\n        <polygon id="shard-6" fill="#AED180" points="117.105469 65.6552734 119.275391 81.328125 103.87793 85.4160156"></polygon>\n        <polygon id="shard-7" fill="#6C8649" points="116.892578 65.3945313 118.991211 90.2041016 148.775391 43.8574219"></polygon>\n        <polygon id="shard-8" fill="#A1C276" points="119.237305 90.3076172 117.68457 125.059082 56.5058594 95.5966797"></polygon>\n        <polygon id="shard-9" fill="#90B165" points="118.958984 94.4511719 165.556641 102.157227 117.424805 125.136719"></polygon>\n        <polygon id="shard-10" fill="#6C8649" points="119.848633 90.1074219 128.418945 96.1030273 165.221191 102.06543"></polygon>\n        <polygon id="shard-11" fill="#90B165" points="148.036133 45.0844727 122.442383 84.6269531 128.797363 92.7514648"></polygon>\n        <polygon id="shard-12" fill="#AED180" points="128.67041 92.7412109 148.632812 43.4892578 176.860352 50.6611328"></polygon>\n        <polygon id="shard-13" fill="#A1C276" points="128.783203 92.6767578 164.229492 101.871094 169.873047 56.5947266"></polygon>\n        <polygon id="shard-14" fill="#6C8649" points="164.429688 102.609375 172.979492 125.435547 148.27832 110.326172"></polygon>\n        <polygon id="shard-15" fill="#A1C276" points="174.239258 136.517578 192.222656 128.882812 192.971191 136.902832"></polygon>\n        <polygon id="shard-16" fill="#6C8649" points="77.9912109 36.4179688 100.841797 39.7519531 97.3867188 62.1826172"></polygon>\n        <polygon id="shard-17" fill="#90B165" points="148.938477 43.8154297 114.038086 34.2998047 126.459961 59.0644531"></polygon>\n        <polygon id="shard-18" fill="#6C8649" points="122.213867 36.6918945 155.912109 21.1845703 172.942383 50.1328125"></polygon>\n        <polygon id="shard-19" fill="#AED180" points="152.809082 22.6772461 125.712891 11.8457031 123.164062 36.3203125"></polygon>\n        <polygon id="shard-20" fill="#6C8649" points="117.503906 124.911621 80.1958008 137.658203 56.9057617 95.6269531"></polygon>\n        <polygon id="shard-21" fill="#90B165" points="59.6513672 100.556152 63.8725586 133.526855 80.3803711 137.520508"></polygon>\n        <polygon id="shard-22" fill="#A1C276" points="63.9013672 133.594238 90.4560547 164.722656 80.3085938 137.324219"></polygon>\n        <polygon id="shard-23" fill="#AED180" points="80.7929688 137.693848 109.867188 168.75293 121.024902 122.98877"></polygon>\n        <polygon id="shard-24" fill="#90B165" points="110.024902 168.632812 168.494141 175.621582 117.369141 137.175293"></polygon>\n        <polygon id="shard-25" fill="#6C8649" points="132.480957 148.680664 153.845215 137.756836 155.310547 165.960938"></polygon>\n        <polygon id="shard-26" fill="#AED180" points="168.272461 175.649414 183.919922 193.785156 209.084473 174.683594"></polygon>\n        <polygon id="shard-27" fill="#A1C276" points="184.012695 193.900391 164.974609 233.413086 197.892578 224.405273"></polygon>\n        <polygon id="shard-28" fill="#90B165" points="183.364258 193.664062 209.259766 174.449219 197.897461 224.571289"></polygon>\n        <polygon id="shard-29" fill="#6C8649" points="198.102539 223.682617 239.810547 186.1875 208.75 174.987305"></polygon>\n        <polygon id="shard-30" fill="#AED180" points="208.811523 175.582031 254.287109 156.00293 239.80957 186.597656"></polygon>\n        <polygon id="nav-bugaboo" fill="#68498E" points="137 75.7246094 138.5625 63 144.035156 75.9667969"></polygon>\n        <polygon id="nav-tetons" fill="#684A8D" points="84 111.050781 86.0214844 100 89.453125 110.966797"></polygon>\n        <polygon id="nav-glacier-peak" fill="#684A8D" points="64.3007812 100.203085 66.033934 91 69.7539062 100.494141"></polygon>\n        <polygon id="nav-blanca-traverse" fill="#432668" points="82 120.182506 83.528021 111 87.453125 120.494141"></polygon>\n    </g>\n</svg>'},function(t,n){t.exports='<svg id="tetons" width="100%" height="100%" viewBox="0 0 361 275" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g id="tetons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <polygon id="shard-1" fill="#666A2F" points="196.46875 136.49707 199.863281 265.996094 132.152344 209.171875"></polygon>\n        <polygon id="shard-2" fill="#9EB275" points="195.894531 138.652344 199.597656 264.890625 261.988281 223.362305"></polygon>\n        <polygon id="shard-3" fill="#7CA3E7" points="0.70703125 213.550781 128.207031 227.367188 153.398437 262.480469"></polygon>\n        <polygon id="shard-4" fill="#353E0D" points="195.556641 138.859375 187.648438 88.9824219 132.589844 208.917969"></polygon>\n        <polygon id="shard-5" fill="#666A2F" points="188.023438 90.4472656 131.378906 113.429688 132.34375 210.259766"></polygon>\n        <polygon id="shard-6" fill="#9EB275" points="131.775391 113.541016 111.884766 119.246094 132.386719 209.908203"></polygon>\n        <polygon id="shard-7" fill="#353D0C" points="132.832031 209.630859 57.6347656 173.236328 112.605469 119.728516"></polygon>\n        <polygon id="shard-8" fill="#9EB275" points="58.375 172.384766 8.34765625 182.775391 133.109375 209.464844"></polygon>\n        <polygon id="shard-9" fill="#353E0D" points="131.660156 113.375 212.824219 82.890625 156.839844 67"></polygon>\n        <polygon id="shard-10" fill="#9EB275" points="211.253906 82.4423828 176.796875 58.125 157.386719 67.2753906"></polygon>\n        <polygon id="shard-11" fill="#666A2F" points="176.970703 58.2441406 211.355469 82.7480469 200.363281 31.4345703"></polygon>\n        <polygon id="shard-12" fill="#9EB275" points="200.060547 32.25 272.478516 37.1953125 210.929688 82.6279297"></polygon>\n        <polygon id="shard-13" fill="#DBEBB8" points="199.726562 32.34375 238.658203 7.265625 271.626953 37.0292969"></polygon>\n        <polygon id="shard-14" fill="#9EB275" points="238.72168 7.80078125 261.632812 0 265.745117 31.8603516"></polygon>\n        <polygon id="shard-15" fill="#DBEBB8" points="272.535156 37.1425781 208.84668 84.0449219 272.535156 65.3564453"></polygon>\n        <polygon id="shard-16" fill="#DBEBB8" points="272.480469 64.0722656 284.423828 72.6357422 251.171875 158.925781"></polygon>\n        <polygon id="shard-17" fill="#9EB275" points="272.794922 63.7207031 251.662109 158.470703 195.580078 138.769531"></polygon>\n        <polygon id="shard-18" fill="#666A2F" points="273.259766 64.0175781 195.320312 139.640625 187.728516 90.5410156"></polygon>\n        <polygon id="shard-19" fill="#9EB275" points="283.90625 72.6484375 311.929687 99.0605469 250.579102 159.453125"></polygon>\n        <polygon id="shard-20" fill="#DBEBB8" points="250.287109 158.882812 312.464844 98.1425781 326.132812 143.824219"></polygon>\n        <polygon id="shard-21" fill="#9EB275" points="249.625 158.619141 326.189453 143.373047 361.046875 231.572266"></polygon>\n        <polygon id="shard-22" fill="#666A2F" points="251.085938 159.560547 261.216797 223.292969 359.880859 230.089844"></polygon>\n        <polygon id="shard-23" fill="#353E0D" points="195.654297 138.542969 261.432617 223.750977 250.955078 158.208984"></polygon>\n        <polygon id="shard-24" fill="#353E0D" points="39.6640625 182 33 204.1875 48.5546875 204.445312"></polygon>\n        <polygon id="shard-25" fill="#666A2F" points="32.6640625 188 26 210.1875 41.5546875 210.445312"></polygon>\n        <polygon id="shard-26" fill="#666A2F" points="151.925781 244 146 272.173828 161.613281 273.878906"></polygon>\n        <polygon id="shard-27" fill="#353E0D" points="116.86983 201.890625 111.884766 224.335938 126.056641 223.173919"></polygon>\n        <polygon id="shard-28" fill="#98BAF4" points="1.06542969 213.467773 40.5253906 274.439453 141.347656 258.131836"></polygon>\n        <polygon id="shard-29" fill="#AE704A" points="53.8642578 253.671711 72.6120605 248.466309 74.0019525 253.671711"></polygon>\n        <polygon id="shard-30" fill="#8B644C" points="53.6988118 253.757474 49 250.5 51.6447496 257.971924"></polygon>\n    </g>\n</svg>'},function(t,n,o){var i=o(0)(o(7),o(32),null,null);t.exports=i.exports},function(t,n,o){o(15);var i=o(0)(o(8),o(28),null,null);t.exports=i.exports},function(t,n,o){var i=o(0)(o(9),o(29),null,null);t.exports=i.exports},function(t,n,o){var i=o(0)(o(10),o(33),null,null);t.exports=i.exports},function(t,n,o){var i=o(0)(o(11),o(31),null,null);t.exports=i.exports},function(t,n,o){o(14);var i=o(0)(o(12),o(27),"data-v-00c80b40",null);t.exports=i.exports},function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"mountains",style:{height:t.mountainHeight+"px",width:t.mountainWidth+"px"}},[t.svgMountainsData.length?o("svg",{attrs:{width:"90%",height:"90%",id:"svg-mountains",viewBox:t.svgCurrentMountain.viewBox,xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[o("defs",[o("filter",{attrs:{id:"earthShine",height:"300%",width:"300%",x:"-75%",y:"-75%"}},[o("feMorphology",{attrs:{operator:"dilate",radius:"4",in:"SourceAlpha",result:"thicken"}}),t._v(" "),o("feGaussianBlur",{attrs:{in:"thicken",stdDeviation:"10",result:"blurred"}}),t._v(" "),o("feFlood",{attrs:{"flood-color":"rgba(0,186,255,0.5)",result:"glowColor"}}),t._v(" "),o("feComposite",{attrs:{in:"glowColor",in2:"blurred",operator:"in",result:"softGlow_colored"}}),t._v(" "),o("feMerge",[o("feMergeNode",{attrs:{in:"softGlow_colored"}}),t._v(" "),o("feMergeNode",{attrs:{in:"SourceGraphic"}})],1)],1)]),t._v(" "),o("g",{attrs:{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},["earth"===t.id?o("polygon",{attrs:{id:"earth-outline",filter:"url(#earthShine)",fill:"#CCE6F1",points:"17.8025863 60.0757894 2.8334088 95.9172722 0.741210938 112.623692 10.2806369 164.704173 22.0597875 182.779748 48.5494647 209.860974 65.6242517 220.506497 73.0561523 223.449304 113.957471 235.847656 163.4824 232.924325 194.204371 222.403448 235.914213 191.666597 257.949348 154.136554 263.741211 121.370315 263.229657 103.292792 247.497939 60.2218586 233.571028 42.7753551 203.464071 19.4432373 189.238275 12.3637508 168.178349 4.98238798 125.104364 0.84765625 109.556575 1.56047387 78.08739 11.4990212 55.8146793 22.6002793 40.4642313 33.6820614"}}):t._e(),t._v(" "),t._m(0),t._v(" "),"earth"===t.id?o("g",{staticClass:"svg-nav"},[o("polygon",{attrs:{id:"nav-bugaboo",fill:"#68498E",points:"137 75.7246094 138.5625 63 144.035156 75.9667969"}}),t._v(" "),o("polygon",{attrs:{id:"nav-tetons",fill:"#684A8D",points:"84 111.050781 86.0214844 100 89.453125 110.966797"}}),t._v(" "),o("polygon",{attrs:{id:"nav-glacier-peak",fill:"#684A8D",points:"64.3007812 100.203085 66.033934 91 69.7539062 100.494141"}}),t._v(" "),o("polygon",{attrs:{id:"nav-blanca-traverse",fill:"#432668",points:"82 120.182506 83.528021 111 87.453125 120.494141"}})]):t._e()],2)]):t._e()])},staticRenderFns:[function(){var t=this,n=t.$createElement,o=t._self._c||n;return t._l(t.svgCurrentMountain.rocks,function(t){return o("polygon",{attrs:{id:t.id,fill:t.fill,points:t.value}})})}]}},function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"mountaindrawn"},[o("svg",{staticStyle:{display:"none"}},[o("symbol",{attrs:{viewBox:"0 0 56 49",version:"1.1"}},[o("g",{attrs:{id:"arrow-left",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},[o("polygon",{attrs:{id:"arrow-top",points:"1 24.8554688 55.6601562 0.23828125 53.0319031 24.8554688"}}),t._v(" "),o("polygon",{attrs:{id:"arrow-bottom",points:"0.74609375 25.4101562 55.40625 48.859375 53.3203125 24.2421875"}})])])]),t._v(" "),o("div",{staticClass:"container"},[o("div",{staticClass:"logo"},[t._v("MountainDrawn")]),t._v(" "),o("h1",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),o("div",{staticClass:"title-nav"},[o("router-link",{staticClass:"nav-arrow nav-left",attrs:{to:t.previousMountainId},nativeOn:{click:function(n){t.setCurrentMountain(t.previousMountainIndex)}}},[o("svg",{staticClass:"arrow-left",attrs:{viewBox:"0 0 56 49"}},[o("use",{attrs:{"xlink:href":"#arrow-left"}})])]),t._v(" "),o("router-link",{staticClass:"nav-earth",attrs:{to:"earth"},nativeOn:{click:function(n){t.navigateEarth(n)}}}),t._v(" "),o("router-link",{staticClass:"nav-arrow nav-right",attrs:{to:t.previousMountainId},nativeOn:{click:function(n){t.setCurrentMountain(t.previousMountainIndex)}}},[o("svg",{staticClass:"arrow-right",attrs:{viewBox:"0 0 56 49"}},[o("use",{attrs:{"xlink:href":"#arrow-left"}})])])],1),t._v(" "),o("div",{staticClass:"mountains-wrapper"},[o("svg-mountains",{attrs:{id:t.id,currentMountain:t.currentMountain}}),t._v(" "),o("div",{staticClass:"data",class:{transparent:!t.photos},on:{click:t.clickData}},[o("div",{staticClass:"data-content"},[o("h2",{staticClass:"data-title"},[t._v(t._s(t.title))]),t._v(" "),o("p",{staticClass:"data-elevation"},[t._v("elevation\n            "),o("b",[t._v(t._s(t.elevation))])]),t._v(" "),o("p",{staticClass:"data-prominence"},[t._v("prominence "+t._s(t.prominence))]),t._v(" "),o("p",{staticClass:"data-description"},[t._v(t._s(t.description))])]),t._v(" "),o("div",{staticClass:"data-photos"},t._l(t.photos,function(t){return o("photos",{key:t.src,attrs:{photo:t}})}))])],1)]),t._v(" "),o("div",{staticClass:"content"},[o("svg",{staticClass:"svg-camping",attrs:{width:"74px",height:"43px",viewBox:"0 0 78 43"}},[o("g",{staticClass:"svg-group",attrs:{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},[o("path",{staticClass:"svg-part svg-tree-1",attrs:{d:"M66.6605656,36.6542958 L65.5026649,42 L73.1301837,42 L70.5028819,36.6542958 L77.2353516,36.6542958 L65.6220703,10 L60,36.6542958 L66.6605656,36.6542958 Z"}}),t._v(" "),o("path",{staticClass:"svg-part svg-tent",attrs:{d:"M32,42 L48.0947266,22 L61.9858398,42 L32,42 Z M38.5556641,41.1205474 L44.8624445,31.2734957 L50.2522381,41.0467904 L38.5556641,41.1205474 Z"}}),t._v(" "),o("path",{staticClass:"svg-part svg-tree-2",attrs:{d:"M23.9510131,35.9025137 L22.5026649,42 L30.1301837,42 L28.1930637,35.3999763 L36.2460938,34.4459685 L26.6230469,0.275390625 L17,36.7259703 L23.9510131,35.9025137 Z"}}),t._v(" "),o("path",{staticClass:"svg-part svg-tree-3",attrs:{d:"M9.69876136,38.3261376 L10.5302734,42.0888672 L2.11914062,42.0888672 L5.04362045,38.172106 L0.580078125,38.0244141 L17.7207031,10.2939453 L14.0087891,38.46875 L9.69876136,38.3261376 Z"}})])]),t._v(" "),o("div",{staticClass:"about-container"},[o("about"),t._v(" "),o("div",{staticClass:"photos-container"},[o("h3",[t._v("The Mountains")]),t._v(" "),t._l(t.mountains,function(n,i){return o("mountain-photo-nav",{key:n.id,attrs:{mountain:n,index:i,setCurrentMountain:t.setCurrentMountain}})})],2)],1),t._v(" "),t._m(0)]),t._v(" "),t._m(1),t._v(" "),o("div",{staticClass:"starfield-wrapper"},[o("div",{staticClass:"starfield starfield-1"}),t._v(" "),o("div",{staticClass:"starfield starfield-2"}),t._v(" "),o("div",{staticClass:"starfield starfield-3"}),t._v(" "),o("transition",{attrs:{name:"animate"}},[o("div",{staticClass:"shooting-star",class:{animate:t.showShootingStar},style:{top:t.starTop,left:t.starLeft,width:t.starWidth}})])],1)])},staticRenderFns:[function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("footer",[t._v("This work is licensed under a "),o("a",{attrs:{rel:"license",href:"http://creativecommons.org/licenses/by-nc-sa/4.0/"}},[t._v("Creative Commons Attribution-NonCommercial-ShareAlike")]),t._v(". Take what you need and share.")])},function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"satellite-wrapper"},[o("div",{staticClass:"earth-satellite earth-satellite-1"}),t._v(" "),o("div",{staticClass:"earth-satellite earth-satellite-2"})])}]}},function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return t.mountain.photos?o("div",{class:"earth-mtn earth-mtn-"+t.mountain.id,attrs:{"data-mountain":t.mountain.id,"data-index":t.index},on:{mouseover:t.hoverMtnShortcut,click:t.clickMtnShortcut}}):t._e()},staticRenderFns:[]}},function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},staticRenderFns:[]
}},function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("a",{attrs:{href:t.photo.lg},on:{click:function(t){t.stopPropagation()}}},[o("img",{attrs:{src:t.photo.src}})])},staticRenderFns:[]}},function(t,n){t.exports={render:function(){var t=this,n=t.$createElement;t._self._c||n;return t._m(0)},staticRenderFns:[function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"about-block"},[o("h3",[t._v("About")]),t._v(" "),o("p",[t._v("Mountaindrawn is the personal site of UI/UX developer Patrick Lewis. The original site  built 7 years ago was a challenge for myself to create a hand drawn website featuring climbing trips (I kept an "),o("a",{attrs:{href:"/dist/archived/blog/index.html"}},[t._v("archived version")]),t._v(").")]),t._v(" "),o("p",[t._v("The current revision of mountaindrawn illustrates climbing trips using more recent technology than the pen & ink and watercolor used to create the original. The idea was to use all svg but after reading the "),o("a",{attrs:{href:"https://www.html5rocks.com/en/tutorials/masking/adobe/"}},[t._v("htmlrocks article on clipping")]),t._v(" and seeing the amazingly simple "),o("a",{attrs:{href:"http://species-in-pieces.com/"}},[t._v("species-in-pieces")]),t._v(" project I went with css clip-path. Svg illustrations are displayed if clip-path is not supported. (see "),o("a",{attrs:{href:"http://caniuse.com/#search=clip-path"}},[t._v("current support")]),t._v(")")]),t._v(" "),o("p",[t._v("The main purpose for doing this project was to learn some new technologies and techniques. Much of what I learned came from other blog posts, articles and examples on codepen. Feel free to learn from and use the "),o("a",{attrs:{href:"https://github.com/PaddyMurphy/paddymurphy.github.io"}},[t._v("source of this project.")])]),t._v(" "),o("p",[t._v("There are several more mountains and route I plan on adding soon. A few at the top of the list are El Portrero Chico featuring the classic Estrallita, Mt Rainier Kautz Glacier Route, and the Mt Baker Coleman Headwall.")]),t._v(" "),o("p",[t._v("The "),o("a",{attrs:{href:"/riverflow"}},[t._v("Texas Riverflow app")]),t._v(" is still available.")])])}]}},function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return t.mountain.photos?o("router-link",{staticClass:"earth-mtn-hover",attrs:{to:t.mountain.id,"data-mountain":t.mountain.id},nativeOn:{click:function(n){t.setCurrentMountain(t.mountain.id)}}},[o("img",{staticClass:"b-lazy",attrs:{src:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==","data-src":t.mountain.photos[0].src,width:"150",height:"150",title:t.mountain.title}})]):t._e()},staticRenderFns:[]}},,,,function(t,n){t.exports={mountains:[{id:"earth",title:"",photos:""},{id:"bugaboo",title:"Bugaboo Spire",elevation:"10,512 ft",prominence:"1,437 ft",description:"North Ridge, a top 50 climb",photos:[{src:"static/img/mtn-sm-bugaboo-1.jpg",lg:"static/img/mtn-lg-bugaboo-1.jpg"},{src:"static/img/mtn-sm-bugaboo-2.jpg",lg:"static/img/mtn-lg-bugaboo-2.jpg"},{src:"static/img/mtn-sm-bugaboo-3.jpg",lg:"static/img/mtn-lg-bugaboo-3.jpg"},{src:"static/img/mtn-sm-bugaboo-4.jpg",lg:"static/img/mtn-lg-bugaboo-4.jpg"}]},{id:"tetons",title:"The Grand Teton",elevation:"13,776 ft",prominence:"6,529 ft",description:"Exum Ridge route",photos:[{src:"static/img/mtn-sm-tetons-1.jpg",lg:"static/img/mtn-lg-tetons-1.jpg"},{src:"static/img/mtn-sm-tetons-2.jpg",lg:"static/img/mtn-lg-tetons-2.jpg"},{src:"static/img/mtn-sm-tetons-3.jpg",lg:"static/img/mtn-lg-tetons-3.jpg"},{src:"static/img/mtn-sm-tetons-4.jpg",lg:"static/img/mtn-lg-tetons-4.jpg"}]},{id:"blanca-traverse",title:"Little Bear - Blanca Traverse",elevation:"14,344 ft",prominence:"5,325 ft",description:"Ridge route with 6000+ feet of gain",photos:[{src:"static/img/mtn-sm-blanca-traverse-1.jpg",lg:"static/img/mtn-lg-blanca-traverse-1.jpg"},{src:"static/img/mtn-sm-blanca-traverse-2.jpg",lg:"static/img/mtn-lg-blanca-traverse-2.jpg"},{src:"static/img/mtn-sm-blanca-traverse-3.jpg",lg:"static/img/mtn-lg-blanca-traverse-3.jpg"},{src:"static/img/mtn-sm-blanca-traverse-4.jpg",lg:"static/img/mtn-lg-blanca-traverse-4.jpg"}]}]}},function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=o(1),s=o(3),e=o.n(s),l=o(2);i.a.config.productionTip=!1,new i.a({el:"#app",router:l.a,template:"<App/>",components:{App:e.a}})}],[38]);
//# sourceMappingURL=app.1c3f6da32b65d42bf2f4.js.map