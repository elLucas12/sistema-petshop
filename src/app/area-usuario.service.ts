import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreaUsuarioService {
  private static _storageString: string = 'informacoes-usuario';

  /**
   * Armazena as informações de login da área do usuário e retorna o atributo 'logado'.
   * @returns Booleano indicando se o usuário está atualmente logado.
   */
  public static isUserLogado(): boolean {
    let infoLogin = this.getInformacoesLogin();
    return infoLogin[0]['logado'];
  }

  /**
   * Define o valor do atributo que guarda as informações de login atuais.
   * @param {string[]} info Dicionário contendo as informações de login do usuário.
   */
  public static setInformacoesLogin(info: Object | string[]) {
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
  public static getInformacoesLogin() {
    let info = JSON.parse(localStorage.getItem(this._storageString) as string);
    return info;
  }
}
