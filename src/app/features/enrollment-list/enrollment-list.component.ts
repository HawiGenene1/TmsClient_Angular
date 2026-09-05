import {
  Component,
  inject,
  OnInit,
  ViewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { EnrollmentStore } from '../../store/enrollment.store';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.scss',
})
export class EnrollmentListComponent implements OnInit {
  readonly store = inject(EnrollmentStore);

  displayedColumns: string[] = ['studentName', 'courseName', 'status', 'actions'];
  dataSource = new MatTableDataSource<Enrollment>([]);

  @ViewChild(MatSort) set sort(matSort: MatSort | undefined) {
    if (matSort) {
      this.dataSource.sort = matSort;
    }
  }

  @ViewChild(MatPaginator) set paginator(matPaginator: MatPaginator | undefined) {
    if (matPaginator) {
      this.dataSource.paginator = matPaginator;
    }
  }

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.entities();
    });
  }

  ngOnInit(): void {
    this.store.loadEnrollments();
  }

  approve(id: string): void {
    this.store.approveEnrollment(id);
  }
}
