package com.adobe.aem.guides.wknd.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(AemContextExtension.class)
class AnchorLinksModelTest {

    private AnchorLinksModel anchorLinksModel;

    @BeforeEach
    void setUp(AemContext context) {
        context.load().json("/AnchorLinksTest.json", "/content");
        context.currentResource("/content/anchor_links");

        anchorLinksModel = context.request().adaptTo(AnchorLinksModel.class);
    }

    @Test
    void getData() {
        Assertions.assertNotNull(anchorLinksModel);
        Assertions.assertEquals("cta", anchorLinksModel.getLabels());
        Assertions.assertEquals("cta-alt", anchorLinksModel.getCtaAltText());
        Assertions.assertEquals("/content/link", anchorLinksModel.getLinksCTA());
        Assertions.assertEquals("1", anchorLinksModel.getComponentId());
        Assertions.assertEquals("title1", anchorLinksModel.getTitleStyles());
        Assertions.assertTrue(anchorLinksModel.isOpenInNewWindow());
        Assertions.assertTrue(anchorLinksModel.isShowCTA());

        AnchorLink anchorLink = anchorLinksModel.getAnchorLinks().get(0);
        Assertions.assertNotNull(anchorLink);
        Assertions.assertEquals("link 1", anchorLink.getTitle());
        Assertions.assertEquals("/content/link", anchorLink.getLinksTo());
        Assertions.assertEquals("link-alt", anchorLink.getAltText());

    }
}