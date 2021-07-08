import UrlParser from '../../routes/url-parser'
import RestaurantDataSource from '../../data/restaurantdata-source'
import {
  createRestaurantDetailTemplate,
  createBottomDetailButtonTemplate,
  createErrorElement
} from '../templates/template-creator'
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter'
import ReviewPostFunctionality from '../../utils/restaurant-review-initiator'
import FavoriteRestaurantIdbOperations from '../../data/favoriterestaurant-idb'

const DetailRestaurant = {
  async render () {
    return `
            <div class="restaurantInfoWrapper" id="restaurantInfoWrapper">
                <p>Loading</p>
            </div>
            <div class="detail-info-bottom-button-container" id="detail-info-bottom-button-container">
                
            </div>
        `
  },

  async afterRender () {
    const restaurantInfoContainer = document.querySelector(
      '#restaurantInfoWrapper'
    )
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner()
      const dataRestaurant = await RestaurantDataSource.RestaurantDetail(url.id)
      const bottomButtonFixedContainer = document.querySelector(
        '#detail-info-bottom-button-container'
      )
      const buttonNavDetail = document.getElementsByClassName('btn')

      restaurantInfoContainer.innerHTML =
      createRestaurantDetailTemplate(dataRestaurant)
      bottomButtonFixedContainer.innerHTML =
      createBottomDetailButtonTemplate(dataRestaurant)
      ReviewPostFunctionality.init({
        restaurantId: dataRestaurant.restaurant.id,
        buttonSpawnTextbox: document.getElementById('btnSpawnReviewElement'),
        textBoxReviewerName: document.getElementById('tbReviewerName'),
        textBoxReview: document.getElementById('tbReviewText'),
        buttonSendReview: document.getElementById('btnSendReview'),
        buttonCancelReview: document.getElementById('btnCancelReview'),
        reviewListsContainer: document.getElementById('reviewsWrapper')
      })
      FavoriteButtonPresenter.init({
        favoriteButtonContainer: document.querySelector(
          '#favorit-button-wrapper'
        ),
        favoriteRestaurants: FavoriteRestaurantIdbOperations,
        restaurant: {
          id: dataRestaurant.restaurant.id,
          name: dataRestaurant.restaurant.name,
          description: dataRestaurant.restaurant.description,
          city: dataRestaurant.restaurant.city,
          address: dataRestaurant.restaurant.address,
          pictureId: dataRestaurant.restaurant.pictureId,
          categories: dataRestaurant.restaurant.categories,
          menus: dataRestaurant.restaurant.menus,
          rating: dataRestaurant.restaurant.rating,
          customerReviews: dataRestaurant.restaurant.customerReviews
        }
      })
      const offsetTop = restaurantInfoContainer.offsetTop

      scroll({ top: offsetTop, behavior: 'smooth' })

      const scrollFunction = function () {
        const y = window.scrollY
        if (y >= 350) {
          bottomButtonFixedContainer.className =
          'detail-info-bottom-button-container bottom-button-active'
        } else {
          bottomButtonFixedContainer.className =
          'detail-info-bottom-button-container'
        }
      }
      window.addEventListener('scroll', scrollFunction)
      const btnAddReview = document.querySelector('#btnAddReview')
      const gotoAddReview = function () {
        document
          .getElementById('addReviewSection')
          .scrollIntoView({ behavior: 'smooth', inline: 'nearest' })
      }
      btnAddReview.addEventListener('click', gotoAddReview)

      const buttonDetailClick = function () {
        const attribute = this.getAttribute('data-scrollto')
        console.log(attribute)
        document
          .getElementById(attribute)
          .scrollIntoView({ behavior: 'smooth', inline: 'nearest' })
      }

      Array.from(buttonNavDetail).forEach(function (element) {
        element.addEventListener('click', buttonDetailClick)
      })

      var lazy = function lazy() {
        document.addEventListener('lazyloaded', function (e)  {
          // e.target.parentNode.classList.add('image-loaded')
          document.querySelector('.restaurant-info-header').classList.remove('loading')
        })
      }

      lazy()
    } catch (error) {
      let errorMessage, errorImage
      if (error.message === 'Failed to fetch') {
        errorImage = 'no-connection'
        errorMessage = "Whoops, make sure you're connected to the internet"
      } else {
        errorImage = 'not-found'
        errorMessage = "Ehhh, we're soo sorry to tell you that something happened :("
      }
      restaurantInfoContainer.innerHTML = createErrorElement(errorMessage, errorImage)
    }
  }
}

export default DetailRestaurant
