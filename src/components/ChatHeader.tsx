
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileSwitcher } from "./ProfileSwitcher";

interface Profile {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
}

interface ChatHeaderProps {
  onMenuToggle: () => void;
  currentTitle: string;
  currentProfile: Profile | null;
  onProfileChange: (profile: Profile) => void;
  onOpenProfiles: () => void;
}

export const ChatHeader = ({ 
  onMenuToggle, 
  currentTitle, 
  currentProfile, 
  onProfileChange, 
  onOpenProfiles 
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{currentTitle}</h1>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ProfileSwitcher
          currentProfile={currentProfile}
          onProfileChange={onProfileChange}
          onOpenProfiles={onOpenProfiles}
        />
      </div>
    </div>
  );
};
