// Example of how a component should be initialized via JavaScript
// This script logs the value of the component's text property model message to the console

$(function () {
    "use strict";

    initVideoBtns();

    function initVideoBtns() {
        var videoEleArr = $(".cmp-movingimage video.cmp-movingimage__player");
        videoEleArr.each(function (index, video) {
            video.addEventListener("play", () => {
                updateVideoBtn(video, ".btn-pause", false);
            });
            video.addEventListener("pause", () => {
                updateVideoBtn(video, ".btn-play", false);
            });
            video.addEventListener("pause", () => {
                updateVideoBtn(video, '.btn-play', false);
            });
            video.addEventListener("ended", () => {
                updateVideoBtn(video, ".btn-replay", false);
            });
        });

        $(".cmp-movingimage .btn-play, .cmp-movingimage .btn-replay").on("click", function () {
            const videoEle = $(this).closest(".cmp-movingimage").find("video.cmp-movingimage__player");
            videoEle.trigger("play");
            updateVideoBtn(videoEle, ".btn-pause", true);
        });

        $(".cmp-movingimage .btn-pause").on("click", function () {
            const videoEle = $(this).closest(".cmp-movingimage").find("video.cmp-movingimage__player");
            videoEle.trigger("pause");
            updateVideoBtn(videoEle, ".btn-play", true);
        });
    }

    function updateVideoBtn(videoEle, iconClass, doFocus) {
        const miContainer = $(videoEle).closest(".cmp-movingimage");
        const ele = miContainer.find(".cmp-movingimage__button");
        const currentBtn = miContainer.find(iconClass);
        ele.addClass("d-none");
        currentBtn.removeClass("d-none");

        if (doFocus) {
            currentBtn.trigger("focus");
        }
    }
});