import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../service/courses.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'course',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLessonsComponent implements OnInit {

  searchResults$: Observable<Lesson[]>;

  activeLesson: Lesson;

  constructor(
    private readonly coursesService: CoursesService,
    private readonly router: Router,
    private readonly loading: LoadingService,
  ) {

  }

  ngOnInit() {
    const user = localStorage.getItem("auth_data");

    if (!user) {
      this.router.navigateByUrl("/login");
    }
  }

  onSearch(search:string) {
    this.searchResults$  = this.coursesService.searchLessons(search);

    this.loading.showLoaderUntilCompleted(this.searchResults$).subscribe();
  }

  openLesson(lesson:Lesson) {
    this.activeLesson = lesson;
  }

  onBackToSearch() {
    this.activeLesson = null;
  }

}
