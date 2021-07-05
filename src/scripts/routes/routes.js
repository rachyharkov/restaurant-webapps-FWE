import Home from '../views/pages/home'
import DetailRestaurant from '../views/pages/detailrestaurant'
import FavoriteRestaurant from '../views/pages/favouriterestaurant'

const routes = {
  '/': Home, // DEFAULT PAGE
  '/detailrestaurant/:id': DetailRestaurant,
  '/favorite': FavoriteRestaurant
}
export default routes
