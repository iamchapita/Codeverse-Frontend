import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FetchService } from 'src/app/services/fetch.service';
import { Snippet } from 'src/models/Snippet.model';

@Component({
	selector: 'app-snippet-detail-modal',
	templateUrl: './snippet-detail-modal.component.html',
	styleUrls: ['./snippet-detail-modal.component.css'],
	standalone: true,
	imports: [CommonModule],
})
export class SnippetDetailModalComponent implements OnInit {
	@Input() snippetId: string;

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
		this.fetchService
			.makeRequest(`snippets/${this.snippetId}`, 'GET', null)
			.then((response) => {
				this.snippet = { ...response };
			})
			.catch((error) => {});
	}

	dismiss(reason: string) {
		this.snippetModal.dismiss(reason);
	}
}
