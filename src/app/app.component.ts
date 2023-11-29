import { Component, OnInit } from "@angular/core";
import { appWindow } from '@tauri-apps/api/window';
import { RouterOutlet } from "@angular/router";
import { ScrollToTopComponent, ToasterComponent } from "@shared/components";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterOutlet, ScrollToTopComponent, ToasterComponent],
})
export class AppComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    await appWindow.maximize();
  }
}
