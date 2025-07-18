
import { Palette, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme, ThemeColor, ThemeVariant } from "@/hooks/useTheme";

export const ThemeSelector = () => {
  const { theme, updateTheme } = useTheme();

  const handleColorChange = (color: ThemeColor) => {
    updateTheme({ ...theme, color });
  };

  const handleVariantChange = (variant: ThemeVariant) => {
    updateTheme({ ...theme, variant });
  };

  const themeOptions = [
    { value: 'default', label: 'Default', color: '#000000' },
    { value: 'blue', label: 'Blue', color: '#3b82f6' },
    { value: 'red', label: 'Red', color: '#ef4444' },
    { value: 'green', label: 'Green', color: '#10b981' },
    { value: 'purple', label: 'Purple', color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4" />
        <Label className="text-base font-semibold">Theme</Label>
      </div>
      
      {/* Color Selection */}
      <div className="space-y-2">
        <Label className="text-sm">Color Scheme</Label>
        <Select value={theme.color} onValueChange={handleColorChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choose color scheme" />
          </SelectTrigger>
          <SelectContent>
            {themeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: option.color }}
                  />
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Variant Selection */}
      <div className="space-y-2">
        <Label className="text-sm">Mode</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={theme.variant === 'dark' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleVariantChange('dark')}
            className="flex-1"
          >
            <Moon className="w-4 h-4 mr-2" />
            Dark
          </Button>
          <Button
            type="button"
            variant={theme.variant === 'light' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleVariantChange('light')}
            className="flex-1"
          >
            <Sun className="w-4 h-4 mr-2" />
            Light
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Current: {themeOptions.find(t => t.value === theme.color)?.label} {theme.variant === 'dark' ? 'Dark' : 'Light'}
      </p>
    </div>
  );
};
