import { IconRotateClockwise } from "@tabler/icons-react";

type SpinnerProps = {
  color?: string;
  size?: number;
};
export default function Spinner({ color, size = 16 }: SpinnerProps) {
  return (
    <IconRotateClockwise className="animate-spin" size={size} color={color} />
  );
}
