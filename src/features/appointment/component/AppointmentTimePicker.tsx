import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronDown } from "lucide-react";

interface Slot {
    label: string;
    from: string;
    to: string;
}

interface Props {
    value: string;
    slots: Slot[];
    onChange: (value: string) => void;
}

export default function AppointmentTimePicker({
    value,
    slots,
    onChange,
}: Props) {
    return (
        <Popover modal={false}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                >
                    {value || "Select Appointment Time"}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="w-[420px] p-0"
                sideOffset={5}
            >
                <ScrollArea className="h-64 p-2" style={{ overscrollBehavior: "contain" }}>
                    <div className="grid grid-cols-3 gap-2">
                        {slots.map((slot) => (
                            <Button
                                key={slot.from}
                                type="button"
                                variant={value === slot.from ? "default" : "outline"}
                                onClick={() => onChange(slot.from)}
                            >
                                {slot.label}
                                {value === slot.from && (
                                    <Check className="ml-2 h-4 w-4" />
                                )}
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}