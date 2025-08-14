import { Grid3x3, HelpCircle, Settings, User } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  return (
    <header className="bg-background border-b border-border/40 sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
              <Grid3x3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                Nubint Business
              </h1>
              <p className="text-xs text-muted-foreground">
                비즈니스 모델 캔버스 생성기
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-xs">
              <HelpCircle className="h-4 w-4 mr-1" />
              도움말
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Settings className="h-4 w-4 mr-1" />
              설정
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <User className="h-4 w-4 mr-1" />
              로그인
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
