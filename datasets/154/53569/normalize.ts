import { readCsv } from '../../../utils/csvReader';
import { getTerytIdFromWojewodztwo } from '../../../utils/mappings';

export function normalize(pathToData: string) : Map<string, any> {

//   const terytNameColumn = "WOJEWODZTWO";
  const recordName = "SUMA";

  const records = readCsv(pathToData, ';');

  const resultData = new Map<string, any>();
  for (const record of records) {
    // workaround
    const terytName = record[Object.keys(record)[0]];
    const terytId = getTerytIdFromWojewodztwo(terytName);
    resultData.set(terytId, {
        terytId: terytId,
        value: parseInt(record[recordName]),
    });
  }

  return resultData;
}