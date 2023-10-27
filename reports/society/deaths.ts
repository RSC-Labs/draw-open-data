import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as getDeaths from '../../datasets/1953/52391/normalize';
import * as getPeoplePerProvince from '../../datasets/3406/52359/normalize';
import { getWojewodztwoFromTerytId } from '../../utils/mappings';

async function generate(pathToData: string, pathToHelperData: string) {

  const deaths = getDeaths.normalize(pathToData);
  const peoplePerProvince = getPeoplePerProvince.normalize(pathToHelperData);

  const resultData: any[] = [];

  for (const death of deaths) {
    const percent = Math.round(parseInt(death[1].value) / peoplePerProvince.get(death[0]).value * 10000) / 100;
    resultData.push({
        terytId: death[0],
        ['Województwo']: getWojewodztwoFromTerytId(death[0]),
        ['Liczba ludności']: peoplePerProvince.get(death[0]).value,
        ['Liczba zgonów']: death[1].value,
        ['%']: percent,
        ['Liczba zgonów w % ludności']: `${percent}%`,
    });
  }
  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2], process.argv[3]);