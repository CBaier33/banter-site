import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LearnComponent} from './learn/learn.component';
import {PlaygroundComponent} from './playground/playground.component';
import {AboutComponent} from './about/about.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Banter-lang.org',
  },
  {
    path: 'learn',
    component: LearnComponent,
    title: 'Learn Banter',
  },
  {
    path: 'playground',
    component: PlaygroundComponent,
    title: 'Banter Playground',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Banter',
  },
];

export default routeConfig;

