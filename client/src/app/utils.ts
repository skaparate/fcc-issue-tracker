import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  private charsLen: number;
  private chars = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  constructor() {
    this.charsLen = this.chars.length;
  }

  randomString(length = 6) {
    const result = [];

    for (let i = 0; i < length; i++) {
      result.push(this.chars[Math.floor(Math.random() * this.charsLen)]);
    }

    return result.join('');
  }
}
