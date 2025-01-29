import { Component, ViewChild } from '@angular/core';
import { AceEditorComponent } from '../ace-editor/ace-editor.component';
import { BanterProcessorService } from '../services/banter-processor.service'

@Component({
  selector: 'app-playground',
  imports: [AceEditorComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent {

  @ViewChild(AceEditorComponent) aceEditorComponent!: AceEditorComponent; // Get the editor instance
  output: string | null = null;

  constructor(private banterProcessorService: BanterProcessorService) {}

  processBanter(): void {
    if (!this.aceEditorComponent) {
      console.error('AceEditorComponent is not initialized');
      return;
    }

    const editorText = this.aceEditorComponent.getEditorContent(); // Get text from Ace Editor
    this.banterProcessorService.processText(editorText).subscribe({
      next: (response) => {
        this.output = response.output;
        console.log(this.output);
      },
      error: (error) => {
        console.error('Error processing text:', error);
      },
    });
  }

  resetEditor(): void {
    if (this.aceEditorComponent) {
      this.aceEditorComponent.setEditorContent("");
      this.output = "";
    }
  }
}
