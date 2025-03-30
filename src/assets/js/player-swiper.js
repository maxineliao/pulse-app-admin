import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiperPlayer1 = new Swiper(".mySwiper-player-1", {
    spaceBetween: 30,
    slidesPerView: 1,
    speed: 1500,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: ".swiper-pagination-player-1",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next-player-1",
        prevEl: ".swiper-button-prev-player-1",
    },
});

const swiperPlayer2 = new Swiper(".mySwiper-player-2", {
    spaceBetween: 30,
    slidesPerView: 1,
    loop: true,
    centeredSlides: false,
    navigation: {
        nextEl: ".swiper-button-next-player-2",
        prevEl: ".swiper-button-prev-player-2",
    },breakpoints: {
        475: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
    },
    
});