import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UtilisateurService } from '../../shared/Services/utilisateur.service';
import { environment } from '../../../environments/environment.development';


@Component({
  selector: 'app-template-enseignant',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatMenuModule, MatListModule, MatDividerModule],
  templateUrl: './template-enseignant.component.html',
  styleUrl: './template-enseignant.component.css'
})
export class TemplateEnseignantComponent implements OnInit {
  menus = [
    { link: 'listeassignment', icon: 'view_quilt', title: 'Liste des devoirs', label: "Liste", active: true },
    { link: 'ajouterassignment', icon: 'add_circle_outline', title: 'Ajout d\'un devoir',label: "Ajout", active: false },
    { link: 'profile', icon: 'person_outline', title: 'Profil',label: "Profil", active: false },
  ];
  nom = '';
  prenom = '';
  img ='';
  selectedTitle = "";
  constructor(private utilisateurService: UtilisateurService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const titre = params['titre'];
      this.selectedTitle = titre || this.menus[0]?.title || '';
      this.img=environment.API_URL+environment.IMAGE_API+'/'+this.utilisateurService.getInfoFromToken('photo');
   });
  
    this.nom = this.utilisateurService.getInfoFromToken('nom');
    this.prenom = this.utilisateurService.getInfoFromToken('prenom');
  }
  onItemClick(clickedItem: any) {
    this.selectedTitle = clickedItem.title;
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
