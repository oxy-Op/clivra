"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { EmojiPicker } from "./emoji-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    console.log(values);
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
                <div className="flex items-center justify-center mt-auto mb-5 w-full ">
                  <div className="flex items-center justify-center mx-auto w-[80%] relative pt-2  border-t-2">
                    <div className="absolute flex items-center justify-around left-0">
                      <Plus className="ms-2 me-3" />
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
                      className="px-20 py-6 bg-zinc-200/90 dark:bg-[#2c2c2c] border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                      type="text"
                      id="chat"
                      placeholder="Message"
                      {...field}
                    />
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
