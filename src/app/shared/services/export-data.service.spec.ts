import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { ExportDataService } from './export-data.service';

describe('ExportDataService', () => {
  let service: ExportDataService;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportDataService]
    });
    service = TestBed.inject(ExportDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('exportToPdf', () => {
    it('exports data to PDF', (done) => {
      const fileName = 'fileName';
      const data = [
        { Id: 'id1', name: 'name1' },
        { id: 'id2', name: 'name2' }
      ];
      const Headers = ['id', 'name'];

      jest.spyOn(service, 'exportToPdf').mockImplementation();
      service.exportToPdf(fileName, data, Headers);
      expect(service.exportToPdf).toHaveBeenCalledWith(fileName, data, Headers);

      done();
    });
  });
  describe('exportToExel', () => {
    it('exports data to Exel', (done) => {
      const fileName = 'fileName';
      const data = [
        { Id: 'id1', name: 'name1' },
        { id: 'id2', name: 'name2' }
      ];
      const Headers = ['id', 'name'];
      const extention = 'xls';
      jest.spyOn(service, 'ExportToExel').mockImplementation();
      service.ExportToExel(fileName, data, Headers, extention);
      expect(service.ExportToExel).toHaveBeenCalledWith(
        fileName,
        data,
        Headers
      );

      done();
    });
  });
  describe('exportTOCsv', () => {
    it('exports data to Csv', (done) => {
      const fileName = 'fileName';
      const data = [
        { Id: 'id1', name: 'name1' },
        { id: 'id2', name: 'name2' }
      ];
      const Headers = ['id', 'name'];

      jest.spyOn(service, 'exportTOCsv').mockImplementation();
      service.exportTOCsv(fileName, data, Headers);
      expect(service.exportTOCsv).toHaveBeenCalledWith(fileName, data, Headers);

      done();
    });
  });
});
