
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAssetStore } from "@/lib/store/assets";
import { NewAsset } from "@/lib/api";

const formSchema = z.object({
  type: z.string().min(1, { message: "Type is required" }),
  serial_number: z.string().min(1, { message: "Serial number is required" }),
});

interface CreateAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAssetDialog({ open, onOpenChange }: CreateAssetDialogProps) {
  const addAsset = useAssetStore((state) => state.addAsset);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      serial_number: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newAsset: NewAsset = {
      type: values.type,
      serial_number: values.serial_number,
    };
    await addAsset(newAsset);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Asset</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new asset.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Laptop, Monitor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serial_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serial Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., SN123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Asset</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
