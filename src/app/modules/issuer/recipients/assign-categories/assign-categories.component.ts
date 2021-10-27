import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { RecipientModel } from 'src/app/modules/recipient/Recipient.model';

@Component({
  selector: 'app-assign-categories',
  templateUrl: './assign-categories.component.html',
  styleUrls: ['./assign-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignCategoriesComponent extends DumbComponent {
  @Input() recipient!: RecipientModel;
  @Input() recipientName: string = '';
  categoriesName: string[] = [];
  categories: any[] = [];
  @Input() set _categories(data: any[]) {
    this.categories = data;
    this.categoriesName = data.map((cat) => cat.name);
  }
  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() assignCategory: EventEmitter<{
    recipient: RecipientModel;
    categories: any[];
  }> = new EventEmitter();

  categoriesFC: FormControl = new FormControl('', Validators.required);

  isLoading: boolean = false;

  categoriesToAss: { category: string; state: string } = {
    category: '',
    state: ''
  };
  constructor() {
    super();
  }

  SaveChange() {
    if (this.CategoriesFC.valid) {
      let categoriesToAssign = this.categories.filter((cat) =>
        this.categoriesFC.value
          .map((cat) => cat.trim().toLowerCase())
          .includes(cat.name.trim().toLowerCase())
      );
      this.isLoading = true;
      this.assignCategory.emit({
        recipient: this.recipient,
        categories: categoriesToAssign
      });
    }
  }
  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }

  public get CategoriesFC(): FormControl {
    return this.categoriesFC;
  }
}
