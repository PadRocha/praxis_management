import { Component } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";
import { from } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  greetingMessage = "";

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    from(invoke<string>("greet", { name })).subscribe({
      next: (text) => {
        this.greetingMessage = text;
      },
      error: (err) => {
      },
    });
  }
}
