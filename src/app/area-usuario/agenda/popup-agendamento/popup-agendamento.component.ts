import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Servico, Porte, AgendamentoHandler } from '../../../agendamento';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-agendamento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './popup-agendamento.component.html',
  styleUrl: './popup-agendamento.component.css'
})
export class PopupAgendamentoComponent implements OnInit {
  /** Objeto que administra todos os campos do formulário */
  form: FormGroup = new FormGroup('');

  /** Armazena se o formulário já foi enviado por interação do usuário */
  enviado: boolean = false;

  constructor(private fb: FormBuilder, private activeModalService: NgbActiveModal) { }

  /**
   * Método herdado de OnInit para definição dos operadores de verificação
   * dos dados do formulário de registro.
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      horarioAgendamento: ['', [Validators.required]],
      servico: ['', [Validators.required, function verificaServico (control: AbstractControl) {
        if (control.value === 'Banho' || control.value === 'Tosa') {
          return null;
        }
        return { 'ErroServico': 'O valor do serviço do form é inválido!' };
      }]],
      porte: ['', [Validators.required, function verificaPorte (control: AbstractControl) {
        if (control.value === 'Pequeno' || control.value === 'Grande') {
          return null;
        }
        return { 'ErroPorte': 'O valor do porte de pet do form é inválido!' };
      }]]
    });
  }

  /**
   * Armazena a informação de data do input
   * 
   * Caso os dados do formulário sejam inválidos ou a senha de verificação não seja condizente, 
   * os campos são marcados e uma mensagem (span) será exibida - conforme estrutura presente na 
   * linguagem de marcação.
   */
  agendar() {
    this.enviado = true;
    if (this.form.valid) {
      const horarioAgendamento = this.form.get('horarioAgendamento')?.value;
      const servico = ((this.form.get('servico')?.value === 'Banho') ? Servico.banho : Servico.tosa);
      const porte = ((this.form.get('porte')?.value === 'Pequeno') ? Porte.pequeno : Porte.grande);

      // Atualizando o horário dentro do objeto
      let dataAgendamento = AgendamentoHandler.getDiaAgendamento();
      console.log(`horarioAgendamento => ${horarioAgendamento}`);
      dataAgendamento.setHours(parseInt(horarioAgendamento.split(':')[0]), parseInt(horarioAgendamento.split(':')[1]));

      // Reescrevendo no storage
      let infoAgendamento = AgendamentoHandler.getInformacoes();
      infoAgendamento['data'] = dataAgendamento;
      infoAgendamento['servico'] = servico;
      infoAgendamento['porte'] = porte;
      AgendamentoHandler.setInformacoes(infoAgendamento);
      this.activeModalService.close();
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
