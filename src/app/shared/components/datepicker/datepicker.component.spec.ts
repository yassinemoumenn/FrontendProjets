import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DatepickerComponent } from './datepicker.component';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let loader: HarnessLoader;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDatepickerModule,
        NoopAnimationsModule,
        MatNativeDateModule,
        FormsModule
      ],
      declarations: [DatepickerComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(DatepickerComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all datepicker input harnesses', async () => {
    const inputs = await loader.getAllHarnesses(MatDatepickerInputHarness);
    expect(inputs.length).toBe(1);
  });

  it('should get whether the input has an associated calendar', async () => {
    const input = await loader.getHarness(MatDatepickerInputHarness);
    expect(await input.hasCalendar()).toBeTruthy();
  });

  it('should set the input value', async () => {
    const input = await loader.getHarness(MatDatepickerInputHarness);
    expect(await input.getValue()).toBeFalsy();

    await input.setValue('1/1/2020');
    expect(await input.getValue()).toBe('1/1/2020');
  });

  it('should get the minimum date of the input', async () => {
    const input = await loader.getHarness(MatDatepickerInputHarness);
    fixture.componentInstance.minDate = new Date(2020, 0, 1, 12, 0, 0);
    expect(await input.getMin()).toEqual('2020-01-01');
  });

  it('should be able to open and close a calendar in popup mode', async () => {
    const input = await loader.getHarness(MatDatepickerInputHarness);
    expect(await input.isCalendarOpen()).toBe(false);

    await input.openCalendar();
    expect(await input.isCalendarOpen()).toBe(true);

    await input.closeCalendar();
    expect(await input.isCalendarOpen()).toBe(false);
  });
});
