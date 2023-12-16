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

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(12, {
      message: "Name must be less than 12 characters",
    }),
});

const EditProfile = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const isModalOpen = isOpen && type === "editProfile";
  const { label, icon, createdAt } = data;

  const router = useRouter();

  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState(label);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    setName(label);
    form.setValue("username", label || "");
  }, [label, form]);

  const loading = form.formState.isSubmitting;

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.patch("/api/users/me", {
      name: values.username,
    });
    setClicked(false);
    setName(values.username);
    router.refresh();
  }

  const handleModalClose = () => {
    setClicked(false);
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className="md:min-h-[400px] md:h-auto h-full bg-[#f4f4f4] dark:bg-[#141414]">
        <DialogHeader>
          <DialogTitle className="border-b-2 pb-2 uppercase font-mono">
            Account
          </DialogTitle>
          <div className="mt-2">
            <div className="relative inline-block w-28 h-28 rounded-full group">
              <Image
                className="rounded-full ring-2 object-cover "
                src={icon || "/user_placeholder.png"}
                alt={"User image"}
                fill
                sizes="112px"
                quality={100}
              />
              <div
                tabIndex={0}
                onClick={() => {
                  onOpen("editImage", { apiUrl: "/api/users/me" });
                }}
                className="group-hover:flex items-center justify-center hidden absolute w-full h-full
              rounded-full bg-slate-500 bg-opacity-70"
              >
                <Edit2 />
                <span className="sr-only">Edit avatar</span>
              </div>
              {/* <span
                className={cn(
                  "absolute bottom-2 right-2 rounded-full w-4 h-4 ring-4 ring-[#f3f2e9] dark:ring-[#141414]",
                  status === "active" ? "bg-green-500/80" : "bg-red-500/80"
                )}
              ></span> */}
            </div>
          </div>
          <div className="h-full bg-background rounded-md mt-4">
            {!clicked ? (
              <>
                <div className="flex items-center">
                  <h3 className="p-3 ms-2 text-xl opacity-80">
                    {name || "usr"}
                  </h3>
                  <button
                    className="hover:bg-[#dcdcdc] dark:hover:bg-[#2c2c2c] p-2 rounded-md"
                    onClick={() => setClicked(true)}
                  >
                    <EditIcon />
                    <span className="sr-only">Edit username</span>
                  </button>
                </div>
              </>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="flex w-full items-start justify-center gap-x-2 p-2 space-y-0">
                        <div className="w-full flex flex-col items-center space-y-2">
                          <FormControl>
                            <Input
                              autoFocus
                              {...field}
                              autoComplete="on"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Username"
                              className="border-none text-xl opacity-80 ps-5"
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
            <div className="w-[80%] bg-border h-[2px] ms-4"></div>
            <div className="w-full sm:ms-4 mt-2 p-2">
              <span className="text-md">
                Account created on{" "}
                <span className="font-bold text-base">
                  {new Date(createdAt || 0).toDateString()}
                </span>
              </span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
