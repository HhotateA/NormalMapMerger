import { useRef, useState, useEffect } from "react";

export default function NormalMapMerger() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [imgData1, setImgData1] = useState<ImageData | null>(null);
  const [imgData2, setImgData2] = useState<ImageData | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [intensity, setIntensity] = useState<number>(1);

  useEffect(() => {
    if (imgData1 && imgData2 && canvasRef.current) {
      const width = Math.min(imgData1.width, imgData2.width);
      const height = Math.min(imgData1.height, imgData2.height);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      const dataSrc = imgData1.data;
      const dataDst = imgData2.data;
      const output = ctx.createImageData(width, height);
      const out = output.data;

      for (let i = 0; i < dataSrc.length; i += 4) {
        // src RGB をベクトルXYZとして解釈
        const src = [
          dataSrc[i] / 127.5 - 1,
          dataSrc[i + 1] / 127.5 - 1,
          dataSrc[i + 2] / 127.5 - 1
        ];

        // dst RGB をベクトルXYZとして解釈
        const dst = [
          dataDst[i] / 127.5 - 1,
          dataDst[i + 1] / 127.5 - 1,
          dataDst[i + 2] / 127.5 - 1
        ];

        const normalize = (v: number[]) => {
          const len = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2) || 1;
          return [v[0]/len, v[1]/len, v[2]/len];
        };
        const srcNorm = normalize(src);
        const dstNorm = normalize(dst);

        // Z軸(0,0,1) から dstNorm への回転とみなす
        // 回転軸を計算（右手系に従い dst -> Z への回転に変更 →逆方向）
        const axis = [-dstNorm[1], dstNorm[0], 0];
        const axisLen = Math.sqrt(axis[0]**2 + axis[1]**2 + axis[2]**2) || 1;
        const normAxis = [axis[0]/axisLen, axis[1]/axisLen, axis[2]/axisLen];

        const angle = Math.acos(dstNorm[2]);
        const dot = (a: number[], b: number[]) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
        const cross = (a: number[], b: number[]) => [
          a[1]*b[2] - a[2]*b[1],
          a[2]*b[0] - a[0]*b[2],
          a[0]*b[1] - a[1]*b[0]
        ];

        const rotate = (v: number[], axis: number[], angle: number) => {
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);
          const dotAV = dot(axis, v);
          const crossAV = cross(axis, v);
          return [
            v[0]*cosA + crossAV[0]*sinA + axis[0]*dotAV*(1 - cosA),
            v[1]*cosA + crossAV[1]*sinA + axis[1]*dotAV*(1 - cosA),
            v[2]*cosA + crossAV[2]*sinA + axis[2]*dotAV*(1 - cosA)
          ];
        };

        // srcNorm を dst の方向へ回転（強度付き）
        const result = normalize(rotate(srcNorm, normAxis, angle * intensity));

        // 正規化されたベクトルを RGB に戻す
        out[i]     = Math.round((result[0] + 1) * 127.5);
        out[i + 1] = Math.round((result[1] + 1) * 127.5);
        out[i + 2] = Math.round((result[2] + 1) * 127.5);
        out[i + 3] = 255;
      }

      ctx.putImageData(output, 0, 0);
      setDownloadUrl(canvas.toDataURL());
    }
  }, [imgData1, imgData2, intensity]);

  const handleImageLoad = async () => {
    if (!image1 || !image2 || !canvasRef.current) return;

    const img1 = await loadImage(image1);
    const img2 = await loadImage(image2);

    const width = Math.min(img1.width, img2.width);
    const height = Math.min(img1.height, img2.height);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img1, 0, 0, width, height);
    const data1 = ctx.getImageData(0, 0, width, height);

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img2, 0, 0, width, height);
    const data2 = ctx.getImageData(0, 0, width, height);

    setImgData1(data1);
    setImgData2(data2);
  };

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className="p-4 text-white bg-black min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">ノーマルマップ合成ツール</h1>
      <p className="mb-2">ノーマルマップを2枚読み込んで、ボタンを押してください。</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage1(e.target.files?.[0] || null);
          setDownloadUrl("");
        }}
        className="mb-2"
      />
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage2(e.target.files?.[0] || null);
          setDownloadUrl("");
        }}
        className="mb-2"
      />
      <br />
      <button
        onClick={handleImageLoad}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 mt-2"
      >
        画像を読み込む
      </button>
      <br />
      <label>
        強さ: {intensity.toFixed(2)}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={intensity}
          onChange={(e) => setIntensity(parseFloat(e.target.value))}
          className="mx-2 w-64"
        />
      </label>
      <div className="mt-4">
        <canvas ref={canvasRef} className="border border-gray-500"></canvas>
      </div>
      {downloadUrl && (
        <a
          href={downloadUrl}
          download="merged_normal.png"
          className="text-blue-400 underline block mt-4"
        >
          合成結果をダウンロード
        </a>
      )}
    </div>
  );
}
