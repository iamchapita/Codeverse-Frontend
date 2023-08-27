import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-snippet-detail-modal',
	templateUrl: './snippet-detail-modal.component.html',
	styleUrls: ['./snippet-detail-modal.component.css'],
	standalone: true,
	imports: [CommonModule],
})
export class SnippetDetailModalComponent {
	constructor(public snippetModal: NgbActiveModal) {}

	dismiss(reason: string) {
		this.snippetModal.dismiss(reason);
	}
}
