import { resolve } from 'url';
import { ContentPattern } from '../model/ContentPattern';
import { HttpUtil } from '../util/HttpUtil';
import { StubMapping } from '../model/StubMapping';
import { StubMappings } from '../model/StubMappings';
import { FileUtil } from '../util/FileUtil';

export class MappingService {
    baseUri: string;

    defaultHeaders: any = { 'Content-Type': 'application/json' };

    constructor(baseUri: string) {
        this.baseUri = resolve(baseUri, 'mappings');
    }

    /**
     * Get all stub mappings
     */
    async getAllMappings(): Promise<StubMappings> {
        return HttpUtil.fetch(this.baseUri, { method: 'GET' });
    }

    /**
     * Create a new stub mapping
     * @param stubMapping Stub mapping definition
     */
    async createMapping(stubMapping: StubMapping): Promise<StubMapping> {
        return HttpUtil.fetch(this.baseUri, {
            method: 'POST',
            body: JSON.stringify(stubMapping)
        });
    }

    /**
     * Create a new stub mapping by file
     * @param fileName File containing a stub mapping
     */
    async createMappingFromFile(fileName: string): Promise<StubMapping> {
        const requestBody: any = JSON.parse(FileUtil.getFileContent(fileName));

        return this.createMapping(requestBody);
    }

    /**
     * Create new stub mappings by directory
     * @param directoryName Directory to read files (containing stub mappings) recursively from
     */
    async createMappingsFromDir(directoryName: string): Promise<any> {
        const fileNames: string[] = FileUtil.getFilesFromDir(directoryName);

        return fileNames.map((fileName) => this.createMappingFromFile(fileName));
    }

    /**
     * Delete all stub mappings
     */
    async deleteAllMappings(): Promise<void> {
        return HttpUtil.fetch(this.baseUri, { method: 'DELETE' });
    }

    /**
     * Reset stub mappings (restore to defaults defined back the backing store)
     */
    async resetAllMappings(): Promise<void> {
        await HttpUtil.fetch(resolve(`${this.baseUri}/`, 'reset'), { method: 'POST' });
    }

    /**
     * Get single stub mapping
     * @param uuid The UUID of stub mapping
     */
    async getMapping(uuid: string): Promise<StubMapping> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, uuid), { method: 'GET' });
    }

    /**
     * Update an existing stub mapping
     * @param uuid The UUID of stub mapping
     * @param stubMapping Stub mapping definition
     */
    async updateMapping(uuid: string, stubMapping: StubMapping): Promise<StubMapping> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, uuid), {
            method: 'PUT',
            body: JSON.stringify(stubMapping)
        });
    }

    /**
     * Delete a stub mapping
     * @param uuid The UUID of stub mapping
     */
    async deleteMapping(uuid: string): Promise<void> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, uuid), { method: 'DELETE' });
    }

    /**
     * Save all persistent stub mappings to the backing store
     */
    async saveAllMappings(): Promise<void> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, 'save'), { method: 'POST' });
    }

    /**
     * Find stubs by matching on their metadata
     */
    async findByMetaData(contentPattern: ContentPattern): Promise<StubMappings> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, 'find-by-metadata'), {
            method: 'POST',
            body: JSON.stringify(contentPattern)
        });
    }

    /**
     * Remove stubs by matching on their metadata
     */
    async removeByMetaData(contentPattern: ContentPattern): Promise<void> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, 'remove-by-metadata'), {
            method: 'POST',
            body: JSON.stringify(contentPattern)
        });
    }
}
