import { useRef, useState } from "react";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

export function Lever({ disabled, onClick }: Props) {
  const [isPulled, setIsPulled] = useState(false);
  const t1 = useRef<number | null>(null);
  const t2 = useRef<number | null>(null);

  const handlePull = () => {
    if (disabled || isPulled) return;

    setIsPulled(true);

    // 見た目の「ガチャン」に少し遅れてゲーム開始
    t1.current = window.setTimeout(() => {
      onClick();
    }, 90);

    // 戻す
    t2.current = window.setTimeout(() => {
      setIsPulled(false);
    }, 240);
  };

  return (
    <section className="lever">
      <div className="lever-title center">１回１コイン</div>

      <div className={`lever-area ${disabled ? "is-disabled" : ""}`}>
        <button
          className={`lever-hitbox ${isPulled ? "is-pulled" : ""}`}
          onClick={handlePull}
          disabled={disabled}
          aria-label="レバー"
          type="button"
        >
          <div className="lever-body">
            <div className="lever-knob" />
            <div className="lever-rod" />
            <div className="lever-base">
              <div className="lever-socket" />
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}