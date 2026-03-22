# 전국러닝협회 (KNRA) 공식 웹사이트

**Korea National Running Association** — 대한민국 러닝 문화의 중심

---

## 프로젝트 개요

전국러닝협회(KNRA)의 공식 홈페이지입니다. 레드 컬러 테마 기반의 모던 반응형 웹사이트로, 협회 소개·조직도·활동 소식 공개 및 관리자 CMS 기능을 포함합니다.

---

## 완성된 기능

### 공개 페이지
| 파일 | 기능 |
|------|------|
| `index.html` | 메인 홈페이지 — 히어로 슬라이더, 통계 카운터, 최신 활동 목록(API), 일정 섹션 |
| `about.html` | 협회소개 — 인사말(pages API 동적 로드), 비전·미션, 연혁 탭 |
| `organization.html` | 조직도 — 본부 차트(회장·사무총장·부회장·팀장), 지부 조직(12개 지부), pages API 안내문구 |
| `activities.html` | 활동 목록 — 블로그형 카드 그리드, 검색, 더보기 페이지네이션 |
| `activity-detail.html` | 활동 상세 — 히어로 이미지, 본문, 이미지 갤러리·라이트박스 |
| `admin.html` | 관리자 CMS — 로그인, 활동 CRUD, 협회소개·조직도 실시간 편집 |

### 관리자 CMS (admin.html)
- **로그인**: 세션 기반 인증 (테스트 계정: `admin` / `admin123`)
- **활동 게시물 관리**: 목록 조회, 새 게시물 작성, 수정, 삭제 (Quill 리치에디터)
- **협회소개 편집**: Quill 에디터로 인사말 편집 → `pages` 테이블 즉시 저장 → `about.html` 자동 반영
- **조직도 편집**: 조직도 상단 안내문구 편집 → `pages` 테이블 즉시 저장 → `organization.html` 자동 반영

---

## 페이지 URL 및 파라미터

| 경로 | 설명 |
|------|------|
| `/index.html` | 홈 |
| `/about.html` | 협회소개 (hash: `#greeting`, `#vision`, `#history`) |
| `/organization.html` | 조직도 |
| `/activities.html` | 활동 목록 |
| `/activity-detail.html?id={post_id}` | 활동 상세 |
| `/admin.html` | 관리자 (로그인 필요) |

---

## 데이터 구조

### `activities` 테이블 (활동 게시물)
| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | text | UUID (자동) |
| `title` | text | 게시물 제목 |
| `summary` | text | 목록용 요약 |
| `content` | rich_text | 본문 HTML |
| `thumbnail` | text | 대표 이미지 URL |
| `images` | array | 갤러리 이미지 URL 배열 |
| `author` | text | 작성자 |
| `published_at` | datetime | 게시일 |
| `is_published` | bool | 공개 여부 |
| `category` | text | 카테고리 (레거시) |

### `pages` 테이블 (단일 페이지 콘텐츠)
| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | text | UUID (자동) |
| `page_key` | text | 페이지 식별자 (`about`, `organization`) |
| `title` | text | 페이지 제목 |
| `content` | rich_text | 편집 가능한 HTML 콘텐츠 |
| `updated_by` | text | 최종 수정자 |
| `updated_note` | text | 수정 메모 |

---

## API 엔드포인트 (RESTful Table API)

```
GET    tables/activities?limit=200          # 활동 목록 조회
GET    tables/activities/{id}               # 활동 상세 조회
POST   tables/activities                    # 활동 생성
PUT    tables/activities/{id}               # 활동 전체 수정
PATCH  tables/activities/{id}               # 활동 부분 수정
DELETE tables/activities/{id}               # 활동 삭제

GET    tables/pages?limit=50                # 페이지 콘텐츠 목록
PATCH  tables/pages/{id}                    # 페이지 콘텐츠 수정
POST   tables/pages                         # 페이지 콘텐츠 생성
```

---

## 디자인 시스템

| 항목 | 값 |
|------|-----|
| 주색상 | `#c0392b` (딥 레드) |
| 진한 주색상 | `#7b0d0d` (다크 레드) |
| 밝은 주색상 | `#e74c3c` (라이트 레드) |
| 폰트 | Noto Sans KR (Google Fonts) |
| CSS 프레임워크 | Tailwind CSS (CDN) |
| 아이콘 | Font Awesome 6 |

---

## 조직 구성 (organization.html 반영)

**본부** — 대전

| 직책 | 성명 |
|------|------|
| 회장 | 이중범 |
| 사무총장 | 윤세준 |
| 부회장 (대회운영) | 정성완 |
| 부회장 (홍보마케팅) | 박지흠 |
| 부회장 (데이터관리) | 권수정 |
| 부회장 (재무) | 위다영 |

**팀장**: 운영(이재민), 안전(변명문), 홍보(정지민), 염찬(손미영), 정보(박준영), 총무(윤미경)

**자문단**: 법무(윤철민), 의료(이상숙), 스포츠·기자(김경무), 재무(김형철), IT(민경진)

**지부 (12개)**:
- 충청권: 세종·청주·아산
- 수도권: 서울·남양주·고양·오산
- 영남권: 대구·부산·울산·양산
- 호남권: 광주

---

## 다음 개발 권장 사항

1. **협회소개 비전·연혁 탭도 CMS 연동** — 현재는 정적 HTML
2. **활동 게시물 이미지 업로드** — 외부 이미지 스토리지 연동
3. **지부 상세 페이지** — 각 지부별 페이지 추가
4. **사이트 검색 기능** — 통합 검색창
5. **SNS 공유 기능** — 활동 상세 페이지 OG 태그 추가

---

*최종 업데이트: 2026년 3월 20일*
