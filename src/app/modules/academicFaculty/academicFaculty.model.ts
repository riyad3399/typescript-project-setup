import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const AcadeicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

AcadeicFacultySchema.pre('save', async function (next) {
  const isFacultyExist = await AcademicFaculty.findOne({ name: this.name });

  if (isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND,'This Faculty is already Exist!');
  }
  next()
});

AcadeicFacultySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery()
  
  const isFacultyExist = await AcademicFaculty.findOne(query);
  
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND,"This Faculty does not Exist ")
  }

  next()
})

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  AcadeicFacultySchema,
);
