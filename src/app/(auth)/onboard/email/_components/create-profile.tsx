"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";


web3AuthInstance

import { web3AuthInstance } from "@/app/app";
import { postServer } from "@/lib/data/post-api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import * as z from "zod";

export default function CreateProfile() {
  const profileFormSchema = z.object({
    display_name: z
      .string()
      .min(1, {
        message: "username is required",
      })
      .min(2, {
        message: "username is too short",
      })
      .max(20, {
        message: "max 20 characters"
      })
      .regex(/^\S*$/, { message: "weird things happening" }),
    email: z.string().email({
      message: "invalid email",
    }),
    verified: z.boolean().default(false),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {};

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();
  const { connector } = useAccount();
  const { data: session } = useSession();

  useEffect(() => {
    if (connector?.id == "web3auth") {
      const getInfo = async () => {
        const result = await web3AuthInstance?.getUserInfo();


        if (result?.email) {
          form.setValue("email", result.email);
          form.setValue("verified", true);
        }
      };

      getInfo();
    }
  }, [connector?.id, form]);

  async function sendVerification(data: ProfileFormValues) {
    setIsLoading(true);

    if (!session?.web3?.user?.wallet) {
      toast({
        title: "Error",
        description: "Please login to your account account. ",
        variant: "destructive",
      });
      setIsLoading(false);

      return;
    }

    if (!session?.web3?.accessToken) {
      toast({
        title: "Error",
        description: "Please login to your account account. ",
        variant: "destructive",
      });
      setIsLoading(false);
    }

    const credentials = {
      email: data.email,
      display_name: data.display_name,
      verified: data.verified,
      wallet: session.web3.user.wallet,
      login_method: connector?.id == "web3auth" ? "web3auth" : "metamask",
    };

    const result = await postServer("/users", JSON.stringify(credentials));

    if (!result) {
      toast({
        title: "something went wrong",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Succesfully created the account",
      description: "Please check your email for the verification link",
    });

    refresh();
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <h1 className="mb-3 text-heading_s text-primary">
          Verify Email
        </h1>

        <form
          onSubmit={form.handleSubmit(sendVerification)}
          className="my-8 space-y-8"
        >
          <h4 className="text-text-secondary text-body_s">
            Verify you email to reduce bots
          </h4>
          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription className="font-light">
                We will send the verification email to this address
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center w-full gap-2">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => {
                signOut();
                refresh();
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={
                isLoading || !form.watch("display_name") || !form.watch("email")
              }
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
