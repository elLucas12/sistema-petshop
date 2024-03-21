import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamentoService, Servico, Porte } from '../agendamento.service';
import { AreaUsuarioService } from '../area-usuario.service';

@Component({
  selector: 'app-finalizar-compra',
  standalone: true,
  imports: [],
  templateUrl: './finalizar-compra.component.html',
  styleUrl: './finalizar-compra.component.css'
})
export class FinalizarCompraComponent {
  constructor(private router: Router) {
    if (!AreaUsuarioService.isUserLogado()) {
      this.router.navigate(['/registrar']);
    }
  }
}
