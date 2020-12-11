import path from 'path'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'score-h5',
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/fastclick.js' },
      { src: '/init.js' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'reset.css',
    '@/assets/scss/index.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/svg-icon",
    '~/plugins/vant',
    '~/plugins/filters'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: '~/assets/scss/variable.scss'
  },

  loading: false,

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true
  },
  proxy: {
    '/app/': 'http://sifangdianying.com'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test(".svg"));
      svgRule.exclude = [path.resolve(__dirname, "assets/icons/svg")];
      //添加loader规则
      config.module.rules.push({
        test: /\.svg$/, // 匹配.svg
        include: [path.resolve(__dirname, "assets/icons/svg")], // 将存放svg的目录加入到loader处理目录
        use: [
          { loader: "svg-sprite-loader", options: { symbolId: "icon-[name]" } }
        ]
      })
    }
  }
}
