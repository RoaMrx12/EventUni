import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  activeTab: string = 'home';

  showTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
