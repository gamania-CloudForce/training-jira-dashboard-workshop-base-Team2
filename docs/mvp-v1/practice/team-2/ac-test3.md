# Test Cases: 功能價值分數顯示

> **檔案編號**: TC-002-value-score-display  
> **建立日期**: 2025-09-04  
> **最後更新**: 2025-09-04  
> **狀態**: 規劃中  
> **對應 User Story**: [US-001](./ac-copilot.md#us-001-價值分數顯示與排序（產品經理）)  
> **對應 AC**: [AC-002-01 至 AC-002-04](./ac-copilot.md)

## 📋 測試範圍

本文件涵蓋以下 Acceptance Criteria 的測試案例：
- **AC-002-01**: 顯示功能價值分數
- **AC-002-02**: 依價值分數排序與篩選
- **AC-002-03**: 查看分數來源與更新時間
- **AC-002-04**: 異常處理與邊界情況

---

## 🧪 測試案例集合

### TC-002-01: 基本價值分數顯示功能

| 欄位 | 內容 |
|------|------|
| **測試案例編號** | TC-002-01 |
| **測試目標** | 驗證儀表板能正確載入並顯示每個功能的價值分數 |
| **相關 User Story** | 作為產品經理，我希望在儀表板上看到每個功能的價值分數，以便快速辨識高價值項目 |
| **相關 AC 場景** | AC-002-01: 顯示功能價值分數 |
| **測試前置條件** | 1. Google Sheets 中已設定功能清單與 value_score 欄位<br>2. 功能清單包含至少 5 個功能項目<br>3. value_score 欄位包含 1-10 分的數值<br>4. 使用者已登入並有儀表板存取權限<br>5. Google Sheets API 連線正常 |
| **測試步驟** | 1. 開啟瀏覽器，導向儀表板頁面<br>2. 等待頁面完全載入<br>3. 定位到功能列表區域<br>4. 檢查每個功能項目的價值分數顯示<br>5. 驗證分數數值的正確性<br>6. 檢查分數的視覺呈現格式 |
| **預期結果** | 1. 頁面成功載入功能列表<br>2. 每個功能項目右側顯示價值分數（例如：8/10）<br>3. 分數數值與 Google Sheets 中的 value_score 欄位一致<br>4. 分數以清楚可讀的格式顯示<br>5. 所有功能的分數均正確載入，無遺漏 |
| **測試資料** | 功能1: value_score = 8<br>功能2: value_score = 5<br>功能3: value_score = 9<br>功能4: value_score = 3<br>功能5: value_score = 7 |
| **測試類型** | 功能測試（正常流程） |
| **自動化程度** | 全自動（適合 E2E 測試，如 Playwright, Cypress） |

---

### TC-002-02: 價值分數排序功能

| 欄位 | 內容 |
|------|------|
| **測試案例編號** | TC-002-02 |
| **測試目標** | 驗證功能列表能按價值分數進行排序（高到低、低到高） |
| **相關 User Story** | 作為產品經理，我希望能依價值分數排序功能列表，以便優先檢視高價值項目 |
| **相關 AC 場景** | AC-002-02: 依價值分數排序與篩選 |
| **測試前置條件** | 1. 功能列表已成功載入<br>2. 每個功能都有價值分數顯示<br>3. 排序功能按鈕/選項可見<br>4. 至少有 5 個不同分數的功能項目 |
| **測試步驟** | 1. 確認功能列表顯示正常<br>2. 點擊「價值分數排序」按鈕或選項<br>3. 選擇「高到低」排序<br>4. 檢查排序結果的正確性<br>5. 選擇「低到高」排序<br>6. 再次檢查排序結果<br>7. 驗證排序過程中資料完整性 |
| **預期結果** | 1. 高到低排序：功能3(9分) → 功能1(8分) → 功能5(7分) → 功能2(5分) → 功能4(3分)<br>2. 低到高排序：功能4(3分) → 功能2(5分) → 功能5(7分) → 功能1(8分) → 功能3(9分)<br>3. 排序過程流暢，無頁面閃爍<br>4. 排序後所有功能資料保持完整<br>5. 排序邏輯準確無誤 |
| **測試資料** | 排序前順序: 功能1(8), 功能2(5), 功能3(9), 功能4(3), 功能5(7)<br>高到低預期: 9, 8, 7, 5, 3<br>低到高預期: 3, 5, 7, 8, 9 |
| **測試類型** | 功能測試（互動操作） |
| **自動化程度** | 全自動（點擊操作 + 順序驗證） |

---

### TC-002-03: 價值分數篩選功能

| 欄位 | 內容 |
|------|------|
| **測試案例編號** | TC-002-03 |
| **測試目標** | 驗證能根據價值分數範圍篩選功能列表 |
| **相關 User Story** | 作為產品經理，我希望能篩選高價值功能，以便專注於重要項目 |
| **相關 AC 場景** | AC-002-02: 依價值分數排序與篩選 |
| **測試前置條件** | 1. 功能列表已成功載入<br>2. 篩選功能控制項可見且可操作<br>3. 測試資料包含不同分數範圍的功能 |
| **測試步驟** | 1. 確認功能列表顯示正常<br>2. 設定篩選條件：分數 ≥ 7<br>3. 檢查篩選結果<br>4. 調整篩選條件：分數 ≤ 5<br>5. 檢查新的篩選結果<br>6. 清除篩選條件<br>7. 確認所有功能重新顯示 |
| **預期結果** | 1. 分數 ≥ 7 篩選：僅顯示功能1(8分)、功能3(9分)、功能5(7分)<br>2. 分數 ≤ 5 篩選：僅顯示功能2(5分)、功能4(3分)<br>3. 清除篩選：顯示所有 5 個功能<br>4. 篩選過程即時生效<br>5. 篩選後的列表保持正確的功能資訊 |
| **測試資料** | 全部功能: 功能1(8), 功能2(5), 功能3(9), 功能4(3), 功能5(7)<br>高分組: 7, 8, 9<br>低分組: 3, 5 |
| **測試類型** | 功能測試（條件篩選） |
| **自動化程度** | 全自動（篩選操作 + 結果驗證） |

---

### TC-002-04: 分數明細查看功能

| 欄位 | 內容 |
|------|------|
| **測試案例編號** | TC-002-04 |
| **測試目標** | 驗證滑鼠懸停時能顯示價值分數的計算明細與來源資訊 |
| **相關 User Story** | 作為產品經理，我希望了解價值分數的計算依據，以便做出更準確的判斷 |
| **相關 AC 場景** | AC-002-03: 查看分數來源與更新時間 |
| **測試前置條件** | 1. 功能列表已正常載入<br>2. 價值分數正確顯示<br>3. 滑鼠懸停提示功能已實現<br>4. Google Sheets 包含分數計算明細資料 |
| **測試步驟** | 1. 將滑鼠移至功能1的價值分數上<br>2. 等待提示框出現<br>3. 檢查提示框內容的完整性<br>4. 移開滑鼠，確認提示框消失<br>5. 對其他功能重複測試<br>6. 驗證不同功能的明細差異 |
| **預期結果** | 1. 滑鼠懸停後 0.5 秒內顯示提示框<br>2. 提示框包含：分數計算依據、資料來源、最後更新時間<br>3. 資訊內容準確且易讀<br>4. 滑鼠移開後提示框及時消失<br>5. 每個功能的明細資訊正確且獨特 |
| **測試資料** | 功能1明細: "影響力: 高, 觸及面: 廣, 成本: 中"<br>資料來源: "Google Sheets - value_score 欄位"<br>更新時間: "2025-09-04 14:30" |
| **測試類型** | 功能測試（懸停互動） |
| **自動化程度** | 半自動（需要 hover 事件觸發驗證） |

---

### TC-002-05: 異常情況處理

| 欄位 | 內容 |
|------|------|
| **測試案例編號** | TC-002-05 |
| **測試目標** | 驗證系統對缺失資料、連線失敗等異常情況的處理 |
| **相關 User Story** | 作為產品經理，我希望系統能穩定運行並友善處理異常情況 |
| **相關 AC 場景** | AC-002-04: 異常處理與邊界情況 |
| **測試前置條件** | 1. 能夠模擬不同的異常情況<br>2. 具備測試資料控制能力<br>3. 可以斷開/恢復網路連接 |
| **測試步驟** | 1. 設定部分功能缺少 value_score 資料<br>2. 重新載入頁面，檢查處理結果<br>3. 模擬 Google Sheets 連線失敗<br>4. 檢查錯誤處理機制<br>5. 恢復正常連線<br>6. 測試重試功能<br>7. 驗證錯誤恢復流程 |
| **預期結果** | 1. 缺少分數的功能顯示 "-" 或 "尚未評分"<br>2. 連線失敗時顯示明確錯誤訊息<br>3. 提供「重新載入」或「重試」按鈕<br>4. 錯誤訊息用詞友善且具指導性<br>5. 恢復連線後能正常載入資料<br>6. 系統保持穩定，不會崩潰 |
| **測試資料** | 異常情況1: 功能A 無 value_score<br>異常情況2: Google Sheets API 503 錯誤<br>異常情況3: 網路連線中斷 |
| **測試類型** | 異常測試（容錯性驗證） |
| **自動化程度** | 半自動（需要環境控制配合） |

---

### TC-002-06: 視覺顏色指示驗證

| 欄位 | 內容 |
|------|------|
| **測試案例編號** | TC-002-06 |
| **測試目標** | 驗證價值分數的顏色區分正確性（高分綠色、中分黃色、低分紅色） |
| **相關 User Story** | 作為產品經理，我希望透過顏色快速識別功能的價值等級 |
| **相關 AC 場景** | AC-002-01: 顯示功能價值分數（視覺設計部分） |
| **測試前置條件** | 1. 功能列表已載入<br>2. 包含高、中、低不同分數的功能<br>3. CSS 顏色樣式已實現 |
| **測試步驟** | 1. 檢查高分功能（8-10分）的顏色顯示<br>2. 檢查中分功能（5-7分）的顏色顯示<br>3. 檢查低分功能（1-4分）的顏色顯示<br>4. 驗證顏色對比度和可讀性<br>5. 測試邊界值的顏色處理<br>6. 檢查顏色一致性 |
| **預期結果** | 1. 高分功能（8-10分）：綠色背景或文字<br>2. 中分功能（5-7分）：黃色背景或文字<br>3. 低分功能（1-4分）：紅色背景或文字<br>4. 顏色對比度符合無障礙標準<br>5. 邊界值處理準確（7分為黃色，8分為綠色）<br>6. 所有同分數功能顏色一致 |
| **測試資料** | 高分測試: 8分, 9分, 10分<br>中分測試: 5分, 6分, 7分<br>低分測試: 1分, 3分, 4分<br>邊界測試: 4分→5分, 7分→8分 |
| **測試類型** | 視覺測試（UI 驗證） |
| **自動化程度** | 半自動（CSS 屬性檢查 + 視覺驗證） |

---

## 📊 測試資料設定

### 基礎測試環境設定

| 參數 | 值 | 說明 |
|------|-----|------|
| **Google Sheets 名稱** | 功能價值評估表 | 測試用資料表 |
| **測試功能數量** | 10 個 | 涵蓋各種分數範圍 |
| **value_score 欄位** | 1-10 分 | 整數評分制度 |
| **測試瀏覽器** | Chrome 最新版 | 主要測試環境 |
| **測試解析度** | 1920x1080 | 桌面標準解析度 |

### 測試資料詳細設定

| 功能編號 | 功能名稱 | value_score | 預期顏色 | 分類 |
|----------|----------|-------------|----------|------|
| F001 | 使用者登入優化 | 8 | 綠色 | 高價值 |
| F002 | 報表匯出功能 | 5 | 黃色 | 中價值 |
| F003 | 即時通知系統 | 9 | 綠色 | 高價值 |
| F004 | 介面美化 | 3 | 紅色 | 低價值 |
| F005 | 資料備份 | 7 | 黃色 | 中價值 |
| F006 | 多語言支援 | 6 | 黃色 | 中價值 |
| F007 | API 效能提升 | 10 | 綠色 | 高價值 |
| F008 | 說明文件更新 | 2 | 紅色 | 低價值 |
| F009 | 搜尋功能增強 | 8 | 綠色 | 高價值 |
| F010 | 色彩主題切換 | 4 | 紅色 | 低價值 |

---

## 🔧 自動化測試建議

### 適合 E2E 測試的項目

```javascript
// Playwright/Cypress 測試範例
describe('Value Score Display', () => {
  
  test('TC-002-01: 基本價值分數顯示', async ({ page }) => {
    // 設定測試資料
    await setupGoogleSheetsData();
    
    // 開啟儀表板
    await page.goto('/dashboard');
    
    // 驗證功能列表載入
    await expect(page.locator('[data-testid="feature-list"]')).toBeVisible();
    
    // 驗證每個功能的分數顯示
    const features = await page.locator('[data-testid="feature-item"]').all();
    for (let i = 0; i < features.length; i++) {
      await expect(features[i].locator('[data-testid="value-score"]')).toBeVisible();
    }
  });
  
  test('TC-002-02: 價值分數排序功能', async ({ page }) => {
    await setupGoogleSheetsData();
    await page.goto('/dashboard');
    
    // 點擊排序按鈕
    await page.click('[data-testid="sort-by-score"]');
    await page.selectOption('[data-testid="sort-order"]', 'desc');
    
    // 驗證排序結果
    const scores = await page.locator('[data-testid="value-score"]').allTextContents();
    const numericScores = scores.map(s => parseInt(s));
    
    // 檢查是否為降序排列
    for (let i = 0; i < numericScores.length - 1; i++) {
      expect(numericScores[i]).toBeGreaterThanOrEqual(numericScores[i + 1]);
    }
  });
  
  test('TC-002-06: 顏色指示驗證', async ({ page }) => {
    await setupGoogleSheetsData();
    await page.goto('/dashboard');
    
    // 檢查高分功能顏色
    const highScoreElement = page.locator('[data-score="9"]').first();
    await expect(highScoreElement).toHaveClass(/green|success/);
    
    // 檢查中分功能顏色
    const midScoreElement = page.locator('[data-score="5"]').first();
    await expect(midScoreElement).toHaveClass(/yellow|warning/);
    
    // 檢查低分功能顏色
    const lowScoreElement = page.locator('[data-score="3"]').first();
    await expect(lowScoreElement).toHaveClass(/red|danger/);
  });
});
```

### 適合 Unit 測試的項目

```javascript
// Jest 測試範例
describe('Value Score Utils', () => {
  
  test('should categorize scores correctly', () => {
    expect(getScoreCategory(9)).toBe('high');
    expect(getScoreCategory(6)).toBe('medium');
    expect(getScoreCategory(3)).toBe('low');
  });
  
  test('should handle boundary values', () => {
    expect(getScoreCategory(8)).toBe('high');   // 邊界：≥8 為高分
    expect(getScoreCategory(7)).toBe('medium'); // 邊界：5-7 為中分
    expect(getScoreCategory(4)).toBe('low');    // 邊界：≤4 為低分
  });
  
  test('should handle invalid scores gracefully', () => {
    expect(getScoreCategory(null)).toBe('unknown');
    expect(getScoreCategory(undefined)).toBe('unknown');
    expect(getScoreCategory(-1)).toBe('invalid');
    expect(getScoreCategory(11)).toBe('invalid');
  });
});
```

---

## 📝 測試執行記錄

| 測試案例 | 執行日期 | 結果 | 執行者 | 備註 |
|----------|----------|------|--------|------|
| TC-002-01 | 待執行 | - | - | 基礎功能測試 |
| TC-002-02 | 待執行 | - | - | 排序功能測試 |
| TC-002-03 | 待執行 | - | - | 篩選功能測試 |
| TC-002-04 | 待執行 | - | - | 懸停明細測試 |
| TC-002-05 | 待執行 | - | - | 異常處理測試 |
| TC-002-06 | 待執行 | - | - | 視覺顏色測試 |

---

## 🔗 相關文件

- **User Story**: [`ac-copilot.md`](./ac-copilot.md)
- **SPEC**: [`ac-test2.md`](./ac-test2.md)
- **測試指引**: [`testcase-guide.md`](../../guides/testcase-guide.md)
