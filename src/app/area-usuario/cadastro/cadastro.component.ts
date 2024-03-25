import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaUsuarioHandler } from '../../area-usuario';

/** Tipo de cadastro administrado pelo objeto. */
export enum TipoCadastro {
  usuario,
  pet
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {

  /** Objeto que administra todos os campos do formulário */
  form: FormGroup = new FormGroup('');
  formPet: FormGroup = new FormGroup('');

  /** Armazena se o formulário já foi enviado por interação do usuário */
  enviado: boolean = false;

  /** Armazena o tipo de histórico a ser exibido => ['loja', 'servicos']. */
  tipo: TipoCadastro = TipoCadastro.usuario;
  TipoCadastro = TipoCadastro;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  /**
   * Verifica os parametros passados pela url e ajusta os atributos de página
   * para o respectivo tipo de cadastro e ajusta os parametros de formulário.
   */
  ngOnInit(): void {
    // Argumentos URL
    this.route.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      if (tipo === 'usuario') {
        this.tipo = TipoCadastro.usuario;
      } else if (tipo === 'pet') {
        this.tipo = TipoCadastro.pet;
      } else {
        console.error('Parametro de tipo de cadastro inválido!');
      }
    });

    // Formulários
    this.form = this.fb.group({
      uname: ['', [Validators.maxLength(32)]],
      rname: ['', [Validators.maxLength(64)]],
      telefone: ['', [Validators.minLength(10), Validators.maxLength(14)]],
      email: ['', [Validators.email]]
    });
    this.formPet = this.fb.group({
      nome: ['', [Validators.maxLength(32)]],
      nascimento: ['', [Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      especie: ['', [Validators.maxLength(64)]],
      raca: ['', [Validators.maxLength(64)]],
      pelagem: ['', [Validators.maxLength(64)]]
    });
  }

   /**
   * Busca os dados de entrada do formulário e armazena no localStorage com o AreaUsuarioHandler.
   * 
   * Caso os dados do formulário sejam inválidos ou a senha de verificação não seja condizente, 
   * os campos são marcados e uma mensagem (span) será exibida - conforme estrutura presente na 
   * linguagem de marcação.
   */
   atualizarRegistro() {
    this.enviado = true;
    if (this.form.valid) {
      let info = AreaUsuarioHandler.getInformacoes();
      let uname = this.form.get('uname')?.value;
      let rname = this.form.get('rname')?.value;
      let telefone = this.form.get('telefone')?.value;
      let email = this.form.get('email')?.value;

      // verificando
      if (uname === '') {
        uname = info[1]['uname'];
      }
      if (rname === '') {
        rname = info[1]['rname'];
      }
      if (telefone === '') {
        telefone = info[1]['telefone'];
      }
      if (email === '') {
        email = info[1]['email'];
      }

      // alteração do storage
      alert(`Alterando para: "${uname}" (${rname}), com contato "${email}"/${telefone}".`);
      AreaUsuarioHandler.makeExemploRegistro(uname, rname, telefone, email, info[1]['senha']);
      this.form.reset();
    } else {
      this.markAllControlsAsDirty(Object.values(this.form.controls));
    }
  }

  /**
   * Busca os dados de entrada do formulário de pet e armazena no localStorage com o AreaUsuarioHandler.
   * 
   * Caso os dados do formulário sejam inválidos ou a senha de verificação não seja condizente, 
   * os campos são marcados e uma mensagem (span) será exibida - conforme estrutura presente na 
   * linguagem de marcação.
   */
  atualizarRegistroPet() {
    this.enviado = true;
    if (this.formPet.valid) {
      let info = AreaUsuarioHandler.getInformacoes();
      let nome = this.formPet.get('nome')?.value;
      let nascimento = this.formPet.get('nascimento')?.value;
      let especie = this.formPet.get('especie')?.value;
      let raca = this.formPet.get('raca')?.value;
      let pelagem = this.formPet.get('pelagem')?.value;

      // verificando
      if (nome === '') {
        nome = info[2]['nome'];
      }
      if (nascimento === '') {
        nascimento = info[2]['nascimento'];
      }
      if (especie === '') {
        especie = info[2]['especie'];
      }
      if (raca === '') {
        raca = info[2]['raca'];
      }
      if (pelagem === '') {
        pelagem = info[2]['pelagem'];
      }

      // alteração do storage
      alert(`Alterando para: "${nome}" (${nascimento}), espécie "${especie}", raça ${raca}" com pelagem ${pelagem}.`);
      AreaUsuarioHandler.makeExemploRegistroPet(nome, nascimento, especie, raca, pelagem);
      this.formPet.reset();
    } else {
      this.markAllControlsAsDirty(Object.values(this.formPet.controls));
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
