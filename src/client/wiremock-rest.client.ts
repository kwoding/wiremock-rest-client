import log, { LogLevelDesc } from 'loglevel';
import { resolve } from 'url';
import { MappingService } from '../service/mapping.service';
import { GlobalService } from '../service/global.service';
import { ScenarioService } from '../service/scenario.service';
import { RequestService } from '../service/request.service';
import { RecordingService } from '../service/recording.service';
import { LogUtil } from '../util/log.util';
import { Options } from '../model/options.model';
import { HttpUtil } from '../util';

export class WireMockRestClient {
    baseUri: string;

    constructor(baseUri: string, options: Options = {}) {
        this.baseUri = resolve(baseUri, '__admin/');

        HttpUtil.proxy = process.env.WRC_HTTP_PROXY || options.proxy;
        HttpUtil.headers = process.env.WRC_HEADERS || options.headers || {};
        LogUtil.continueOnFailure = process.env.WRC_CONTINUE_ON_FAILURE === 'true' || options.continueOnFailure || false;
        LogUtil.logger().setLevel(
            <LogLevelDesc>process.env.WRC_LOG_LEVEL || options.logLevel || log.levels.INFO
        );
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
