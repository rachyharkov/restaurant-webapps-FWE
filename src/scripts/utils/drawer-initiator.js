const DrawerInitiator = {
  init ({ button, drawer, content }) {
    button.addEventListener('click', (e) => {
      this._toggleDrawer(e, drawer)
    })

    content.addEventListener('click', (e) => {
      this._closeDrawer(e, drawer)
    })
  },
  _toggleDrawer (e, drawer) {
    e.stopPropagation()
    const btnSkiptocontent = document.getElementById('skiptocontent')
    btnSkiptocontent.style.visibility = 'hidden'
    drawer.classList.toggle('navigation-active')
  },
  _closeDrawer (e, drawer) {
    e.stopPropagation()
    const searchlistcontainer = document.getElementById('search-result')
    if (searchlistcontainer) {
      searchlistcontainer.style.maxHeight = '0'
      searchlistcontainer.style.border = 'none'
    }
    drawer.classList.remove('navigation-active')
  }
}

export default DrawerInitiator
