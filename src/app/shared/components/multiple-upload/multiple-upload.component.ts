import { Observable } from 'rxjs';
import { DesignModel } from './../../../modules/issuer/Designs/Design.model';
import { RecipientModel } from './../../../modules/recipient/Recipient.model';
import { ExportDataService } from './../../services/export-data.service';
import { MultipleUploadService } from './multiple-upload.service';
import { CategoryModel } from './../../../modules/issuer/category/Category.model';
import { FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  AfterViewInit
} from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-multiple-upload',
  templateUrl: './multiple-upload.component.html',
  styleUrls: ['./multiple-upload.component.scss']
})
export class MultipleUploadComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() categoriesObservable!: Observable<CategoryModel[]>;
  @Input() recipientsObservable!: Observable<RecipientModel[]>;
  @Input() designsObservable!: Observable<DesignModel[]>;

  categories: CategoryModel[] = [];
  designs: DesignModel[] = [];
  recipients: RecipientModel[] = [];
  categoriesName: String[] = [];
  designOptions: String[] = [];

  @Input() UploadFor: 'certificate' | 'recipient' = 'certificate';
  @Input() fileFormat: string[] = ['csv', 'xlsx', 'xls'];
  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() FilesChanged: EventEmitter<boolean> = new EventEmitter(false);
  @Output() uploadDataEvent = new EventEmitter<any[]>();
  @Output() uploadObject = new EventEmitter<any>();
  multipleUploadForm: FormGroup = new FormGroup({});
  isDisabledDesigns = true;
  isloading = false;
  isButtonDisabled = true;
  files: any = [];
  DataToUpload;
  onFileChange = false;
  maxCountExceeded = false;
  constructor(
    private multipleUploadService: MultipleUploadService,
    private exportService: ExportDataService
  ) {}

  @Input() set _multipleUploadForm(formGroup: FormGroup) {
    this.multipleUploadForm = formGroup;
  }
  public get Category1(): FormControl {
    return this.multipleUploadForm.get('categories1Control') as FormControl;
  }
  public get FileFormat(): FormControl {
    return this.multipleUploadForm.get('fileFormatControl') as FormControl;
  }
  public get Category2(): FormControl {
    return this.multipleUploadForm.get('categories2Control') as FormControl;
  }
  public get Design(): FormControl {
    return this.multipleUploadForm.get('designControl') as FormControl;
  }

  ngAfterViewInit(): void {
    this.designsObservable?.subscribe((designs) => {
      this.designs = designs;
    });
    this.categoriesObservable.subscribe((categories) => {
      this.categories = categories;
      this.categoriesName = this.multipleUploadService.getCategoryName(
        this.categories
      );
    });

    this.recipientsObservable?.subscribe((recipients) => {
      this.recipients = recipients;
    });

    this.multipleUploadService.uploadData = [];

    // eslint-disable-next-line no-unused-expressions
    this.UploadFor === 'certificate'
      ? (this.isButtonDisabled = true)
      : (this.isButtonDisabled = false);
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }

  downloadFile() {
    let formValues = this.multipleUploadForm.value;
    let category = this.categories.find(
      (elt) => elt.id === formValues.categories1Control
    );
    let fileFormat = formValues.fileFormatControl;
    let data;
    if (category) {
      if (this.UploadFor === 'certificate') {
        data = this.multipleUploadService.GenerateDataCertificate(
          category,
          this.recipients
        );
      } else if (this.UploadFor === 'recipient') {
        data = this.multipleUploadService.GenerateDataRecipient(category);
      }

      if (fileFormat === 'csv') {
        this.exportService.exportTOCsv(
          category.name + '',
          data.body,
          data.header
        );
      }
      if (fileFormat === 'xlsx') {
        this.exportService.ExportToExel(
          category.name + '',
          data.body,
          data.header,
          'xlsx'
        );
      }
      if (fileFormat === 'xls') {
        this.exportService.ExportToExel(
          category.name + '',
          data.body,
          data.header,
          'xls'
        );
      }
    }
  }

  selectCategory(e) {
    this.isDisabledDesigns = false;
    let category = this.multipleUploadService.getCategoryById(
      e,
      this.categories
    )[0];

    let id = category.id || '';

    this.designsObservable = this.multipleUploadService.getCategoryDesigns(
      this.designs,
      id
    );

    this.isButtonDisabled = false;
  }

  OnFileChange(inputFiles: any) {
    this.maxCountExceeded = false;
    this.onFileChange = true;
    let a = inputFiles.target.files;

    for (let index = 0; index < a.length; index++) {
      let file = a[index];
      let fileName = file.name;
      let sizeExceeded: Boolean = false;
      let maxSize = 1000000; //B or 1MB
      if (file.size > maxSize) {
        sizeExceeded = true;
      }
      let fileSize = this.multipleUploadService.niceBytes(file.size);
      let fileData = {
        file: file,
        name: fileName,
        size: fileSize,
        progress: 0,
        headerchecked: null,
        sizeExceeded: sizeExceeded
      };
      if (this.files.length < 3) {
        this.files.push(fileData);
      } else {
        this.maxCountExceeded = true;
      }
    }
  }

  StartUpload(file: any) {
    let uploadedFile: File = file.file;

    let fileReader: FileReader = new FileReader();
    let fileExtension = file.name.substring(file.name.indexOf('.') + 1);
    let selectedCat =
      this.multipleUploadForm.value.categories2Control ||
      this.multipleUploadForm.value.categories1Control;
    let category = this.categories.find((elt) => elt.id === selectedCat);
    let selectedDesign = this.multipleUploadForm.value.designControl;
    let design = this.designs.find((item) => item.id === selectedDesign);
    fileReader.readAsText(file.file);
    if (fileExtension === 'csv') {
      fileReader.onload = (e) => {
        let fileData: any = fileReader.result;
        let data = fileData.split(/\r|\n|\r/);
        let headers = data[0].split(',');
        if (category) {
          if (this.UploadFor === 'certificate') {
            file.headerchecked =
              this.multipleUploadService.checkCertificateHeader(
                category,
                headers,
                this.recipients
              );
          } else if (this.UploadFor === 'recipient') {
            file.headerchecked =
              this.multipleUploadService.checkRecipientHeader(
                category,
                headers
              );
          }
        }
        let rows: object[] = [];
        for (let index = 1; index < data.length; index++) {
          let row = {};
          let dataIndex = data[index].split(',');
          for (let h = 0; h < headers.length; h++) {
            let key = headers[h];
            row[key] = dataIndex[h] || '';
          }
          rows.push(row);
        }
        rows.pop();

        /**  emit uploadData event */
        this.uploadDataEvent.emit(rows);
      };
    } else {
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file.file);
      fileReader.onload = (e) => {
        let arrayBuffer = fileReader.result;
        let data = new Uint8Array(<ArrayBuffer>arrayBuffer);
        let arr = new Array();
        for (let i = 0; i < data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        let bstr = arr.join('');
        let workbook = XLSX.read(bstr, { type: 'binary' });
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        let arraylist: object[] = XLSX.utils.sheet_to_json(worksheet, {
          raw: true
        });
        let headers: string[] = Object.values(arraylist[0]);
        if (category) {
          if (this.UploadFor === 'certificate') {
            file.headerchecked =
              this.multipleUploadService.checkCertificateHeader(
                category,
                headers,
                this.recipients
              );
          } else if (this.UploadFor === 'recipient') {
            file.headerchecked =
              this.multipleUploadService.checkRecipientHeader(
                category,
                headers
              );
          }
        }

        if (file.headerchecked) {
          this.multipleUploadService.uploadData.push(arraylist);

          /**  emit uploadData event */
          this.uploadDataEvent.emit(arraylist);
        }
      };
    }

    file.progress = 100;

    /**  emit uploadObject event */
    let uploadObj = {
      category: category,
      design: design,
      file: uploadedFile
    };
    this.uploadObject.emit(uploadObj);
  }

  uploadAll() {
    this.maxCountExceeded = false;
    this.files.forEach((file) => {
      this.StartUpload(file);
    });
  }

  CanselUpload(file) {
    this.maxCountExceeded = false;
    this.files = this.files.filter((x) => {
      return x !== file;
    });
  }

  canselAll() {
    this.maxCountExceeded = false;
    this.files = [];
  }
}
