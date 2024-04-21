import { Injectable } from '@nestjs/common';

const abjadList = {
  ا: 1,
  ب: 2,
  پ: 2,
  ج: 3,
  چ: 3,
  د: 4,
  ه: 5,
  و: 6,
  ز: 7,
  ژ: 7,
  ح: 8,
  ط: 9,
  ی: 10,
  ک: 20,
  گ: 20,
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
};

const jamaliList = [
  'ا',
  'ل',
  'ر',
  'ک',
  'گ',
  'ه',
  'ی',
  'ع',
  'ص',
  'ط',
  'س',
  'ح',
  'م',
  'ق',
  'ن',
];

const jalaliList = [
  'ب',
  'پ',
  'د',
  'و',
  'ت',
  'ذ',
  'ض',
  'غ',
  'ج',
  'چ',
  'ز',
  'ژ',
  'ف',
  'ش',
  'ث',
  'خ',
  'ظ',
];

const atashList = ['ا', 'ه', 'ط', 'ف', 'ش', 'م', 'ذ'];
const badList = ['ب', 'پ', 'و', 'ی', 'ن', 'ص', 'ت', 'ض'];
const abList = ['ج', 'چ', 'ز', 'ژ', 'ث', 'ظ', 'ک', 'گ', 'س', 'ق'];
const khakList = ['د', 'خ', 'غ', 'ح', 'ل', 'ع', 'ر'];

const daysOfWeekEmamList = {
  1: 'یک شنیه',
  2: 'دو شنیه',
  3: 'دو شنیه',
  4: 'سه شنیه',
  5: 'سه شنیه',
  6: 'سه شنیه',
  7: 'چهار شنیه',
  8: 'چهار شنیه',
  9: 'چهار شنیه',
  10: 'چهار شنیه',
  11: 'پنج شنیه',
  12: 'جمعه',
};

const vosatEmamList = {
  1: 'شکوه حیدری',
  2: 'حلم حسنی',
  3: 'شجاعت حسینی',
  4: 'عبادت سجادی',
  5: 'مفاخر باقری',
  6: 'نشانه ای صادقی',
  7: 'علوم کاظمی',
  8: 'دلالت های رضوی',
  9: 'سخای جوادی',
  10: 'پاکی هادوی',
  11: 'هیبت عسکری',
  12: 'نهانیات الهی',
};

const qarinEmamList = {
  1: 'همروش',
  2: 'خنزب',
  3: 'لاقیس',
  4: 'هفاف، مطووش (مطرش)',
  5: 'زکروش',
  6: 'داسم، قنذر (قفندر',
  7: 'اعور، زلنبور (رکتبور)، قزح',
  8: 'زوال، عیثم، رها (ذها)',
  9: 'طرطبه، مقلاص، ثبر، مذهب، سعالی، ام الصبیان، عارض، حناس',
  10: 'تمریح، غول، هزع',
  11: 'ولهان (ولها)مره، رده، لهبا',
  12: 'ابیض، اقبض، متکون، بلروش',
};

const taleList = {
  0: 'حوث',
  1: 'حمل',
  2: 'ثور',
  3: 'جوزا',
  4: 'سرطان',
  5: 'اسد',
  6: 'سنبله',
  7: 'میزان',
  8: 'عقرب',
  9: 'قوس',
  10: 'جدی',
  11: 'دلو',
  12: 'حوث',
};

@Injectable()
export class TubaService {
  generateAbjadByName(name: string): number {
    let abjad = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      if (char === ' ') continue;
      abjad += abjadList[char];
    }
    return abjad;
  }

  getEmamNumberByAbjad(abjad: number): number {
    let tempAbjad = abjad.toString();
    let emamNumber: number = null;
    while (!emamNumber) {
      let temp = 0;
      for (const charAbjad of tempAbjad) {
        temp += Number(charAbjad);
      }
      if (temp <= 12) {
        emamNumber = temp;
        break;
      } else {
        tempAbjad = String(temp);
      }
    }
    return emamNumber;
  }

  getMovakelKhasByAbjad(abjad: number): string {
    const tempAbjad = abjad.toString();
    const charsAbjad = [];
    const abjadKeys = Object.keys(abjadList);

    for (let i = 0; i < tempAbjad.length; i++) {
      const charKey = abjadKeys.find(
        (key) =>
          abjadList[key] ===
          Number(tempAbjad[i]) * Math.pow(10, tempAbjad.length - i - 1),
      );
      if (charKey) charsAbjad.push(charKey);
    }

    return `${charsAbjad.join('')} ایل`;
  }

  getMovakelAumByAbjad(abjad: number): string {
    const tempAbjad = abjad.toString();
    const charsAbjad = [];
    const abjadKeys = Object.keys(abjadList);

    for (let i = 0; i < tempAbjad.length; i++) {
      const charKey = abjadKeys.find(
        (key) =>
          abjadList[key] ===
          Number(tempAbjad[i]) * Math.pow(10, tempAbjad.length - i - 1),
      );
      if (charKey) charsAbjad.push(charKey);
    }

    return `${charsAbjad.join('')} ایل`;
  }

  getOunByAbjad(abjad: number): string {
    const tempAbjad = abjad.toString();
    const charsAbjad = [];
    const abjadKeys = Object.keys(abjadList);

    for (let i = tempAbjad.length; i >= 0; i--) {
      const charKey = abjadKeys.find(
        (key) =>
          abjadList[key] ===
          Number(tempAbjad[i]) * Math.pow(10, tempAbjad.length - i - 1),
      );
      if (charKey) charsAbjad.push(charKey);
    }

    return `${charsAbjad.join('')} وش`;
  }

  getJamaliOrJalaliByName(name: string): string {
    let countJamali = 0;
    let countJalali = 0;

    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      if (jamaliList.includes(char)) ++countJamali;
      else if (jalaliList.includes(char)) ++countJalali;
    }

    return countJamali > countJalali ? 'جمالی' : 'جلالی';
  }

  getAsarAfaghiByName(name: string): string {
    const counts = [0, 0, 0, 0];

    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      if (atashList.includes(char)) ++counts[0];
      else if (badList.includes(char)) ++counts[1];
      else if (abList.includes(char)) ++counts[2];
      else if (khakList.includes(char)) ++counts[3];
    }

    let maxNumber = counts[0];
    let maxIndex = 0;
    for (let i = 1; i < counts.length; i++) {
      if (counts[i] > maxNumber) {
        maxNumber = counts[i];
        maxIndex = i;
      }
    }

    switch (maxIndex) {
      case 0:
        return 'آتش';
      case 1:
        return 'باد';
      case 2:
        return 'آب';
      case 3:
        return 'خاک';
    }
  }

  getDeyOfWeekByEmamNumber(emamNumber: number): string {
    return daysOfWeekEmamList[emamNumber];
  }

  getVosatByEmamNumber(emamNumber: number): string {
    return vosatEmamList[emamNumber];
  }

  getQarinByEmamNumber(emamNumber: number): string {
    return qarinEmamList[emamNumber];
  }

  getTaleByAbjad(abjad: number): string {
    console.log(abjad % 12);

    return taleList[abjad % 12];
  }
}
