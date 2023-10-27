import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as getMidWifes from '../../datasets/3406/52372/normalize';
import * as getPeoplePerProvince from '../../datasets/3406/52359/normalize';
import { getWojewodztwoFromTerytId } from '../../utils/mappings';

async function generate(pathToData: string, pathToHelperData: string) {

  const midWifes = getMidWifes.normalize(pathToData);
  const peoplePerProvince = getPeoplePerProvince.normalize(pathToHelperData);

  const resultData: any[] = [];

  for (const midWife of midWifes) {
    const promil = Math.round(parseInt(midWife[1].value) / peoplePerProvince.get(midWife[0]).value * 1000000) / 100;
    resultData.push({
        terytId: midWife[0],
        ['Województwo']: getWojewodztwoFromTerytId(midWife[0]),
        ['Liczba ludności']: peoplePerProvince.get(midWife[0]).value,
        ['Liczba położnych']: midWife[1].value,
        Bardzo mała liczba położnych w stosunku do ludności więc warto pomysleć o czymś innym na mapie
        ['%o']: promil,
        ['Liczba położnych w %o ludności']: `${promil}%o`,
    });
  }


  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2], process.argv[3]);