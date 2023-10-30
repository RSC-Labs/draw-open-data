import { readFileSync, writeFileSync } from 'fs-extra';
import { parse } from 'csv-parse/sync';
import { FlourishColumnNames } from './types';

function getAllStudents(pathToData: string) : Map<string, number> {
  const data = readFileSync(pathToData);
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });

  const recordName = 'liczba uczniów ogółem';

  const resultData = new Map<string, any>();
  for (const record of records) {
    if (resultData.has(record.idTerytWojewodztwo)) {
      const currentValue = resultData.get(record.idTerytWojewodztwo);
      resultData.set(record.idTerytWojewodztwo, currentValue + parseInt(record[recordName]));
    } else {
      resultData.set(record.idTerytWojewodztwo, parseInt(record[recordName]));
    }
  }
  return resultData;
}

async function generate(pathToData: string, pathToHelpData: string) {

  const provinceStudents = getAllStudents(pathToHelpData);

  const recordName = "liczba uczniów";

  const data = readFileSync(pathToData);
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
    group_columns_by_name: true
  });

  const resultData = new Map<string, any>();
  for (const record of records) {
    if (resultData.has(record.idTerytWojewodztwo)) {
      const currentValue = resultData.get(record.idTerytWojewodztwo);
      resultData.set(record.idTerytWojewodztwo, {
        terytId: record.idTerytWojewodztwo,
        name: record.Wojewodztwo,
        allStudents: provinceStudents.get(record.idTerytWojewodztwo),
        [`${recordName}`]: currentValue[`${recordName}`] + parseInt(record[recordName]),
        ['%']: (currentValue[`${recordName}`] + parseInt(record[recordName])) / provinceStudents.get(record.idTerytWojewodztwo) * 100
      });
    } else {
      resultData.set(record.idTerytWojewodztwo, {
        terytId: record.idTerytWojewodztwo,
        name: record.Wojewodztwo,
        allStudents: provinceStudents.get(record.idTerytWojewodztwo),
        [`${recordName}`]: parseInt(record[recordName]),
        ['%']: parseInt(record[recordName]) / provinceStudents.get(record.idTerytWojewodztwo) * 100
      });
    }
  }
  const regions: any[] = [];
  for (const result of resultData) {
    regions.push(result[1])
  }
  console.log(regions);

  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(regions));
}

generate('./data.csv', './data2.csv');