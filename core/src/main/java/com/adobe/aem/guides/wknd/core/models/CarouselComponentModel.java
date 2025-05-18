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
import java.util.stream.Collectors;

/**
 * Sling model for CarouselComponent.
 */
@Getter
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CarouselComponentModel {

    /**
     * CarouselType variant option for Carousel.
     * */
    @ValueMapValue
    private String carouselType;

    /**
     * CarouselImageType variant option for Carousel.
     * */
    @Default(values = "image")
    @ValueMapValue
    private String carouselImageType;

    /**
     * Number of Slides.
     * */
    @ValueMapValue
    @Default(values = "1")
    private int numberOfSlides;

    /**
     * Active slide option for Carousel.
     * */
    @ValueMapValue
    @Default(intValues = 0)
    private int activeSlide;

    /**
     * Unique id for carousel.
     * */
    @ValueMapValue
    private String id;

    /**
     * Accessibility label for carousel.
     * */
    @ValueMapValue
    private String accessibilityLabel;

    /**
     * Accessibility label for carousel previous button.
     * */
    @ValueMapValue
    private String accessibilityPrevious;

    /**
     * Accessibility label for carousel next button.
     * */
    @ValueMapValue
    private String accessibilityNext;

    /**
     * Accessibility label for carousel play.
     * */
    @ValueMapValue
    private String accessibilityPlay;

    /**
     * Accessibility label for carousel pause button.
     * */
    @ValueMapValue
    private String accessibilityPause;

    /**
     * Accessibility label for carousel list.
     * */
    @ValueMapValue
    private String accessibilityTablist;

    /**
     * Accessibility label for carousel auto.
     * */
    @ValueMapValue
    private boolean accessibilityAutoItemTitles;

    /**
     * Checkbox to enable peekaboo function for carousel.
     * */
    @ValueMapValue
    @Default(booleanValues = true)
    private boolean enablePeekaboo;

    /**
     * Hide/show pagination option.
     * */
    @ValueMapValue
    @Default(booleanValues = false)
    private boolean hideShowPagination;

    /**
     * Hide/show carousel navigation option.
     * */
    @ValueMapValue
    @Default(booleanValues = false)
    private boolean hideShowButtons;

    /**
     * Image carousel type options.
     * */
    @ChildResource(name = "imageItems")
    private List<CarouselItem> carouselItems = new ArrayList<>();

    /**
     * Featured carousel type options.
     * */
    @ChildResource
    private List<FeatureItem> featureItems = new ArrayList<>();

    /**
     * Responsive carousel type options.
     * */
    @ChildResource(name = "componentItems")
    private List<ComponentItem> textFieldItems = new ArrayList<>();

    /**
     * Moving image type options.
     * */
    @ChildResource(name = "movingImageItems")
    private List<MovingImageItem> movingImageItems = new ArrayList<>();

    /**
     * Set Items for initialization.
     * */
    @PostConstruct
    protected void init() {
        IntStream.range(0, textFieldItems.size())
                .forEach(i -> textFieldItems.get(i).setIndex(String.valueOf(i)));

        IntStream.range(0, movingImageItems.size())
                .forEach(i -> movingImageItems.get(i).setIndex(String.valueOf(i)));

    }

    /**
     * Set array for skeleton items.
     *
     * @return Returns a virtual array of numbers.
     */
    public List<Integer> getSkeletonList() {
        return IntStream.range(0, Math.max(0, numberOfSlides))
                .boxed()
                .collect(Collectors.toList());
    }

}
