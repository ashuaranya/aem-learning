package com.adobe.aem.guides.wknd.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class CarouselComponentModelTest {

    private final AemContext ctx = new AemContext();
    private CarouselComponentModel model;

    @BeforeEach
    void setUp(AemContext context) {
        context.load().json("/CarouselComponentModel.json", "/content");
        context.currentResource("/content/carouselcomponent");

        model = context.request().adaptTo(CarouselComponentModel.class);
        assertNotNull(model, "Model must adapt");
    }

    @Test
    void verifyBasicMetadata_and_Defaults() {
        assertAll("basic props",
                () -> assertEquals("image-slider", model.getCarouselType()),
                () -> assertEquals(5, model.getNumberOfSlides()), // **int now**
                () -> assertEquals(0, model.getActiveSlide()), // default 0
                () -> assertEquals("carousel123", model.getId()),
                () -> assertEquals("image", model.getCarouselImageType()),
                () -> assertEquals("Image Carousel", model.getAccessibilityLabel()),
                () -> assertEquals("Previous Slide", model.getAccessibilityPrevious()),
                () -> assertEquals("Next Slide", model.getAccessibilityNext()),
                () -> assertEquals("Play Carousel", model.getAccessibilityPlay()),
                () -> assertEquals("Pause Carousel", model.getAccessibilityPause()),
                () -> assertEquals("Carousel Navigation", model.getAccessibilityTablist()),
                () -> assertTrue(model.isAccessibilityAutoItemTitles()),// optional
                () -> assertTrue(model.isEnablePeekaboo()), // **default true**
                () -> assertFalse(model.isHideShowPagination()), // **default false**
                () -> assertFalse(model.isHideShowButtons()) // **default false**
        );
    }

    @Test
    void verifyChildItems_areReadAndIndexed() {
        /* ------- Carousel images ------- */
        CarouselItem ci = model.getCarouselItems().get(0);
        assertAll("carousel item",
                () -> assertNotNull(ci),
                () -> assertEquals("/content/dam/test.jpg", ci.getImagePath()),
                () -> assertEquals("image-alt", ci.getAltText())
        );

        /* ------- Feature items --------- */
        FeatureItem fi = model.getFeatureItems().get(0);
        assertAll("feature item",
                () -> assertNotNull(fi),
                () -> assertEquals("/content/dam/test.jpg", fi.getImagePath()),
                () -> assertEquals("image-alt", fi.getAltText()),
//                () -> assertEquals("description", fi.getDescription()),
                () -> assertEquals("title", fi.getTitle())
        );

        /* ------- Component items ------- */
        ComponentItem comp = model.getTextFieldItems().get(0);
        assertAll("component item",
                () -> assertNotNull(comp),
                () -> assertEquals("/apps/aglweb/components/teaser", comp.getItemPath()),
                () -> assertEquals("0", comp.getIndex()),       // <-- set in @PostConstruct
                () -> assertEquals("teaser", comp.getItemClass())           // <-- set in @PostConstruct
        );

        /* ------- Moving Image items ------- */
        MovingImageItem movingImageItem = model.getMovingImageItems().get(0);
        assertAll("moving image item",
                () -> assertNotNull(movingImageItem),
                () -> assertEquals("/apps/aglweb/components/movingimage", movingImageItem.getMovingImageComponent()),
                () -> assertEquals("0", movingImageItem.getIndex())           // <-- set in @PostConstruct
        );
    }

    @Test
    void skeletonList_matches_numberOfSlides() {
        List<Integer> skeleton = model.getSkeletonList();
        assertAll("skeleton list",
                () -> assertEquals(model.getNumberOfSlides(), skeleton.size()),
                () -> assertEquals(0, skeleton.get(0)),         // starts at 0
                () -> assertEquals(4, skeleton.get(4))          // ends at 4 for 5 slides
        );
    }
}
