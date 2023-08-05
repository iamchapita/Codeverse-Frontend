import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser';

@Component({
	selector: 'app-iframe',
	templateUrl: './iframe.component.html',
	styleUrls: ['./iframe.component.css'],
})
export class IframeComponent implements OnChanges {
	faChevronUp = faChevronUp;

	@Input() title: string = '';
	@Input() code: string = '';
	sanitizedCode: SafeHtml = '';

	constructor(private sanitizer: DomSanitizer) {}

	ngOnChanges(changes: SimpleChanges): void {
		if ('code' in changes) {
			this.sanitizedCode = this.sanitizer.bypassSecurityTrustHtml(
				this.code
			);
		}
	}
}
