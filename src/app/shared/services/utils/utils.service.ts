import { Injectable } from '@angular/core';
import moment from 'moment';
import { isEqual } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private readonly EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private readonly URL_REGEX =
    /^(https?:\/\/)?([a-z0-9\-\.]+\.[a-z0-9]+)+(\/[a-z0-9\.\-#]*)*(\?.*)?$/;
  removeFromIterable(it: any[], value: any): number {
    let removedIndex = -1;
    it.forEach((item, index) => {
      if (isEqual(item, value)) {
        removedIndex = index;
        it.splice(index, 1);
      }
    });
    return removedIndex;
  }

  isEmail(email: string) {
    return this.EMAIL_REGEX.test(email.toLowerCase());
  }
  isUrl(url: string) {
    return this.URL_REGEX.test(url.toLowerCase());
  }

  isDesktop(windowWidth: number): boolean {
    return windowWidth >= 1024;
  }

  // Non static version of format date to use directly in HTML files.
  // May be consider to create a pipe for this.
  formatStringDate(date: string, format?: string) {
    return UtilsService.formatDate(date, format);
  }

  isBlank(str) {
    return !str || /^\s*$/.test(str) || !str.trim();
  }

  isEmpty(str) {
    return !str || 0 === str.length;
  }

  isBlankOrEmpty(str) {
    return this.isBlank(str) || this.isEmpty(str);
  }

  /* Format string to a specific format or ''DD/MM/YYYY - h:mm:ss A'' by default */
  static formatDate(
    date: string,
    format: string = 'DD/MM/YYYY - h:mm:ss A'
  ): string {
    // TO DO NICE TO HAVE FORMAT US format
    // return moment(date.substring(0, date.lastIndexOf('['))).format('DD/MM/YYYY h:mm:ss A');
    let ret = '';
    if (date !== null && date !== '') {
      ret = moment(date).format(format);
    }
    return ret;
  }

  static manageString(value: string): string {
    if (value === null || value === undefined) {
      value = '';
    }
    return value.trim();
  }
}
