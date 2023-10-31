#! /usr/bin/env node
import { Command } from 'commander'
import { exec } from 'child_process';
import * as  supportedDatasets from '../src/datasets-supported.json';

const program = new Command();

function listOfSupportedDatasetsAndResources() {
    console.log(supportedDatasets);
}

program
    .command('generate')
    .description("Generated flourish data based on datasets from dane.gov.pl")
    .option('-d, --datasets', 'List of supported datasets', listOfSupportedDatasetsAndResources)
    .action((options) => {
        // console.log(`./${options.dataset}/${options.resource}`);
        // let sources = '';
        // for (let i = 0; i < options.sources.length; i++) {
        //     sources += options.sources[i] + ' ';
        // }
        // exec(`tsc && node ./dist/datasets/${options.dataset}/${options.resource}/src/index.js ${sources}`)
    })
    .parse()

const options = program.opts();
