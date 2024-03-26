import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendamentoHandler, Servico, Porte } from '../agendamento';
import { AreaUsuarioHandler } from '../area-usuario';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-finalizar-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './finalizar-compra.component.html',
  styleUrl: './finalizar-compra.component.css'
})
export class FinalizarCompraComponent {

  /** Armazena se a compra é de agendamento de serviços. */
  isAgendamento: boolean = true;

  /** Atributo de representação/armazenamento das informações de formulário */
  form: FormGroup = new FormGroup('');

  /** Armazena se o formulário foi ou não enviado pelo usuário */
  enviado: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.verificaLogin();
  }

  /**
   * Verifica o login e, caso não esteja logado, o usuário é
   * redirecionado para a página de registro.
   */
  private verificaLogin(): void {
    if (!AreaUsuarioHandler.isUserLogado()) {
      let info = AreaUsuarioHandler.getInformacoes();
      info[0]['retorno'][0] = true;
      info[0]['retorno'][1] = '/finalizar-compra';
      this.router.navigate(['/registrar']);
    }
  }

  /**
   * Método herdados de OnInit para definição dos operadores de verificação
   * dos dados do formulário de log-in.
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(64)]],
      endereco: ['', [Validators.required, Validators.maxLength(128)]],
      cep: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(8)]],
      complemento: ['', [Validators.maxLength(64)]],
      formaPagamento: ['', [Validators.required, function verificaFormaPagamento(control: AbstractControl) {
        if (control.value === 'Pix' || control.value === 'Boleto' || control.value === 'Cartão de Crédito' || control.value == 'Cartão de Crédito') {
          return null;
        }
        return { 'ErroFormaPagamento': 'Forma de pagamento inválida!' };
      }]]
    });

    // Query Params
    this.route.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      if (tipo === 'agendamento') {
        this.isAgendamento = true;
      } else {
        this.isAgendamento = false;
      } 
    });
  }

  /**
   * Confirma o envio do usuário através de validações e armazena as informações
   * de form no storage.
   */
  completarCompra() {
    this.enviado = true;
    if (this.form.valid) {
      const nome = this.form.get('nome')?.value;
      const endereco = this.form.get('endereco')?.value;
      const cep = this.form.get('cep')?.value;
      const complemento = this.form.get('complemento')?.value;
      const formaPagamento = this.form.get('formaPagamento')?.value;
      confirm(`Realizou um pagamento!\nDados:\n-> ${nome}\n-> ${endereco}\n-> ${cep}\n-> ${formaPagamento}.`);
      AgendamentoHandler.definirPadraoInfo();
      this.router.navigate(['']);
    } else {
      this.markAllControlsAsDirty(Object.values(this.form.controls));
    }
  }

  /**
   * Realiza, recursivamente, a verificação de tipo e, após, marca todos os controls da estrutura
   * passada como inválidos através do método `markAsDirty`.
   * 
   * @param {AbstractControl[]} abstractControls Objeto que armazena os controls dos campos do formulário.
   */
  private markAllControlsAsDirty(abstractControls: AbstractControl[]): void {
    abstractControls.forEach(abstractControl => {
      if (abstractControl instanceof FormControl) {
        (abstractControl as FormControl).markAsDirty({onlySelf: true});
      } else if (abstractControl instanceof FormGroup) {
        this.markAllControlsAsDirty(Object.values((abstractControl as FormGroup).controls));
      } else if (abstractControl instanceof FormArray) {
        this.markAllControlsAsDirty((abstractControl as FormArray).controls);
      }
    });
  }
}
