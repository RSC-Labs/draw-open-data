import { readFileSync } from 'fs-extra';
import { parse } from 'csv-parse/sync';

export function normalize(pathToData: string) : Map<string, any> {
    const data = readFileSync(pathToData);
    const records = parse(data, {
      columns: true,
      skip_empty_lines: true,
    });
  
    const recordName = 'liczba uczniów ogółem';
  
    const resultData = new Map<string, any>();
    for (const record of records) {
      if (resultData.has(record.idTerytWojewodztwo)) {
        const currentValue = resultData.get(record.idTerytWojewodztwo);
        resultData.set(record.idTerytWojewodztwo, currentValue + parseInt(record[recordName]));
      } else {
        resultData.set(record.idTerytWojewodztwo, parseInt(record[recordName]));
      }
    }
    return resultData;
}