export interface LabelSelectorProps {
  selectedLabels?: { id: string; mixed: boolean }[];
  onAction?: (id: string, isSelected: boolean, isMixed: boolean) => void;
}
