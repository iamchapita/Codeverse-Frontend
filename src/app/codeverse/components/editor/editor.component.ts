import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
	faChevronUp,
	faFloppyDisk,
	faDownload,
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
	faChevronUp = faChevronUp;
	faFloppyDisk = faFloppyDisk;
	faDownload = faDownload;
	@Input() file: string = 'projectWorkspace.html';
	@Input() code: string = '';
	@Output() foldEvent: EventEmitter<void> = new EventEmitter<void>();
	@Output() codeValueChange: EventEmitter<string> =
		new EventEmitter<string>();
	@Output() saveEvent: EventEmitter<void> = new EventEmitter<void>();
	@Output() download: EventEmitter<void> = new EventEmitter<void>();

	textareaValueChange(): void {
		this.codeValueChange.emit(this.code);
	}

	handleTabKey(event: KeyboardEvent): void {
		if (event.key === 'Tab') {
			event.preventDefault(); // Evita el comportamiento por defecto del tabulador

			const textArea = event.target as HTMLTextAreaElement;
			const start = textArea.selectionStart;
			const end = textArea.selectionEnd;

			// Inserta un carácter de tabulación en la posición actual
			this.code =
				this.code.substring(0, start) + '\t' + this.code.substring(end);

			// Ajusta la posición de la selección
			textArea.selectionStart = textArea.selectionEnd = start + 1;
		}
	}
}
