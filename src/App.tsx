import "./App.css";
import { targets as allTargets, type Target } from "./data/targets";
import { useEffect, useRef, useState } from "react";

import { TargetInfo } from "./components/TargetInfo";
import { Reels } from "./components/Reels";
import { StopButtons } from "./components/StopButtons";
import { Marquee } from "./components/Marquee";
import { SideHeader } from "./components/SideHeader";
import { GameSettings } from "./components/GameSettings";
import { Lever } from "./components/Lever";

export default function App() {
  // ===============================
  // 型定義
  // ===============================

  type ReelCell = { top: string; middle: string; bottom: string };

  type StopLimit = 1 | 2 | 3 | 4 | 5 | 6;

  // ===============================
  // 設定系
  // ===============================

  const [spinMs, setSpinMs] = useState(700);
  const [stopLimit, setStopLimit] = useState<StopLimit>(3);

  // ★演出（点滅）共通設定：CSSと合わせる
  const SUCCESS_BLINK_MS = 180;   // 0.18s と一致
  const SUCCESS_BLINK_COUNT = 10; // 10回点滅（好み）
  const SUCCESS_EFFECT_DURATION = SUCCESS_BLINK_MS * SUCCESS_BLINK_COUNT;


  // ★追加：出題グループの有効/無効
  type VerbGroup =
    | "四段"
    | "上二段"
    | "下二段"
    | "上一段"
    | "下一段"
    | "カ変"
    | "サ変"
    | "ナ変"
    | "ラ変";

  const [enabledGroups, setEnabledGroups] = useState<Record<VerbGroup, boolean>>({
    四段: true,
    上二段: true,
    下二段: true,
    上一段: true,
    下一段: true,
    カ変: true,
    サ変: true,
    ナ変: true,
    ラ変: true,
  });

  // ===============================
  // ゲーム状態
  // ===============================

  const [isSpinning, setIsSpinning] = useState(false);

  // ★追加：isSpinning を ref でも持つ（setState の非同期＆クロージャ対策）
  const isSpinningRef = useRef(false);
  useEffect(() => {
    isSpinningRef.current = isSpinning;
  }, [isSpinning]);

  const [coins, setCoins] = useState(10);
  const [result, setResult] = useState<null | "success" | "fail">(null);

  // ★追加：Marqueeの点滅演出用（resultとは分離する）
  const [marqueeBlink, setMarqueeBlink] = useState(false);
  const marqueeBlinkTimerRef = useRef<number | null>(null);

  const [manualStopsLeft, setManualStopsLeft] = useState(0);
  const manualStopsLeftRef = useRef(0);

  // ★追加：state と ref を同時に更新してズレを無くす
  const setManualStopsLeftSync = (value: number) => {
    manualStopsLeftRef.current = value;
    setManualStopsLeft(value);
  };

  useEffect(() => {
    manualStopsLeftRef.current = manualStopsLeft;
  }, [manualStopsLeft]);

  const autoStopTimersRef = useRef<number[]>([]);

  // ===============================
  // ターゲット
  // ===============================

  const [currentTarget, setCurrentTarget] = useState<Target>(allTargets[0]);
  const targetRef = useRef<Target>(allTargets[0]);

  const [reels, setReels] = useState<ReelCell[]>(
    Array.from({ length: 6 }, () => ({ top: "・", middle: "・", bottom: "・" }))
  );

  const [spinningCols, setSpinningCols] = useState<boolean[]>(
    Array(6).fill(false)
  );
  const spinningColsRef = useRef<boolean[]>(Array(6).fill(false));

  const timerRef = useRef<number | null>(null);

  const [hitMap, setHitMap] = useState<boolean[]>(Array(6).fill(false));

  const [stopFlash, setStopFlash] = useState<boolean[]>(Array(6).fill(false));
  const stopFlashTimersRef = useRef<Array<number | null>>(Array(6).fill(null));

  // ===============================
  // トースト
  // ===============================

  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 1500);
  };

  // ===============================
  // ユーティリティ
  // ===============================

  const shuffle = (arr: number[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const createInitialReels = (pool: string[]): ReelCell[] => {
    const n = pool.length;
    if (n === 0) {
      return Array.from({ length: 6 }, () => ({ top: "・", middle: "・", bottom: "・" }));
    }
    if (n === 1) {
      return Array.from({ length: 6 }, () => ({ top: pool[0], middle: pool[0], bottom: pool[0] }));
    }
    if (n === 2) {
      return Array.from({ length: 6 }, () => ({ top: pool[0], middle: pool[1], bottom: pool[0] }));
    }

    // n >= 3
    return Array.from({ length: 6 }, () => {
      const start = Math.floor(Math.random() * n);
      const top = pool[(start + n - 1) % n];
      const middle = pool[start];
      const bottom = pool[(start + 1) % n];
      return { top, middle, bottom };
    });
  };

  // ★追加：指定列の middle を「指定文字」に強制的に合わせる
  //（pool の並び順に合わせて top/bottom も整合させる）
  const forceMiddleTo = (colIndex: number, middleValue: string) => {
    const t = targetRef.current;
    const pool = t.pool;
    const idx = pool.indexOf(middleValue);

    if (idx < 0) {
      console.warn(
        "[forceMiddleTo] correct not in pool",
        { verb: t.verb, type: t.type, colIndex, middleValue, pool, correct: t.correct }
      );
      return false; // ★追加：成否を返す
    }

    const top = pool[(idx - 1 + pool.length) % pool.length];
    const bottom = pool[(idx + 1) % pool.length];

    setReels((prev) => {
      const next = [...prev];
      next[colIndex] = { top, middle: middleValue, bottom };
      return next;
    });

    return true;
  };

  // ===============================
  // 回転処理
  // ===============================

  const spinOnce = () => {
    setReels((prev) => {
      const cols = spinningColsRef.current;      // ★ここで最新を読む
      const pool = targetRef.current.pool;       // ★ここで最新を読む

      return prev.map((cell, i) => {
        if (!cols[i]) return cell;

        const currentBottom = pool.includes(cell.bottom) ? cell.bottom : pool[0];
        const nextIndex = (pool.indexOf(currentBottom) + 1) % pool.length;

        return {
          top: cell.middle,
          middle: cell.bottom,
          bottom: pool[nextIndex],
        };
      });
    });
  };

  const stopCol = (colIndex: number, mode: "manual" | "auto") => {
    if (!isSpinningRef.current) return;
    if (!spinningColsRef.current[colIndex]) return;
    if (mode === "manual" && manualStopsLeftRef.current <= 0) return;

    // ★最重要：ref を先に落とす（同期）
    spinningColsRef.current = spinningColsRef.current.map((v, i) =>
      i === colIndex ? false : v
    );

    // state は描画用に後追いでOK
    setSpinningCols((prev) => {
      const next = [...prev];
      next[colIndex] = false;
      return next;
    });

    if (mode === "manual") {
      const next = Math.max(0, manualStopsLeftRef.current - 1);
      setManualStopsLeftSync(next);
    }

    // 停止フラッシュ
    setStopFlash((prev) => {
      const next = [...prev];
      next[colIndex] = true;
      return next;
    });

    const old = stopFlashTimersRef.current[colIndex];
    if (old) window.clearTimeout(old);

    stopFlashTimersRef.current[colIndex] = window.setTimeout(() => {
      setStopFlash((prev) => {
        const next = [...prev];
        next[colIndex] = false;
        return next;
      });
      stopFlashTimersRef.current[colIndex] = null;
    }, 180);
  };

  const runAutoStopsFirst = (autoCount: number) => {
    // タイマー掃除
    autoStopTimersRef.current.forEach((id) => window.clearTimeout(id));
    autoStopTimersRef.current = [];

    // ★修正：先に手動禁止（ref/state 同期）
    setManualStopsLeftSync(0);

    // 自動停止がない場合は即解禁
    if (autoCount <= 0) {
      setManualStopsLeftSync(stopLimit);
      return;
    }

    // 自動で止める列をランダム抽選
    const cols = shuffle([0, 1, 2, 3, 4, 5]).slice(0, autoCount);

    cols.forEach((colIndex, k) => {
      const id = window.setTimeout(() => {
        // ★先に止める（refが同期で false になる）
        stopCol(colIndex, "auto");

        // ★止めた後に正解で固定（上書きされない）
        forceMiddleTo(colIndex, targetRef.current.correct[colIndex]);

        // 最後の自動停止が終わったら手動STOPを解禁（ref/state 同期）
        if (k === cols.length - 1) {
          setManualStopsLeftSync(stopLimit);
        }
      }, 220 * (k + 1));

      autoStopTimersRef.current.push(id);
    });
  };

  const judge = () => {
    const t = targetRef.current;
    const middle = reels.map((r) => r.middle);
    const map = middle.map((m, i) => m === t.correct[i]);
    setHitMap(map);
    return map.every((v) => v);
  };

  useEffect(() => {
    if (!isSpinning) return;
    if (spinningCols.some((v) => v)) return;

    // 全列停止
    setIsSpinning(false);
    isSpinningRef.current = false; // ★追加（保険）

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const ok = judge();
    setResult(ok ? "success" : "fail");

    if (ok) {
      setCoins((c) => c + 3);

      // ★成功時だけ点滅
      setMarqueeBlink(true);

      if (marqueeBlinkTimerRef.current) {
        window.clearTimeout(marqueeBlinkTimerRef.current);
      }
      marqueeBlinkTimerRef.current = window.setTimeout(() => {
        setMarqueeBlink(false);
        marqueeBlinkTimerRef.current = null;
      }, SUCCESS_EFFECT_DURATION);
    } else {
      // ★失敗時は点滅しない（暗いままにしたいので）
      setMarqueeBlink(false);
      if (marqueeBlinkTimerRef.current) {
        window.clearTimeout(marqueeBlinkTimerRef.current);
        marqueeBlinkTimerRef.current = null;
      }
    }
  }, [spinningCols]);

  // ===============================
  // レバー
  // ===============================

  const onLeverClick = () => {
    if (isSpinning) return;
    if (coins <= 0) return;

    setResult(null);
    setHitMap(Array(6).fill(false));

    // 自動停止タイマー掃除
    autoStopTimersRef.current.forEach((id) => window.clearTimeout(id));
    autoStopTimersRef.current = [];

    const list = allTargets.filter((t) => enabledGroups[t.group]);

    if (list.length === 0) {
      showToast("出題対象がありません");
      return;
    }

    const nextTarget = list[Math.floor(Math.random() * list.length)];
    setCurrentTarget(nextTarget);
    targetRef.current = nextTarget;

    setReels(createInitialReels(nextTarget.pool));

    setCoins((c) => c - 1);

    setIsSpinning(true);
    isSpinningRef.current = true; // ★追加：次レンダ前でも stopCol が弾かれないように

    const cols = Array(6).fill(true);
    setSpinningCols(cols);
    spinningColsRef.current = cols;

    // ★ここで「先に自動停止」を開始
    const autoCount = 6 - stopLimit;
    runAutoStopsFirst(autoCount);

    // 回転開始
    spinOnce();

    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(spinOnce, spinMs);
  };

  const onStopClick = (colIndex: number) => {
    stopCol(colIndex, "manual");
  };

  // ===============================
  // 画面
  // ===============================

  return (
    <div className="page">
      <div className="frame">
        {toast && <div className="toast">{toast}</div>}

        <div className="contents">
          <main className="main">
            <TargetInfo target={currentTarget} />

            <Reels
              reels={reels}
              result={result}
              stem={currentTarget.stem}
              hitMap={hitMap}
              spinningCols={spinningCols}
              stopFlash={stopFlash}
            />

            <StopButtons
              disabled={!isSpinning}
              spinningCols={spinningCols}
              onStop={onStopClick}
              manualStopsLeft={manualStopsLeft}
            />

            <Marquee
              dim={isSpinning || result === "fail"}   // ★fail中は暗いまま
              blink={marqueeBlink}                    // ★success時だけ一時的にtrue
            />
          </main>

          <aside className="side">
            <SideHeader coins={coins} />

            <div className="side-body">
              <Lever disabled={isSpinning || coins <= 0} onClick={onLeverClick} />

              <div className="group-toggle">
                <div className="group-toggle-title">出題対象</div>

                <div className="group-toggle-buttons">
                  {(["四段","上二段","下二段","上一段","下一段","カ変","サ変","ナ変","ラ変"] as const).map((g) => (
                    <label key={g} className={`group-toggle-btn ${enabledGroups[g] ? "is-on" : ""}`}>
                      <input
                        className="group-toggle-input"
                        type="checkbox"
                        checked={enabledGroups[g]}
                        disabled={isSpinning}
                        onChange={() =>
                          setEnabledGroups((prev) => ({ ...prev, [g]: !prev[g] }))
                        }
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>

              <GameSettings
                spinMs={spinMs}
                onChangeSpinMs={setSpinMs}
                stopLimit={stopLimit}
                onChangeStopLimit={setStopLimit}
                disabled={isSpinning}
                onApplied={showToast}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}