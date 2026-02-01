export function Reels() {
  return (
    <>
      <div className="reelHeaderGrid">
        <div className="reelHeader reelHeader--stem">語幹</div>
        <div className="reelHeader reelHeader--mizen">未然形</div>
        <div className="reelHeader reelHeader--renyo">連用形</div>
        <div className="reelHeader reelHeader--shushi">終止形</div>
        <div className="reelHeader reelHeader--rentai">連体形</div>
        <div className="reelHeader reelHeader--izen">已然形</div>
        <div className="reelHeader reelHeader--meirei">命令形</div>
      </div>

      <div className="reelWindowGrid">
        <div className="reelWindow"><div className="reelChar">書</div></div>
        <div className="reelWindow"><div className="reelChar">か</div></div>
        <div className="reelWindow"><div className="reelChar">き</div></div>
        <div className="reelWindow"><div className="reelChar">く</div></div>
        <div className="reelWindow"><div className="reelChar">く</div></div>
        <div className="reelWindow"><div className="reelChar">け</div></div>
        <div className="reelWindow"><div className="reelChar">け</div></div>
      </div>
    </>
  );
}
