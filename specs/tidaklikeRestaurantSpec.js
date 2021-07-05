/* eslint-disable no-undef */
import FavoriteRestaurantIdbOperations from '../src/scripts/data/favoriterestaurant-idb'
import * as TestFactories from './helpers/testFactories'

const addFavButtonContainer = () => {
  document.body.innerHTML = '<div class="detail-info-bottom-button-container" id="detail-info-bottom-button-container"></div>'
}

describe('Tidak memfavoritkan restoran', () => {
  beforeEach(async () => {
    addFavButtonContainer()
    await FavoriteRestaurantIdbOperations.saveFavRestaurant({ id: 1 })
  })

  afterEach(async () => {
    await FavoriteRestaurantIdbOperations.deleteFavRestaurant(1)
  })

  it('harus menampilkan tombol "jangan jadikan favorit lagi" kalo restorannya udah disukai', async () => {
    await TestFactories.createFavButtonPresenterwithRestaurantDetail({ id: 1 })

    expect(document.querySelector('[aria-label="Delete this restaurant information from your favorite"]'))
      .toBeTruthy()
  })

  it('harus tidak menampilkan "tombol favorit" kalo restorannya udah disukai', async () => {
    await TestFactories.createFavButtonPresenterwithRestaurantDetail({ id: 1 })

    expect(document.querySelector('[aria-label="save this restaurant information for later or just like it"]'))
      .toBeFalsy()
  })

  it('harus bisa menghapus data restoran yang difavoritin dari daftar', async () => {
    await TestFactories.createFavButtonPresenterwithRestaurantDetail({ id: 1 })

    document.querySelector('[aria-label="Delete this restaurant information from your favorite"]').dispatchEvent(new Event('click'))

    expect(await FavoriteRestaurantIdbOperations.getAllFavRestaurant()).toEqual([])
  })

  it('harus jangan ada error kalo restoran yang disukai tidak ada di daftar favoritnya alias listnya', async () => {
    await TestFactories.createFavButtonPresenterwithRestaurantDetail({ id: 1 })
    await FavoriteRestaurantIdbOperations.deleteFavRestaurant(1)
    document.querySelector('[aria-label="Delete this restaurant information from your favorite"]').dispatchEvent(new Event('click'))

    expect(await FavoriteRestaurantIdbOperations.getAllFavRestaurant()).toEqual([])
  })
})
