import API_ENDPOINT from '../globals/api-endpoint'
import CONFIG from '../globals/config'

class RestaurantDataSource {
  static async RestaurantList () {
    const response = await fetch(API_ENDPOINT.RESTAURANT_LIST)
    console.log(response.status)
    const responseJson = response.json()
    return responseJson
  }

  static async RestaurantDetail (id) {
    const response = await fetch(API_ENDPOINT.DETAIL_RESTAURANT(id))
    return response.json()
  }

  static async postReviewResaurant (reviewText) {
    const response = await fetch(API_ENDPOINT.POST_RESTAURANT_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY
      },
      body: JSON.stringify(reviewText)
    })
    console.log(response)
  }
}

export default RestaurantDataSource
