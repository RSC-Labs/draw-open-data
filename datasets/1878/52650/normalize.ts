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

export function normalizeCounty(pathToData: string) : Map<string, any> {

  const terytIdColumnName = "Kod jednostki terytorialnej";
  const filter = "Rodzaj jednostki";
  const recordName = "Należności (w zł)";
  const terytNameColumnName = "Nazwa jednostki terytorialnej";

  const records = readCsv(pathToData);

  const resultData = new Map<string, any>();
  for (const record of records) {
    if (record[`${filter}`] == 'POW') {
      const terytId = record[`${terytIdColumnName}`];
      let realTerytId = terytId;
      if (terytId < 1000) {
        realTerytId = `0${terytId}`
      }
      if (resultData.has(realTerytId)) {
        const currentValue = resultData.get(realTerytId);
        resultData.set(realTerytId, {
          terytId: realTerytId,
          value: currentValue.value + parseInt(record[recordName]),
          terytName: record[`${terytNameColumnName}`]
        });
      } else {
        resultData.set(realTerytId, {
          terytId: realTerytId,
          value: parseInt(record[recordName]),
          terytName: record[`${terytNameColumnName}`]
        });
      }
    }
    
  }

  return resultData;
}