"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal";
import { Input } from "../ui/input";

export const GroupAddModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const router = useRouter();
  const { apiUrl, conversationId, users } = data;

  const isModalOpen = isOpen && type === "groupModal";

  type theme = "dark" | "light";

  const currentTheme = localStorage.getItem("theme") as theme;

  const group = z.object({
    value: z.string().min(1),
    label: z.string().min(1),
  });

  const schema = z.object({
    name: z
      .string()
      .min(2, { message: "Group name must be at least 2 characters" })
      .max(14, { message: "Group name must be less than 14 characters" }),
    members: z.array(group).refine(
      (members) => {
        if (members.length < 2) {
          return false;
        }
        return true;
      },
      {
        message: "Group must have at least 2 members",
      }
    ),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      console.log(values);
      axios.post(apiUrl || "", {
        ...values,
        isGroup: true,
      });
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create a group
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Group chats allows you to chat with more than one person
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            suppressHydrationWarning
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
          >
            <div className="w-full ">
              <div className="w-full flex flex-col items-center justify-center text-center space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="">
                        <div className="w-full flex flex-col space-x-2 space-y-2">
                          <label
                            htmlFor="group_name"
                            className="font-mono text-base font-bold me-auto text-zinc-400 ms-2"
                          >
                            GROUP NAME
                          </label>
                          <Input
                            disabled={isLoading}
                            id="group_name"
                            className="w-full"
                            placeholder="Group name"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="members"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="">
                        <div className="w-full flex flex-col space-x-2 space-y-2">
                          <label
                            htmlFor="members"
                            className="font-mono text-base font-bold me-auto text-zinc-400 ms-2"
                          >
                            MEMBERS
                          </label>
                          <Select
                            isMulti
                            id="members"
                            // @ts-ignore
                            options={
                              users?.map((user) => ({
                                value: user.id,
                                label: user.name,
                              })) || []
                            }
                            styles={{
                              menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999,
                              }),
                              menu: (base) => ({
                                ...base,
                                zIndex: 9999,
                              }),
                              control: (base, state) => ({
                                ...base,
                                backgroundColor:
                                  currentTheme === "light"
                                    ? "#f4f4f4"
                                    : "#141414",
                              }),
                              option: (base, state) => ({
                                ...base,
                                backgroundColor:
                                  currentTheme === "dark" ? "#404040" : "",
                              }),
                              multiValue: (base) => ({
                                ...base,
                                backgroundColor:
                                  currentTheme === "dark" ? "#404040" : "",
                              }),

                              multiValueLabel: (base) => ({
                                ...base,
                                color:
                                  currentTheme === "dark" ? "#fff" : "#000",
                              }),
                            }}
                            isDisabled={isLoading}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="px-6 py-4">
              <Button type="submit" variant={"outline"} disabled={isLoading}>
                Create Group
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
