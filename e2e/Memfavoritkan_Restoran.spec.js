const assert = require('assert');
/* eslint-disable no-undef */
Feature('Memfavoritkan Restoran')

xScenario('Mem-favoritkan salah satu restoran', async ({ I }) => {
  I.amOnPage('/#/favorite')

  I.see('We think you should add some of your favorite restaurant here, or make bread toast perhaps?', '.toasteruwu')

  I.amOnPage('/')

  I.wait(3)

  I.seeElement('.restaurant-list .info h4 a')

  const namarestoranpertama = locate('.restaurant-list .info h4 a').first()

  const tampungnamarestoranpertama = await I.grabTextFrom(namarestoranpertama)

  I.click(namarestoranpertama)

  I.wait(3)

  I.scrollPageToBottom()

  I.seeElement('.detail-info-bottom-button-container')

  I.click('#favButton')

  I.amOnPage('/#/favorite')

  I.seeElement('.restaurant-list')

  const telahdifavoritin = await I.grabTextFrom('.restaurant-list .info h4')

  assert.strictEqual(tampungnamarestoranpertama, telahdifavoritin)
})

xScenario('Batal menyukai restoran', async ({ I }) => {
  I.amOnPage('/#/favorite')

  I.see('We think you should add some of your favorite restaurant here, or make bread toast perhaps?', '.toasteruwu')

  I.amOnPage('/')

  I.wait(3)

  I.seeElement('.restaurant-list .info h4 a')

  const namarestoranpertama = locate('.restaurant-list .info h4 a').first()

  const tampungnamarestoranpertama = await I.grabTextFrom(namarestoranpertama)

  I.click(namarestoranpertama)

  I.wait(3)

  I.scrollPageToBottom()

  I.seeElement('button[aria-label="save this restaurant information for later or just like it"]')

  I.click('#favButton')

  I.amOnPage('/#/favorite')

  I.seeElement('.restaurant-list')

  const telahdifavoritin = await I.grabTextFrom('.restaurant-list .info h4')

  assert.strictEqual(tampungnamarestoranpertama, telahdifavoritin)

  I.seeElement('.restaurant-list')

  const namarestoranpertamayangtersimpan = locate('.restaurant-list .info h4 a').first()

  I.click(namarestoranpertamayangtersimpan)

  I.wait(3)

  I.scrollPageToBottom()

  I.seeElement('button[aria-label="Delete this restaurant information from your favorite"]')

  I.click('#favButton')

  I.amOnPage('/#/favorite')

  I.see('We think you should add some of your favorite restaurant here, or make bread toast perhaps?', '.toasteruwu')
})

Scenario('Dapat Melakukan pencarian film', async ({ I }) => {
  I.amOnPage('/')

  const namarestoranyangdicari = await I.grabTextFrom(locate('.restaurant-list .info h4 a').first())

  I.seeElement('#tbcarirestaurant')

  I.fillField('input[name=tbcarirestaurant]', namarestoranyangdicari)

  I.wait(2)

  I.seeElement('#search-result-0')

  const namarestoranhasilpencarian = await I.grabTextFrom('#search-result-0-detail > a')

  assert.strictEqual(namarestoranyangdicari, namarestoranhasilpencarian)

  I.click('#search-result-0-detail > a')

  I.wait(3)
})
