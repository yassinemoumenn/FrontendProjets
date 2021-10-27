import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { takeUntil } from 'rxjs/operators';
import { SnackbarModel } from './snackbar.model';
import { SnackbarService } from './snackbar.service';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('501ms', style({ transform: 'translateY(0)', opacity: 0.9 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('501ms', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class SnackbarComponent implements OnInit, OnDestroy {
  private _onDestroy = new Subject();
  private readonly dismissDelay: number = 6000;
  messages: SnackbarModel[] = [];

  constructor(
    private snackbar: SnackbarService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.snackbar.newMessageEvent$
      .pipe(takeUntil(this._onDestroy))
      .subscribe((message) => {
        let msgAlreadyExists = false;
        if (message) {
          if (this.messages) {
            this.messages.forEach((m) => {
              if (m.message === message.message) {
                msgAlreadyExists = true;
              }
            });
          }
          if (message.allowDuplicate || !msgAlreadyExists) {
            this.messages.push(message);
            setTimeout(() => {
              this.dismiss(message);
            }, this.dismissDelay);
          }
        }
      });
  }

  dismiss(message: SnackbarModel) {
    this.utilsService.removeFromIterable(this.messages, message);
  }

  dismissAll() {
    this.messages = [];
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
