import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as get8thExamsResults from '../../datasets/2585/52634/normalize';
import { getWojewodztwoFromTerytId } from '../../utils/mappings';

async function generate(pathToData: string) {

  const examsResults = get8thExamsResults.normalize(pathToData);

  const SUBJECT = "Język angielski";
  const YEAR = '2023';

  const resultData: any[] = [];

  for (const examsResult of examsResults) {
    const valueForSubject = examsResult[1].value.find(singleValue => singleValue.subject == SUBJECT && singleValue.year == YEAR);
    resultData.push({
        terytId: examsResult[0],
        ['Województwo']: getWojewodztwoFromTerytId(examsResult[0]),
        ['Wynik']: valueForSubject.value,
        ['%']: `${valueForSubject.value}%`,
        ['Przedmiot']: valueForSubject.subject,
        ['Rok']: valueForSubject.year
    });
  }
  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2]);