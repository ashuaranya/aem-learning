package com.adobe.aem.guides.wknd.core.models;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Getter
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class StickyNavigationModel {

    @Self
    private SlingHttpServletRequest request;

    private List<StickyItem> stickyItems;

    @PostConstruct
    protected void init() {
        Resource carouselItemsResource = request.getResource().getChild("stickyNavigationItems");
        stickyItems = new ArrayList<>();
        if (carouselItemsResource != null) {
            carouselItemsResource.getChildren().forEach(resource -> {
                String componentId = resource.getValueMap().get("componentId", String.class);
                String linkName = resource.getValueMap().get("linkName", String.class);
                stickyItems.add(new StickyNavigationModel.StickyItem(componentId, linkName));
            });
        }
    }

    public static class StickyItem {
        private String componentId;
        private String linkName;

        public StickyItem(String componentId, String linkName) {
            this.componentId = componentId;
            this.linkName = linkName;
        }

        public String getComponentId() {
            return componentId;
        }

        public String getLinkName() {
            return linkName;
        }
    }
}

