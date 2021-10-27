import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { SnackbarModel } from 'src/app/shared/components/snackbar/snackbar.model';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { AuthenticationService } from '../../auth/authentication.service';
import { UserProfileService } from '../user-profile.service';
import { UrlValidator } from '../../auth/registration/urlValidation';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/models/Organization';
import { domains } from '../../auth/registration/organization-registration/organization-registration.component';
@Component({
  selector: 'app-organization-information',
  templateUrl: './organization-information.component.html',
  styleUrls: ['./organization-information.component.scss'],
  animations: [
    trigger('AnimationHiddenBloc', [
      state(
        'start',
        style({
          height: '60px',
          opacity: '1'
        })
      ),
      state(
        'end',
        style({ height: '0px', border: 'none', padding: '0px', opacity: '0' })
      ),
      transition('start => end', [animate('.250s ease')]),
      transition('end => start', [animate('.250s ease')])
    ]),
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', padding: '0' })
      ),
      state('expanded', style({ height: '*', padding: '10px' })),
      transition(
        'expanded <=> collapsed',
        animate('.250s cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class OrganizationInformationComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  mapformGroup!: FormGroup;
  firstUserState?: Organization | null;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  organization!: any;

  isShow: boolean = false;

  url: string = './assets/no-user.png';

  domains: string[] = [];

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private _snackbarService: SnackbarService,
    private utilsService: UtilsService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoading$ = this.authService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.domains = domains;
    this.organization = this.authService.currentOrganizationValue;
    this.firstUserState = this.authService.currentOrganizationValue;
    this.loadForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      name: [
        this.organization.name,
        {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]),
          asyncValidators: [
            this.existingOrganizationNameValidator(this.organization.name)
          ],
          updateOn: 'blur'
        }
      ],
      location: [
        { value: this.organization.location, disabled: true },
        {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ])
        }
      ],
      domain: [
        this.organization.domain,
        Validators.compose([Validators.required])
      ],
      website: [
        this.organization.website,
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(100),
          UrlValidator(this.utilsService)
        ])
      ],
      areaCode: [
        this.organization.areaCode,
        Validators.compose([Validators.minLength(3), Validators.maxLength(100)])
      ],
      institutionId: [
        this.organization.institutionId,
        Validators.compose([Validators.minLength(3), Validators.maxLength(100)])
      ],
      mapToAdress: this.mapformGroup
    });

    this.mapformGroup = this.fb.group({
      search: ['', Validators.minLength(3)],
      street: ['', Validators.minLength(3)],
      number: [null, Validators.maxLength(6)],
      zipCode: [null, Validators.maxLength(6)],
      lat: [null],
      lng: [null]
    });
  }
  public get OrganizationName(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }
  public get Location(): FormControl {
    return this.formGroup.get('location') as FormControl;
  }
  public get WebSite(): FormControl {
    return this.formGroup.get('website') as FormControl;
  }
  public get Domain(): FormControl {
    return this.formGroup.get('domain') as FormControl;
  }
  public get AreaCode(): FormControl {
    return this.formGroup.get('areaCode') as FormControl;
  }
  public get InstitutionId(): FormControl {
    return this.formGroup.get('institutionId') as FormControl;
  }

  TrimValues() {
    let organizationName = this.formGroup.get('organizationName');
    let domain = this.formGroup.get('domain');
    let areaCode = this.formGroup.get('areaCode');
    let institutionId = this.formGroup.get('institutionId');

    organizationName?.setValue(organizationName?.value?.trim());
    domain?.setValue(domain?.value?.trim());
    areaCode?.setValue(areaCode?.value?.trim());
    institutionId?.setValue(institutionId?.value?.trim());
  }

  btnIsLoading: boolean = false;
  save() {
    this.btnIsLoading = true;
    if (!this.formGroup.valid) {
      return;
    }

    this.TrimValues();
    const formValues = this.formGroup.value;
    this.organization = Object.assign(this.organization, formValues);

    const updateAccountSettings = this.userProfileService
      .updateOrganization(this.organization)
      .subscribe((msg) => {
        const message: SnackbarModel = {
          message: 'USER_PROFILE.ORGANIZATION_INFO.BODY.msgSuccess',
          type: 'success'
        };
        this._snackbarService.push(message);
        this.route.navigate(['/user-profile', 'overview'], {
          relativeTo: this.activatedRoute
        });
      });

    this.subscriptions.push(updateAccountSettings);
  }

  cancel() {
    this.organization = Object.assign({}, this.firstUserState);
    this.loadForm();
    this.route.navigate(['/user-profile', 'overview'], {
      relativeTo: this.activatedRoute
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
      inline: 'nearest'
    });
  }

  onselectfile(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.url = reader.result as string;

        this.formGroup.patchValue({
          picture: reader.result
        });
      };
    }
  }

  deletePic() {
    this.formGroup.get('picture')?.setValue('');
    this.url = './assets/no-user.png';
  }

  showSpinnerOrganizationName: boolean = false;
  existingOrganizationNameValidator(
    orgName: string | undefined
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (
        control &&
        control.value !== '' &&
        (orgName === undefined || orgName !== control.value)
      ) {
        this.showSpinnerOrganizationName = true;
        return this.authService.ValidateOrganizationName(control.value).pipe(
          delay(400),
          map((resp) => {
            this.showSpinnerOrganizationName = false;
            return resp.data
              ? { alreadyTaken: 'Organization name already taken' }
              : null;
          })
        );
      }
      return of(null);
    };
  }
}
