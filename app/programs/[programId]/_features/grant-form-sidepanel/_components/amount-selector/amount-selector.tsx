import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { useParams } from "next/navigation";
import { RefObject, useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";

export function AmountSelector({ portalRef }: { portalRef: RefObject<HTMLDivElement> }) {
  const { programId } = useParams<{ programId: string }>();
  const [isOpen, setIsOpen] = useState(false);

  // const { data, isLoading, isError } = ProgramReactQueryAdapter.client.useGetProgramById({
  //   pathParams: {
  //     programId,
  //   },
  //   options: {
  //     enabled: Boolean(programId),
  //   },
  // });

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  // if (isLoading) return "LOADING";
  //
  // if (isError) return "ERROR";
  //
  // if (!data) return null;

  return (
    <div className={"grid gap-4 py-4"}>
      <div className={"grid gap-2"}>
        <div className={"grid grid-cols-2 items-center"}>
          <input
            type="text"
            className={"flex bg-transparent text-right text-5xl font-medium text-text-1 outline-none"}
            value={0}
          />
          <Typo
            size={"5xl"}
            weight={"medium"}
            color={"text-1"}
            classNames={{ base: "border-l-2 border-brand-2 pl-1 ml-1" }}
          >
            STRK
          </Typo>
        </div>
        <Typo size={"m"} color={"text-2"} classNames={{ base: "text-center" }}>
          2435235 USD
        </Typo>
      </div>

      <div>
        <div className={"flex w-full justify-center"}>
          <Button
            variant={"secondary-light"}
            size={"l"}
            onClick={handleOpen}
            endIcon={{ name: "ri-arrow-down-s-line" }}
          >
            <AvatarDescription
              avatarProps={{ src: "", size: "s" }}
              labelProps={{
                children: "Starknet • 1000 STRK",
              }}
            />
          </Button>
        </div>

        <Modal
          classNames={{
            wrapper: "w-full h-full",
            base: "!rounded-b-none w-full max-w-full !mx-auto p-3 bg-container-4 border-container-stroke-separator rounded-xl",
            header: "flex items-center justify-between gap-3 p-0",
            body: "py-3 px-0 gap-3",
          }}
          isOpen={isOpen}
          onOpenChange={isModalOpen => (!isModalOpen ? handleClose() : null)}
          hideCloseButton
          placement={"bottom"}
          backdrop={"transparent"}
          portalContainer={portalRef?.current ?? document.body}
        >
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader>
                  <Typo
                    variant={"brand"}
                    size={"2xl"}
                    translate={{ token: "programs:grantForm.amountSelector.title" }}
                  />

                  <Button
                    variant={"secondary-light"}
                    size={"l"}
                    hideText
                    startIcon={{ name: "ri-close-line" }}
                    onClick={onClose}
                  />
                </ModalHeader>

                <ModalBody>
                  <div className="grid gap-2">
                    {/*{data.totalAvailable.totalPerCurrency?.map(currency => {*/}
                    {/*  return (*/}
                    {/*    <CardBudget*/}
                    {/*      key={currency.currency.id}*/}
                    {/*      amount={{*/}
                    {/*        value: currency.amount,*/}
                    {/*        currency: currency.currency,*/}
                    {/*        usdEquivalent: currency.usdEquivalent,*/}
                    {/*      }}*/}
                    {/*    />*/}
                    {/*  );*/}
                    {/*})}*/}
                    <CardBudget
                      {...{
                        amount: {
                          value: 100000,
                          currency: {
                            id: "",
                            code: "USDC",
                            name: "USD Coin",
                            logoUrl: undefined,
                            decimals: 2,
                          },
                          usdEquivalent: 100000,
                        },
                        tag: "Starknet",
                      }}
                    />
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
