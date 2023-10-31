import { writeFileSync } from 'fs-extra';
import { FlourishColumnNames } from './../../utils/types';
import * as getAllStudents from '../../datasets/212/45734/normalize';
import * as getUkraineStudents from '../../datasets/2711/52039/normalize';

async function generate(pathToData: string, pathToHelpData: string) {

  const provinceStudents = getAllStudents.normalize(pathToHelpData);
  const provinceUkraineStudents = getUkraineStudents.normalize(pathToData);

  const resultData: any[] = [];
  for (const provinceStudentInHome of provinceUkraineStudents) {
    resultData.push({
        terytId: provinceStudentInHome[0],
        name: provinceStudentInHome[1].name,
        ['Liczba uczniów ogółem']: provinceStudents.get(provinceStudentInHome[0]),
        ['Liczba uczniów z Ukrainy']: provinceUkraineStudents.get(provinceStudentInHome[0]).value,
        ['% uczniów z Ukrainy']: parseInt(provinceUkraineStudents.get(provinceStudentInHome[0]).value) / provinceStudents.get(provinceStudentInHome[0]) * 100
    });
  }

  writeFileSync(`${FlourishColumnNames.Regions}.json`, JSON.stringify(resultData));
}

generate(process.argv[2], process.argv[3]);