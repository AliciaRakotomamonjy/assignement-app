import { Component, OnInit } from '@angular/core';
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
  selector: 'app-template-enseignant',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatMenuModule, MatListModule, MatDividerModule],
  templateUrl: './template-enseignant.component.html',
  styleUrl: './template-enseignant.component.css'
})
export class TemplateEnseignantComponent implements OnInit {
  menus = [
    { link: 'profile', icon: 'person', text: 'Profil', active: true },
    { link: 'ajouterassignment', icon: 'assignment-add', text: 'Ajouter assignment', active: false },
    { link: 'listeassignment', icon: 'list assignment', text: 'La liste des assignment', active: false },
  ];
  nom = ''
  prenom = ''
  selectedTitle: string = this.menus[0]?.text || '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) { }
  ngOnInit(): void {
    this.nom=this.utilisateurService.getInfoFromToken('nom');
    this.prenom=this.utilisateurService.getInfoFromToken('prenom');
  }
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
  goToProfile(){
    this.router.navigateByUrl("/accueil_Enseignant/profile");
  }

}
