import dotenv from 'dotenv';

dotenv.config();

export default {
    BOOKS : process.env.booksTableName || 'books',
}