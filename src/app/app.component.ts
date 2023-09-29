import { Component, OnInit } from "@angular/core";
import { appWindow } from '@tauri-apps/api/window';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    await appWindow.maximize();
  }
}
