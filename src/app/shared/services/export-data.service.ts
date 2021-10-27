import { Injectable } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

@Injectable({
  providedIn: 'root'
})
export class ExportDataService {
  constructor() {}

  exportToPdf(
    fileName: string,
    data: object[],
    headers: string[],
    displayedHeaders?: string[]
  ) {
    let newData = this.GenerateElementToExport(data, headers);
    const doc = new jsPDF('p', 'pt') as jsPDFWithPlugin;
    let values: any = newData.map((elemento) => Object.values(elemento));
    let h;
    if (displayedHeaders && displayedHeaders.length !== 0) {
      h = displayedHeaders ?? headers;
    } else {
      h = headers;
    }
    doc.autoTable({
      head: [h],
      body: values
    });
    doc.save(fileName);
  }

  ExportToExel(
    excelFileName: string,
    data: object[],
    headers: string[],
    exelExtension,
    displayedHeaders?: string[]
  ) {
    let newData = this.GenerateElementToExport(data, headers);
    //Add Header Row
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Doccert Data');
    let h;
    if (displayedHeaders && displayedHeaders.length !== 0) {
      h = displayedHeaders ?? headers;
    } else {
      h = headers;
    }
    worksheet.addRow(h);
    newData.forEach((d) => {
      let arr = Object.values(d);
      worksheet.addRow(arr);
    });
    let exelType = '';
    if (exelExtension === 'xls') {
      exelType = 'application/vnd.ms-excel';
    } else {
      exelType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    }
    workbook.xlsx.writeBuffer().then((d) => {
      let blob = new Blob([d], {
        type: exelType
      });
      FileSaver.saveAs(blob, excelFileName);
    });
  }

  exportTOCsv(
    filename: string,
    data: object[],
    headers: string[],
    displayedHeaders?: string[]
  ) {
    let h;
    if (displayedHeaders && displayedHeaders.length !== 0) {
      h = displayedHeaders ?? headers;
    } else {
      h = headers;
    }
    let options = {
      fieldSeparator: ',',
      headers: h,
      useHeader: false,
      nullToEmptyString: true
    };
    let newData = this.GenerateElementToExport(data, headers);
    new AngularCsv(newData, filename, options);
  }

  private GenerateElementToExport(data: object[], headers: string[]) {
    let newData = JSON.parse(JSON.stringify(data));
    let generatedElement: Object[] = [];
    newData.forEach((d) => {
      let obj = {};
      headers.forEach((h) => {
        if (h.includes('.')) {
          let parent = h.split('.').slice(0, -1).join('.');
          let child = h.substring(h.indexOf('.') + 1);
          let p = d[parent];
          obj[h] = p[child];
        } else {
          obj[h] = d[h] ?? ' ';
        }
      });
      generatedElement.push(obj);
    });

    return generatedElement;
  }
  private GenerateElementToExport2(data: object[], headers: string[]) {
    let newData = data.slice();
    for (let i = 0; i < data.length; i++) {
      let n = newData[i];
      let keys: string[] = Object.keys(data[i]);
      for (let k = 0; k < keys.length; k++) {
        let key = keys[k];
        if (!headers.includes(key)) {
          delete n[key];
        }
      }
    }
    return newData;
  }
}
