import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  public tasks = []

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.taskService.getTasks()
        .subscribe(
          res => this.tasks = res,
          err => console.log(err)
        )
  }

  changeStatus(selectTask, status){
    const temporalStatus = selectTask.changeStatus
    selectTask.status = status

    this.taskService.editTask(selectTask)
      .subscribe(
        res => {
          selectTask.status = status
        },
        err => {
          console.log(err)
          selectTask.status = temporalStatus
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

  delete(task){
    this.taskService.deleteTask(task)
      .subscribe(
        res => {
          const index = this.tasks.indexOf(task)
          if(index > -1){
            this.tasks.splice(index, 1)
            this.snackBar.open('Tarea Borrada con Exito',null, {
              duration: 5000
            })
          }
        },
        err => {
          console.log(err)
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.snackBar.open('No hay Sesión', null, {
                duration: 2000
              })
              this.router.navigate(['/login'])
            }
          }
        }
      )
  }

}
