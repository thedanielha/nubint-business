import type { BusinessCanvas } from '../types/business-canvas';

export const generateCanvasFromPrompt = (prompt: string): Partial<BusinessCanvas> => {
  // 간단한 키워드 기반 분석 (실제로는 AI API를 연동할 수 있습니다)
  const lowerPrompt = prompt.toLowerCase();
  
  const suggestions: Partial<BusinessCanvas> = {};
  
  // 가치 제안 분석
  if (lowerPrompt.includes('앱') || lowerPrompt.includes('서비스') || lowerPrompt.includes('플랫폼')) {
    suggestions.valuePropositions = {
      id: 'value-propositions',
      title: '가치 제안',
      content: [],
      placeholder: ''
    };
    
    if (lowerPrompt.includes('맞춤') || lowerPrompt.includes('개인')) {
      suggestions.valuePropositions.content.push('개인 맞춤형 서비스 제공');
    }
    if (lowerPrompt.includes('편리') || lowerPrompt.includes('간편')) {
      suggestions.valuePropositions.content.push('사용자 편의성 극대화');
    }
    if (lowerPrompt.includes('저렴') || lowerPrompt.includes('무료')) {
      suggestions.valuePropositions.content.push('비용 효율적인 솔루션');
    }
  }
  
  // 고객 세그먼트 분석
  const ageGroups = prompt.match(/\d+[-~]\d+대/g);
  if (ageGroups) {
    suggestions.customerSegments = {
      id: 'customer-segments',
      title: '고객 세그먼트',
      content: ageGroups.map(age => `${age} 타겟 고객`),
      placeholder: ''
    };
  }
  
  // 채널 분석
  if (lowerPrompt.includes('앱') || lowerPrompt.includes('모바일')) {
    suggestions.channels = {
      id: 'channels',
      title: '채널',
      content: ['모바일 앱 스토어', '앱 내 마케팅'],
      placeholder: ''
    };
  }
  if (lowerPrompt.includes('온라인') || lowerPrompt.includes('웹')) {
    if (!suggestions.channels) {
      suggestions.channels = {
        id: 'channels',
        title: '채널',
        content: [],
        placeholder: ''
      };
    }
    suggestions.channels.content.push('웹사이트', 'SNS 마케팅');
  }
  
  // 수익원 분석
  if (lowerPrompt.includes('구독') || lowerPrompt.includes('월정액')) {
    suggestions.revenueStreams = {
      id: 'revenue-streams',
      title: '수익원',
      content: ['월 구독료', '프리미엄 기능 요금'],
      placeholder: ''
    };
  }
  if (lowerPrompt.includes('광고')) {
    if (!suggestions.revenueStreams) {
      suggestions.revenueStreams = {
        id: 'revenue-streams',
        title: '수익원',
        content: [],
        placeholder: ''
      };
    }
    suggestions.revenueStreams.content.push('광고 수익');
  }
  
  // 핵심 활동 분석
  if (lowerPrompt.includes('개발') || lowerPrompt.includes('앱') || lowerPrompt.includes('플랫폼')) {
    suggestions.keyActivities = {
      id: 'key-activities',
      title: '핵심 활동',
      content: ['플랫폼 개발 및 유지보수', '사용자 경험 최적화'],
      placeholder: ''
    };
  }
  if (lowerPrompt.includes('데이터') || lowerPrompt.includes('분석')) {
    if (!suggestions.keyActivities) {
      suggestions.keyActivities = {
        id: 'key-activities',
        title: '핵심 활동',
        content: [],
        placeholder: ''
      };
    }
    suggestions.keyActivities.content.push('데이터 수집 및 분석');
  }
  
  // 핵심 자원 분석
  suggestions.keyResources = {
    id: 'key-resources',
    title: '핵심 자원',
    content: ['개발팀', '기술 인프라', '사용자 데이터베이스'],
    placeholder: ''
  };
  
  // 비용 구조 기본값
  suggestions.costStructure = {
    id: 'cost-structure',
    title: '비용 구조',
    content: ['개발 및 유지보수 비용', '마케팅 비용', '서버 및 인프라 비용'],
    placeholder: ''
  };
  
  return suggestions;
};