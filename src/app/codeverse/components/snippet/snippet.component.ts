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
	isNameValid: boolean = true;
	isSnippetValid: boolean = true;

	constructor(public snippetModal: NgbActiveModal) {}

	handleTabKey(event: KeyboardEvent): void {
		if (event.key === 'Tab') {
			event.preventDefault(); // Evita el comportamiento por defecto del tabulador

			const textArea = event.target as HTMLTextAreaElement;
			const start = textArea.selectionStart;
			const end = textArea.selectionEnd;

			// Inserta un carácter de tabulación en la posición actual
			this.snippetValue =
				this.snippetValue.substring(0, start) +
				'\t' +
				this.snippetValue.substring(end);

			// Ajusta la posición de la selección
			textArea.selectionStart = textArea.selectionEnd = start + 1;
		}
	}

	handleInputChange() {
		this.isNameValid = true;
		this.isSnippetValid = true;
	}

	dismiss(reason: string) {
		this.isNameValid = true;
		this.isSnippetValid = true;
		this.snippetModal.dismiss(reason);
	}

	close(name: string, value: string) {
		const regex =
			/^([a-zA-ZñÑáéíóúÁÉÍÓÚ\d\s_-]+\.?){1,50}[a-zA-ZñÑáéíóúÁÉÍÓÚ\d\s_-]+$/;

		if (regex.test(name) === false) {
			this.isNameValid = false;
		}
		if (value === '') {
			this.isSnippetValid = false;
		}
		if (this.isSnippetValid === true && this.isNameValid === true) {
			this.nameValue = name;
			this.snippetValue = value;
			this.snippetModal.close({ name: name, value: value });
		}
	}
}
