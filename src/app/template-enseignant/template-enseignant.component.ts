import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-template-enseignant',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MatIconModule,MatToolbarModule,MatButtonModule,MatSidenavModule,MatMenuModule,MatListModule,MatDividerModule],
  templateUrl: './template-enseignant.component.html',
  styleUrl: './template-enseignant.component.css'
})
export class TemplateEnseignantComponent {
  menus = [
    { link: 'login', icon: 'dashboard', text: 'login', active: true },
    { link: '/profile', icon: 'person', text: 'User', active: false },
    { link: 'ajouterassignment', icon: 'person', text: 'Ajouter assignment', active: false }

  ];

  selectedTitle: string = this.menus[0]?.text || '';

  onItemClick(clickedItem: any) {
    this.selectedTitle = clickedItem.text;
    this.menus.forEach(item => {
      item.active = (item === clickedItem);
    });
  }
}
