import { Source } from './../Category.model';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { FieldType } from 'src/app/models/Field';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent
  extends DumbComponent
  implements AfterViewInit
{
  @Input() CategoryToUpdate!: FormGroup;
  @Input() categoryForm!: FormGroup;
  @Input() newCertif;
  @Input() listSigners;
  @Input() idSigners;
  @Input() certificateFields;
  @Input() recipientFields;
  @Input() recipientFieldsNames;
  @Input() certificateFieldsNames;
  @Input() CurntUser;
  @Input() Organization;
  @Output() AddNewCategory = new EventEmitter();
  @Output() UpdateCategory = new EventEmitter();
  @Output() AddCertiFields = new EventEmitter();
  @Output() AddRecipFields = new EventEmitter();
  @Output() DeleteCeriFiled = new EventEmitter();
  @Output() DeleteRecipFiled = new EventEmitter();

  Existing = false;

  fieldTypes: FieldType[] = [
    FieldType.date,
    FieldType.email,
    FieldType.number,
    FieldType.text
  ];

  passwordOPtion = [
    'Issuer profile',
    'certicate fields',
    'Recipient fields',
    'Issue date'
  ];

  constructor() {
    super();
  }
  @Input() dialog!: MatDialog;
  fb: FormBuilder = new FormBuilder();
  custonDropdown = new FormControl();
  public dialogRef!: MatDialogRef<any>;
  @Input() toppingList;

  filterControl = new FormControl();
  @Input() optionItems;

  filteredOptions: Observable<Array<any>> =
    this.filterControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => {
        if (value === '') {
          let k = this.categoryForm.value.verifiers;

          this.optionItems.forEach((option) => {
            option.show = false;
            k.forEach((element) => {
              if (element === option.id) {
                option.show = true;
              }
            });
          });
        } else {
          this.optionItems.forEach((option) => {
            let v = option.firstname + option.lastname + option.id;

            if (v.toLocaleLowerCase().includes(value.toLowerCase())) {
              option.show = true;
            } else {
              option.show = false;
            }
          });
        }
        return this.optionItems;
      })
    );

  filtersignersControl = new FormControl();
  @Input() SignersOptionItems;

  filteredsignersOptions: Observable<Array<any>> =
    this.filtersignersControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => {
        if (value === '') {
          let K = this.categoryForm.value.signers;

          this.SignersOptionItems.forEach((option) => {
            option.show = false;
            K.forEach((element) => {
              if (element === option.id) {
                option.show = true;
              }
            });
          });
        } else {
          this.SignersOptionItems.forEach((option) => {
            let v = option.firstname + option.lastname + option.id;

            if (v.toLocaleLowerCase().includes(value.toLowerCase())) {
              option.show = true;
            } else {
              option.show = false;
            }
          });
        }
        return this.SignersOptionItems;
      })
    );

  onPanelClose() {
    this.filterControl.setValue('');
  }
  onPanelSinersClose() {
    this.filtersignersControl.setValue('');
  }

  open(content) {
    this.dialogRef = this.dialog.open(content, {});
  }
  close(): void {
    this.dialog.closeAll();
  }

  closePupUp() {
    this.dialogRef.close();
  }

  addFileds = this.fb.group({
    certificate: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        value: '',
        isNew: true
      })
    ]),
    recipient: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        value: '',
        isNew: true
      })
    ])
  });

  CetificateFileds = this.fb.group({
    certificate: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        value: '',
        isNew: true
      })
    ]),
    recipient: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        value: '',
        isNew: true
      })
    ])
  });
  Blockchain = new FormGroup({
    certificate: new FormControl([], Validators.required),
    recipient: new FormControl([], Validators.required)
  });

  NewRecipientFiledRow() {
    const control = <FormArray>this.addFileds.get('recipient');
    control.push(
      this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        value: '',
        isNew: true
      })
    );
  }
  selected: string[] = ['k', 'c'];
  public modeselect = 'Domain';
  formGroup: FormGroup = this.fb.group({
    itemCtrl: ['12222']
  });
  IdChamp = this.fb.group({
    Nchamp: this.fb.array([
      this.fb.group({
        value: ['', Validators.required],
        Ncaracter: [''],
        day: [false],
        month: [false],
        year: [false]
      })
    ])
  });

  SaveIDChamp = this.fb.group({
    Nchamp: this.fb.array([
      this.fb.group({
        value: ['', Validators.required],
        Ncaracter: [''],
        day: [false],
        month: [false],
        year: [false]
      })
    ])
  });
  step2!: boolean;

  ngAfterViewInit(): void {
    if (this.categoryForm.value.idGenerationType === 'FIELD') {
      this.Existing = true;
    }
    let k = this.categoryForm.value.verifiers;
    this.optionItems.forEach((option) => {
      option.show = false;
      k.forEach((element) => {
        if (element === option.id) {
          option.show = true;
        }
      });
    });
    let s = this.categoryForm.value.signers;

    this.SignersOptionItems.forEach((option) => {
      option.show = false;
      s.forEach((element) => {
        if (element === option.id) {
          option.show = true;
        }
      });
    });

    if (this.categoryForm.value.idGenerationType === 'CUSTOM') {
      const control = <FormArray>this.IdChamp.get('Nchamp');
      const control2 = <FormArray>this.SaveIDChamp.get('Nchamp');
      (<FormArray>this.IdChamp.controls.Nchamp).removeAt(0);
      (<FormArray>this.SaveIDChamp.controls.Nchamp).removeAt(0);
      this.categoryForm.value.customID.forEach((element) => {
        control.push(
          this.fb.group({
            value: [element.field.value, Validators.required],
            Ncaracter: [element.length],
            day: [element.day],
            month: [element.month],
            year: [element.year],
            source: [element.source]
          })
        );
      });

      this.categoryForm.value.customID.forEach((element) => {
        control2.push(
          this.fb.group({
            value: [element.field, Validators.required],
            Ncaracter: [element.length],
            day: [element.day],
            month: [element.month],
            year: [element.year],
            source: [element.source]
          })
        );
      });
    }
  }

  nextStep() {
    this.step2 = true;
  }
  previeus() {
    this.step2 = false;
  }

  radioChange(event, i) {
    let t1 = this.IdChamp.value.Nchamp[i];

    let t2 = this.SaveIDChamp.value.Nchamp[i];
    t2.value = event;
    t2.Ncaracter = t1.Ncaracter;
    t2.day = t1.day;
    t2.year = t1.year;
    t2.month = t1.month;
    this.generateID();
    //this.SaveIDChamp.value.Nchamp[i] = t2;
  }

  ID: string = '';

  contentchange() {}
  generateID() {
    this.ID = '';
    this.SaveIDChamp.value.Nchamp.forEach((element) => {
      if (element.value.value === element.value.name) {
        this.ID += 'xxx-';
      } else {
        if (element.value.type === 'date') {
          if (
            element.day === true &&
            element.month === true &&
            element.year === true
          ) {
            this.ID += element.value.value.substring(10, 0) + '-';
          }
          if (
            element.day === true &&
            element.month === true &&
            (element.year === false || element.day === '')
          ) {
            this.ID += element.value.value.substring(10, 5) + '-';
          }
          if (
            element.day === true &&
            (element.month === false || element.day === '') &&
            element.year === true
          ) {
            this.ID +=
              element.value.value.substring(5, 0) +
              element.value.value.substring(10, 8) +
              '-';
          }
          if (
            element.day === true &&
            (element.month === false || element.day === '') &&
            (element.year === false || element.day === '')
          ) {
            this.ID += element.value.value.substring(10, 8) + '-';
          }
          if (
            (element.day === false || element.day === '') &&
            element.month === true &&
            element.year === true
          ) {
            this.ID += element.value.value.substring(10, 5) + '-';
          }
          if (
            (element.day === false || element.day === '') &&
            element.month === true &&
            (element.year === false || element.day === '')
          ) {
            this.ID += element.value.value.substring(7, 5) + '-';
          }
          if (
            (element.day === false || element.day === '') &&
            (element.month === false || element.day === '') &&
            element.year === true
          ) {
            this.ID += element.value.value.substring(4, 0) + '-';
          }
        } else {
          this.ID += element.value.value.substring(0, element.Ncaracter) + '-';
        }
      }
    });

    this.ID = this.ID.slice(0, -1);

    let app1 = document.getElementById('ID');

    app1!.innerHTML = '';

    app1!.innerHTML = '<b>ID:</b><span >' + this.ID + '</span>';
  }

  valueId = this.fb.group({
    name: ['lastname', Validators.required],
    type: ['', Validators.required],
    value: '',
    isNew: true
  });
  List: any[] = [];
  IDOption(OPTION) {
    this.List = [];
    switch (OPTION) {
      case 'IssuerProfile': {
        this.List.push({
          name: 'First name',
          value:
            this.CurntUser.firstname !== ''
              ? this.CurntUser.firstname
              : 'First name',
          type: 'text',
          source: Source.ISSUER
        });
        this.List.push({
          name: 'Last name',
          value:
            this.CurntUser.lastname !== ''
              ? this.CurntUser.lastname
              : 'Last name',
          type: 'text',
          source: Source.ISSUER
        });
        this.List.push({
          name: 'Date Of Birth',
          value:
            this.CurntUser.birthday !== ''
              ? this.CurntUser.birthday
              : 'Date Of Birth',
          type: 'date',
          source: Source.ISSUER
        });
        this.List.push({
          name: 'email',
          value: this.CurntUser.email !== '' ? this.CurntUser.email : 'email',
          type: 'email',
          source: Source.ISSUER
        });
        this.List.push({
          name: 'areaCode',
          value: this.CurntUser.areaCode ? this.CurntUser.areaCode : 'areaCode',
          type: 'text',
          source: Source.ISSUER
        });
        this.List.push({
          name: 'institutionId',
          value: this.CurntUser.institutionId
            ? this.CurntUser.institutionId
            : 'institutionId',
          type: 'text',
          source: Source.ISSUER
        });
        break;
      }

      case 'organizationProfile': {
        this.List.push({
          name: 'admin',
          value: this.Organization?.admin ? this.Organization.admin : 'admin',
          type: 'text',
          source: Source.ORGANIZATION
        });
        this.List.push({
          name: 'name',
          value: this.Organization?.name ? this.Organization.name : 'name',
          type: 'text',
          source: Source.ORGANIZATION
        });
        this.List.push({
          name: 'address',
          value: this.Organization?.location
            ? this.Organization.location
            : 'address',
          type: 'text',
          source: Source.ORGANIZATION
        });
        this.List.push({
          name: 'domain',
          value: this.Organization?.domain
            ? this.Organization.domain
            : 'domain',
          type: 'text',
          source: Source.ORGANIZATION
        });
        this.List.push({
          name: 'website',
          value: this.Organization?.website
            ? this.Organization.website
            : 'website',
          type: 'text',
          source: Source.ORGANIZATION
        });
        break;
      }
      case 'Certificatefields': {
        this.categoryForm.value.certificateFields.forEach((element) => {
          this.certificateFields.forEach((certif) => {
            if (certif.name === element) {
              this.List.push({
                name: certif.name.trim().toLowerCase(),
                value:
                  certif.value !== ''
                    ? certif.value
                    : certif.name.trim().toLowerCase(),
                type: certif.type,
                source: Source.CERTIFICATE,
                isNew: certif?.isNew,
                inBlockchain: certif?.inBlockchain
              });
            }
          });
        });
        break;
      }
      case 'Recipientfields': {
        this.categoryForm.value.recipientFields.forEach((element) => {
          this.recipientFields.forEach((recip) => {
            if (recip.name === element) {
              this.List.push({
                name: recip.name.trim().toLowerCase(),
                value:
                  recip.value !== ''
                    ? recip.value
                    : recip.name.trim().toLowerCase(),
                type: recip.type,
                source: Source.RECIPIENT,
                isNew: recip?.isNew,
                inBlockchain: recip?.inBlockchain
              });
            }
          });
        });
        break;
      }

      case 'IssueDate': {
        this.List.push({
          value: 'IssueDate',
          name: 'Issue Date',
          type: 'date',
          source: Source.ISSUEDATE
        });
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  ajouterUnchampPassword() {
    const control = <FormArray>this.IdChamp.get('Nchamp');
    control.push(
      this.fb.group({
        value: ['', Validators.required],
        Ncaracter: [''],
        day: [''],
        month: [''],
        year: ['']
      })
    );

    const control2 = <FormArray>this.SaveIDChamp.get('Nchamp');
    control2.push(
      this.fb.group({
        value: ['', Validators.required],
        Ncaracter: [''],
        day: [''],
        month: [''],
        year: ['']
      })
    );
  }

  DeleteUnchampPassword(row, rowIndex) {
    this.DeleteCeriFiled.emit(row);
    (<FormArray>this.IdChamp.controls.Nchamp).removeAt(rowIndex);
    (<FormArray>this.SaveIDChamp.controls.Nchamp).removeAt(rowIndex);
  }
  NewCertificateFiledRow() {
    const control = <FormArray>this.addFileds.get('certificate');
    control.push(
      this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        value: '',
        isNew: true
      })
    );
  }

  onConfirmClick() {
    let rec: any = [];
    let cert: any = [];
    this.categoryForm.value.recipientFields.forEach((element) => {
      const g = this.recipientFields.find((x) => x.name === element);
      let c = this.categoryForm.value.recipientblockchainFields.find(
        (y) => y === element
      );
      if (c !== undefined) {
        g.inBlockchain = true;
      }
      rec.push(g);
    });
    this.categoryForm.value.certificateFields.forEach((element) => {
      const g = this.certificateFields.find((x) => x.name === element);
      let c = this.categoryForm.value.certificateblockchainFields.find(
        (y) => y === element
      );
      if (c !== undefined) {
        g.inBlockchain = true;
      }
      cert.push(g);
    });
    if (this.categoryForm.value.idGenerationType === 'CUSTOM') {
      this.SaveIDChamp.value.Nchamp.forEach((element) => {
        if (element.value.value === element.value.name) {
          element.value.value = 'XXX';
        }
      });
    }
    this.categoryForm.value.recipientFields = rec;
    this.categoryForm.value.certificateFields = cert;
    this.categoryForm.value.customID = this.SaveIDChamp;

    if (this.newCertif) {
      this.AddNewCategory.emit(this.categoryForm);
    } else {
      this.UpdateCategory.emit(this.categoryForm);
    }
    this.close();
  }
  lengthchange(i) {
    let t1 = this.IdChamp.value.Nchamp[i];

    let t2 = this.SaveIDChamp.value.Nchamp[i];

    t2.Ncaracter = t1.Ncaracter;
    t2.day = t1.day;
    t2.year = t1.year;
    t2.month = t1.month;

    this.generateID();
  }
  AddRecipientFields() {
    this.AddRecipFields.emit(this.addFileds);
    this.closePupUp();
  }

  checkboxDateChange($event, i) {
    let t1 = this.IdChamp.value.Nchamp[i];

    let t2 = this.SaveIDChamp.value.Nchamp[i];

    t2.Ncaracter = '';
    t2.day = t1.day;
    t2.year = t1.year;
    t2.month = t1.month;
    this.generateID();
  }

  AddCertificatFields() {
    this.AddCertiFields.emit(this.addFileds);
    this.closePupUp();
  }

  DeleteCertifFiled(row, rowIndex) {
    this.DeleteCeriFiled.emit(row);
    (<FormArray>this.addFileds.controls.certificate).removeAt(rowIndex);
  }

  DeleteRecipientFiled(row, rowIndex) {
    this.DeleteRecipFiled.emit(row);
    (<FormArray>this.addFileds.controls.recipient).removeAt(rowIndex);
  }
}
