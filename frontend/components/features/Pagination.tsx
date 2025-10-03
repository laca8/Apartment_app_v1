import React from 'react'
import { Button } from '../ui/button'

type Props = {
    currentPage: number,
    total: number,
    limit: number,
    handlePageChange: (x: number) => void
}

const Pagination = ({ currentPage, total, limit, handlePageChange }: Props) => {
    const totalPages = Math.ceil(total / limit);

    return (
        <div>
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </Button>

                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                onClick={() => handlePageChange(page)}
                                className="w-10"
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Pagination