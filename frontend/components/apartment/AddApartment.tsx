"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createApartment, fetchApartments } from "@/redux/slicers/apartmentSlicer";
import { Upload } from "lucide-react"
import { toast } from "react-toastify"

interface AddApartmentSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AddApartmentSheet({ open, onOpenChange }: AddApartmentSheetProps) {
    const [formData, setFormData] = useState({
        unitName: '',
        unitNumber: '',
        project: '',
        description: '',
        price: '',

    })
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const maxFiles = 5;
    const maxFileSizeMB = 5;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    const dispatch = useAppDispatch();
    const apartmentSlicer = useAppSelector((state) => state.apartments)
    const { loading } = apartmentSlicer

    //handle change images
    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);

        // Validate number of files
        if (images.length + selectedFiles.length > maxFiles) {
            toast.error(`You can only upload up to ${maxFiles} images`);
            return;
        }

        // Validate size
        for (const file of selectedFiles) {
            if (file.size > maxFileSizeMB * 1024 * 1024) {
                toast.error(`Each image must be less than ${maxFileSizeMB}MB`);
                return;
            }
        }


        for (const file of selectedFiles) {
            // Validate type
            if (!allowedTypes.includes(file.type)) {
                toast.error(`Only images are allowed (jpeg, jpg, png)`);
                return;
            }
        }

        setImages((prev) => [...prev, ...selectedFiles]);

        // Create previews
        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    //handle change formData
    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    //handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key as keyof typeof formData]);
        }
        images.forEach((img) => data.append("images", img));


        dispatch(createApartment(data))
        onOpenChange(false)
        dispatch(fetchApartments({}));

    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange} >
            <SheetContent className="w-full sm:max-w-xl overflow-y-auto ">
                <SheetHeader>
                    <SheetTitle>Add New Apartment</SheetTitle>
                    <SheetDescription>Fill in the details to add a new apartment to the listing.</SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-6 p-5">
                    <div className="space-y-2">
                        <Label htmlFor="unitName">
                            Unit Name <span className="text-destructive">*</span>
                        </Label>
                        <Input id="unitName" name="unitName" value={formData.unitName}
                            onChange={handleChangeData} placeholder="e.g., Skyline Suite" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="unitNumber">
                            Unit Number <span className="text-destructive">*</span>
                        </Label>
                        <Input id="unitNumber" name="unitNumber"
                            value={formData.unitNumber}
                            onChange={handleChangeData}
                            placeholder="e.g., A-101" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="project">
                            Project <span className="text-destructive">*</span>
                        </Label>
                        <Input id="project" name="project"
                            value={formData.project}
                            onChange={handleChangeData}
                            placeholder="e.g., Harbor View Residences" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChangeData}
                            placeholder="Describe the apartment features and highlights..."
                            rows={4}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Monthly Rent ($)</Label>
                        <Input id="price" name="price" type="number"
                            value={formData.price}
                            onChange={handleChangeData}
                            placeholder="e.g., 2500" />
                    </div>
                    <div className="space-y-2">
                        {images.length < maxFiles && (
                            <div className="relative">
                                <input
                                    id="images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFilesChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="images"
                                    className="flex items-center justify-center gap-2 h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                                >
                                    <Upload className="w-5 h-5 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                        Click to upload images (max {maxFiles})
                                    </span>
                                </label>
                            </div>
                        )}

                        {/* Preview */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {previews.map((src, idx) => (
                                <div key={idx} className="relative w-20 h-20">
                                    <img
                                        src={src}
                                        alt={`preview ${idx}`}
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        onClick={() => {
                                            setImages((prev) => prev.filter((_, i) => i !== idx));
                                            setPreviews((prev) => prev.filter((_, i) => i !== idx));
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>




                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="flex-1">
                            {loading ? "Adding..." : "Add Apartment"}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet >
    )
}
