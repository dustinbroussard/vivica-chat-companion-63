
import { useState, useEffect, useCallback } from 'react';

export type ThemeVariant = 'dark' | 'light';
export type ThemeColor = 'default' | 'blue' | 'red' | 'green' | 'purple';

export interface Theme {
  color: ThemeColor;
  variant: ThemeVariant;
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>({
    color: 'default',
    variant: 'dark'
  });

  const applyTheme = useCallback((newTheme: Theme) => {
    const { color, variant } = newTheme;

    // Remove all existing theme classes and attributes
    document.body.classList.remove(
      'dark-mode', 'light-mode'
    );
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove(
      'theme-default', 'theme-blue', 'theme-red', 'theme-green', 'theme-purple'
    );

    // Apply new theme
    const themeAttribute = `${color}-${variant}`;
    document.documentElement.setAttribute('data-theme', themeAttribute);
    document.documentElement.classList.add(`theme-${color}`);

    // Also add body class for backward compatibility
    document.body.classList.add(`${variant}-mode`);
    
    console.log('Applied theme:', themeAttribute);
    
    // Force a repaint to ensure immediate visual update
    document.documentElement.style.display = 'none';
    document.documentElement.offsetHeight; // Trigger reflow
    document.documentElement.style.display = '';
  }, []);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('vivica-theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setTheme(parsedTheme);
        applyTheme(parsedTheme);
      } catch (error) {
        console.error('Failed to parse saved theme:', error);
        // Apply default theme on error
        applyTheme(theme);
      }
    } else {
      // Apply default theme
      applyTheme(theme);
    }
  }, [applyTheme]);

  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('vivica-theme', JSON.stringify(newTheme));
  }, [applyTheme]);

  return {
    theme,
    updateTheme,
    applyTheme
  };
};
