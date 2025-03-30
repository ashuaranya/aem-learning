package com.adobe.aem.guides.wknd.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.List;

//Getter
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CustomCarouselModel {

    @ValueMapValue
    private String carouselType;

    @ValueMapValue
    @Default(values = "1")
    private String numberOfSlides;

    @ValueMapValue
    @Default(intValues = 0)
    private int activeSlide;

    @ValueMapValue
    private String id;

    @ValueMapValue
    private String accessibilityLabel;

    @ValueMapValue
    private String accessibilityPrevious;

    @ValueMapValue
    private String accessibilityNext;

    @ValueMapValue
    private String accessibilityPlay;

    @ValueMapValue
    private String accessibilityPause;

    @ValueMapValue
    private String accessibilityTablist;

    @ValueMapValue
    private boolean accessibilityAutoItemTitles;

    @ValueMapValue
    @Default(booleanValues = false)
    private boolean enablePeekaboo;

    @ValueMapValue
    @Default(booleanValues = true)
    private boolean hideShowPagination;

    @ValueMapValue
    @Default(booleanValues = true)
    private boolean hideShowButtons;

    @ChildResource(name = "imageItems")
    private List<CarouselItem> carouselItems = new ArrayList<>();

    @ChildResource
    private List<FeatureItem> featureItems = new ArrayList<>();

    public String getCarouselType() {
        return carouselType;
    }

    public String getNumberOfSlides() {
        return numberOfSlides;
    }

    public int getActiveSlide() {
        return activeSlide;
    }

    public String getId() {
        return id;
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

    public boolean isEnablePeekaboo() {
        return enablePeekaboo;
    }

    public boolean isHideShowPagination() {
        return hideShowPagination;
    }

    public boolean isHideShowButtons() {
        return hideShowButtons;
    }

    public List<CarouselItem> getCarouselItems() {
        return carouselItems;
    }

    public List<FeatureItem> getFeatureItems() {
        return featureItems;
    }
}