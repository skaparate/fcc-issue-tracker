import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class Utils {
  private crypto = null;
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
    '9'
  ];

  constructor() {
    let crypto = null;

    if (window.hasOwnProperty('msCrypto')) {
      crypto = window['msCrypto'];
    } else {
      crypto = window.crypto;
    }

    this.crypto = crypto;
  }

  randomString(length = 6) {
    const result = [];
    const charsLen = this.chars.length;

    for (let i = 0; i < 12; i++) {
      result.push(Math.floor(Math.random() * charsLen));
    }

    return result.join('');
  }
}
