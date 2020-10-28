import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'songList',
        loadChildren: () => import('../song-list/song-list.module').then(m => m.SongListPageModule)
      },
      {
        path: '',
        redirectTo: '/songList',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/songList',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
