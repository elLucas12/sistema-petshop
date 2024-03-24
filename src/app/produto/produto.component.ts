import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router, private route: ActivatedRoute) { }

  /**
   * Verifica os parametros passados pela url e ajusta os atributos de página.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      try {
        if (!id || Number.isNaN(Number(id))) {
          throw Error('ID inválido!!');
        } else {
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
