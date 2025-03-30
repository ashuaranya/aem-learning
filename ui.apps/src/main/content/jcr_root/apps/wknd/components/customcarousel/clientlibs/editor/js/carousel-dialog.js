(function (document, $) {
    "use strict";

    function manageDialogView(selectedValue) {
        var $multiField = $("[data-id='carousel-responsive']");
        var $multiImageField = $("[data-id='carousel-image']");
        var $multiFeatureField = $("[data-id='carousel-feature']");

        var $activeDropdown = $("[data-cmp-carousel-v1-dialog-edit-hook='activeSelect']");
        if ($activeDropdown.length > 0) {
            var $activeDropdownParent = $activeDropdown.closest(".coral-Form-fieldwrapper");
            if ($activeDropdownParent.length > 0) {
                $activeDropdownParent.hide();
            }
        }

        // Show or hide the component selection multifield based on the selected value
        if (selectedValue === "Responsive") {
            $multiField.show();
            $multiImageField.hide();
            $multiFeatureField.hide();
            if ($activeDropdownParent.length > 0) {
                $activeDropdownParent.show();
            }
        } else if (selectedValue === "ImageGallery") {
            $multiImageField.show();
            $multiField.hide();
            $multiFeatureField.hide();
            $activeDropdownParent.hide();
        } else if (selectedValue === "Feature") {
            $multiFeatureField.show();
            $multiField.hide();
            $activeDropdownParent.hide();
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

        $("#fileUpload").on("change", function (event) {
            let file = event.target.files[0];
            if (!file) return;
    
            let formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            formData.append(":operation", "dam:assetCreate");
            formData.append("mimeType", file.type);
            formData.append("_charset_", "utf-8");
    
            $.ajax({
                url: "/api/assets/my-folder/" + file.name, // DAM upload path
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    alert("File uploaded successfully: " + response.path);
                },
                error: function (error) {
                    alert("Upload failed: " + error.responseText);
                },
            });
        });
    });
})(document, Granite.$);
