import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as sha512 from 'js-sha512';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.isLogado = AreaUsuarioHandler.isUserLogado();
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
        let info = AreaUsuarioHandler.getInformacoes();
        info[1]['uname'] = uname;
        info[1]['rname'] = rname;
        info[1]['telefone'] = telefone;
        info[1]['email'] = email;
        info[1]['senha'] = sha512.sha512(senha);
        AreaUsuarioHandler.setInformacoes(info);

        // Verificação de redirecionamento
        if (info[0]['retorno'][0]) {
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
