package com.adobe.aem.guides.wknd.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(AemContextExtension.class)
class InPageNavigationModelTest {

    private InPageNavigationModel inPageNavigationModel;

    @BeforeEach
    void setUp(AemContext context) {
        context.load().json("/InPageNavigationModel.json", "/content");
        context.currentResource("/content/navigation_links");

        inPageNavigationModel = context.request().adaptTo(InPageNavigationModel.class);
    }

    @Test
    void getData() {
        Assertions.assertNotNull(inPageNavigationModel);
        Assertions.assertEquals("cta", inPageNavigationModel.getLabels());
        Assertions.assertEquals("cta-alt", inPageNavigationModel.getCtaAltText());
        Assertions.assertEquals("/content/link", inPageNavigationModel.getLinksCTA());
        Assertions.assertEquals("1", inPageNavigationModel.getComponentId());
        Assertions.assertEquals("title1", inPageNavigationModel.getTitleStyles());
        Assertions.assertTrue(inPageNavigationModel.isOpenInNewWindow());
        Assertions.assertTrue(inPageNavigationModel.isShowCTA());

        NavigationLink navigationLink = inPageNavigationModel.getNavigationLinks().get(0);
        Assertions.assertNotNull(navigationLink);
        Assertions.assertEquals("link 1", navigationLink.getTitle());
        Assertions.assertEquals("/content/link", navigationLink.getLinksTo());
        Assertions.assertEquals("link-alt", navigationLink.getAltText());

    }
}