"use strict";

function inItImageCarousel() {
    var swiper = new Swiper(".image-gallary-carousel", {
        spaceBetween: 10,
        hashNavigation: {
            watchState: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
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

function inItResponsiveCarousel() {
    var swiperMain = new Swiper(".responsive-carousel", {
        spaceBetween: 10,
        hashNavigation: {
            watchState: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initThumbCarousel();
    inItImageCarousel();
    inItResponsiveCarousel();
});
