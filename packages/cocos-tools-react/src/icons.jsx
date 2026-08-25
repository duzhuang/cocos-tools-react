// 统一内联 SVG 图标：16px、2px 描边、currentColor，风格一致（不用 emoji）
const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function SearchIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}


export function PanelLeftCloseIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="m15 9-3 3 3 3" />
    </svg>
  );
}

export function PanelLeftOpenIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="m14 9 3 3-3 3" />
    </svg>
  );
}

export function ChevronRightIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function LayersIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2 4 6.5l8 4.5 8-4.5L12 2Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </svg>
  );
}

export function ImageIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.5-3.5a2 2 0 0 0-2.8 0L6 20" />
    </svg>
  );
}

export function FilmIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 3v18M17 3v18M3 8h4M3 12h4M3 16h4M17 8h4M17 12h4M17 16h4" />
    </svg>
  );
}

export function BracesIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1" />
      <path d="M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1" />
    </svg>
  );
}

export function BoxIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 8 12 3 3 8l9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  );
}

export function PackageIcon(props) {
  return (
    <svg {...base} {...props}>
      {/* 纸箱主轮廓 */}
      <path d="M21 7.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5" />
      {/* 箱子顶盖折叠线 */}
      <path d="M3 7.5L12 4l9 3.5" />
      {/* 打包带/中心分割线 */}
      <path d="M12 4v16" />
    </svg>
  );
}

export function AdbPhoneIcon(props) {
  return (
    <svg {...base} {...props}>
      {/* 安卓手机轮廓 */}
      <rect x="5" y="2" width="10" height="20" rx="2" />
      {/* 手机屏幕主页键/指纹区小短线 */}
      <path d="M9 19h2" />
      {/* 推送/写入箭头：从左外侧指向手机内部 */}
      <path d="M19 8h-4" />
      <path d="m17 5-3 3 3 3" />
    </svg>
  );
}
