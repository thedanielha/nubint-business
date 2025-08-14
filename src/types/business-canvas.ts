export interface BusinessCanvasBlock {
  id: string;
  title: string;
  content: string[];
  placeholder: string;
}

export interface BusinessCanvas {
  keyPartners: BusinessCanvasBlock;
  keyActivities: BusinessCanvasBlock;
  keyResources: BusinessCanvasBlock;
  valuePropositions: BusinessCanvasBlock;
  customerRelationships: BusinessCanvasBlock;
  channels: BusinessCanvasBlock;
  customerSegments: BusinessCanvasBlock;
  costStructure: BusinessCanvasBlock;
  revenueStreams: BusinessCanvasBlock;
}

export const initialCanvasData: BusinessCanvas = {
  keyPartners: {
    id: 'key-partners',
    title: '핵심 파트너',
    content: [],
    placeholder: '• 핵심 공급업체\n• 핵심 자원 제공자\n• 전략적 제휴'
  },
  keyActivities: {
    id: 'key-activities',
    title: '핵심 활동',
    content: [],
    placeholder: '• 생산\n• 문제 해결\n• 플랫폼/네트워크'
  },
  keyResources: {
    id: 'key-resources',
    title: '핵심 자원',
    content: [],
    placeholder: '• 물리적 자원\n• 지적 자산\n• 인적 자원\n• 재무 자원'
  },
  valuePropositions: {
    id: 'value-propositions',
    title: '가치 제안',
    content: [],
    placeholder: '• 고객이 얻는 가치\n• 해결하는 문제\n• 충족하는 니즈'
  },
  customerRelationships: {
    id: 'customer-relationships',
    title: '고객 관계',
    content: [],
    placeholder: '• 개인 지원\n• 셀프 서비스\n• 자동화 서비스\n• 커뮤니티'
  },
  channels: {
    id: 'channels',
    title: '채널',
    content: [],
    placeholder: '• 인지 단계\n• 평가 단계\n• 구매 단계\n• 전달 단계\n• 사후 판매'
  },
  customerSegments: {
    id: 'customer-segments',
    title: '고객 세그먼트',
    content: [],
    placeholder: '• 대중 시장\n• 틈새 시장\n• 세분화된 시장\n• 다각화된 시장'
  },
  costStructure: {
    id: 'cost-structure',
    title: '비용 구조',
    content: [],
    placeholder: '• 고정 비용\n• 변동 비용\n• 규모의 경제\n• 범위의 경제'
  },
  revenueStreams: {
    id: 'revenue-streams',
    title: '수익원',
    content: [],
    placeholder: '• 자산 판매\n• 사용료\n• 구독료\n• 라이선스'
  }
};