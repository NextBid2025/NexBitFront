"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Role {
  id: string
  name: string
  description: string
}

interface RoleSelectorProps {
  roles: Role[]
  selectedRole?: string
  onRoleChange?: (roleId: string) => void
}

export function RoleSelector({ roles, selectedRole, onRoleChange }: RoleSelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(selectedRole || "")

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
    if (onRoleChange) {
      onRoleChange(currentValue === value ? "" : currentValue)
    }
  }

  const selectedRoleData = roles.find((role) => role.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? selectedRoleData?.name : "Select role..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search roles..." />
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem key={role.id} value={role.id} onSelect={handleSelect}>
                  <Check className={cn("mr-2 h-4 w-4", value === role.id ? "opacity-100" : "opacity-0")} />
                  <div className="flex flex-col">
                    <span>{role.name}</span>
                    {role.description && <span className="text-xs text-muted-foreground">{role.description}</span>}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
