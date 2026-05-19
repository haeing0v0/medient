# 💊 Medient

DUR 공공데이터 기반 개인 맞춤 의약품 안전 복약 관리 서비스

<br/>

## 📌 프로젝트 소개

Medient는 식품의약품안전처 공공데이터(DUR, e약은요)를 활용하여  
사용자의 복약 정보를 관리하고, 병용금기 및 위험 약물 조합을 확인할 수 있는  
개인 맞춤형 복약 관리 웹 서비스입니다.

<br/>

## 🎯 주요 기능

### 🔎 약 검색 및 상세 정보 조회
- 약 이름 기반 검색
- 자동완성 기능 지원
- 효능, 복용법, 주의사항, 부작용 정보 제공

### ⚠️ DUR 안전체크
- 병용금기 여부 확인
- 효능군중복 확인
- 용량주의 확인
- 투여기간주의 확인
- 노인주의 / 임부금기 등 위험 정보 제공

### 💊 내 복용약 관리
- 복용약 등록 / 수정 / 삭제
- 오늘 복용약 확인
- 복용 완료 체크
- 복용 일정 관리

### 📊 통계 및 복약 시각화
- 주간 / 월간 복용률
- 연속 복용 일수
- 최근 복용 기록
- 위험 알림 자동 표시

<br/>

## 🛠️ Tech Stack

### Front-End
- React 19
- TypeScript
- HTML5
- CSS3
- Axios

### Back-End
- Spring Boot 3.4.12
- Java 17
- JSP / Servlet 5.0
- MyBatis

### Database
- MySQL 8.0.33

### DevOps
- AWS EC2
- Docker
- Docker Compose
- Nginx
- Ansible
- GitHub

### Open API
- 식품의약품안전처 DUR API
- e약은요 API

<br/>

## 🗂️ 프로젝트 구조

```bash
medient/
├── medient-frontend/   # React Front-End
├── medientApi/         # Spring Boot Back-End
└── README.md
```

<br/>

## 🧩 시스템 구성

```txt
React (Vite)
   ↓
Nginx Reverse Proxy
   ↓
Spring Boot REST API
   ↓
MySQL Database
   ↓
DUR / e약은요 Open API
```

<br/>

## 🔐 인증 방식

- JWT 기반 로그인 인증
- Axios Interceptor를 통한 토큰 자동 포함
- 사용자별 복약 데이터 관리

<br/>

## 🚀 배포 환경

- AWS EC2 Ubuntu 서버 배포
- Docker Compose 기반 통합 실행
- Nginx Reverse Proxy 적용
- GitHub 기반 프로젝트 관리
- Ansible 자동화 구성

<br/>

## 📈 성능 개선

- DUR 비동기 처리 최적화
- 위험 알림 UI 동기화 개선
- Soft Delete 기반 복용 기록 유지
- 통계 데이터 반영 로직 개선

<br/>

## 📌 향후 계획

- 복약 후기 커뮤니티 기능
- 랜덤 닉네임 생성 기능
- 사용자 프로필 아이콘 제공
- 임산부 / 노인 사용자 구분 기능

<br/>

## 👨‍💻 Developer

- 박해인
- Computer Science
- Full-Stack Web Developer

<br/>

## 📄 License

This project is for educational and portfolio purposes.
