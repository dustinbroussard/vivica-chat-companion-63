
import { useState, useEffect } from "react";
import { X, AlertTriangle, Key, Save, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ThemeSelector } from "./ThemeSelector";
import { ApiKeyInput } from "./ApiKeyInput";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [settings, setSettings] = useState({
    apiKey1: '',
    apiKey2: '',
    apiKey3: '',
    googleTtsKey: '',
    weatherApiKey: '',
    weatherLocation: '',
    rssFeeds: '',
    includeWeather: false,
    includeRss: false,
  });

  useEffect(() => {
    // Load settings from localStorage when modal opens
    if (isOpen) {
      const savedSettings = localStorage.getItem('vivica-settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSettings(prev => ({ ...prev, ...parsed }));
        } catch (error) {
          console.error('Failed to parse saved settings:', error);
        }
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('vivica-settings', JSON.stringify(settings));
    toast.success("Settings saved successfully!");
    onClose();
  };

  const handleClearAllConversations = () => {
    if (confirm("Are you sure you want to clear all conversations? This action cannot be undone.")) {
      localStorage.removeItem('vivica-conversations');
      localStorage.removeItem('vivica-current-conversation');
      toast.success("All conversations cleared");
      window.location.reload();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <ApiKeyInput onApiKeyChange={() => {}} />

          {/* API Keys Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              <Label className="text-base font-semibold">API Keys</Label>
            </div>
            <div className="space-y-3">
              <Input
                type="password"
                placeholder="Primary API Key"
                value={settings.apiKey1}
                onChange={(e) => setSettings(prev => ({ ...prev, apiKey1: e.target.value }))}
              />
              <Input
                type="password"
                placeholder="Secondary API Key (Optional)"
                value={settings.apiKey2}
                onChange={(e) => setSettings(prev => ({ ...prev, apiKey2: e.target.value }))}
              />
              <Input
                type="password"
                placeholder="Tertiary API Key (Optional)"
                value={settings.apiKey3}
                onChange={(e) => setSettings(prev => ({ ...prev, apiKey3: e.target.value }))}
              />
              <Input
                type="password"
                placeholder="Google TTS API Key (Optional)"
                value={settings.googleTtsKey}
                onChange={(e) => setSettings(prev => ({ ...prev, googleTtsKey: e.target.value }))}
              />
              <Input
                type="text"
                placeholder="OpenWeatherMap API Key (Optional)"
                value={settings.weatherApiKey}
                onChange={(e) => setSettings(prev => ({ ...prev, weatherApiKey: e.target.value }))}
              />
              <Input
                type="text"
                placeholder="Weather location e.g. London"
                value={settings.weatherLocation}
                onChange={(e) => setSettings(prev => ({ ...prev, weatherLocation: e.target.value }))}
              />
              <p className="text-sm text-muted-foreground">Your API keys are stored locally and never shared</p>
            </div>
          </div>

          {/* RSS Feeds Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Custom RSS Feeds</Label>
            <Textarea
              placeholder="https://example.com/feed1, https://feed2.com/rss"
              value={settings.rssFeeds}
              onChange={(e) => setSettings(prev => ({ ...prev, rssFeeds: e.target.value }))}
              rows={3}
            />
            <p className="text-sm text-muted-foreground">Comma separated list of feeds</p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-weather"
                checked={settings.includeWeather}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, includeWeather: checked as boolean }))
                }
              />
              <Label htmlFor="include-weather">Include Weather in context</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-rss"
                checked={settings.includeRss}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, includeRss: checked as boolean }))
                }
              />
              <Label htmlFor="include-rss">Include RSS feeds in context</Label>
            </div>
          </div>

          {/* Theme Section */}
          <ThemeSelector />

          {/* Danger Zone */}
          <div className="space-y-4 border-t border-border pt-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-4 h-4" />
              <Label className="text-base font-semibold">Danger Zone</Label>
            </div>
            <Button
              variant="destructive"
              onClick={handleClearAllConversations}
              className="w-full"
            >
              <Trash className="w-4 h-4 mr-2" />
              Clear All Conversations
            </Button>
            <p className="text-sm text-muted-foreground">This action cannot be undone</p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
