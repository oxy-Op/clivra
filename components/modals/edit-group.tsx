"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import Image from "next/image";
import { Edit2, EditIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import UserMenu from "../aside/ui/user-channel";
import { TooltipShow } from "../providers/tooltip-provider";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Group name must be at least 2 characters",
    })
    .max(12, {
      message: "Group name must be less than 12 characters",
    }),
});

const EditGroup = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const isModalOpen = isOpen && type === "editGroup";
  const { label, icon, conversationId, users, me } = data;
  const router = useRouter();

  const [clicked, setClicked] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    form.setValue("name", label || "");
  }, [label, form, clicked]);

  const loading = form.formState.isSubmitting;

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.patch("/api/conversations", {
      name: values.name,
      conversationId: conversationId,
    });
    setClicked(false);
    router.refresh();
  }

  const handleModalClose = () => {
    setClicked(false);
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className="md:min-h-[400px] min-h-[200px] bg-[#f4f4f4] dark:bg-[#141414]">
        <DialogHeader>
          <DialogTitle className="border-b-2 pb-2 uppercase font-mono">
            GROUP
          </DialogTitle>
          <div className="flex flex-col w-full h-full bg-background rounded-md mt-4">
            <div className="flex">
              {!clicked ? (
                <>
                  <div className="flex">
                    <div className="flex flex-col">
                      <h3 className="p-3 ms-2 text-xl opacity-90">
                        {label || "user"}
                      </h3>
                      <span className="ms-4 opacity-80">
                        Created on{" "}
                        <span className="font-bold text-base">
                          {new Date(data.createdAt || 0).toDateString()}
                        </span>
                      </span>
                    </div>
                    <div>
                      <button
                        className="hover:bg-[#dcdcdc] dark:hover:bg-[#2c2c2c] p-3 rounded-md"
                        onClick={() => setClicked(true)}
                      >
                        <TooltipShow text="Edit Group Name">
                          <EditIcon />
                        </TooltipShow>
                        <span className="sr-only">Edit Group Name</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex w-full items-start justify-center gap-x-2 p-2 space-y-0">
                          <div className="w-full flex flex-col items-center space-y-2">
                            <FormControl>
                              <Input
                                autoFocus
                                {...field}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Group name"
                                className="border-2 border-[#2d2c2c] text-xl opacity-80 ps-5"
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                          <button
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                          >
                            Save
                          </button>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}
              <div className="ms-auto me-2 mt-2">
                <div className="relative inline-block w-28 h-28 rounded-full group">
                  <Image
                    className="rounded-full ring-2 object-cover "
                    src={icon || "/user_placeholder.png"}
                    alt={"Group profile picture"}
                    fill
                    sizes="112px"
                    quality={100}
                  />
                  <div
                    tabIndex={0}
                    onClick={() => {
                      onOpen("editImage", {
                        apiUrl: "/api/conversations",
                        conversationId,
                        isGroup: true,
                      });
                    }}
                    className="group-hover:flex items-center justify-center hidden absolute w-full h-full
              rounded-full bg-slate-500 bg-opacity-70"
                  >
                    <TooltipShow text="Edit Group Image" side="right">
                      <Edit2 />
                    </TooltipShow>
                    <span className="sr-only">Edit Group Image</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogTitle className="ms-4 ps-2 text-sm text-start border-b-2 pb-2 uppercase font-mono">
              MEMBERS
            </DialogTitle>
            <ScrollArea className="ms-4 max-h-[200px]">
              {users?.map((user) => (
                <UserMenu
                  isCurrentUser={user.id === me?.id}
                  key={user.id}
                  id={user.id}
                  label={user.name}
                  icon={user.image}
                  className="w-full hover:bg-[#dcdcdc] dark:hover:bg-[#2c2c2c]
                  "
                />
              ))}
            </ScrollArea>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditGroup;
