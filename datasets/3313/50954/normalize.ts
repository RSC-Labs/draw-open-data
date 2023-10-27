import { readCsv } from '../../../utils/csvReader';

export function normalize(pathToData: string) : Map<string, any> {

  const terytIdColumnName = "Kod województwa";
  const recordName = "Należności (w zł)";

  const records = readCsv(pathToData);

  const resultData = new Map<string, any>();
  for (const record of records) {
    const terytId = record[`${terytIdColumnName}`];

    if (resultData.has(terytId)) {
      const currentValue = resultData.get(terytId);
      resultData.set(terytId, {
        terytId: terytId,
        value: currentValue.value + parseInt(record[recordName]),
      });
    } else {
      resultData.set(terytId, {
        terytId: terytId,
        value: parseInt(record[recordName]),
      });
    }
  }

  return resultData;
}