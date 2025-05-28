import { Alert } from "@/design-system/molecules/alert";
import { BaseLink } from "@/shared/components/base-link/base-link";

export function AppMigrationBanner() {
  return (
    <div className="m-4">
      <Alert
        color="brand"
        title="The contributor app has moved"
        description={
          <span>
            Please visit{' '}
            <BaseLink href="https://contribute.onlydust.com">
              contribute.onlydust.com
            </BaseLink>{' '}
            to access the new experience. This version only allows reward withdrawal.
          </span>
        }
      />
    </div>
  );
}
