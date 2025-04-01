"use strict";

function initImageCarousel() {
    var imageCarousels = document.querySelectorAll(".swiper-container");
    imageCarousels = Array.from(imageCarousels).filter(el => el.id.includes("image-carousel"));

    imageCarousels.forEach(function (imageCarouselElement) {
        var id = imageCarouselElement.id;

        if (id) {
            var spaceBetween = parseInt(imageCarouselElement.getAttribute("space-between")) || 0;
            var navigation = imageCarouselElement.getAttribute("navigation") === "true";
            var keyboard = imageCarouselElement.getAttribute("keyboard") === "true";
            var pagination = imageCarouselElement.getAttribute("pagination") === "true";
            var paginationClickable = imageCarouselElement.getAttribute("pagination-clickable") === "true";
            var slidesPerView = parseInt(imageCarouselElement.getAttribute("slides-per-view")) || 1;
            var initSlide = parseInt(imageCarouselElement.getAttribute("initial-slide")) || 0;

            console.log("Image Carousel " + id + " initialized with initSlide: " + initSlide);

            new Swiper(`#${id} .swiper`, {
                breakpoints: {
                    "@0.00": { // Mobile view
                        slidesPerView: 1.2, // Show part of the next slide
                    },
                    768: { // Tablet view
                        slidesPerView: 2, // Show exactly 2 slides
                    },
                    1024: { // Desktop screens
                        slidesPerView: slidesPerView, // Maintain partial slide view
                        spaceBetween: 20,
                    }
                },
                initialSlide: initSlide,
                loop: true,
                spaceBetween: spaceBetween,
                navigation: navigation
                    ? {
                        nextEl: `#${id} .swiper-button-next`,
                        prevEl: `#${id} .swiper-button-prev`,
                    }
                    : false,
                keyboard: keyboard ? { enabled: true } : false,
                pagination: pagination
                    ? {
                        el: `#${id} .swiper-pagination`,
                        clickable: paginationClickable,
                    }
                    : false,
            });
        }
    });
}

function initThumbCarousel() {
    var thumbCarousels = document.querySelectorAll(".feature-carousel");

    thumbCarousels.forEach(function (thumbCarouselElement) {
        var id = thumbCarouselElement.id;

        if (id) {
            var spaceBetween = parseInt(thumbCarouselElement.getAttribute("space-between")) || 0;
            var navigation = thumbCarouselElement.getAttribute("navigation") === "true";
            var keyboard = thumbCarouselElement.getAttribute("keyboard") === "true";
            var pagination = thumbCarouselElement.getAttribute("pagination") === "true";
            var paginationClickable = thumbCarouselElement.getAttribute("pagination-clickable") === "true";

            // Initialize the thumbnail Swiper
            var swiperThumbs = new Swiper(`#${id} .mySwiper`, {
                spaceBetween: spaceBetween,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
            });

            // Initialize the main Swiper
            var swiperMain = new Swiper(`#${id} .mySwiper2`, {
                spaceBetween: spaceBetween,
                loop: true,
                navigation: navigation
                    ? {
                        nextEl: `#${id} .swiper-button-next`,
                        prevEl: `#${id} .swiper-button-prev`,
                    }
                    : false,
                keyboard: keyboard ? { enabled: true } : false,
                pagination: pagination
                    ? {
                        el: `#${id} .swiper-pagination`,
                        clickable: paginationClickable,
                    }
                    : false,
                thumbs: {
                    swiper: swiperThumbs,
                },
            });
        }
    });
}

function initResponsiveCarousel() {
    var responsiveCarousels = document.querySelectorAll(".swiper-container");
    responsiveCarousels = Array.from(responsiveCarousels).filter(el => el.id.includes("responsive-carousel"));

    responsiveCarousels.forEach(function (responsiveCarouselElement) {
        var id = responsiveCarouselElement.id;

        if (id) {
            // Extract parameters from the HTML attributes
            var spaceBetween = parseInt(responsiveCarouselElement.getAttribute("space-between")) || 0;
            var navigation = responsiveCarouselElement.getAttribute("navigation") === "true";
            var keyboard = responsiveCarouselElement.getAttribute("keyboard") === "true";
            var pagination = responsiveCarouselElement.getAttribute("pagination") === "true";
            var paginationClickable = responsiveCarouselElement.getAttribute("pagination-clickable") === "true";
            var slidesPerView = parseInt(responsiveCarouselElement.getAttribute("slides-per-view")) || 1;
            var initSlide = parseInt(responsiveCarouselElement.getAttribute("initial-slide")) || 1;

            console.log("Responsive Carousel " + id + " initialized with initSlide: " + initSlide);

            // Initialize the Swiper for this carousel
            new Swiper(`#${id} .swiper`, {
                breakpoints: {
                    "@0.00": { // Mobile view
                        slidesPerView: 1.2, // Show part of the next slide
                    },
                    768: { // Tablet view
                        slidesPerView: 2, // Show exactly 2 slides
                    },
                    1024: { // Desktop screens
                        slidesPerView: slidesPerView, // Maintain partial slide view
                        spaceBetween: 20,
                    }
                },
                loop: true,
                initialSlide: initSlide,
                spaceBetween: spaceBetween,
                centeredSlides: true,
                hashNavigation: {
                    watchState: navigation,
                },
                keyboard: keyboard ? { enabled: true } : false,
                pagination: pagination
                    ? {
                        el: `#${id} .swiper-pagination`,
                        clickable: paginationClickable,
                    }
                    : false,
                navigation: navigation
                    ? {
                        nextEl: `#${id} .swiper-button-next`,
                        prevEl: `#${id} .swiper-button-prev`,
                    }
                    : false,
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initImageCarousel();
    initThumbCarousel();
    initResponsiveCarousel();
});