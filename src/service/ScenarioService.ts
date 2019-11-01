import { resolve } from 'url';
import { HttpUtil } from '../util/HttpUtil';
import { Scenario } from '../model/Scenario';

export class ScenarioService {
    baseUri: string;

    constructor(baseUri: string) {
        this.baseUri = resolve(baseUri, 'scenarios');
    }

    /**
     * Get all scenarios
     */
    async getAllScenarios(): Promise<Scenario[]> {
        return HttpUtil.fetch(this.baseUri, { method: 'GET' });
    }

    /**
    * Reset the state of all scenarios
    */
    async resetAllScenarios(): Promise<void> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, 'reset'), { method: 'POST' });
    }
}
