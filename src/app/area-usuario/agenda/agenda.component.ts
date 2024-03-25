import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarView, CalendarEvent, CalendarModule } from 'angular-calendar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AgendamentoHandler, Servico, Porte } from '../../agendamento';
import { PopupAgendamentoComponent } from './popup-agendamento/popup-agendamento.component';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent {

  /** String de locale para especificar o formato de calendário. */
  locale: string = 'pt-BR';

  /** Date utilizado utilizado como view para construção do calendário. */
  viewDateCalendario: Date = new Date();

  /** Especificação do tipo de visualização apresentada para o usuário. */
  viewCalendario: CalendarView = CalendarView.Month;

  /** Armazenamento private do enum de calendário. */
  CalendarView = CalendarView;

  /** Armazena se a data de agendamento já foi selecionada. */
  isDataSelecionada: boolean = false;

  /** Armazena os eventos de calendário - PADRAO: nenhum */
  eventosCalendario: CalendarEvent[] = [];

  constructor(private modalService: NgbModal, private router: Router) { }

  /**
   * Altera o tipo de visualização do calendário com base no enum CalendarView.
   * 
   * @param {CalendarView} viewCalendario Tipo de visualização.
   */
  setCalendarView(viewCalendario: CalendarView) {
    this.viewCalendario = viewCalendario;
  }

  /**
   * Recebe e armazena no storage as informações de dada passadas pelo usuário por
   * meio do clique do mouse.
   * 
   * @param param0 Estrutura de dados com dados atuais da seleção.
   */
  cliqueDia({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(`Data selecionada => "${date}"`);
    
    // Redefinindo dados de agendamento no localStorage
    let agendamento = {
      data: date,
      servico: Servico.banho,
      porte: Porte.pequeno
    }
    AgendamentoHandler.setInformacoes(agendamento);

    // administrando o popup de informações.
    const popupAgendamentoRef = this.modalService.open(PopupAgendamentoComponent);
    popupAgendamentoRef.result.then((data) => {
      console.log(`Definida data de agenda: "${AgendamentoHandler.getDiaAgendamento().toLocaleString()}"`);
      alert(`Data definida para data "${AgendamentoHandler.getDiaAgendamento().toLocaleString()}".`);
    });
  }
}
