import React, { useEffect, useState } from 'react'
import { Apartment } from '@/lib/types/apartment.type'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Loader from '../features/Loader'
import { ApartmentCard } from './CardAppartment'
import { ApartmentDetailsDialog } from './ApartmentDetails'
import { fetchApartments } from '@/redux/slicers/apartmentSlicer'
import Filter from '../features/Filter'
import { Building2 } from 'lucide-react'
import Pagination from '../features/Pagination'


const ListAppartments = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [projectFilter, setProjectFilter] = useState<string>("")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedApartment, setSelectedApartment] = useState<string | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const dispatch = useAppDispatch();
    const apartmentSlicer = useAppSelector((state) => state.apartments)
    const { loading, items, limit, total } = apartmentSlicer


    const handleApartmentClick = (apartment: Apartment) => {
        if (apartment && apartment._id) {
            setSelectedApartment(apartment._id)
            setIsDetailsOpen(true)
            console.log(apartment._id);

        }
    }

    useEffect(() => {
        const controller = new AbortController(); //clear unmount
        dispatch(fetchApartments({ page: currentPage, limit: 10, search: searchQuery, project: projectFilter }));

        return () => {
            controller.abort(); // clear request
        };
    }, [dispatch, currentPage, searchQuery, projectFilter])
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }


    return (
        <main className="container mx-auto px-8 py-8">
            <Filter projectFilter={projectFilter} searchQuery={searchQuery} setCurrentPage={setCurrentPage} setProjectFilter={setProjectFilter} setSearchQuery={setSearchQuery} />
            {
                loading ? <Loader /> : items.length > 0 ?
                    <>


                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
                            {
                                items.map((apartment) => (
                                    <ApartmentCard key={apartment._id}
                                        apartment={apartment}
                                        onClick={() => handleApartmentClick(apartment)} />
                                ))
                            }
                        </div>
                        <Pagination currentPage={currentPage} limit={limit} total={total} handlePageChange={handlePageChange} />

                    </>
                    : <>

                        <div className="text-center py-16">
                            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No apartments found</h3>

                        </div>
                    </>
            }
            <ApartmentDetailsDialog id={selectedApartment} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />

        </main>

    )
}

export default ListAppartments