import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AreaUsuarioHandler } from '../area-usuario';

/**
 * Componente da página de registro de novos usuários com controle de roteamento.
 * 
 * Aqui o usuário utilizará um formulário para registrar-se no website. Atualmente,
 * os dados são armazenados no localStorage através da classe AreaUsuarioHandler para
 * possibilitar a administração única do front-end.
 */
@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit {
  
  /** Objeto que administra todos os campos do formulário */
  form: FormGroup = new FormGroup('');

  /** Armazena se o formulário já foi enviado por interação do usuário */
  enviado: boolean = false;

  /** Armazena na inicialização se o usuário está logado ou não */
  isLogado: boolean = false;

  /**
   * Number que armazena o tempo (seg.) de timeout para redirecionamento 
   * realizado no caso do usuário estar logado e, mesmo assim, acessar a
   * página de login.
   */
  tempoEsperado: number = 3;

  constructor(private fb: FormBuilder, private router: Router) {
    this.verificaLogin();
  }

  /**
   * Método herdados de OnInit para definição dos operadores de verificação
   * dos dados do formulário de registro.
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      uname: ['', [Validators.required, Validators.maxLength(32)]],
      rname: ['', [Validators.required, Validators.maxLength(64)]],
      telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.maxLength(32)]],
      senhaConf: ['', [Validators.required, Validators.maxLength(32)]]
    });
  }

  /** 
   * Valida o login do usuário e redireciona se confirmado.
   */
  private async verificaLogin() {
    this.isLogado = AreaUsuarioHandler.isUserLogado();
    if (this.isLogado) {
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

  /**
   * Busca os dados de entrada do formulário e armazena no localStorage com o AreaUsuarioHandler.
   * 
   * Caso os dados do formulário sejam inválidos ou a senha de verificação não seja condizente, 
   * os campos são marcados e uma mensagem (span) será exibida - conforme estrutura presente na 
   * linguagem de marcação.
   */
  registrar() {
    this.enviado = true;
    if (this.form.valid) {
      const uname = this.form.get('uname')?.value;
      const rname = this.form.get('rname')?.value;
      const telefone = this.form.get('telefone')?.value;
      const email = this.form.get('email')?.value;
      const senha = this.form.get('senha')?.value;
      const senhaConf = this.form.get('senhaConf')?.value;

      if (senhaConf !== senha) {
        this.markAllControlsAsDirty(Object.values(this.form.controls));
        // this.form.controls['senhaConf'].markAsDirty({onlySelf: true});
      } else {
        alert(`Registrado como "${uname}" (${rname}), com contato "${email}"/${telefone} e senha "${senha}".`);
        AreaUsuarioHandler.makeExemploRegistro(uname, rname, telefone, email, senha);

        // Verificação de redirecionamento
        let info = AreaUsuarioHandler.getInformacoes();
        if (info[0]['retorno'][0]) {
          info[0]['retorno'][0] = false;
          AreaUsuarioHandler.setInformacoes(info);
          this.router.navigate([info[0]['retorno'][1]]);
        } else {
          this.router.navigate(['']);
        }
      }
    } else {
      this.markAllControlsAsDirty(Object.values(this.form.controls));
    }
  }

  /**
   * Realiza, recursivamente, a verificação de tipo e, após, marca todos os controls da estrutura
   * passada como inválidos através do método `markAsDirty`.
   * 
   * @param {AbstractControl[]} abstractControls Objeto que armazena os controls dos campos do formulário.
   */
  private markAllControlsAsDirty(abstractControls: AbstractControl[]): void {
    abstractControls.forEach(abstractControl => {
      if (abstractControl instanceof FormControl) {
        (abstractControl as FormControl).markAsDirty({onlySelf: true});
      } else if (abstractControl instanceof FormGroup) {
        this.markAllControlsAsDirty(Object.values((abstractControl as FormGroup).controls));
      } else if (abstractControl instanceof FormArray) {
        this.markAllControlsAsDirty((abstractControl as FormArray).controls);
      }
    });
  }
}
