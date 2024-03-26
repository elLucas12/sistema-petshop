// karma.conf.js
restartOnFileChange: true,
restartOnFileChange: true,
customLaunchers: {
  ChromeHeadlessCustom: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox', '--disable-gpu']
  }
},
