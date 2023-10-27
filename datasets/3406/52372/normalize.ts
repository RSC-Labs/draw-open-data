import { readFileSync } from 'fs-extra';
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
      const rawRecord = record[''][0];
      if (rawRecord !== 'POLSKA' && !rawRecord.includes('Wojew')) {
        const province = convertFromUt8ToPolish(rawRecord);
        resultData.set(getTerytIdFromWojewodztwo(province), {
            terytId: getTerytIdFromWojewodztwo(province),
            name: province,
            value: record[''][1],
        });
      }
  
    }

    return resultData;
  }