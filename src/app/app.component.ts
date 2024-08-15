import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import data from "../data.json";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, NgFor, CommonModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.less",
})
export class AppComponent {
	numbers = data.numbers.map((e) => e);
}
