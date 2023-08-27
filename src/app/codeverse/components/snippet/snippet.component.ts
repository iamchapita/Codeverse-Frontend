import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-snippet',
	templateUrl: './snippet.component.html',
	styleUrls: ['./snippet.component.css'],
	standalone: true,
	imports: [CommonModule],
})
export class SnippetComponent {
	nameValue: any = '';
	snippetValue: any = '';
	isValid: boolean = true;

	constructor(public snippetModal: NgbActiveModal) {}

	dismiss(reason: string) {
		this.isValid = true;
		this.snippetModal.dismiss(reason);
	}

	close(value: string) {
		const regex =
			/^([a-zA-ZñÑáéíóúÁÉÍÓÚ\d\s_-]+\.?){1,50}[a-zA-ZñÑáéíóúÁÉÍÓÚ\d\s_-]+$/;

		if (regex.test(value) === false) {
			this.isValid = false;
		} else {
			this.nameValue = value;
			this.snippetModal.close(value);
		}
	}
}
