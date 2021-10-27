import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  OnInit
} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { Observable } from 'rxjs';
import { certificateModel } from 'src/app/modules/issuer/certificates/certificate.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { OptionItem } from 'src/app/modules/issuer/category/category.component';

@Component({
  selector: 'app-listing-certificates',
  templateUrl: './listing-certificates.component.html',
  styleUrls: ['./listing-certificates.component.scss']
})
// extends DumbComponent
export class ListingCertificatesComponent implements AfterViewInit {
  // certificatesDataSource!: MatTableDataSource<any>;
  @Input() certificates$!: any[];
  // @Input() set certificates(data: any[])
  optionItems!: Array<OptionItem>;
  @Input() dialog!: MatDialog;
  // @Input() optionItems;
  @Input() Verifiers;

  constructor() {
    // super();
  }

  fb: FormBuilder = new FormBuilder();
  VerifierForm: FormGroup = new FormGroup({});

  filterControl = new FormControl();

  filteredOptions: Observable<
    Array<any>
  > = this.filterControl.valueChanges.pipe(
    startWith(''),
    map((value: string) => {
      if (value === '') {
        // let k = this.VerifierForm.value.verifiers;

        this.optionItems.forEach((option) => {
          option.show = false;
          // k.forEach((element) => {
          //   if (element === option.id) {
          //     option.show = true;
          //   }
          // });
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

  ngAfterViewInit(): void {
    this.optionItems = this.Verifiers.map((item) => {
      return {
        id: item.id,
        firstname: item.firstname,
        lastname: item.lastname,
        picture: item.picture === null ? '' : item.picture,
        show: true
      };
    });

    this.VerifierForm = this.fb.group({
      verifiers: ['']
    });
  }

  onPanelClose() {
    this.filterControl.setValue('');
  }
  //for display
  displayedColumns: string[] = [
    'Issuer',
    'state',
    'Category',
    'organization',
    'action'
  ];
  certificate!: certificateModel;
  certificateToshow!: certificateModel;
  ShareCertificate!: certificateModel;

  openViewDialog(viewContent, certificate) {
    this.certificateToshow = certificate;
    this.dialog.open(viewContent, {
      width: '70%',
      height: '97%'
    });
    this.certificate = certificate;
  }
  Dismiss = (e) => {
    if (e as boolean) {
      this.dialog.closeAll();
    }
  };

  Reecto;
  Verso;

  Printcertificate(Certificate) {
    this.Reecto = Certificate.design.recto;
    this.Verso = Certificate.design.verso;

    //replace recipient Fields
    let RECTOwhithRealValue;
    Certificate.category.fields!.recipient.forEach((recip) => {
      RECTOwhithRealValue = this.Reecto.html.replace(
        '@' + recip.name + '',
        recip.value
      );
    });
    this.Reecto.html = RECTOwhithRealValue;

    Certificate.category.fields!.certificate.forEach((certif) => {
      RECTOwhithRealValue = this.Reecto.html.replace(
        '%' + certif.name + '',
        certif.value
      );
    });

    this.Reecto.html = RECTOwhithRealValue;

    //replace certificate Fields
    let VERSOwhithRealValue;
    Certificate.category.fields!.recipient.forEach((recip) => {
      VERSOwhithRealValue = this.Verso.html.replace(
        '@' + recip.name + '',
        recip.value
      );
    });

    this.Verso.html = VERSOwhithRealValue;

    Certificate.category.fields!.certificate.forEach((certif) => {
      VERSOwhithRealValue = this.Verso.html.replace(
        '%' + certif.name + '',
        certif.value
      );
    });

    this.Verso.html = VERSOwhithRealValue;

    let recto = document.getElementById('recto');

    recto!.innerHTML = this.Reecto.html + this.Reecto.css;

    let verso = document.getElementById('verso');

    verso!.innerHTML = this.Verso.html + this.Verso.css;
  }
  public dialogRef!: MatDialogRef<any>;
  shair(shaire, certificate) {
    this.ShareCertificate = certificate;
    this.dialog.open(shaire, {
      width: '40%',
      height: '30%'
    });
  }
}
