import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceEditorComponent } from '../ace-editor/ace-editor.component';
import { BanterProcessorService } from '../services/banter-processor.service'

@Component({
  selector: 'app-playground',
  imports: [AceEditorComponent, CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent {

  @ViewChild(AceEditorComponent) aceEditorComponent!: AceEditorComponent; // Get the editor instance
  output: string | null = null;
  loading: boolean = false;

  constructor(private banterProcessorService: BanterProcessorService) {}

  processBanter(): void {
    if (!this.aceEditorComponent) {
      console.error('AceEditorComponent is not initialized');
      return;
    }

    const editorText = this.aceEditorComponent.getEditorContent(); // Get text from Ace Editor
    this.loading = true;

    this.banterProcessorService.processText(editorText).subscribe({
      next: (response) => {
        this.output = response.output.trim();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error processing text:', error);
        this.loading = false;
      },
    });
  }

  resetEditor(): void {
    if (this.aceEditorComponent) {
      this.aceEditorComponent.setEditorContent("");
      this.output = "";
    }
  }

  toggleTheme(): void {
    if (this.aceEditorComponent) {
      this.aceEditorComponent.darkMode = !this.aceEditorComponent.darkMode;
      this.aceEditorComponent.updateTheme();
      }

    const outputBlock = document.getElementById('output-block');
    if (outputBlock) {
      if (this.aceEditorComponent.darkMode) {
        outputBlock.classList.add('dark-output');
        } else {
        outputBlock.classList.remove('dark-output');
        }
      }
    }
  }
