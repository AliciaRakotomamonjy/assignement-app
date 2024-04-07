import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDevoirComponent } from './detail-devoir.component';

describe('DetailDevoirComponent', () => {
  let component: DetailDevoirComponent;
  let fixture: ComponentFixture<DetailDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDevoirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
