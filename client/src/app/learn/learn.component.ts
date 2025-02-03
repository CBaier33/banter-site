import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { HighlightTextPipe } from '../highlight-text.pipe';


@Component({
  selector: 'app-learn',
  imports:[CommonModule, CodeBlockComponent, HighlightTextPipe],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css'],
})
export class LearnComponent {
  keyWords: string[] = ['let', 'be', 'if', 'then', ',', '@'];

    letSnippet: string = `
    <pre><code>
let x be 5
    </code></pre>
  `;
    ifSnippet: string = `
    <pre><code>
if x < 10, then
   let y be 10
    </code></pre>
  `;
    ifElseSnippet: string = `
    <pre><code>
if x * y == (100/2) - 1, then
   let x be False
else
   let x be True
    </code></pre>
  `;
    returnSnippet: string = `
    <pre><code>
let wrong be 3
let right be 7

if wrong + wrong == right, then
    return True
else
    return False

return "this will never execute"
    </code></pre>
  `;
    gotoSnippet: string = `
    <pre><code>
let x be 0
let n be 100

let a be 0
let b be 1

@1 # Print Factorial Numbers
if x < n, then
   print a

   let temp be a + b
   let a be b
   let b be temp

   let x be x + 1

   goto instruction 1
    </code></pre>
  `;
  syntaxSnippet: string = `
<pre><code>
# This is a comment line

"Strings must be double quotes."

print "this will print to the screen"

</code></pre>
`;
}
