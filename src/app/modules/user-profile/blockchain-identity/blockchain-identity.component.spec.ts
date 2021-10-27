import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainIdentityComponent } from './blockchain-identity.component';

describe('BlockchainIdentityComponent', () => {
  let component: BlockchainIdentityComponent;
  let fixture: ComponentFixture<BlockchainIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockchainIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
