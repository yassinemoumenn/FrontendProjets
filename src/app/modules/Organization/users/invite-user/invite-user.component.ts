import { of, Observable } from 'rxjs';
import { OrganizationService } from './../../organization.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GroupModel } from 'src/app/models/Organization';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements AfterViewInit {
  spinnerIsShow: boolean = false;
  emptyList: boolean = true;
  disableCategory: boolean = false;
  noData: boolean = false;

  @Input() allUsers: any[] = [];
  categories: any[] = [];
  selectedCategories: any[] = [];
  categories$!: Observable<any>;
  @Input() groups: GroupModel[] = [];
  groupsCopy: GroupModel[] = [];
  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() inviteUsersEvent: EventEmitter<any> = new EventEmitter();
  selectable = true;
  removable = true;
  isLoading = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  filtredUsers: any[] = [];
  _selectedUsers: any[] = [];

  @ViewChild('usersInput') usersInput!: ElementRef<HTMLInputElement>;

  useCtr: FormControl = new FormControl('', Validators.required);
  roleCTl: FormControl = new FormControl('', Validators.required);
  categoriesFC: FormControl = new FormControl('');
  groupsCtl: FormControl = new FormControl('');

  constructor(private orgService: OrganizationService) {}
  ngAfterViewInit(): void {
    this.groupsCopy = this.groups;
  }

  onKeyUp() {
    this.noData = false;
    this._filter(this.useCtr.value);
    if (this.filtredUsers.length > 0) {
      this.emptyList = false;
      this.spinnerIsShow = false;
    }
    if (this._selectedUsers.length > 0) {
      this.emptyList = false;
      this.spinnerIsShow = false;
    }
  }

  remove(user): void {
    if (user.role === 'RECIPIENT') {
      this.disableCategory = false;
    }
    const index = this._selectedUsers.indexOf(user);

    if (this.useCtr.value === null) {
      this.emptyList = true;
    }
    if (index >= 0) {
      this._selectedUsers.splice(index, 1);
    }
    this.groupsCtl.patchValue('');
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.groups = this.groupsCopy.slice();
    let user = this.allUsers.find((u) => u.id === event.option.value);
    if (user.role === 'RECIPIENT') {
      this.disableCategory = true;
    }
    if (user.role === 'ISSUER') {
      this.groups = this.groups.filter(
        (elt) => elt.issuer.length <= 0 || !elt.issuer
      );
    }
    let index = this._selectedUsers.find((u) => u.id === user.id);
    if (!index) {
      this._selectedUsers.push(user);
    }
    this.usersInput.nativeElement.value = '';
    this.useCtr.setValue(null);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    let users = this.allUsers.slice();
    this.filtredUsers = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(filterValue) ||
        user.lastname.toLowerCase().includes(filterValue) ||
        user.role.toLowerCase().includes(filterValue)
    );
    if (this.filtredUsers.length <= 0) {
      this.spinnerIsShow = false;
      this.noData = true;
    }
  }

  InviteUsers() {
    this.isLoading = true;
    let usersIds = this._selectedUsers.map((rec) => rec.id);

    this.inviteUsersEvent.emit({
      userIDs: usersIds,
      categories: this.categoriesFC.value,
      groupId: this.groupsCtl.value
    });

    setTimeout(() => {
      this.dismissDialog.emit(true);
    }, 500);
  }

  public get Categories(): FormControl {
    return this.categoriesFC;
  }

  groupSElected(group) {
    this.getCategoriesByGroup(group.option.value);
    this.categoriesFC.patchValue('');
  }

  getCategoriesByGroup(groupId) {
    this.orgService.AllCategoriesByGroup(groupId).subscribe((res) => {
      this.categories = res.data;
      this.categories$ = of(this.categories);
    });
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }
}
