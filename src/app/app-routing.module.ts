import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionsAndAnswersComponent } from './components/questions-and-answers/questions-and-answers.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  /*{
    path: 'questions-and-answers',
    component: QuestionsAndAnswersComponent,
  },*/
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: true, // Set to false or remove to use PathLocationStrategy (no #)
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
/* leveraging anchor scrolling or https://youtu.be/T9JYMHzGDBw?si=YQEKy52j4bWM_E_w*/
