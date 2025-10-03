import { Request, Response } from "express";
import { createApartmentService, getByIdService, listApartmentsService } from "../services/apartment.service";
import { AppError } from "../middlewares/errorHandler";

//list apartments
export const listApartments = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, search = "", project } = req.query as any;

        const { items, total } = await listApartmentsService(
            Number(page),
            Number(limit),
            search,
            project
        );

        return res.status(200).json({
            data: items,
            meta: { total, page: Number(page), limit: Number(limit) }
        });
    } catch (err: any) {
        console.error(err);
        throw new AppError('Error occured', 500)
    }
};
//get single apartment
export const getApartment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const apt = await getByIdService(id);
        if (!apt) throw new AppError('apartment not found', 404)
        return res.status(200).json(apt);
    } catch (err) {
        console.error(err);
        throw new AppError('Error occured', 500)

    }
};
//create new apartment
export const createApartment = async (req: Request, res: Response) => {
    try {
        const { unitName, unitNumber, project, description, price } = req.body;
        if (!unitName || !unitNumber || !project) {
            throw new AppError('All required fields (unitName, unitNumber, project) must be provided.', 400)
        }

        const images = (req.files as Express.Multer.File[]).map(file => `uploads/${file.filename}`);


        const newApt = await createApartmentService({
            unitName,
            unitNumber,
            project,
            description,
            price,
            images
        });

        return res.status(201).json(newApt);
    } catch (err) {
        console.error(err);
        throw new AppError('Error occured', 500)

    }
};
