import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecordService } from '../maintenance/record/services/record.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interface/auth.interfaces';
import Swal from 'sweetalert2';
import { DataResult } from '../maintenance/record/interface/record-table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-record',
  templateUrl: './table-record.component.html',
  styleUrls: ['./table-record.component.css']
})
export class TableRecordComponent {

  displayedColumns: string[] = ['amount', 'balance', 'date', 'operationType','operationResponse', 'actions'];
  dataSource: MatTableDataSource<DataResult>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  
  constructor(
    private recordService: RecordService,
    private authService: AuthService,
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.getRecords();
  }

  get user(): User {
    return this.authService.user;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRecords() {

    
    Swal.fire({
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading()
      },
    });

    this.recordService.findAll(this.user.id)
          .subscribe( 
            resp => {
              this.dataSource  = new MatTableDataSource(resp.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              Swal.fire('Loading data completed!', `Total rows: <strong>${ resp.pagination.totalRows }</strong>`, 'success');
            },
            err => {
              console.log(err);
              Swal.fire('Error loading data', `${err.error.message}`, 'error')
            }
          );    
  }

  actionDeleteRecord(row: any) {
    const { operation, date } = row;
    
    Swal.fire({
      title: `Remove Operation`,
      html: `Do you want to remove operation <strong>${operation.type}</strong>, <br />${date}?`,
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Confirm`,
    }).then((result) => {
      if (result.isDenied) {
        this.removeRecord(row);

        this.getRecords();
      }
    })
    
  }

  removeRecord(row: any) {
    const { id, operation, date } = row;
    this.recordService.delete(id)
    .subscribe( 
      resp => {
        Swal.fire('Record deleted!', `Record <strong>${operation.type}</strong> <br />${ date } removed.`, 'success');
      },
      err => {
        console.log(err);
        Swal.fire('Error loading data', `${err.error.message}`, 'error')
      }
    );    
  }


}
