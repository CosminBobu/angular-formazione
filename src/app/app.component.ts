import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('home') home: TemplateRef<HTMLElement>;
  display: boolean = true;

  constructor(private location: Location) {}
  ngOnInit(): void {
    this.location.onUrlChange((url) => {
      if (url === '/') {
        this.display = true;
      } else {
        this.display = false;
      }
    });
  }
}
