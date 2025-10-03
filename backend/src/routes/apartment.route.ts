import { Router } from 'express';
import { listApartments, getApartment, createApartment } from '../controllers/apartment.controller';
import { upload } from '../middlewares/upload';


const router = Router();


router.get('/', listApartments);
router.get('/:id', getApartment);
router.post('/', upload.array("images", 5), createApartment);


export default router;