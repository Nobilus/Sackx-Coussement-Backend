import * as fs from 'fs'
import { parse } from 'csv-parse/sync'

export const csvToJson = (csvPath: string) => {
  const csv = fs.readFileSync(csvPath)

  const [headerLine, ...lines] = csv.toString().split('\n')
  const headers = [...headerLine.split(',')]

  return parse(csv, {
    delimiter: ',',
    columns: headers,
    from_line: 2,
  })
}
