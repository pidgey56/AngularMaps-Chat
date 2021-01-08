import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showMap: boolean;
  location;
  constructor(private tools: ToolsService) {}

  ngOnInit(): void {}

  swapMap() {
    this.showMap = !this.showMap;
  }
}
