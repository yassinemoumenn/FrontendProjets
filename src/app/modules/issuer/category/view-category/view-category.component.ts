import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent extends DumbComponent {
  @Input() displayedRows$!: Observable<any[]>;
  @Input() dialog!: MatDialog;

  @Output() OpenCategoryToUpdate = new EventEmitter();
  @Output() CategoryToDElete = new EventEmitter();
  @Output() DataSort = new EventEmitter();
  public EditCateg!: FormGroup;
  public newCertif: boolean = false;

  constructor() {
    super();
  }
  public dialogRef!: MatDialogRef<any>;
  categoryToUpdate: any;
  public columns = ['name', 'certificate', 'Recipient', 'Actions'];

  open(content) {
    this.dialogRef = this.dialog.open(content, {
      width: '70%'
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  EditCategory(template) {
    this.categoryToUpdate = template;
    const cert: string[] = [];
    const res: string[] = [];
    const BlockchainCert: string[] = [];
    const BlockchainRecp: any[] = [];
    template.fields.certificate.forEach((element) => {
      if (element.inBlockchain) {
        BlockchainCert.push(element.name);
      }
      cert.push(element.name);
    });
    template.fields.recipient.forEach((element) => {
      if (element.inBlockchain) {
        BlockchainRecp.push(element.name);
      }
      res.push(element.name);
    });
    this.EditCateg = new FormGroup({
      id: new FormControl(template.id),
      idGenerationType: new FormControl(template.idGenerationType, [
        Validators.required
      ]),

      name: new FormControl(template.name, [Validators.required]),
      fields: new FormControl(cert, [Validators.required]),
      recipientFields: new FormControl(res, [Validators.required]),

      recipientblockchainFields: new FormControl(BlockchainRecp),
      certificateblockchainFields: new FormControl(BlockchainCert),
      signers: new FormControl(template.signers),
      verifiers: new FormControl(template.verifiers),
      customID: new FormControl(template.customID)
    });

    this.OpenCategoryToUpdate.emit(this.EditCateg);
  }

  deleteCategory(elem) {
    this.CategoryToDElete.emit(elem);
  }
}
