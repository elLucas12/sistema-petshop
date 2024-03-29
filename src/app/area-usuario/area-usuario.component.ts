import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AreaUsuarioHandler } from '../area-usuario';
import { CommonModule } from '@angular/common';

import { Servico } from '../agendamento';

/**
 * Componente para a Área restrita de usuários. Apresenta funcionalidades únicas
 * para os usuários logados no sistema web, como visualização de agenda e histórico
 * de compra e serviços.
 */
@Component({
  selector: 'app-area-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './area-usuario.component.html',
  styleUrl: './area-usuario.component.css'
})
export class AreaUsuarioComponent implements OnInit {

  /**
   * Number que armazena o tempo (seg.) de timeout para redirecionamento 
   * realizado no caso do usuário não estar logado e, mesmo assim, acessar a
   * Área de Usuário.
   */
  tempoEsperado: number = 3;

  /** Armazena na inicialização se o usuário está logado ou não */
  isLogado: boolean = false;

  /** Enum de tipo de serviço para o redirecionamento a partir do componente 'servicos'. */
  Servico = Servico;

  constructor(private router: Router) {
    this.verificaLogin();
  }

  /** 
   * Altera o routeroutlet para alteração de informações de usuário.
   */
  ngOnInit(): void {
    if (this.isLogado) {
      this.router.navigate(['/area-usuario/cadastro'], { queryParams: { tipo: 'usuario' } });
    }
  }

  /** 
   * Valida o login do usuário e redireciona se confirmado.
   */
  private async verificaLogin() {
    this.isLogado = AreaUsuarioHandler.isUserLogado();
    if (!this.isLogado) {
      // timeout
      while (this.tempoEsperado > 0) {
        let t = this.tempoEsperado;

        await new Promise(function(resolve, reject){
          setTimeout(function(){
            console.log("Redirecionando em: " + t + " segundos.");
            resolve('');
          }, 1000)
        });

        this.tempoEsperado--;
      }
      this.router.navigate(['']);
    }
  }
}
