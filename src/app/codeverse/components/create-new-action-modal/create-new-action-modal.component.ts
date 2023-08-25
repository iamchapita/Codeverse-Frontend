import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	standalone: true,
	selector: 'app-create-new-action-modal',
	templateUrl: './create-new-action-modal.component.html',
	styleUrls: ['./create-new-action-modal.component.css'],
})
export class CreateNewActionModalComponent {
	inputValue: any;

	constructor(public activeModal: NgbActiveModal) {}

	dismiss(reason: string) {
		this.activeModal.dismiss(reason);
	}

	close(value: string) {
		this.inputValue = value;
		this.activeModal.close(value);
	}
}
