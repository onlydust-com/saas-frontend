import { Generator } from "@/shared/components/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "@/shared/components/seo/image-metadata/generic/image-metadata";

export default async function Image() {
  return Generator({
    children: <GenericImageMetadata />,
  });
}
