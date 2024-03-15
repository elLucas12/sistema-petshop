import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaginaInicialComponent, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sistema-petshop';
  sysTitle = 'Mangaia Petshop';

  constructor(private modalService: NgbModal, private titleService: Title, private metaService: Meta) {
    this.setTitle(this.sysTitle);
    this.metaService.updateTag({name: 'description', content: 'O Petshop de todos os rio-grandenses.'});
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
