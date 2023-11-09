"use client";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/chatGPTComponenets/heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clipboard, Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/constant";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import Loader from "@/components/chatGPTComponenets/loader";
import Empty from "@/components/chatGPTComponenets/empty";
import UserAvatar from "@/components/chatGPTComponenets/user-avatar";
import BotAvatar from "@/components/chatGPTComponenets/bot-avatar";
import { toast } from "react-toastify";

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
    } finally {
      router.refresh();
    }
  };
  const copyCode = () => {
    try {
      const codeBlock = document.querySelector(".bg-gray-700 code");
      if (codeBlock) {
        const range = document.createRange();
        range.selectNode(codeBlock);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
        document.execCommand("copy");
        window.getSelection()?.removeAllRanges();

        toast.success("Code successfully copied", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        console.error("Code block not found.");
      }
    } catch (error) {
      console.error("Error copying code:", error);
    }
  };
  return (
    <div className="ml-72">
      <Heading
        title="Code Generation"
        description="Generate code using descriptive act"
        icon={Code}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? " bg-white border border-black/10 "
                    : " bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-gray-700 p-2 rounded-lg">
                        <Button
                          className="w-21 h-8 text-white mb-2 flex justify-between hover:bg-gray-800"
                          onClick={() => copyCode()}
                        >
                          <Clipboard width={15} height={20}/>
                          <p>CopyCode</p>
                        </Button>
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ ...props }) => (
                      <code className="bg-gray-700 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-m font-semibold overflow-hidden leading-7"
                >
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
