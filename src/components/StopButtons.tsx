type Props = {
  disabled: boolean;
  spinningCols: boolean[];
  onStop: (colIndex: number) => void;
};

export function StopButtons({ disabled, spinningCols, onStop }: Props) {
  return (
    <section className="stop-buttons">
      <div className="dummy" aria-hidden="true" />
      {spinningCols.map((isColSpinning, i) => (
        <button
          key={i}
          className={`stop-button stop-${i}`}   // ★ここを変更
          disabled={disabled || !isColSpinning}
          onClick={() => onStop(i)}
        >
          STOP
        </button>
      ))}
    </section>
  );
}

