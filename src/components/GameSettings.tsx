import { useState } from "react";

type StopLimit = 1 | 2 | 3 | 4 | 5 | 6;

type Props = {
  spinMs: number;
  onChangeSpinMs: (ms: number) => void;

  stopLimit: StopLimit;
  onChangeStopLimit: (n: StopLimit) => void;

  disabled: boolean;
  onApplied: (message: string) => void;
};

type SpeedKey = "slow" | "normal" | "fast";

const SPEED_TO_MS: Record<SpeedKey, number> = {
  slow: 1100,
  normal: 900,
  fast: 700,
};

const msToSpeedKey = (ms: number): SpeedKey => {
  if (ms <= SPEED_TO_MS.fast) return "fast";
  if (ms >= SPEED_TO_MS.slow) return "slow";
  return "normal";
};

const speedLabel = (s: SpeedKey) => (s === "slow" ? "遅い" : s === "fast" ? "速い" : "普通");
const stopLabel = (n: StopLimit) => (n === 6 ? "6（全）" : `${n}`);

export function GameSettings({
  spinMs,
  onChangeSpinMs,
  stopLimit,
  onChangeStopLimit,
  disabled,
  onApplied,
}: Props) {
  // App側の現在値から初期表示を決める
  const [speed, setSpeed] = useState<SpeedKey>(() => msToSpeedKey(spinMs));
  const [stop, setStop] = useState<StopLimit>(() => stopLimit);

  const apply = () => {
    if (disabled) return;

    const nextMs = SPEED_TO_MS[speed];
    const nextStop = stop;

    const changedSpin = nextMs !== spinMs;
    const changedStop = nextStop !== stopLimit;

    if (!changedSpin && !changedStop) {
      onApplied("設定は変更なし");
      return;
    }

    if (changedSpin) onChangeSpinMs(nextMs);
    if (changedStop) onChangeStopLimit(nextStop);

    const msgs: string[] = [];
    if (changedSpin) msgs.push(`回転速度：${speedLabel(speed)}`);
    if (changedStop) msgs.push(`STOP箇所：${stopLabel(nextStop)}`);

    onApplied(`設定を反映（${msgs.join(" / ")}）`);
  };

  return (
    <section className="game-settings">
      <div className="setting-title center">
        <h2>ゲーム設定</h2>
      </div>

      <div className="setting">
        <div className="setting-label">◇回転速度</div>
        <select
          className="setting-select"
          value={speed}
          onChange={(e) => setSpeed(e.target.value as SpeedKey)}
          disabled={disabled}
        >
          <option value="slow">遅い</option>
          <option value="normal">普通</option>
          <option value="fast">速い</option>
        </select>
      </div>

      <div className="setting">
        <div className="setting-label">◇STOP箇所</div>
        <select
          className="setting-select"
          value={stop}
          onChange={(e) => setStop(Number(e.target.value) as StopLimit)}
          disabled={disabled}
        >
          <option value={6}>6（全）</option>
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
      </div>

      <div className="setting">
        <div className="setting-label">◇音声</div>
        <select className="setting-select" defaultValue="off" disabled>
          <option value="on">オン</option>
          <option value="off">オフ</option>
        </select>
      </div>

      <button className="setting-button" type="button" onClick={apply} disabled={disabled}>
        設定を反映
      </button>
    </section>
  );
}