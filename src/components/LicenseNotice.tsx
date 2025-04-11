/**
 * 出力画像に関するライセンス情報を表示するコンポーネント。
 * 商用利用や再配布の自由を明記し、CC0相当であることを強調。
 */
export default function LicenseNotice() {
    return (
      <section className="license-notice" style={{ marginTop: "2rem", fontSize: "0.95rem", lineHeight: "1.8" }}>
        <h3 style={{ color: "#66ccff" }}>利用規約（出力画像の商用利用について）</h3>
  
        <p>
          本ノーマルマップ合成ツールにより生成された画像（以下「出力画像」）は、下記の条件で自由にご利用いただけます。
        </p>
  
        <h4>✅ 利用可能な範囲</h4>
        <ul>
          <li>個人・法人問わず、自由に <strong>商用・非商用問わず利用・編集・再配布</strong> できます。</li>
          <li>出力画像の使用にあたり、<strong>クレジット表記や許諾申請は不要</strong> です。</li>
          <li>利用例：</li>
          <ul>
            <li>ゲーム開発、3DCG制作、動画編集、印刷物、教材など</li>
            <li>製品への同梱、商用サービスへの組み込み</li>
          </ul>
        </ul>
  
        <h4>❌ 禁止事項</h4>
        <ul>
          <li>本ツールの出力物を、第三者が作成したと偽る行為</li>
          <li>本ツール自体を改変・再配布し、有償提供する行為</li>
        </ul>
  
        <h4>⚠️ 免責事項</h4>
        <p>
          本ツールの使用により生じたいかなる損害・問題についても、開発者は一切責任を負いません。
          <br/>
          また、本ツールは予告なく仕様変更・停止される可能性があります。
        </p>
  
        <h4>🆓 ライセンス表記</h4>
        <p>
          必要な場合は、以下の表記をお使いください。
          <br/>
          <strong> NormalMapMerger by@HhotateA_xR </strong>
        </p>
      </section>
    );
  }
  