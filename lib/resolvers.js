const connectDB = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
  Query: {
    getCourses: async () => {
      try {
        const db = await connectDB();
        const courses = await db.collection('courses').find().toArray();
        return courses;
      } catch (error) {
        console.log(error);
      }
      return courses;
    },
    getCourse: async (_, { id }) => {
      try {
        const db = await connectDB();
        const course = await db
          .collection('courses')
          .findOne({ _id: ObjectID(id) });
        return course;
      } catch (error) {
        console.log(error);
      }
      return courses;
    },
  },
};
