import { Component, OnInit } from '@angular/core';
import { AreaUsuarioHandler } from '../area-usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sair',
  standalone: true,
  imports: [],
  templateUrl: './sair.component.html',
  styleUrl: './sair.component.css'
})
export class SairComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    AreaUsuarioHandler.definirPadraoInfo();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
