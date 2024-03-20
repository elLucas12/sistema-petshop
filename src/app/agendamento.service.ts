import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private static _storageString: string = 'diaAgendamento';

  /**
   * Define o valor do atributo que guarda a data de agendamento.
   * @param {Date} diaAgendamento Objeto 'Date' do dia de agendamento.
   */
  public static setDiaAgendamento(diaAgendamento: Date) {
    if (diaAgendamento !== null) {
      localStorage.setItem(this._storageString, diaAgendamento.toUTCString());
    } else {
      localStorage.removeItem(this._storageString);
    }
  }

  /**
   * Verifica e atualiza o valor do agendamento conforme o localStorage atual, retornando o valor.
   * @return _diaAgendamento Dia de agendamento confome armazenamento local.
   */
  public static getDiaAgendamento(): Date {
    let diaAgendamento = new Date(Date.parse(localStorage.getItem(this._storageString) as string));
    return diaAgendamento;
  }
}
