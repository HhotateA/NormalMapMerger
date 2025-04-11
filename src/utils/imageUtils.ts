/**
 * File から HTMLImageElement を生成（非同期）
 */
export const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(file);
    });
  };
  