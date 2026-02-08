import "./App.css";
import { useState } from "react";

import { TargetInfo } from "./components/TargetInfo";
import { Reels } from "./components/Reels";
import { StopButtons } from "./components/StopButtons";
import { Marquee } from "./components/Marquee";
import { SideHeader } from "./components/SideHeader";
import { GameSettings } from "./components/GameSettings";
import { Lever } from "./components/Lever";

export default function App() {

  const [isSpinning, setIsSpinning] = useState(false); //回っている状態を管理
  const onLeverClick = () => {
      setIsSpinning(true);
  }



  return (
    <div className="page">
      <div className="frame">
        <div className="contents">
          {/* 左：メイン筐体 */}
          <main className="main">
            <TargetInfo />
            <Reels />
            <StopButtons />
            <Marquee />
          </main>

          {/* 右：筐体サイド */}
          <aside className="side">
            <SideHeader />
            <Lever disabled={isSpinning} onLeverClick={onLeverClick} />
            <GameSettings />
          </aside>
        </div>
      </div>
    </div>
  );
}
