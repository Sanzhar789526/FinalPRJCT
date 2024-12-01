import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveModuleComponent } from './interactive-module.component';

describe('InteractiveModuleComponent', () => {
  let component: InteractiveModuleComponent;
  let fixture: ComponentFixture<InteractiveModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
