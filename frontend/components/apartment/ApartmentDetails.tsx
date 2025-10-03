"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Building2, MapPin, DollarSign } from "lucide-react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchApartmentById } from "@/redux/slicers/apartmentSlicer"
import Loader from "../features/Loader"
import { SliderImages } from "../features/SliderImages"

interface ApartmentDetailsDialogProps {
    id: string | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ApartmentDetailsDialog({ id, open, onOpenChange }: ApartmentDetailsDialogProps) {
    const dispatch = useAppDispatch();
    const apartmentSlicer = useAppSelector((state) => state.apartments)
    const { loaderSingle, selected } = apartmentSlicer
    useEffect(() => {
        if (id) {
            dispatch(fetchApartmentById(id));
        }
    }, [dispatch, id])

    if (!id) return null


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {
                loaderSingle ? <Loader /> : selected ? (
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1.5">
                                    <DialogTitle className="text-2xl">{selected?.unitName}</DialogTitle>
                                    <DialogDescription className="flex items-center gap-2 text-base">
                                        <Building2 className="h-4 w-4" />
                                        {selected.project}
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="space-y-6">
                            {/* Image Gallery */}
                            <div className="space-y-3">


                                <SliderImages images={selected?.images ? selected.images : []} />
                            </div>

                            {/* Price */}
                            {selected.price && (
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                                    <DollarSign className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="text-3xl font-bold text-primary">${selected.price.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground">per month</p>
                                    </div>
                                </div>
                            )}

                            <Separator />

                            {/* Unit Details */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">Unit Details</h3>
                                <div className="grid gap-3">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Unit Number</p>
                                            <p className="font-semibold">{selected.unitNumber}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                                        <Building2 className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Project</p>
                                            <p className="font-semibold">{selected.project}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {selected.description && (
                                <>
                                    <Separator />
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg">Description</h3>
                                        <p className="text-muted-foreground leading-relaxed">{selected.description}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </DialogContent>
                ) : <></>
            }
        </Dialog>

    )
}
