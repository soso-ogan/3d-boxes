import Stats from "three/examples/jsm/libs/stats.module";

export function setupStatsPanel(): Stats {
    const stats = Stats();
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
    return stats;
}