import { useEffect } from "react";
import { normalize, dot, cross, rotate } from "../utils/vectorMath";

/**
 * ノーマルマップの合成を行う副作用フック。
 * intensity・src・dstが変わるたびに再計算。
 */
export function useNormalMapEffect(
  canvasRef: React.RefObject<HTMLCanvasElement | null>, 
  imgData1: ImageData | null,
  imgData2: ImageData | null,
  intensity: number,
  setDownloadUrl: (url: string) => void
) {
  useEffect(() => {
    if (!imgData1 || !imgData2 || !canvasRef.current) return;
    const width = Math.max(imgData1.width, imgData2.width);
    const height = Math.max(imgData1.height, imgData2.height);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dataSrc = imgData1.data;
    const dataDst = imgData2.data;
    const output = ctx.createImageData(width, height);
    const out = output.data;

    for (let i = 0; i < out.length; i += 4) {
      const src = [
        dataSrc[i] / 127.5 - 1,
        dataSrc[i + 1] / 127.5 - 1,
        dataSrc[i + 2] / 127.5 - 1,
      ];
      const dst = [
        dataDst[i] / 127.5 - 1,
        dataDst[i + 1] / 127.5 - 1,
        dataDst[i + 2] / 127.5 - 1,
      ];

      const srcNorm = normalize(src);
      const dstNorm = normalize(dst);

      const axis = cross([0, 0, 1], dstNorm); // ✅ 回転方向修正済
      const angle = Math.acos(Math.max(-1, Math.min(1, dot(dstNorm, [0, 0, 1]))));

      const result = normalize(rotate(srcNorm, normalize(axis), angle * intensity));

      out[i] = Math.round((result[0] + 1) * 127.5);
      out[i + 1] = Math.round((result[1] + 1) * 127.5);
      out[i + 2] = Math.round((result[2] + 1) * 127.5);
      out[i + 3] = 255;
    }

    ctx.putImageData(output, 0, 0);
    setDownloadUrl(canvas.toDataURL());
  }, [imgData1, imgData2, intensity]);
}
