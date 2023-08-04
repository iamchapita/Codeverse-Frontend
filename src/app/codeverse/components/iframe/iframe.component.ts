import { Component, Input } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-iframe',
	templateUrl: './iframe.component.html',
	styleUrls: ['./iframe.component.css'],
})
export class IframeComponent {
	faChevronUp = faChevronUp;

	@Input() title: string = '';
}
