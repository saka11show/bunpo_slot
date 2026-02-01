import "./App.css";
import { TopHeader } from "./components/TopHeader";
import { Reels } from "./components/Reels";
import { StopRow } from "./components/StopRow";
import { Marquee } from "./components/Marquee";
import { SideTop } from "./components/SideTop";
import { SettingsPanel } from "./components/SettingsPanel";

export default function App() {
  return (
    <div className="page">
      <div className="frame">
        {/* 上段：ヘッダー(左)＋サイド上(右) */}
        <div className="row row--top">
          <div className="left">
            <TopHeader />
          </div>
          <div className="right">
            <SideTop />
          </div>
        </div>

        {/* 下段：プレイ(左)＋設定(右) */}
        <div className="row row--main">
          <div className="left playArea">
            <Reels />
            <StopRow />
            <Marquee />
          </div>
          <div className="right">
            <SettingsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
