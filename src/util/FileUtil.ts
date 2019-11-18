import log4js from '@log4js-node/log4js-api';
import * as fs from 'fs';
import * as path from 'path';

const logger = log4js.getLogger('wiremock-rest-client');

logger.level = 'info';

export class FileUtil {
    static getFileContent(fileName: string): string {
        try {
            return fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');
        } catch (error) {
            logger.error(`Error: ${error}`);
            return process.exit(1);
        }
    }

    static getFilesFromDir(directoryName: string, files: string[] = []): string[] {
        const fullDirectoryPath = path.join(process.cwd(), directoryName);

        try {
            fs.readdirSync(fullDirectoryPath).forEach((fileName) => {
                const fullPath = path.join(fullDirectoryPath, fileName);
                if (fs.lstatSync(fullPath).isDirectory()) {
                    this.getFilesFromDir(path.join(directoryName, fileName), files);
                } else {
                    files.push(path.join(directoryName, fileName));
                }
            });
        } catch (error) {
            logger.error(`Error: ${error}`);
            return process.exit(1);
        }

        return files;
    }
}
