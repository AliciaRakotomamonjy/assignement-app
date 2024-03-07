import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UtilisateurService } from '../../shared/Services/utilisateur.service';



@Component({
  selector: 'app-template-etudiant',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatMenuModule, MatListModule, MatDividerModule],
  templateUrl: './template-etudiant.component.html',
  styleUrl: './template-etudiant.component.css'
})
export class TemplateEtudiantComponent {
  menus = [
    { link: '/dashboard', icon: 'dashboard', text: 'Dashboard', active: true },
    { link: '/profile', icon: 'person', text: 'User', active: false }
  ];

  selectedTitle: string = this.menus[0]?.text || '';
  constructor(private utilisateurService: UtilisateurService,private router:Router) { }
  onItemClick(clickedItem: any) {
    this.selectedTitle = clickedItem.text;
    this.menus.forEach(item => {
      item.active = (item === clickedItem);
    });
  }
  deconnexion() {
    this.utilisateurService.logoutUtiliateur();
    this.router.navigateByUrl("login");
  }
}
