import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CourseComponent} from './course/course.component';
import {LoginComponent} from './login/login.component';
import {SearchLessonsComponent} from './search-lessons/search-lessons.component';
import {courseResolver} from "./service/course.resolver";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:"search-lessons",
    component: SearchLessonsComponent
  },
  {
    path: 'courses/:id',
    component: CourseComponent,
    resolve: {
      course: courseResolver
    }
  },
  {
    path: '**',
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})

export class AppRoutingModule {

}
