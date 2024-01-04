import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as getCarAccidentsPerProvince from '../../datasets/gus/carAccidents';
import * as getPeoplePerProvince from '../../datasets/3406/52359/normalize';
import { getWojewodztwoFromTerytId } from '../../utils/mappings';

async function generate(pathToData: string, pathToHelperData: string) {

  const carAccidentsPerProvince = getCarAccidentsPerProvince.normalize(pathToData, '2022');
  const peoplePerProvince = getPeoplePerProvince.normalize(pathToHelperData);

  const resultData: any[] = [];

  for (const carAccident of carAccidentsPerProvince) {
    const percent = Math.round(parseInt(carAccident[1].value) / peoplePerProvince.get(carAccident[0]).value * 10000) / 100;
    resultData.push({
        terytId: carAccident[0],
        ['Województwo']: getWojewodztwoFromTerytId(carAccident[0]),
        ['Liczba ludności']: peoplePerProvince.get(carAccident[0]).value,
        ['Liczba wypadków drogowych']: carAccident[1].value,
        ['%']: percent,
        ['Liczba wypadków drogowych w % ludności']: `${percent}%`,
    });
  }
  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2], process.argv[3]);

  