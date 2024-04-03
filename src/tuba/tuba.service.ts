import { Injectable } from '@nestjs/common';

const abjadList = {
  ا: 1,
  ب: 2,
  ج: 3,
  د: 4,
  ه: 5,
  و: 6,
  ز: 7,
  ح: 8,
  ط: 9,
  ی: 10,
  ک: 20,
  ل: 30,
  م: 40,
  ن: 50,
  س: 60,
  ع: 70,
  ف: 80,
  ص: 90,
  ق: 100,
  ر: 200,
  ش: 300,
  ت: 400,
  ث: 500,
  خ: 600,
  ذ: 700,
  ض: 800,
  ظ: 900,
  غ: 1000,
  گ: 2000,
  چ: 3000,
  پ: 4000,
  ژ: 5000,
};

@Injectable()
export class TubaService {
  generateAbjadByName(name: string) {
    let abjad = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      if (char === ' ') continue;
      abjad += abjadList[char];
    }
    return abjad;
  }
}
