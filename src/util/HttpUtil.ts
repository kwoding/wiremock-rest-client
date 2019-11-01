import log4js from '@log4js-node/log4js-api';
import fetch from 'node-fetch';
import uuid from 'uuid/v4';

const logger = log4js.getLogger('wiremock-rest-client');

logger.level = 'info';

export class HttpUtil {
    static async fetch(uri: string, options: any): Promise<any> {
        const id: string = uuid();
        const allOptions: any = { 'Content-Type': 'application/json', ...options };

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
