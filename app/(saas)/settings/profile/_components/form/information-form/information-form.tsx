import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

import { formSchema } from "../form.types";
import { formatData } from "../form.utils";

export function InformationForm() {
  const { data } = MeReactQueryAdapter.client.useGetMyProfile({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: uploadProfilePicture } = MeReactQueryAdapter.client.useUploadProfilePicture({
    options: {
      onSuccess: data => {
        form.setValue("avatarUrl", data.url);
      },
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(formatData(data));
    }
  }, [data]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-12 rounded-xl">
                      {value ? (
                        <AvatarImage src={value} alt="Profile" />
                      ) : (
                        <AvatarFallback className="rounded-xl">{data?.login.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];

                        if (file) {
                          console.log(file);
                          uploadProfilePicture(file);
                        }
                      }}
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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
