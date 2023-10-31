import { readFileSync } from 'fs-extra';
import { parse } from 'csv-parse/sync';

export function normalize(pathToData: string): Map<string, any> {

  const recordName = "liczba uczniów";

  const data = readFileSync(pathToData);
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
    group_columns_by_name: true
  });

  const resultData = new Map<string, any>();
  for (const record of records) {
    if (resultData.has(record.idTerytWojewodztwo)) {
      const currentValue = resultData.get(record.idTerytWojewodztwo);
      resultData.set(record.idTerytWojewodztwo, {
        terytId: record.idTerytWojewodztwo,
        name: record.Wojewodztwo,
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