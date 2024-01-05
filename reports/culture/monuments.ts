import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as getMonuments from '../../datasets/154/53569/normalize';
import { getWojewodztwoFromTerytId } from '../../utils/mappings';

async function generate(pathToData: string) {

  const monumentsPerProvince = getMonuments.normalize(pathToData);

  const resultData: any[] = [];

  for (const monuments of monumentsPerProvince) {
    resultData.push({
        terytId: monuments[0],
        ['Województwo']: getWojewodztwoFromTerytId(monuments[0]),
        ['Liczba zabytków']: monuments[1].value,
        ['Liczba zabytków nieruchomych']: monuments[1].value
    });
  }

  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2]);