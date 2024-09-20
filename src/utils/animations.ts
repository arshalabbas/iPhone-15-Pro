import gsap from "gsap";
import { MutableRefObject } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const animateWithGSAPTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: gsap.TweenVars
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};

export const animationWithGSAP = (
  target: string,
  animationProps?: gsap.TweenVars,
  scrollProps?: ScrollTrigger.Vars
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};
