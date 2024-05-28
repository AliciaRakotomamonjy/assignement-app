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
  selector: 'app-template-etudiant',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatMenuModule, MatListModule, MatDividerModule],
  templateUrl: './template-etudiant.component.html',
  styleUrl: './template-etudiant.component.css'
})
export class TemplateEtudiantComponent implements OnInit {
  menus = [
    { link: 'les_devoirs', icon: 'view_quilt',label: "Liste", title: 'La liste des devoirs', active: true },
    { link: 'mesdevoirs', icon: 'assignment',label: "Mes devoirs", title: 'Mes devoirs', active: false },
    { link: 'profile', icon: 'person_outline',label: "Profil", title: 'Profil', active: false },
  ];
  nom = ""
  prenom = ""
  URL_IMAGE=environment.API_URL+environment.IMAGE_API;
  img=""
  selectedTitle = "";
  constructor(private utilisateurService: UtilisateurService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const titre = params['titre'];
      this.selectedTitle = titre || this.menus[0]?.title || '';
   });

    this.nom = this.utilisateurService.getInfoFromToken('nom');
    this.prenom = this.utilisateurService.getInfoFromToken('prenom');
    this.img=this.URL_IMAGE+'/'+this.utilisateurService.getInfoFromToken('photo');
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
    this.router.navigateByUrl("/accueil_Etudiant/profile");
  }
}
