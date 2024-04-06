import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAssignmenteleveComponent } from './detail-assignmenteleve.component';

describe('DetailAssignmenteleveComponent', () => {
  let component: DetailAssignmenteleveComponent;
  let fixture: ComponentFixture<DetailAssignmenteleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAssignmenteleveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAssignmenteleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
