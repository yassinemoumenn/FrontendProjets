import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: (object) => ({}) });
    const authenticationServiceStub = () => ({
      isLoading$: {},
      currentUserValue: {},
      login: (value, value1) => ({ pipe: () => ({ subscribe: (f) => f({}) }) }),
      loginGoogle: () => ({}),
      loginLinkedin: () => ({})
    });
    const activatedRouteStub = () => ({ snapshot: { queryParams: {} } });
    const routerStub = () => ({ navigate: (array) => ({}) });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initForm').and.callThrough();
      component.ngOnInit();
      expect(component.initForm).toHaveBeenCalled();
    });
  });

  describe('initForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder =
        fixture.debugElement.injector.get(FormBuilder);
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.initForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService =
        fixture.debugElement.injector.get(AuthenticationService);
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(authenticationServiceStub, 'login').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.submit();
      expect(authenticationServiceStub.login).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('loginGoogle', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService =
        fixture.debugElement.injector.get(AuthenticationService);
      spyOn(authenticationServiceStub, 'loginGoogle').and.callThrough();
      component.loginGoogle();
      expect(authenticationServiceStub.loginGoogle).toHaveBeenCalled();
    });
  });

  describe('loginLinkedin', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService =
        fixture.debugElement.injector.get(AuthenticationService);
      spyOn(authenticationServiceStub, 'loginLinkedin').and.callThrough();
      component.loginLinkedin();
      expect(authenticationServiceStub.loginLinkedin).toHaveBeenCalled();
    });
  });
});
