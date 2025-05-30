declare const gtag: (...args: any[]) => void;
import React from "react";


type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  downloadUrl: string;
};


/**
 * 合成結果のキャンバス表示とダウンロードリンク
 * 表示サイズは常に固定（512×512）でアスペクト比が崩れないようにする
 * 同時にGA4のイベントを飛ばす。
 */
export default function CanvasDisplay({ canvasRef, downloadUrl }: Props) {
  const handleDownloadClick = () => {
    if (typeof gtag !== "undefined") {
      const canvas = canvasRef.current;
      const resolution = canvas
        ? `${canvas.width}x${canvas.height}`
        : "unknown";
      window.gtag('event', 'download_normal_map', {
        event_category: 'normal_map_merger',
        event_label: resolution,
        value: 1
      });
    }
  };

  return (
    <div className="mt-4">
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} className="canvas" />
      </div>
      {downloadUrl && (
        <a
          href={downloadUrl}
          download="merged_normal.png"
          className="download-link"
          onClick={handleDownloadClick}
        >
          合成画像をダウンロード
        </a>
      )}
    </div>
  );
}
