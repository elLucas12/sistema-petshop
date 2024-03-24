import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AreaUsuarioHandler } from '../area-usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './area-usuario.component.html',
  styleUrl: './area-usuario.component.css'
})
export class AreaUsuarioComponent {

  /**
   * Number que armazena o tempo (seg.) de timeout para redirecionamento 
   * realizado no caso do usuário não estar logado e, mesmo assim, acessar a
   * Área de Usuário.
   */
  tempoEsperado: number = 3;

  /** Armazena na inicialização se o usuário está logado ou não */
  isLogado: boolean = false;

  constructor(private router: Router) {
    this.verificaLogin();
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
