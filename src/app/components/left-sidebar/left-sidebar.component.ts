import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {

  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

toggleCollapse(): void {
  this.collapsedChange.emit(!this.collapsed);
}

closeSidenav(): void {
  this.collapsedChange.emit(true);
}


  items = [
  {
    routelink: ['/productos'],
    icon: 'fal fa-box-open',
    label: 'Productos'
  }, 
  {
    routelink: ['/acercade'],
    icon: 'fal fa-user',
    label: 'Acerca De'
  }  
  ]; 
}
