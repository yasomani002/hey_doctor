import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
    value?: Date
    onChange?: (date: Date | undefined) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    /** Format string for displaying the date. Defaults to "PPP" (e.g. June 23rd, 2026) */
    dateFormat?: string
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
    ({ value, onChange, placeholder = "Pick a date", className, disabled, dateFormat = "PPP" }, ref) => {
        const [open, setOpen] = React.useState(false)

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "h-8 w-full justify-start rounded-sm border border-input bg-transparent px-2.5 py-1 text-left text-base font-normal transition-colors outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 md:text-sm",
                            !value && "text-muted-foreground",
                            className
                        )}
                    >
                        <CalendarIcon className="mr-2 size-4 opacity-50" />
                        {value ? format(value, dateFormat) : placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={(date) => {
                            onChange?.(date)
                            setOpen(false)
                        }}
                    // initialFocus
                    />
                </PopoverContent>
            </Popover>
        )
    }
)

DatePicker.displayName = "DatePicker"

export default DatePicker
