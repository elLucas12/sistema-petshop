import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum Servico {
  banho,
  tosa
}

export enum Porte {
  pequeno,
  grande
}

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent {
  isServicoSelecionado: boolean = false;
  servicoSelecionado: Servico = Servico.banho;
  isPorteSelecionado: boolean = false;
  porteSelecionado: Porte = Porte.pequeno;

  selecaoPorte(porte: Porte): void {
    this.isPorteSelecionado = true;
    this.porteSelecionado = porte;
  }

  selecaoServico(servico: Servico): void {
    this.isServicoSelecionado = true;
    this.servicoSelecionado = servico;
  }
}
