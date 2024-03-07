import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateEtudiantComponent } from './Etudiant/template-etudiant/template-etudiant.component';
import { TemplateEnseignantComponent } from './Enseignant/template-enseignant/template-enseignant.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TemplateEtudiantComponent,TemplateEnseignantComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assignement-app';
}
