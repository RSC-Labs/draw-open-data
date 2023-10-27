import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { convertFromUt8ToPolish, getTerytIdFromWojewodztwo } from '../../../utils/mappings';

export function normalize(pathToData: string) : Map<string, any> {

  const data = readFileSync(pathToData);
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
    group_columns_by_name: true,
    from_line: 5,
    delimiter: ";",
  });

  const resultData = new Map<string, any>();
  for (const record of records) {
    const rawProvince = record[Object.keys(record)[0]];
    const value = record[Object.keys(record)[1]];
    if (rawProvince !== 'POLSKA') {
        const province = convertFromUt8ToPolish(rawProvince);
        resultData.set(getTerytIdFromWojewodztwo(province), {
            terytId: getTerytIdFromWojewodztwo(province),
            name: province,
            value: value,
        });
    }
  }

  return resultData;
}