import { resolve } from 'url';
import { HttpUtil } from '../util/http.util';
import { Scenario } from '../model/scenario.model';

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

    /**
     * Reset the state of a single scenario
     */
    async resetScenario(scenarioId: string): Promise<void> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/${scenarioId}/`, 'state'), { method: 'PUT' });
    }

    /**
     * Set the state of a single scenario
     */
    async setScenarioState(scenarioId: string, state: string): Promise<void> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/${scenarioId}/`, 'state'), {
            method: 'PUT',
            body: JSON.stringify({ state }),
        });
    }
}
