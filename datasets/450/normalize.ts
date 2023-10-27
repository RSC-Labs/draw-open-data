import { readCsv } from '../../utils/csvReader';
import { getTerytIdFromWojewodztwo } from '../../utils/mappings';

export function normalize(pathToData: string): Map<string, any> {
  
  const records = readCsv(pathToData);
  
  const resultData = new Map<string, any>();
  for (const record of records) {
    const idTerytWojewodztwo = getTerytIdFromWojewodztwo(record['Województwo']);
    if (idTerytWojewodztwo && resultData.has(idTerytWojewodztwo)) {
      const currentValue = resultData.get(idTerytWojewodztwo);
      resultData.set(idTerytWojewodztwo, {
        terytId: idTerytWojewodztwo,
        name: record['Województwo'],
        value: currentValue.value + 1
      });
    } else if (idTerytWojewodztwo) {
      resultData.set(idTerytWojewodztwo, {
        terytId: idTerytWojewodztwo,
        name: record['Województwo'],
        value: 1
      });
    }
  }

  return resultData;
}