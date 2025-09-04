export default {
  scrollBehavior(to: any, from: any, savedPosition: any) {
    const nuxtApp = useNuxtApp()

    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:finish', () => {
        if (savedPosition) {
          resolve(savedPosition)
        } else if (to.hash) {
          resolve(window.scrollTo({
            top: document.querySelector(to.hash).offsetTop + 112,
            behavior: 'smooth'
          }))
        } else {
          resolve({
            top: 0,
            // behavior: 'smooth'
          })
        }
      })
    })
  }
}
