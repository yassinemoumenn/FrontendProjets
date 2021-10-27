import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, finalize } from 'rxjs/operators';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
        waitDesciption: options.waitDesciption
      },
      width: '400px'
    });
    this.dialogRef.disableClose = true;
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        if (res === undefined) {
          return true;
        } else {
          return res;
        }
      })
    );
  }
}

/* example how to call the confirm dialog
 confirmdialogv1() {
    const options = {
      title: 'Leave page?',
      message: 'By leaving this page you will permanently lose your form changes.',
      cancelText: 'CANCEL',
      confirmText: 'YES, LEAVE PAGE',
      waitDesciption: 'processing . . .'
    };

    this.dialogservice.open(options);

    this.dialogservice.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.router.navigate(['/']);
      }
    });

  }
*/
