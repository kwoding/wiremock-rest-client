import { resolve } from 'url';
import { HttpUtil } from '../util/HttpUtil';
import { DelayDefinition } from '../model/DelayDefinition';

export class GlobalService {
    baseUri: string;

    constructor(baseUri: string) {
        this.baseUri = baseUri;
    }

    /**
     * Update global settings
     * @param delayDistribution Delay definition
     */
    async updateGlobalSettings(delayDefinition: DelayDefinition): Promise<void> {
        return HttpUtil.fetch(resolve(this.baseUri, 'settings'), {
            method: 'POST',
            body: JSON.stringify(delayDefinition)
        });
    }

    /**
     * Reset mappings to the default set and reset the request journal
     */
    async resetAll(): Promise<void> {
        return HttpUtil.fetch(resolve(this.baseUri, 'reset'), { method: 'POST' });
    }

    /**
    * Shut down the WireMock server
    */
    async shutdown(): Promise<void> {
        return HttpUtil.fetch(resolve(this.baseUri, 'shutdown'), { method: 'POST' });
    }
}
