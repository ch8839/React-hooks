import React, { useState, useEffect } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import styles from "./test1.module.less";

export const DotlottieTest2 = () => {
  return (
    <AnimatedOverlay src="/Animation3.json" autoplay={true} autoClose={false}>
      <div className={styles.content}>hhhhh</div>
    </AnimatedOverlay>
  );
};

interface AnimatedOverlayProps {
  src: string; // .lottie 动画路径
  autoplay?: boolean;
  autoClose?: boolean;
  loop?: boolean;
  children: React.ReactNode;
  onAnimationEnd?: () => void;
}

enum Status {
  Completed = "completed",
}
const AnimatedOverlay: React.FC<AnimatedOverlayProps> = (props) => {
  const { src, autoplay, loop, autoClose, children, onAnimationEnd } = props;
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [status, setStatus] = useState("idle");

  const onComplete = () => {
    console.log(">>>Completed");
    setStatus(Status.Completed);
    onAnimationEnd?.()
  };

  const displayOverlay = !autoClose || status !== Status.Completed

  useEffect(() => {
    dotLottie?.addEventListener("complete", onComplete);
    return () => {
      dotLottie?.removeEventListener("complete", onComplete);
    };
  }, [dotLottie]);

  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    console.log(">>>dotLottie", dotLottie);
    setDotLottie(dotLottie);
  };

  function play() {
    if (dotLottie) {
      dotLottie?.play();
    }
  }

  function pause() {
    if (dotLottie) {
      dotLottie?.pause();
    }
  }

  return (
    <div className={styles.container}>
      {children}
      { displayOverlay && (
        <div className={styles.overlay}>
          <DotLottieReact
            src={src}
            loop={loop}
            autoplay={autoplay}
            dotLottieRefCallback={dotLottieRefCallback}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
};
