export function SideHeader() {
  return (
    <div className="sideTopPanel">
      <div className="sideCoinRule">1回1コイン</div>

      <div className="walletBox">
        <div className="walletTitle">所持コイン</div>
        <div className="walletValue">
          <span aria-hidden="true">💰</span>
          <span>14</span>
        </div>
      </div>
    </div>
  );
}
