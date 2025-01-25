import { Component } from '@angular/core';
import { AceEditorComponent } from '../ace-editor/ace-editor.component';

@Component({
  selector: 'app-playground',
  imports: [AceEditorComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent {

}
