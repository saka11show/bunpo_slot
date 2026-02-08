type Props = {
    disabled: boolean;
    onLeverClick: () => void;
}

export function Lever({ disabled, onLeverClick}: Props) {
  return (
    <section className="lever">
      <div className="lever-title center"><h1>１回１コイン</h1></div>
      <button className="lever-button" disabled={disabled} onClick={onLeverClick}>lever</button>
    </section>
  );
}
