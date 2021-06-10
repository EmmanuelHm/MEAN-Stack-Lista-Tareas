import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../service/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  createTask = {
    name: "",
    description: ""
  }
  selectedFile: File = null

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    this.selectedFile = <File>event.target.files[0]
  }

  createUploadImage(){
    const fd = new FormData()
    fd.append('image', this.selectedFile, this.selectedFile.name)
    fd.append('name', this.createTask.name)
    fd.append('description', this.createTask.description)

    this.taskService.createImageUpload(fd)
      .subscribe(
        res => {
          console.log(res)
          this.snackBar.open('Nueva Tarea Creada', null, {
            duration: 3000
          })
          this.router.navigate(['/tasks'])
        },
        err => {
          console.log(err)
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.snackBar.open('No hay Sesión... Enviando a Login', null, {
                duration: 2000
              })
              this.router.navigate(['/login'])
            }
          }
        }
      )
  }

  create(){
    this.taskService.createTask(this.createTask)
      .subscribe(
        res => {
          console.log(res)
          this.snackBar.open('Nueva Tarea Creada', null, {
            duration: 3000
          })
          this.router.navigate(['/tasks'])
        },
        err => {
          console.log(err)
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.snackBar.open('No hay Sesión... Enviando a Login', null, {
                duration: 2000
              })
              this.router.navigate(['/login'])
            }
          }
        }
      )
  }
}
