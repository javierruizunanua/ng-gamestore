import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameNewComponent } from './game-new/game-new.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //Aquí van las rutas para navegar
    {path: '', component: HomeComponent},
    {path: 'games/:id/new', component: GameNewComponent},
    {path: 'games/:gameId', component: GameDetailComponent},
    {path: 'games/:id/edit', component: GameEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
