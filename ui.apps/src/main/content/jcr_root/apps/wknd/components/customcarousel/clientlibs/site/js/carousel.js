(function(document, $) {
    "use strict";

    $(document).ready(function() {
        // Ensure Swiper is initialized only when the component is available
        if ($(".mySwiper").length && $(".mySwiper2").length) {

            var swiperThumbs = new Swiper(".mySwiper", {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
            });

            var swiperMain = new Swiper(".mySwiper2", {
                spaceBetween: 10,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                thumbs: {
                    swiper: swiperThumbs,
                },
            });

        }
    });

})(document, Granite.$);
