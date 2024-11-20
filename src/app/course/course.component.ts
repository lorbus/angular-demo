import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../model/course";
import {CoursesService} from "../service/courses.service";
import { tap, catchError, finalize} from 'rxjs/operators';
import {merge, throwError} from 'rxjs';
import {Lesson} from '../model/lesson';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../loading/loading.service';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

//import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;

  lessons: Lesson[] = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  activeLesson: Lesson;

  //selection = new SelectionModel<Lesson>(true, []);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly coursesService: CoursesService,
    private readonly router: Router,
    private readonly toast: ToastrService,
    private readonly loading: LoadingService,
  ) {
  }

  displayedColumns = ['seqNo', "description", "duration"]; //'select',

  //expandedLesson: Lesson = null;

  ngOnInit() {
    this.loading.loadingOff();

    const user = localStorage.getItem("auth_data");

    if (!user) {
      this.router.navigateByUrl("/login");
    }

    this.course = this.route.snapshot.data["course"];

    this.loadLessonsPage();
  }

  loadLessonsPage() {
    this.loading.loadingOn();

    this.coursesService.findLessons(
      this.course.id,
      this.sort?.direction ?? "asc",
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 5,
      this.sort?.active ?? "seqNo"
    )
      .pipe(
        tap(lessons => this.lessons = lessons),
        catchError(err => {
          const message = "Error loading lessons";
          this.toast.error(message);

          return throwError(err);
        }),
        finalize(() => this.loading.loadingOff())
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  /*
  onToggleLesson(lesson:Lesson) {
    if (lesson == this.expandedLesson) {
      this.expandedLesson = null;
    } else {
      this.expandedLesson = lesson;
    }
  }

  onLessonToggled(lesson:Lesson) {
    this.selection.toggle(lesson);
  }

  isAllSelected() {
    return this.selection.selected?.length == this.lessons?.length;
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.lessons);
    }
  }
  */

  openLesson(lesson: Lesson) {
    this.activeLesson = lesson;
  }

  onBackToCourses() {
    this.activeLesson = null;
  }

}

