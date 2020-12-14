/**
 * Inject the styles and scripts needed for the lightbox/galllery
 */
const getLightbox = () => {
  const scripts = [
    'https://chriscorchado.com/lightbox/js/jquery.detect_swipe.min.js',
    'https://chriscorchado.com/lightbox/js/featherlight.min.js',
    'https://chriscorchado.com/lightbox/js/featherlight.gallery.min.js'
  ]

  scripts.forEach((script) => {
    const scriptTag:any = document.createElement('script')
    scriptTag.setAttribute('src', script)
    document.head.appendChild(scriptTag)
  })

  const css = [
    'https://chriscorchado.com/lightbox/css/featherlight.min.css',
    'https://chriscorchado.com/lightbox/css/featherlight.gallery.min.css'
  ]

  css.forEach((style) => {
    const cssTag:any = document.createElement('link')
    cssTag.setAttribute('href', style)
    cssTag.setAttribute('rel', 'stylesheet')
    document.head.appendChild(cssTag)
  })
}

export default getLightbox
