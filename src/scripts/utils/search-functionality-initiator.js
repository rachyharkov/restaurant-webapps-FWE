import API_ENDPOINT from '../globals/api-endpoint'
import CONFIG from '../globals/config'

// without sync
const SearchBoxInitiator = {
  init ({ searchbox, buttonsearch, searchresultcontainer }) {
    buttonsearch.addEventListener('focus', (e) => {
      searchresultcontainer.style.maxHeight = '0'
      searchresultcontainer.style.border = 'none'
    })

    searchbox.addEventListener('focus', (e) => {
      const btnSkiptocontent = document.getElementById('skiptocontent')
      btnSkiptocontent.style.visibility = 'visible'
      document.querySelector('#navigation').classList.remove('navigation-active')
    })

    // lets try using xhr...
    searchbox.addEventListener('input', (e) => {
      searchresultcontainer.style.border = '1px solid rgb(194, 194, 194)'
      searchresultcontainer.style.maxHeight = '140px'

      let searchList = ''

      const xhr = new XMLHttpRequest()
      xhr.open('get', API_ENDPOINT.SEARCH_RESTAURANT + e.target.value)
      xhr.send()
      xhr.loadstart = function () {
        searchresultcontainer.innerHTML = ''
        searchList = '<div><img src="./images/search.gif"></div><div><p>Searching...</p></div>'
        document.getElementById('search-results').innerHTML = searchList
      }
      xhr.onload = function () {
        searchresultcontainer.innerHTML = ''
        const datanya = JSON.parse(xhr.response)
        let datake = 0
        datanya.restaurants.forEach((restaurant) => {
          searchList = `
                    <div id="search-result-${datake}">
                        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}" style="width: 100%;margin-top: 8px;"/>
                    </div>
                    <div id="search-result-${datake}-detail" style='line-height: 2;text-align: left;padding-left: 38px;'>
                        <a href="${`/#/detailrestaurant/${restaurant.id}`}" style="font-weight: bold; color: #d72323;">${restaurant.name}</a>
                        <p style="font-size: 12px; margin: 0;">${restaurant.city}</p>
                    </div>
                    `
          datake++
          document.getElementById('search-results').innerHTML += searchList
        })
        if (datanya.founded === 0) {
          document.getElementById('search-results').innerHTML = '<div></div><div><p>😭 Omg, we\'re not finding what u\'re looking for</p></div>'
        }
      }
    })

    searchbox.addEventListener('focusout', (e) => {
      searchresultcontainer.innerHTML = ''
      searchresultcontainer.style.border = ''

    })
  }
}

export default SearchBoxInitiator
