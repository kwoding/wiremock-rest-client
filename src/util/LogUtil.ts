import log from 'loglevel';

const logger = log.getLogger('wiremock-rest-client');
const continueOnFailure = process.env.WRC_CONTINUE_ON_FAILURE === 'true';

export class LogUtil {
    static logger() {
        return logger;
    }

    static handleError(errorMessage: string) {
        logger.error(errorMessage);

        if (!continueOnFailure) {
            process.exit(1);
        }
    }
}
