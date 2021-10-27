import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackbarModel } from './snackbar.model';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _message = new Subject<SnackbarModel>();
  readonly newMessageEvent$ = this._message.asObservable();

  push(message: SnackbarModel) {
    this._message.next(message);
  }
}
