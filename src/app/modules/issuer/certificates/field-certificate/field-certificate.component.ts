/* eslint-disable no-unused-expressions */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { CategoryComponent } from '../../category/category.component';
import { CategoryModel } from '../../category/Category.model';
import { DesignModel } from '../../Designs/Design.model';

@Component({
  selector: 'app-field-certificate',
  templateUrl: './field-certificate.component.html',
  styleUrls: ['./field-certificate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldCertificateComponent
  extends DumbComponent
  implements AfterViewInit
{
  FieldsData: Array<object> = [];
  category!: CategoryComponent;
  design!: DesignModel;
  loading: boolean = false;
  fb: FormBuilder = new FormBuilder();
  certificateForm: FormGroup = new FormGroup({});
  @Input() designs$!: Observable<DesignModel[]>;
  @Input() categorySelected$!: Observable<CategoryModel>;
  //function that emit new certificate form
  @Output() addCertificateForm = new EventEmitter();

  constructor() {
    super();
  }
  ngAfterViewInit() {
    this.certificateForm = this.fb.group({});
    this.designs$.subscribe((data) => {
      this.design = data[0];
    });
    this.categorySelected$.subscribe((data) => {
      this.category = data['data'];
      this.FieldsData = data['data'].fields.certificate;
      data['data'].fields.certificate.forEach((element) => {
        this.certificateForm.addControl(
          element.name,
          new FormControl('', Validators.required)
        );
        element.type !== 'number'
          ? this.certificateForm.addControl(
              element.name,
              new FormControl('', Validators.required)
            )
          : this.certificateForm.addControl(
              element.name,
              new FormControl('', Validators.pattern('^[0-9]*$'))
            );
      });
      if (data['data'].idGenerationType === 'FIELD') {
        this.certificateForm.addControl(
          'existingID',
          new FormControl('', Validators.required)
        );
      }
    });

    this.certificateForm.addControl(
      'design',
      new FormControl('', Validators.required)
    );
  }
  addCertificate() {
    let certificateID = '';
    this.loading = true;
    let ObjectToAdd;
    if (this.category['idGenerationType'] === 'CUSTOM') {
      this.category['customID'].forEach((element) => {
        if (element.source === 'CERTIFICATE') {
          element.field.value = this.certificateForm.value[element.field.name];
        }
      });
    } else if (this.category['idGenerationType'] === 'FIELD') {
      certificateID = this.certificateForm.value['existingID'];
    }

    this.FieldsData.forEach((element) => {
      element['value'] = this.certificateForm.value[element['name']];
    });
    ObjectToAdd = {
      certificateID: certificateID,
      category: {
        id: this.category['id'],
        name: this.category['name'],
        fields: this.category['fields'],
        signers: this.category['signers'],
        verifiers: this.category['verifiers'],
        customID: this.category['customID']
      },
      fields: this.FieldsData,
      design: {
        id: this.certificateForm.value['design'],
        name: this.design['name'],
        category: this.design['category'],
        author: this.design['author'],
        recto: this.design['recto'],
        verso: this.design['verso']
      }
    };
    this.addCertificateForm.emit(ObjectToAdd);
  }
}
