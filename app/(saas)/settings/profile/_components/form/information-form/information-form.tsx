import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Icon } from "@/design-system/atoms/icon";
import { ImageInput } from "@/design-system/molecules/image-input";

import { Button } from "@/shared/ui/button";
import { CardDescription, CardTitle } from "@/shared/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

import { formSchema } from "../form.types";
import { formatData, formatToSchema } from "../form.utils";

export function InformationForm() {
  const { data } = MeReactQueryAdapter.client.useGetMyProfile({});

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset(formatData(data));
    }
  }, [data]);

  const { mutateAsync: uploadProfilePicture } = MeReactQueryAdapter.client.useUploadProfilePicture({});

  const { mutateAsync: replaceMyProfile, isPending: isReplacingMyProfile } =
    MeReactQueryAdapter.client.useReplaceMyProfile({});

  async function onSubmit({ avatarFile, ...data }: z.infer<typeof formSchema> & { avatarFile?: File }) {
    try {
      const fileUrl = avatarFile ? await uploadProfilePicture(avatarFile) : undefined;

      const profileData: z.infer<typeof formSchema> = {
        ...data,
        avatarUrl: fileUrl?.url || data.avatarUrl,
      };

      await replaceMyProfile(formatToSchema(profileData));
      toast.success("Profile updated");
    } catch {
      toast.error("Error updating profile");
    }
  }

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="avatarFile"
            render={({ field: { onChange, name } }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormDescription>SVG, PNG, JPG or GIF (MAX. 400x400px).</FormDescription>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <ImageInput
                      name={name}
                      onChange={onChange}
                      value={data?.avatarUrl}
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
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      <Input
                        placeholder="Enter your website"
                        {...field}
                        className="line-clamp-1 w-full text-ellipsis"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle>Contact information</CardTitle>
            <CardDescription>Please enter only your social networks handle (no links, no @ needed).</CardDescription>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="telegram.contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Enter your telegram handle" {...field} />
                      <FormField
                        control={form.control}
                        name="telegram.isPublic"
                        render={({ field: { value, onChange } }) => (
                          <Button type="button" variant="ghost" size="icon" onClick={() => onChange(!value)}>
                            <Icon component={value ? Eye : EyeOff} />
                          </Button>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin.contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Enter your linkedin handle" {...field} />
                      <FormField
                        control={form.control}
                        name="linkedin.isPublic"
                        render={({ field: { value, onChange } }) => (
                          <Button type="button" variant="ghost" size="icon" onClick={() => onChange(!value)}>
                            <Icon component={value ? Eye : EyeOff} />
                          </Button>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsapp.contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Enter your whatsapp handle" {...field} />
                      <FormField
                        control={form.control}
                        name="whatsapp.isPublic"
                        render={({ field: { value, onChange } }) => (
                          <Button type="button" variant="ghost" size="icon" onClick={() => onChange(!value)}>
                            <Icon component={value ? Eye : EyeOff} />
                          </Button>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter.contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Enter your twitter handle" {...field} />
                      <FormField
                        control={form.control}
                        name="twitter.isPublic"
                        render={({ field: { value, onChange } }) => (
                          <Button type="button" variant="ghost" size="icon" onClick={() => onChange(!value)}>
                            <Icon component={value ? Eye : EyeOff} />
                          </Button>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discord.contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discord</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Enter your discord handle" {...field} />
                      <FormField
                        control={form.control}
                        name="discord.isPublic"
                        render={({ field: { value, onChange } }) => (
                          <Button type="button" variant="ghost" size="icon" onClick={() => onChange(!value)}>
                            <Icon component={value ? Eye : EyeOff} />
                          </Button>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="w-fit" loading={isReplacingMyProfile}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
