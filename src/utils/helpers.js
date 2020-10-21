export function toListText(words, conjunction) {
   // returns a string of words combined in a natural-language style
   if (conjunction) {
      return words
         .map((word, i, arr) => {
            if (i === arr.length - 2 && arr.length > 2) {
               return word + `, ${conjunction} `;
            }
            if (i === arr.length - 2 && arr.length < 3) {
               return word + ` ${conjunction} `;
            }
            if (i < arr.length - 2) {
               return word + ", ";
            } else return word;
         })
         .join("");
   } else {
      return words
         .map((word, i, arr) => {
            if (i < arr.length - 1) {
               return word + ", ";
            } else return word;
         })
         .join("");
   }
}

export function toDateNum(kebabDate) {
   return Number(kebabDate.replace(/-/g, ""));
}

export function toJsDate(eightDigitNum) {
   const str = String(eightDigitNum);
   const year = Number(str.slice(0, 4));
   const month = Number(str.slice(4, 6)) - 1;
   const day = Number(str.slice(6));
   return new Date(year, month, day);
}
