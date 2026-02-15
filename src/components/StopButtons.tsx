type Props = {
  disabled: boolean;
  spinningCols: boolean[];
  onStop: (colIndex: number) => void;
};

export function StopButtons({ disabled, spinningCols, onStop }: Props) {
  return (
    <section className="stop-buttons">
      <div className="dummy" aria-hidden="true"/>
      {spinningCols.map((isColSpinning, i) => (
        <button
          key={i}
          className="stop-button"
          disabled={disabled || !isColSpinning} // 回転中の列だけ押せる
          onClick={() => onStop(i)}
        >
          STOP
        </button>
      ))}
    </section>
  );
}
