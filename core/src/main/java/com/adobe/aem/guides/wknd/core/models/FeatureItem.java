package com.adobe.aem.guides.wknd.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
//Getter
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FeatureItem {

    @ValueMapValue
    private String imagePath;

    @ValueMapValue
    private String altText;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    public String getImagePath() {
        return imagePath;
    }

    public String getAltText() {
        return altText;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
