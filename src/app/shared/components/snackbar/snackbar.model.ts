export class SnackbarModel {
  message: string;
  action?: string;
  type: 'info' | 'warning' | 'error' | 'success';
  allowDuplicate?: boolean;

  constructor(snackbar: SnackbarModel) {
    this.message = snackbar.message;
    this.type = snackbar.type || 'info';
    this.allowDuplicate = snackbar.allowDuplicate || false;
    this.action = snackbar.action;
  }
}
