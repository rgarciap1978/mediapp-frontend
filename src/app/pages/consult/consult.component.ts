import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Consult } from 'src/app/model/consult';
import { ConsultDetail } from 'src/app/model/consultDetail';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import * as moment from 'moment';
import { ConsultService } from 'src/app/service/consult.service';
import { ConsultListExamDTO } from 'src/app/dto/ConsultListExamDTO';

//import { consultListExamDTOI } from 'src/app/dto/consultListExamDTOI';


/*interface consultListExamDTO{
  consult: Consult;
  lstExam: Exam[];
}*/

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {

  patients$: Observable<Patient[]>;
  medics$: Observable<Medic[]>;
  exams$: Observable<Exam[]>;
  specialties$: Observable<Specialty[]>

  idPatientSelected: number;
  idMedicSelected: number;
  idExamSelected: number;
  idSpecialtySelected: number;

  maxDate: Date = new Date();
  dateSelected: Date;

  diagnosis: string;
  treatment: string;
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private examService: ExamService,
    private specialtyService: SpecialtyService,
    private consultService: ConsultService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPatients();
    this.getMedics();
    this.getExams();
    this.getSpecialties();
  }

  getPatients(){
    this.patients$ = this.patientService.findAll();
  }

  getMedics(){
    this.medics$ = this.medicService.findAll();
  }

  getExams(){
    this.exams$ = this.examService.findAll();
  }

  getSpecialties(){
    this.specialties$ = this.specialtyService.findAll();
  }

  addDetail(){
    let det = new ConsultDetail();
    det.diagnosis = this.diagnosis;
    det.treatment = this.treatment;

    this.details.push(det);
  }

  removeDetail(index: number){
    this.details.splice(index, 1);
  }

  addExam(){
    if(this.idExamSelected > 0){

      this.examService.findById(this.idExamSelected).subscribe(data => {
        this.examsSelected.push(data);
      })

    }else{
      this.snackBar.open('Please select an examn', 'INFO', {duration: 2000});
    }
  }

  save(){
    let patient = new Patient();
    patient.idPatient = this.idPatientSelected;

    let medic = new Medic();
    medic.idMedic = this.idMedicSelected;

    let specialty = new Specialty();
    specialty.idSpecialty = this.idSpecialtySelected;

    let consult = new Consult();
    consult.patient = patient;
    consult.medic = medic;
    consult.specialty = specialty;
    consult.numConsult = "c1";
    consult.details = this.details;

    /*let tzoffset = (new Date()).getTimezoneOffset() * 6000;
    let localISOTime = (new Date(this.dateSelected.getTime() - tzoffset)).toISOString();*/
    consult.consultDate = moment(this.dateSelected).format('YYYY-MM-DDTHH:mm:ss');

    /*let dto: consultListExamDTOI = {
      consult: consult,
      lstExam: this.examsSelected
    }*/

    let dto = new ConsultListExamDTO();
    dto.consult= consult;
    dto.lstExam = this.examsSelected;

    this.consultService.saveTransactional(dto).subscribe(() => {
      this.snackBar.open('SUCCESSFULL', 'INFO', {duration: 2000});

      setTimeout(()=>{
        this.cleanControls();
      }, 2000);

    });
  }

  cleanControls(){
    this.idExamSelected = 0;
    this.idPatientSelected = 0;
    this.idSpecialtySelected = 0;
    this.idMedicSelected = 0;
    this.dateSelected = new Date();
    this.diagnosis = null;
    this.treatment = null;
    this.details = [];
    this.examsSelected = []

  }

}
