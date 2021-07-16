import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'
import swRegister from './utils/sw-register'
import App from './views/app'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

const app = new App({
  button: document.querySelector('#navbuttonmobile'), // tombol hamburger
  drawer: document.querySelector('#navigation'), // drawer element
  content: document.querySelector('#maincontent')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  app.renderPage()
  // ISI SW REGISTER DISINI NTAR
  swRegister()
  // ISI WEBCOCKET DISINI NTAR
})

/* homeonfocuselement.onfocus = function() {
    if(screen.width <= 768) {
        document.querySelector("#navigation").classList.add("navigation-active");
    }
}; */

window.addEventListener('resize', event => {
  if (screen.width > 768) {
    document.querySelector('#navigation').classList.remove('navigation-active')
    event.stopPropagation()
  }
})
