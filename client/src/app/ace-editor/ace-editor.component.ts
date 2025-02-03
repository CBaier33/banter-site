import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';

// Configure ace to use the correct worker paths
ace.config.set('basePath', '/assets/ace-builds/');
ace.config.set('workerPath', '/assets/ace-builds/');

@Component({
  selector: 'app-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css']
})
export class AceEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  editor: ace.Editor | undefined;
  //editorValue: string = '';

  @Input() editorValue: string = ''; // Default content
  @Input() readonly: boolean = false; // Default to readonly
  @Input() darkMode: boolean = false; // Default to readonly


  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const editorContainer = this.elementRef.nativeElement.querySelector('#editor');
    this.editor = ace.edit(editorContainer);
    this.editor.setTheme('ace/theme/ambiance');
    this.editor.session.setMode('ace/mode/banter');
    this.editor.setOptions({
      fontSize: "16px",
      readOnly: this.readonly,
      highlightActiveLine: true,
      highlightSelectedWord: true,

    })
    this.editor.setValue(this.editorValue, -1);

    this.editor.on('change', () => {
      this.editorValue = this.editor!.getValue();
    });
    setTimeout(() => {
      if (this.editor)
        this.editor.resize(); // Recalculate layout
    }, 100); // Give it a slight delay
  }

  getEditorContent(): string {
    return this.editorValue;
  }

  setEditorContent(output: string): void {
    if (this.editor){
      this.editor.setValue(output);
      this.editor.clearSelection();
    }
  }

  updateTheme(): void {
    if (this.editor){
      const theme = this.darkMode ? 'ace/theme/tomorrow_night_eighties' : 'ace/theme/textmate';
      this.editor.setTheme(theme);
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }
}

