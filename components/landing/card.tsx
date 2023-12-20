"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import axios from "axios";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { pusherClient } from "@/lib/pusher";
import { User } from "@prisma/client";

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

const LandingCard = ({ name, id }: { name: string; id: string }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    if (name) {
      form.setValue("username", name);
    }
  }, [name, form]);

  useEffect(() => {
    const handler = (data: User) => {
      if (data.name) {
        setBtnLoading(false);
        router.push("/chat");
      }
    };

    pusherClient.subscribe(id);
    pusherClient.bind("user:update", handler);

    return () => {
      pusherClient.unsubscribe(id);
      pusherClient.unbind("user:update", handler);
    };
  }, [id, router]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setBtnLoading(true);
    axios.patch("/api/users/me", {
      name: values.username,
    });
    setTimeout(() => {
      setBtnLoading(false);
      router.push("/chat");
    }, 4000);
  }
  return (
    <div className="mt-4 p-4 sm:p-0 w-full sm:w-auto mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="min-w-[100px] p-4 sm:p-0 w-full sm:w-[350px] bg-[#1d1f1f] shadow-lg">
            <CardHeader>
              <CardDescription>What should we call you?</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full items-start justify-center gap-x-2 p-2 space-y-0">
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          className="uppercase font-bold text-sm text-zinc-300"
                          htmlFor="name"
                        >
                          USERNAME
                        </Label>
                        <Input
                          {...field}
                          autoFocus
                          disabled={btnLoading}
                          value={field.value}
                          onChange={field.onChange}
                          className="bg-[#1d1f1f]/70"
                          id="name"
                          placeholder="Your Username"
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="submit"
                variant={"ghost"}
                disabled={btnLoading}
                className="ms-auto border"
              >
                {btnLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default LandingCard;
