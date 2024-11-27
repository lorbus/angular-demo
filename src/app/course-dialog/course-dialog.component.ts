import moment from 'moment';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {LoadingService} from '../loading/loading.service';
import {CoursesStore} from '../service/courses.store';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [
    LoadingService,
  ],
})
export class CourseDialogComponent {
  form: FormGroup;

  course: Course;

  originalCourse: Course;

  isDisabled: boolean = true;

  originalReleaseDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) course: Course,
    fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<CourseDialogComponent>,
    private readonly coursesStore: CoursesStore,
    private readonly toast: ToastrService,
  ) {
    this.originalCourse = course;

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releaseDate: [moment(course.releaseDate), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

    this.originalReleaseDate = moment(this.form.value.releaseDate).format('YYYY-MM-DD');
  }

  save() {
    const changes = this.form.value;

    this.coursesStore.saveCourse(this.course.id, changes).subscribe();

    this.dialogRef.close(changes);

    const message = "Course saved successfully";
    this.toast.success(message);
  }

  close() {
    this.dialogRef.close();
  }

  enableOrDisableSaveButton() {
    this.isDisabled = (
      this.originalCourse.description === this.form.value.description
      && this.originalReleaseDate === moment(this.form.value.releaseDate).format('YYYY-MM-DD')
      && this.originalCourse.longDescription === this.form.value.longDescription
      && this.originalCourse.category === this.form.value.category
    );
  }

}
