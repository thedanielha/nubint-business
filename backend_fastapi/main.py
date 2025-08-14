from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime
from uuid import uuid4
import re

app = FastAPI(
    title="Nubint Business Canvas API",
    description="비즈니스 모델 캔버스 생성 및 관리 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 모델 정의
class CanvasBlock(BaseModel):
    id: str
    title: str
    content: List[str]
    placeholder: str

class BusinessCanvas(BaseModel):
    id: Optional[str] = None
    name: Optional[str] = None
    key_partners: CanvasBlock
    key_activities: CanvasBlock
    key_resources: CanvasBlock
    value_propositions: CanvasBlock
    customer_relationships: CanvasBlock
    channels: CanvasBlock
    customer_segments: CanvasBlock
    cost_structure: CanvasBlock
    revenue_streams: CanvasBlock
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class GenerateCanvasRequest(BaseModel):
    prompt: str
    name: Optional[str] = None

class ApiResponse(BaseModel):
    success: bool
    message: str
    responseObject: Optional[Dict] = None
    statusCode: int

# 메모리 저장소
canvas_store: Dict[str, BusinessCanvas] = {}

def generate_canvas_from_prompt(prompt: str) -> BusinessCanvas:
    """프롬프트를 분석하여 비즈니스 캔버스 생성"""
    lower_prompt = prompt.lower()
    
    # 가치 제안 분석
    value_props = []
    if any(word in lower_prompt for word in ['앱', 'app', '서비스', 'service', '플랫폼', 'platform']):
        if any(word in lower_prompt for word in ['맞춤', '개인', 'personal', 'custom']):
            value_props.append('개인 맞춤형 서비스 제공')
        if any(word in lower_prompt for word in ['편리', '간편', 'convenient', 'easy']):
            value_props.append('사용자 편의성 극대화')
        if any(word in lower_prompt for word in ['저렴', '무료', 'free', 'cheap']):
            value_props.append('비용 효율적인 솔루션')
        if any(word in lower_prompt for word in ['빠른', 'fast', 'quick', '신속']):
            value_props.append('신속한 서비스 제공')
    
    # 고객 세그먼트 분석
    customer_segments = []
    age_groups = re.findall(r'\d+[-~]\d+대', prompt)
    if age_groups:
        customer_segments.extend([f'{age} 타겟 고객' for age in age_groups])
    
    if any(word in lower_prompt for word in ['기업', 'b2b', 'business', '회사']):
        customer_segments.append('B2B 기업 고객')
    if any(word in lower_prompt for word in ['개인', 'b2c', 'consumer', '일반']):
        customer_segments.append('B2C 개인 고객')
    if any(word in lower_prompt for word in ['학생', 'student']):
        customer_segments.append('학생 및 교육 기관')
    
    # 채널 분석
    channels = []
    if any(word in lower_prompt for word in ['앱', 'app', '모바일', 'mobile']):
        channels.extend(['모바일 앱 스토어', '앱 내 마케팅'])
    if any(word in lower_prompt for word in ['온라인', 'online', '웹', 'web']):
        channels.extend(['웹사이트', 'SNS 마케팅'])
    if any(word in lower_prompt for word in ['오프라인', 'offline', '매장', 'store']):
        channels.append('오프라인 매장')
    
    # 수익원 분석
    revenue_streams = []
    if any(word in lower_prompt for word in ['구독', 'subscription', '월정액']):
        revenue_streams.extend(['월 구독료', '프리미엄 기능 요금'])
    if any(word in lower_prompt for word in ['광고', 'ad', 'advertisement']):
        revenue_streams.append('광고 수익')
    if any(word in lower_prompt for word in ['판매', 'sale', 'sell']):
        revenue_streams.append('제품/서비스 판매')
    if any(word in lower_prompt for word in ['수수료', 'commission', 'fee']):
        revenue_streams.append('중개 수수료')
    
    # 핵심 활동
    key_activities = []
    if any(word in lower_prompt for word in ['개발', 'develop', '앱', 'app', '플랫폼']):
        key_activities.extend(['플랫폼 개발 및 유지보수', '사용자 경험 최적화'])
    if any(word in lower_prompt for word in ['데이터', 'data', '분석', 'analysis']):
        key_activities.append('데이터 수집 및 분석')
    if any(word in lower_prompt for word in ['마케팅', 'marketing']):
        key_activities.append('마케팅 및 고객 획득')
    if any(word in lower_prompt for word in ['콘텐츠', 'content']):
        key_activities.append('콘텐츠 제작 및 관리')
    
    # 핵심 자원
    key_resources = ['개발팀', '기술 인프라']
    if any(word in lower_prompt for word in ['ai', '인공지능', 'machine learning', 'ml']):
        key_resources.append('AI/ML 모델')
    if any(word in lower_prompt for word in ['데이터', 'data']):
        key_resources.append('사용자 데이터베이스')
    if any(word in lower_prompt for word in ['콘텐츠', 'content']):
        key_resources.append('콘텐츠 라이브러리')
    
    # 핵심 파트너
    key_partners = []
    if any(word in lower_prompt for word in ['api', '연동', 'integration']):
        key_partners.append('외부 API 제공업체')
    if channels:
        key_partners.append('마케팅 파트너')
    if any(word in lower_prompt for word in ['결제', 'payment']):
        key_partners.append('결제 서비스 제공업체')
    
    # 고객 관계
    customer_relationships = ['자동화된 서비스']
    if any(word in lower_prompt for word in ['커뮤니티', 'community']):
        customer_relationships.append('커뮤니티 지원')
    if any(word in lower_prompt for word in ['premium', '프리미엄', 'vip']):
        customer_relationships.append('프리미엄 고객 전담 지원')
    if any(word in lower_prompt for word in ['개인', 'personal']):
        customer_relationships.append('개인화된 서비스')
    
    # 비용 구조
    cost_structure = ['개발 및 유지보수 비용', '마케팅 비용']
    if any(word in lower_prompt for word in ['서버', 'server', '클라우드', 'cloud']):
        cost_structure.append('서버 및 인프라 비용')
    if key_resources and 'AI/ML 모델' in key_resources:
        cost_structure.append('AI 모델 훈련 비용')
    
    return BusinessCanvas(
        id=str(uuid4()),
        name=f"Canvas {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        key_partners=CanvasBlock(
            id='key-partners',
            title='핵심 파트너',
            content=key_partners if key_partners else ['전략적 파트너십 구축 필요'],
            placeholder='• 핵심 공급업체\n• 핵심 자원 제공자\n• 전략적 제휴'
        ),
        key_activities=CanvasBlock(
            id='key-activities',
            title='핵심 활동',
            content=key_activities if key_activities else ['핵심 활동 정의 필요'],
            placeholder='• 생산\n• 문제 해결\n• 플랫폼/네트워크'
        ),
        key_resources=CanvasBlock(
            id='key-resources',
            title='핵심 자원',
            content=key_resources,
            placeholder='• 물리적 자원\n• 지적 자산\n• 인적 자원\n• 재무 자원'
        ),
        value_propositions=CanvasBlock(
            id='value-propositions',
            title='가치 제안',
            content=value_props if value_props else ['고객 가치 제안 정의 필요'],
            placeholder='• 고객이 얻는 가치\n• 해결하는 문제\n• 충족하는 니즈'
        ),
        customer_relationships=CanvasBlock(
            id='customer-relationships',
            title='고객 관계',
            content=customer_relationships,
            placeholder='• 개인 지원\n• 셀프 서비스\n• 자동화 서비스\n• 커뮤니티'
        ),
        channels=CanvasBlock(
            id='channels',
            title='채널',
            content=channels if channels else ['유통 채널 정의 필요'],
            placeholder='• 인지 단계\n• 평가 단계\n• 구매 단계\n• 전달 단계\n• 사후 판매'
        ),
        customer_segments=CanvasBlock(
            id='customer-segments',
            title='고객 세그먼트',
            content=customer_segments if customer_segments else ['타겟 고객 정의 필요'],
            placeholder='• 대중 시장\n• 틈새 시장\n• 세분화된 시장\n• 다각화된 시장'
        ),
        cost_structure=CanvasBlock(
            id='cost-structure',
            title='비용 구조',
            content=cost_structure,
            placeholder='• 고정 비용\n• 변동 비용\n• 규모의 경제\n• 범위의 경제'
        ),
        revenue_streams=CanvasBlock(
            id='revenue-streams',
            title='수익원',
            content=revenue_streams if revenue_streams else ['수익 모델 정의 필요'],
            placeholder='• 자산 판매\n• 사용료\n• 구독료\n• 라이선스'
        ),
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

@app.get("/")
async def root():
    return {
        "message": "Nubint Business Canvas API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.post("/api/business/canvas/generate")
async def generate_canvas(request: GenerateCanvasRequest):
    """프롬프트를 기반으로 비즈니스 캔버스 생성"""
    try:
        canvas = generate_canvas_from_prompt(request.prompt)
        if request.name:
            canvas.name = request.name
        
        # 저장
        canvas_store[canvas.id] = canvas
        
        return ApiResponse(
            success=True,
            message="Canvas generated successfully",
            responseObject=canvas.dict(),
            statusCode=200
        )
    except Exception as e:
        return ApiResponse(
            success=False,
            message=str(e),
            responseObject=None,
            statusCode=500
        )

@app.get("/api/business/canvas")
async def list_canvases():
    """저장된 모든 캔버스 목록 조회"""
    try:
        canvases = [canvas.dict() for canvas in canvas_store.values()]
        return ApiResponse(
            success=True,
            message="Canvases retrieved successfully",
            responseObject=canvases,
            statusCode=200
        )
    except Exception as e:
        return ApiResponse(
            success=False,
            message=str(e),
            responseObject=None,
            statusCode=500
        )

@app.get("/api/business/canvas/{canvas_id}")
async def get_canvas(canvas_id: str):
    """특정 캔버스 조회"""
    if canvas_id not in canvas_store:
        raise HTTPException(status_code=404, detail="Canvas not found")
    
    return ApiResponse(
        success=True,
        message="Canvas retrieved successfully",
        responseObject=canvas_store[canvas_id].dict(),
        statusCode=200
    )

@app.put("/api/business/canvas/{canvas_id}")
async def update_canvas(canvas_id: str, canvas_update: Dict):
    """캔버스 업데이트"""
    if canvas_id not in canvas_store:
        raise HTTPException(status_code=404, detail="Canvas not found")
    
    canvas = canvas_store[canvas_id]
    for key, value in canvas_update.items():
        if hasattr(canvas, key):
            setattr(canvas, key, value)
    canvas.updated_at = datetime.now()
    
    return ApiResponse(
        success=True,
        message="Canvas updated successfully",
        responseObject=canvas.dict(),
        statusCode=200
    )

@app.delete("/api/business/canvas/{canvas_id}")
async def delete_canvas(canvas_id: str):
    """캔버스 삭제"""
    if canvas_id not in canvas_store:
        raise HTTPException(status_code=404, detail="Canvas not found")
    
    del canvas_store[canvas_id]
    return ApiResponse(
        success=True,
        message="Canvas deleted successfully",
        responseObject=None,
        statusCode=200
    )

@app.post("/api/business/canvas/{canvas_id}/duplicate")
async def duplicate_canvas(canvas_id: str):
    """캔버스 복제"""
    if canvas_id not in canvas_store:
        raise HTTPException(status_code=404, detail="Canvas not found")
    
    original = canvas_store[canvas_id]
    duplicated = original.copy()
    duplicated.id = str(uuid4())
    duplicated.name = f"{original.name} (Copy)"
    duplicated.created_at = datetime.now()
    duplicated.updated_at = datetime.now()
    
    canvas_store[duplicated.id] = duplicated
    return ApiResponse(
        success=True,
        message="Canvas duplicated successfully",
        responseObject=duplicated.dict(),
        statusCode=200
    )