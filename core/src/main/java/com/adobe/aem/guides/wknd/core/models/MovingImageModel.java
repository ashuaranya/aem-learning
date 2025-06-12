package com.adobe.aem.guides.wknd.core.models;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Model class for the Moving Image AEM component.
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MovingImageModel {

    /**
     * Logger for class.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(MovingImageModel.class);

    /**
     * Author dialog property value for moving image asset.
     */
    @ValueMapValue(name = "movingImageFileReference")
    private String movingImageAsset;

    /**
     * Author dialog property value for poster image.
     */
    @ValueMapValue(name = "posterImageReference")
    private String posterImage;

    /**
     * Flag to enable Video loop.
     */
    @ValueMapValue
    private boolean loopEnabled;

    /**
     * Flag to enable Video autoplay.
     */
    @ValueMapValue
    private boolean autoplayEnabled;

    /**
     * Flag to enable Video sounds to mute.
     */
    @ValueMapValue
    private boolean muteEnabled;

    /**
     * Author dialog property value for ID.
     */
    @ValueMapValue
    private String id;

    /**
     * Instance of the resource resolver factory.
     */
    @Inject
    private ResourceResolverFactory resolverFactory;


    /**
     * Initialisation method.
     * Gets the list path from the config service
     * Resolves the page manager, gets the list page, and adapts to the Generic List class
     */
    @PostConstruct
    protected void init() throws LoginException {


    }

    /**
     * Getter that returns the moving image asset path.
     *
     * @return movingImageAsset
     */
    public String getMovingImageAsset() {
        return movingImageAsset;
    }

    /**
     * Getter that returns the posterImage property.
     *
     * @return posterImage
     */
    public String getPosterImage() {
        return posterImage;
    }

    /**
     * Flag to toggle video loop.
     *
     * @return enableLoop
     */
    public boolean isLoopEnabled() {
        return loopEnabled;
    }

    /**
     * Flag to toggle video autoplay.
     *
     * @return autoplay
     */
    public boolean isAutoplayEnabled() {
        return autoplayEnabled;
    }

    /**
     * Flag to toggle video mute.
     *
     * @return muted
     */
    public boolean isMuteEnabled() {
        return muteEnabled;
    }

    /**
     * Getter that returns the id property.
     *
     * @return id
     */
    public String getId() {
        return id;
    }
}