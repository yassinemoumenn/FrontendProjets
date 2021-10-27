import { BehaviorSubject, of, Observable } from 'rxjs';
import { DesignModel } from './../../../modules/issuer/Designs/Design.model';
import { RecipientModel } from './../../../modules/recipient/Recipient.model';
import { CategoryModel } from './../../../modules/issuer/category/Category.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultipleUploadService {
  constructor() {}

  public uploadData: object[] = [];
  uploadDataSubject = new BehaviorSubject<object[]>(this.uploadData);

  getCategoryName(categories: CategoryModel[]): String[] {
    let cats = JSON.parse(JSON.stringify(categories));
    let result = cats.map((a) => a.name);
    return result;
  }

  getDeisgnName(designs: DesignModel[]): String[] {
    let d = JSON.parse(JSON.stringify(designs));
    let result = d.map((a) => a.name);
    return result;
  }

  getCategoryById(catId: string, categoriesList: CategoryModel[]) {
    return categoriesList.filter((cat) => cat.id === catId);
  }
  getCategoryRecipients(recipients: RecipientModel[], category: CategoryModel) {
    let categoryRecipients: RecipientModel[] = [];
    recipients.forEach((recipient) => {
      let categories = recipient.categories;
      categories.forEach((cat) => {
        if (cat.name === category.name) {
          categoryRecipients.push(recipient);
        }
      });
    });
    return categoryRecipients;
  }

  GenerateDataCertificate(
    category: CategoryModel,
    recipients: RecipientModel[]
  ) {
    let categoryFileds = category.fields;
    let categoryRecipients = this.getCategoryRecipients(recipients, category);
    let headers: string[];

    if (categoryRecipients.length > 0) {
      headers = [
        'certificateID',
        'recipientID',
        'recipientFirstName',
        'recipientLastName',
        'recipientEmail'
      ];
    } else {
      headers = ['certificateID'];
    }

    categoryFileds.certificate.forEach((element) => {
      let fieldName = element.name;
      headers.push(fieldName);
    });

    let body: object[] = [];
    categoryRecipients.forEach((recipient) => {
      let d = {
        certificateID: '',
        recipientID: recipient.id || '',
        recipientFirstName: recipient.firstname || '',
        recipientLastName: recipient.lastname || '',
        recipientEmail: recipient.email || ''
      };
      body.push(d);
    });
    headers.forEach((h) => {
      body.map((row) => {
        if (!row[h]) {
          row[h] = '';
        }
      });
    });

    let data = { header: headers, body: body };
    return data;
  }

  GenerateDataRecipient(category: CategoryModel) {
    let categoryFileds = category.fields;
    let recipientsFields = categoryFileds.recipient;
    let fieldsNames = recipientsFields.map((x) => x.name);
    let body: object[] = [];
    for (let i = 0; i < 1; i++) {
      let b = {};
      fieldsNames.forEach((element) => {
        b[element] = '';
      });
      body.push(b);
    }

    let data = { header: fieldsNames, body: body };
    return data;
  }

  getCategoryDesigns(
    designs: DesignModel[],
    categoryId: string
  ): Observable<DesignModel[]> {
    let CategoryDesigns: DesignModel[] = [];
    designs.forEach((d) => {
      if (d.category === categoryId) {
        CategoryDesigns.push(d);
      }
    });
    return of(CategoryDesigns);
  }

  checkRecipientHeader(category, headers) {
    let categoryFileds = category.fields;
    let recipientsFields = categoryFileds.recipient;
    let fieldsNames = recipientsFields.map((x) => x.name);
    if (headers.length === fieldsNames.length) {
      return true;
    } else {
      return false;
    }
  }

  checkCertificateHeader(category, headers, recipients) {
    let categoryFileds = category.fields;
    let categoryRecipients = this.getCategoryRecipients(recipients, category);
    let CertificateHeader;
    if (categoryRecipients.length > 0) {
      CertificateHeader = [
        'certificateID',
        'recipientID',
        'recipientFirstName',
        'recipientLastName',
        'recipientEmail'
      ];
    } else {
      CertificateHeader = ['certificateID'];
    }
    categoryFileds.certificate.forEach((element) => {
      let fieldName = element.name;
      CertificateHeader.push(fieldName);
    });
    if (headers.length === CertificateHeader.length) {
      return true;
    } else {
      return false;
    }
  }

  niceBytes(x) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0,
      n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }
}
