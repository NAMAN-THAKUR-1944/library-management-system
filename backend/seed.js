const { sequelize } = require('./models/index');
const Book = require('./models/Book');

const demoBooks = [
  { title: "Clean Code", author: "Robert C. Martin", category: "Computer Science" },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Computer Science" },
  { title: "Design Patterns", author: "Erich Gamma", category: "Computer Science" },
  { title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Computer Science" },
  { title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", category: "Computer Science" },
  
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science" },
  { title: "Cosmos", author: "Carl Sagan", category: "Science" },
  { title: "The Selfish Gene", author: "Richard Dawkins", category: "Science" },
  { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "History" },
  { title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History" },
  
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction" },
  { title: "1984", author: "George Orwell", category: "Fiction" },
  { title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Fiction" },
  
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Psychology" },
  { title: "The Power of Habit", author: "Charles Duhigg", category: "Psychology" },
  { title: "Quiet: The Power of Introverts", author: "Susan Cain", category: "Psychology" },
  
  { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy" },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fantasy" }
];

async function seed() {
  try {
    await sequelize.sync();
    
    // Check if books already exist to avoid duplicates
    const count = await Book.count();
    if (count === 0) {
      await Book.bulkCreate(demoBooks);
      console.log("Successfully seeded 20 demo books.");
    } else {
      console.log("Books already exist in the database. Skipping seed.");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exit(1);
  }
}

seed();
