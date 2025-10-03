"use client"

import type { Apartment } from "@/lib/types/apartment.type"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Building2, MapPin, ImageIcon } from "lucide-react"
import { SliderImages } from "../features/SliderImages"

interface ApartmentCardProps {
    apartment: Apartment
    onClick: () => void
}

export function ApartmentCard({ apartment, onClick }: ApartmentCardProps) {

    return (
        <Card
            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-border/50"
            onClick={onClick}
        >
            <div className="relative h-48 overflow-hidden bg-muted">
                <SliderImages images={apartment.images ? apartment?.images : []} />
                {apartment && apartment.images && (
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {apartment.images.length}
                    </div>
                )}
            </div>

            <CardContent className="p-4 space-y-3">
                <div>
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {apartment.unitName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Building2 className="h-3.5 w-3.5" />
                        <span>{apartment.project}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Unit {apartment.unitNumber}</span>
                </div>

                {apartment.description && <p className="text-sm text-muted-foreground line-clamp-2">{apartment.description}</p>}
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <div className="w-full flex items-center justify-between">
                    {apartment.price ? (
                        <div>
                            <p className="text-2xl font-bold text-primary">${apartment.price.toLocaleString()}</p>

                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Price not available</p>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}
