'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export function ExportPdfButton() {
    const handlePrint = () => {
        window.print()
    }

    return (
        <Button onClick={handlePrint} className="gap-2 shadow-sm">
            <Download className="h-4 w-4" />
            Export PDF
        </Button>
    )
}
