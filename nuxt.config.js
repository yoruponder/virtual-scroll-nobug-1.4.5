const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const env = process.env.NODE_ENV || '';
console.log('当前构建环境'+env);

const nuxtConfig = {
  head: {
    title: 'nuxt樣板腳手架',
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'format-detection', name: 'format-detection', content: 'telephone=no' },

      { hid: 'keywords', name: 'keywords', content: 'seo關鍵字' },
      { hid: 'description', name: 'description', content: 'seo描述' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=181017' },
    ],
    script: [
      { src: '/game.config3.js' }
    ]
  },
  env: { 
    keywords: '通用seo關鍵字',
    description: '通用seo描述'
  },
  css: [
    '~assets/scss/public/reset.scss',
  ],
  build: {
    extractCSS: {
      allChunks: true
    },
    maxChunkSize: 300000,
    filenames: {
      manifest: 'manifest.[hash:5].js',
      vendor: 'vendor.[chunkhash:5].js',
      app: 'app.[chunkhash:8].js',
      chunk: '[name].[chunkhash:5].js'
    },
    extend(config, { isDev, isClient }) {
      config.resolve.alias['_CFG_'] = resolve('config');
      config.resolve.alias['_SCSS_'] = resolve('assets/scss');
      config.resolve.alias['_IMG_'] = resolve('assets/img');
      config.resolve.alias['_COMP_'] = resolve('components');
      config.resolve.alias['_PAGE_'] = resolve('pages');
      config.resolve.alias['_UTIL_'] = resolve('utils');

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  plugins: [
    { src: '~plugins/virtual-list', ssr: false },
    '~/plugins/vant-ui',
    '~plugins/config'
  ]
}

module.exports = nuxtConfig;