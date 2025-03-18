(function (document, $) {
    "use strict";

    function manageDialogView(selectedValue) {
        var $multiField = $("[data-id='carousel-responsive']");
        var $multiImageField = $("[data-id='carousel-image']");
        var $multiFeatureField = $("[data-id='carousel-feature']");

        // Show or hide the component selection multifield based on the selected value
        if (selectedValue === "Responsive") {
            $multiField.show();
            $multiImageField.hide();
            $multiFeatureField.hide();
        } else if (selectedValue === "ImageGallery") {
            $multiImageField.show();
            $multiField.hide();
            $multiFeatureField.hide();
        } else if(selectedValue === "Feature") {
            $multiFeatureField.show();
            $multiField.hide();
            $multiImageField.hide();
        }
    }

    $(document).on("dialog-ready", function () {
        var $carouselType = $("[name='./carouselType']");
        // Get the carouselType dropdown
        setTimeout(() => {
             // Trigger the change event on page load to set the initial state
            $carouselType.trigger("change");
        }, 100);
       
        // Add change event listener
        $carouselType.on("change", function () {
            var selectedValue = $(this).val();
            manageDialogView(selectedValue);
        });
    });
})(document, Granite.$);
