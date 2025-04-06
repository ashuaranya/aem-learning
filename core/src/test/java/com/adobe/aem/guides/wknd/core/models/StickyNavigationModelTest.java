package com.adobe.aem.guides.wknd.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(AemContextExtension.class)
class StickyNavigationModelTest {

    private StickyNavigationModel stickyNavigationModel;

    @BeforeEach
    void setUp(AemContext context) {
        context.load().json("/StickyNavigation.json", "/content");
        context.currentResource("/content/stickynavigation");

        stickyNavigationModel = context.request().adaptTo(StickyNavigationModel.class);
    }

    @Test
    void getData() {
        Assertions.assertNotNull(stickyNavigationModel);

        StickyNavigationModel.StickyItem stickyItem = stickyNavigationModel.getStickyItems().get(0);
        Assertions.assertNotNull(stickyItem);
        Assertions.assertEquals("1", stickyItem.getComponentId());
        Assertions.assertEquals("carousel", stickyItem.getLinkName());


    }
}