import { Component, inject } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CalendarView, CalendarEvent, CalendarModule } from 'angular-calendar';
import { Router } from '@angular/router';

import { AgendamentoHandler, Servico, Porte } from '../agendamento';

import LocalePT from '@angular/common/locales/pt';
registerLocaleData(LocalePT);

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule
  ],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent {
  locale: string = 'pt-BR';

  // Seleção de serviços
  isPorteSelecionado: boolean = false;
  porteSelecionado: Porte = Porte.pequeno;
  isServicoSelecionado: boolean = false;
  servicoSelecionado: Servico = Servico.banho;
  
  // Calendário
  viewDateCalendario: Date = new Date();
  viewCalendario: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  isDataSelecionada: boolean = false;

  constructor(private router: Router) { }

  eventosCalendario: CalendarEvent[] = [];

  selecaoPorte(porte: Porte): void {
    this.isPorteSelecionado = true;
    this.porteSelecionado = porte;
  }

  selecaoServico(servico: Servico): void {
    this.isServicoSelecionado = true;
    this.servicoSelecionado = servico;
  }

  setCalendarView(viewCalendario: CalendarView) {
    this.viewCalendario = viewCalendario;
  }

  cliqueDia({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(`Data selecionada => "${date}"`);
    let val = confirm(`Confirmar agendamento para ${date.toLocaleDateString()}?`);
    if (val) {
      let agendamento = {
        data_agendamento: date.toUTCString(),
        servico: this.servicoSelecionado,
        porte: this.porteSelecionado,
      };
      AgendamentoHandler.setDiaAgendamento(agendamento);
      console.log(`Definida data de agenda: "${date.toLocaleDateString()}"`);
      this.router.navigate(['/finalizar-compra']);
    }
  }
}
