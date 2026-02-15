type ReelCell = { top: string; middle: string; bottom: string };

type Props = {
    reels: ReelCell[];
    result: null | "success" | "fail";
    stem: string; // ★追加
    hitMap: boolean[];
};


export function Reels({ reels, result, stem, hitMap }: Props) {

    const glowClass = result === "success" ? "glow-success"
        : result === "fail" ? "glow-fail"
            : "";

    return (
        <section className={`reels ${glowClass}`}>
            <div className="reel-headers">
                <div className="reel-header header-gokan center">
                    <h1>語幹</h1>
                </div>

                <div className="reel-header header-0 center">
                    <h2>未然形</h2>
                </div>

                <div className="reel-header header-1 center">
                    <h2>連用形</h2>
                </div>

                <div className="reel-header header-2 center">
                    <h2>終止形</h2>
                </div>

                <div className="reel-header header-3 center">
                    <h2>連体形</h2>
                </div>

                <div className="reel-header header-4 center">
                    <h2>已然形</h2>
                </div>

                <div className="reel-header header-5 center">
                    <h2>命令形</h2>
                </div>
            </div>


            <div className="reel-windows">
                <div className="reel-gokan center" style={{ backgroundColor: "white" }}>
                    <h1>{stem}</h1>
                </div>

                {reels.map((cell, i) => {
                    const midClass =
                        result === null
                            ? ""
                            : hitMap[i]
                                ? "hit"
                                : "miss";

                    return (
                        <div className="reel-window" key={i}>
                            <div className="reel-window-top center">{cell.top}</div>

                            <div className={`reel-window-middle center ${midClass}`}>
                                {cell.middle}
                            </div>

                            <div className="reel-window-bottom center">{cell.bottom}</div>
                        </div>
                    );
                })}


            </div>
        </section>
    );
}
