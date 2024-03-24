import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import infoProdutos from '../../assets/produtos.json';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent implements OnInit {

  /** Caminho para as imagens de produto e seu carousel. */
  srcImagem: string = 'assets/produtos/produto';

  /** Número do produto passado por get. */
  productId: number = 0;

  /** Armazena se os parametros batem com o storage de produtos. */
  isProdutoValido: boolean = true;

  /** Informações do produto */
  info = infoProdutos;

  constructor(private router: Router, private route: ActivatedRoute) { }

  /**
   * Verifica os parametros passados pela url e ajusta os atributos de página
   * para o respectivo produto.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      try {
        if (!id || Number.isNaN(Number(id))) {
          throw Error('ID inválido!!');
        } else {
          // Definindo ID do produto.
          this.productId = Number(id);
          this.srcImagem += id;
        }
      } catch (error) {
        console.error(error);
        this.isProdutoValido = false;
      }
    });
  }
}
