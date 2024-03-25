import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarView, CalendarEvent, CalendarModule } from 'angular-calendar';
import { ActivatedRoute, Router } from '@angular/router';

import { AgendamentoHandler, Servico, Porte } from '../agendamento';

/**
 * Componente da página de seleção e agendamento rápido de serviços do petshop.
 * 
 * Realiza a manipulação da página através de atributos de objeto e do CommonModule
 * dentro do template HTML. Para a administração dos dados de agendamento, o objeto
 * utiliza o AgendamentoHandler.
 */
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
export class ServicosComponent implements OnInit {
  /** String de locale para especificar o formato de calendário. */
  locale: string = 'pt-BR';

  /** Armazena se o porte do pet já foi selecionado pelo usuário. */
  isPorteSelecionado: boolean = false;

  /** Armazena o porte do pet através do enum 'Porte' */
  porteSelecionado: Porte = Porte.pequeno;

  /** Armazena se o tipo de serviço já foi selecionado pelo usuário. */
  isServicoSelecionado: boolean = false;

  /** Armazena o tipo de serviço através do enum 'Servico'. */
  servicoSelecionado: Servico = Servico.banho;
  
  /** Date utilizado utilizado como view para construção do calendário. */
  viewDateCalendario: Date = new Date();

  /** Especificação do tipo de visualização apresentada para o usuário. */
  viewCalendario: CalendarView = CalendarView.Month;

  /** Armazenamento private do enum de calendário. */
  CalendarView = CalendarView;

  /** Armazena se a data de agendamento já foi selecionada. */
  isDataSelecionada: boolean = false;

  /**
   * Armazena os atributos necessários e inicializa os dados de objeto.
   * 
   * @param {Router} router Obj. utilizado para roteamento dentro do sistema.
   */
  constructor(private router: Router, private route: ActivatedRoute) { }

  /**
   * Verifica os parametros passados pela url e ajusta os atributos de página
   * para o respectivo tipo de serviço para facilitar o acesso direto.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      if (parseInt(tipo) === Servico.banho) {
        this.isServicoSelecionado = true;
        this.servicoSelecionado = Servico.banho;
      } else if (parseInt(tipo) === Servico.tosa) {
        this.isServicoSelecionado = true;
        this.servicoSelecionado = Servico.tosa;
      } else {
        console.error('Parametro de tipo de serviço para serviços inválido!');
      }
    });
  }

  /** Armazena os eventos de calendário - PADRAO: nenhum */
  eventosCalendario: CalendarEvent[] = [];

  /**
   * Define o porte do pet dentro do objeto.
   * 
   * @param {Porte} porte Porte do pet do usuário.
   */
  selecaoPorte(porte: Porte): void {
    this.isPorteSelecionado = true;
    this.porteSelecionado = porte;
  }

  /**
   * Define o serviço desejado pelo usuário e armazena dentro do objeto.
   * 
   * @param {Servico} servico Serviço a ser utilizado pelo usuário.
   */
  selecaoServico(servico: Servico): void {
    this.isServicoSelecionado = true;
    this.servicoSelecionado = servico;
  }

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
    let val = confirm(`Confirmar agendamento para ${date.toLocaleDateString()}?`);
    if (val) {
      // Redefinindo dados de agendamento no localStorage
      let agendamento = {
        data_agendamento: date.toUTCString(),
        servico: this.servicoSelecionado,
        porte: this.porteSelecionado,
      };
      AgendamentoHandler.setInformacoes(agendamento);

      console.log(`Definida data de agenda: "${date.toLocaleDateString()}"`);
      this.router.navigate(['/finalizar-compra']);
    }
  }
}
