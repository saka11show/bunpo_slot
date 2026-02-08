export function Reels() {
    return (
        <section className="reels">
            <div className="reel-headers">
                <div className="reel-header center" style={{ backgroundColor: "black" }}><h1 style={{ color: "white"}}>語幹</h1></div>
                <div className="reel-header center" style={{ backgroundColor: "#ff9999" }}><h2>未然形</h2></div>
                <div className="reel-header center" style={{ backgroundColor: "#ffcc99" }}><h2>連用形</h2></div>
                <div className="reel-header center" style={{ backgroundColor: "#ffff99" }}><h2>終止形</h2></div>
                <div className="reel-header center" style={{ backgroundColor: "#99ff99" }}><h2>連体形</h2></div>
                <div className="reel-header center" style={{ backgroundColor: "#99ffff" }}><h2>已然形</h2></div>
                <div className="reel-header center" style={{ backgroundColor: "#cc99ff" }}><h2>命令形</h2></div>
            </div>

            <div className="reel-windows">
                <div className="reel-gokan center" style={{ backgroundColor: "white" }}>
                    <h1>書</h1>
                </div>
                <div className="reel-window">
                    <div className="reel-window-top center"><h2>こ</h2></div>
                    <div className="reel-window-middle center" style={{ backgroundColor: "#ffeaea" }}><h1>か</h1></div>
                    <div className="reel-window-bottom center"><h2>き</h2></div>
                </div>
                <div className="reel-window">
                    <div className="reel-window-top center"><h2>か</h2></div>
                    <div className="reel-window-middle center" style={{ backgroundColor: "#fff4ea" }}><h1>き</h1></div>
                    <div className="reel-window-bottom center"><h2>く</h2></div>
                </div>
                <div className="reel-window">
                    <div className="reel-window-top center"><h2>き</h2></div>
                    <div className="reel-window-middle center" style={{ backgroundColor: "#ffffea" }}><h1>く</h1></div>
                    <div className="reel-window-bottom center"><h2>け</h2></div>
                </div>
                <div className="reel-window">
                    <div className="reel-window-top center"><h2>き</h2></div>
                    <div className="reel-window-middle center" style={{ backgroundColor: "#eaffea" }}><h1>く</h1></div>
                    <div className="reel-window-bottom center"><h2>け</h2></div>
                </div>
                <div className="reel-window">
                    <div className="reel-window-top center"><h2>く</h2></div>
                    <div className="reel-window-middle center" style={{ backgroundColor: "#eaffff" }}><h1>け</h1></div>
                    <div className="reel-window-bottom center"><h2>こ</h2></div>
                </div>
                <div className="reel-window">
                    <div className="reel-window-top center"><h2>く</h2></div>
                    <div className="reel-window-middle center" style={{ backgroundColor: "#f4eaff" }}><h1>け</h1></div>
                    <div className="reel-window-bottom center"><h2>こ</h2></div>
                </div>
            </div>
        </section>
    );
}
