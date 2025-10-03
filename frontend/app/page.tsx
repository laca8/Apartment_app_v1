"use client"

import { useState, useMemo } from "react"

import type { Apartment } from "@/lib/types/apartment.type"
import { AddApartmentSheet } from "@/components/apartment/AddApartment"
import { Button } from "@/components/ui/button"
import { Plus, Search, Building2 } from "lucide-react"
import Header from "@/components/features/Header"
import ListAppartments from "@/components/apartment/ListAppartments"


export default function ApartmentsPage() {


  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)



  return (

    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header setIsAddSheetOpen={setIsAddSheetOpen} />


      <ListAppartments />



      <AddApartmentSheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen} />
    </div>

  )
}
