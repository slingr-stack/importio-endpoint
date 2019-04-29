package io.slingr.endpoints.importio;

import io.slingr.endpoints.utils.tests.EndpointTests;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import static org.junit.Assert.*;

@Ignore("For dev purposes")
public class ImportIOEndpointTest {

    private static EndpointTests test;

    @BeforeClass
    public static void init() throws Exception {
        test = EndpointTests.start(new io.slingr.endpoints.importio.Runner(), "test.properties");
    }

    @Test
    public void test(){
        assertNotNull(test.getEndpoint());
    }
}
