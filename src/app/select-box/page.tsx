'use client'

import { CheckIcon, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Option {
  id: string | number;
  name: string;
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [value, setValue] = useState<string | number | (string | number)[]>("");
  const multiple = true;

  const options: Option[] = [
    {
      id: 123324,
      name: '测试选项'
    },
    {
      id: 123325,
      name: '选项二'
    },
    {
      id: 123326,
      name: '选项三'
    }
  ];

  const handleSelect = (selectedValue: string | number) => {
    if (multiple) {
      const currentValue = value as (string | number)[];
      const newValue = currentValue?.includes(selectedValue)
        ? currentValue.filter((v) => v !== selectedValue)
        : [...(currentValue ?? []), selectedValue];
      setValue(newValue);
    } else {
      setValue(selectedValue);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setValue(multiple ? [] : "");
  };

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className={
              "flex min-h-[36px] cursor-pointer items-center justify-between rounded-md border px-3 py-1 data-[state=open]:border-ring"
            }
          >
            <div
              className={cn(
                "items-center gap-1 overflow-hidden text-sm",
                multiple
                  ? "flex flex-grow flex-wrap "
                  : "inline-flex whitespace-nowrap"
              )}
            >
              {(multiple && Array.isArray(value) && value.length > 0) || (!multiple && value) ? (
                multiple ? (
                  (options || [])
                    .filter(
                      (option) =>
                        Array.isArray(value) && value.includes(option.id)
                    )
                    .map((option) => (
                      <span
                        key={option.id}
                        className="inline-flex items-center gap-1 rounded-md border py-0.5 pl-2 pr-1 text-xs font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <span>{option.name}</span>
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelect(option.id);
                          }}
                          className="flex items-center rounded-sm px-[1px] text-muted-foreground/60 hover:bg-accent hover:text-muted-foreground"
                        >
                          <X />
                        </span>
                      </span>
                    ))
                ) : (
                  (options || []).find((opt) => opt.id === value)?.name
                )
              ) : (
                <span className="mr-auto text-muted-foreground">Select...</span>
              )}
            </div>
            <div className="flex items-center self-stretch pl-1 text-muted-foreground/60 hover:text-foreground [&>div]:flex [&>div]:items-center [&>div]:self-stretch">
              {(multiple && Array.isArray(value) && value.length > 0) || (!multiple && value) ? (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleClear();
                  }}
                >
                  <X className="size-4" />
                </div>
              ) : (
                <div>
                  <ChevronUp className="size-4" />
                </div>
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <div className="relative">
              <CommandInput
                value={searchTerm}
                onValueChange={(e) => setSearchTerm(e)}
                placeholder="Search..."
                className="h-9"
              />
              {searchTerm && (
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="size-4" />
                </div>
              )}
            </div>
            <CommandList>
              <CommandEmpty>{"No results found."}</CommandEmpty>
              <CommandGroup>
                <ScrollArea>
                  <div className="max-h-64">
                    {(options || []).map((option) => {
                      const isSelected =
                        Array.isArray(value) && value.includes(option.id);
                      return (
                        <CommandItem
                          key={option.id}
                          onSelect={() =>
                            handleSelect(option.id)
                          }
                        >
                          {multiple && (
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <CheckIcon />
                            </div>
                          )}
                          <span>{option.name}</span>
                          {!multiple && option.id === value && (
                            <CheckIcon
                              className={cn(
                                "ml-auto",
                                option.id === value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          )}
                        </CommandItem>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
