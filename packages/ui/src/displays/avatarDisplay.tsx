import { useEffect, useMemo, useState } from "react";
import Avatar from "../avatar";

export type AvatarDisplayProps = {
  label?: string;
  url?: string | (() => Promise<string | undefined>) | null;
  displayInitials?: boolean;
};

export const AvatarDisplay = ({
  label,
  url,
  displayInitials,
}: AvatarDisplayProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const initials = useMemo(() => {
    if (!displayInitials || !label) return label;
    let initials = label.split(" ") || []; //[...label.matchAll(/(\p{L}{1})\p{L}+/gu)]
    return (
      (initials.shift()?.[0] || "") + (initials.pop()?.[0] || "")
    ).toUpperCase();
  }, [displayInitials, label]);

  const setImageUrlFromCallback = async (
    url: () => Promise<string | undefined>
  ) => setImageUrl(await url());

  useEffect(() => {
    if (url && typeof url === "function") {
      setImageUrlFromCallback(url);
    } else {
      setImageUrl(url || undefined);
    }
  }, [url]);

  return (
    label && (
      <div className="ff-value-display ff-avatar-display" title={label}>
        <div>
          <Avatar src={imageUrl} name={initials} size="tiny"/>
        </div>
        <span className="ff-text-truncate">{label}</span>
      </div>
    )
  );
};
