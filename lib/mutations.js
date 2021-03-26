const { ObjectID } = require('mongodb');
const connectDB = require('./db');

module.exports = {
  createCourse: async (_, args) => {
    const defaults = {
      teacher: '',
      topic: '',
    };
    const { input } = args;
    const newCourse = { ...defaults, ...input };
    try {
      const db = await connectDB();
      const result = await db.collection('courses').insertOne(newCourse);
      input._id = result.insertedId;
      return input;
    } catch (error) {
      console.log(error);
    }
  },
  createStudent: async (_, args) => {
    const { input } = args;
    try {
      const db = await connectDB();
      const result = await db.collection('students').insertOne(input);
      input._id = result.insertedId;
      return input;
    } catch (error) {
      console.log(error);
    }
  },
  editCourse: async (_, args) => {
    const { _id, input } = args;
    try {
      const db = await connectDB();
      await db
        .collection('courses')
        .updateOne({ _id: ObjectID(_id) }, { $set: input });
      const course = await db
        .collection('courses')
        .findOne({ _id: ObjectID(_id) });
      return course;
    } catch (error) {
      console.log(error);
    }
  },
  editStudent: async (_, args) => {
    const { _id, input } = args;
    try {
      const db = await connectDB();
      await db
        .collection('students')
        .updateOne({ _id: ObjectID(_id) }, { $set: input });
      const student = await db
        .collection('students')
        .findOne({ _id: ObjectID(_id) });
      return student;
    } catch (error) {
      console.log(error);
    }
  },
  addPeopleToCourse: async (_, args) => {
    const { courseId, studentId } = args;
    try {
      const db = await connectDB();
      const course = await db
        .collection('courses')
        .findOne({ _id: ObjectID(courseId) });
      const student = await db
        .collection('students')
        .findOne({ _id: ObjectID(studentId) });

      if (!course || !student) {
        throw new Error('La persona o el curso no existe');
      }

      await db
        .collection('courses')
        .updateOne(
          { _id: ObjectID(courseId) },
          { $addToSet: { people: ObjectID(studentId) } }
        );
      const newCourse = await db
        .collection('courses')
        .findOne({ _id: ObjectID(courseId) });
      return newCourse;
    } catch (error) {
      console.log(error);
    }
  },
};
