import "./App.css";
import { useEffect, useRef, useState } from "react";

import { TargetInfo } from "./components/TargetInfo";
import { Reels } from "./components/Reels";
import { StopButtons } from "./components/StopButtons";
import { Marquee } from "./components/Marquee";
import { SideHeader } from "./components/SideHeader";
import { GameSettings } from "./components/GameSettings";
import { Lever } from "./components/Lever";

export default function App() {

  type ReelCell = { top: string; middle: string; bottom: string }; //リールの型

  type Target = {
    verb: string;
    stem: string;
    type: string;
    pool: string[];     // ★追加：回転候補
    correct: string[];  // 中段の正解
  };

  const targets: Target[] = [
    {
      verb: "書く",
      stem: "書",
      type: "カ行四段",
      pool: ["か", "き", "く", "け", "こ"],
      correct: ["か", "き", "く", "く", "け", "け"],
    },
    {
      verb: "読む",
      stem: "読",
      type: "マ行四段",
      pool: ["ま", "み", "む", "め", "も"],
      correct: ["ま", "み", "む", "む", "め", "め"],
    },
  ];

  const [isSpinning, setIsSpinning] = useState(false); //回っている状態を管理
  const [reels, setReels] = useState<ReelCell[]>(
    Array.from({ length: 6 }, () => ({ top: "・", middle: "・", bottom: "・" }))
  );
  const [spinningCols, setSpinningCols] = useState<boolean[]>(
    Array(6).fill(false)
  );
  const [result, setResult] = useState<null | "success" | "fail">(null);
  const [coins, setCoins] = useState(14); // 初期コインは仮で14
  const [currentTarget, setCurrentTarget] = useState<Target>(targets[0]);
  const [hitMap, setHitMap] = useState<boolean[]>(Array(6).fill(false));

  const targetRef = useRef<Target>(targets[0]);

  const [marqueeBlink, setMarqueeBlink] = useState(false);
  const [marqueeFailLock, setMarqueeFailLock] = useState(false);
  const blinkTimerRef = useRef<number | null>(null);



  useEffect(() => {
    if (!isSpinning) return;

    const anySpinning = spinningCols.some((v) => v);
    if (anySpinning) return;

    // 全列停止
    setIsSpinning(false);

    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const ok = judge(); // hitMapもここで更新
    setResult(ok ? "success" : "fail");

    if (ok) setCoins((c) => c + 3);

  }, [isSpinning, spinningCols]);

  useEffect(() => {
    if (blinkTimerRef.current !== null) {
      window.clearTimeout(blinkTimerRef.current);
      blinkTimerRef.current = null;
    }

    if (result === "success") {
      setMarqueeFailLock(false);
      setMarqueeBlink(true);

      blinkTimerRef.current = window.setTimeout(() => {
        setMarqueeBlink(false);
        blinkTimerRef.current = null;
      }, 1200);
    }

    if (result === "fail") {
      setMarqueeBlink(false);
      setMarqueeFailLock(true);
    }

    if (result === null) {
      setMarqueeBlink(false);
    }

  }, [result]);




  const spinningColsRef = useRef<boolean[]>(Array(6).fill(false));


  const timerRef = useRef<number | null>(null);

  const spinOnce = () => {
    const cols = spinningColsRef.current;     // STOPの最新状態
    const pool = targetRef.current.pool;      // ★最新のpool

    setReels((prev) =>
      prev.map((cell, i) => {
        if (!cols[i]) return cell;

        // bottom が pool に無い（初期 "・" など）なら pool[0] に合わせる
        const currentBottom = pool.includes(cell.bottom) ? cell.bottom : pool[0];
        const nextIndex = (pool.indexOf(currentBottom) + 1) % pool.length;

        return {
          top: cell.middle,
          middle: cell.bottom,
          bottom: pool[nextIndex],
        };
      })
    );
  };


  const judge = () => {
    const middle = reels.map((r) => r.middle);
    const map = middle.map((m, i) => m === currentTarget.correct[i]);
    setHitMap(map);
    return map.every((v) => v);
  };






  const onStopClick = (colIndex: number) => {
    if (!isSpinning) return;

    setSpinningCols((prev) => {
      const next = [...prev];
      next[colIndex] = false;

      spinningColsRef.current = next; // ★追加（stateと同期）
      return next;
    });
  };




  // レバー操作時に実行
  const onLeverClick = () => {
    if (isSpinning) return;
    if (coins <= 0) return;      // ★コイン不足なら開始不可

    setResult(null);                    // 前回結果リセット
    setHitMap(Array(6).fill(false));    // ★当たり外れ表示リセット

    setResult(null);
    setHitMap(Array(6).fill(false));

    setMarqueeFailLock(false); // ★不正解の暗さ固定を解除（次ゲームのため）
    setMarqueeBlink(false);    // ★点滅もリセット

    if (blinkTimerRef.current !== null) { // ★タイマーも掃除
      window.clearTimeout(blinkTimerRef.current);
      blinkTimerRef.current = null;
    }



    const nextTarget = targets[Math.floor(Math.random() * targets.length)];
    setCurrentTarget(nextTarget);
    targetRef.current = nextTarget; // ★intervalが最新を参照できる

    setReels(createInitialReels(nextTarget.pool));

    setCoins((c) => c - 1);      // ★開始コスト

    setIsSpinning(true);

    const cols = Array(6).fill(true);
    setSpinningCols(cols);
    spinningColsRef.current = cols;

    spinOnce();

    if (timerRef.current !== null) window.clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      spinOnce();
    }, 500);
  };

  const createInitialReels = (pool: string[]): ReelCell[] => {
    return Array.from({ length: 6 }, () => ({
      top: pool[0],
      middle: pool[1],
      bottom: pool[2],
    }));
  };




  return (
    <div className="page">
      <div className="frame">
        <div className="contents">
          {/* 左：メイン筐体 */}
          <main className="main">
            <TargetInfo target={currentTarget} />
            <Reels reels={reels} result={result} stem={currentTarget.stem} hitMap={hitMap} />


            <StopButtons
              disabled={!isSpinning}
              spinningCols={spinningCols}
              onStop={onStopClick}
            />
            <Marquee
              dim={isSpinning || marqueeFailLock}
              blink={marqueeBlink}
            />


          </main>


          {/* 右：筐体サイド */}
          <aside className="side">
            <SideHeader coins={coins} />
            <Lever disabled={isSpinning || coins <= 0} onClick={onLeverClick} />
            <GameSettings />
          </aside>
        </div>
      </div>
    </div>
  );
}
