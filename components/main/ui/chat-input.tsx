"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Plus } from "lucide-react";
import { EmojiPicker } from "./emoji-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import axios from "axios";
import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";
import { cn, log } from "@/lib/utils";
import { useState } from "react";

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatInput = ({ conversationId }: { conversationId: string }) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleClick = () => {
    onOpen("messageFile", {
      apiUrl: "/api/messages",
      query: {
        conversationId: conversationId,
      },
    });
  };

  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
      setClicked((prev) => !prev);
    }
  };

  const loading = form.formState.isSubmitting;

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post("/api/messages", {
      text: values.content,
      conversationId: conversationId,
    });
    form.reset();
    router.refresh();
    log("[MESSAGE_SENT]", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full">
                <div className="flex items-center justify-center mt-auto mb-5 w-full pt-5">
                  <div className="flex items-center justify-center mx-auto w-full p-2 md:w-[80%] relative pt-2  border-t-2 max-h-[200px]">
                    <div className="absolute flex items-center justify-around left-0">
                      <div
                        tabIndex={0}
                        onKeyDown={keyDown}
                        aria-pressed={clicked}
                        aria-label="Add an attachment"
                        role="button"
                        className="ms-4 me-3 cursor-pointer hover:bg-[#e0dfdd] dark:hover:bg-[#1d1d1d] rounded transition focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-500"
                        onClick={handleClick}
                      >
                        <Plus />
                        <span className="sr-only">Add an attachment</span>
                      </div>
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(`${field.value} ${emoji}`)
                        }
                      />
                    </div>
                    <Label htmlFor="chat"></Label>
                    <Input
                      aria-required
                      aria-label="Type your message here"
                      className="px-20 py-6 bg-zinc-200/90 dark:bg-[#2c2c2c] border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 overflow-y-auto"
                      type="text"
                      id="chat"
                      placeholder="Message"
                      disabled={loading}
                      {...field}
                    />
                    <button
                      type="submit"
                      className={cn(
                        "absolute right-4 w-8 h-8 rounded hidden justify-center items-center bg-blue-600 transition hover:rounded-md hover:bg-blue-500",
                        field.value.length > 0 ? "flex" : "hidden"
                      )}
                    >
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
