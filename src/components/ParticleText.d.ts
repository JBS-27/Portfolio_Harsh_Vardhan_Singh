import type { CSSProperties, ReactElement } from "react";

type ProgressValue = number | { get(): number };

export type ParticleTextProps = {
  text?: string;
  fromText?: string;
  toText?: string;
  progress?: ProgressValue;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: "mount" | "hover" | "click";
  fontSize?: number | string;
  fontWeight?: number | string;
  fontFamily?: string;
  fromFontSize?: number | string;
  toFontSize?: number | string;
  fromFontWeight?: number | string;
  toFontWeight?: number | string;
  fromFontFamily?: string;
  toFontFamily?: string;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
};

declare function ParticleText(props: ParticleTextProps): ReactElement;
export default ParticleText;
