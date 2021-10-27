import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { certificateModel } from 'src/app/modules/issuer/certificates/certificate.model';
import { SnackbarService } from '../snackbar/snackbar.service';
import { VerificationService } from './verification.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent extends SmartComponent implements OnInit {
  certificateID: string = '';
  certificates$!: Observable<certificateModel>;
  constructor(
    private route: ActivatedRoute,
    private verificationService: VerificationService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.certificateID = this.route.snapshot.paramMap.get('id') || '';
    this.verificationService
      .getCertificate(this.certificateID)
      .pipe()
      .subscribe(
        (data) => {
          this.certificates$ = of(data.data);
        },
        (err) => {
          this.snackbarService.push({
            message: 'No certificate found with this:' + this.certificateID,
            type: 'error'
          });
        }
      );
  }
}
