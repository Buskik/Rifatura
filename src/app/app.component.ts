import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import data from "../data.json";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.less",
})
export class AppComponent {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	numbers = data.numbers.map((e) => e).sort((a: any, b: any) => a.id - b.id);
	filteredNum = signal(this.numbers);
	filterNum(
		input: HTMLInputElement,
		checkbox: HTMLInputElement,
		select: HTMLSelectElement,
	) {
		if (checkbox.checked) {
			this.filteredNum.set(this.filteredNum().filter((e) => e.owner !== ""));
		} else {
			this.filteredNum.set(this.numbers);
		}
		if (select.value === "asc") {
			this.filteredNum.set(
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				this.filteredNum().sort((a: any, b: any) => a.id - b.id),
			);
		} else if (select.value === "desc") {
			this.filteredNum.set(
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				this.filteredNum().sort((a: any, b: any) => b.id - a.id),
			);
		}

		this.filteredNum.set(
			this.filteredNum().filter((e) => e.id.includes(input.value)),
		);
	}
}
