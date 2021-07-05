import CONFIG from './config'

const API_ENDPOINT = {
  RESTAURANT_LIST: `${CONFIG.BASE_URL}/list`,
  SEARCH_RESTAURANT: `${CONFIG.BASE_URL}/search?q=`,
  DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  POST_RESTAURANT_REVIEW: `${CONFIG.BASE_URL}/review`
}

export default API_ENDPOINT
