// utils/getFakerInstance.js
const { Faker } = require('@faker-js/faker');
const { en, ru, de, base } = require('@faker-js/faker');

const localeMap = {
  en: [en, base],
  ru: [ru, en, base],
  de: [de, en, base],
};

function getFakerInstance(region = 'en') {
  const locales = localeMap[region] || [en, base]; // fallback to English
  return new Faker({ locale: locales });
}

module.exports = { getFakerInstance };
