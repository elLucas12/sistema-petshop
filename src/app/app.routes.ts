import { Routes } from '@angular/router';
import { LojaComponent } from './loja/loja.component';
import { ServicosComponent } from './servicos/servicos.component';
import { SobreComponent } from './sobre/sobre.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LicenseComponent } from './license/license.component';

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
    }
];
