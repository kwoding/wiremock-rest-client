import fetch from 'node-fetch';
import uuid from 'uuid/v4';
import HttpsProxyAgent from 'https-proxy-agent';
import { LogUtil } from './LogUtil';

const proxy = process.env.WRC_HTTP_PROXY;

export class HttpUtil {
    static async fetch(uri: string, options: any): Promise<any> {
        const id: string = uuid();
        const allOptions: any = { 'Content-Type': 'application/json', ...options };

        if (proxy) {
            allOptions.agent = new HttpsProxyAgent(proxy);
            LogUtil.logger().debug(`[${id}] Using proxy: ${proxy}`);
        }

        try {
            LogUtil.logger().info(`[${id}] Request: [${allOptions.method}] ${uri}`);

            if (allOptions.body !== undefined) {
                LogUtil.logger().debug(`[${id}] Request body: ${allOptions.body}`);
            }

            const response = await fetch(uri, allOptions);

            return this.parseResponse(id, response);
        } catch (error) {
            LogUtil.handleError(`[${id}] Error: ${error.message}`);
            return '';
        }
    }

    static async parseResponse(id: string, response: any): Promise<any> {
        const responseLog: string = `Response: [${response.status}] ${response.statusText}`;

        if (!response.ok) {
            LogUtil.handleError(`[${id}] ${responseLog}`);
        }

        LogUtil.logger().info(`[${id}] ${responseLog}`);
        const responseText = await response.text();

        try {
            return JSON.parse(responseText);
        } catch (error) {
            return responseText;
        }
    }
}
