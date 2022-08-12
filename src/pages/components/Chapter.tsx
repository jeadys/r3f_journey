import React from "react";
import Link from "next/link";

type ChapterProps = {
  chapter: string;
};

export default function Chapter({ chapter }: ChapterProps) {
  return <h2 className="font-bold text-2xl mb-5">{chapter}</h2>;
}
