type Props = {
    onLoadSrc: (file: File | null) => void;
    onLoadDst: (file: File | null) => void;
    onConfirm: () => void;
  };
  
  /**
   * ファイル選択用UI
   * - 画像を選択すると即座に onLoadXXX が呼ばれる
   */
  export default function FileUploader({ onLoadSrc, onLoadDst }: Props) {
    return (
      <div className="mb-4">
        <p className="mb-2">合成元となる、2枚のノーマルマップを選択してください。</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onLoadSrc(e.target.files?.[0] || null)}
        />
    
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onLoadDst(e.target.files?.[0] || null)}
          className="mt-1"
        />
      </div>
    );
  }
  