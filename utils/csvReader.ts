import { readFileSync } from 'fs-extra';
import { parse } from 'csv-parse/sync';

export function readCsv(pathToCsv, delimiter?: string) {
    const data = readFileSync(pathToCsv);
    const records = parse(data, {
      columns: true,
      skip_empty_lines: true,
      delimiter: delimiter,
    });
    return records;
}