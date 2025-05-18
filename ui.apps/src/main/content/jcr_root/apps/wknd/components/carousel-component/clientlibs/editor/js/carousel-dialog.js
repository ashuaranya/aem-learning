(function (document, $) {
    "use strict";

    function handleCarouselImageTypeChange(value) {
        var $carouselImageType = $("[data-id='carousel-image-type-container']");
        var $carouselMovingImageType = $("[data-id='carousel-moving-image-type-container']");
        if (value === null || value === "image") {
            $carouselImageType.show();
            $carouselMovingImageType.hide();
        } else {
            $carouselImageType.hide();
            $carouselMovingImageType.show();

            var $multiField = $("coral-multifield[data-granite-coral-multifield-name='./movingImageItems']");
            var $addButton = $multiField.find("button[coral-multifield-add]");

            $addButton.on("click", function () {
                setTimeout(function () {
                    var $newInputs = $multiField.find("input[name$='movingImageComponent']");
                    var $lastInput = $newInputs.last();

                    $lastInput.val("wknd/components/button").attr("readonly", true);
                }, 1);
            });


            $("input[name$='movingImageComponent']").each(function () {
                $(this).val("wknd/components/button").attr("readonly", true);
            });
        }

    }

    function populateSelectList(selectedList, multifieldLength) {
        const select = selectedList.closest("coral-select");

        if (!select || select.length === 0) {
            console.error("The select element was not found.");
            return;
        }

        selectedList.empty();

        select.find("coral-select-item").remove();

        let selectedValue = 0;

        for (let i = 0; i < multifieldLength; i++) {
            const coralSelectItem = document.createElement("coral-select-item");
            coralSelectItem.setAttribute("value", i);
            coralSelectItem.textContent = `Slide ${i + 1}`;
            if (i === 0) {
                coralSelectItem.setAttribute("selected", "");
                selectedValue = i;  // Default to the first item
            }
            select[0].appendChild(coralSelectItem);
        }

        select[0].value = selectedValue;

        select[0].trigger("change");

        if (select[0].elements && select[0].elements[selectedValue]) {
            select[0].elements[selectedValue].trigger("click");
        } else {
            console.warn('The selected element was not found in the select elements.');
        }
    }


    function manageDialogView(selectedValue) {
        var $multiImageField = $("[data-id='carousel-image']");
        var $multiField = $("[data-id='carousel-responsive']");
        var $multiFeatureField = $("[data-id='carousel-feature']");
        var $activeDropdown = $("coral-select[name='./activeSlide']");
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
            $activeDropdownParent.show();
            $multiFeatureField.hide();

            var componentMultifield = $("coral-multifield[data-granite-coral-multifield-name='./componentItems']")

            var multifieldLength = componentMultifield.find("coral-multifield-item-content").length;
            const selectedList = $("coral-select[name='./activeSlide']").find("coral-selectlist");
            populateSelectList(selectedList, multifieldLength);

            const addButton = componentMultifield.find("button[coral-multifield-add]");

            addButton.on("click", function () {
                multifieldLength = componentMultifield.find("coral-multifield-item-content").length + 1;

                populateSelectList(selectedList, multifieldLength);
            });
            componentMultifield.on("coral-collection:remove", function () {
                setTimeout(() => {
                    let multifieldLength = componentMultifield.find("coral-multifield-item").length;
                    populateSelectList(selectedList, multifieldLength);
                }, 100);
            });


        } else if (selectedValue === "ImageGallery") {
            $activeDropdownParent.hide();
            $multiField.hide();
            $multiFeatureField.hide();

            var $carouselImageType = $("[name='./carouselImageType']");

            const imageTypeValue = $("[name='./carouselImageType']:checked").val();

            handleCarouselImageTypeChange(imageTypeValue);
            $carouselImageType.off("change").on("change", function () {
                var selectedValue = $(this).val();
                handleCarouselImageTypeChange(selectedValue);
            });

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
