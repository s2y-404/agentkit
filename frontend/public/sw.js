if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),f={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>f[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/168.0f9a878f833ee412.js",revision:"0f9a878f833ee412"},{url:"/_next/static/chunks/312.5b431a084f8874d8.js",revision:"5b431a084f8874d8"},{url:"/_next/static/chunks/365.76fc901225970058.js",revision:"76fc901225970058"},{url:"/_next/static/chunks/600.d6cad72a8f3699cc.js",revision:"d6cad72a8f3699cc"},{url:"/_next/static/chunks/675-14a02f084039bf89.js",revision:"14a02f084039bf89"},{url:"/_next/static/chunks/713.e173a8529ec9cbce.js",revision:"e173a8529ec9cbce"},{url:"/_next/static/chunks/ad7f724d.62da00cb74e79af2.js",revision:"62da00cb74e79af2"},{url:"/_next/static/chunks/b8a50d22.dab2d9963c35eb8a.js",revision:"dab2d9963c35eb8a"},{url:"/_next/static/chunks/framework-10fac88913917d91.js",revision:"10fac88913917d91"},{url:"/_next/static/chunks/main-b378428f0f8331ad.js",revision:"b378428f0f8331ad"},{url:"/_next/static/chunks/pages/_app-b0425484d5ad2e79.js",revision:"b0425484d5ad2e79"},{url:"/_next/static/chunks/pages/_error-735dc60b184b15e5.js",revision:"735dc60b184b15e5"},{url:"/_next/static/chunks/pages/auth/signin-6588138af809c8b3.js",revision:"6588138af809c8b3"},{url:"/_next/static/chunks/pages/chat-a4869cf6693c3f01.js",revision:"a4869cf6693c3f01"},{url:"/_next/static/chunks/pages/index-45151edc4d5e7292.js",revision:"45151edc4d5e7292"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-56d2d426ca0e3fd8.js",revision:"56d2d426ca0e3fd8"},{url:"/_next/static/css/60cc8814ec3b44ed.css",revision:"60cc8814ec3b44ed"},{url:"/_next/static/p3lYdWoClRL-CuHxFxhzP/_buildManifest.js",revision:"91542a2c55122f34ce2610693936e849"},{url:"/_next/static/p3lYdWoClRL-CuHxFxhzP/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"0b476883f443504b0e49af14a8942d17"},{url:"/fonts/sans/BCGHenSansBold.ttf",revision:"b1688c15006efdca800d85b947563d9d"},{url:"/fonts/sans/BCGHenSansBoldIta.ttf",revision:"d0bc03d0c6280d44bcfd71ed214ef7bb"},{url:"/fonts/sans/BCGHenSansItalic.ttf",revision:"259fdd9d8562acafc11e12390d6bfc22"},{url:"/fonts/sans/BCGHenSansLight.ttf",revision:"813a82378ea4206c27b6947f02f7cf25"},{url:"/fonts/sans/BCGHenSansLightItalic.ttf",revision:"d9fbf1529e436a2b74c3cf3cd912e54b"},{url:"/fonts/sans/BCGHenSansRegular.ttf",revision:"babece260b302089467a7db88d344805"},{url:"/fonts/sans/BCGHenSansThin.ttf",revision:"fa9a722801fba42cc0639a49404f9c85"},{url:"/fonts/sans/BCGHenSansThinItalic.ttf",revision:"09adcb6085f9c18d798be0a03a891bdf"},{url:"/fonts/serif/BCGHenSerifBold.ttf",revision:"ffce8606175e9a24774fece6988f34d2"},{url:"/fonts/serif/BCGHenSerifBoldIta.ttf",revision:"2bbd418d717eaef6f81df8b1caea73e5"},{url:"/fonts/serif/BCGHenSerifHead.ttf",revision:"17f85a0c249419e890d669be153b1ac0"},{url:"/fonts/serif/BCGHenSerifItalic.ttf",revision:"09bb68b0747fa5b6c385a3ccc72a34da"},{url:"/fonts/serif/BCGHenSerifRegular.ttf",revision:"f365a89aee5ab8abd2bfb7fac7e8d976"},{url:"/icons/Github.png",revision:"1dee40f2668d5c719eafa2c89296f5e7"},{url:"/icons/logo.png",revision:"5854ddba5df577a56bca978915b12736"},{url:"/logo.png",revision:"5854ddba5df577a56bca978915b12736"},{url:"/logo_full.png",revision:"2c365c68d19abb8f3f0f37f8d205aeb9"},{url:"/logo_full_dark.png",revision:"e508aa9a80ed4e87f252bd7b3babccf8"},{url:"/manifest.json",revision:"0251be41b1e57ef2228f1f58a1efe4b8"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
