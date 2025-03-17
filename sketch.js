let angle = 0;
let numLines = 50; // 增加線條數量
let lineColors = [];
let amplitudes = []; // 每條線的擺動幅度
let frequencies = []; // 每條線的擺動頻率
let speeds = []; // 每條線的擺動速度
let heights = []; // 每條線的高度

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id('animationCanvas');
  canvas.style('z-index', '1');
  canvas.style('opacity', '0.8');
  canvas.style('pointer-events', 'none'); // 讓滑鼠事件穿透動畫

  // 初始化每條線的顏色、擺動幅度、頻率、速度和高度
  for (let i = 0; i < numLines; i++) {
    lineColors[i] = color(random(255), random(255), random(255), 150); // 增加不透明度
    amplitudes[i] = random(10, 30); // 調整擺動幅度
    frequencies[i] = random(0.01, 0.05); // 調整擺動頻率
    speeds[i] = random(0.01, 0.05); // 調整擺動速度
    heights[i] = random(0.2, 0.5); // 調整高度比例
  }

  // 創建 iframe 並設置樣式
  let iframe = createElement('iframe', '');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.attribute('frameborder', '0');
  iframe.id('embeddedWebsite');
  iframe.style('position', 'absolute');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('z-index', '-1'); // 確保 iframe 在動畫後面
}

function draw() {
  clear(); // 清除之前的繪圖
  noFill(); // 確保不填充形狀

  for (let i = 0; i < numLines; i++) {
    let x = (i + 1) * (windowWidth / (numLines + 1));
    stroke(lineColors[i]);
    strokeWeight(20); // 增加線條粗細
    let lineHeight = windowHeight * heights[i]; // 使用每條線的高度比例

    // 繪製彎曲的線條
    beginShape();
    for (let y = windowHeight; y >= windowHeight - lineHeight; y -= 5) { // 增加節點數量
      let xOffset = amplitudes[i] * sin(angle * frequencies[i] + y * 0.03 + i * 0.1); // 調整彎曲程度和頻率
      vertex(x + xOffset, y);
    }
    endShape();
  }

  angle += 0.3; // 調整擺動的速度
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
