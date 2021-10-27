import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { Subject } from 'rxjs';
import { SnackbarModel } from './snackbar.model';
import { SnackbarService } from './snackbar.service';

describe('SharedSnackbarService', () => {
  let service: SnackbarService;
  let message: SnackbarModel;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SnackbarService] });
    service = TestBed.inject(SnackbarService);
    message = {
      message: 'a test message',
      type: 'success',
      allowDuplicate: false
    };
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('updates readOnly property on push', () => {
    service.push(message);
    const _message = new Subject<SnackbarModel>();
    _message.next(message);
    expect(service.newMessageEvent$).toEqual(_message.asObservable());
  });
});
