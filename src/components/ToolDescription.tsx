/**
 * ノーマルマップ合成ツールの説明文コンポーネント。
 * 情報量はそのままに、見た目と文章を整えています。
 */
export default function ToolDescription() {
    return (
      <section className="tool-description" style={{ textAlign: "left", lineHeight: "1.8", marginTop: "2rem" }}>
        <h2>ノーマルマップ合成ツールを作りました（React + TypeScript + WebCanvas）</h2>
  
        <p>
          Unity などのゲームエンジンや 3DCG ツールで頻繁に使われる「ノーマルマップ」。
          モデルの表面の凹凸を、ポリゴン数を増やすことなく表現できるため非常に便利です。
          しかし、複数のノーマルマップを合成したい場面って、意外と多くありませんか？
        </p>
  
        <ul>
          <li>服の「大きなシワ」と「布地の質感」を一つにまとめたい</li>
          <li>地形の「丘やくぼみ」＋「岩の細かいディテール」を重ねたい</li>
        </ul>
  
        <p>
          そんな用途のために、ノーマルマップを合成できる Web ツールを作ってみました！
          ブラウザだけで完結し、インストール不要。
          React + TypeScript + WebCanvas で構成されています。
        </p>
  
        <h3>原理</h3>
        <p>
          ノーマルマップとは、「面の向き（法線）」を RGB 画像として表現したものです。
          一般に、R/G/B 成分が X/Y/Z に対応し、たとえば：
        </p>
  
        <ul>
          <li>(0, 0, 1) → 正面を向いている（＝真っ青）</li>
          <li>(1, 0, 0) → 右方向（赤っぽい）</li>
          <li>(0, 1, 0) → 上方向（緑っぽい）</li>
        </ul>
  
        <p>
          多くのノーマルマップが青みがかっているのは、「正面を向いた面」が多いからなんですね。
          では、「2つのノーマルマップを合成する」とはどういう意味か、もう少し掘り下げてみましょう。
        </p>
  
        <h3>具体例</h3>
        <p>ここでは以下のように用語を定義します：</p>
        <ul>
          <li><code>base_normal</code>：ベースとなる法線（例：布地）</li>
          <li><code>add_normal</code>：追加したい変化（例：しわ）</li>
          <li><code>result_normal</code>：合成結果</li>
        </ul>
  
        <p><strong>Case 1：両方とも正面</strong></p>
        <pre>
  base_normal = (0, 0, 1)  
  add_normal  = (0, 0, 1)  
  → result_normal = (0, 0, 1)
        </pre>
  
        <p><strong>Case 2：add_normal が正面</strong></p>
        <pre>
  base_normal = (0, 1, 0)（上向き）  
  add_normal  = (0, 0, 1)（正面）  
  → result_normal = (0, 1, 0)
        </pre>
        <p>add_normal は何も変化を加えないので、base_normal がそのまま使われます。</p>
  
        <p><strong>Case 3：add_normal による回転</strong></p>
        <pre>
  base_normal = (0, 0, 1)（正面）  
  add_normal  = (0, 1, 0)（上向き）  
  → result_normal = (0, 1, 0)
        </pre>
        <p>
          この場合、base_normal を「Z ベクトルを add_normal に向ける回転」で回転させることになります。
        </p>
  
        <h3>計算式</h3>
        <p>
          「Z ベクトルを add_normal に向ける回転」とは：
        </p>
        <ul>
          <li>回転軸：<code>axis = cross([0, 0, 1], add_normal)</code></li>
          <li>回転角：<code>angle = acos(dot([0, 0, 1], add_normal))</code></li>
          <li>適用：<code>rotate(base_normal, axis, angle × intensity)</code></li>
        </ul>
  
        <p>このようにして、全ピクセルで法線ベクトルを合成していきます。</p>
  
        <h3>あとがき</h3>
        <p>
          このツールは React の勉強を兼ねて制作しました。
          普段業務ではあまり触れない、ベクトル演算や Canvas 処理も含まれており、とても良いトレーニングになりました。
          デザインや UI 調整は ChatGPT に大きく助けられました。
        </p>
        <p>
          と、ここまで全部ChatGPTの出力物です。
        </p>
      </section>
    );
  }
  