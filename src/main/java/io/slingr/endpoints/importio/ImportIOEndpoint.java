package io.slingr.endpoints.importio;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.framework.annotations.ApplicationLogger;
import io.slingr.endpoints.framework.annotations.EndpointProperty;
import io.slingr.endpoints.framework.annotations.SlingrEndpoint;
import io.slingr.endpoints.services.AppLogs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>import.io endpoint
 * <p>
 * <p>Created by dgaviola on 04/11/18.
 */
@SlingrEndpoint(name = "importio", functionPrefix = "_")
public class ImportIOEndpoint extends HttpEndpoint {
    private static final Logger logger = LoggerFactory.getLogger(ImportIOEndpoint.class);

    @ApplicationLogger
    private AppLogs appLogger;

    @EndpointProperty
    private String apiKey;

    public ImportIOEndpoint() {
    }

    public ImportIOEndpoint(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public String getApiUri() {
        return "https://import.io";
    }

    @Override
    public void endpointStarted() {
        httpService().setAllowExternalUrl(true);
        httpService().setupDefaultParam("_apikey", apiKey);
    }
}
