import { resolve } from 'url';
import { HttpUtil } from '../util/http.util';
import { RecordSpec } from '../model/record-spec.model';
import { StubMappings } from '../model/stub-mappings.model';

export class RecordingService {
    baseUri: string;

    constructor(baseUri: string) {
        this.baseUri = resolve(baseUri, 'recordings');
    }

    /**
     * Start recording stub mappings
     * @param recordSpec Record specification
     */
    async startRecording(recordSpec: RecordSpec): Promise<void> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, 'start'), {
            method: 'POST',
            body: JSON.stringify(recordSpec)
        });
    }

    /**
     * Stop recording stub mappings
     * @param recordSpec Record specification
     */
    async stopRecording(): Promise<StubMappings> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, 'stop'), { method: 'POST' });
    }

    /**
     * Get recording status
     */
    async getRecordingStatus(): Promise<any> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, 'status'), { method: 'GET' });
    }

    /**
     * Take a snapshot recording
     * @param recordSpec Record specification
     */
    async takeSnapshotRecording(snapshotSpec: RecordSpec): Promise<StubMappings> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, 'snapshot'), {
            method: 'POST',
            body: JSON.stringify(snapshotSpec)
        });
    }
}
