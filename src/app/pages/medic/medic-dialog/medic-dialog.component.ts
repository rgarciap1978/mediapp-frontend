import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Medic } from 'src/app/model/medic';
import { MedicService } from 'src/app/service/medic.service';

@Component({
  selector: 'app-medic-dialog',
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css']
})
export class MedicDialogComponent implements OnInit {

  medic: Medic;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private dialogRef: MatDialogRef<MedicDialogComponent>,
    private medicService: MedicService
  ) { }

  ngOnInit(): void {
    this.medic = { ...this.data };
  }

  operate(){
    if(this.medic != null && this.medic.idMedic > 0){
      // UPDATE
      this.medicService.update(this.medic).pipe(switchMap(() => {
        return this.medicService.findAll();
      })).subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('UPDATED!');
      });
    }
    else{
      // CREATE
      this.medicService.save(this.medic).pipe(switchMap(() => {
        return this.medicService.findAll();
      })).subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('CREATED!');
      });
    }
    this.close();
  }

  close(){
    this.dialogRef.close();
  }

}
