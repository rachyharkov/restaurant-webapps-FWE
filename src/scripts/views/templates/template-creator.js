import CONFIG from '../../globals/config'

const potoPropil = ['fp1', 'fp2', 'fp3']

const createRestaurantDetailTemplate = (data) => `
    <div class="restaurant-info-header loading" style="position: relative;">
        <picture>
            <source media="(max-width: 600px)" srcset="${CONFIG.BASE_IMAGE_URL_SMALL + data.restaurant.pictureId}">
            <img class="lazyload" src="${CONFIG.BASE_IMAGE_URL_MEDIUM + data.restaurant.pictureId}" style="object-fit: cover;width: 100%;height: 74vh;filter: brightness(70%);" alt="background of ${data.restaurant.name} detail"/>
        </picture>
        <div>
            <h2>${data.restaurant.name}</h2>
            <p class="address1">${data.restaurant.address}</p>
            <p class="address2">${data.restaurant.city}</p>
        </div>
    </div>
    
    <div class="restaurant-info-main" style="max-width: 720px;
    margin: auto;padding-bottom: 42px;">
        <div style="padding: 0 6vh;
        position: relative;">
            <div class="detail-rating-wrapper">
                <span><i class="fas fa-star"></i></span>
                <p style="margin: 4px -8px;
                font-weight: bold;
                text-align: center;
                color: #ffffff;">${data.restaurant.rating}
                </p>
            </div>
        </div>
        <div style="width: 100%;">
            <p><b>Kategori :</b> ${data.restaurant.categories.map(kategori => kategori.name).join(', ')}</p>
        </div>
        <div class="detail-button-menu">
            <button class="btn" data-scrollto="about">
                <i class="fas fa-question"></i>
                <p style="margin: 4px;">About</p>
            </button>
            <button class="btn" data-scrollto="menus">
                <i class="fas fa-utensils"></i>
                <p style="margin: 4px;">Menu</p>
            </button>
            <button class="btn" data-scrollto="reviews">
                <i class="fas fa-star"></i>
                <p style="margin: 4px;">Reviews</p>
            </button>
        </div>
        <div class="description-section" id="about">
            <h3>About The Place</h3>
            <p>${data.restaurant.description}</p>
        </div>
        <div class="description-section" id="menus">
            <h3>Foods</h3>
            <p>${data.restaurant.menus.foods.map(makanan => makanan.name).join(', ')}</p>
        </div>
        <div class="description-section">
            <h3>Drinks</h3>
            <p>${data.restaurant.menus.drinks.map(minmuman => minmuman.name).join(', ')}</p>
        </div>
        <div class="description-section" id="reviews">
            <h3>Reviews</h3>
            <button id="btnAddReview">Add Review</button>
            <div class="reviews-wrapper" id="reviewsWrapper">
            
            ${data.restaurant.customerReviews
                .map(
                  (review) => `
                  <div class="review-list" id="review-list">
                    <h4 style="margin: 0;"><span style="display: inline-block;
                    height: 32px;
                    width: 16px;
                }"><img src="./images/${potoPropil[Math.floor(Math.random() * potoPropil.length)]}.png" width="27px" height="27px" style="margin: 11px -12px;border-radius: 50%;" alt="Photo profile of ${review.name}"></span> ${review.name} said :</h4>
                    <p style="margin: 0;
                    padding-left: 18px;
                    font-size: 12px;">
                        <span><i class="fas fa-star checked-star"></i></span>
                        <span><i class="fas fa-star checked-star"></i></span>
                        <span><i class="fas fa-star checked-star"></i></span>
                        <span><i class="fas fa-star checked-star"></i></span>
                        <span><i class="fas fa-star checked-star"></i></span>
                    </p>
                    <p style="margin: 0; font-size: 12px; padding-left: 20px;">${review.review}</p>
                    <p style="margin: 0; font-size: 10px; padding-left: 20px;">${review.date}</p>
                  </div>`
                 ).join('')
            }
            </div>
            <div class="add-comment-section" id="addReviewSection">
                <p style="font-size: 12px; font-weight: bold;">What do you think about ${data.restaurant.name}?</p>
                <input type="text" id="tbReviewerName" placeholder="What's ur name?" style="width: 100%; margin-bottom: 10px;padding: 10px;
                border-radius: 7px; display:none;"/>
                <textarea id="tbReviewText" name="w3review" rows="4" wrap="soft" placeholder="whatchu' think about this place?" style="resize: none;width: 100%;font-family: system-ui;padding: 10px;border-radius: 7px; display: none"></textarea>
                <button id="btnSpawnReviewElement" style="padding: 20px;
                font-size: 13px;
                width: 100%;
                border: 1px solid #a4a4a4;
                border-radius: 7px;"><i class="fas fa-pen"></i> Give 'em review!</button>
                <button id="btnSendReview" style="padding: 15px;
                font-size: 13px;
                width: 100%;
                border: 1px solid #a4a4a4;
                border-radius: 7px;
                display: none;
                margin-top: 10px;"><i class="fas fa-pen"></i> Post my Review</button>
                <button id="btnCancelReview" style="padding: 15px;
                font-size: 13px;
                width: 100%;
                border: 1px solid #a4a4a4;
                border-radius: 7px;
                display: none;
                margin-top: 10px;"><i class="fas fa-pen"></i> Cancel</button>
            </div>
        </div>
    </div>
    
`

const createItemRecommendedRestaurantTemplate = (restaurant) => `
    <div class="restaurant-list">
        <div class="image-restaurant-wrapper loading">
            <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId}" alt="Picture of the ${restaurant.name} restaurant in ${restaurant.city}">
        </div>
        <div class="info">
            <h4 style="margin: 12px 0;font-size: 1.2rem;"><a href="${`/#/detailrestaurant/${restaurant.id}`}" style="color:#d72323;color: #d72323;font-size: 1.2em;
            padding: 8px 50px 12px 0;">${restaurant.name}</a></h4>
            <p>Rating : <span id="star1for${restaurant.id}"><i class="fas fa-star"></i></span>
            <span id="star2for${restaurant.id}"><i class="fas fa-star"></i></span>
            <span id="star3for${restaurant.id}"><i class="fas fa-star"></i></span>
            <span id="star4for${restaurant.id}"><i class="fas fa-star"></i></span>
            <span id="star5for${restaurant.id}"><i class="fas fa-star"></i></span> (${restaurant.rating})</p>
            <p>City : ${restaurant.city}</p>
            <p>${restaurant.description}</p>
        </div>
        <div class="restaurant-fav-nav">
            
                <a href="#">
                    <span style="padding: 4px;">📄</span>Catalog
                </a>
            
            
                <a href="#">    
                    <span style="padding: 7px;">📍</span>Maps
                </a>
            
                <a href="#">
                    <span style="padding: 3px;">📞</span>Contact
                </a>
            
        </div>
    </div>
`

const createFavRestaurantItemTemplate = (restaurant) => `
    <div class="restaurant-list">
        <div class="image-restaurant-wrapper loading">
            <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId}" alt="Picture of the ${restaurant.name} restaurant in ${restaurant.city}">
        </div>
        <div class="info">
            <h4 style="margin: 12px 0;font-size: 1.2rem;"><a href="${`/#/detailrestaurant/${restaurant.id}`}" style="color:#d72323;">${restaurant.name}</a></h4>
            <p>Rating : <span id="star1for${restaurant.id}"><i class="fas fa-star"></i></span>
            <span id="star2for${restaurant.id}"><i class="fas fa-star"></i></span>
            <span id="star3for${restaurant.id}"><i class="fas fa-star"></i></span>
            <span id="star4for${restaurant.id}"><i class="fas fa-star"></i></span>
            <span id="star5for${restaurant.id}"><i class="fas fa-star"></i></span> (${restaurant.rating})</p>
            <p>City : ${restaurant.city}</p>
            <p>${restaurant.description}</p>
            <a href="#">More Information</a>
        </div>
    </div>
`

const createBottomDetailButtonTemplate = (restaurant) => `
    <div>
        <div id="info-bottom-side-fixed">
            <h3 style="margin: 3px 0 0 0;">${restaurant.restaurant.name}</h3>
            <p style="margin: 5px 0;">${restaurant.restaurant.address}</p>
        </div>
        <div style="padding-right: 5px;">
            <a href="https://www.google.co.id/maps/search/${restaurant.restaurant.name.split(' ').join('+')}" target="_blank"><i class="fas fa-map-marked-alt fa-fw" style="margin-right: 13px;"></i> Map Direction</a>
        </div>
        <div id="favorit-button-wrapper" style="padding-left: 5px;">
            
        </div>
    </div>
`

const createIlovethisrestaurantButton = () => `
    <button aria-label="save this restaurant information for later or just like it" id="favButton" class="favButton">
        <i class="far fa-heart" style="margin-top: 2px;" aria-hidden="true"></i>
    </button>
`

const createIDontlovethisrestaurantanymoreButton = () => `
    <button aria-label="Delete this restaurant information from your favorite" id="favButton" class="favButton">
        <i class="fas fa-heart" style="margin-top: 2px;" aria-hidden="true"></i>
    </button>
`

const createErrorElement = (error, img) => `
    <div style="text-align: center;margin: 0 33px;">
        <video autoplay loop muted playsinline style="width: 100%;
            max-width: 56%;
            margin: auto;">
            <source src="./images/${img}.webm" type="video/webm">
            <source src="./images/${img}.mp4" type="video/mp4">
        </video>
        <p aria-label="${error}" class="${img}">${error}</p>
    </div>
`

export {
  createRestaurantDetailTemplate,
  createItemRecommendedRestaurantTemplate,
  createBottomDetailButtonTemplate,
  createFavRestaurantItemTemplate,
  createIlovethisrestaurantButton,
  createIDontlovethisrestaurantanymoreButton,
  createErrorElement
}
