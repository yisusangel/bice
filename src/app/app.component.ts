import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bice';
  ngOnInit(): void {
    if(!localStorage.getItem('fullTaskList')) {   
      const initList = [
          {
              id: 1,
              description: 'Tarea 1',
              creationDate: new Date(),
              active: true
          },
          {
              id: 2,
              description: 'Tarea 2',
              creationDate: new Date(),
              active: false
          },
      ];
      localStorage.setItem('fullTaskList', JSON.stringify(initList));
  }
  }
  
}
