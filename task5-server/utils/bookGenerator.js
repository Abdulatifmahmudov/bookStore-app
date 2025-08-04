const { getFakerInstance } = require('./getFakerInstance');

function generateBooks({ region = 'en', seed = 1, likes = 3.7, reviews = 4.2, page = 1, count = 10 }) {
  const faker = getFakerInstance(region);
  const combinedSeed = Number(seed) + Number(page);
  faker.seed(combinedSeed);

  const books = [];
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

  for (let i = 0; i < count; i++) {
    const rowNumber = (page - 1) * count + i + 1;

    const numberOfReviews = faker.number.int({ min: 3, max: 10 });
    const reviewsArray = Array.from({ length: numberOfReviews }, () => ({
      reviewer: faker.person.fullName(),
      text: reviewTemplates[faker.number.int({ min: 0, max: reviewTemplates.length - 1 })],
      date: faker.date.past({ years: 2 }).toISOString().split("T")[0],
    }));

    books.push({
      row: rowNumber,
      isbn: faker.number.int({ min: 1000000000000, max: 9999999999999 }).toString(), // realistic ISBN-13
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
      reviewsArray,
    });
  }

  return books;
}

module.exports = generateBooks;
