import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {TasksService} from '../../services/tasks/tasks.service';
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  loading: boolean;
  filter: any;
  dialogRef: any;
  form: FormGroup;
  @ViewChild('dialog')
  dialog!: TemplateRef<any>;
  taskId: number | undefined | null;
  total: number;
  pageSize: number;
  search: string;
  page: number;

  constructor(
    private _tasks: TasksService,
    private _dialog: MatDialog,
  ) {
    this.page = 1;
    this.total = 0;
    this.loading = false;
    this.pageSize = 5;
    this.search = '';
    this.dataSource = new MatTableDataSource<any>([]);
    this.displayedColumns = ['description', 'creationDate', 'active', 'actions'];
    this.loading = false;
    this.form = new FormGroup({
      id: new FormControl(null),
      description: new FormControl(null, Validators.required),
      active: new FormControl(true),
      creationDate: new FormControl(null)
  });
   }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.loading = true;
    const {search, page} = this;
    const filter = { search, page };
    let res = this._tasks.getList(filter);
    this.dataSource.data = res.list;
    this.total = res.count;
    this.loading = false;
  }

  openDialog(task?: any) {
    this.form.reset();
    this.form.controls.id.setValue(null);
    this.form.controls.active.setValue(true);
    if (task) {
        this.form.patchValue(task);
    }
    this.dialogRef = this._dialog.open(this.dialog);
  }

  saveTask() {
    const newTask = this.form.value;
    if(newTask.id) {
      this._tasks.update(newTask);
    } else {
      newTask.creationDate = new Date();
      this._tasks.create(newTask);
    }
    this.dialogRef.close();
    this.getTasks();
  }

  deleteTask(id: number) {
    var r = window.confirm("Esta seguro que desea borrar la tarea?");
    if (r) {
      this._tasks.delete(id);
      this.getTasks();
    }
}

}
