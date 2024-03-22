import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamentoHandler, Servico, Porte } from '../agendamento';
import { AreaUsuarioHandler } from '../area-usuario';

@Component({
  selector: 'app-finalizar-compra',
  standalone: true,
  imports: [],
  templateUrl: './finalizar-compra.component.html',
  styleUrl: './finalizar-compra.component.css'
})
export class FinalizarCompraComponent {
  constructor(private router: Router) {
    this.verificaLogin();
  }

  private verificaLogin(): void {
    if (!AreaUsuarioHandler.isUserLogado()) {
      let info = AreaUsuarioHandler.getInformacoes();
      info[0]['retorno'][0] = true;
      info[0]['retorno'][1] = '/finalizar-compra';
      this.router.navigate(['/registrar']);
    }
  }
}
