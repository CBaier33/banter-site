import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: string, searchWords: string[]): string {
    if (!value || !searchWords.length) return value;

    // Match code blocks and pre blocks first, so they are not altered
    const codeBlockRegex = /(<pre.*?>.*?<\/pre>|<code.*?>.*?<\/code>)/gs;
    const codeBlocks: string[] = [];
    value = value.replace(codeBlockRegex, (match) => {
      codeBlocks.push(match); // Store code blocks
      return `{{codeBlock${codeBlocks.length - 1}}}`; // Placeholder for code blocks
    });

    // Highlight the search words in the remaining text
    const regex = new RegExp(`\\b(${searchWords.join('|')})\\b`, 'gi');
    value = value.replace(regex, match => `<span class="highlight">${match}</span>`);

    // Restore code blocks
    codeBlocks.forEach((block, index) => {
      value = value.replace(`{{codeBlock${index}}}`, block);
    });

    return value;
  }
}

