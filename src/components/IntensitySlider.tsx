import { useState } from "react";

type Props = {
  value: number;
  onChange: (v: number) => void;
};

/**
 * 合成強さスライダー
 * - スライド中は反映しない
 * - 指を離した/マウスを離した瞬間に値を確定して処理を呼ぶ
 */
export default function IntensitySlider({ value, onChange }: Props) {
  const [tempValue, setTempValue] = useState<number>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(parseFloat(e.target.value));
  };

  const commitValue = () => {
    onChange(tempValue); // 値確定時にのみロジック実行
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <label>
        強さ: {tempValue.toFixed(2)}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={tempValue}
          onChange={handleChange}
          onMouseUp={commitValue}
          onTouchEnd={commitValue}
          className="mx-2 w-64"
        />
      </label>
    </div>
  );
}
