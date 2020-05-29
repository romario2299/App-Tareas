import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { TareasComponent } from './pages/tareas/tareas.component';
import { AuthGuard } from './services/auth.guard';
import { ModalComponent } from './components/modal/modal.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'tareas1', component: TareasComponent, canActivate : [AuthGuard] },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
