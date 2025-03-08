document.addEventListener('DOMContentLoaded', () => {
    const chapterSelect = document.getElementById('chapter-select');
    const prevButton = document.getElementById('prev-chapter');
    const nextButton = document.getElementById('next-chapter');

    // 章节切换功能
    function changeChapter(direction) {
        const currentIndex = chapterSelect.selectedIndex;
        const totalChapters = chapterSelect.options.length;
        
        if (direction === 'next' && currentIndex < totalChapters - 1) {
            chapterSelect.selectedIndex = currentIndex + 1;
            loadChapter(chapterSelect.value);
        } else if (direction === 'prev' && currentIndex > 0) {
            chapterSelect.selectedIndex = currentIndex - 1;
            loadChapter(chapterSelect.value);
        }
        
        updateNavigationButtons();
    }

    // 更新导航按钮状态
    function updateNavigationButtons() {
        prevButton.disabled = chapterSelect.selectedIndex === 0;
        nextButton.disabled = chapterSelect.selectedIndex === chapterSelect.options.length - 1;
    }

    // 加载章节内容
    function loadChapter(chapterId) {
        // 这里可以添加加载章节内容的逻辑
        console.log(`Loading chapter: ${chapterId}`);
    }

    // 事件监听
    chapterSelect.addEventListener('change', (e) => {
        loadChapter(e.target.value);
        updateNavigationButtons();
    });

    prevButton.addEventListener('click', () => changeChapter('prev'));
    nextButton.addEventListener('click', () => changeChapter('next'));

    // 初始化
    updateNavigationButtons();
}); 