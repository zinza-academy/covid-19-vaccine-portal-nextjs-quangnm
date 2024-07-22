import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class DatalocationsService {
  async readExcelFile(filePath: string): Promise<any[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    
    const data = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        data.push({
          city: row.getCell(1).value,
          cityCode: row.getCell(2).value,
          district: row.getCell(3).value,
          districtCode: row.getCell(4).value,
          ward: row.getCell(5).value,
          wardCode: row.getCell(6).value,
          level: row.getCell(7).value,
        });
      }
    });
    return data;
  }
}
