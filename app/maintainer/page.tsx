import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function MaintainerPage() {
  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"maintainer:list.header.title"} />,
          },
        ],
      }}
    >
      <ScrollView>
        <PageContent>
          <div>content</div>
        </PageContent>
      </ScrollView>
    </PageWrapper>
  );
}
