package com.adobe.aem.guides.wknd.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(AemContextExtension.class)
class CustomCarouselModelTest {

    private CustomCarouselModel customCarouselModel;

    @BeforeEach
    void setUp(AemContext context) {
        context.load().json("/CustomCarousel.json", "/content");
        context.currentResource("/content/custom_carousel");

        customCarouselModel = context.request().adaptTo(CustomCarouselModel.class);
    }

    @Test
    void getData() {
        Assertions.assertNotNull(customCarouselModel);
        Assertions.assertEquals("image-slider", customCarouselModel.getCarouselType());
        Assertions.assertEquals("5", customCarouselModel.getNumberOfSlides());
        Assertions.assertEquals("carousel123", customCarouselModel.getId());
        Assertions.assertEquals("Image Carousel", customCarouselModel.getAccessibilityLabel());
        Assertions.assertEquals("Previous Slide", customCarouselModel.getAccessibilityPrevious());
        Assertions.assertEquals("Next Slide", customCarouselModel.getAccessibilityNext());
        Assertions.assertEquals("Play Carousel", customCarouselModel.getAccessibilityPlay());
        Assertions.assertEquals("Pause Carousel", customCarouselModel.getAccessibilityPause());
        Assertions.assertEquals("Carousel Navigation", customCarouselModel.getAccessibilityTablist());
        Assertions.assertEquals(0, customCarouselModel.getActiveSlide());
        Assertions.assertTrue(customCarouselModel.isAccessibilityAutoItemTitles());
        Assertions.assertFalse(customCarouselModel.isEnablePeekaboo());
        Assertions.assertTrue(customCarouselModel.isHideShowPagination());
        Assertions.assertTrue(customCarouselModel.isHideShowButtons());

        CarouselItem carouselItem = customCarouselModel.getCarouselItems().get(0);
        Assertions.assertNotNull(carouselItem);
        Assertions.assertEquals("/content/dam/test.jpg", carouselItem.getImagePath());
        Assertions.assertEquals("image-alt", carouselItem.getAltText());

        FeatureItem featureItem = customCarouselModel.getFeatureItems().get(0);
        Assertions.assertNotNull(featureItem);
        Assertions.assertEquals("/content/dam/test.jpg", featureItem.getImagePath());
        Assertions.assertEquals("image-alt", featureItem.getAltText());
        Assertions.assertEquals("description", featureItem.getDescription());
        Assertions.assertEquals("title", featureItem.getTitle());

        ComponentItem componentItem = customCarouselModel.getTextFieldItems().get(0);
        Assertions.assertNotNull(componentItem);
        Assertions.assertEquals("/apps/wknd/components/carousel", componentItem.getItemPath());
        Assertions.assertEquals("0", componentItem.getIndex());

    }

}