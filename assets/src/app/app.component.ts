import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tabs = [];
  activeTab;
  selected = new FormControl(0);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'baseline-add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/baseline-add-24px.svg'));
  }

  addTab() {
    this.tabs.push('New');

    this.selected.setValue(this.tabs.length - 1);

    this.activeTab = this.tabs[this.tabs.length - 1];

    console.log(this.tabs.length - 1);
  }
}
