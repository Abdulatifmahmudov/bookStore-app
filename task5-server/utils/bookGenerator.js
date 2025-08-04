const { getFakerInstance } = require('./getFakerInstance');

function generateReviews(faker) {
  const reviewTemplates = [
    "A gripping read from start to finish.",
    "I couldn't put it down!",
    "The characters were well-developed and relatable.",
    "A bit slow in the middle, but the ending was worth it.",
    "An absolute masterpiece.",
    "Didn't meet my expectations.",
    "Thrilling, emotional, and beautifully written.",
    "The plot was predictable, but enjoyable.",
    "I learned so much from this book.",
    "One of the best books I've read this year.",
    "It started strong but lost momentum.",
  ];

  const count = faker.number.int({ min: 2, max: 5 });

  return Array.from({ length: count }, () => ({
    reviewer: faker.person.fullName(),
    text: reviewTemplates[faker.number.int({ min: 0, max: reviewTemplates.length - 1 })],
    rating: faker.number.int({ min: 1, max: 5 }),
    date: faker.date.recent({ days: 90 }).toISOString().split("T")[0],
  }));
}

function generateBooks({ region = 'en', seed = 1, likes = 3.7, reviews = 4.2, page = 1, count = 10 }) {
  const faker = getFakerInstance(region);
  const combinedSeed = Number(seed) + Number(page);
  faker.seed(combinedSeed);

  const books = [];

  for (let i = 0; i < count; i++) {
    const rowNumber = (page - 1) * count + i + 1;

    books.push({
      row: rowNumber,
      isbn: faker.number.int({ min: 1000000000000, max: 9999999999999 }).toString(),
      title: faker.book.title(),
      authors: [
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        Math.random() > 0.7 ? `${faker.person.firstName()} ${faker.person.lastName()}` : null,
      ].filter(Boolean),
      publisher: faker.company.name(),
      likes: parseFloat((likes + faker.number.float({ min: -1, max: 1 })).toFixed(1)),
      reviews: parseFloat((reviews + faker.number.float({ min: -1, max: 1 })).toFixed(1)),
      year: faker.date.past({ years: 30 }).getFullYear(),
      genre: faker.music.genre(),
      description: faker.lorem.paragraph(), 
      reviewsArray: generateReviews(faker),
    });
  }

  return books;
}

module.exports = generateBooks;
