package com.adobe.aem.guides.wknd.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CustomCarouselModel {

    @ValueMapValue(name = "./carouselType", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "ImageGallery")
    private String carouselType;

    @ValueMapValue(name = "./carouselStyles", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "none")
    private String carouselStyles;

    @ValueMapValue(name = "./id", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "")
    private String id;

    @ValueMapValue(name = "./accessibilityLabel", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "")
    private String accessibilityLabel;

    @ValueMapValue(name = "./accessibilityPrevious", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "")
    private String accessibilityPrevious;

    @ValueMapValue(name = "./accessibilityNext", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "")
    private String accessibilityNext;

    @ValueMapValue(name = "./accessibilityPlay", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "")
    private String accessibilityPlay;

    @ValueMapValue(name = "./accessibilityPause", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "")
    private String accessibilityPause;

    @ValueMapValue(name = "./accessibilityTablist", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "")
    private String accessibilityTablist;

    @ValueMapValue(name = "./accessibilityAutoItemTitles", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(booleanValues = false)
    private boolean accessibilityAutoItemTitles;

    @SlingObject
    private Resource currentResource;

    private List<CarouselItem> carouselItems;
    private List<TextFieldItem> textFieldItems;
    private List<FeatureItem> featureItems;

    @PostConstruct
    protected void init() {
        // Load carousel items from the multifield
        Resource carouselItemsResource = currentResource.getChild("carouselItemsSection/imageItemMultifield");
        carouselItems = new ArrayList<>();
        if (carouselItemsResource != null) {
            carouselItemsResource.getChildren().forEach(resource -> {
                String imagePath = resource.getValueMap().get("imagePath", String.class);
                String itemTitle = resource.getValueMap().get("itemTitle", String.class);
                String itemDescription = resource.getValueMap().get("itemDescription", String.class);
                carouselItems.add(new CarouselItem(imagePath, itemTitle, itemDescription));
            });
        }

        // Load text field items from the multifield
        Resource textFieldsResource = currentResource.getChild("textFieldsSection/itemMultifield");
        textFieldItems = new ArrayList<>();
        if (textFieldsResource != null) {
            textFieldsResource.getChildren().forEach(resource -> {
                String itemPath = resource.getValueMap().get("itemPath", String.class);
                textFieldItems.add(new TextFieldItem(itemPath));
            });
        }

        // Load feature items from the multifield
        Resource featureItemsResource = currentResource.getChild("featureFieldsSection/featureItemMultifield");
        featureItems = new ArrayList<>();
        if (featureItemsResource != null) {
            featureItemsResource.getChildren().forEach(resource -> {
                String imagePath = resource.getValueMap().get("imagePath", String.class);
                String itemAltText = resource.getValueMap().get("itemAltText", String.class);
                String itemTitle = resource.getValueMap().get("itemTitle", String.class);
                String itemDescription = resource.getValueMap().get("itemDescription", String.class);
                featureItems.add(new FeatureItem(imagePath, itemAltText, itemTitle, itemDescription));
            });
        }
    }

    public String getCarouselType() {
        return carouselType;
    }

    public String getCarouselStyles() {
        return carouselStyles;
    }

    public String getId() {
        return id;
    }

    public List<CarouselItem> getCarouselItems() {
        return carouselItems;
    }

    public List<TextFieldItem> getTextFieldItems() {
        return textFieldItems;
    }

    public List<FeatureItem> getFeatureItems() {
        return featureItems;
    }

    public String getAccessibilityLabel() {
        return accessibilityLabel;
    }

    public String getAccessibilityPrevious() {
        return accessibilityPrevious;
    }

    public String getAccessibilityNext() {
        return accessibilityNext;
    }

    public String getAccessibilityPlay() {
        return accessibilityPlay;
    }

    public String getAccessibilityPause() {
        return accessibilityPause;
    }

    public String getAccessibilityTablist() {
        return accessibilityTablist;
    }

    public boolean isAccessibilityAutoItemTitles() {
        return accessibilityAutoItemTitles;
    }

    public static class CarouselItem {
        private final String imagePath;
        private final String title;
        private final String description;

        public CarouselItem(String imagePath, String title, String description) {
            this.imagePath = imagePath;
            this.title = title;
            this.description = description;
        }

        public String getImagePath() {
            return imagePath;
        }

        public String getTitle() {
            return title;
        }

        public String getDescription() {
            return description;
        }
    }

    public static class TextFieldItem {
        private final String itemPath;

        public TextFieldItem(String itemPath) {
            this.itemPath = itemPath;
        }

        public String getItemPath() {
            return itemPath;
        }
    }

    public static class FeatureItem {
        private final String imagePath;
        private final String altText;
        private final String title;
        private final String description;

        public FeatureItem(String imagePath, String altText, String title, String description) {
            this.imagePath = imagePath;
            this.altText = altText;
            this.title = title;
            this.description = description;
        }

        public String getImagePath() {
            return imagePath;
        }

        public String getAltText() {
            return altText;
        }

        public String getTitle() {
            return title;
        }

        public String getDescription() {
            return description;
        }
    }
}