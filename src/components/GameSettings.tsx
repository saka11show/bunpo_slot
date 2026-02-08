export function GameSettings() {
  return (
    <div className="settings">
      <div className="settingsTitle">ゲーム設定</div>

      <div className="settingsRow">
        <div className="settingsLabel">◇回転速度</div>
        <select className="settingsSelect" defaultValue="normal">
          <option value="slow">遅い</option>
          <option value="normal">普通</option>
          <option value="fast">速い</option>
        </select>
      </div>

      <div className="settingsRow">
        <div className="settingsLabel">◇STOP箇所</div>
        <select className="settingsSelect" defaultValue="3">
          <option value="6">無制限</option>
          <option value="3">3列</option>
          <option value="2">2列</option>
          <option value="1">1列</option>
        </select>
      </div>

      <div className="settingsRow">
        <div className="settingsLabel">◇音声</div>
        <select className="settingsSelect" defaultValue="off">
          <option value="on">オン</option>
          <option value="off">オフ</option>
        </select>
      </div>

      <button className="applyBtn" type="button">
        設定を反映
      </button>
    </div>
  );
}
