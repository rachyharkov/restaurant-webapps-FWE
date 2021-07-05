import RestaurantDataSource from '../data/restaurantdata-source'

const potoPropil = ['fp1', 'fp2', 'fp3']
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

const ReviewPostFunctionality = {
  init ({ restaurantId, buttonSpawnTextbox, textBoxReviewerName, textBoxReview, buttonSendReview, buttonCancelReview, reviewListsContainer }) {
    buttonSpawnTextbox.addEventListener('click', () => {
      textBoxReview.style.display = 'block'
      textBoxReviewerName.style.display = 'block'
      buttonSendReview.style.display = 'block'
      buttonCancelReview.style.display = 'block'
      buttonSpawnTextbox.style.display = 'none'
    })

    buttonCancelReview.addEventListener('click', () => {
      textBoxReview.style.display = 'none'
      textBoxReviewerName.style.display = 'none'
      buttonSendReview.style.display = 'none'
      buttonCancelReview.style.display = 'none'
      buttonSpawnTextbox.style.display = 'block'
    })

    buttonSendReview.addEventListener('click', async (e) => {
      e.preventDefault()
      textBoxReview.style.display = 'none'
      textBoxReviewerName.style.display = 'none'
      buttonSendReview.style.display = 'none'
      buttonCancelReview.style.display = 'none'
      buttonSpawnTextbox.style.display = 'block'
      if (!textBoxReview.value || !textBoxReviewerName) { alert("U can't just review what's on your thought without word don't ya?"); return false }
      const userReview = {
        id: `${restaurantId}`,
        name: textBoxReviewerName.value,
        review: textBoxReview.value
      }
      try {
        console.log(userReview)
        this._addNewReviewElement(reviewListsContainer, textBoxReviewerName, textBoxReview, new Date().toLocaleDateString('id-ID', dateOptions))
        await RestaurantDataSource.postReviewResaurant(userReview)
      } catch (error) {
        console.log('faield')
        this._failedAddReview(reviewListsContainer)
      }
    })
  },
  _addNewReviewElement (reviewListsContainer, name, review, date) {
    const elementUserReview = `
    <div class="review-list" id="review-list">
      <h4 style="margin: 0;"><span style="display: inline-block;
      height: 32px;
      width: 16px;
  }"><img src="./images/${potoPropil[Math.floor(Math.random() * potoPropil.length)]}.png" style="width: 27px;
      margin: 11px -12px;border-radius: 50%;" alt="Photo profile of ${name.value}"></span> ${name.value} said :</h4>
      <p style="margin: 0;
      padding-left: 18px;
      font-size: 12px;">
          <span><i class="fas fa-star checked-star"></i></span>
          <span><i class="fas fa-star checked-star"></i></span>
          <span><i class="fas fa-star checked-star"></i></span>
          <span><i class="fas fa-star checked-star"></i></span>
          <span><i class="fas fa-star checked-star"></i></span>
      </p>
      <p style="margin: 0; font-size: 12px; padding-left: 20px;">${review.value}</p>
      <p style="margin: 0; font-size: 10px; padding-left: 20px;">${date}</p>
    </div>
    `
    reviewListsContainer.innerHTML += elementUserReview
  },
  _failedAddReview (reviewListsContainer) {
    reviewListsContainer.lastElementChild.innerHTML = '<p>Sorry, we can\'t post this, it might be caused by your internet connection</p>'
  }
}

export default ReviewPostFunctionality
