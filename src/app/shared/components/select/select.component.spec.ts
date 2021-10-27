import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let loader: HarnessLoader;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSelectModule, NoopAnimationsModule],
      declarations: [SelectComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all select harnesses', async () => {
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    expect(selects.length).toBe(1);
  });

  it('should be able to check whether a select is in multi-selection mode', async () => {
    const select = await loader.getHarness(MatSelectHarness);

    expect(await select.isMultiple()).toBe(false);
  });

  it('should be able to open and close a select', async () => {
    const select = await loader.getHarness(MatSelectHarness);

    expect(await select.isOpen()).toBe(false);

    await select.open();
    expect(await select.isOpen()).toBe(true);

    await select.close();
    expect(await select.isOpen()).toBe(false);
  });

  it('should be able to get the value text from a select', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();

    await options[2].click();

    expect(await select.getValueText()).toBe('Tacos');
  });
});
