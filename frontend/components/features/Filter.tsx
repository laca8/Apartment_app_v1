'use client'
import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'

type Props = {
    searchQuery: string,
    projectFilter: string,
    setSearchQuery: (searchQuery: string) => void,
    setCurrentPage: (num: number) => void,
    setProjectFilter: (filter: string) => void,


}

const Filter = ({
    searchQuery,
    setCurrentPage,
    setProjectFilter,
    setSearchQuery,
    projectFilter,

}: Props) => {
    const projects = ['Seaside Apartments', 'Downtown Living', 'Metropolitan Towers']
    return (

        <div>
            <div className="mb-8 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by unit name, number, or project..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="pl-10"
                        />
                    </div>
                    <Select
                        value={projectFilter}
                        onValueChange={(value) => {
                            setProjectFilter(value)
                            setCurrentPage(1)
                        }}
                    >
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Filter by Projects" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem disabled value="all">All Projects</SelectItem>
                            {
                                projects.map((x, index) => (
                                    <SelectItem value={x} key={index}>{x}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={() => {
                            setSearchQuery("")
                            setProjectFilter("")
                        }}
                    >
                        Clear Filters
                    </Button>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    {/* <p>
                Showing {paginatedApartments.length} of {filteredApartments.length} apartments
              </p> */}
                </div>
            </div>
        </div>
    )
}

export default Filter