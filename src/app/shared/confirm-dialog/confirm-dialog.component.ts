import { ConfirmDialogService } from './confirm-dialog.service';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  Output
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare let $: any;
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  isloading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string;
      confirmText: string;
      message: string;
      title: string;
      idsToDelete: string[];
      waitDesciption: string;
    },
    private mdDialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}
  public cancel() {
    this.close(false);
  }
  public close(value) {
    this.mdDialogRef.close(value);
  }
  public confirm(event) {
    this.isloading = true;
    setTimeout(() => {
      this.isloading = false;
      this.close(this.data.idsToDelete);
    }, 1500);
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }
}
