import React from "react";

export const DownLoading = ({ lang, progress }) => {
  function bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }
  return (
    <div className="loading">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loading__text">
        {lang}...{" "}
        <span className="loading__text--loaded">
          {progress.loaded && bytesToSize(progress.loaded)}
        </span>{" "}
        / {progress.total && bytesToSize(progress.total)}
      </div>
    </div>
  );
};
