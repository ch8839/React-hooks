import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "./test1.module.less";

export const DotlottieTest1 = () => {
  const [dotLottie, setDotLottie] = useState(null);

  const dotLottieRefCallback = (dotLottie) => {
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
      <div className={styles.content}>hhhhh</div>
      <div className={styles.overlay}>
        <DotLottieReact
          src="/Animation2.json"
          loop
          // autoplay
          dotLottieRefCallback={dotLottieRefCallback}
          style={{ maxWidth: "600px" }}
        />
      </div>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
};
