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
	inputValue: any = "";
	isValid: boolean = true;

	constructor(public activeModal: NgbActiveModal) {}

	dismiss(reason: string) {
		this.isValid = true;
		this.activeModal.dismiss(reason);
	}

	close(value: string) {
		const regex = /^(?!\d+$)[a-zA-ZñÑáéíóúÁÉÍÓÚ\s_-]{1,50}$/;

		if(regex.test(value) === false){
			this.isValid = false;
		} else {
			this.inputValue = value;
			this.activeModal.close(value);
		}
	}
}
