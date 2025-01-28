import { Component } from '@angular/core';
import { AceEditorComponent } from '../ace-editor/ace-editor.component';
import { BanterProcessorService } from '../services/banter-processor.service'

@Component({
  selector: 'app-playground',
  imports: [AceEditorComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent {

  inputText: string = '';
  output: string | null = null;

  constructor(private banterProcessorService: BanterProcessorService) {}

  processBanter(): void {
    this.banterProcessorService.processText(this.inputText).subscribe({
      next: (response) => {
        this.output = response.output;
      },
      error: (error) => {
        console.error('Error processing text:', error);
      },
    });
  }

}
