package com.adobe.aem.guides.wknd.core.models;

import static org.apache.sling.api.resource.ResourceResolver.PROPERTY_RESOURCE_TYPE;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
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

    @ValueMapValue(name = PROPERTY_RESOURCE_TYPE, injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "No resourceType")
    protected String resourceType;

    @ValueMapValue(name = "./carouselStyles", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "ImageGallery")
    private String carouselStyles;

    @ValueMapValue(name = "./carouselType", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "ImageGallery")
    private String carouselType;

    @ValueMapValue(name = "./id", injectionStrategy = InjectionStrategy.OPTIONAL)
    @Default(values = "")
    private String id;

    @SlingObject
    private Resource currentResource;

    @SlingObject
    private ResourceResolver resourceResolver;

    private List<CarouselItem> carouselItems;
    private List<TextFieldItem> textFieldItems;

    // Accessibility Tab Variables
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

    @PostConstruct
    protected void init() {
        // Load carousel items from the multifield
        Resource carouselItemsResource = currentResource.getChild("carouselItemsSection/itemMultifield");
        carouselItems = new ArrayList<>();
        if (carouselItemsResource != null) {
            carouselItemsResource.getChildren().forEach(resource -> {
                String imagePath = resource.getValueMap().get("imagePath", String.class);
                String itemTitle = resource.getValueMap().get("itemTitle", String.class);
                String itemDescription = resource.getValueMap().get("itemDescription", String.class);
                String altText = resource.getValueMap().get("itemAltText", String.class);
                carouselItems.add(new CarouselItem(imagePath, itemTitle, itemDescription, altText));
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
        private final String altText;

        public CarouselItem(String imagePath, String title, String description, String altText) {
            this.imagePath = imagePath;
            this.title = title;
            this.description = description;
            this.altText = altText;
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

        public String getAltText() {
            return altText;
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
}