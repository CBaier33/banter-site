import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-code-block',
  imports: [Highlight],
  template: `
<pre><code [highlight]="code" lineNumbers language="html"></code></pre>
`,
  styleUrl: './code-block.component.css'
})
export class CodeBlockComponent {
  code = `
<h1>this is not a test</h1>
`

}
