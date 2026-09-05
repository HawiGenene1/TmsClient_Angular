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
  updateEntity,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, concatMap, tap, catchError, EMPTY } from 'rxjs';
import { EnrollmentService } from '../services/enrollment.service';
import { Enrollment } from '../models/enrollment.model';

export const EnrollmentStore = signalStore(
  { providedIn: 'root' },

  // withState adds simple properties alongside the entity collection
  withState({
    isLoading: false,
    error: null as string | null,
  }),

  // withEntities creates an O(1) ID-indexed dictionary for the enrollment collection
  withEntities<Enrollment>(),

  // withComputed creates read-only derived signals
  withComputed((store) => ({
    pendingCount: computed(() =>
      store.entities().filter((e) => e.status === 'Pending').length
    ),
    approvedCount: computed(() =>
      store.entities().filter((e) => e.status === 'Approved').length
    ),
    rejectedCount: computed(() =>
      store.entities().filter((e) => e.status === 'Rejected').length
    ),
  })),

  // withMethods defines the actions that can modify state
  withMethods((store, api = inject(EnrollmentService)) => ({
    // Load all enrollments
    loadEnrollments: rxMethod<void>(
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
                error: err.message || 'Failed to load enrollments',
              });
              return EMPTY;
            })
          )
        )
      )
    ),

    // Optimistic Approve
    approveEnrollment: rxMethod<string>(
      pipe(
        tap((id) => {
          // Optimistic update - UI reacts before network round-trip completes
          patchState(
            store,
            updateEntity({ id, changes: { status: 'Approved' } })
          );
        }),
        concatMap((id) =>
          api.approve(id).pipe(
            catchError((err) => {
              // Server said no - restore previous state
              patchState(
                store,
                updateEntity({ id, changes: { status: 'Pending' } })
              );
              patchState(store, {
                error: 'Server rejected the approval. Check enrollment constraints.',
              });
              return EMPTY;
            })
          )
        )
      )
    ),
  }))
);