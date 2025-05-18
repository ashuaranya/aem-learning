(function () {
    var THUMBNAIL_SELECTOR = "[data-cq-fileupload-thumbnail-img]",
      WEB_RENDITION_PREFIX = "cq5dam.web",
      RENDITIONS_PATH = "/jcr:content/renditions",
      IS_FILLED_CLASS = "is-filled";
    var registry = $(window).adaptTo("foundation-registry");
    registry.register("foundation.adapters", {
      type: "foundation-field",
      selector: "coral-fileupload",
      adapter: function (el) {
        var $el = $(el);
  
        return {
          getName: function () {
            return el.name;
          },
          setName: function (name) {
            if (el.hasAttribute("data-acg-file-upload-ready")) {
              return;
            }
            $el.attr("data-acg-file-upload-ready", true)
            el.name = name;
            itemNodePath = name.match(/(.*)\.\/.*/)[1];
            // update input names
            $el.find("input").each(function () {
              $input = $(this);
              var inputName = $input.attr("name");
              if (inputName) {
                $input.attr("name", itemNodePath + inputName)
              }
            });
            // fix thumbnail
            _fixFileUploadThumbnail($el)
          },
          isDisabled: function () {
            return el.disabled;
          },
          setDisabled: function (disabled) {
            el.disabled = disabled;
          },
          isInvalid: function () {
            return el.invalid;
          },
          setInvalid: function (invalid) {
            el.invalid = invalid;
          },
          isRequired: function () {
            return el.required;
          },
          setRequired: function (required) {
            el.required = required;
          },
          getValue: function () {
            return el.value;
          },
          setValue: function (value) {
            el.value = value;
          },
          getLabelledBy: function () {
            return el.labelledBy;
          },
          setLabelledBy: function (labelledBy) {
            el.labelledBy = labelledBy;
          },
          getValues: function () {
            return el.values;
          },
          setValues: function (values) {
            el.values = values;
          },
          clear: function () {
            el.clear();
          }
        };
      }
    });
  
    var _fixFileUploadThumbnail = function ($fileUploadEl) {
      var componentPath = $fileUploadEl.parents("form.cq-dialog").attr("action");
      var $thumbnail = $fileUploadEl.find(THUMBNAIL_SELECTOR);
      $thumbnail.empty();
      $thumbnail.closest('coral-fileupload').removeClass(IS_FILLED_CLASS);
      $.ajax({
        url: componentPath + itemNodePath.replace('./', '/') + ".json",
        cache: false
      }).done(function (data) {
        var params = {};
        $fileUploadEl.find('[data-cq-fileupload-parameter]').each(function () {
          var $param = $(this);
          var paramName = $param.data('cq-fileupload-parameter');
          var name = $param.attr('name');
          name = name.substr(name.lastIndexOf("/") + 1);
          value = $param.val();
          params[paramName] = {
            name: name,
            value: value
          };
        })
  
        var imagePath;
        if (params.filereference && params.filereference.name) {
          imagePath = data[params.filereference.name];
        } else if (params.filename && params.filename.name) {
          imagePath = params.filename ? data[params.filename.name] : undefined;
        }
  
        if (!imagePath) {
          return;
        }
  
        _createThumbnailFromRendition(imagePath, $thumbnail);
        $fileUploadEl.find('[data-cq-fileupload-parameter="filereference"]')
          .val(imagePath)
          .attr('disabled', null);
      });
    }
  
    var _createThumbnailFromRendition = function (imagePath, $container, prefix) {
      if (!prefix) {
        prefix = WEB_RENDITION_PREFIX;
      }
      var self = this;
      var requestPath = imagePath + RENDITIONS_PATH + ".1.json";
  
      $.getJSON(requestPath).then(function (renditionsData) {
        var webRenditionPath = null;
        for (var prop in renditionsData) {
          if (renditionsData.hasOwnProperty(prop)) {
            if (prop.indexOf(prefix) === 0) {
              webRenditionPath = imagePath + RENDITIONS_PATH + "/" + prop;
              break; // Only one web rendition currently. Doing same as WCMRenditionPicker.java (2014-11-13)
            }
          }
        }
        _appendThumbnail(webRenditionPath ? webRenditionPath : imagePath, $container);
  
      }, function () {
        $container.append($("<p>" + "Expecting DAM asset to have renditions, but request to " + requestPath + " failed" + "</p>"));
      });
    };
  
    var _appendThumbnail = function (thumbnailPath, $container) {
      var ckParam = "?:ck=" + (new Date()).getTime(); // Cache killer
      var $thumbnail = $("<img/>", {
        "alt": thumbnailPath,
        "class": "cq-dd-image",
        "src": thumbnailPath + ckParam
      });
  
      $container.append($thumbnail);
      $container.closest('coral-fileupload').addClass(IS_FILLED_CLASS);
    };
  })();