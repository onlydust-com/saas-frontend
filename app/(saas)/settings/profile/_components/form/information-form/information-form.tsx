import { zodResolver } from "@hookform/resolvers/zod";
import { Globe } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Icon } from "@/design-system/atoms/icon";
import { ImageInput } from "@/design-system/molecules/image-input";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

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
            render={({ field: { onChange, name } }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormDescription>SVG, PNG, JPG or GIF (MAX. 400x400px).</FormDescription>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <ImageInput
                      name={name}
                      value={data?.avatarUrl}
                      onChange={onChange}
                      buttonProps={{
                        children: "Update",
                        classNames: { base: "w-16" },
                      }}
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
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your website" {...field} />
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
