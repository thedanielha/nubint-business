# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nubint Business는 비즈니스 모델 캔버스를 생성하고 관리할 수 있는 웹 애플리케이션입니다. 사용자가 비즈니스 아이디어를 입력하면 자동으로 비즈니스 캔버스의 각 요소를 제안하고, 사용자가 직접 편집할 수 있습니다.

## Commands

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린팅
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: React 19 with TypeScript 5.8
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4 + Radix UI components
- **UI Components**: shadcn/ui pattern with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: Local React state (useState)

### Code Structure

#### Component Architecture
The application follows a component-based architecture with three main UI components:

1. **PromptPanel** (`src/components/PromptPanel.tsx`)
   - Handles user input for business ideas
   - Maintains history of previous prompts
   - Uses shadcn/ui Card, Button, Textarea components
   - Integrates with `generateCanvasFromPrompt` utility

2. **BusinessCanvasBoard** (`src/components/BusinessCanvasBoard.tsx`)
   - Displays the 9-block business model canvas in a grid layout
   - Manages canvas export functionality (JSON format)
   - Coordinates updates between individual canvas blocks

3. **CanvasBlock** (`src/components/CanvasBlock.tsx`)
   - Individual editable block component
   - Toggle between view and edit modes
   - Auto-saves on blur
   - Each block contains: title, content array, and placeholder text

#### Data Flow
```
App.tsx (main state)
  ├── PromptPanel (input) → generateCanvasFromPrompt → updates canvas state
  └── BusinessCanvasBoard (display) → CanvasBlock (edit) → updates canvas state
```

#### Type System
- Central type definitions in `src/types/business-canvas.ts`
- `BusinessCanvas` interface contains 9 `BusinessCanvasBlock` properties
- Each block follows the structure: `{ id, title, content[], placeholder }`

### API Integration

The app integrates with a FastAPI backend through `src/services/api.ts`:
- Base URL: `https://natural-toucan-definitely.ngrok-free.app/api/business`
- Endpoints:
  - `POST /canvas/generate` - Generate canvas from prompt
  - `GET /canvas` - List all canvases
  - `GET /canvas/:id` - Get specific canvas
  - `PUT /canvas/:id` - Update canvas
  - `DELETE /canvas/:id` - Delete canvas
  - `POST /canvas/:id/duplicate` - Duplicate canvas

API responses follow the format:
```typescript
{
  success: boolean,
  message: string,
  responseObject?: T,
  statusCode: number
}
```

### UI Component System

The project uses shadcn/ui pattern with Radix UI:
- Components in `src/components/ui/`
- Utility function `cn()` in `src/lib/utils.ts` for className merging
- CSS variables for theming in `src/index.css`
- Path aliases configured: `@/*` maps to `src/*`

### Canvas Generation Logic

The `generateCanvasFromPrompt` function (`src/utils/canvas-generator.ts`) analyzes prompts using keyword matching to populate:
- Value Propositions (가치 제안)
- Customer Segments (고객 세그먼트)
- Channels (채널)
- Revenue Streams (수익원)
- Key Activities (핵심 활동)
- Key Resources (핵심 자원)
- Key Partners (핵심 파트너)
- Customer Relationships (고객 관계)
- Cost Structure (비용 구조)

## Related Backend Service

The app can integrate with the nubint-api Express backend located at `../nubint-api`:
- Business router at `src/api/business/`
- In-memory canvas storage
- UUID-based canvas identification
- ServiceResponse pattern for consistent API responses

## Important Notes

- The app currently uses simple keyword matching for canvas generation
- Canvas data can be exported as JSON
- Each block is independently editable with auto-save on blur
- The UI is fully responsive with Tailwind CSS
- All text is in Korean (한국어)