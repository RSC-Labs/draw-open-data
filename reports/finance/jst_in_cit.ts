import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as getJstsInCitReceivable from '../../datasets/1878/52650/normalize';
import { getWojewodztwoFromTerytId } from '../../utils/mappings';

async function generate(pathToData: string) {

  const jstsInPitReceivable = getJstsInCitReceivable.normalize(pathToData);

  const resultData: any[] = [];
  let allReceivable = 0;
  for (const jstInPitReceivable of jstsInPitReceivable) {
    allReceivable += jstInPitReceivable[1].value;
  }
  for (const jstInPitReceivable of jstsInPitReceivable) {
    const percent = Math.round(jstInPitReceivable[1].value / allReceivable * 10000) / 100;
    const mlnZl = Math.round(jstInPitReceivable[1].value / 1000000 * 100) / 100;
    resultData.push({
        terytId: jstInPitReceivable[0],
        ['Województwo']: getWojewodztwoFromTerytId(jstInPitReceivable[0]),
        ['Należności (w mln zł)']: mlnZl,
        ['%']: percent,
        ['Należności w % całości']: `${percent}%`
    });
  }

  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2]);