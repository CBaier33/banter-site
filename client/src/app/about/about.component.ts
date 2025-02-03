import { Component } from '@angular/core';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-about',
  imports: [CodeBlockComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  code = "this is a test"
}
