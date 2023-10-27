import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as getRegionalProducts from '../../datasets/450/normalize';
import { getWojewodztwoFromTerytId } from '../../utils/mappings';

async function generate(pathToData: string) {

  const regionalProducts = getRegionalProducts.normalize(pathToData);

  const resultData: any[] = [];

  for (const regionalProduct of regionalProducts) {
    resultData.push({
        terytId: regionalProduct[0],
        ['Województwo']: getWojewodztwoFromTerytId(regionalProduct[0]),
        ['Liczba produktów']: regionalProduct[1].value,
        ['Liczba regionalnych produktów']: regionalProduct[1].value
    });
  }

  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2]);