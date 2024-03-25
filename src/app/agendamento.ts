/** Tipo de serviço. Utilizado para caracterizar a escolha de serviço do usuário */
export enum Servico {
  banho,
  tosa
}

/** Enumeração de porte de pet. Utilizado no registro de pet e na seleção de serviço. */
export enum Porte {
  pequeno,
  grande
}

/**
 * Gerencia e possibilita a consulta de informações relacionadas ao agendamento 
 * de serviços do petshop no storage local ou em servidores externos (se for o caso).
 * 
 * Semelhante ao obj. AreaUsuarioHandler, a partir deste objeto é possível realizar
 * consultas pontais que tenham relação aos dados de agendamento por meio das 
 * funções estáticas, uma vez que os dados não tenham dependência de hierarquia.
 */
export class AgendamentoHandler {

  /** Nome do indíce do localStorage para armazenamento de informações locais. */
  private static _storageString: string = 'informacoes-agendamento';

  /**
   * Define o valor do atributo que guarda a data de agendamento.
   * 
   * @param {Date} agendamento Objeto 'Date' do dia de agendamento.
   */
  public static setInformacoes(agendamento: Object | null) {
    if (agendamento !== null) {
      localStorage.setItem(this._storageString, JSON.stringify(agendamento));
    } else {
      localStorage.removeItem(this._storageString);
    }
  }

  /**
   * Armazena, converte e retorna todas as informações armazenadas no localStorage
   * relacionadas ao agendamento de serviços.
   * 
   * @returns Informações locais atuais de agendamento.
   */
  public static getInformacoes() {
    return JSON.parse(localStorage.getItem(this._storageString) as string);
  }
  
  /**
   * Verifica e atualiza o valor do agendamento conforme o localStorage atual, retornando o valor.
   * 
   * @return Dia de agendamento confome armazenamento local.
   */
  public static getDiaAgendamento(): Date {
    let agendamento = this.getInformacoes();
    return new Date(agendamento['data']);
  }

  /**
   * Escreve uma estrutura padrão no localStorage para o gerenciamento do frontend do usuário.
   * O tipo Object é escrito aqui para posterior alteração em seus valores, tonando os campos
   * campos fixos.
   */
  public static definirPadraoInfo() {
    let info = {
      data: new Date(),
      servico: 0,
      porte: 0
    };
    this.setInformacoes(info);
  }
}
