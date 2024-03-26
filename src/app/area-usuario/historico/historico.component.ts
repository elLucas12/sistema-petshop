import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Servico } from '../../agendamento';

/** Tipo de histórico/organização a ser exibido pela página de histórico. */
export enum TipoHistorico {
  servicos,
  loja
}

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {

  /** Armazena o tipo de histórico a ser exibido => ['loja', 'servicos']. */
  tipo: TipoHistorico = TipoHistorico.servicos;
  TipoHistorico = TipoHistorico;

  /** Tipos de serviço */
  Servico = Servico;

  constructor(private router: Router, private route: ActivatedRoute) { }

  /**
   * Verifica os parametros passados pela url e ajusta os atributos de página
   * para o respectivo tipo de histórico.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      if (tipo === 'servicos') {
        this.tipo = TipoHistorico.servicos;
      } else if (tipo === 'loja') {
        this.tipo = TipoHistorico.loja;
      } else {
        console.error('Parametro de histórico inválido!');
      }
    });
  }
}
