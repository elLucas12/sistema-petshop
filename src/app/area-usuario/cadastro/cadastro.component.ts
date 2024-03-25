import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/** Tipo de cadastro administrado pelo objeto. */
export enum TipoCadastro {
  usuario,
  pet
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {

  /** Armazena o tipo de histórico a ser exibido => ['loja', 'servicos']. */
  tipo: TipoCadastro = TipoCadastro.usuario;
  TipoCadastro = TipoCadastro;

  constructor(private router: Router, private route: ActivatedRoute) { }

  /**
   * Verifica os parametros passados pela url e ajusta os atributos de página
   * para o respectivo tipo de cadastro.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      if (tipo === 'usuario') {
        this.tipo = TipoCadastro.usuario;
      } else if (tipo === 'pet') {
        this.tipo = TipoCadastro.pet;
      } else {
        console.error('Parametro de tipo de cadastro inválido!');
      }
    });
  }
}
