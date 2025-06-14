"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface ReportExportButtonProps {
  reportName: string
  onExport?: (format: string) => Promise<void>
}

export function ReportExportButton({ reportName, onExport }: ReportExportButtonProps) {
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<string | null>(null)

  const handleExport = async (format: string) => {
    setIsExporting(true)
    setExportFormat(format)

    try {
      if (onExport) {
        await onExport(format)
      } else {
        // Simulate export delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      toast({
        title: "Export successful",
        description: `${reportName} has been exported as ${format.toUpperCase()}.`,
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your report.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
      setExportFormat(null)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting {exportFormat?.toUpperCase()}...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("csv")} disabled={isExporting}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("excel")} disabled={isExporting}>
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")} disabled={isExporting}>
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
