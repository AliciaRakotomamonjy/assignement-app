import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEnseignantComponent } from './template-enseignant.component';

describe('TemplateEnseignantComponent', () => {
  let component: TemplateEnseignantComponent;
  let fixture: ComponentFixture<TemplateEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateEnseignantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
