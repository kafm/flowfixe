import {
  Heart,
  FillHeartFill,
  Square,
  Star,
  FillStarFill,
  HandThumbsUp,
  FillHandThumbsUpFill,
  Flag,
  FlagFill,
  CheckSquare,
} from "../icons";

export type BooleanDisplayProps = {
  value: boolean;
  variant?: string;
  color?: string;
};

const checked = (variant: string) => {
  switch (variant) {
    case "flag":
      return <FlagFill />;
    case "heart":
      return <FillHeartFill />;
    case "star":
      return <FillStarFill />;
    case "thumb":
        return <FillHandThumbsUpFill />
    default:
      return <CheckSquare />;
  }
};

const unchecked = (variant: string) => {
  switch (variant) {
    case "flag":
      return <Flag />;
    case "heart":
      return <Heart />;
    case "star":
      return <Star />;
    case "thumb":
      return <HandThumbsUp />;
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
