import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SnackbarComponent } from './snackbar.component';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { Subject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarModel } from './snackbar.model';
import { SnackbarService } from './snackbar.service';
import { UtilsService } from '../../services/utils/utils.service';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  let message: SnackbarModel;
  let messages: SnackbarModel[];
  const _message = new Subject<SnackbarModel>();

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    message = {
      message: 'a test message',
      type: 'success',
      allowDuplicate: false
    };
    messages = [message];
    const utilsServiceStub = () => ({
      removeFromIterable: (
        messages: SnackbarModel[],
        message: SnackbarModel
      ) => ({})
    });

    const SnackbarServiceStub = () => ({
      push: (arg: SnackbarModel) => {
        _message.next(arg);
      },
      newMessageEvent$: {
        pipe: () => ({
          subscribe: (res: SnackbarModel) => {
            _message.next(message);
            return _message.asObservable();
          }
        })
      }
    });

    // const SnackbarServiceStub = () => ({
    //   newMessageEvent$: {
    //     pipe: () => ({ subscribe: (f: any) => f({}) })
    //   }
    // });

    // const SnackbarServiceStub = () => (
    //   _message.next(message),
    //   {
    //     newMessageEvent$: _message.asObservable()
    //   }
    // );

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SnackbarComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: UtilsService, useFactory: utilsServiceStub },
        {
          provide: SnackbarService,
          useFactory: SnackbarServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('dismiss', () => {
    it('makes expected calls', () => {
      const SnackbarModelStub: SnackbarModel = message;
      const utilsServiceStub: UtilsService =
        fixture.debugElement.injector.get(UtilsService);

      component.messages = messages;
      jest
        .spyOn(utilsServiceStub, 'removeFromIterable')
        .mockImplementation((messages, message) => {
          return 0;
        });

      component.dismiss(SnackbarModelStub);
      expect(utilsServiceStub.removeFromIterable).toHaveBeenCalledWith(
        messages,
        message
      );
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', async () => {
      const SnackbarServiceStub: SnackbarService =
        fixture.debugElement.injector.get(SnackbarService);

      jest.spyOn(component, 'dismiss');
      component.ngOnInit();

      expect(component.messages).toStrictEqual(messages);
      expect(component.dismiss).toHaveBeenCalledTimes(2);
    });
  });

  describe('dismiss snackbar', () => {
    it('should dismiss all messages', () => {
      component.messages = messages;
      component.dismissAll();
      expect(component.messages).toEqual([]);
    });
  });
});
