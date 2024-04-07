import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignmentEleveComponent } from './dialog-assignment-eleve.component';

describe('DialogAssignmentEleveComponent', () => {
  let component: DialogAssignmentEleveComponent;
  let fixture: ComponentFixture<DialogAssignmentEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAssignmentEleveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAssignmentEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
