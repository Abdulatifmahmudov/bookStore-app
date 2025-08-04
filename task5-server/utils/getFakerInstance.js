import { Faker, en, de, ru, base } from '@faker-js/faker';

const localeMap = {
  en: [en, base],
  de: [de, en, base],
  ru: [ru, en, base],  
};

export function getFakerInstance(region = 'en') {
  const locales = localeMap[region] || [en, base];
  return new Faker({ locale: locales });
}
