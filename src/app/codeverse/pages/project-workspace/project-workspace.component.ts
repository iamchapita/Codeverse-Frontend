import { Component } from '@angular/core';
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-project-workspace',
  templateUrl: './project-workspace.component.html',
  styleUrls: ['./project-workspace.component.css']
})
export class ProjectWorkspaceComponent {
  faShareNodes = faShareNodes;
  faCode = faCode;

}
