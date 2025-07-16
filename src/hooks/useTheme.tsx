
import { useState, useEffect } from 'react';

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
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const { color, variant } = newTheme;
    
    // Remove all existing theme classes and attributes
    document.body.classList.remove(
      'dark-mode', 'light-mode'
    );
    document.documentElement.removeAttribute('data-theme');
    
    // Apply new theme
    const themeAttribute = `${color}-${variant}`;
    document.documentElement.setAttribute('data-theme', themeAttribute);
    
    // Also add body class for backward compatibility
    document.body.classList.add(`${variant}-mode`);
    
    console.log('Applied theme:', themeAttribute);
  };

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('vivica-theme', JSON.stringify(newTheme));
  };

  return {
    theme,
    updateTheme,
    applyTheme
  };
};
