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



@Component({
  selector: 'app-template-etudiant',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatMenuModule, MatListModule, MatDividerModule],
  templateUrl: './template-etudiant.component.html',
  styleUrl: './template-etudiant.component.css'
})
export class TemplateEtudiantComponent implements OnInit {
  menus = [
    { link: 'les_devoirs', icon: 'list devoir', text: 'La liste des assignments', active: true },
    { link: 'mesdevoirs', icon: 'person', text: 'Mes devoirs', active: false },

  ];
  nom = ""
  prenom = ""

  selectedTitle = "";
  constructor(private utilisateurService: UtilisateurService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const titre = params['titre'];
      this.selectedTitle = titre || this.menus[0]?.text || '';
   });
  
    this.nom = this.utilisateurService.getInfoFromToken('nom');
    this.prenom = this.utilisateurService.getInfoFromToken('prenom');
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
}
