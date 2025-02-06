import { useRouter } from "next/navigation";
import { PropsWithChildren, useMemo, useState } from "react";
import { toast } from "sonner";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";
import { BillingProfileType, BillingProfileTypeUnion } from "@/core/domain/billing-profile/billing-profile.types";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";

export function CreateBillingProfile({
  children,
  redirectToProfile,
}: PropsWithChildren<{ redirectToProfile?: boolean }>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<BillingProfileTypeUnion>();

  const { data } = BillingProfileReactQueryAdapter.client.useGetMyBillingProfiles({});

  const myBillingProfiles = useMemo(() => data?.billingProfiles ?? [], [data]);

  const hasIndividualProfile = useMemo(() => {
    return myBillingProfiles.some(profile => profile.isBillingProfileIndividual());
  }, [myBillingProfiles]);

  const { mutate, isPending } = BillingProfileReactQueryAdapter.client.useCreateBillingProfile({
    options: {
      onSuccess: data => {
        toast.success("Billing profile created successfully");
        setOpen(false);

        if (redirectToProfile) {
          router.push(NEXT_ROUTER.settings.billingProfiles.generalInformation.root(data.id));
        }
      },
      onError: () => {
        toast.error("Failed to create billing profile");
      },
    },
  });

  const disabled = useMemo(() => !type || !name, [type, name]);

  function handleChangeType(value: BillingProfileTypeUnion) {
    setType(value);
  }

  function handleChangeName(value: string) {
    setName(value);
  }

  function handleCreateBillingProfile() {
    if (type && name) {
      mutate({
        type,
        name,
      });
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Add billing profile</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Which type of profile is relevant to you?</CardTitle>
              <CardDescription>
                You can create multiple billing profiles if necessary. Also don’t worry about picking the wrong type,
                you can update your setup anytime.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <RadioGroup onValueChange={handleChangeType} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={BillingProfileType.Individual}
                      id={BillingProfileType.Individual}
                      disabled={hasIndividualProfile}
                    />
                    <Label
                      htmlFor={BillingProfileType.Individual}
                      className={hasIndividualProfile ? "text-muted-foreground" : ""}
                    >
                      Individual
                    </Label>
                  </div>
                  <ul className="list-disc pl-10 text-sm text-muted-foreground">
                    <li>When you don’t have a legal structure</li>
                    <li>The annual reward amount is limited based on your tax residency.</li>
                    <li>Requires identity verification</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={BillingProfileType.SelfEmployed} id={BillingProfileType.SelfEmployed} />
                    <Label htmlFor={BillingProfileType.SelfEmployed}>Self-employed</Label>
                  </div>
                  <ul className="list-disc pl-10 text-sm text-muted-foreground">
                    <li>When you have a legal structure for yourself</li>
                    <li>Requires business verification</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={BillingProfileType.Company} id={BillingProfileType.Company} />
                    <Label htmlFor={BillingProfileType.Company}>Organisation</Label>
                  </div>
                  <ul className="list-disc pl-10 text-sm text-muted-foreground">
                    <li>When you have a legal structure</li>
                    <li>When you manage a team of contributors</li>
                    <li>Requires business verification</li>
                  </ul>
                </div>
              </RadioGroup>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Give your billing profile a name</Label>
                <Input
                  type="name"
                  id="name"
                  placeholder="Billing profile name"
                  onChange={e => handleChangeName(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </ScrollArea>

        <SheetFooter>
          <Button onClick={handleCreateBillingProfile} loading={isPending} disabled={disabled}>
            Create billing profile
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
