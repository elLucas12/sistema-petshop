import { Injectable } from '@angular/core';

export enum Servico {
  banho,
  tosa
}

export enum Porte {
  pequeno,
  grande
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private static _storageString: string = 'informacoes-agendamento';

  /**
   * Define o valor do atributo que guarda a data de agendamento.
   * @param {Date} diaAgendamento Objeto 'Date' do dia de agendamento.
   */
  public static setDiaAgendamento(agendamento: Object | null) {
    if (agendamento !== null) {
      localStorage.setItem(this._storageString, JSON.stringify(agendamento));
    } else {
      localStorage.removeItem(this._storageString);
    }
  }

  /**
   * Verifica e atualiza o valor do agendamento conforme o localStorage atual, retornando o valor.
   * @return Dia de agendamento confome armazenamento local.
   */
  public static getDiaAgendamento(): Date {
    let agendamento = JSON.parse(localStorage.getItem(this._storageString) as string);
    let diaAgendamento = new Date(Date.parse(agendamento['data']));
    return diaAgendamento;
  }

  /**
   * Retorna as informações armazenadas no atributo de localStorage do browser sobre o agendamento.
   * @returns Informações atuais de agendamento.
   */
  public static getAgendamento(): Object {
    return JSON.parse(localStorage.getItem(this._storageString) as string);
  }
}
