import { CategoryModel } from './../../../issuer/category/Category.model';
import { Observable } from 'rxjs/internal/Observable';
import { OrganizationService } from './../../organization.service';
import { Role, IPhone } from './../../../../models/User';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GroupModel } from 'src/app/models/Organization';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements AfterViewInit {
  @Input() newUser;
  @Input() userToUpdate;
  @Input() UserForm!: FormGroup;
  @Input() GroupesOfOrganization!: GroupModel[];
  @Input() GroupeswhithoutIssuer!: GroupModel[];
  @Input() Categories!: any[];

  @Input() showSpinnerEmail!: boolean;
  @Input() showSpinnerUsername!: boolean;
  @Input() showSpinnerPhone!: boolean;

  groups$!: Observable<GroupModel[]>;
  groupsWitoutIssuer$!: Observable<GroupModel[]>;
  categories$!: Observable<CategoryModel[]>;

  @Output() AddNewUser = new EventEmitter();
  @Output() UpdateUser = new EventEmitter();
  @Output() SelectedGroup = new EventEmitter();
  @Output() selectCategory = new EventEmitter();

  roles: Role[] = [Role.ISSUER, Role.SIGNER, Role.RECIPIENT];

  isLoading: boolean = false;
  isMultiple: boolean = true;
  isUpdatedisabled: boolean = true;

  phone!: IPhone;

  isgroupSelected: boolean = false;

  maxDate = new Date();
  minDate = new Date('01/01/1900');

  isPhoneRequired: boolean = false;
  isEmailRequired: boolean = true;

  constructor(private orgService: OrganizationService) {}

  ngAfterViewInit() {
    this.groups$ = of(this.GroupesOfOrganization);
    this.groupsWitoutIssuer$ = of(this.GroupeswhithoutIssuer);
    this.categories$ = of(this.Categories);
    if (this.userToUpdate !== null) {
      if (
        this.userToUpdate.role === 'RECIPIENT' &&
        this.UserForm.value.GroupesOfOrganization.length > 0
      ) {
        this.isgroupSelected = true;
      }
      if (this.userToUpdate.phone.placeHolder !== '') {
        this.isPhoneRequired = true;
        this.isEmailRequired = false;
      }
      if (this.userToUpdate.email !== '') {
        this.isEmailRequired = true;
        this.isPhoneRequired = false;
      }
      if (this.userToUpdate.role === 'ISSUER') {
        this.isMultiple = false;
      } else {
        this.isMultiple = true;
        let af = this.userToUpdate.groups;
        af.forEach((a) => {
          let group = a.group;
          this.getCategoriesByGroup(group.id);
        });
      }
    }
  }

  groupSElected(group) {
    if (this.userToUpdate !== null) {
      this.isUpdatedisabled = false;
    }
    this.Categories = [];
    this.UserForm.patchValue({ categories: [] });
    this.SelectedGroup.emit(group);
    if (this.UserForm.value.role === 'RECIPIENT') {
      this.isgroupSelected = true;
      group.user.forEach((element) => {
        this.getCategoriesByGroup(element);
      });
    }
    this.categories$ = of(this.Categories);
  }

  getCategoriesByGroup(groupId) {
    this.orgService.AllCategoriesByGroup(groupId).subscribe((res) => {
      res.data.forEach((cat) => {
        let a = this.Categories.filter((item) => item.id === cat.id);
        if (a.length <= 0) {
          this.Categories.push(cat);
        }
      });
    });
  }

  categorySelected(category) {
    if (this.userToUpdate !== null) {
      this.isUpdatedisabled = false;
    }
    let data = {
      categories: this.Categories,
      selectedCategoriesIds: category.category.value
    };
    this.selectCategory.emit(data);
  }

  CountryChanged(event) {
    this.phone = event;
    this.phone.placeHolder = this.UserForm.value.phone;
    this.setupPhone();
  }

  setupPhone() {
    this.UserForm.get('phone.name')?.setValue(this.phone?.name);
    this.UserForm.get('phone.iso2')?.setValue(this.phone?.iso2);
    this.UserForm.get('phone.flagClass')?.setValue(this.phone?.flagClass);
    this.UserForm.get('phone.dialCode')?.setValue(this.phone?.dialCode);
    this.UserForm.get('phone.priority')?.setValue(this.phone?.priority);
  }

  changeEmail() {
    let email = this.UserForm.value.email;
    if (email !== '') {
      this.isPhoneRequired = false;
      this.isEmailRequired = true;
    } else {
      this.isPhoneRequired = true;
      this.isEmailRequired = false;
    }
  }

  onConfirmClick() {
    this.isLoading = true;
    let Categories: any = [];
    this.Categories.forEach((element) => {
      this.UserForm.value.categories.forEach((cat) => {
        if (element.id === cat) {
          Categories.push(element);
        }
      });
    });
    this.UserForm.patchValue({ categories: Categories });
    this.setupPhone();
    if (this.newUser) {
      this.AddNewUser.emit(this.UserForm);
    } else {
      this.UpdateUser.emit(this.UserForm);
    }
  }

  SelectRole(role) {
    this.inputChanged(role);
    if (role === 'ISSUER') {
      this.isMultiple = false;
    } else {
      this.isMultiple = true;
    }
  }

  inputChanged(event) {
    if (this.userToUpdate !== null) {
      const e = event.target.value;
      if (
        e !== this.userToUpdate.username &&
        e !== this.userToUpdate.email &&
        e !== this.userToUpdate.phone.placeHolder &&
        e !== this.userToUpdate.firstname &&
        e !== this.userToUpdate.lastname &&
        e !== this.userToUpdate.birthday &&
        e !== this.userToUpdate.occupation &&
        e !== this.userToUpdate.role
      ) {
        this.isUpdatedisabled = false;
      } else {
        this.isUpdatedisabled = true;
      }
    }
  }
  phoneChanged(event) {
    if (this.userToUpdate !== null) {
      let e = event.target.value;
      e = '+' + this.UserForm.get('phone.dialCode')?.value + e;
      if (e !== this.userToUpdate.phone.placeHolder) {
        this.isUpdatedisabled = false;
      } else {
        this.isUpdatedisabled = true;
      }
    }
  }
  public get FirstName(): FormControl {
    return this.UserForm.get('firstname') as FormControl;
  }

  public get LastName(): FormControl {
    return this.UserForm.get('lastname') as FormControl;
  }

  public get Email(): FormControl {
    return this.UserForm.get('email') as FormControl;
  }

  public get Phone(): FormControl {
    return this.UserForm.get('phone.placeHolder') as FormControl;
  }

  public get Username(): FormControl {
    return this.UserForm.get('username') as FormControl;
  }

  public get Birthday(): FormControl {
    return this.UserForm.get('birthday') as FormControl;
  }

  public get Occupation(): FormControl {
    return this.UserForm.get('occupation') as FormControl;
  }

  public get Role(): FormControl {
    return this.UserForm.get('role') as FormControl;
  }

  public get GroupeswhithoutIssuerFC(): FormControl {
    return this.UserForm.get('GroupeswhithoutIssuer') as FormControl;
  }

  public get GroupesOfOrganizationFC(): FormControl {
    return this.UserForm.get('GroupesOfOrganization') as FormControl;
  }
}
