import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvServiceService {
  constructor() {}

  convertToCSV(data: any[], columns: string[]): string {
    const csvContent =
      columns.join(',') +
      '\n' +
      data
        .map((row) => {
          return columns
            .map((key) => {
              if (Array.isArray(row[key])) {
                return row[key].map((item: any) => item.description).join('; '); // Assuming 'description' is the property to display for each item in the array
              } else {
                return row[key]; // If it's not an array, return the value directly
              }
            })
            .join(',');
        })
        .join('\n');

    return csvContent;
  }
}
