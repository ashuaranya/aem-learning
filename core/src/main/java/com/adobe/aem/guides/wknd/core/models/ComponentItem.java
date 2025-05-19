package com.adobe.aem.guides.wknd.core.models;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Optional;

@Getter
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ComponentItem {

    @Self
    private Resource resource;

    @ValueMapValue
    private String itemPath;

    @Setter
    private String index;

    private String itemClass;

    @PostConstruct
    void init() {
        String resourceClass = Optional.ofNullable(resource.getResourceResolver().getResource(itemPath))
                .map(res -> res.getValueMap().get("class", String.class))
                .orElse(null);
        itemClass = resourceClass != null ? resourceClass : StringUtils.substringAfterLast(itemPath, "/");
    }
}
