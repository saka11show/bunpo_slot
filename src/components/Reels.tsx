type ReelCell = { top: string; middle: string; bottom: string };

type Props = {
  reels: ReelCell[];
  result: null | "success" | "fail";
  stem: string; // ★追加
};


export function Reels({ reels, result, stem }: Props) {

    const glowClass = result === "success" ? "glow-success"
        : result === "fail" ? "glow-fail"
            : "";

    return (
        <section className={`reels ${glowClass}`}>
            <div className="reel-headers">
                <div className="reel-header center" style={{ backgroundColor: "black" }}><h1 style={{ color: "white" }}>語幹</h1></div>
                <div className="reel-header center" style={{ backgroundColor: "#ff9999" }}><h2>未然形</h2></div>
                <div className="reel-header center" style={{ backgroundColor: "#ffcc99" }}><h2>連用形</h2></div>
                <div className="reel-header center" style={{ backgroundColor: "#ffff99" }}><h2>終止形</h2></div>
                <div className="reel-header center" style={{ backgroundColor: "#99ff99" }}><h2>連体形</h2></div>
                <div className="reel-header center" style={{ backgroundColor: "#99ffff" }}><h2>已然形</h2></div>
                <div className="reel-header center" style={{ backgroundColor: "#cc99ff" }}><h2>命令形</h2></div>
            </div>

            <div className="reel-windows">
                <div className="reel-gokan center" style={{ backgroundColor: "white" }}>
                    <h1>{stem}</h1>
                </div>

                {reels.map((cell, i) => (
                    <div className="reel-window" key={i}>
                        <div className="reel-window-top center">{cell.top}</div>
                        <div className="reel-window-middle center">{cell.middle}</div>
                        <div className="reel-window-bottom center">{cell.bottom}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
