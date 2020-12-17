import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class TasksService {
    res: any;
    list: any;
    constructor(
        private http: HttpClient
    ) {}

    getStorage() {
        this.list = JSON.parse(localStorage.getItem('fullTaskList') as string) || {};
        this.res =  {
            count: this.list.length,
            list: this.list
        };
    }

    public getList(options: any): any {
        this.getStorage();
        if(options && options.search) {
            const regex = new RegExp(`^${options.search}`, 'i')
            this.list = this.list.filter((t:any) => regex.test(t.description));
            this.res.count = this.list.length;
        }
        if(options && options.page) {
            const pageSize = 5;
            this.list = this.list.slice((options.page-1)*pageSize, options.page*pageSize);
        }
        this.res.list = this.list;
        return this.res;
    }

    public getById(id:number): any {
        this.getStorage();
        return this.list.find((t:any) => (Number(t.id) === Number(id)));
    }

    public create(newTask: any): any {
        this.getStorage();
        let maxId = this.list.length ? Math.max(...this.list.map((task:any) => task.id)) : 1;
        newTask.id = ++maxId;
        this.list.push(newTask);
        localStorage.setItem('fullTaskList', JSON.stringify(this.list));
        return newTask;
    }

    public update(task: any): any {
        this.getStorage();
        for (let i = 0; i < this.list.length; i++) {
            if(Number(this.list[i].id) === Number(task.id)) {
                this.list[i] = task;
                break;
            }
        }
        localStorage.setItem('fullTaskList', JSON.stringify(this.list));
        return task;
    }

    public delete(id: number): any {
        this.getStorage();
        for (let i = 0; i < this.list.length; i++) {
            if(Number(this.list[i].id) === Number(id)) {
                this.list.splice(i,1);
                break;
            }
        }
        localStorage.setItem('fullTaskList', JSON.stringify(this.list));
        this.res.count = this.list.length;
        this.res.list = this.list.slice(0, 10);
        return this.res;
    }

}