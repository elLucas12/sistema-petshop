import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { startOfDay } from 'date-fns';
import { CalendarView, CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

export enum Servico {
  banho,
  tosa
}

export enum Porte {
  pequeno,
  grande
}

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent {
  isPorteSelecionado: boolean = false;
  porteSelecionado: Porte = Porte.pequeno;
  isServicoSelecionado: boolean = false;
  servicoSelecionado: Servico = Servico.banho;
  
  viewDateCalendario: Date = new Date();
  viewCalendario: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  isDataSelecionada: boolean = false;

  eventosCalendario: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Primeiro Evento'
    },
    {
      start: startOfDay(new Date()),
      title: 'Segundo Evento'
    }
  ]

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
    console.log(date);
  }
}
