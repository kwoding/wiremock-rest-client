import { LogLevelDesc } from 'loglevel';

export interface Options {

  logLevel?: LogLevelDesc;

  proxy?: string;

  headers?: string;

  continueOnFailure?: boolean;
}
