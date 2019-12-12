import log from 'loglevel';
import fetch from 'node-fetch';
import uuid from 'uuid/v4';
import HttpsProxyAgent from 'https-proxy-agent';

const logger = log.getLogger('wiremock-rest-client');
const proxy = process.env.WRC_HTTP_PROXY;

export class HttpUtil {
    static async fetch(uri: string, options: any): Promise<any> {
        const id: string = uuid();
        const allOptions: any = { 'Content-Type': 'application/json', ...options };

        if (proxy) {
            allOptions.agent = new HttpsProxyAgent(proxy);
            logger.debug(`[${id}] Using proxy: ${proxy}`);
        }

        try {
            logger.info(`[${id}] Request: [${allOptions.method}] ${uri}`);
            if (allOptions.body !== undefined) {
                logger.debug(`[${id}] Request body: ${allOptions.body}`);
            }

            const response = await fetch(uri, allOptions);

            return this.parseResponse(id, response);
        } catch (error) {
            logger.error(`[${id}] Error: ${error.message}`);

            return process.exit(1);
        }
    }

    static async parseResponse(id: string, response: any): Promise<any> {
        const responseLog: string = `Response: [${response.status}] ${response.statusText}`;

        if (!response.ok) {
            logger.error(`[${id}] ${responseLog}`);

            return process.exit(1);
        }

        logger.info(`[${id}] ${responseLog}`);
        const responseText = await response.text();

        try {
            return JSON.parse(responseText);
        } catch (error) {
            return responseText;
        }
    }
}
