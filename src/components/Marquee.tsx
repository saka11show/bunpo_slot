type Props = {
  dim: boolean;
  blink: boolean;
};

export function Marquee({ dim, blink }: Props) {
  const className = [
    "marquee",
    dim ? "is-dim" : "",
    blink ? "is-blink" : "",
  ].join(" ");

  return (
    <section className={className}>
      <img
        src="/bunpo_slot/文法スロット.png"
        style={{ width: "100%", height: "100%" }}
        alt="文法スロット"
      />
    </section>
  );
}
