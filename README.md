## Goat Speak (1인 개발)

### 프로젝트 소개
파파고 서비스에서 영감을 받아 *"언어 분석 및 번역 서비스는 어떻게 동작할까?"* 에 대한 호기심에서 시작된 개인 프로젝트입니다.  
단순 UI 구현을 넘어서 사용자 경험 개선과 서비스 안정성을 목표로 다양한 기술적 시도를 진행했습니다.

### GitHub & 서비스 링크
- [GitHub Repository](https://github.com/parkkunghyun/Next-Papago-speak)
- [서비스 바로가기](https://next-papago-speak-852089656314.us-central1.run.app/)

---

## 주요 기능 및 특징

### 1. API 호출 최적화
- React Query 활용 → API 호출 캐싱 및 불필요한 네트워크 요청 제거
- 평균 응답 속도 약 1000ms → 120ms 수준으로 개선

### 2. 비동기 처리 테스트 코드 작성
- Vitest, React Testing Library를 이용해 성공/실패 케이스 검증
- 안정성 확보 및 예외 케이스 대비

### 3. CI/CD 파이프라인 구축
- GitHub Actions 기반 자동 배포 파이프라인 구성
- Google Cloud Run 활용 → VM 방식 대비 하루 배포 비용 약 400원 → 30원 미만 절감

---

## 에러 핸들링 및 사용자 경험 개선

- 번역 처리 중 로딩 상태, 성공/실패 결과에 따른 UI 처리
- 에러 발생 시 사용자에게 명확한 피드백 제공 및 재시도 기능 구현
- Skeleton UI 적용 → 데이터 로딩 중에도 자연스러운 화면 유지

---

## 사용 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | Next.js, Tanstack Query(React Query) |
| API | Google Translate API, Text To Speech API |
| Deployment | GitHub Actions, Google Cloud Run |
