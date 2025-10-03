import { Apartment } from '../entities/Apartment';
import { IApartment } from '../types/apartment.type';

//fetch all apartments
export const listApartmentsService = async (page: number = 1, limit: number = 10, search: string = "", project?: string) => {
    const filters: any = {};
    if (project) filters.project = project;

    if (search) {
        filters.$or = [
            { unitName: { $regex: search, $options: "i" } },
            { unitNumber: { $regex: search, $options: "i" } },
            { project: { $regex: search, $options: "i" } },
        ];
    }

    let query = Apartment.find(filters);

    const total = await query.clone().countDocuments();
    const items = await query
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean();

    const itemsWithFullPath = items.map(item => ({
        ...item,
        images: item.images?.map((img: string) =>
            img.startsWith("http") ? img : `http://localhost:5000/${img.replace(/\\/g, "/")}`
        ),
    }));

    return { items: itemsWithFullPath, total };

}


//get single apartment
export const getByIdService = async (id: string) => {

    const apartment = await Apartment.findById(id).lean();
    const itemWithFullPath = {
        ...apartment,
        images: apartment?.images?.map((img: string) =>
            img.startsWith("http") ? img : `http://localhost:5000/${img.replace(/\\/g, "/")}`
        ),
    }
    return itemWithFullPath

}

//create apartment
export const createApartmentService = async (data: IApartment) => {
    return await Apartment.create(data);


}