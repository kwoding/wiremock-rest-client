#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('../package.json');
const { WireMockRestClient } = require('../dist/client/WireMockRestClient');

program
    .version(version)
    .command('load')
    .requiredOption('-f, --folder <folder>', 'Folder containing stub mappings to be loaded')
    .option('--no-reset', 'Skip resetting all stub mappings')
    .option('-u, --uri [uri]', 'WireMock base URI', 'http://localhost:8080')
    .action(async (args) => {
        const wireMock = new WireMockRestClient(args.uri);

        if (args.reset) {
            await wireMock.mappings.resetAllMappings();
        }

        await wireMock.mappings.createMappingsFromDir(args.folder);
    });

program.parseAsync(process.argv);
