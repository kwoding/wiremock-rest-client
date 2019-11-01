import { resolve } from 'url';
import { MappingService } from '../service/MappingService';
import { GlobalService } from '../service/GlobalService';
import { ScenarioService } from '../service/ScenarioService';
import { RequestService } from '../service/RequestService';
import { RecordingService } from '../service/RecordingService';

export class WireMockRestClient {
    baseUri: string;

    constructor(baseUri: string) {
        this.baseUri = resolve(baseUri, '__admin/');
    }

    get mappings() {
        return new MappingService(this.baseUri);
    }

    get requests() {
        return new RequestService(this.baseUri);
    }

    get recordings() {
        return new RecordingService(this.baseUri);
    }

    get scenarios() {
        return new ScenarioService(this.baseUri);
    }

    get global() {
        return new GlobalService(this.baseUri);
    }
}
