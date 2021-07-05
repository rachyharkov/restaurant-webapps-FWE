import FavoriteButtonPresenter from '../../src/scripts/utils/favorite-button-presenter'
import FavoriteRestaurantIdbOperations from '../../src/scripts/data/favoriterestaurant-idb'

const createFavButtonPresenterwithRestaurantDetail = async (restaurant) => {
  await FavoriteButtonPresenter.init({
    favoriteButtonContainer: document.querySelector('#detail-info-bottom-button-container'),
    favoriteRestaurants: FavoriteRestaurantIdbOperations,
    restaurant
  })
}

export { createFavButtonPresenterwithRestaurantDetail }
