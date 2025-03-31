package com.adobe.aem.guides.wknd.core.models;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Getter
public class CustomCarouselModel {

    @ValueMapValue
    private String carouselType;

    @ValueMapValue
    @Default(values = "1")
    private String numberOfSlides;

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

    @ChildResource
    private List<ComponentItem> componentItems = new ArrayList<>();

    @PostConstruct
    protected void init() {
        IntStream.range(0, componentItems.size())
                .forEach(i -> componentItems.get(i).setIndex(String.valueOf(i)));

    }

}