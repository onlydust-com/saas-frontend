import { TestTranslate } from "@/app/test/test.translate";

import { Translate } from "@/shared/i18n/translate";

export default function TestPage() {
  return (
    <TestTranslate>
      <div>
        <Translate i18nKey={"very.deep.trad"} ns={"test"} />
      </div>
    </TestTranslate>
  );
}
