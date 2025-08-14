import React from 'react';
import CanvasBlock from './CanvasBlock';
import type { BusinessCanvas } from '../types/business-canvas';
import { Button } from './ui/button';
import { Download, Layers, Grid3x3, Lightbulb } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface BusinessCanvasBoardProps {
  canvas: BusinessCanvas;
  onUpdateBlock: (blockKey: keyof BusinessCanvas, content: string[]) => void;
}

const BusinessCanvasBoard: React.FC<BusinessCanvasBoardProps> = ({ canvas, onUpdateBlock }) => {
  const handleBlockUpdate = (blockKey: keyof BusinessCanvas) => (id: string, content: string[]) => {
    onUpdateBlock(blockKey, content);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Canvas Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-[1200px] mx-auto h-full">
          {/* Canvas Section Labels */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            <div className="text-center">
              <Badge variant="outline" className="text-xs font-medium">
                Infrastructure
              </Badge>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-xs font-medium">
                Offering
              </Badge>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-xs font-medium">
                Customers
              </Badge>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-xs font-medium">
                Customers
              </Badge>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-xs font-medium">
                Finances
              </Badge>
            </div>
          </div>

          {/* Business Canvas Grid */}
          <div className="grid grid-cols-5 gap-4 h-[calc(100vh-200px)]">
            {/* Row 1 */}
            {/* Key Partners */}
            <div className="row-span-2">
              <CanvasBlock
                block={canvas.keyPartners}
                onUpdate={handleBlockUpdate('keyPartners')}
                className="h-full bg-blue-50/50 hover:bg-blue-50"
                icon="🤝"
              />
            </div>
            
            {/* Key Activities */}
            <div>
              <CanvasBlock
                block={canvas.keyActivities}
                onUpdate={handleBlockUpdate('keyActivities')}
                className="h-full bg-indigo-50/50 hover:bg-indigo-50"
                icon="⚙️"
              />
            </div>
            
            {/* Value Propositions */}
            <div className="row-span-2">
              <CanvasBlock
                block={canvas.valuePropositions}
                onUpdate={handleBlockUpdate('valuePropositions')}
                className="h-full bg-purple-50/50 hover:bg-purple-50 ring-2 ring-purple-200/50"
                icon="💡"
              />
            </div>
            
            {/* Customer Relationships */}
            <div>
              <CanvasBlock
                block={canvas.customerRelationships}
                onUpdate={handleBlockUpdate('customerRelationships')}
                className="h-full bg-pink-50/50 hover:bg-pink-50"
                icon="👥"
              />
            </div>
            
            {/* Customer Segments */}
            <div className="row-span-2">
              <CanvasBlock
                block={canvas.customerSegments}
                onUpdate={handleBlockUpdate('customerSegments')}
                className="h-full bg-rose-50/50 hover:bg-rose-50"
                icon="🎯"
              />
            </div>
            
            {/* Row 2 */}
            {/* Key Resources */}
            <div>
              <CanvasBlock
                block={canvas.keyResources}
                onUpdate={handleBlockUpdate('keyResources')}
                className="h-full bg-indigo-50/50 hover:bg-indigo-50"
                icon="📦"
              />
            </div>
            
            {/* Channels */}
            <div>
              <CanvasBlock
                block={canvas.channels}
                onUpdate={handleBlockUpdate('channels')}
                className="h-full bg-pink-50/50 hover:bg-pink-50"
                icon="📡"
              />
            </div>
            
            {/* Row 3 - Bottom Row */}
            {/* Cost Structure */}
            <div className="col-span-2">
              <CanvasBlock
                block={canvas.costStructure}
                onUpdate={handleBlockUpdate('costStructure')}
                className="h-full bg-red-50/50 hover:bg-red-50"
                icon="💸"
              />
            </div>
            
            {/* Revenue Streams */}
            <div className="col-span-3">
              <CanvasBlock
                block={canvas.revenueStreams}
                onUpdate={handleBlockUpdate('revenueStreams')}
                className="h-full bg-green-50/50 hover:bg-green-50"
                icon="💰"
              />
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => {
                const dataStr = JSON.stringify(canvas, null, 2);
                const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                const exportFileDefaultName = `business-canvas-${new Date().toISOString().split('T')[0]}.json`;
                
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click();
              }}
              size="sm"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export Canvas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCanvasBoard;