import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class EconomicsService {

    constructor(
        private http: HttpClient
    ) {}

    public getList(): Observable<any> {
        return this.http.get('https://www.indecon.online/');
    }

}
