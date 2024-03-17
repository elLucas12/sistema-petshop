import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup('');
  enviado: boolean = false;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.maxLength(32)]],
      senha: ['', [Validators.required, Validators.maxLength(32)]]
    });
  }

  entrar() {
    this.enviado = true;
    if (this.form.valid) {
      const login = this.form.get('login')?.value;
      const senha = this.form.get('senha')?.value;
      alert(`O login foi ${login} com a senha ${senha}.`);
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
