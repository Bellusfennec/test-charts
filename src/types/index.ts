export interface ObjectData {
  [key: string]: any;
}
export interface ChartData {
  name: string;
  value: number;
  color?: string;
}
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type FiledVariant = "default" | "filled" | "unstyled";
export type RadioFiledVariant = "filled" | "outline";
