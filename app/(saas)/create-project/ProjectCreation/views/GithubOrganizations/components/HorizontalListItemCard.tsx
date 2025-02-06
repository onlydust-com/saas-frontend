import { PenLine } from "lucide-react";
import { ComponentProps, ReactElement } from "react";

import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

interface HorizontalListItemCardProps {
  AvatarProps?: Partial<ComponentProps<typeof Avatar>>;
  ContainerProps?: Partial<ComponentProps<typeof Card>>;
  avatarUrl: string;
  title: string;
  linkUrl: string;
  linkClick?: () => void;
  linkIcon?: ReactElement;
  isExternalFlow?: boolean;
  disabled?: boolean;
  tooltip?: string;
  TitleComponent?: ReactElement;
}

const HorizontalListItemCard: React.FC<HorizontalListItemCardProps> = ({
  avatarUrl = "",
  title = "",
  linkUrl = "",
  linkClick,
  linkIcon = <PenLine />,
  isExternalFlow = true,
  disabled = false,
  TitleComponent,
}) => {
  return (
    <li>
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-6">
            <AvatarImage src={avatarUrl || ""} alt={title} />
          </Avatar>
          <span className="flex-1">{TitleComponent ? TitleComponent : title}</span>
          <Button size="sm" variant="secondary" data-testid="action-button" disabled={disabled} asChild>
            <a
              href={linkUrl}
              onClick={linkClick}
              target={isExternalFlow ? "_blank" : undefined}
              rel={isExternalFlow ? "noopener noreferrer" : undefined}
            >
              {linkIcon}
            </a>
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default HorizontalListItemCard;
