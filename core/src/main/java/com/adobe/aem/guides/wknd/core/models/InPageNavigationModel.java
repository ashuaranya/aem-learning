package com.adobe.aem.guides.wknd.core.models;

import com.day.cq.wcm.api.Page;
import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class InPageNavigationModel {

    @Self
    private SlingHttpServletRequest request;

    @Getter
    @ValueMapValue
    private String labels;

    @Getter
    @ValueMapValue
    private String ctaAltText;

    @Getter
    @ValueMapValue
    private String linksCTA;

    @Getter
    @ValueMapValue
    private boolean openInNewWindow;

    @Getter
    @ValueMapValue
    private boolean showCTA;

    @Getter
    @ValueMapValue
    private String componentId;

    @Getter
    @ValueMapValue
    private String titleStyles;

    @Getter
    @ChildResource
    private List<NavigationLink> navigationLinks;

    @Getter
    private String pageTitle;

    @ScriptVariable
    private Page currentPage;

    @PostConstruct
    void init(){
        pageTitle = currentPage!= null ? currentPage.getTitle() : "";
    }

}

