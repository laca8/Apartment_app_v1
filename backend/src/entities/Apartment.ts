import { Schema, model } from 'mongoose';

import { IApartment } from '../types/apartment.type'


const ApartmentSchema = new Schema<IApartment>({
    unitName: { type: String, required: true },
    unitNumber: { type: String, required: true },
    project: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    images: { type: [String], default: [] },
}, {
    timestamps: true
});





export const Apartment = model<IApartment>('Apartment', ApartmentSchema, 'apartments');