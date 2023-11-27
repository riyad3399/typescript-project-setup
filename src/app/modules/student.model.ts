import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "'firstName' is required"],
    trim: true,
    maxlength: [20, "'firstName' can not be more than 20 characters"],
    validate: {
      validator: (value: string) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "'lastName' is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "'fatherName' is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "'fatherOccupation' is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "'fatherContactNo' is required"],
  },
  motherName: {
    type: String,
    required: [true, "'motherName' is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "'motherOccupation' is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "'motherContactNo' is required"],
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "'name' is required"],
  },
  occupation: {
    type: String,
    required: [true, "'occupation' is required"],
  },
  contactNo: {
    type: String,
    required: [true, "'contactNo' is required"],
  },
  address: {
    type: String,
    required: [true, "'address' is required"],
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, "'name' is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "'{VALUE}' is not valid",
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, "'email' is required"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not a valid email",
    }
  },
  contactNo: {
    type: String,
    required: [true, "'contactNo' is required"],
  },
  emergencyContactNo: {
    type: String,
    required: [true, "'emergencyContactNo' is required"],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: "'{VALUE}' is not valid",
    },
  },
  presentAddress: {
    type: String,
    required: [true, "'presentAddress' is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "'permanentAddress' is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "'guardian' is required"],
  },
  localGuardian: {
    type: localGuradianSchema,
    required: [true, "'localGuardian' is required"],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
