/**
 * Inject the styles and scripts needed for the lighbox/galllery
 */
const getLightbox = () => {
  const scripts = [
    'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/detect_swipe/2.1.1/jquery.detect_swipe.min.js',
    '//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.js',
    '//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.gallery.min.js'
  ]

  scripts.forEach((script) => {
    const scriptTag = document.createElement('script')
    scriptTag.setAttribute('src', script)
    document.head.appendChild(scriptTag)
  })

  const css = [
    '//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.css',
    '//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.gallery.min.css'
  ]

  css.forEach((style) => {
    const cssTag = document.createElement('link')
    cssTag.setAttribute('href', style)
    cssTag.setAttribute('rel', 'stylesheet')
    document.head.appendChild(cssTag)
  })
}

export default getLightbox
