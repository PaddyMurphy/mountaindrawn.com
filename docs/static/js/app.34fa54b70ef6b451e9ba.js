webpackJsonp([0,2],[,,function(t,i,e){"use strict";var a=e(1),n=e(23),s=e(14),o=e.n(s);a.a.use(n.a),i.a=new n.a({routes:[{path:"/",name:"Mountain",component:o.a},{path:"/:mountain",name:"MountainUrl",component:o.a}]})},function(t,i,e){e(13);var a=e(0)(e(6),e(20),null,null);t.exports=a.exports},,function(t,i,e){"use strict";i.a={areClipPathShapesSupported:function(){for(var t="clipPath",i=["webkit","moz","ms","o"],e=[t],a=document.createElement("testelement"),n="polygon(50% 0%, 0% 100%, 100% 100%)",s=0,o=i.length;s<o;s++){var r=i[s]+t.charAt(0).toUpperCase()+t.slice(1);e.push(r)}for(var s=0,o=e.length;s<o;s++){var l=e[s];if(""===a.style[l]&&(a.style[l]=n,""!==a.style[l]))return!0}return!1}}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"app"}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e(26),n=e.n(a),s=e(5),o=e(4),r=e.n(o),l=e(11),c=e.n(l),h=e(17),u=e.n(h),p=e(15),d=e.n(p),m=e(16),g=e.n(m);i.default={name:"mountain",data:function(){return{currentMountain:0,description:null,earthMtnActive:null,earthStarted:!1,elevation:null,id:"earth",length:n.a.mountains.length-1,mountainHeight:500,mountains:n.a.mountains,mountainWidth:500,photos:null,prominence:null,showData:!1,showShootingStar:!1,starLeft:null,starTop:null,starWidth:null,supportsClipPath:"no-clip-path",title:null}},components:{photos:u.a,"mountain-photo-nav":g.a,"mountain-earth-nav":d.a},mounted:function(){"MountainUrl"===this.$route.name,this.sizeshards(),this.setEvents(),setTimeout(function(){new r.a({offset:-70,error:function(t,i){"missing"===i?console.log("Data-src is missing"):"invalid"===i&&console.log("Data-src is invalid")}})},1e3),"earth"===document.body.dataset.mountain&&this.earthSequence(),s.a.areClipPathShapesSupported()&&(this.supportsClipPath="supports-clip-path")},beforeDestroy:function(){window.removeEventListener("resize",this.sizeshards)},watch:{currentMountain:"navigate"},methods:{transitionComplete:function(t){console.log("transitionComplete")},setEvents:function(){window.addEventListener("resize",this.sizeshards),document.onkeydown=this.checkKey,this.$el.querySelector(".shooting-star").addEventListener("transitionend",this.shootingStarEnd,!1)},navigateRight:function(){this.currentMountain=this.currentMountain===this.length?0:this.currentMountain+1},navigateLeft:function(){this.currentMountain=0===this.currentMountain?this.length:this.currentMountain-1},navigate:function(){var t=this.mountains[this.currentMountain].id;document.body.dataset.mountain=t,this.photos=this.mountains[this.currentMountain].photos,this.setData()},setData:function(t){var i=this.mountains[t]||this.mountains[this.currentMountain];this.title=i.title,this.description=i.description,this.elevation=i.elevation,this.id=i.id,this.prominence=i.prominence,this.title.length?this.$el.querySelector(".data").classList.remove("transparent"):this.$el.querySelector(".data").classList.add("transparent"),this.setupPhotoGallery()},setupPhotoGallery:function(){setTimeout(function(){c.a.run(".data-photos",{fullScreen:!1})},0)},sizeshards:function(){var t=document.body.offsetWidth,i=this.$el.querySelector(".container").offsetHeight-50,e=t,a=Math.round(.6*e),n=e/a;a>i&&(e=i*n,a=i),this.mountainWidth=e,this.mountainHeight=a},getRandomInRange:function(t,i){return Math.round(Math.random()*(i-t)+t)},animateShootingStar:function(){this.starTop=this.getRandomInRange(-10,30)+"vh",this.starLeft=this.getRandomInRange(-20,70)+"vw",this.starWidth=this.getRandomInRange(10,35)+"vw",this.showShootingStar=!0},shootingStarEnd:function(){this.showShootingStar=!1},navigateEarth:function(){this.currentMountain=0},earthSequence:function(){var t=this;this.earthStarted||(!function i(){setTimeout(function(){t.animateShootingStar(),i()},t.getRandomInRange(5e3,12e3))}(),this.earthStarted=!0)},hoverMtnShortcut:function(t){this.earthMtnActive=parseInt(t.target.dataset.index,10),this.photos=this.mountains[this.earthMtnActive].photos,this.setData(this.earthMtnActive),this.mtnShortcutReset(),t.target.classList.add("hover")},mtnShortcutReset:function(){var t=this.$el.querySelectorAll(".earth-mtn");t.forEach(function(t){t.classList.remove("hover")})},clickMtnShortcut:function(t){this.currentMountain=parseInt(t.target.dataset.index,10)},clickData:function(){0===this.currentMountain&&(this.currentMountain=this.earthMtnActive)},checkKey:function(t){37===t.keyCode?this.navigateLeft():39===t.keyCode&&this.navigateRight()}}}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"mountain-earth-nav",props:["index","mountain","clickMtnShortcut","hoverMtnShortcut"]}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"mountain-photo-nav",props:["mountain"]}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"photos",props:["photo"]}},,function(t,i){},function(t,i){},function(t,i,e){e(12);var a=e(0)(e(7),e(18),null,null);t.exports=a.exports},function(t,i,e){var a=e(0)(e(8),e(19),null,null);t.exports=a.exports},function(t,i,e){var a=e(0)(e(9),e(22),null,null);t.exports=a.exports},function(t,i,e){var a=e(0)(e(10),e(21),null,null);t.exports=a.exports},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"mountaindrawn",class:{supportsClipPath:t.supportsClipPath}},[e("svg",{staticStyle:{display:"none"}},[e("symbol",{attrs:{viewBox:"0 0 56 49",version:"1.1"}},[e("g",{attrs:{id:"arrow-left",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},[e("polygon",{attrs:{id:"arrow-top",points:"1 24.8554688 55.6601562 0.23828125 53.0319031 24.8554688"}}),t._v(" "),e("polygon",{attrs:{id:"arrow-bottom",points:"0.74609375 25.4101562 55.40625 48.859375 53.3203125 24.2421875"}})])])]),t._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"logo"},[t._v("MountainDrawn")]),t._v(" "),e("h1",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),e("div",{staticClass:"title-nav"},[e("a",{staticClass:"nav-arrow nav-left",attrs:{href:"#"},on:{click:t.navigateLeft}},[e("svg",{staticClass:"arrow-left",attrs:{viewBox:"0 0 56 49"}},[e("use",{attrs:{"xlink:href":"#arrow-left"}})])]),t._v(" "),e("a",{staticClass:"nav-earth",attrs:{href:"#"},on:{click:t.navigateEarth}}),t._v(" "),e("a",{staticClass:"nav-arrow nav-right",attrs:{href:"#"},on:{click:t.navigateRight}},[e("svg",{staticClass:"arrow-right",attrs:{viewBox:"0 0 56 49"}},[e("use",{attrs:{"xlink:href":"#arrow-left"}})])])]),t._v(" "),e("div",{staticClass:"mountains-wrapper"},[e("div",{staticClass:"mountains",style:{height:t.mountainHeight+"px",width:t.mountainWidth+"px"}},[t._l(30,function(t){return e("div",{staticClass:"rock"})}),t._v(" "),t._l(t.mountains,function(i,a){return e("mountain-earth-nav",{key:i.id,attrs:{mountain:i,index:a,hoverMtnShortcut:t.hoverMtnShortcut,clickMtnShortcut:t.clickMtnShortcut}})}),t._v(" "),e("div",{staticClass:"earth-outline"})],2),t._v(" "),t._m(0),t._v(" "),e("div",{staticClass:"data transparent",on:{click:t.clickData}},[e("div",{staticClass:"data-content"},[e("h2",{staticClass:"data-title"},[t._v(t._s(t.title))]),t._v(" "),e("p",{staticClass:"data-elevation"},[t._v("elevation\n            "),e("b",[t._v(t._s(t.elevation))])]),t._v(" "),e("p",{staticClass:"data-prominence"},[t._v("prominence "+t._s(t.prominence))]),t._v(" "),e("p",{staticClass:"data-description"},[t._v(t._s(t.description))])]),t._v(" "),e("div",{staticClass:"data-photos"},t._l(t.photos,function(t){return e("photos",{key:t.src,attrs:{photo:t}})}))])])]),t._v(" "),e("div",{staticClass:"content"},[e("svg",{staticClass:"svg-camping",attrs:{width:"74px",height:"43px",viewBox:"0 0 78 43"}},[e("g",{staticClass:"svg-group",attrs:{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},[e("path",{staticClass:"svg-part svg-tree-1",attrs:{d:"M66.6605656,36.6542958 L65.5026649,42 L73.1301837,42 L70.5028819,36.6542958 L77.2353516,36.6542958 L65.6220703,10 L60,36.6542958 L66.6605656,36.6542958 Z"}}),t._v(" "),e("path",{staticClass:"svg-part svg-tent",attrs:{d:"M32,42 L48.0947266,22 L61.9858398,42 L32,42 Z M38.5556641,41.1205474 L44.8624445,31.2734957 L50.2522381,41.0467904 L38.5556641,41.1205474 Z"}}),t._v(" "),e("path",{staticClass:"svg-part svg-tree-2",attrs:{d:"M23.9510131,35.9025137 L22.5026649,42 L30.1301837,42 L28.1930637,35.3999763 L36.2460938,34.4459685 L26.6230469,0.275390625 L17,36.7259703 L23.9510131,35.9025137 Z"}}),t._v(" "),e("path",{staticClass:"svg-part svg-tree-3",attrs:{d:"M9.69876136,38.3261376 L10.5302734,42.0888672 L2.11914062,42.0888672 L5.04362045,38.172106 L0.580078125,38.0244141 L17.7207031,10.2939453 L14.0087891,38.46875 L9.69876136,38.3261376 Z"}})])]),t._v(" "),e("div",{staticClass:"about-container"},[t._m(1),t._v(" "),e("div",{staticClass:"photos-container"},[e("h3",[t._v("The Mountains")]),t._v(" "),t._l(t.mountains,function(t){return e("mountain-photo-nav",{key:t.id,attrs:{mountain:t}})})],2)]),t._v(" "),t._m(2)]),t._v(" "),t._m(3),t._v(" "),e("div",{staticClass:"starfield-wrapper"},[e("div",{staticClass:"starfield starfield-1"}),t._v(" "),e("div",{staticClass:"starfield starfield-2"}),t._v(" "),e("div",{staticClass:"starfield starfield-3"}),t._v(" "),e("transition",{attrs:{name:"animate"}},[e("div",{staticClass:"shooting-star",class:{animate:t.showShootingStar},style:{top:t.starTop,left:t.starLeft,width:t.starWidth}})])],1)])},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"static-mountains"},[e("div",{staticClass:"static-mountain"})])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"about-block"},[e("h3",[t._v("About")]),t._v(" "),e("p",[t._v("Mountaindrawn is the personal site of UI/UX developer Patrick Lewis. The original site  built 7 years ago was a challenge for myself to create a hand drawn website featuring climbing trips (I kept an "),e("a",{attrs:{href:"/dist/archived/blog/index.html"}},[t._v("archived version")]),t._v(").")]),t._v(" "),e("p",[t._v("The current revision of mountaindrawn illustrates climbing trips using more recent technology than the pen & ink and watercolor used to create the original. The idea was to use all svg but after reading the "),e("a",{attrs:{href:"https://www.html5rocks.com/en/tutorials/masking/adobe/"}},[t._v("htmlrocks article on clipping")]),t._v(" and seeing the amazingly simple "),e("a",{attrs:{href:"http://species-in-pieces.com/"}},[t._v("species-in-pieces")]),t._v(" project I went with css clip-path. Svg illustrations are displayed if clip-path is not supported. (see "),e("a",{attrs:{href:"http://caniuse.com/#search=clip-path"}},[t._v("current support")]),t._v(")")]),t._v(" "),e("p",[t._v("The main purpose for doing this project was to learn some new technologies and techniques. Much of what I learned came from other blog posts, articles and examples on codepen. Feel free to learn from and use the "),e("a",{attrs:{href:"https://github.com/PaddyMurphy/paddymurphy.github.io"}},[t._v("source of this project.")])]),t._v(" "),e("p",[t._v("There are several more mountains and route I plan on adding soon. A few at the top of the list are El Portrero Chico featuring the classic Estrallita, Mt Rainier Kautz Glacier Route, and the Mt Baker Coleman Headwall.")]),t._v(" "),e("p",[t._v("The "),e("a",{attrs:{href:"/riverflow"}},[t._v("Texas Riverflow app")]),t._v(" is still available.")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("footer",[t._v("This work is licensed under a "),e("a",{attrs:{rel:"license",href:"http://creativecommons.org/licenses/by-nc-sa/4.0/"}},[t._v("Creative Commons Attribution-NonCommercial-ShareAlike")]),t._v(". Take what you need and share.")])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"satellite-wrapper"},[e("div",{staticClass:"earth-satellite earth-satellite-1"}),t._v(" "),e("div",{staticClass:"earth-satellite earth-satellite-2"})])}]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return JSON.parse(t.mountain.isMountain)?e("div",{class:"earth-mtn earth-mtn-"+t.mountain.id,attrs:{"data-mountain":t.mountain.id,"data-index":t.index},on:{mouseover:t.hoverMtnShortcut,click:t.clickMtnShortcut}}):t._e()},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("a",{attrs:{href:t.photo.lg},on:{click:function(t){t.stopPropagation()}}},[e("img",{attrs:{src:t.photo.src}})])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.mountain.photos?e("router-link",{staticClass:"earth-mtn-hover",attrs:{to:t.mountain.id,"data-mountain":t.mountain.id}},[e("img",{staticClass:"b-lazy",attrs:{src:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==","data-src":t.mountain.photos[0].src,width:"150",height:"150",title:t.mountain.title}})]):t._e()},staticRenderFns:[]}},,,,function(t,i){t.exports={mountains:[{id:"earth",title:"",photos:"",isMountain:"false"},{id:"bugaboo",title:"Bugaboo Spire",elevation:"10,512 ft",prominence:"1,437 ft",description:"North Ridge, a top 50 climb",isMountain:"true",photos:[{src:"static/img/mtn-sm-bugaboo-1.jpg",lg:"static/img/mtn-lg-bugaboo-1.jpg"},{src:"static/img/mtn-sm-bugaboo-2.jpg",lg:"static/img/mtn-lg-bugaboo-2.jpg"},{src:"static/img/mtn-sm-bugaboo-3.jpg",lg:"static/img/mtn-lg-bugaboo-3.jpg"},{src:"static/img/mtn-sm-bugaboo-4.jpg",lg:"static/img/mtn-lg-bugaboo-4.jpg"}],polygons:[{id:"shard-1",fill:"#E5DED9",points:"225.355469 35.9257812 236.003906 44.8339844 231.189453 74.0039062"},{id:"shard-2",fill:"#C1B8AE",points:"246.516602 47.7265625 267.601562 63.6699219 277.662109 169.519043 253.988281 87.6191406"},{id:"shard-3",fill:"#C1B8AE",points:"236.074219 45.3710938 231.25 75.0703125 254.47168 88.0576172"},{id:"shard-4",fill:"#7D7771",points:"226.348633 42.6757812 221.217773 70.1621094 231.375977 76.4443359"},{id:"shard-5",fill:"#7D7771",points:"221.727539 70.2910156 223.03125 154.453125 196.839844 129.918945"},{id:"shard-6",fill:"#3E3D3D",points:"221.569336 69.8740234 254.111328 87.5996094 222.310547 153.850586"},{id:"shard-7",fill:"#7D7771",points:"236.172852 45.6708984 247.900391 48.4277344 254.351562 87.7890625"},{id:"shard-8",fill:"#7D7771",points:"254.247559 86.9799805 277.570312 168.859375 190.525391 220.425781"},{id:"shard-9",fill:"#3E3D3D",points:"268 67 276.59375 67.5654297 277.762695 170.053711"},{id:"shard-10",fill:"#E5DED9",points:"277.149414 73.1757812 349.6875 156.693359 304.014648 180.359375"},{id:"shard-11",fill:"#C3BAB0",points:"276.692383 70.2348633 277.754883 169.134277 304.120117 181.006836"},{id:"shard-12",fill:"#C3BAB0",points:"348.938477 156.374023 366.348633 207.4375 303.551758 180.62793"},{id:"shard-13",fill:"#7D7771",points:"278.197266 168.578125 304.265625 180.681641 200.230469 268.066406"},{id:"shard-14",fill:"#C3BAB0",points:"278.464844 168.318359 113.134766 266.432617 201.268555 267.608398"},{id:"shard-15",fill:"#3E3D3D",points:"304.325195 180.431641 200.974609 267.612305 306.625 251.123047"},{id:"shard-16",fill:"#7D7771",points:"304.381836 180.864258 306.605469 251.345703 437.296875 293.274414"},{id:"shard-17",fill:"#E5DED9",points:"304.22168 180.652344 390.919922 218.019531 365.277344 232.048828"},{id:"shard-18",fill:"#C3BAB0",points:"364.907227 232.354492 436.789062 293.123047 390.475586 217.916992"},{id:"shard-19",fill:"#3E3D3D",points:"222.847656 153.807617 190.870117 220.605469 197.000977 129.211914"},{id:"shard-20",fill:"#7D7771",points:"196.074219 146.891602 169.791992 183.267578 191.18457 220.041992"},{id:"shard-21",fill:"#C3BAB0",points:"170.208008 183.166016 68.3867188 272.28125 191.073242 219.449219"},{id:"shard-22",fill:"#7D7771",points:"191.758789 219.439453 69.2119141 271.661133 114.598633 266.354492"},{id:"shard-23",fill:"#E5DED9",points:"197.515625 30.9882812 182.828125 24.1914062 184.810547 30.5996094"},{id:"shard-24",fill:"#E5DED9",points:"209.675781 26.6152344 217.232422 23.6523438 214.251953 27.8574219"},{id:"shard-25",fill:"#C3BAB0",points:"115.365234 19.9492188 107.326172 23.0410156 122.773438 24.4121094"}]},{id:"tetons",title:"The Grand Teton",elevation:"13,776 ft",prominence:"6,529 ft",description:"Exum Ridge route",isMountain:"true",photos:[{src:"static/img/mtn-sm-tetons-1.jpg",lg:"static/img/mtn-lg-tetons-1.jpg"},{src:"static/img/mtn-sm-tetons-2.jpg",lg:"static/img/mtn-lg-tetons-2.jpg"},{src:"static/img/mtn-sm-tetons-3.jpg",lg:"static/img/mtn-lg-tetons-3.jpg"},{src:"static/img/mtn-sm-tetons-4.jpg",lg:"static/img/mtn-lg-tetons-4.jpg"}]},{id:"blanca-traverse",title:"Little Bear - Blanca Traverse",elevation:"14,344 ft",prominence:"5,325 ft",description:"Ridge route with 6000+ feet of gain",isMountain:"true",photos:[{src:"static/img/mtn-sm-blanca-traverse-1.jpg",lg:"static/img/mtn-lg-blanca-traverse-1.jpg"},{src:"static/img/mtn-sm-blanca-traverse-2.jpg",lg:"static/img/mtn-lg-blanca-traverse-2.jpg"},{src:"static/img/mtn-sm-blanca-traverse-3.jpg",lg:"static/img/mtn-lg-blanca-traverse-3.jpg"},{src:"static/img/mtn-sm-blanca-traverse-4.jpg",lg:"static/img/mtn-lg-blanca-traverse-4.jpg"}]},{id:"glacier-peak",title:"Glacier Peak",elevation:"10,541 ft",prominence:"7,497 ft",description:"Glissade all day",isMountain:"true",photos:[{src:"static/img/mtn-sm-glacier-peak-1.jpg",lg:"static/img/mtn-lg-glacier-peak-1.jpg"},{src:"static/img/mtn-sm-glacier-peak-2.jpg",lg:"static/img/mtn-lg-glacier-peak-2.jpg"},{src:"static/img/mtn-sm-glacier-peak-3.jpg",lg:"static/img/mtn-lg-glacier-peak-3.jpg"},{src:"static/img/mtn-sm-glacier-peak-4.jpg",lg:"static/img/mtn-lg-glacier-peak-4.jpg"}]}]}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e(1),n=e(3),s=e.n(n),o=e(2);a.a.config.productionTip=!1,new a.a({el:"#app",router:o.a,template:"<App/>",components:{App:s.a}})}],[27]);
//# sourceMappingURL=app.34fa54b70ef6b451e9ba.js.map