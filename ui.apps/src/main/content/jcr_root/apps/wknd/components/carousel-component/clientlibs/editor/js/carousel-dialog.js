(function (document, $) {
    "use strict";

    var $document = $(document);

    /* ────────────────── helpers ────────────────── */

    function toggleVisibility($item) {
        var $imageRadio = $item.find('input[type="radio"][value="image"]');
        var $movingImageRadio = $item.find('input[type="radio"][value="movingImage"]');
        var $movingImageField = $item.find('span#moving-image-text');
        var $fileUploadField = $item.find('coral-fileupload').closest('.coral-Form-fieldwrapper');
        var $altTextWrapper = $item.find('input[name$="./altText"]').closest('.coral-Form-fieldwrapper');
        var $fileUpload = $fileUploadField.find("coral-fileupload");
        var $altTextInput = $altTextWrapper.find("input");

        function update() {
            if ($imageRadio.prop("checked")) {
                $fileUploadField.show();
                $movingImageField.hide();
                $altTextWrapper.show();
                markFieldsAsRequired();

            } else if ($movingImageRadio.prop("checked")) {
                $fileUploadField.hide();
                $movingImageField.show();
                $altTextWrapper.hide();
                markFieldsAsOptional();
            }
        }

        $imageRadio.add($movingImageRadio)
            .off("change.toggle click.toggle")
            .on("change.toggle click.toggle", update);

        update();

        function markFieldsAsRequired() {
            $fileUpload.attr("data-cq-fileupload-required", "true").attr("aria-required", "true");
            $fileUploadField.attr("data-cq-fileupload-required", "true").attr("aria-required", "true");
            $altTextInput.attr("required", "true").attr("aria-required", "true").attr("data-foundation-validation", "required");
        }

        function markFieldsAsOptional() {
            $fileUpload.removeAttr("data-cq-fileupload-required").removeAttr("aria-required");
            $fileUploadField.removeAttr("data-cq-fileupload-required").removeAttr("aria-required").removeClass("is-invalid");
            $altTextInput.removeAttr("required").removeAttr("aria-required").removeAttr("data-foundation-validation");
            $fileUploadField.find(".coral-Form-error").remove();
        }
    }


    function handleExistingAndNewItems() {
        $('coral-multifield[data-granite-coral-multifield-name="./featureItems"]')
            .find("coral-multifield-item")
            .each(function () {
                toggleVisibility($(this));
            });

        $document.off("coral-collection:add.featureItems")
            .on("coral-collection:add.featureItems", function (e) {
                toggleVisibility($(e.detail.item));
            });
    }

    function manageDialogView(value) {
        var $multiImage = $("[data-id='carousel-image']");
        var $multiResp = $("[data-id='carousel-responsive']");
        var $multiFeature = $("[data-id='carousel-feature']");

        if (value === "Responsive") {
            $multiResp.show();
            $multiImage.hide();
            $multiFeature.hide();

        } else if (value === "ImageGallery") {
            $multiImage.show();
            $multiResp.hide();
            $multiFeature.hide();
            $multiImage.show();

        } else if (value === "Feature") {
            $multiFeature.show();
            $multiResp.hide();
            $multiImage.hide();
            handleExistingAndNewItems();
        }
    }

    /* ────────────────── main initialiser ────────────────── */
    function initMyCarousel() {
        var $carouselType = $("[name='./carouselType']");
        if (!$carouselType.length) {
            return;
        }

        // trigger once after the dialog is fully rendered
        setTimeout(function () {
            $carouselType.trigger("change");
        }, 100);

        $carouselType.off("change.carouselType")
            .on("change.carouselType", function () {
                manageDialogView($(this).val());
            });

    }

    /* ────────── event wiring (normal + fallback) ────────── */
    $(document)
        .on("dialog-ready", initMyCarousel)                     // normal case
        .on("foundation-contentloaded", function (e) {          // fallback
            if ($(e.target).find("[name='./carouselType']").length) {
                initMyCarousel();
            }
        });

})(document, Granite.$);