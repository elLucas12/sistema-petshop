import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AreaUsuarioHandler } from './area-usuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sistema-petshop';
  sysTitle = 'Mangaia Petshop';

  constructor(private modalService: NgbModal, private titleService: Title, private metaService: Meta) {
    this.setTitle(this.sysTitle);
    this.metaService.updateTag({name: 'description', content: 'O Petshop de todos os riograndenses.'});

    this.definirInfoLogin();
  }

  /**
   * Atualiza o título da página web através do objeto TitleService.
   * @param {string} newTitle Título substituto da página.
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  /**
   * Carrega um determinado modal com o app através do ModalService.
   * @param modal modal a ser aberto com o componente.
   */
  public open(modal: any): void {
    this.modalService.open(modal);
  }

  /**
   * Escreve uma estrutura padrão no localStorage para o gerenciamento do frontend do usuário.
   * O tipo Object é escrito aqui para posterior alteração em seus valores, tonando os campos
   * campos fixos.
   */
  private definirInfoLogin() {
    let info = [
      {
        logado: false
      },
      {
        uname: '',
        rname: '',
        email: '',
        telefone: '',
        senha: ''
      }
    ];
    AreaUsuarioHandler.setInformacoes(info);
  }
}
