import React from "react";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  downloadUrl: string;
};

/**
 * 合成結果のキャンバス表示とダウンロードリンク
 * 表示サイズは常に固定（512×512）でアスペクト比が崩れないようにする
 */
export default function CanvasDisplay({ canvasRef, downloadUrl }: Props) {
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
        >
          合成画像をダウンロード
        </a>
      )}
    </div>
  );
}
