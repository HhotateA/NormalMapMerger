import { useRef, useState, useEffect } from "react";
import { loadImage } from "../utils/imageUtils";
import { createBlueNormalImage } from "../utils/blueNormalImage";
import { useNormalMapEffect } from "../hooks/useNormalMapEffect";

import IntensitySlider from "./IntensitySlider";
import FileUploader from "./FileUploader";
import CanvasDisplay from "./CanvasDisplay";

import "../styles/normalMapMerger.css";

/**
 * アプリ全体のUIと状態管理を行うメインコンポーネント。
 * - 初期画像の生成
 * - ファイル選択による更新
 * - intensityスライダーによるリアルタイム反映
 */
export default function NormalMapMerger() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [imgData1, setImgData1] = useState<ImageData | null>(null);
  const [imgData2, setImgData2] = useState<ImageData | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [intensity, setIntensity] = useState<number>(1);

  // ノーマルマップ合成（リアクティブに反応）
  useNormalMapEffect(canvasRef, imgData1, imgData2, intensity, setDownloadUrl);

  /**
   * ファイルから画像を読み込み、ImageDataとして保存
   * ※ dstまたはsrc画像の解像度が大きい方に合わせる
   */
  const handleImageLoad = async () => {
    if (!image1 || !image2 || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img1 = await loadImage(image1);
    const img2 = await loadImage(image2);
    const width = Math.max(img1.width, img2.width);
    const height = Math.max(img1.height, img2.height);

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    ctx.drawImage(img1, 0, 0, width, height);
    const data1 = ctx.getImageData(0, 0, width, height);

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img2, 0, 0, width, height);
    const data2 = ctx.getImageData(0, 0, width, height);

    setImgData1(data1);
    setImgData2(data2);
  };

  // アプリ起動時に青いノーマルマップ画像を生成
  useEffect(() => {
    const blueImg = createBlueNormalImage(256);
    setImage1(blueImg);
    setImage2(blueImg);
  }, []);

  // 画像の変更時に自動的にImageDataを更新
  useEffect(() => {
    if (image1 && image2) {
      handleImageLoad();
    }
  }, [image1, image2]);

  return (
    <div className="container">
      <h1>ノーマルマップ合成ツール（NormalMapMerger）</h1>
      <FileUploader
        onLoadSrc={setImage1}
        onLoadDst={setImage2}
        onConfirm={handleImageLoad}
      />
      <IntensitySlider value={intensity} onChange={setIntensity} />
      <br/>
      <CanvasDisplay canvasRef={canvasRef} downloadUrl={downloadUrl} />
    </div>
  );
}
