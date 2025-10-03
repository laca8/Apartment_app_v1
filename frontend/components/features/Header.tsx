import { Building2, Plus } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'

type Props = {
    setIsAddSheetOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setIsAddSheetOpen }: Props) => {
    return (
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">Apartment Listings</h1>
                            <p className="text-sm text-muted-foreground">Find your perfect home</p>
                        </div>
                    </div>
                    <Button onClick={() => setIsAddSheetOpen(true)} size="lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Apartment
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header