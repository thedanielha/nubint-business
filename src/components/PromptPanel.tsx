import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, Send, History, Zap, Target, Rocket } from 'lucide-react';

interface PromptPanelProps {
  onSubmit: (prompt: string) => void;
}

const PromptPanel: React.FC<PromptPanelProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt);
      setHistory([...history, prompt]);
      setPrompt('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-accent/5">
      <div className="p-6 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Business Canvas AI
            </h2>
            <p className="text-xs text-muted-foreground">
              AI 기반 비즈니스 모델 캔버스 생성기
            </p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="justify-start text-xs">
            <Zap className="h-3 w-3 mr-1" />
            스타트업
          </Button>
          <Button variant="outline" size="sm" className="justify-start text-xs">
            <Target className="h-3 w-3 mr-1" />
            B2B
          </Button>
          <Button variant="outline" size="sm" className="justify-start text-xs">
            <Rocket className="h-3 w-3 mr-1" />
            플랫폼
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {history.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <History className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wider">History</span>
            </div>
            <div className="space-y-2">
              {history.map((item, index) => (
                <Card key={index} className="group hover:shadow-md transition-all cursor-pointer border-l-4 border-l-primary/20 hover:border-l-primary">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="text-xs shrink-0">
                        #{index + 1}
                      </Badge>
                      <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">{item}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t bg-background/95 backdrop-blur">
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardContent className="p-5 space-y-4">
            <div>
              <label htmlFor="prompt" className="text-sm font-semibold mb-3 block flex items-center gap-2">
                <div className="w-1 h-4 bg-primary rounded-full"></div>
                비즈니스 아이디어 입력
              </label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    handleSubmit();
                  }
                }}
                className="min-h-[100px] resize-none border-2 focus:border-primary/50"
                placeholder="예: 20-30대를 위한 개인 맞춤형 영양 관리 앱 서비스를 만들고 싶습니다. 사용자의 건강 데이터를 분석하여..."
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">Ctrl+Enter로 제출</p>
                <span className="text-xs text-muted-foreground">{prompt.length}/500</span>
              </div>
            </div>
            
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              size="lg"
              disabled={!prompt.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              캔버스 생성하기
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-4 bg-gradient-to-br from-accent/30 to-accent/50 border-accent">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-primary/10 rounded">
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider">Pro Tips</span>
            </div>
            <div className="space-y-1.5 text-xs text-foreground/60">
              <p className="flex items-start gap-2">
                <span className="text-primary/70 mt-0.5">▸</span>
                <span>타겟 고객층을 명확히 정의하세요 (예: 20-30대, B2B 기업)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary/70 mt-0.5">▸</span>
                <span>수익 모델을 포함하세요 (구독, 광고, 판매 등)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary/70 mt-0.5">▸</span>
                <span>핵심 기술이나 자원을 언급하세요 (AI, 데이터, 플랫폼)</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PromptPanel;