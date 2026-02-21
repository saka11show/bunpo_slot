type Props = {
  disabled: boolean;
  spinningCols: boolean[];
  onStop: (i: number) => void;
  manualStopsLeft: number;
};

export function StopButtons({ disabled, spinningCols, onStop, manualStopsLeft }: Props) {
  const cannotManualStop = manualStopsLeft <= 0;

  return (
    <section className="stop-buttons">
      <div className="dummy" aria-hidden="true" />
      {spinningCols.map((isColSpinning, i) => (
        <button
          key={i}
          className={`stop-button stop-${i}`}  // ★色クラス復活
          disabled={disabled || !isColSpinning || cannotManualStop}
          onClick={() => onStop(i)}
        >
          STOP
        </button>
      ))}
    </section>
  );
}