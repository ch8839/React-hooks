import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export const EmblaCarouselExp1: React.FC = () => (
  <>
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </>
);
