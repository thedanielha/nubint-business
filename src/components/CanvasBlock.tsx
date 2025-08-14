import React, { useState } from 'react';
import type { BusinessCanvasBlock } from '../types/business-canvas';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Edit2, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface CanvasBlockProps {
  block: BusinessCanvasBlock;
  onUpdate: (id: string, content: string[]) => void;
  className?: string;
  icon?: string;
}

const CanvasBlock: React.FC<CanvasBlockProps> = ({ block, onUpdate, className = '', icon }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(block.content.join('\n'));

  const handleBlur = () => {
    const newContent = editValue
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    onUpdate(block.id, newContent);
    setIsEditing(false);
  };

  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-200 group border-2 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-semibold text-foreground/70 uppercase tracking-wider flex items-center gap-2">
            {icon && <span className="text-base">{icon}</span>}
            {block.title}
          </CardTitle>
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => {
                setEditValue(block.content.join('\n'));
                setIsEditing(true);
              }}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleBlur}
              className="min-h-[100px] resize-none"
              placeholder={block.placeholder}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="default"
                onClick={handleBlur}
                className="flex-1"
              >
                <Check className="h-3 w-3 mr-1" />
                저장
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditValue(block.content.join('\n'));
                  setIsEditing(false);
                }}
                className="flex-1"
              >
                <X className="h-3 w-3 mr-1" />
                취소
              </Button>
            </div>
          </div>
        ) : (
          <div 
            className="min-h-[100px] cursor-pointer rounded-md p-2 hover:bg-accent/50 transition-colors"
            onClick={() => {
              setEditValue(block.content.join('\n'));
              setIsEditing(true);
            }}
          >
            {block.content.length > 0 ? (
              <ul className="space-y-2">
                {block.content.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span className="text-foreground/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic whitespace-pre-line">
                {block.placeholder}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CanvasBlock;