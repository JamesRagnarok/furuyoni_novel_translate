// 載入小說內容
async function loadNovelContent(chinesePath, japanesePath) {
    try {
        // 讀取中文和日文文本文件
        const [chineseResponse, japaneseResponse] = await Promise.all([
            fetch(chinesePath),
            fetch(japanesePath)
        ]);

        const [chineseText, japaneseText] = await Promise.all([
            chineseResponse.text(),
            japaneseResponse.text()
        ]);

        // 處理注音和粗體標記
        function processText(text) {
            const lines = text.split('\n');
            let inBold = false;
            const processedLines = lines.map(line => {
                // 處理開始標記
                if (line.includes('[b]')) {
                    inBold = true;
                    line = line.replace('[b]', '<strong>');
                }
                // 在粗體區域內的行
                else if (inBold) {
                    line = '<strong>' + line;
                }
                
                // 處理結束標記
                if (line.includes('[/b]')) {
                    inBold = false;
                    line = line.replace('[/b]', '</strong>');
                }
                // 在粗體區域內的行
                else if (inBold) {
                    line = line + '</strong>';
                }
                
                // 處理注音標記
                line = line.replace(/\[ruby text="([^"]+)"\]([^\[]+)\[\/ruby\]/g, '<ruby>$2<rt>$1</rt></ruby>');
                
                // 處理單行粗體
                return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            });
            return processedLines;
        }

        // 將文本分割成行並處理標記
        const chineseLines = processText(chineseText);
        const japaneseLines = processText(japaneseText);

        // 獲取內容容器和圖片定義
        const contentContainer = document.getElementById('novel-content');
        const imageDefinitions = document.getElementById('image-definitions');
        const imageElements = Array.from(imageDefinitions.getElementsByClassName('novel-image-def'));
        
        contentContainer.innerHTML = '';

        // 逐行創建段落，並在指定位置插入圖片
        const maxLines = Math.max(chineseLines.length, japaneseLines.length);
        for (let i = 0; i < maxLines; i++) {
            // 創建段落（即使是空行也要計入）
            const paragraph = document.createElement('div');
            paragraph.className = 'paragraph';

            if (chineseLines[i]?.trim() || japaneseLines[i]?.trim()) {
                if (chineseLines[i]?.trim()) {
                    const chineseP = document.createElement('p');
                    chineseP.className = 'chinese';
                    chineseP.innerHTML = chineseLines[i];
                    paragraph.appendChild(chineseP);
                }

                if (japaneseLines[i]?.trim()) {
                    const japaneseP = document.createElement('p');
                    japaneseP.className = 'japanese';
                    japaneseP.innerHTML = japaneseLines[i];
                    paragraph.appendChild(japaneseP);
                }
            }

            contentContainer.appendChild(paragraph);

            // 檢查是否需要在此行後插入圖片（使用 i + 1 來匹配從1開始的行號）
            imageElements.forEach(imgDef => {
                const insertAfterLine = parseInt(imgDef.dataset.insertAfterLine);
                if (i + 1 === insertAfterLine) {
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'image-paragraph';
                    imgContainer.innerHTML = imgDef.innerHTML;
                    contentContainer.appendChild(imgContainer);
                }
            });
        }
    } catch (error) {
        console.error('載入小說內容時發生錯誤：', error);
        const contentContainer = document.getElementById('novel-content');
        contentContainer.innerHTML = '<p class="error">載入內容時發生錯誤，請稍後再試。</p>';
    }
}

// 設置閱讀模式
function setReadingMode(mode) {
    const contentContainer = document.getElementById('novel-content');
    contentContainer.dataset.mode = mode;
    localStorage.setItem('readingMode', mode);
}

// 初始化頁面
document.addEventListener('DOMContentLoaded', () => {
    // 恢復上次的閱讀模式設定
    const savedMode = localStorage.getItem('readingMode') || 'bilingual';
    setReadingMode(savedMode);

    // 設置模式選擇的事件監聽器
    const modeInputs = document.querySelectorAll('input[name="display-mode"]');
    modeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            setReadingMode(e.target.value);
        });
        // 設置初始選中狀態
        if (input.value === savedMode) {
            input.checked = true;
        }
    });
}); 