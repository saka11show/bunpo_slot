export function GameSettings() {
  return (
    <section className="game-settings">
      <div className="setting-title center"><h2>ゲーム設定</h2></div>

      <div className="setting">
        <div className="setting-label">◇回転速度</div>
        <select className="setting-select" defaultValue="normal">
          <option value="slow">遅い</option>
          <option value="normal">普通</option>
          <option value="fast">速い</option>
        </select>
      </div>

      <div className="setting">
        <div className="setting-label">◇STOP箇所</div>
        <select className="setting-select" defaultValue="3">
          <option value="6">無制限</option>
          <option value="3">3列</option>
          <option value="2">2列</option>
          <option value="1">1列</option>
        </select>
      </div>

      <div className="setting">
        <div className="setting-label">◇音声</div>
        <select className="setting-select" defaultValue="off">
          <option value="on">オン</option>
          <option value="off">オフ</option>
        </select>
      </div>

      <button className="setting-button" type="button">
        設定を反映
      </button>
    </section>
  );
}
