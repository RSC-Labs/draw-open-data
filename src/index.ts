#! /usr/bin/env node
import { Command } from 'commander'
import { exec } from 'child_process';

const program = new Command();

function listOfSupportedDatasetsAndResources() {
    const supported = [
        {
            dataset: "1963",
            resource: "45532",
            description: "1963,nauczanie-domowe",
            supportsApi: false,
            neededData: [
                "https://dane.gov.pl/pl/dataset/1963,nauczanie-domowe/resource/45532/table?page=1&per_page=20&q=&sort=",
                `https://dane.gov.pl/pl/dataset/212/resource/45734,szkoy-i-uczniowie-w-roku-szkolnym-20222023-wedug-organow-prowadzacych-i-wojewodztw-stan-na-30-wrzesnia-2022-r/table?page=1&per_page=20&q=&sort=`
            ]
        }
    ]
    console.log(supported);
}

program
    .command('generate')
    .description("Generated flourish data based on datasets from dane.gov.pl")
    .option('-d, --dataset <number>', 'Number of supported dataset, e.g. 1963')
    .option('-r, --resource <number>', 'Number of supported resource, e.g. 45532')
    .option('-src, --sources [sources...]', 'Sources required for dataset. It can vary depends on needed data. See --list for this information.')
    .option('-l, --list', 'List of supported datasets', listOfSupportedDatasetsAndResources)
    .action((options) => {
        console.log(`./${options.dataset}/${options.resource}`);
        let sources = '';
        for (let i = 0; i < options.sources.length; i++) {
            sources += options.sources[i] + ' ';
        }
        exec(`tsc && node ./dist/datasets/${options.dataset}/${options.resource}/src/index.js ${sources}`)
    })
    .parse()

const options = program.opts();
