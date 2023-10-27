import { readFileSync } from 'fs-extra';
import { parse } from 'csv-parse/sync';
import { convertFromUt8ToPolish, getTerytIdFromWojewodztwo } from '../../../utils/mappings';

export function normalize(pathToData: string) : Map<string, any> {

  const year = "2022";

  const data = readFileSync(pathToData);
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
    group_columns_by_name: true,
    from_line: 2,
    delimiter: ";",
  });

  const resultData = new Map<string, any>();
  for (const record of records) {
    const rawRecord = record[''][0].split('.')[1];
    if (rawRecord) {
      let province: string;
      const rawProvince = rawRecord.slice(1);
      if (rawRecord.includes('mazowieckie')) {
        province = rawRecord.split(' ')[1];
      } else {
        province = convertFromUt8ToPolish(rawProvince);
      }
      if (record[''][1] === year) {
        resultData.set(getTerytIdFromWojewodztwo(province), {
          terytId: getTerytIdFromWojewodztwo(province),
          name: province,
          value: record[''][4],
        });
      }
    }
  }

  return resultData;
}