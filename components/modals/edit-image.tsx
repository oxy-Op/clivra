"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal";
import { UploadFile } from "../upload-file";
import { revalidatePath } from "next/cache";

export const EditImage = () => {
  const { isOpen, onClose, type, data } = useModal();

  const router = useRouter();
  const { apiUrl, query } = data;

  const isModalOpen = isOpen && type === "editImage";

  const schema = z.object({
    fileUrl: z.string().min(1, {
      message: "Attachment is required",
    }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await axios.patch(apiUrl || "", {
        image: values.fileUrl,
      });
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=" overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Change Profile Image
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Image will be displayed on your profile
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            suppressHydrationWarning
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full">
                          <UploadFile
                            type="avatar"
                            endpoint="imageFile"
                            onChange={field.onChange}
                            value={field.value}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="px-6 py-4">
              <Button variant={"outline"} disabled={isLoading}>
                Edit Avatar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
