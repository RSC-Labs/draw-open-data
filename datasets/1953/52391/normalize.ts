import { readCsv } from '../../../utils/csvReader';

export function normalize(pathToData: string) : Map<string, any> {

  const terytIdColumnName = "Kod TERYT";
  const year = "2022";
  const recordName = "Liczba zgonów";

  const records = readCsv(pathToData);


  const resultData = new Map<string, any>();
  for (const record of records) {
    if (record['Rok zgonu'] === year) {
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
  }

  return resultData;
}