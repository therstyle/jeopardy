module.exports = {
  pwa: {
    manifestOptions: {
      icons: [
        {
            'src': 'images/icons/android-chrome-192x192.png',
            'sizes': '192x192',
            'type': 'image/png',
        },
        {
            'src': 'images/icons/android-chrome-512x512.png',
            'sizes': '512x512',
            'type': 'image/png',
        },
        {
          'src': 'images/icons/apple-touch-icon-180x180.png',
          'sizes': '180x180',
          'type': 'image/png',
        },
        {
          'src': 'images/icons/apple-touch-icon-152x152.png',
          'sizes': '152x152',
          'type': 'image/png',
        },
        {
          'src': 'images/icons/apple-touch-icon-120x120.png',
          'sizes': '120x120',
          'type': 'image/png',
        },
        {
          'src': 'images/icons/apple-touch-icon-76x76.png',
          'sizes': '76x76',
          'type': 'image/png',
        },
        {
          'src': 'images/icons/apple-touch-icon-60x60.png',
          'sizes': '60x60',
          'type': 'image/png',
        },
        {
          'src': 'images/icons/apple-touch-icon.png',
          'type': 'image/png',
        },
        {
          'src': 'images/icons/safari-pinned-tab.png',
          'type': 'image/svg',
        },
        {
          'src': 'images/icons/msapplication-icon-144x144.png',
          'sizes': '144x144',
          'type': 'image/png',
        },
        {
          'src': 'images/icons/mstile-150x150.png',
          'sizes': '150x150',
          'type': 'image/png',
        },
    ],
    },
    iconPaths: {
      favicon32: 'images/icons/favicon-32x32.png',
      favicon16: 'images/icons/favicon-16x16.png',
      appleTouchIcon: 'images/icons/apple-touch-icon-152x152.png',
      maskIcon: 'images/icons/safari-pinned-tab.svg',
      msTileImage: 'images/icons/msapplication-icon-144x144.png'
    }
  }
}