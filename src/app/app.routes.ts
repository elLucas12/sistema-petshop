import { Routes } from '@angular/router';
import { LojaComponent } from './loja/loja.component';
import { ServicosComponent } from './servicos/servicos.component';
import { SobreComponent } from './sobre/sobre.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LicenseComponent } from './license/license.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';

export const routes: Routes = [
    {
        path: '',
        component: PaginaInicialComponent
    },
    {
        path: 'loja',
        component: LojaComponent
    },
    {
        path: 'servicos',
        component: ServicosComponent
    },
    {
        path: 'sobre',
        component: SobreComponent
    },
    {
        path: 'license',
        component: LicenseComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registrar',
        component: RegistrarComponent
    }
];
