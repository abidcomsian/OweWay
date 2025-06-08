import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallSelectorComponent } from './CallSelectorComponent';

describe('CallSelectorComponent', () => {
  let component: CallSelectorComponent;
  let fixture: ComponentFixture<CallSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
