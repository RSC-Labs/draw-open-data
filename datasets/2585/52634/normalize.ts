import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { readCsv } from '../../../utils/csvReader';
import { convertFromUt8ToPolish, getTerytIdFromWojewodztwo } from '../../../utils/mappings';

export type ExamResults = {
  year: string,
  subject: string,
  value: string
}

export function normalize(pathToData: string) : Map<string, any> {

  // const records = readCsv(pathToData);
  const data = readFileSync(pathToData);
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
    group_columns_by_name: true,
    delimiter: ";",
  });

  const resultData = new Map<string, any>();
  for (const record of records) {
      if (record['plec'] == 'ogółem' && record['wojewodztwo'] !== 'Ogółem') {
        const rawProvince = record['wojewodztwo'];
        const province = convertFromUt8ToPolish(rawProvince);
        const terytId = getTerytIdFromWojewodztwo(province);
        if (resultData.has(terytId)) {
          const currentValue = resultData.get(terytId);
          const examResults: ExamResults = {
            year: record['rok'],
            subject: record['przedmiot'],
            value: record['wartosc']
          }
          const newValue = currentValue.value;
          newValue.push(examResults);
          resultData.set(terytId, {
            terytId: terytId,
            name: currentValue.name,
            value: newValue
          });
        } else {
          const examResults: ExamResults = {
            year: record['rok'],
            subject: record['przedmiot'],
            value: record['wartosc']
          }
          resultData.set(terytId, {
            terytId: terytId,
            name: province,
            value: [examResults]
          });
        }
      }
  }

  // console.log(resultData);

  return resultData;
}