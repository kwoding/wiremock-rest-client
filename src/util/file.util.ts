import * as fs from 'fs';
import * as path from 'path';
import { LogUtil } from './log.util';

export class FileUtil {
    static getFileContent(fileName: string): string {
        try {
            return fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');
        } catch (error) {
            LogUtil.handleError(`Error: ${error}`);
            return '';
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
            LogUtil.handleError(`Error: ${error}`);
        }

        return files;
    }
}
