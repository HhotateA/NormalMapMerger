/**
 * デフォルトの青いノーマルマップ (128,128,255) を描画した File を返す
 * @param size 画像の幅と高さ（正方形）
 * @returns File（PNG形式）
 */
export const createBlueNormalImage = (size: number = 256): File => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
  
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "rgb(128,128,255)";
    ctx.fillRect(0, 0, size, size);
  
    const dataUrl = canvas.toDataURL("image/png");
    const blob = dataURLToBlob(dataUrl);
    return new File([blob], "blue_normal.png", { type: "image/png" });
  };
  
  /**
   * Data URL を Blob に変換するユーティリティ関数
   */
  const dataURLToBlob = (dataurl: string): Blob => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
    return new Blob([u8arr], { type: mime });
  };
  