package com.adobe.aem.guides.wknd.core.models;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.List;

@Getter
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class InPageNavigationModel {

    @Self
    private SlingHttpServletRequest request;

    @ValueMapValue
    private String labels;

    @ValueMapValue
    private String ctaAltText;

    @ValueMapValue
    private String linksCTA;

    @ValueMapValue
    private boolean openInNewWindow;

    @ValueMapValue
    private boolean showCTA;

    @ValueMapValue
    private String componentId;

    @ValueMapValue
    private String titleStyles;

    @ChildResource
    private List<NavigationLink> navigationLinks;

}

