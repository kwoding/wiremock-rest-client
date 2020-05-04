import { LogLevelDesc } from 'loglevel';

export interface Options {

  logLevel?: LogLevelDesc;

  proxy?: string;

  continueOnFailure?: boolean;
}
