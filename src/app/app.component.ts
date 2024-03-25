import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AreaUsuarioHandler } from './area-usuario';

import LocalePT from '@angular/common/locales/pt';
import { CommonModule, registerLocaleData } from '@angular/common';
registerLocaleData(LocalePT);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  /** Título do sistema web por um todo. */
  title = 'sistema-petshop';

  /** Título do sistema derivado - nome do petshop. */
  sysTitle = 'Mangaia Petshop';

  /** Armazena se o usuário está logado. */
  isLogado: boolean = false;

  /**
   * Define atributos necessários ao objeto e chama os métodos de inicialização necessários.
   * 
   * @param modalService Serviço para abertura de modals.
   * @param titleService Serviço utilizado para alteração do título de cabeçalho.
   * @param metaService Serviço utilizado para alteração de metadados do sistema web.
   */
  constructor(private modalService: NgbModal, private titleService: Title, private metaService: Meta) {
    this.setTitle(this.sysTitle);
    this.metaService.updateTag({name: 'description', content: 'O Petshop de todos os riograndenses.'});
    this.verificaLogin();
  }

  /**
   * Verifica o login do usuário e, se for o caso, administra a injeção do template de dados no localStorage.
   */
  verificaLogin(): void {
    this.isLogado = AreaUsuarioHandler.isUserLogado();
    if (!this.isLogado) {
      AreaUsuarioHandler.definirPadraoInfo();
    }
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
}
