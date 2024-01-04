import { readFileSync } from "fs";
import { parse } from 'csv-parse/sync';
import { getTerytIdFromWojewodztwo } from "../../utils/mappings";

export function normalize(pathToData: string, year: string): Map<string, any> {
  
  const data = readFileSync(pathToData);
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
    group_columns_by_name: true,
    delimiter: ";",
  });
  
  const resultData = new Map<string, any>();
  for (const record of records) {
    const carAccidentsNumber = record[year];
    const province = record['Jednostka terytorialna'];
    resultData.set(getTerytIdFromWojewodztwo(province), {
        terytId: getTerytIdFromWojewodztwo(province),
        name: province,
        value: carAccidentsNumber
    });
  }

  return resultData;
}