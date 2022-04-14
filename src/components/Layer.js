import React from "react";
import { ParallaxComponent } from "./ParallaxComponent";

export const Layer = () => {
  return (
    <div className="wrap-overlay">
      <ParallaxComponent type="sticked" />
      <ParallaxComponent type="rotated" />
      <ParallaxComponent />
      <ParallaxComponent type="rotated down" />
    </div>
  );
};
