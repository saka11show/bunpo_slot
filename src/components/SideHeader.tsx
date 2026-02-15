type Props = {
  coins: number;
};

export function SideHeader({ coins }: Props) {
  return (
    <section className="side-header">
      <div className="coin-status-title center">
        <h2>所持コイン</h2>
      </div>
      <div className="coin-status center">
        <h1>{coins}</h1>　コイン
      </div>
    </section>
  );
}
