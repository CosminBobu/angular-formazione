import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() homeTemplate: TemplateRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {}
}
