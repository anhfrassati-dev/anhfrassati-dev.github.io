"use client";

interface TransitionOverlayProps {
    active: boolean;
    fadingOut: boolean;
    overlayActive: boolean;
}

export default function TransitionOverlay({ active, fadingOut, overlayActive }: TransitionOverlayProps) {
    if (!active) return null;

    return (
        <section id="transition-screen" className="screen active" style={{ display: 'flex' }}>
            <div className={`trans-content ${fadingOut ? "fading-out" : ""}`}>
                <div className="candles">
                    <div className="candle">
                        <div className="flame"></div>
                        <div className="wax"></div>
                        <div className="candle-holder"></div>
                    </div>

                    {/* Cây Thánh Giá ở giữa */}
                    <div className="center-crucifix">
                        {/* Note: Update src to absolute path public/assets */}
                        <img
                            src="/assets/images/crucifix.png"
                            alt="Cây Thánh Giá"
                            className="crucifix-img"
                        />
                    </div>

                    <div className="candle">
                        <div className="flame"></div>
                        <div className="wax"></div>
                        <div className="candle-holder"></div>
                    </div>
                </div>
                <div className="prayer">
                    <p className="pl p1">"Lạy Chúa,</p>
                    <p className="pl p2">xin hãy phán,</p>
                    <p className="pl p3">vì tôi tớ Chúa</p>
                    <p className="pl p4">đang lắng nghe..."</p>
                </div>
                <div className="beads">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="big-cross">✝</div>

                {/* Divine Light Transition Overlay */}
                <div
                    id="divine-light-overlay"
                    className={`divine-light-overlay ${overlayActive ? "active" : ""}`}
                ></div>
            </div>
        </section>
    );
}
