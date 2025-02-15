import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learn',
  imports: [CommonModule],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css'],
})
export class LearnComponent {
  keyWords: string[] = ['let', 'be', 'if', 'then', ',', '@', 'else', 'return', 'print'];

  letSnippet: string = `
    let x be 5
  `;
  ifSnippet: string = `
    if x < 10, then
      let y be 10
  `;
  ifElseSnippet: string = `
    if x * y == (100/2) - 1, then
      let x be False
    else
      let x be True
  `;
  returnSnippet: string = `
    let wrong be 3
    let right be 7
    if wrong + wrong == right, then
      return True
    else
      return False
    return "this will never execute"
  `;
  gotoSnippet: string = `
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
  `;
  syntaxSnippet: string = `
    # This is a comment line
    "Strings must be double quotes."
    print "this will print to the screen"
  `;
}

