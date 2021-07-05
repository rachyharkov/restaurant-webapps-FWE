/* eslint-disable no-undef */
import FavoriteRestaurantIdbOperations from '../src/scripts/data/favoriterestaurant-idb'
import * as TestFactories from './helpers/testFactories'

describe('Menyukai restaurant', () => {
  const addFavButtonContainer = () => {
    document.body.innerHTML = '<div class="detail-info-bottom-button-container" id="detail-info-bottom-button-container"></div>'
  }

  beforeEach(() => {
    addFavButtonContainer()
  })

  it('harus menampilkan tombol favorite kalo restoran belum pernah di favoritin sebelumnya', async () => {
    document.body.innerHTML = '<div class="detail-info-bottom-button-container" id="detail-info-bottom-button-container"></div>'
    await TestFactories.createFavButtonPresenterwithRestaurantDetail({ id: 1 })

    expect(document.querySelector('[aria-label="save this restaurant information for later or just like it"]'))
      .toBeTruthy()
  })

  it('harus jangan menampilkan tombol unfavorite saat restorant belum pernah di favoritin', async () => {
    await TestFactories.createFavButtonPresenterwithRestaurantDetail({ id: 1 })

    expect(document.querySelector('[aria-label="Delete this restaurant information from your favorite"]'))
      .toBeFalsy()
  })

  it('harusnya dapat menampilkan tombol favorit dan dapat melakukan operasi klik', async () => {
    await TestFactories.createFavButtonPresenterwithRestaurantDetail({ id: 1 })

    document.querySelector('#favButton').dispatchEvent(new Event('click'))
    const movie = await FavoriteRestaurantIdbOperations.getFavRestaurant(1)

    expect(movie).toEqual({ id: 1 })

    FavoriteRestaurantIdbOperations.deleteFavRestaurant(1)
  })

  it('harusnya jangan tambah ke daftar favorit semisal mau favoritin restoran lagi', async () => {
    await TestFactories.createFavButtonPresenterwithRestaurantDetail({ id: 1 })
    await FavoriteRestaurantIdbOperations.saveFavRestaurant({ id: 1 })

    document.querySelector('#favButton').dispatchEvent(new Event('click'))

    expect(await FavoriteRestaurantIdbOperations.getAllFavRestaurant()).toEqual([{ id: 1 }])

    FavoriteRestaurantIdbOperations.deleteFavRestaurant(1)
  })

  it('harusnya jangan tambah restorant ke favorit kalo ga ada id nya...', async () => {
    await TestFactories.createFavButtonPresenterwithRestaurantDetail([])

    document.querySelector('#favButton').dispatchEvent(new Event('click'))

    expect(await FavoriteRestaurantIdbOperations.getAllFavRestaurant()).toEqual([])
  })
})
