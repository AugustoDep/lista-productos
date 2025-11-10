import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { LeftSidebarComponent } from "./components/left-sidebar/left-sidebar.component";
import { MainComponent } from './components/main/main.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [LeftSidebarComponent, MainComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  private platformId = inject(PLATFORM_ID);

  collapsed = false;
  private autoCollapsedByViewport = false;

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateSidebarForWidth(window.innerWidth);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateSidebarForWidth(window.innerWidth);
    }

  }

  setSidebarCollapsed(value: boolean) {
    this.collapsed = value;
    this.autoCollapsedByViewport = false;
  }

  private updateSidebarForWidth(width: number) {
    if (width < 768) {
      this.collapsed = true;
      this.autoCollapsedByViewport = true;
      return;
    }

    if (this.autoCollapsedByViewport) {
      this.collapsed = false;
    }

    this.autoCollapsedByViewport = false;
  }
}
