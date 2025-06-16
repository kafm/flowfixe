import {
  Heart,
  HeartSolid,
  Square,
  Star,
  StarSolid,
  ThumbsUp,
  WhiteFlag,
  WhiteFlagSolid,
  CheckSquare,
  ThumbsUpSolid,
} from "../icons";

export type BooleanDisplayProps = {
  value: boolean;
  variant?: string;
  color?: string;
};

const checked = (variant: string) => {
  switch (variant) {
    case "flag":
      return <WhiteFlagSolid />;
    case "heart":
      return <HeartSolid />;
    case "star":
      return <StarSolid />;
    case "thumb":
        return <ThumbsUpSolid />
    default:
      return <CheckSquare />;
  }
};

const unchecked = (variant: string) => {
  switch (variant) {
    case "flag":
      return <WhiteFlag />;
    case "heart":
      return <Heart />;
    case "star":
      return <Star />;
    case "thumb":
      return <ThumbsUp />;
    default:
      return <Square />;
  }
};

export const BooleanDisplay = ({
  value,
  variant = "square",
  color
}: BooleanDisplayProps) => (
  <div className="ff-value-display" style={{color}}>
    {value ? checked(variant) : unchecked(variant)}
  </div>
);
