const cheerio = require('cheerio');

const prettify = (str) => {
 return str.trim().replace(/\s+/g, ' ');
};

const diaryCoupon = (prize) => {
  const children = prize.children();

  const texts = [];

  for (let i = 0 ; i < children.length ; i ++){
    const child = children.slice(i).eq(0);

    if (child[0].name !== 'ul'){
      texts.push(prettify(child.text()));
    }
    else {
      const liList = cheerio.load(child.html())('li');

      for (let j = 0 ; j < liList.length ; j ++) {
        let text = '';
        const liImgs = cheerio.load(liList.slice(j).html())('img');
        if (liImgs.length > 0) {
          text += liImgs.attr('alt') + ' ';
        }

        text += prettify(liList.slice(j).eq(0).text());
        texts.push(text);
      }
    }
  }

  return texts.join('\n');
};

module.exports = {
  diaryCoupon
};
