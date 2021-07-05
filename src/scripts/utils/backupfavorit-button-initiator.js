import FavoriteRestaurantIdbOperations from '../data/favoriterestaurant-idb'
import { createIlovethisrestaurantButton, createIDontlovethisrestaurantanymoreButton } from '../views/templates/template-creator'

// with async
const FavoriteButtonFunctionInitiator = {
  async init ({ favoriteButtonContainer, restaurant }) {
    this._favButtonContainer = favoriteButtonContainer
    this._restaurant = restaurant

    await this._renderFavoriteRestaurantButton()
  },
  async _renderFavoriteRestaurantButton () {
    const { id } = this._restaurant

    if (await this._isRestaurantDataExist(id)) {
      this._renderButtonasNotFavoriteRestaurant()
    } else {
      this._renderButtonasFavoriteRestaurant()
    }
  },
  async _isRestaurantDataExist (id) {
    const restaurantData = await FavoriteRestaurantIdbOperations.getFavRestaurant(id)
    return !!restaurantData
  },
  _renderButtonasFavoriteRestaurant () {
    this._favButtonContainer.innerHTML = createIlovethisrestaurantButton()
    console.log('Restaurant Removed!')
    const favButton = document.querySelector('#favButton')
    favButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdbOperations.saveFavRestaurant(this._restaurant)
      this._renderFavoriteRestaurantButton()
    })
  },
  _renderButtonasNotFavoriteRestaurant () {
    this._favButtonContainer.innerHTML = createIDontlovethisrestaurantanymoreButton()
    console.log('Restaurant Saved!')
    const favButton = document.querySelector('#favButton')
    favButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdbOperations.deleteFavRestaurant(this._restaurant.id)
      this._renderFavoriteRestaurantButton()
    })
  }
}

export default FavoriteButtonFunctionInitiator
