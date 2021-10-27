import { Component, OnInit } from '@angular/core';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';

@Component({
  selector: 'app-verifier',
  templateUrl: './verifier.component.html',
  styleUrls: ['./verifier.component.scss']
})
export class VerifierComponent extends SmartComponent implements OnInit {
  constructor() {
    super();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
