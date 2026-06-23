import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectOption {
    label: string
    value: string
}

interface SelectProps extends Omit<React.ComponentProps<"select">, "children"> {
    options: SelectOption[]
    placeholder?: string
    /** Controls what gets submitted as the form value. Defaults to "value". */
    returnType?: "label" | "value" | "both"
}

const getOptionValue = (option: SelectOption, returnType: "label" | "value" | "both") => {
    if (returnType === "both") return JSON.stringify({ label: option.label, value: option.value })
    if (returnType === "label") return option.label
    return option.value
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, options, placeholder, returnType = "value", defaultValue, ...props }, ref) => {
        return (
            <select
                ref={ref}
                data-slot="select"
                defaultValue={defaultValue ?? ""}
                className={cn(
                    "h-8 w-full min-w-0 rounded-sm border border-input bg-transparent px-2 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                    className
                )}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={getOptionValue(option, returnType)}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        )
    }
)

Select.displayName = "Select"

export default Select
