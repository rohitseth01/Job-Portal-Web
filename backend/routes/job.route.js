import express  from 'express';
import isAuthenticated from '../middlewares/iaAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobsById, postJob,deleteJob } from '../controllers/job.controller.js';


const router=express.Router();

router.route('/post').post(isAuthenticated,postJob);
router.route('/get').get(isAuthenticated,getAllJobs);
router.route('/getadminjobs').get(isAuthenticated,getAdminJobs)
router.route('/get/:id').get(isAuthenticated,getJobsById);

// Add the DELETE route here
router.route("/delete/:id").delete(isAuthenticated, deleteJob);

export default router