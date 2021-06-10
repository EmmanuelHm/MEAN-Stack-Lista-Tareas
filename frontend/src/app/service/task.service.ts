import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskURL = 'http://localhost:3030/api/task'
  private listTaskURL = 'http://localhost:3030/api/task/list'
  private taskImageUploadURL = 'http://localhost:3030/api/task/upload'

  constructor(
    private http: HttpClient
  ) { }

  createImageUpload(task){
    return this.http.post<any>(this.taskImageUploadURL, task)
  }

  createTask(task){
    return this.http.post<any>(this.taskURL, task)
  }

  getTasks(){
    return this.http.get<any>(this.listTaskURL)
  }

  editTask(task){
    return this.http.put<any>(this.taskURL, task)
  }

  deleteTask(task){
    const _id = task._id
    const url = `${this.taskURL}/${_id}`
    return this.http.delete<any>(url)
  }
}
