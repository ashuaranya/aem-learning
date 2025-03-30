// Import Swiper and its modules
import Swiper from "swiper";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
// import Swiper from 'swiper/bundle';

class CustomCarousel {
    constructor() {
        console.log("CustomCarousel Initialized");
        document.addEventListener("DOMContentLoaded", () => {
            this.initImageCarousel();
            // this.initThumbCarousel();
            // this.initResponsiveCarousel();
        });
    }

    private initImageCarousel() {
        const imageCarouselElement = document.getElementById("image-carousel");

        if (!imageCarouselElement) return;

        const spaceBetween = parseInt(imageCarouselElement.getAttribute("space-between") || "0");
        const navigationValue = imageCarouselElement.getAttribute("navigation") === "true";
        const keyboardValue = imageCarouselElement.getAttribute("keyboard") === "true";
        const paginationValue = imageCarouselElement.getAttribute("pagination") === "true";
        const paginationClickable = imageCarouselElement.getAttribute("pagination-clickable") === "true";

        console.log("Image Carousel Parameters:", {
            spaceBetween,
            navigation: navigationValue,
            keyboard: keyboardValue,
            pagination: paginationValue,
            paginationClickable,
        });

        // Ensure Swiper is available
        if (typeof Swiper !== "function") {
            console.error("Swiper is not loaded");
            return;
        }

        // Initialize Swiper
        new Swiper(".image-gallery-carousel", {
            spaceBetween: spaceBetween,
            navigation: navigationValue
                ? {
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                  }
                : false,
            keyboard: keyboardValue ? { enabled: true } : false,
            pagination: paginationValue
                ? {
                      el: ".swiper-pagination",
                      clickable: paginationClickable,
                  }
                : false,
        });
    }

    // Uncomment and implement these methods if needed
    // private initThumbCarousel() {
    //     // Implementation here
    // }

    // private initResponsiveCarousel() {
    //     // Implementation here
    // }
}

export default new CustomCarousel();
