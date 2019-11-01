import { resolve } from 'url';
import { ContentPattern } from '../model/ContentPattern';
import { HttpUtil } from '../util/HttpUtil';
import { RequestPattern } from '../model/RequestPattern';
import { LoggedRequest } from '../model/LoggedRequest';

export class RequestService {
    baseUri: string;

    defaultHeaders: any = { 'Content-Type': 'application/json' };

    constructor(baseUri: string) {
        this.baseUri = resolve(baseUri, 'requests');
    }

    /**
     * Get all requests in journal
     */
    async getAllRequests(): Promise<any> {
        return HttpUtil.fetch(this.baseUri, { method: 'GET' });
    }

    /**
     * Delete all requests in journal
     */
    async deleteAllRequests(): Promise<void> {
        return HttpUtil.fetch(this.baseUri, { method: 'DELETE' });
    }

    /**
     * Get request by ID
     * @param id The UUID of the logged request
     */
    async getRequest(uuid: string): Promise<any> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, uuid), { method: 'GET' });
    }

    /**
     * Delete request by ID
     * @param id The UUID of the logged request
     */
    async deleteRequest(uuid: string): Promise<void> {
        return HttpUtil.fetch(resolve(`${this.baseUri}/`, uuid), { method: 'DELETE' });
    }

    /**
     * Empty the request journal
     */
    async resetAllRequests(): Promise<void> {
        return HttpUtil.fetch(resolve(this.baseUri, 'reset'), { method: 'POST' });
    }

    /**
     * Count requests by criteria
     * @param id The UUID of the logged request
     */
    async getCount(requestPattern: RequestPattern): Promise<any> {
        return HttpUtil.fetch(resolve(this.baseUri, 'count'), {
            method: 'POST',
            body: JSON.stringify(requestPattern)
        });
    }

    /**
     * Remove requests by criteria
     * @param requestPattern Request pattern as filter criteria
     */
    async removeRequests(requestPattern: RequestPattern): Promise<any> {
        return HttpUtil.fetch(resolve(this.baseUri, 'remove'), {
            method: 'POST',
            body: JSON.stringify(requestPattern)
        });
    }

    /**
     * Delete requests mappings matching metadata
     * @param contentPattern Content pattern (metadata) as filter criteria
     */
    async removeRequestsByMetadata(contentPattern: ContentPattern): Promise<any> {
        return HttpUtil.fetch(resolve(this.baseUri, 'remove-by-metadata'), {
            method: 'POST',
            body: JSON.stringify(contentPattern)
        });
    }

    /**
     * Retrieve details of requests logged in the journal matching the specified criteria
     * @param requestPattern Request pattern as filter criteria
     */
    async findRequests(requestPattern: RequestPattern): Promise<any> {
        return HttpUtil.fetch(resolve(this.baseUri, 'find'), {
            method: 'POST',
            body: JSON.stringify(requestPattern)
        });
    }

    /**
     * Get details of logged requests that were not matched by any stub mapping
     */
    async getUnmatchedRequests(): Promise<any> {
        return HttpUtil.fetch(resolve(this.baseUri, 'unmatched'), { method: 'GET' });
    }

    /**
     * Retrieve near-misses for all unmatched requests
     */
    async getUnmatchedNearMisses(): Promise<LoggedRequest[]> {
        return HttpUtil.fetch(resolve(this.baseUri, 'unmatched/near-misses'), { method: 'GET' });
    }

    /**
     * Find at most 3 near misses for closest stub mappings to the specified request
     * @param loggedRequest Logged request as filter criteria
     */
    async getNearMissesByRequest(loggedRequest: LoggedRequest): Promise<any> {
        return HttpUtil.fetch(resolve(this.baseUri, 'near-misses/request'), {
            method: 'POST',
            body: JSON.stringify(loggedRequest)
        });
    }

    /**
     * Find at most 3 near misses for closest logged requests to the specified request pattern
     * @param requestPattern Request pattern as filter criteria
     */
    async getNearMissesByRequestPattern(requestPattern: RequestPattern): Promise<any> {
        return HttpUtil.fetch(resolve(this.baseUri, 'near-misses/request-pattern'), {
            method: 'POST',
            body: JSON.stringify(requestPattern)
        });
    }
}
