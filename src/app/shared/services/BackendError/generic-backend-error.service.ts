import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarModel } from '../../components/snackbar/snackbar.model';
import { SnackbarService } from '../../components/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class GenericBackendErrorService {
  constructor(
    private snackbar: SnackbarService,
    private translate: TranslateService
  ) { }

  displayErrors(errorCodesLine: string) {
    if (!errorCodesLine) {
      return;
    }
    const errors = this.getErrorsFromHeaders(errorCodesLine);
    if (!errors || errors.length === 0) {
      return;
    }

    errors.forEach((error) => {
      const snackbarError: SnackbarModel = {
        message: this.translate.instant(
          'gen-errors.' + error.translateKey,
          this.getErrorParams(error.params)
        ),
        type: 'error',
        allowDuplicate: true
      }
      this.snackbar.push(
        new SnackbarModel(
          snackbarError
        )
      );
    });
  }

  getErrorsFromHeaders(errorCodesLine: string): GenericError[] {
    const headerLines = errorCodesLine.split(',');
    if (!headerLines || headerLines.length === 0) {
      return null;
    }
    const errors = [];
    headerLines.forEach((line) => {
      const key = line.split('|')[0].replace(' ', '');
      const params = line.substr(line.indexOf('|') + 1).split('|');
      errors.push(new GenericError(key, params));
    });
    return errors;
  }

  private getErrorParams(params: string[]) {
    const interpolateParams = {};
    if (!params) {
      return interpolateParams;
    }
    params.forEach(
      (item, index) => (interpolateParams['param' + index] = item)
    );
    console.log('INTERPOLATE***', interpolateParams);
    return interpolateParams;
  }
}

export class GenericError {
  translateKey: string;
  params: string[];

  constructor(key: string, params: string[]) {
    this.translateKey = key;
    this.params = params;
  }
}
