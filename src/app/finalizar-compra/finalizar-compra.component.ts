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
    if (!AreaUsuarioHandler.isUserLogado()) {
      this.router.navigate(['/registrar']);
    }
  }
}
