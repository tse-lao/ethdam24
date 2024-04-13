"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormInlineItem,
  FormInlineLabel,
  FormMessage,
} from "@/components/ui/form";


import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import MediaUploader from "@/components/extra/media-uploader";
import { postServer } from "@/lib/data/post-api";
import { uploadContent } from "@/lib/upload";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CreateTeamForm = () => {
  // --- Text & Labels ---
  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    description: "",
  };

  const profileFormSchema = z.object({
    //   certification_number: z.string().refine((data) => data === code, {
    //    message: "Invalid code",
    //  }),
    name: z
      .string()
      .min(2, {
        message: "Your groups name must be at least 2 characters.",
      })
      .max(30, {
        message: "Your groups name must not be longer than 30 characters.",
      }),
    description: z.string().max(4000).min(4),
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [icon, setIcon] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Dialog
  const [requestedCreate, onRequestedCreate] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    let image = "" as any;

    if (icon) {
      image = await uploadContent(icon);
    }

    //const urls = data?.urls?.map((url) => url.value);

    const result = await postServer('/clubs', JSON.stringify({
      image: image,
      name: data.name,
      description: data.description,
      type: "dao",
      urls: [],
    }));

    if (result.status === "success") {
      toast({
        title: "Success",
        description: "Group created successfully",
      });

      router.push(`/club/${result.data.id}`);
    } else {
      if (!result.ok) {
        if (result.messageCode === "group_name_already_exists") {
          toast({
            description: "Group name already exists",
          });
        } else {
          toast({
            description: result.message,
          });
        }

        setIsLoading(false);
        return;
      }
    }
  }

  const selectIcon = (file: File | null, base64: string | null) => {
    setIcon(file);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center space-y-8"
        >
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInlineItem className="items-start">
                  <FormInlineLabel className="mt-5">
                    Club name
                    <span className="ml-1 text-state-error">*</span>
                  </FormInlineLabel>

                  <div className="grow">
                    <FormControl className="mb-2">
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormInlineItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormInlineItem className="items-start">
                  <FormInlineLabel>
                    Description
                    <span className="ml-1 text-state-error">*</span>
                  </FormInlineLabel>

                  <div className="grow">
                    <FormControl className="mb-1">
                      <Textarea
                        placeholder="Enter your description"
                        className="p-4 resize-none min-h-[132px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormInlineItem>
              )}
            />

            <FormInlineItem className="items-start">
              <FormInlineLabel className="justify-start">Image</FormInlineLabel>

              <MediaUploader
                key="icon"
                onFileSelected={selectIcon}
                width={140}
                height={140}
              >
                <div>
                  <div className="mb-1 text-title_s text-text-secondary">
                    Enter the image your want to upload
                  </div>

                  <li className="mb-1 text-text-placeholder text-label_s">
                    Image should be square
                  </li>
                </div>
              </MediaUploader>
            </FormInlineItem>
          </div>

          <div className="flex flex-col gap-2"></div>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              size="lg"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading || !form.formState.isValid}
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
