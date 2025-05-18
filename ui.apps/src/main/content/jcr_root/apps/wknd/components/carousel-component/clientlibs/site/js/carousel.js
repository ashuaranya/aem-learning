"use strict";

const updateSlideFocus = (swiper) => {
    const activeIndex = swiper.activeIndex;
    const slidesPerView = swiper.params.slidesPerView;

    swiper.slides.forEach((slide, index) => {
        const isVisible = index >= activeIndex && index < activeIndex + slidesPerView;

        slide.setAttribute("aria-hidden", String(!isVisible));

        isVisible ? slide.removeAttribute("tabindex") : slide.setAttribute("tabindex", "-1");

        slide.querySelectorAll("[tabindex]").forEach((el) => {
            isVisible ? el.removeAttribute("tabindex") : el.setAttribute("tabindex", "-1");
        });
    });
};

const updateKeyboardFocus = (swiper) => {
    const container = swiper.el;

    // Disable keyboard control by default
    swiper.keyboard.disable();

    const enableKeyboard = () => {
        swiper.keyboard.enable();
    };

    const disableKeyboard = (e) => {
        // Disable only if the new focus is *outside* the swiper container
        if (!container.contains(e.relatedTarget)) {
            swiper.keyboard.disable();
        }
    };

    // Add listeners to enable/disable based on focus
    container.addEventListener("focusin", enableKeyboard);
    container.addEventListener("focusout", disableKeyboard);

    // Defensive: clean up on destroy
    swiper.on("destroy", () => {
        container.removeEventListener("focusin", enableKeyboard);
        container.removeEventListener("focusout", disableKeyboard);
    });
};

const updatePrevNextBtns = (swiper) => {
    const prevBtn = swiper.navigation.prevEl;
    const nextBtn = swiper.navigation.nextEl;

    if (prevBtn) {
        if (prevBtn.classList.contains("swiper-button-disabled")) {
            prevBtn.setAttribute("aria-hidden", "true");
            prevBtn.setAttribute("tabindex", "-1");
        } else {
            prevBtn.setAttribute("aria-hidden", "false");
            prevBtn.setAttribute("tabindex", "0");
        }
    }

    if (nextBtn) {
        if (nextBtn.classList.contains("swiper-button-disabled")) {
            nextBtn.setAttribute("aria-hidden", "true");
            nextBtn.setAttribute("tabindex", "-1");
        } else {
            nextBtn.setAttribute("aria-hidden", "false");
            nextBtn.setAttribute("tabindex", "0");
        }
    }
};

const updatePaginationAria = (swiper) => {
    const pips = swiper.pagination?.el?.querySelectorAll("button") || [];

    pips.forEach((pip, index) => {
        const firstVisibleIndex = swiper.activeIndex;
        pip.setAttribute("aria-label", `show slide ${firstVisibleIndex + index + 1}`);
        pip.removeAttribute("aria-current");

        if (index === 0) {
            pip.setAttribute("aria-current", "true");
        }
    });
};

const swiperCommonOptions = {
    spaceBetween: 16,
    speed: 600,
    easing: "ease-out",
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    simulateTouch: true,
    noSwipingClass: "swiper-no-swiping",
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    preventClicks: false,
    zoom: {
        maxRatio: 1.2,
        minRatio: 1,
    },
    loop: false,
    rewind: false,
};

/**
 * Image Gallery Carousel init
 */
const initImageCarousel = () => {
    const imageCarousels = [...document.querySelectorAll(".custom-carousel")].filter((el) => el.id.includes("image-carousel"));

    imageCarousels.forEach((el) => {
        const id = el.id;
        if (!id) return;

        const navigation = el.dataset.hideShowButtons !== "1";
        const pagination = el.dataset.pagination !== "1";
        const keyboard = el.dataset.keyboard === "true";
        const paginationClickable = el.dataset.paginationClickable === "true";
        const slidesPerView = el.dataset.slidesPerView || 1;
        const initSlide = parseInt(el.dataset.initialSlide) >= 0 ? parseInt(el.dataset.initialSlide) : 0;
        const enablePeekaboo = el.dataset.enablePeekaboo === "1";
        const nSlideMessage = el.dataset.nextSlide;
        const pSlideMessage = el.dataset.prevSlide;

        const loadingSkeleton = el.querySelector(".loading-skeleton");
        const container = el.querySelector(".image-carousel__container");
        const controlsContainer = el.querySelector(".custom-carousel__footer");

        if (loadingSkeleton && container) {
            container.style.display = "none"; // Hide the carousel initially
            controlsContainer.style.display = "none";

            const images = container.querySelectorAll("img");
            const imagePromises = Array.from(images).map((img) => {
                return new Promise((resolve) => {
                    let settled = false;

                    const done = () => {
                        if (!settled) {
                            settled = true;
                            img.removeEventListener("load", done);
                            img.removeEventListener("error", done);
                            resolve();
                        }
                    };

                    // Resolve immediately if already loaded
                    if (img.complete) {
                        resolve();
                    } else {
                        img.addEventListener("load", done);
                        img.addEventListener("error", done);

                        // Fallback timeout — always resolve after 2s max
                        setTimeout(done, 2000);
                    }
                });
            });

            Promise.all(imagePromises).then(() => {
                loadingSkeleton.style.display = "none";
                container.style.display = "block";
                controlsContainer.style.display = "flex";

                // Now initialize Swiper
                const swiper = new Swiper(`#${id} .image-carousel__container`, {
                    swiperCommonOptions,
                    initialSlide: initSlide,
                    breakpoints: {
                        "@0.00": {
                            slidesPerView: enablePeekaboo ? 1.2 : 1,
                            spaceBetween: 16,
                            slidesPerGroup: 1,
                        },
                        720: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                            slidesPerGroup: 2,
                        },
                        992: {
                            slidesPerView: slidesPerView,
                            spaceBetween: 32,
                            slidesPerGroup: slidesPerView,
                        },
                    },
                    a11y: {
                        slideLabelMessage: "{{index}} of {{slidesLength}}",
                        paginationBulletMessage: "Display slide page {{index}}",
                        nextSlideMessage: nSlideMessage,
                        prevSlideMessage: pSlideMessage

                    },
                    keyboard: keyboard
                        ? {
                            enabled: true,
                            onlyInViewport: true,
                        }
                        : false,
                    hashNavigation: {
                        watchState: navigation,
                    },
                    navigation: navigation
                        ? {
                            nextEl: `#${id} .image-carousel__button--next`,
                            prevEl: `#${id} .image-carousel__button--prev`,
                        }
                        : false,
                    pagination: pagination
                        ? {
                            el: `#${id} .custom-carousel__pagination`,
                            clickable: paginationClickable,
                        }
                        : false,
                    on: {
                        init(swiper) {
                            updateSlideFocus(swiper);
                            updatePrevNextBtns(swiper);
                            updatePaginationAria(swiper);
                        },
                        slideChange(swiper) {
                            updateSlideFocus(swiper);
                            updatePrevNextBtns(swiper);
                            updatePaginationAria(swiper);
                        },
                        imagesReady(swiper) {
                            swiper.update(); // Recalculates layout after images are loaded
                        },
                    },
                });
            });
        }
    });
};

/**
 * Responsive Carousel init
 */
const initResponsiveCarousel = () => {
    const responsiveCarousels = [...document.querySelectorAll(".custom-carousel")].filter((el) => el.id.includes("responsive-carousel"));

    responsiveCarousels.forEach((el) => {
        const id = el.id;
        if (!id) return;

        const navigation = el.dataset.hideShowButtons !== "1";
        const pagination = el.dataset.pagination !== "1";
        const keyboard = el.dataset.keyboard === "true";
        const paginationClickable = el.dataset.paginationClickable === "true";
        const slidesPerView = el.dataset.slidesPerView || 1;
        const initSlide = parseInt(el.dataset.initialSlide) >= 0 ? parseInt(el.dataset.initialSlide) : 0;
        const enablePeekaboo = el.dataset.enablePeekaboo === "1";
        const nSlideMessage = el.dataset.nextSlide;
        const pSlideMessage = el.dataset.prevSlide;

        const loadingSkeleton = el.querySelector(".loading-skeleton");
        const container = el.querySelector(".responsive-carousel__container");
        const controlsContainer = el.querySelector(".custom-carousel__footer");

        if (loadingSkeleton && container) {
            container.style.display = "none"; // Hide carousel while loading
            controlsContainer.style.display = "none";

            const images = container.querySelectorAll("img");

            const imagePromises = Array.from(images).map((img) => {
                return new Promise((resolve) => {
                    let settled = false;

                    const done = () => {
                        if (!settled) {
                            settled = true;
                            img.removeEventListener("load", done);
                            img.removeEventListener("error", done);
                            resolve();
                        }
                    };

                    // Resolve immediately if already loaded
                    if (img.complete) {
                        resolve();
                    } else {
                        img.addEventListener("load", done);
                        img.addEventListener("error", done);

                        // Fallback timeout — always resolve after 2s max
                        setTimeout(done, 2000);
                    }
                });
            });

            Promise.all(imagePromises).then(() => {
                loadingSkeleton.style.display = "none";
                container.style.display = "block";
                controlsContainer.style.display = "flex";

                const swiper = new Swiper(`#${id} .swiper`, {
                    swiperCommonOptions,
                    initialSlide: initSlide,
                    breakpoints: {
                        "@0.00": {
                            slidesPerView: enablePeekaboo ? 1.2 : 1,
                            spaceBetween: 16,
                            slidesPerGroup: 1,
                        },
                        720: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                            slidesPerGroup: 2,
                        },
                        992: {
                            slidesPerView: slidesPerView,
                            spaceBetween: 32,
                            slidesPerGroup: slidesPerView,
                        },
                    },
                    pagination: pagination
                        ? {
                            el: `#${id} .custom-carousel__pagination`,
                            clickable: paginationClickable,
                        }
                        : false,
                    a11y: {
                        slideLabelMessage: "{{index}} of {{slidesLength}}",
                        paginationBulletMessage: "Display slide page {{index}}",
                        nextSlideMessage: nSlideMessage,
                        prevSlideMessage: pSlideMessage
                    },
                    keyboard: keyboard
                        ? {
                            enabled: true,
                            onlyInViewport: true,
                        }
                        : false,
                    hashNavigation: {
                        watchState: navigation,
                    },
                    navigation: navigation
                        ? {
                            nextEl: `#${id} .responsive-carousel__button--next`,
                            prevEl: `#${id} .responsive-carousel__button--prev`,
                        }
                        : false,
                    on: {
                        init(swiper) {
                            updateSlideFocus(swiper);
                            updatePrevNextBtns(swiper);
                            updatePaginationAria(swiper);
                        },
                        slideChange(swiper) {
                            updateSlideFocus(swiper);
                            updatePrevNextBtns(swiper);
                            updatePaginationAria(swiper);
                        },
                        imagesReady(swiper) {
                            swiper.update(); // Recalculates layout after images are loaded
                        },
                    },
                });
            });

        }
    });
};

/**
 * Feature Carousel init
 */
const initFeatureCarousel = () => {
    const thumbCarousels = [...document.querySelectorAll(".custom-carousel")].filter((el) => el.id.includes("feature-carousel"));

    thumbCarousels.forEach((el) => {
        const id = el.id;
        if (!id) return;

        const spaceBetween = parseInt(el.dataset.spaceBetween) || 0;
        const keyboard = el.dataset.keyboard === "true";
        const pagination = el.dataset.pagination !== "1";
        const paginationClickable = el.dataset.paginationClickable === "true";
        // Slide thumbs/tabs per view can be 2 , 3 , 4
        const slidesPerView = el.dataset.slidesPerView > 1 ? el.dataset.slidesPerView : 2;
        const enablePeekaboo = el.dataset.enablePeekaboo === "1";
        const nSlideMessage = el.dataset.nextSlide;
        const pSlideMessage = el.dataset.prevSlide;

        const loadingSkeleton = el.querySelector(".loading-skeleton");
        const container = el.querySelector(".feature-carousel__image-container");
        const thumbsContainer = el.querySelector(".feature-carousel__navigation-container");
        const controlsContainer = el.querySelector(".custom-carousel__footer");

        if (loadingSkeleton && container) {
            container.style.display = "none"; // Hide carousel while loading
            thumbsContainer.style.display = "none";
            controlsContainer.style.display = "none";

            const images = container.querySelectorAll("img");

            const imagePromises = Array.from(images).map((img) => {
                return new Promise((resolve) => {
                    let settled = false;

                    const done = () => {
                        if (!settled) {
                            settled = true;
                            img.removeEventListener("load", done);
                            img.removeEventListener("error", done);
                            resolve();
                        }
                    };

                    // Resolve immediately if already loaded
                    if (img.complete) {
                        resolve();
                    } else {
                        img.addEventListener("load", done);
                        img.addEventListener("error", done);

                        // Fallback timeout — always resolve after 2s max
                        setTimeout(done, 2000);
                    }
                });
            });

            Promise.all(imagePromises).then(() => {
                loadingSkeleton.style.display = "none";
                container.style.display = "block";
                thumbsContainer.style.display = "block";
                controlsContainer.style.display = "flex";

                const swiperThumbs = new Swiper(`#${id} .feature-carousel__navigation-container`, {
                    spaceBetween: 32,           // 32 px spacing rendered by Swiper
                    slidesOffsetAfter: 32,
                    freeMode: true,
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    slideToClickedSlide: true,

                    breakpoints: {
                        "@0.00": {
                            slidesPerView: enablePeekaboo ? 1.2 : 1,
                        },
                        720: {
                            slidesPerView,
                        },
                        992: {
                            slidesPerView,
                        },
                    },
                });

                const swiper = new Swiper(`#${id} .feature-carousel__image-container`, {
                    spaceBetween,
                    navigation: false,
                    keyboard: keyboard
                        ? {
                            enabled: true,
                            onlyInViewport: true,
                        }
                        : false,
                    pagination: pagination
                        ? {
                            el: `#${id} .custom-carousel__pagination`,
                            clickable: paginationClickable,
                        }
                        : false,
                    a11y: {
                        slideLabelMessage: "{{index}} of {{slidesLength}}",
                        paginationBulletMessage: "Display slide page {{index}}",
                        nextSlideMessage: nSlideMessage,
                        prevSlideMessage: pSlideMessage
                    },
                    thumbs: {
                        swiper: swiperThumbs,
                    },
                    hashNavigation: {
                        watchState: navigation,
                    },
                    navigation: {
                        nextEl: `#${id} .feature-carousel__button--next`,
                        prevEl: `#${id} .feature-carousel__button--prev`,
                    },
                    pagination: pagination
                        ? {
                            el: `#${id} .custom-carousel__pagination`,
                            clickable: true,
                        }
                        : false,
                    on: {
                        init(swiper) {
                            updateSlideFocus(swiper);
                            updatePrevNextBtns(swiper);
                            updatePaginationAria(swiper);
                            updateKeyboardFocus(swiper);
                        },
                        slideChange(swiper) {
                            updateSlideFocus(swiper);
                            updatePrevNextBtns(swiper);
                            updatePaginationAria(swiper);
                        },
                        imagesReady(swiper) {
                            swiper.update();
                        },
                    }
                });

                const buttons = thumbsContainer.querySelectorAll('.custom-carousel__thumbs-content-container');
                buttons.forEach((btn, index) => {
                    btn.addEventListener('keydown', (e) => {
                        if (e.key === 'ArrowRight') {
                            e.preventDefault();
                            const next = buttons[index + 1] || buttons[0];
                            next.focus();
                        }
                        if (e.key === 'ArrowLeft') {
                            e.preventDefault();
                            const prev = buttons[index - 1] || buttons[buttons.length - 1];
                            prev.focus();
                        }
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            btn.click(); // Trigger slide change
                        }
                    });

                    btn.addEventListener('click', () => {
                        buttons.forEach(b => b.setAttribute('aria-selected', 'false'));
                        btn.setAttribute('aria-selected', 'true');
                        swiper.slideTo(index);
                    });
                });

            });
        }
    });
};

const initAllCarousels = () => {
    document.querySelectorAll(".fixed-grid").forEach((grid) => {
        if (grid.querySelector(".carousel-component")) {
            grid.style.display = "flex";
            grid.style.flexDirection = "column";
        }
    });
};

//
document.addEventListener("DOMContentLoaded", () => {
    // This is a work around to cover browsers for the fixed-grid
    initAllCarousels();
    initImageCarousel();
    initResponsiveCarousel();
    initFeatureCarousel();
});
