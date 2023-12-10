import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as getJstsInCitReceivable from '../../datasets/1878/52650/normalize';

async function generate(pathToData: string) {

  const jstsInCitReceivable = getJstsInCitReceivable.normalizeCounty(pathToData);

  const resultData: any[] = [];
  let allReceivable = 0;
  for (const jstInCitReceivable of jstsInCitReceivable) {
    allReceivable += jstInCitReceivable[1].value;
  }
  for (const jstInCitReceivable of jstsInCitReceivable) {
    const percent = Math.round(jstInCitReceivable[1].value / allReceivable * 10000) / 100;
    const mlnZl = Math.round(jstInCitReceivable[1].value / 1000000 * 100) / 100;
    resultData.push({
        terytId: jstInCitReceivable[0],
        ['Powiat']: jstInCitReceivable[1].terytName,
        ['Należności (w mln zł)']: mlnZl,
        ['%']: percent,
        ['Należności w % całości']: `${percent}%`
    });
  }
  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2]);