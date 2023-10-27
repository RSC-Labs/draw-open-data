import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as getThefts from '../../datasets/3290/50349/normalize';
import { getWojewodztwoFromTerytId } from '../../utils/mappings';

async function generate(pathToData: string) {

  const thefts = getThefts.normalize(pathToData);

  const resultData: any[] = [];

  for (const theft of thefts) {
    resultData.push({
        terytId: theft[0],
        ['Województwo']: getWojewodztwoFromTerytId(theft[0]),
        ['% wykrycia']: theft[1].value,
        ['% wykrycia kradzieży']: parseInt(theft[1].value),
    });
  }

  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2]);