import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { LojaComponent } from './loja/loja.component';
import { ServicosComponent } from './servicos/servicos.component';
import { SobreComponent } from './sobre/sobre.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LicenseComponent } from './license/license.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { FinalizarCompraComponent } from './finalizar-compra/finalizar-compra.component';
import { ProdutoComponent } from './produto/produto.component';
import { SairComponent } from './sair/sair.component';

import { AreaUsuarioComponent } from './area-usuario/area-usuario.component';
import { HistoricoComponent } from './area-usuario/historico/historico.component';
import { AgendaComponent } from './area-usuario/agenda/agenda.component';
import { CadastroComponent } from './area-usuario/cadastro/cadastro.component';

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
        providers: [importProvidersFrom(CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}))],
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
    },
    {
        path: 'finalizar-compra',
        component: FinalizarCompraComponent
    },
    {
        path: 'produto',
        component: ProdutoComponent
    },
    {
        path: 'area-usuario',
        component: AreaUsuarioComponent,
        children: [
            {
                path: 'historico',
                component: HistoricoComponent
            },
            {
                path: 'agenda',
                providers: [importProvidersFrom(CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}))],
                component: AgendaComponent
            },
            {
                path: 'cadastro',
                component: CadastroComponent
            }
        ]
    },
    {
        path: 'sair',
        component: SairComponent
    }
];
