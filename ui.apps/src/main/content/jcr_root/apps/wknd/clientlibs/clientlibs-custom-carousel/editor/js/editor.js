;(function(document, $) {
    $(document).on("cq-editor-loaded", function() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1
                        && node.matches("button[data-action='STYLE']")) {
                        var $btn = $(node);
                        var path = $btn.attr("data-path");
                        var $overlay = $(".cq-Overlay--component.is-active")
                            .filter(function() {
                                return $(this).attr("data-path") === path;
                            });
                        var text = $overlay.attr("data-text") || "";
                        if (text === "Configure the ImageGallery Carousel component"
                            || text === "Configure the Feature Carousel component") {
                            $btn.hide();
                        } else {
                            $btn.show();
                        }
                    }
                });
            });
        });
        observer.observe(document.body, {
            childList: true,
            subtree:   true
        });
    });
})(document, Granite.$);
