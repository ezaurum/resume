import { Project } from "@/types/Project.ts"

export default [
  {
    title: "CongKong",
    tags: [
      "Go",
      "REST API",
      "Vue",
      "B2B",
      "Docker",
      "AWS",
      "ECS",
      "CI/CD",
      "Agile",
      "scale-out",
      "redis",
      "websocket",
    ],
    teamSize: "2-7",
    employer: "리바이벌랩스",
    employmentType: "외주",
    from: new Date("2017-08-01"),
    to: new Date("2024-04-01"),
    description: "이벤트 운영 B2B 플랫폼 개발/운영(피봇 후 신규개발)",
    roles: ["CTO", "백엔드 개발", "프론트 개발"],
    achievements: [
      "PHP에서 Go/SPA로 변경하여 성능 100배(초당 request 기준 30 -> 3000), 월비용 절반으로 개선",
      "AWS ECS로 마이그레이션",
      "CI/CD 파이프라인 구축",
      "무경험자로 이루어진 팀을 교육하여 웹서비스 출시/운영",
      "Vue로 구현된 SPA로 사용자 페이지를 교체, 고객 경험 개선",
      "관리자 툴 개발로 오거나이저가 직접 행사 관리 가능하게 함",
      "2년간 코칭으로 무경험자 2명으로 Go서버/Vue 프론트 개발 및 운영 가능하게 함",
      "이해하기 쉽고 단순한 아키텍처를 목표로 프론트 구성",
      "이벤트 드리븐 구조로 서버 기능의 결합도 낮춤",
      "의도적으로 반복적인 코드를 사용하여 이해 쉽도록 함",
      "CI/CD 구축으로 배포작업 자동화",
      "개발 워크플로 단순화",
      "행사별 필요 기능 개발로 매출 증대",
      "행사용 게시판(공지, 워드클라우드, 사진공유 등)",
      "학습 관리 시스템(영상 시청 확인, 시험, 출결, 수업 신청 등)",
      "행사장 출결 확인",
      "카카오톡/MMS/Email전송 시스템",
      "웨비나 시스템",
      "위지윅 페이지 구성",
      "경품 추첨",
      "실시간 퀴즈 게임(websocket)",
      "출석용 OTP",
      "질문/답변 시스템",
      "투자대회(투표)",
      "세션 출석 체크",
      "논문/발표 공유 시스템",
      "스탬프 투어(GPS, 멀티터치를 통한 물리 스탬프, 바코드 등)",
      "행사장 체크인 시스템(바코드 리딩, 명찰 출력 자동화 등)",
      "AI 봇(Chat GPT사용)",
    ],
  },
  {
    title: "클라우드 업체 이전 및 배포 환경 개선",
    tags: ["CI/CD", "AWS", "Azure"],
    teamSize: "2",
    employer: "베베쿡",
    department: "외주",
    from: new Date("2021-01-01"),
    to: new Date("2021-04-01"),
    description: "클라우드 업체 이전 및 배포 환경 개선",
    roles: ["CI/CD 구축", "이벤트 페이지 개발"],
    achievements: [
      "개발자 공백기간 동안 이벤트 페이지에 대한 분석 및 인수인계",
      "CI/CD 구축으로 Azure 의 수동배포에서 AWS ECS 자동 배포",
    ],
  },
  {
    title: "강의, 결제 시스템 개선",
    tags: ["Kotlin", "Spring"],
    teamSize: "1",
    employer: "더스윙",
    department: "외주",
    from: new Date("2021-05-01"),
    to: new Date("2021-10-01"),
    description: "강의, 결제 시스템 개선",
    roles: ["주니어 개발자 대상 강의", "결제 시스템 개선"],
    achievements: [
      "강의를 통해 주니어 개발자의 능력 향상",
      "결제 시스템 개선 - 여러 PG사의 결제 로직을 동일 인터페이스로 통일",
    ],
  },
  {
    title: "코칭",
    tags: ["컨설팅", "코칭"],
    teamSize: "1",
    employer: "샘랩",
    department: "외주",
    from: new Date("2022-01-01"),
    to: new Date("2022-04-01"),
    description: "컨설턴트 및 팀 코칭",
    roles: [
      "신규 팀원의 적응과 학습을 도움",
      "개발 방향성에 대한 조언 및 기술적 결정에 대한 컨설팅",
    ],
    achievements: [],
  },
  {
    title: "코오롱 몰 백오피스 개발 및 지원",
    tags: ["AWS SQS", "AWS Lambda", "Spring Batch", "SAP"],
    teamSize: "20-25",
    employer: "퍼플웍스",
    department: "외주",
    from: new Date("2022-05-01"),
    to: new Date("2023-04-01"),
    description: "코오롱 몰 백오피스 개발 및 지원",
    roles: ["백오피스 개발", "신기술에 대한 R&D", "리뷰 연동"],
    achievements: [
      "AWS SQS/AWS lambda 이용하여 리뷰 데이터 외부 서비스와 연동",
      "신규 프로젝트의 웹 퍼포먼스 최적화",
      "배송 관련 배치 작업 개선(Spring Batch, SAP)",
    ],
  },
  {
    title: "전자 동의서 관리 시스템(SIMS) 개발",
    tags: ["Vue", "SPA", "웹앱"],
    teamSize: "3",
    employer: "씽크튜브",
    department: "외주",
    from: new Date("2023-05-01"),
    to: new Date("2023-10-01"),
    description: "전자 동의서 관리 시스템(SIMS) 개발",
    roles: ["백오피스 프론트 SPA", "웹앱 개발"],
    achievements: [
      "Vue 사용한 웹앱으로 웹 및 앱에서 모두 사용 가능하도록 함",
      "서명 모듈의 반응성 향상으로 사용자 경험 개선",
    ],
  },
  {
    title: "대한가발협회 가발제작 주문시스템",
    tags: ["Java", "Spring", "iBatis"],
    teamSize: "1",
    employer: "스위트케이",
    department: "외주",
    from: new Date("2023-11-01"),
    to: new Date("2024-03-01"),
    description: "대한가발협회 가발제작 주문시스템",
    roles: ["Java(Spring, iBatis) 기반 서버 개발"],
    achievements: [],
  },
  {
    title: "물품 판매/매출/재고 관리 시스템 (AMS)",
    tags: ["Java", "Spring", "AWS"],
    teamSize: "1",
    employer: "온페이스",
    department: "외주",
    from: new Date("2024-04-01"),
    to: new Date("2024-06-01"),
    description: "물품 판매/매출/재고 관리 시스템 (AMS)",
    roles: ["서버, DB 설계 및 구현", "배포"],
    achievements: ["Java(Spring) 기반 서버 구현", "AWS 기반 배포"],
  },
  {
    title: "소셜 카지노 게임 개발 및 운영 (스위트 인 베가스)",
    tags: ["Java", "Spring", "Docker", "Flash"],
    teamSize: "2-4",
    employer: "옥타브 게임즈",
    department: "개발팀",
    from: new Date("2024-07-01"),
    to: new Date("2026-01-01"),
    description: "소셜 카지노 게임 개발 및 운영 (스위트 인 베가스)",
    roles: ["개발 총괄"],
    achievements: [
      "Java(Spring) 기반 게임 서버 개발(REST)",
      "Java(Spring) 기반 게임 어드민 개발",
      "Flash 를 이용한 게임 클라이언트 개발",
      "Docker 사용 개발 환경 간소화",
      "초기 멤버로 팀 빌딩",
      "글로벌 런치, 1년간 운영",
      "CD로 자동배포",
    ],
  },
  {
    title: "데빌스 게이트",
    tags: [
      ".Net",
      "ASP",
      "MORPG",
      "REST",
      "Dapper",
      "nInject",
      "Unity3D",
      "NGUI",
      "SQL Server",
    ],
    teamSize: "2",
    employer: "캐럿게임즈",
    department: "개발팀",
    from: new Date("2026-02-01"),
    to: new Date("2026-05-01"),
    description: ".Net ASP 기반 MORPG 게임 서버 개발",
    roles: ["서버 개발", "DB 설계 및 구현"],
    achievements: [
      "CI를 통해 테스트 서버 배포, 테스트, 문서화를 자동화하여 매일 1시간 이상을 절약",
    ],
  },
  {
    title: "리버스",
    tags: ["Photon", "MMORPG", "TCP"],
    teamSize: "2",
    employer: "캐럿게임즈",
    department: "개발팀",
    from: new Date("2026-06-01"),
    to: new Date("2026-12-01"),
    description: "포톤 엔진을 사용한 MMORPG 서버 개발",
    roles: ["서버 개발", "DB 설계 및 구현"],
    achievements: [
      "초기멤버로 서버 개발로 1차 투자 유치에 기여",
      "CI를 통해 테스트 서버 배포, 테스트, 문서화를 자동화하여 매일 1시간 이상을 절약",
    ],
  },
  {
    title: "뱀파이어 키스",
    tags: [
      ".Net",
      "ASP",
      "MORPG",
      "REST",
      "Dapper",
      "nInject",
      "Unity3D",
      "NGUI",
      "SQL Server",
    ],
    teamSize: "2",
    employer: "캐럿게임즈",
    department: "개발팀",
    from: new Date("2027-01-01"),
    to: new Date("2027-06-01"),
    description: ".Net ASP 기반 MORPG 게임 서버 개발",
    roles: ["서버 개발", "DB 설계 및 구현"],
    achievements: [
      "CI를 통해 테스트 서버 배포, 테스트, 문서화를 자동화하여 매일 1시간 이상을 절약",
    ],
  },
  {
    title: "드래곤네스트 원더랜드",
    tags: ["C#", "TCP", "Unity 3D", "Python"],
    teamSize: "2",
    employer: "큐브게임즈",
    department: "개발팀",
    from: new Date("2027-07-01"),
    to: new Date("2028-06-01"),
    description: "C# 실시간 멀티플레이 보드게임 서버 개발",
    roles: ["서버 개발", "클라이언트 네트워크 라이브러리 개발"],
    achievements: [
      "중화권 런칭",
      "스케일 아웃을 통한 대규모 요청(40k req/s) 처리 / 멀티쓰레드, TCP/IP / C#",
      "iOS정책문제로 mono에서 제네릭을 사용할 수 없는 문제가 발생하여 python으로 코드 제네레이터를 만들어 제네릭 사용한 코드를 자동생성하여 해결",
    ],
  },
  {
    title: "타워 오브 다이스",
    tags: ["Java", "Spring", "myBatis"],
    teamSize: "2",
    employer: "큐브게임즈",
    department: "개발팀",
    from: new Date("2028-07-01"),
    to: new Date("2028-11-01"),
    description: "Java spring framework 기반 게임 서버 개발",
    roles: ["서버 개발"],
    achievements: [
      "CI를 통해 테스트 서버 배포, 테스트, 문서화를 자동화하여 업무시간 절약",
    ],
  },
  {
    title: "시크릿 게이트",
    tags: ["Spring", "Hibernate", "jQuery", "AngularJS"],
    teamSize: "5",
    employer: "키다리 스튜디오",
    department: "개발팀",
    from: new Date("2029-01-01"),
    to: new Date("2030-01-01"),
    description: "운영툴 백/프론트엔드 개발",
    roles: ["서버 개발", "프론트엔드 개발"],
    achievements: ["CI를 통해 테스트 자동화", "글로벌 출시"],
  },
  {
    title: "사내 웹 솔루션 개발",
    tags: ["Spring", "myBatis"],
    teamSize: "20-30",
    employer: "그루폰",
    department: "개발팀",
    from: new Date("2030-02-01"),
    to: new Date("2030-08-01"),
    description: "사내 웹 솔루션 개발",
    roles: ["백엔드 개발"],
    achievements: [
      "1분 이상 소요되던 정산 자료 조회를 배치처리를 통해 미리 함으로써 즉시 조회 가능하도록 함",
    ],
  },
  {
    title: "군 내 인터넷 사이트 유지보수 및 개발",
    tags: ["Spring", "myBatis", "PHP"],
    teamSize: "30-40",
    employer: "공군중앙 전산소",
    department: "개발팀",
    from: new Date("2030-09-01"),
    to: new Date("2032-09-01"),
    description: "군 내 인터넷 사이트 유지보수 및 개발",
    roles: ["백엔드 개발", "프론트엔드 개발"],
    achievements: [
      "공군 인터넷/인트라넷 메일 신청 동기화",
      "내부/외부망의 단절 문제로 수기로 진행하던 메일 신청을 스크립트를 이용, 자동화하여 매일 2-3시간 걸리던 업무 5분 내외로 단축",
    ],
  },
] as Project[]
