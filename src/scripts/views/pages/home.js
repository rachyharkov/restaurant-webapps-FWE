import RestaurantDataSource from '../../data/restaurantdata-source'
import { createItemRecommendedRestaurantTemplate, createErrorElement } from '../templates/template-creator'
import SearchBoxInitiator from '../../utils/search-functionality-initiator'

const Home = {
  async render () {
    return `
        <section class="hero-element">
            <div class="jumbotron">
                <picture>
                  <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.jpg">
                  <img class="jumbotron-img lazyload" data-src="./images/heros/hero-image_2-large.jpg" alt="landing page image background"/>
                </picture>
                
                <div class="jumbotron-inelement">
                    <h2>Feel Hungry m8?</h2>
                    <p>Type something below, u'll find the restaurant nearby in a milisecond! </p>
                    <div class="tbwrapper">
                        <span>&#x1F50E;&#xFE0E;</span>
                        <input type="text" id="tbcarirestaurant" class="tbcarirestaurant" name="tbcarirestaurant" placeholder="enter the name of the cafe or restaurant that you memorize..." autocomplete="off"/>
                        <div id="search-results">

                        </div>
                        <button id="btnsearch" aria-label="Search the restaurant you're just type">Search</button>
                    </div>
                    
                </div>
            </div>
        </section>
        <section class="content-list-section">
            <h3>Recommended Place</h3>
            <p>Looking for restaurant instead? here's some recommendation for ya!</p>
            <div class="restaurant-lists-wrapper">
                <div class="container-list" id="restaurant-lists-container">
                    <img src="./images/search.gif">
                    <p>Finding out what u like ^_^</p>
                </div>
            </div>
        </section>
        `
  },

  async afterRender () {
    const elementContainer = document.querySelector('#restaurant-lists-container')
    try {
      SearchBoxInitiator.init({
        searchbox: document.querySelector('#tbcarirestaurant'), // tb cari restoran
        buttonsearch: document.querySelector('#btnsearch'), // tombol cari
        searchresultcontainer: document.getElementById('search-results')
      })
      const data = await RestaurantDataSource.RestaurantList()
      elementContainer.innerHTML = ''
      data.restaurants.forEach((restaurant) => {
        elementContainer.innerHTML += createItemRecommendedRestaurantTemplate(restaurant)
        for (let i = 1; i <= Math.trunc(restaurant.rating); i++) {
          // console.log("#star" + i + 'for' + restaurant.id);
          document.querySelector('#star' + i + 'for' + restaurant.id).classList.add('checked-star')
        }
      })
    } catch (e) {
      let errorMessage, errorImage
      if (e.message === 'Failed to fetch') {
        errorImage = 'no-connection'
        errorMessage = "Whoops, make sure you're connected to the internet"
      } else {
        errorImage = 'not-found'
        errorMessage = "Ehhh, we're soo sorry to tell you that something happened (we can't tell you coz it's too technical)"
      }
      elementContainer.innerHTML = createErrorElement(errorMessage, errorImage)
    }
  }
}

export default Home
