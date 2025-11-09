import { Component, inject, Input, input, Output, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';


@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {

  private layout = inject(LayoutService);

get isCollapsed() {
  return this.layout.isLeftSidebarCollapsed();
}

toggleCollapse(): void {
  this.layout.setSidebarCollapsed(!this.isCollapsed);
}

closeSidenav(): void {
  this.layout.setSidebarCollapsed(true);
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
