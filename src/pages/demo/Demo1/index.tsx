import React, { useRef, useState, useEffect } from 'react';

// 滚动到底部时遮罩层自动隐藏
export default function ScrollableListWithShadow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showShadow, setShowShadow] = useState(true);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // scrollTop: 滚动条顶部到容器顶部的距离
    // clientHeight: 容器的高度
    // scrollHeight: 滚动条的高度
    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    setShowShadow(!isBottom);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    handleScroll(); // 初始化检查
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{
        position: 'relative',
        height: 300,
        overflowY: 'auto',
        border: '1px solid #ccc',
      }}
    >
      <div style={{ padding: 16 }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} style={{ padding: 8, borderBottom: '1px solid #eee' }}>
            Item {i + 1}
          </div>
        ))}
      </div>

      {/* 底部遮罩层（仅在未到底部时显示） */}
      {showShadow && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            pointerEvents: 'none',
            background: 'linear-gradient(to top, white, transparent)',
          }}
        />
      )}
    </div>
  );
}
