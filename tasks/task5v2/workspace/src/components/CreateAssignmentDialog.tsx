"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Combobox } from "@/components/ui/combobox"
import { useAssetStore } from "@/lib/store/assets"
import { useEmployeeStore } from "@/lib/store/employees"
import { useAssignmentStore } from "@/lib/store/assignments"

const formSchema = z.object({
  asset_id: z.string().min(1, { message: "Asset is required." }),
  employee_id: z.string().min(1, { message: "Employee is required." }),
})

export function CreateAssignmentDialog() {
  const [open, setOpen] = React.useState(false)
  const { assets, fetchAssets } = useAssetStore()
  const { employees, fetchEmployees } = useEmployeeStore()
  const { addAssignment } = useAssignmentStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset_id: "",
      employee_id: "",
    },
  })

  React.useEffect(() => {
    if (open) {
      fetchAssets()
      fetchEmployees()
    }
  }, [open, fetchAssets, fetchEmployees])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addAssignment({
      asset_id: parseInt(values.asset_id),
      employee_id: parseInt(values.employee_id),
    })
    setOpen(false)
    form.reset()
  }

  const assetOptions = assets.map((asset) => ({
    value: asset.id.toString(),
    label: asset.name,
  }))

  const employeeOptions = employees.map((employee) => ({
    value: employee.id.toString(),
    label: employee.name,
  }))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Assignment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Assignment</DialogTitle>
          <DialogDescription>
            Assign an asset to an employee.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="asset_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset</FormLabel>
                  <FormControl>
                    <Combobox
                      options={assetOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Search for an asset..."
                      selectText="Select an asset"
                      notFoundText="No assets found."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employee_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <FormControl>
                    <Combobox
                      options={employeeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Search for an employee..."
                      selectText="Select an employee"
                      notFoundText="No employees found."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
