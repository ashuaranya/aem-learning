package com.adobe.aem.guides.wknd.core.models;

import lombok.Getter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Getter
public class CustomCarouselModel {

    @Self
    private SlingHttpServletRequest request;

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

    @ChildResource(name = "componentItems")
    private List<ComponentItem> textFieldItems = new ArrayList<>();

    @Getter
    private String carouselId;

    @PostConstruct
    protected void init() {
        String resourcePath = request.getResource().getPath();
        carouselId = "0";

        if (!resourcePath.endsWith("customcarousel")) {
            carouselId = StringUtils.substringAfterLast(resourcePath, "/").replace("customcarousel_", "");
        }

        IntStream.range(0, textFieldItems.size())
                .forEach(i -> textFieldItems.get(i).setIndex(String.valueOf(i)));

    }

}