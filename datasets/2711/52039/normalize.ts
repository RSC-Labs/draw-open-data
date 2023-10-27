import { readFileSync } from 'fs-extra';
import { parse } from 'csv-parse/sync';
import { readCsv } from '../../../utils/csvReader';

export function normalize(pathToData: string) : Map<string, any> {

  const recordName = "Liczba uczniów pobyt legalny";

  const records = readCsv(pathToData);

  const resultData = new Map<string, any>();
  for (const record of records) {
    if (resultData.has(record.idTerytWojewodztwo)) {
      const currentValue = resultData.get(record.idTerytWojewodztwo);
      resultData.set(record.idTerytWojewodztwo, {
        terytId: record.idTerytWojewodztwo,
        name: record['Województwo'],
        value: currentValue.value + parseInt(record[recordName]),
      });
    } else {
      resultData.set(record.idTerytWojewodztwo, {
        terytId: record.idTerytWojewodztwo,
        name: record.Wojewodztwo,
        value: parseInt(record[recordName]),
      });
    }
  }

  return resultData;
}