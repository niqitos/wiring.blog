export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'cursor-pointer'
      }
    },
    icons: {
      check: 'i-lucide:check'
    },
    prose: {
      codeIcon: {
        ino: 'material-icon-theme:arduino',
        cpp: 'material-icon-theme:cpp',
        txt: 'material-icon-theme:document'
      }
    }
  }
})
