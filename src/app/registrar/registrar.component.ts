import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AreaUsuarioService } from '../area-usuario.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup('');
  enviado: boolean = false;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      uname: ['', [Validators.required, Validators.maxLength(32)]],
      rname: ['', [Validators.required, Validators.maxLength(64)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.maxLength(32)]],
      senhaConf: ['', [Validators.required, Validators.maxLength(32)]]
    });
  }

  registrar() {
    this.enviado = true;
    if (this.form.valid) {
      const uname = this.form.get('uname')?.value;
      const rname = this.form.get('rname')?.value;
      const email = this.form.get('email')?.value;
      const senha = this.form.get('senha')?.value;
      const senhaConf = this.form.get('senhaConf')?.value;

      if (senhaConf !== senha) {
        this.markAllControlsAsDirty(Object.values(this.form.controls));
        // this.form.controls['senhaConf'].markAsDirty({onlySelf: true});
      } else {
        alert(`Registrado como "${uname}" (${rname}), com o email "${email}" e senha "${senha}".`);
        AreaUsuarioService.getInformacoesLogin
      }
    } else {
      this.markAllControlsAsDirty(Object.values(this.form.controls));
    }
  }

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
