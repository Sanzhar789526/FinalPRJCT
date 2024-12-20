import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationComponent } from './communication.component';

describe('CommunicationComponent', () => {
  let component: CommunicationComponent;
  let fixture: ComponentFixture<CommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
