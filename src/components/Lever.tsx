type Props = {
    disabled: boolean;
    onClick: () => void;
}

export function Lever({ disabled, onClick}: Props) {
  return (
    <section className="lever">
      <div className="lever-title center"><h1>１回１コイン</h1></div>
      <button className="lever-button" disabled={disabled} onClick={onClick}>lever</button>
    </section>
  );
}
