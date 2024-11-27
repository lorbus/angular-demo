import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Lesson} from '../model/lesson';

@Injectable({
    providedIn:'root'
})
export class CoursesService {
  constructor(private readonly http: HttpClient) {

  }


  searchLessons(search: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: {
          filter: search,
          pageSize: "1000",
      }
    })
    .pipe(
      map(res => res["payload"]),
      shareReplay(),
    );
  }

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`);
  }

  findLessons(
    courseId: number,
    sortOrder: string,
    pageNumber: number,
    pageSize: number,
    sortColumn: string,
  ):  Observable<Lesson[]> {

    return this.http.get('/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('sortOrder', sortOrder)
        .set('sortColumn', sortColumn)
        .set('pageSize', pageSize.toString())
        .set('pageNumber', pageNumber.toString())
    }).pipe(
      map(res => res["payload"]
        .sort((a, b) => compare(a[sortColumn], b[sortColumn], sortOrder === "asc"))
      )
    );
  }

  findAllCourses(): Observable<Course[]> {
    return this.http.get('/api/courses')
      .pipe(
        map(res => res['payload'])
      );
  }

  findAllCourseLessons(courseId:number): Observable<Lesson[]> {
    return this.http.get('/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('pageNumber', "0")
        .set('pageSize', "1000")
    }).pipe(
      map(res =>  res["payload"])
    );
  }

  loadCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`)
      .pipe(
        shareReplay()
      );
  }

  loadAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: {
        pageSize: "10000",
        courseId: courseId.toString(),
      }
    })
      .pipe(
        map(res => res["payload"]),
        shareReplay(),
      );
  }

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses")
      .pipe(
        map(res => res["payload"]),
        shareReplay(),
      );
  }

  saveCourse(courseId: string, changes: Partial<Course>):Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes)
      .pipe(
        shareReplay(),
      );
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

