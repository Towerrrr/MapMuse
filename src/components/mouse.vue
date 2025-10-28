<template>
  <div class="mouse">
    <div class="mouse-buttons">
      <button class="mouse-btn left-btn">
        <span class="btn-label"></span>
      </button>
      <div class="mouse-wheel">
        <div class="wheel-scroll"></div>
      </div>
      <button class="mouse-btn right-btn">
        <span class="btn-label"></span>
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.mouse {
  width: 100px;
  height: 160px;
  background: linear-gradient(to bottom, #3a3a3a, #2a2a2a);
  border-radius: 50px 50px 50px 50px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  padding: 8px;
  transition: all 0.3s ease;
}

.mouse-buttons {
  display: flex;
  gap: 4px;
  height: 70px;
  position: relative;
}

.mouse-btn {
  flex: 1;
  background: linear-gradient(to bottom, #454545, #353535);
  border: 1px solid #555;
  transition: all 0.3s ease;
}

.mouse-btn:hover {
  background: linear-gradient(to bottom, #505050, #404040);
}

.mouse-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.left-btn {
  border-radius: 40px 0 0 0;
  border-right: 0.5px solid #555;
}

.right-btn {
  border-radius: 0 40px 0 0;
  border-left: 0.5px solid #555;
}

.btn-label {
  font-size: 11px;
  color: #666;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.mouse-wheel {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 8px;
  width: 20px;
  height: 50px;
  background: linear-gradient(to bottom, #2a2a2a, #1a1a1a);
  border: 1px solid #444;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 6px;
  z-index: 1;
  transition: all 0.3s ease;
}

.wheel-scroll {
  width: 8px;
  height: 18px;
  background: linear-gradient(to bottom, #666, #555);
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

/* 日间模式 */
</style>
