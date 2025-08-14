import { useState } from "react";
import BusinessCanvasBoard from "./components/BusinessCanvasBoard";
import Header from "./components/Header";
import PromptPanel from "./components/PromptPanel";
import type { BusinessCanvas } from "./types/business-canvas";
import { initialCanvasData } from "./types/business-canvas";
import { generateCanvasFromPrompt } from "./utils/canvas-generator";

function App() {
  const [canvas, setCanvas] = useState<BusinessCanvas>(initialCanvasData);

  const handlePromptSubmit = (prompt: string) => {
    const suggestions = generateCanvasFromPrompt(prompt);

    setCanvas((prevCanvas) => ({
      ...prevCanvas,
      ...suggestions,
    }));
  };

  const handleBlockUpdate = (
    blockKey: keyof BusinessCanvas,
    content: string[]
  ) => {
    setCanvas((prevCanvas) => ({
      ...prevCanvas,
      [blockKey]: {
        ...prevCanvas[blockKey],
        content,
      },
    }));
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[400px] min-w-[350px] border-r bg-background">
          <PromptPanel onSubmit={handlePromptSubmit} />
        </div>
        <div className="flex-1 bg-gradient-to-br from-background via-accent/5 to-accent/10">
          <BusinessCanvasBoard
            canvas={canvas}
            onUpdateBlock={handleBlockUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
