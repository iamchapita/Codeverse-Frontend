import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FetchService } from 'src/app/services/fetch.service';
import { Snippet } from 'src/models/Snippet.model';

@Component({
	selector: 'app-snippet',
	templateUrl: './snippet.component.html',
	styleUrls: ['./snippet.component.css'],
	standalone: true,
	imports: [CommonModule],
})
export class SnippetComponent implements OnInit {
	nameValue: any = '';
	snippetValue: any = '';
	isNameValid: boolean = false;
	isSnippetValid: boolean = false;

	@Input() snippetId: string = '';

	snippet: Snippet = {
		code: '',
		createdAt: '',
		modifiedAt: '',
		name: '',
		type: '',
		_id: '',
	};

	constructor(
		public snippetModal: NgbActiveModal,
		private fetchService: FetchService
	) {}

	ngOnInit(): void {
		this.loadSnippet();
	}

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

	async loadSnippet() {
		await this.fetchService
			.makeRequest(`snippets/${this.snippetId}`, 'GET', null)
			.then((response) => {
				this.snippet = { ...response };
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
