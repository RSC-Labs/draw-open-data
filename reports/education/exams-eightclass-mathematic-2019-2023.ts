import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as get8thExamsResults from '../../datasets/2585/52634/normalize';
import { getWojewodztwoFromTerytId } from '../../utils/mappings';

async function generate(pathToData: string) {

  const examsResults = get8thExamsResults.normalize(pathToData);

  const SUBJECT = "Matematyka";
  const YEAR_1 = '2019';
  const YEAR_2 = '2023';

  const resultData: any[] = [];

  for (const examsResult of examsResults) {
    const valueForSubjectIn2019 = examsResult[1].value.find(singleValue => singleValue.subject == SUBJECT && singleValue.year == YEAR_1);
    const valueForSubjectIn2023 = examsResult[1].value.find(singleValue => singleValue.subject == SUBJECT && singleValue.year == YEAR_2);
    resultData.push({
        terytId: examsResult[0],
        ['Województwo']: getWojewodztwoFromTerytId(examsResult[0]),
        ['Rożnica']:  valueForSubjectIn2023.value - valueForSubjectIn2019.value,
        ['% 2019']: `${valueForSubjectIn2019.value}%`,
        ['% 2023']: `${valueForSubjectIn2023.value}%`,
        ['Przedmiot']: SUBJECT,
    });
  }
  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2]);