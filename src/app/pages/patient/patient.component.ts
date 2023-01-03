import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni', 'actions'];
  dataSource: MatTableDataSource<Patient>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  totalElements: number;

  constructor(
    private snackBar: MatSnackBar,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.patientService.patientChange.subscribe(data => {
      this.createTable(data);
    });

    this.patientService.getMessageChange().subscribe(data => {
      this.snackBar.open(data, 'INFO', {duration: 2000});
    });

    this.patientService.listPageable(0, 3).subscribe(data => {
      this.createTable(data);
    })

    // this.patientService.findAll().subscribe(data => {
    //   this.createTable(data);
    // });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  delete(idPatient: number){
    this.patientService.delete(idPatient).pipe(switchMap(()=>{
      return this.patientService.findAll();
    })).subscribe(data => {
      this.patientService.patientChange.next(data);
      this.patientService.setMessageChange('DELETED!');
    });
  }

  createTable(patients: any){ //  Patient[]
    this.dataSource = new MatTableDataSource(patients.content); // patients
    this.totalElements = patients.totalElements;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  showMore(e: any){
    this.patientService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.createTable(data);
    })
  }

}
