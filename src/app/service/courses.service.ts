import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Course} from '../model/course';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Lesson } from '../model/lesson';

@Injectable({
    providedIn:'root'
})
export class CoursesService {
    constructor(private http: HttpClient) {}

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

    searchLessons(search: string): Observable<Lesson[]> {
      return this.http.get<Lesson[]>('/api/lessons', {
        params: {
            filter: search,
            pageSize: "100",
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

  findLessons(
    courseId:number, sortOrder = 'asc',
    pageNumber = 0, pageSize = 3, sortColumn = 'seqNo'):  Observable<Lesson[]> {

    return this.http.get('/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortColumn', sortColumn)
    }).pipe(
      map(res =>  res["payload"])
    );
  }

}
