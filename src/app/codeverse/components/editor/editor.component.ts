
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
	faChevronUp = faChevronUp;
	@Input() file: string = 'projectWorkspace.html';
	@Input() code: string = '';
	@Output() foldEvent: EventEmitter<void> = new EventEmitter<void>();
	@Output() codeValueChange: EventEmitter<string> =
		new EventEmitter<string>();

	textareaValueChange(): void {
		this.codeValueChange.emit(this.code);
	}
}
