import log from 'loglevel';
import fetch from 'node-fetch';
import uuid from 'uuid/v4';

const logger = log.getLogger('wiremock-rest-client');

export class HttpUtil {
    static async fetch(uri: string, options: any): Promise<any> {
        const id: string = uuid();
        const allOptions: any = { 'Content-Type': 'application/json', ...options };

        try {
            logger.info(`[${id}] [INFO] Request: [${allOptions.method}] ${uri}`);
            if (allOptions.body !== undefined) {
                logger.debug(`[${id}] [DEBUG] Request body: ${allOptions.body}`);
            }

            const response = await fetch(uri, allOptions);

            return this.parseResponse(id, response);
        } catch (error) {
            logger.error(`[${id}] [ERROR] Error: ${error.message}`);

            return process.exit(1);
        }
    }

    static async parseResponse(id: string, response: any): Promise<any> {
        const responseLog: string = `Response: [${response.status}] ${response.statusText}`;

        if (!response.ok) {
            logger.error(`[${id}] [ERROR] ${responseLog}`);

            return process.exit(1);
        }

        logger.info(`[${id}] [INFO] ${responseLog}`);
        const responseText = await response.text();

        try {
            return JSON.parse(responseText);
        } catch (error) {
            return responseText;
        }
    }
}
