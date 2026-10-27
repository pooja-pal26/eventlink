import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

export interface SelectOption {
    value: string;
    label: string;
}

interface SearchableSelectProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder: string;
    searchPlaceholder: string;
    emptyText: string;
    disabled?: boolean;
}

/**
 * Type-to-filter replacement for long <Select> lists (36 states, 24 MPOs).
 * A plain dropdown of that length covers the whole form on a phone and forces
 * scrolling inside a scroll — this narrows to a handful of rows as you type.
 */
const SearchableSelect = ({
    id,
    value,
    onChange,
    options,
    placeholder,
    searchPlaceholder,
    emptyText,
    disabled,
}: SearchableSelectProps) => {
    const [open, setOpen] = useState(false);
    const selected = options.find(o => o.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        'w-full justify-between font-normal h-10 px-3',
                        !selected && 'text-muted-foreground',
                    )}
                >
                    <span className="truncate">{selected ? selected.label : placeholder}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
                <Command
                    filter={(itemValue, search) =>
                        itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
                    }
                >
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList className="max-h-56">
                        <CommandEmpty>{emptyText}</CommandEmpty>
                        <CommandGroup>
                            {options.map(opt => (
                                <CommandItem
                                    key={opt.value}
                                    value={opt.label}
                                    onSelect={() => {
                                        onChange(opt.value === value ? '' : opt.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === opt.value ? 'opacity-100' : 'opacity-0',
                                        )}
                                    />
                                    <span>{opt.label}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SearchableSelect;
