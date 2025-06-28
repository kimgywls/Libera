# Libera App

학생의 내신 성적과 모의고사 데이터를 바탕으로,
대학별 합격자 및 전형 기준 정보를 비교 분석하여
AI 기반으로 진학 가능성이 높은 대학 리스트를 예측하는 시스템입니다.

## 🚀 주요 기능

### 학생 관리
- 학생 목록 조회 및 검색
- 학생 정보 추가/삭제
- 학생별 상세 정보 관리 (이름, 연락처, 학교, 희망 진학 정보 등)

### 성적 제출 관리
- 학생별 성적 제출 상태 추적
- 2학년 성적, 3학년 성적, 모의고사 성적 분리 관리
- 제출 상태: 미제출, 입력중, 완료
- 모달을 통한 성적 입력 및 수정

### 사용자 인터페이스
- 반응형 테이블 레이아웃
- 체크박스를 통한 다중 선택
- 실시간 검색 및 필터링
- 모달 기반 성적 입력 폼

## 🛠 기술 스택

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Architecture**: App Router (Next.js 13+)

## 📁 프로젝트 구조

```
libera_app/
├── src/
│   ├── app/
│   │   ├── main/                    # 메인 페이지
│   │   │   ├── _actions/            # 서버 액션
│   │   │   │   ├── fetch-all-students.ts
│   │   │   │   └── fetch-students-score-submission.ts
│   │   │   ├── _components/         # UI 구성 요소
│   │   │   │   ├── StudentsListWidget.tsx
│   │   │   │   ├── StudentsTable.tsx
│   │   │   │   ├── StudentsRow.tsx
│   │   │   │   ├── StudentsHeader.tsx
│   │   │   │   └── _modal/          # 모달 컴포넌트
│   │   │   ├── _hooks/              # 커스텀 훅
│   │   │   │   ├── useFetchStudents.ts
│   │   │   │   ├── useFetchScoreSubmissions.ts
│   │   │   │   ├── useStudentsWithStatus.ts
│   │   │   │   └── useStudentSelection.ts
│   │   │   └── _utils/              # 유틸리티
│   │   ├── types/                   # TypeScript 타입 정의
│   │   │   ├── students.ts
│   │   │   └── scores.ts
│   │   └── constants.ts             # 상수 정의
│   └── ...
├── public/                          # 정적 파일
└── package.json
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
```bash
git clone [repository-url]
cd libera_app
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
npm run dev
```

4. **브라우저에서 확인**
```
http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## 📊 데이터 구조

### 학생 정보 (Student)
```typescript
interface Student {
  id?: string;              // 선택적 ID
  studentName: string;      // 학생 이름
  birthdate: string;        // 생년월일
  contact: string;          // 연락처 (부모님)
  currentSchool: string;    // 현재 학교
  desiredSchool: string;    // 희망 학교
  desiredMajor: string;     // 희망 학과
}
```

### 성적 제출 상태 (StudentScoreSubmission)
```typescript
interface StudentScoreSubmission {
  contact: string;                    // 학생 연락처 (키)
  scoreSubmission_2: SubmissionStatus;    // 2학년 성적
  scoreSubmission_3: SubmissionStatus;    // 3학년 성적
  scoreSubmission_mockTest: SubmissionStatus; // 모의고사 성적
}
```

### 제출 상태 (SubmissionStatus)
- `'미제출'` - 아직 제출하지 않음
- `'입력중'` - 현재 입력 진행 중
- `'완료'` - 제출 완료

## 🔧 주요 컴포넌트

### StudentsListWidget
- 전체 학생 목록을 관리하는 메인 위젯
- 검색 필터링과 테이블을 포함

### StudentsTable
- 학생 정보를 테이블 형태로 표시
- 체크박스 선택, 성적 제출 상태 표시
- 모달 열기 기능

### StudentsRow
- 개별 학생 행 컴포넌트
- 성적 제출 상태에 따른 버튼 표시

## ✔️ 커스텀 훅

### useFetchStudents
- 학생 목록 데이터를 가져오는 훅
- 로딩, 에러 상태 관리

### useFetchScoreSubmissions
- 성적 제출 데이터를 가져오는 훅
- 성적 제출 상태 업데이트 기능

### useStudentsWithStatus
- 학생 정보와 성적 제출 상태를 결합하는 훅

### useStudentSelection
- 체크박스 선택 상태를 관리하는 훅
