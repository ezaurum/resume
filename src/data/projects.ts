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
    from: new Date("2017-08-01"),
    to: new Date("2024-04-01"),
    description: "이벤트 운영 B2B 플랫폼 개발/운영(피봇 후 신규개발)",
    roles: ["CTO", "서버 개발", "프론트 개발"],
    achievements: [
      "PHP에서 Go/SPA로 변경하여 성능 100배(초당 request 기준 30 -> 3000), 월비용 절반으로 개선",
      "AWS ECS로 마이그레이션",
      "CI/CD 파이프라인 구축",
      "무경험자로 이루어진 팀을 교육하여 웹서비스 출시/운영",
    ],
  },
] as Project[]
