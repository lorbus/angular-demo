import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {CoursesStore} from '../service/courses.store';
import {Router} from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  intermediateCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private readonly coursesStore: CoursesStore,
    private readonly router: Router,
  ) {

  }

  ngOnInit() {
    const user = localStorage.getItem("auth_data");

    if (!user) {
      this.router.navigateByUrl("/login");
    }

    this.reloadCourses();
  }

  reloadCourses() {
    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");

    this.intermediateCourses$ = this.coursesStore.filterByCategory("INTERMEDIATE");

    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");
  }

}
