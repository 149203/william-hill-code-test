module.exports = {
   toSafeParse(str) {
      try {
         JSON.parse(str);
      } catch (err) {
         console.log(err);
         return str;
      }
      return JSON.parse(str); // Could be undefined
   },

   stripTags(str) {
      return str.replace(/<\/?[^>]+(>|$)/g, "");
   },

   truncate(str, len) {
      if (str.length > len) {
         return str.slice(0, len) + `...`;
      } else {
         return str;
      }
   },
};
