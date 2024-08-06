import { Translate } from "@/shared/translation/components/translate";

export default function TestPage() {
  return (
    <div>
      <Translate i18nKey={"very.deep.trad"} ns={"test"} /> <Translate i18nKey={"test:very.deep.trad"} />
    </div>
  );
}
