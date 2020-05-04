import log from 'loglevel';

const logger = log.getLogger('wiremock-rest-client');

export class LogUtil {
    static continueOnFailure: boolean;

    static logger() {
        return logger;
    }

    static handleError(errorMessage: string) {
        logger.error(errorMessage);

        if (!LogUtil.continueOnFailure) {
            process.exit(1);
        }
    }
}
