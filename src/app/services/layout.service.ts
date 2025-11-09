// src/app/services/layout.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  updateScreenWidth(width: number) {
    this.screenWidth.set(width);
    this.isLeftSidebarCollapsed.set(width < 768);
  }

  toggleSidebar() {
    this.isLeftSidebarCollapsed.update(v => !v);
  }

  setSidebarCollapsed(value: boolean) {
    this.isLeftSidebarCollapsed.set(value);
  }
}