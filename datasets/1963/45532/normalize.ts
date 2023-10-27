import { readCsv } from '../../../utils/csvReader';

export function normalize(pathToData: string): Map<string, any> {
  
  const records = readCsv(pathToData);
  
  const recordName = "liczba uczniów";

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