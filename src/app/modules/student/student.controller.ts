import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';



const getALlStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

const getSingleStuden = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is retrieved successful',
    data: result,
  });
});

const deletedStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deletedStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successful',
    data: result,
  });
});

export const StudentControllers = {
  getALlStudents,
  getSingleStuden,
  deletedStudent,
};
