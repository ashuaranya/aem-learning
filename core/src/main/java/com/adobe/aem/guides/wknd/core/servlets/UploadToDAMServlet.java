package com.adobe.aem.guides.wknd.core.servlets;

import com.adobe.granite.asset.api.AssetManager;
import com.day.cq.dam.api.Asset;
import org.apache.commons.io.IOUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Component(
    service = Servlet.class,
    property = {
        "sling.servlet.paths=/bin/custom/uploadtoDAM",
        "sling.servlet.methods=POST"
    }
)
public class UploadToDAMServlet extends SlingAllMethodsServlet {

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        
        // Get Asset Manager
        AssetManager assetManager = request.getResourceResolver().adaptTo(AssetManager.class);
        if (assetManager == null) {
            response.setStatus(SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Failed to get Asset Manager.");
            return;
        }

        // Process the uploaded file
        InputStream fileStream = request.getRequestParameter("file").getInputStream();
        String fileName = UUID.randomUUID().toString() + ".jpg";  // Unique filename
        String assetPath = "/content/dam/custom-upload/" + fileName;

        // Upload file to DAM
        Asset asset = (Asset) assetManager.createAsset(assetPath);

        if (asset != null) {
            response.setStatus(SlingHttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\":\"Upload successful\", \"path\":\"" + assetPath + "\"}");
        } else {
            response.setStatus(SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"message\":\"Upload failed\"}");
        }

        IOUtils.closeQuietly(fileStream);
    }
}
