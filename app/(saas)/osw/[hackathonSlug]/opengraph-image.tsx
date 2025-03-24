import { Generator } from "@/shared/components/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "@/shared/components/seo/image-metadata/generic/image-metadata";
import { HackathonImageMetadata } from "@/shared/components/seo/image-metadata/hackathons/image-metadata";

export default async function Image(props: { params: { hackathonSlug: string } }) {
  try {
    const hackathonData = await fetch(
      `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}/api/v1/hackathons/slug/${props.params.hackathonSlug}`
    ).then(res => res.json());

    return Generator({
      children: (
        <HackathonImageMetadata
          name={hackathonData?.title}
          description={hackathonData?.description}
          imageUrl={hackathonData?.bannerUrl}
        />
      ),
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
