import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AreaUsuarioHandler } from '../area-usuario';
import { Router } from '@angular/router';

/**
 * Componente da página de log-in dos usuários registrados no serviço.
 * 
 * Aqui é administrado a implementação do acesso e verificação dos dados do usuário
 * no storage e dos dados do usuário apresentados no formulário do template HTML.
 * 
 * Esse componente apresenta a possibilidade, tal como o componente de registro,
 * de realizar um redirecionamento pós login de usuário através do atributo 'router'.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  /** Atributo de representação/armazenamento das informações de formulário */
  form: FormGroup = new FormGroup('');

  /** Armazena se o formulário foi ou não enviado pelo usuário */
  enviado: boolean = false;

  /**
   * Number que armazena o tempo (seg.) de timeout para redirecionamento 
   * realizado no caso do usuário estar logado e, mesmo assim, acessar a
   * página de login.
   */
  tempoEsperado: number = 3;

  /** Armazena na inicialização se o usuário está logado ou não */
  isLogado: boolean = false;

  /**
   * Armazena os valores de inicialização e verifica o log-in de usuário.
   * @param {FormBuilder} fb Objeto utilizado para construção dos campos de formulário e sua validação.
   * @param {Router} router Objeto para implementação de redirecionamento.
   */
  constructor(private fb: FormBuilder, private router: Router) {
    this.verificaLogin();
  }

  /** 
   * Valida o login do usuário e redireciona se confirmado.
   */
  private verificaLogin(): void {
    this.isLogado = AreaUsuarioHandler.isUserLogado();
    if (this.isLogado) {
      // timeout
      while (this.tempoEsperado > 0) {
        let t = this.tempoEsperado;
        setTimeout(function(){
          console.log("Redirecionando em: " + t + " segundos.");
        }, 1000);
        this.tempoEsperado--;
      }
      this.router.navigate(['']);
    }
  }

  /**
   * Método herdados de OnInit para definição dos operadores de verificação
   * dos dados do formulário de log-in.
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      uname: ['', [Validators.required, Validators.maxLength(64)]],
      senha: ['', [Validators.required, Validators.maxLength(32)]]
    });
  }

  /**
   * Confirma o envio do usuário através de validações e armazena as informações
   * de log-in no storage.
   */
  entrar() {
    this.enviado = true;
    if (this.form.valid) {
      const uname = this.form.get('uname')?.value;
      const senha = this.form.get('senha')?.value;
      alert(`O login foi ${uname} com a senha ${senha}.`);

      // Realizando log-in e redirecionamento
      AreaUsuarioHandler.makeExemploLogin(uname, senha);
      
      // Verificação de redirecionamento
      let info = AreaUsuarioHandler.getInformacoes();
      if (info[0]['retorno'][0]) {
        info[0]['retorno'][0] = false;
        this.router.navigate([info[0]['retorno'][1]]);
      } else {
        this.router.navigate(['']);
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
