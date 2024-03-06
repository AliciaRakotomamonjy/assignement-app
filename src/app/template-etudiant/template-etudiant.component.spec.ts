import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEtudiantComponent } from './template-etudiant.component';

describe('TemplateEtudiantComponent', () => {
  let component: TemplateEtudiantComponent;
  let fixture: ComponentFixture<TemplateEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateEtudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
