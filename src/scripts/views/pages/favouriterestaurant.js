import FavoriteRestaurantIdbOperations from '../../data/favoriterestaurant-idb'
import { createFavRestaurantItemTemplate, createErrorElement } from '../templates/template-creator'

const FavoriteRestaurant = {
  async render () {
    return `
        <section class="content-list-section">
          <h3>Favorite Restaurant</h3>
          <p style="padding: 0 2vh;">Really!? u still remember what you liked or favourited in the past? check more what you save as favorite or like below. </p>
          <div class="restaurant-lists-wrapper">
              <div class="container-list" id="restaurant-lists-container">
                  <img src="./images/search.gif">
                  <p>Favorite eh? let's see...</p>
              </div>
          </div>
        </section>
        `
  },

  async afterRender () {
    const favoritedRestaurants = await FavoriteRestaurantIdbOperations.getAllFavRestaurant()
    const restaurantsListContainer = document.querySelector('#restaurant-lists-container')
    restaurantsListContainer.innerHTML = ''
    // eslint-disable-next-line eqeqeq
    let errorMessage, errorImage
    if (favoritedRestaurants == '') {
      errorImage = 'toasteruwu'
      errorMessage = 'We think you should add some of your favorite restaurant here, or make bread toast perhaps?'
      restaurantsListContainer.innerHTML = createErrorElement(errorMessage, errorImage)
    }
    favoritedRestaurants.forEach((restaurant) => {
      restaurantsListContainer.innerHTML += createFavRestaurantItemTemplate(restaurant)
      for (let i = 1; i <= Math.trunc(restaurant.rating); i++) {
        // console.log("#star" + i + 'for' + restaurant.id);
        document.querySelector('#star' + i + 'for' + restaurant.id).classList.add('checked-star')
      }
    })
  }
}

export default FavoriteRestaurant
