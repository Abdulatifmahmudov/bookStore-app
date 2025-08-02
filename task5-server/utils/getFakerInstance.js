import { Faker, en, de, fr, base } from '@faker-js/faker';

const localeMap = {
  en: [en, base],
  de: [de, en, base],
  fr: [fr, en, base],
 
};

export function getFakerInstance(region = 'en') {
  const locales = localeMap[region] || [en, base];
  return new Faker({ locale: locales });
}
