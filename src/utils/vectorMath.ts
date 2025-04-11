/**
 * 任意の3次元ベクトルを正規化（長さ1にする）
 */
export const normalize = (v: number[]) => {
    const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2) || 1;
    return [v[0] / len, v[1] / len, v[2] / len];
  };
  
  /**
   * 2つのベクトルの内積（方向の類似度）
   */
  export const dot = (a: number[], b: number[]) =>
    a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  
  /**
   * 2つのベクトルの外積（垂直なベクトルを生成）
   */
  export const cross = (a: number[], b: number[]) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
  
  /**
   * ベクトルvを軸axisの周りにangleラジアン回転する（Rodriguesの回転公式）
   */
  export const rotate = (v: number[], axis: number[], angle: number) => {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const dotAV = dot(axis, v);
    const crossAV = cross(axis, v);
    return [
      v[0] * cosA + crossAV[0] * sinA + axis[0] * dotAV * (1 - cosA),
      v[1] * cosA + crossAV[1] * sinA + axis[1] * dotAV * (1 - cosA),
      v[2] * cosA + crossAV[2] * sinA + axis[2] * dotAV * (1 - cosA),
    ];
  };
  