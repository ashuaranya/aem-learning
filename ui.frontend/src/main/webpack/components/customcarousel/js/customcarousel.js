// import Swiper JS
import Swiper from 'swiper';

let customCarousel = () => {

    console.log("", "CustomCarousel");
    document.addEventListener("DOMContentLoaded", function () {
        initImageCarousel();
        initThumbCarousel();
        initResponsiveCarousel();
    });

    function initImageCarousel() {
        // Select the carousel element
        var imageCarouselElement = document.getElementById("image-carousel");
    
        if (imageCarouselElement) {
            // Extract parameters from the HTML attributes
            var spaceBetween = parseInt(imageCarouselElement.getAttribute("space-between")) || 0;
            var navigationValue = imageCarouselElement.getAttribute("navigation") === "true";
            var keyboard = imageCarouselElement.getAttribute("keyboard") === "true";
            var paginationValue = imageCarouselElement.getAttribute("pagination") === "true";
            var paginationClickable = imageCarouselElement.getAttribute("pagination-clickable") === "true";
    
            console.log("Image Carousel Initialized", {
                spaceBetween: spaceBetween,
                navigation: navigationValue,
                keyboard: keyboard,
                pagination: paginationValue,
                paginationClickable: paginationClickable,
            });
            // Initialize the Swiper
            var swiper = new Swiper(".image-gallary-carousel", {
                spaceBetween: spaceBetween,
                navigation: navigationValue
                    ? {
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev",
                      }
                    : false,
                keyboard: keyboard ? { enabled: true } : false,
                pagination: paginationValue
                    ? {
                          el: ".swiper-pagination",
                          clickable: paginationClickable,
                      }
                    : false,
            });
        }
    }
    
    function initThumbCarousel() {
        // Select the carousel element
        var thumbCarouselElement = document.getElementById("thumb-carousel");
    
        if (thumbCarouselElement) {
            // Extract parameters from the HTML attributes
            var spaceBetween = parseInt(thumbCarouselElement.getAttribute("space-between")) || 0;
            var navigation = thumbCarouselElement.getAttribute("navigation") === "true";
            var keyboard = thumbCarouselElement.getAttribute("keyboard") === "true";
            var pagination = thumbCarouselElement.getAttribute("pagination") === "true";
            var paginationClickable = thumbCarouselElement.getAttribute("pagination-clickable") === "true";
    
            // Initialize the thumbnail Swiper
            var swiperThumbs = new Swiper(".mySwiper", {
                spaceBetween: spaceBetween,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
            });
    
            // Initialize the main Swiper
            var swiperMain = new Swiper(".mySwiper2", {
                spaceBetween: spaceBetween,
                navigation: navigation
                    ? {
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev",
                      }
                    : false,
                keyboard: keyboard ? { enabled: true } : false,
                pagination: pagination
                    ? {
                          el: ".swiper-pagination",
                          clickable: paginationClickable,
                      }
                    : false,
                thumbs: {
                    swiper: swiperThumbs,
                },
            });
        }
    }
    
    function initResponsiveCarousel() {
        // Select the carousel element
        var responsiveCarouselElement = document.getElementById("responsive-carousel");
        if (responsiveCarouselElement) {
            // Extract parameters from the HTML attributes
            var spaceBetween = parseInt(responsiveCarouselElement.getAttribute("space-between")) || 0;
            var navigation = responsiveCarouselElement.getAttribute("navigation") === "true";
            var keyboard = responsiveCarouselElement.getAttribute("keyboard") === "true";
            var pagination = responsiveCarouselElement.getAttribute("pagination") === "true";
            var paginationClickable = responsiveCarouselElement.getAttribute("pagination-clickable") === "true";
            var slidesPerView = parseInt(responsiveCarouselElement.getAttribute("slides-per-view")) || 1;
    
            // Initialize the Swiper
            var swiperMain = new Swiper(".responsive-carousel", {
                spaceBetween: spaceBetween,
                hashNavigation: {
                    watchState: navigation,
                },
                slidesPerView: slidesPerView,
                keyboard: keyboard ? { enabled: true } : false,
                pagination: pagination
                    ? {
                          el: ".swiper-pagination",
                          clickable: paginationClickable,
                      }
                    : false,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        }
    }
}

export default customCarousel();
