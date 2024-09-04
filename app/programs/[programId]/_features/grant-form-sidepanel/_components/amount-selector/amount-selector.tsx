import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { ChangeEvent, useRef, useState } from "react";

import { AmountSelectorProps } from "@/app/programs/[programId]/_features/grant-form-sidepanel/_components/amount-selector/amount-selector.types";

import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";

import { cn } from "@/shared/helpers/cn";

export function AmountSelector({
  portalRef,
  amount,
  onAmountChange,
  budget,
  allBudgets,
  onBudgetChange,
}: AmountSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { amount: formattedBudgetAmount } = moneyKernelPort.format({
    amount: budget.amount,
    currency: budget.currency,
  });
  const { amount: formattedUsdAmount } = moneyKernelPort.format({
    amount: parseFloat(amount) * (budget?.usdConversionRate ?? 0),
    currency: budget.currency,
  });

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleFocusInput() {
    inputRef.current?.focus();
  }

  function handleChangeAmount(e: ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    // Only allow numbers and one dot
    value = value.replace(/[^\d.]/g, "");

    if (value.length > 1 && value.startsWith("0")) {
      value = value.slice(1);
    }

    onAmountChange(value || "0");
  }

  function handleChangeBudget(budget: DetailedTotalMoneyTotalPerCurrency) {
    onBudgetChange(budget);
    handleClose();
  }

  return (
    <div className={"grid w-full gap-4 py-4"}>
      <div className={"grid gap-2"}>
        <div
          className={cn("mx-auto flex items-center gap-1 text-lg", {
            "text-xl": amount.length < 22,
            "text-2xl": amount.length < 18,
            "text-3xl": amount.length < 13,
            "text-4xl": amount.length < 10,
            "text-5xl": amount.length < 7,
          })}
        >
          <input
            ref={inputRef}
            type="text"
            style={{ width: Math.min(Math.max(amount.length, 2), 50) + "ch" }}
            className={"text-text-1 flex bg-transparent text-right font-medium outline-none"}
            value={amount}
            onChange={handleChangeAmount}
          />
          <div onClick={handleFocusInput}>
            <span className={"text-text-1 font-medium"}>{budget.currency.code}</span>
          </div>
        </div>
        <Typo size={"m"} color={"text-2"} classNames={{ base: "text-center" }}>
          {formattedUsdAmount} USD
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
              avatarProps={{ src: budget.currency.logoUrl, alt: budget.currency.name, size: "s" }}
              labelProps={{
                children: `${budget.currency.name} • ${formattedBudgetAmount} ${budget.currency.code}`,
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
                    {allBudgets?.map(budget => {
                      return (
                        <CardBudget
                          key={budget.currency.id}
                          amount={{
                            value: budget.amount,
                            currency: budget.currency,
                            usdEquivalent: budget.usdEquivalent ?? 0,
                          }}
                          tag={budget.currency.name}
                          onClick={() => handleChangeBudget(budget)}
                        />
                      );
                    })}
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
