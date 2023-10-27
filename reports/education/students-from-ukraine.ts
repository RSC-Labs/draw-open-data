import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from '../../utils/types';
import * as getAllStudents from '../../datasets/212/45734/normalize';
import * as getUkraineStudents from '../../datasets/2711/52039/normalize';

async function generate(pathToData: string, pathToHelpData: string) {

  const provinceStudents = getAllStudents.normalize(pathToHelpData);
  const provinceUkraineStudents = getUkraineStudents.normalize(pathToData);

  const resultData: any[] = [];
  for (const provinceUkraineStudent of provinceUkraineStudents) {
    const percent = Math.round(parseInt(provinceUkraineStudents.get(provinceUkraineStudent[0]).value) / provinceStudents.get(provinceUkraineStudent[0]) * 10000) / 100;
    resultData.push({
        terytId: provinceUkraineStudent[0],
        ['Województwo']: provinceUkraineStudent[1].name,
        ['Liczba uczniów ogółem']: provinceStudents.get(provinceUkraineStudent[0]),
        ['Liczba uczniów z Ukrainy']: provinceUkraineStudents.get(provinceUkraineStudent[0]).value,
        ['%']: percent,
        ['Uczniowie z Ukrainy w % uczniów']: `${percent}%`
    });
  }
  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2], process.argv[3]);