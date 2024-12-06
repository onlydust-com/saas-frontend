import { Kbd } from "@nextui-org/kbd";
import { cn } from "@nextui-org/react";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, LucideIcon, Search, Star, User, X } from "lucide-react";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { GlobalSearchProvider, useGlobalSearch } from "@/shared/features/global-search/global-search.context";

import { GlobalSearchProps } from "./global-search.types";

function ModalContainer({ children }: PropsWithChildren) {
  const { isOpen } = useGlobalSearch();

  return (
    <div className={"fixed inset-0 z-[999999]"} style={{ pointerEvents: isOpen ? "auto" : "none" }}>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={"absolute inset-0 -z-[1] bg-background-overlay"}
            />
            <motion.div
              key="modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className={"absolute inset-0 z-[1] flex items-center justify-center"}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ModalPortal({ children }: PropsWithChildren) {
  return createPortal(<ModalContainer>{children}</ModalContainer>, document.body);
}
// transform-gpu bg-transparent backdrop-blur-md backdrop-filter before:pointer-events-none before:absolute before:inset-0 before:-z-[1] before:effect-bg-blur-shadow before:gradient-glass-neon-45
function MenuContainer({ children }: PropsWithChildren) {
  return (
    <div className={"w-full max-w-[730px] overflow-hidden rounded-xl bg-background-primary effect-box-shadow-sm"}>
      {children}
    </div>
  );
}

function Suggestion() {
  const { inputValue, suggestion: _suggestion } = useGlobalSearch();
  const suggestion = _suggestion?.toLocaleLowerCase().replace(inputValue?.toLocaleLowerCase() ?? "", "");

  if (!suggestion || !inputValue) return null;

  return (
    <p
      className={cn([
        "font-inter text-[1rem] font-normal leading-[1.5rem] text-typography-primary outline-none",
        "absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden",
      ])}
    >
      <span className={"opacity-0"}>{inputValue}</span>
      <span className={"shine-text"}>{suggestion}</span>
    </p>
  );
}

function Header() {
  const { t } = useTranslation("features");
  const { onOpenFilterChange, onOpenChange, inputValue, onInputChange } = useGlobalSearch();

  return (
    <div
      className={
        "relative flex h-14 w-full flex-row items-center justify-start gap-1 border-b border-b-border-primary px-3"
      }
    >
      <Icon component={Search} size={"md"} classNames={{ base: "text-typography-tertiary" }} />
      <div className={"relative flex flex-1"}>
        <input
          value={inputValue ?? ""}
          autoFocus={true}
          className={
            "h-full w-full border-none bg-transparent font-inter text-[1rem] font-normal leading-[1.5rem] text-typography-primary outline-none placeholder:text-typography-tertiary"
          }
          placeholder={t("globalSearch.modal.placeholder")}
          onChange={e => onInputChange(e.target.value)}
        />
        <Suggestion />
      </div>
      <div className={"flex flex-row items-center justify-end gap-1"}>
        <Button
          iconOnly={true}
          variant={"tertiary"}
          size={"sm"}
          startIcon={{ component: Filter }}
          onClick={() => onOpenFilterChange(false)}
        />
        <Button
          iconOnly={true}
          variant={"tertiary"}
          size={"sm"}
          startIcon={{ component: X }}
          onClick={() => onOpenChange(false)}
        />
      </div>
    </div>
  );
}

function ResultHighlight({ value }: { value?: string }) {
  const { inputValue } = useGlobalSearch();

  if (!value) return null;

  const parts = value.split(new RegExp(`(${inputValue})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === (inputValue ?? "").toLowerCase() ? (
          <span key={i} className={"text-utility-brand-crystalizedviolet-800"}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function ResultMetric({ icon, count }: { icon: LucideIcon; count: number }) {
  return (
    <div className="flex items-center gap-sm">
      <Icon component={icon} size="xxs" classNames={{ base: "text-foreground-quinary" }} />

      <Typo size="xs" weight="medium">
        {count}
      </Typo>
    </div>
  );
}

function Result({
  name,
  description,
  type,
  tags,
  metrics,
}: {
  name?: string;
  description?: string;
  type: "project" | "contributor";
  tags: string[];
  metrics: { icon: LucideIcon; count: number }[];
}) {
  return (
    <div
      className={
        "flex w-full flex-col justify-start gap-3 rounded-md px-4 py-3 group-hover/item:bg-background-primary-alt-hover group-data-[selected=true]/item:bg-background-primary-alt-hover"
      }
    >
      <div className="flex w-full flex-col justify-start gap-2">
        <div className="flex flex-row items-center justify-start gap-2">
          <Typo size="xl" color={"primary"}>
            <ResultHighlight value={name} />
          </Typo>
          <Badge translate={{ token: `features:globalSearch.result.type.${type}` }} size="xs" />
        </div>
        {metrics?.length ? (
          <div className="flex flex-row items-center justify-start gap-2">
            {metrics.map(({ icon, count }) => (
              <ResultMetric key={icon.toString()} icon={icon} count={count} />
            ))}
          </div>
        ) : null}

        <Typo size="sm" color={"secondary"}>
          <ResultHighlight value={description} />
        </Typo>
      </div>
      {tags?.length ? (
        <div className="flex w-full flex-row justify-start gap-2">
          {tags.map(tag => (
            <Badge key={tag} size="xs" shape="squared" color="grey">
              <ResultHighlight value={tag} />
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SafeGlobalSearch() {
  const { t } = useTranslation("features");

  return (
    <>
      <Input
        name={"global-search"}
        placeholder={t("globalSearch.menu.placeholder")}
        readOnly={true}
        canInteract={false}
        endContent={
          <Kbd
            keys={["command"]}
            classNames={{
              base: "bg-background-primary rounded-sm shadow-none",
            }}
          >
            K
          </Kbd>
        }
      />
      <ModalPortal>
        <MenuContainer>
          <Command>
            <Header />
            <div className={"h-[400px] overflow-hidden p-2"}>
              <ScrollView>
                <Command.List className="flex w-full flex-col gap-3 outline-none">
                  <Command.Item value="kakarot" className="group/item">
                    <Result
                      name="Kakarot"
                      description="Kakarot is the best project for kaka open source"
                      type="project"
                      tags={["typescript", "IA"]}
                      metrics={[
                        { icon: User, count: 100 },
                        { icon: Star, count: 100 },
                      ]}
                    />
                  </Command.Item>
                  <Command.Item value="starknet" className="group/item">
                    <Result
                      name="Starknet"
                      description="Kakarot is the best project for kaka open source"
                      type="project"
                      tags={["typescript", "IA"]}
                      metrics={[
                        { icon: User, count: 100 },
                        { icon: Star, count: 100 },
                      ]}
                    />
                  </Command.Item>
                </Command.List>
              </ScrollView>
            </div>
          </Command>
        </MenuContainer>
      </ModalPortal>
    </>
  );
}

export function GlobalSearch({ children }: GlobalSearchProps) {
  return (
    <GlobalSearchProvider>
      <SafeGlobalSearch />
    </GlobalSearchProvider>
  );
}
