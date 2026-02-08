import "./App.css";
import { TargetInfo } from "./components/TargetInfo";
import { Reels } from "./components/Reels";
import { StopButtons } from "./components/StopButtons";
import { Marquee } from "./components/Marquee";
import { SideHeader } from "./components/SideHeader";
import { GameSettings } from "./components/GameSettings";
import { Lever } from "./components/Lever";

export default function App() {
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

          {/* 右：サイド筐体 */}
          <aside className="side">
            <section className="side-header">
              <SideHeader />
            </section>
            <section className="lever">
              <Lever />
            </section>
            <section className="game-setting">
              <GameSettings />
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
