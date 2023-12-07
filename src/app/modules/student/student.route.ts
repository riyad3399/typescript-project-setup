import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/', StudentControllers.getALlStudents);

router.get('/:id', StudentControllers.getSingleStuden);

router.delete('/:id', StudentControllers.deletedStudent);

export const StudentRoutes = router;
