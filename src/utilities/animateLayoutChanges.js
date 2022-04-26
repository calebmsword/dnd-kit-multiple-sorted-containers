import { defaultAnimateLayoutChanges } from "@dnd-kit/sortable";

export const animateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;