"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import SecurityWrapper from "@/components/SecurityWrapper";
import PetalAnimation from "@/components/PetalAnimation";

function ResultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const imgParam = searchParams.get("img");

    const [imageName, setImageName] = useState<string | null>(null);
    const [containerClass, setContainerClass] = useState("screen active reveal-mode"); // Start with reveal-mode
    const [cardClass, setCardClass] = useState("blessing-card hidden-initial");
    const [imgClass, setImgClass] = useState("blessing-img");
    const [buttonsClass, setButtonsClass] = useState("result-buttons hidden-initial");
    const [wishClass, setWishClass] = useState("wish-text hidden-initial");
    const [petalsActive, setPetalsActive] = useState(false); // Start paused
    const [showNotice, setShowNotice] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false); // New state for zoom


    useEffect(() => {
        // Simple mobile detection - Removed as sharing is removed
    }, []);

    useEffect(() => {
        if (!imgParam) {
            router.push("/");
            return;
        }
        setImageName(imgParam);
    }, [imgParam, router]);

    useEffect(() => {
        if (!imageName) return;

        // Stage 1: Background lightens (0.1s)
        setTimeout(() => {
            setContainerClass("screen active reveal-mode reveal-stage-1");
        }, 100);

        // Stage 3: Card emerges (2s)
        setTimeout(() => {
            setCardClass("blessing-card hidden-initial revealing");
            // Remove hidden-initial after animation starts/completes effectively managed by CSS?
            // CSS: .revealing { animation: cardEmerge ... }
            // We keep 'revealing' class.
        }, 2000);

        // Stage 4: Image reveals (2.5s)
        setTimeout(() => {
            setImgClass("blessing-img revealing");
        }, 2500);

        // Stage 5: Buttons fade in (11s)
        setTimeout(() => {
            setButtonsClass("result-buttons hidden-initial revealing");
        }, 11000);

        // Stage 6: Wish text & Petals (11.5s)
        setTimeout(() => {
            setWishClass("wish-text hidden-initial revealing");
            setPetalsActive(true);
        }, 11500);
    }, [imageName]);

    const handleDownload = async () => {
        if (!imageName) return;
        const imagePath = `/Hai-Loc-Dau-Nam/assets/images/${encodeURIComponent(imageName)}`;

        try {
            const response = await fetch(imagePath);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "LocThanh_2026_" + imageName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setShowNotice(true);
            setTimeout(() => setShowNotice(false), 3000);
        } catch (error) {
            window.open(imagePath, "_blank");
        }
    };

    // Sharing functions removed

    if (!imageName) return null; // Or loading spinner

    return (
        <section id="result-screen" className={containerClass}>
            <PetalAnimation active={petalsActive} />

            <div className="full-layout">
                <div className="center-content">
                    <header className="header">
                        <div className="cross">✝</div>
                        <p className="greeting">Lộc Thánh Của Bạn</p>
                        <p className="parish">LỜI CHÚA GỬI ĐẾN BẠN TRONG NĂM MỚI</p>
                    </header>

                    <main className="main result-main-content">
                        <div className={cardClass} onClick={() => setIsZoomed(true)}>
                            <div className="blessing-card-glow"></div>
                            <div className="card-frame">
                                <img
                                    id="blessing-image"
                                    src={`/Hai-Loc-Dau-Nam/assets/images/${imageName}`}
                                    alt={"Lộc Thánh - " + imageName}
                                    className={imgClass}
                                />
                            </div>
                        </div>

                        {/* Lightbox Overlay */}
                        {isZoomed && (
                            <div
                                className="lightbox-overlay"
                                onClick={() => setIsZoomed(false)}
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.9)',
                                    zIndex: 10000,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'zoom-out'
                                }}
                            >
                                <img
                                    src={`/Hai-Loc-Dau-Nam/assets/images/${imageName}`}
                                    alt={"Lộc Thánh Full - " + imageName}
                                    style={{
                                        maxWidth: '95vw',
                                        maxHeight: '95vh',
                                        objectFit: 'contain',
                                        boxShadow: '0 0 20px rgba(255,215,0,0.3)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    color: 'white',
                                    fontFamily: 'sans-serif',
                                    background: 'rgba(0,0,0,0.5)',
                                    padding: '5px 10px',
                                    borderRadius: '20px'
                                }}>
                                    Chạm để đóng
                                </div>
                            </div>
                        )}

                        {showNotice && (
                            <div id="download-notice" className="result-notice">
                                <span>✅</span>
                                <p>Đã tải ảnh về máy thành công!</p>
                            </div>
                        )}

                        <div className={buttonsClass}>
                            <div className="download-wrapper">
                                <button id="btn-download" className="cta-btn" onClick={handleDownload}>
                                    📥 Tải Ảnh Về Máy
                                </button>

                                <div className="share-addon" style={{ display: 'none' }}>
                                    {/* Share buttons removed */}
                                </div>
                            </div>

                            <a
                                href="https://anhfrassati.io.vn/"
                                target="_blank"
                                className="link-btn"
                            >
                                🌐 Website Thánh Pier Giorgio Frassati
                            </a>

                            <Link
                                href="/"
                                className="secondary-btn"
                                id="btn-home"
                                style={{ marginTop: '0.5rem' }}
                            >
                                ↩️ Quay về trang chủ
                            </Link>
                        </div>

                        <div className={wishClass}>
                            <p>✝ Xin Chúa chúc lành cho bạn và gia đình</p>
                            <p>một năm mới tràn đầy ơn phúc! 🙏</p>
                        </div>
                    </main>

                    <footer className="footer expanded-footer">
                        <p className="copyright">© 2026 Pier Giorgio Frassati</p>
                        <p className="description">
                            Đây là trang web giúp các bạn trẻ Việt Nam tìm hiểu về Thánh Pier
                            Giorgio Frassati
                        </p>
                        <p className="contact">
                            Mọi đóng góp ý kiến, thiết kế và tài liệu vui lòng liên hệ với
                            chúng tôi qua email:{" "}
                            <a href="mailto:anhfrassati@gmail.com">anhfrassati@gmail.com</a>
                        </p>
                    </footer>
                </div>
            </div>
        </section>
    );
}

export default function ResultPage() {
    return (
        <SecurityWrapper>
            <Suspense fallback={<div>Loading...</div>}>
                <ResultContent />
            </Suspense>
        </SecurityWrapper>
    );
}
