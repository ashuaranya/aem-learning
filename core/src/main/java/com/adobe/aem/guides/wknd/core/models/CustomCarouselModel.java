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
    @Default(values = "None")
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

    private int index = 0;
    @PostConstruct
    protected void init() {
        // Load carousel items from the multifield
        Resource carouselItemsResource = currentResource.getChild("imageItems");
        carouselItems = new ArrayList<>();
        if (carouselItemsResource != null) {
            carouselItemsResource.getChildren().forEach(resource -> {
                String imagePath = resource.getValueMap().get("imagePath", String.class);
                String itemAltText = resource.getValueMap().get("itemAltText", String.class);
                carouselItems.add(new CarouselItem(imagePath, itemAltText));
            });
        }

        // Load text field items from the multifield
        Resource textFieldsResource = currentResource.getChild("componentItems");
        textFieldItems = new ArrayList<>();
        if (textFieldsResource != null) {
            textFieldsResource.getChildren().forEach(resource -> {
                index = index + 1;
                String itemPath = resource.getValueMap().get("itemPath", String.class);
                textFieldItems.add(new TextFieldItem(itemPath, index));
            });
        }

        // Load feature items from the multifield
        Resource featureItemsResource = currentResource.getChild("feature");
        featureItems = new ArrayList<>();
        if (featureItemsResource != null) {
            featureItemsResource.getChildren().forEach(resource -> {
                String fileName = resource.getValueMap().get("imagePath", String.class);
                String itemAltText = resource.getValueMap().get("itemAltText", String.class);
                String itemTitle = resource.getValueMap().get("itemTitle", String.class);
                String itemDescription = resource.getValueMap().get("itemDescription", String.class);
                featureItems.add(new FeatureItem(fileName, itemAltText, itemTitle, itemDescription));
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
        private final String altText;

        public CarouselItem(String imagePath, String altText) {
            this.imagePath = imagePath;
            this.altText = altText;
        }

        public String getImagePath() {
            return imagePath;
        }

        public String getAltText() {
            return altText;
        }
    }

    public static class TextFieldItem {
        private final String itemPath;
        private final String index;

        public TextFieldItem(String itemPath, int index) {
            this.itemPath = itemPath;
            this.index = "item" + index;
        }

        public String getIndex() {
            return index;
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