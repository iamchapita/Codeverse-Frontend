import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	standalone: true,
	selector: 'app-create-new-action-modal',
	templateUrl: './create-new-action-modal.component.html',
	styleUrls: ['./create-new-action-modal.component.css'],
	imports: [CommonModule],
})
export class CreateNewActionModalComponent {
	inputValue: any = '';
	isValid: boolean = false;

	constructor(public createNewModal: NgbActiveModal) {}

	handleInputChange() {
		this.isValid = true;
	}

	dismiss(reason: string) {
		this.isValid = true;
		this.createNewModal.dismiss(reason);
	}

	close(value: string) {
		const regex =
			/^([a-zA-ZñÑáéíóúÁÉÍÓÚ\d\s_-]+\.?){1,50}[a-zA-ZñÑáéíóúÁÉÍÓÚ\d\s_-]+$/;

		if (regex.test(value) === false) {
			this.isValid = false;
		} else {
			this.inputValue = value;
			this.createNewModal.close(value);
		}
	}
}
