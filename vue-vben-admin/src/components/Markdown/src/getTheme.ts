/**
 * 获取主题类型 深色浅色模式 对应的值
 * @param darkModeVal 深色模式值
 * @param themeMode 主题类型——外观(默认), 内容, 代码块
 */
export const getTheme = (
  darkModeVal: 'light' | 'dark' | string,
  themeMode: 'default' | 'content' | 'code' = 'default',
) => {
  const isDark = darkModeVal === 'dark';
  switch (themeMode) {
    case 'default':
      return isDark ? 'dark' : 'classic';
    case 'content':
      return isDark ? 'dark' : 'light';
    case 'code':
      return isDark ? 'dracula' : 'github';
  }
};

export const getToolbar = () => {
  return [
    'emoji',
    'headings',
    'bold',
    'italic',
    'strike',
    'line',
    'quote',
    'list',
    'ordered-list',
    'check',
    'outdent',
    'indent',
    'code',
    'inline-code',
    'upload',
    'link',
    'table',
    // 'record',
    '|',
    'insert-after',
    'insert-before',
    'undo',
    'redo',
    'fullscreen',
    // 'edit-mode',
    'both',
    'preview',
    'outline',
    // 'code-theme',
    // 'content-theme',
    'export',
    // 'devtools',
    // 'info',
    // 'help',
  ];
};
