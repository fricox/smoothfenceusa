export type FenceType = "all" | "vinyl" | "aluminum" | "chain-link" | "wood";
export type PhotoTag = "finished" | "process" | "installation";

export type Photo = {
  id: number;
  title: string;
  titleEs: string;
  location: string;
  type: FenceType;
  tag: PhotoTag;
  src: string;
};
