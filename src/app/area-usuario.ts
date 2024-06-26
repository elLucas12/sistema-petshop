import { sha512 } from 'js-sha512';

/**
 * Armazena e administra os dados atuais do browser (localStorage) e, se for o 
 * caso, de servidores externos.
 * 
 * A partir deste objeto é possível realizar consultas pontais que tenham relação
 * aos dados do usuário por meio das funções estáticas, uma vez que os dados não
 * tenham dependência de hierarquia.
 */
export class AreaUsuarioHandler {

  /** Nome do indíce do localStorage para armazenamento de informações locais. */
  private static _storageString: string = 'informacoes-login';

  /**
   * Armazena as informações de login da área do usuário e retorna o atributo 'logado'.
   * @returns Booleano indicando se o usuário está atualmente logado.
   */
  public static isUserLogado(): boolean {
    let infoLogin = this.getInformacoes();
    if (infoLogin === null) return false;
    return infoLogin[0]['logado'];
  }

  /**
   * Define o valor do atributo que guarda as informações de login atuais.
   * @param {string[]} info Dicionário contendo as informações de login do usuário.
   */
  public static setInformacoes(info: Object | string[]) {
    if (info !== null) {
      localStorage.setItem(this._storageString, JSON.stringify(info));
    } else {
      localStorage.removeItem(this._storageString);
    }
  }

  /**
   * Verifica e atualiza o valor das informações de login conforme o localStorage atual, retornando o valor.
   * @return Informações de login confome armazenamento local.
   */
  public static getInformacoes() {
    let info = JSON.parse(localStorage.getItem(this._storageString) as string);
    return info;
  }

  /**
   * Realiza um login para fins de teste do front-end do sistema web, sem realizar
   * acesso à rede. 
   * 
   * Com o login é possível realizar um redirecionamento para determinada página,
   * conforme especificação de API do projeto. Desse modo, verifica-se o atributo
   * 'retorno' das informações do storage e armazena o valor padrão '/area-usuario'
   * (relativo à página do usuário do sistema).
   * 
   * @param uname Nome de usuário de login
   * @param senha Senha relativa ao nome de usuário.
   */
  public static makeExemploLogin(uname: string, senha: string) {
    let info = this.getInformacoes();
    
    // Informações de login e redirecionamento.
    info[0]['logado'] = true;
    if (!info[0]['retorno'][1]) {
      info[0]['retorno'][0] = true;
      info[0]['retorno'][1] = '';
    }
    
    // Informações de usuário de exemplo.
    info[1]['uname'] = uname;
    info[1]['rname'] = uname + ' Da Silva';
    info[1]['telefone'] = '99984999545';
    info[1]['email'] = uname + '_12@exemplo.com';
    info[1]['senha'] = sha512(senha) as string;

    this.setInformacoes(info);
  }

  /**
   * Realiza um registro de usuário para fins de teste do front-end do sistema web, 
   * sem realizar acesso à rede ou serviço externo.
   * 
   * Após o registro é possível realizar um redirecionamento para determinada página,
   * conforme especificação de API do projeto. Desse modo, verifica-se o atributo
   * 'retorno' das informações do storage e armazena o valor padrão '/' (relativo à 
   * página inicial do sistema).
   * 
   * @param uname Nome de usuário no registro.
   * @param rname Nome real do usuário no registro.
   * @param telefone Número de telefone do usuário.
   * @param email Endereço de e-mail do usuário.
   * @param senha Senha do usuário.
   */
  public static makeExemploRegistro(uname: string, rname: string, telefone: string, email: string, senha: string) {
    let info = this.getInformacoes();
    
    // Informações de login e redirecionamento.
    info[0]['logado'] = true;
    if (!info[0]['retorno'][0]) {
      info[0]['retorno'][0] = true;
      info[0]['retorno'][1] = '';
    }
    
    // Informações de usuário.
    info[1]['uname'] = uname;
    info[1]['rname'] = rname;
    info[1]['telefone'] = telefone;
    info[1]['email'] = email;
    info[1]['senha'] = sha512(senha);

    this.setInformacoes(info);
  }

  /**
   * Realiza um registro de usuário para fins de teste do front-end do sistema web, 
   * sem realizar acesso à rede ou serviço externo.
   * 
   * Após o registro é possível realizar um redirecionamento para determinada página,
   * conforme especificação de API do projeto. Desse modo, verifica-se o atributo
   * 'retorno' das informações do storage e armazena o valor padrão '/' (relativo à 
   * página inicial do sistema).
   * 
   * @param uname Nome de usuário no registro.
   * @param rname Nome real do usuário no registro.
   * @param telefone Número de telefone do usuário.
   * @param email Endereço de e-mail do usuário.
   * @param senha Senha do usuário.
   */
  public static makeExemploRegistroPet(nome: string, nascimento: string, especie: string, raca: string, pelagem: string) {
    let info = this.getInformacoes();
    
    // Informações de login e redirecionamento.
    info[0]['logado'] = true;
    if (!info[0]['retorno'][0]) {
      info[0]['retorno'][0] = true;
      info[0]['retorno'][1] = '';
    }
    
    // Informações de usuário.
    info[2]['nome'] = nome;
    info[2]['nascimento'] = nascimento;
    info[2]['especie'] = especie;
    info[2]['raca'] = raca;
    info[2]['pelagem'] = pelagem;

    this.setInformacoes(info);
  }

  /**
   * Escreve uma estrutura padrão no localStorage para o gerenciamento do frontend do usuário.
   * O tipo Object é escrito aqui para posterior alteração em seus valores, tonando os campos
   * campos fixos.
   */
  public static definirPadraoInfo() {
    let info = [
      {
        logado: false,
        retorno: [false, '']
      },
      {
        uname: '',
        rname: '',
        telefone: '',
        email: '',
        senha: ''
      },
      {
        nome: '',
        nascimento: '',
        especie: '',
        raca: '',
        pelagem: ''
      }
    ];
    this.setInformacoes(info);
  }
}
