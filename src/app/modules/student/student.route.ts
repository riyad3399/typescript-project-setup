import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentControllers.createStudent);

router.get('/', StudentControllers.getALlStudents);

router.get('/:_id', StudentControllers.getSingleStuden);

export const StudentRoutes = router;
