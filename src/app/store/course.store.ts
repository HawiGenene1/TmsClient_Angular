import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  patchState,
  withState,
} from '@ngrx/signals';
import {
  withEntities,
  setAllEntities,
  removeEntity,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, concatMap, tap, catchError, EMPTY } from 'rxjs';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

export const CourseStore = signalStore(
  { providedIn: 'root' },

  withState({
    isLoading: false,
    error: null as string | null,
  }),

  withEntities<Course>(),

  withComputed((store) => ({
    courseCount: computed(() => store.entities().length),
  })),

  withMethods((store, api = inject(CourseService)) => ({
    // Load all courses
    loadCourses: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        concatMap(() =>
          api.getAll().pipe(
            tap((rows) =>
              patchState(store, setAllEntities(rows), { isLoading: false })
            ),
            catchError((err) => {
              patchState(store, {
                isLoading: false,
                error: err.message || 'Failed to load courses',
              });
              return EMPTY;
            })
          )
        )
      )
    ),

    // Optimistic Delete with Rollback
    deleteCourse(id: number) {
      // 1. Take snapshot of current entities BEFORE mutating local state
      const previousSnapshot = store.entities();

      // 2. Instant visual feedback - remove entity immediately from UI
      patchState(store, removeEntity(id));

      // 3. Dispatch API call to backend server
      api.delete(id).pipe(
        catchError((err) => {
          // 4. Server rejected request - restore previous snapshot
          patchState(store, setAllEntities(previousSnapshot));
          patchState(store, {
            error: 'Cannot delete course: active student enrollments exist.',
          });
          return EMPTY;
        })
      ).subscribe();
    },
  }))
);