if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,n,s)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const c={uri:location.origin+r.slice(1)};return Promise.all(n.map((r=>{switch(r){case"exports":return i;case"module":return c;default:return e(r)}}))).then((e=>{const r=s(...e);return i.default||(i.default=r),i}))})))}}define("./service-worker.js",["./workbox-fe5bc736"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"4cac50dd50b637cd336a.webmanifest",revision:null},{url:"8994f68a9f8948c06a3b.png",revision:null},{url:"98549118a50f046bd4fa.png",revision:null},{url:"bundle.js",revision:"20ccae543764b7fb8215f8ffefd6371a"},{url:"bundle.js.LICENSE.txt",revision:"bdb064c938900e037ca36bfe7926c9a8"},{url:"cff684e59ffb052d72cb.woff2",revision:null},{url:"favicon.ico",revision:"338abbb5ea8d80b9869555eca253d49d"},{url:"icon.png",revision:"7676155efec287aaaa1b78ea9a79120d"},{url:"index.html",revision:"2af40b2cbbf0179c6e1d78b1391d6946"},{url:"site.webmanifest",revision:"06d923c4897c815d2d4f964d9d133626"},{url:"tile.png",revision:"9bee3f492c17e9fecc3949397ba0e022"}],{}),e.registerRoute("https://api.avalanche.org/v2/public/products/map-layer/NWAC",new e.NetworkFirst,"GET")}));
