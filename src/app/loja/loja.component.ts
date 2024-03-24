import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import infoProdutos from '../../assets/produtos.json';


@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent {

  /** Informações de produtos */
  info = infoProdutos;

  constructor(private router: Router) { }

  /** 
   * Redireciona para determinado produto a partir do ID.
   * @param {number} id Número identificador do produto.
   */
  toProduto(id: number) {
    this.router.navigate(['produto'], { queryParams: { id: id }});
  }
}
