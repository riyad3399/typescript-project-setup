import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "'firstName' is required"],
    trim: true,
    maxlength: [20, "'firstName' can not be more than 20 characters"],
    // validate: {
    //   validator: (value: string) => {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not capitalize format',
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "'lastName' is required"],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
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

const localGuradianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id is Required'],
      unique: true,
      ref: 'User',
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
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, "'email' is required"],
      unique: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: "{VALUE} is not a valid email",
      // }
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
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AdmitionSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

// mongoose virtual
studentSchema.virtual('fullName').get(function () {
  return ` ${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
