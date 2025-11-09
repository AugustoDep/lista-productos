import { Routes } from '@angular/router';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { AboutComponent } from './components/about.component/about.component';
import { MainComponent } from './components/main.component/main.component';

export const routes: Routes = [
    { 
        path: '', 
        component: MainComponent,
        children: [
            { path: 'productos', component: ProductsTableComponent},
            { path: 'acercade', component: AboutComponent},
            { path: '', redirectTo: 'productos', pathMatch: 'full' }
        ]
    },
];
