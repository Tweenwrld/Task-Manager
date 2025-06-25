const mongoose = require('mongoose');
const Post = require('./models/Post');

mongoose.connect('mongodb://localhost:27017/task-manager')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const posts = [
    { title: 'First Post', body: 'This is the first post content' },
    { title: 'Second Post', body: 'Another post for testing' },
];

async function seedData() {
    await Post.deleteMany();
    await Post.insertMany(posts);
    console.log('Database seeded with initial posts');
    mongoose.connection.close();
}

seedData().catch(err => {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
});