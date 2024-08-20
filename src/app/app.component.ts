import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LogoComponent } from "./components/logo/logo.component";
import { NavLinksComponent } from "./components/nav-links/nav-links.component";
import { SidePanelComponent } from "./components/side-panel/side-panel.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, NavLinksComponent, LogoComponent, SidePanelComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.less",
})
export class AppComponent {
	getData() {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const data: Array<any> = [];
		for (let i = 1; i < 501; i++) {
			const num = {
				id: i.toString(),
				owner: "",
			};
			if (i % Math.floor(Math.random() * 10) === 0) {
				num.owner = "Buskik";
			}
			data.push(num);
		}
		return data;
	}
	data = this.getData();

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	numbers = this.data.map((e) => e).sort((a: any, b: any) => a.id - b.id);
	filteredNum = signal(this.numbers);
	filterNum(
		input: HTMLInputElement,
		checkbox: HTMLInputElement,
		select: HTMLSelectElement,
	) {
		//Filter to only available numbers if checkbox checked
		if (checkbox.checked) {
			this.filteredNum.set(this.filteredNum().filter((e) => !e.owner));
		} else {
			this.filteredNum.set(this.numbers);
		}

		// Sort ascending or descending by selectionn
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

		//Filter numbers by search
		this.filteredNum.set(
			this.filteredNum().filter((e) => e.id.includes(input.value)),
		);
	}
}
