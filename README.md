# 키워드림 (Grow-Dream)

> 자립을 준비하는 청년이 **경제 공부 → 진로 설계 → 후원 연결**까지 한 앱에서 해낼 수 있도록 돕는 모바일 서비스

**🔗 웹 데모: https://heychaewong.github.io/Grow-Dream-Frontend/**
(PC에서는 폰 화면 폭으로 보여요. 휴대폰 브라우저로 열면 앱처럼 쓸 수 있어요.)

직접 Figma로 기획·디자인한 서비스를 **React Native + TypeScript(Expo)** 로 구현한 프론트엔드 프로젝트예요. 백엔드 없이 화면과 사용자 흐름에 집중했고, 데이터는 모두 가상의 데이터예요.

<p>
  <img src="docs/screenshots/01-home.png" width="200" alt="홈 화면" />
  <img src="docs/screenshots/02-education.png" width="200" alt="경제교육 화면" />
  <img src="docs/screenshots/04-roadmap.png" width="200" alt="진로 로드맵 화면" />
  <img src="docs/screenshots/05-funding.png" width="200" alt="펀딩 화면" />
</p>

---

## 누구를 위한 서비스인가요?

보호가 끝나면 자립을 준비해야 하는 청년들은 돈 관리, 진로, 생활 정보를 **혼자서** 알아봐야 해요. 키워드림은 이 과정을 **따뜻하고 친절하게** 함께하는 것을 목표로 해요.

## 주요 기능

| 기능 | 설명 | 화면 |
|---|---|---|
| **오늘의 질문** | 하루 한 번 나를 돌아보는 질문. 화면 이동 없이 그 자리에서 답변을 쓰고 바로 확인해요. | <img src="docs/screenshots/01-home.png" width="140" /> |
| **경제교육** | 강의 → 학습 → OX·빈칸 퀴즈. 맞히면 코인을 받고 진도율이 올라가요. 데일리 퀴즈, 오늘의 이슈, 진도율 랭킹도 있어요. | <img src="docs/screenshots/03-quiz.png" width="140" /> |
| **진로 로드맵** | 목표를 지하철 노선도처럼 이어 보여 줘요. 정류장(목표)을 추가·삭제·완료 표시하면 노선이 다시 그려져요. | <img src="docs/screenshots/04-roadmap.png" width="140" /> |
| **펀딩** | 개인 후원 신청, 기업 교육 공고 신청, 수급자 정기후원. 후원을 시작하면 키워드림톡과 연결돼요. | <img src="docs/screenshots/06-donate.png" width="140" /> |
| **키워드림톡** | 정책·이슈 채널 소식과 후원자-수급자 대화. 응원 메시지를 보낼 수 있어요. | <img src="docs/screenshots/07-talk.png" width="140" /> |
| **마이페이지** | 자격증·일기·질문 기록, 나의 꿈, 경제교육 진도율, 자기소개 | <img src="docs/screenshots/08-my.png" width="140" /> |

## 기술 스택

| 분류 | 사용 기술 |
|---|---|
| 언어 | TypeScript |
| 프레임워크 | React Native 0.88, React 19, **Expo SDK 58** |
| 라우팅 | **Expo Router** (파일 기반 라우팅, typed routes) |
| 상태 관리 | React Context (기능별 store 3개) |
| 그래픽 | react-native-svg (진로 로드맵 노선도) |
| 웹 | react-native-web, 정적 렌더링(Static export) |
| 품질 | ESLint, `tsc --noEmit`, React Compiler |
| 배포 | GitHub Actions → GitHub Pages (main에 합쳐지면 자동 배포) |

하나의 코드로 **iOS · Android · 웹**을 함께 지원하도록 만들었어요.

## 설계 포인트

### 1. 노선도처럼 그리는 진로 로드맵 (SVG)
목표 개수에 따라 정류장 위치를 계산하고, 정류장 사이를 지그재그 노선으로 이어서 SVG로 그려요. 목표를 추가하거나 지우면 위치와 노선이 자동으로 다시 계산돼요. 정류장은 SVG 위에 버튼으로 겹쳐서 눌러서 상세 정보를 볼 수 있어요.
→ [`src/components/roadmap/route-map.tsx`](src/components/roadmap/route-map.tsx)

### 2. 기능별로 나눈 전역 상태
코인·학습 진도(`app-store`), 로드맵(`roadmap-store`), 후원(`funding-store`)을 따로 관리해요. 예를 들어 펀딩에서 정기후원을 시작하면 키워드림톡에 그 수급자의 채널이 바로 생기고, 퀴즈를 맞히면 모든 화면의 코인 수가 함께 바뀌어요.
→ [`src/store/`](src/store/)

### 3. 디자인 시스템과 디자인 가이드
색·글자 크기·간격을 토큰으로 정의하고([`theme.ts`](src/constants/theme.ts)), 규칙은 [**DESIGN.md**](DESIGN.md)에 정리했어요. 예를 들어 본문은 17px 이상, 색은 토큰으로만, 버튼 터치 영역은 44px 이상이라는 규칙이 있어요. 글자 크기를 바꿀 때도 화면마다 숫자를 고치지 않고 토큰 하나만 바꿔서 앱 전체에 적용했어요.

### 4. 크로스 플랫폼 디테일
- **한글 줄바꿈:** 웹 브라우저는 한글을 글자 단위로 끊어서, 웹에서만 단어 단위(`word-break: keep-all`)로 바꿨어요.
- **Android 폰트:** Android는 직접 넣은 폰트의 굵기(`fontWeight`)를 무시해서, Pretendard를 굵기마다 다른 이름으로 등록했어요.
- **웹 정적 배포:** 화면마다 HTML을 미리 만들어서, 강의·대화 같은 동적 주소로 바로 들어와도 열리게 했어요(`generateStaticParams`).

### 5. 저작권을 지키는 리소스 사용
Figma 시안의 일러스트와 사진은 출처를 확인할 수 없어서 쓰지 않았어요.
- 아이콘과 로고 → 오픈소스 아이콘(`@expo/vector-icons`)
- 인물 사진 → 아바타, 기타 사진 → 임시 그림
- 실제 인물 이름 → 가상의 이름, 출처 없는 통계 → 쓰지 않음
- 폰트 → [Pretendard](https://github.com/orioncactus/pretendard) (SIL OFL 1.1)

## 프로젝트 구조

```
src/
├─ app/            # 화면 (Expo Router: 파일 하나 = 화면 하나)
│  ├─ _layout.tsx  # 폰트, 전역 상태, 웹 가운데 정렬
│  └─ (tabs)/      # 하단 탭: 홈 / 마이페이지
│     └─ (home)/   # 홈 탭 안의 화면들 (education, roadmap, funding, talk)
├─ components/     # 화면에서 쓰는 컴포넌트 (ui/ 는 공통 컴포넌트)
├─ constants/      # 디자인 토큰 (theme.ts)
├─ data/           # 가상 데이터
└─ store/          # 전역 상태 (Context)
```

## 실행 방법

```bash
npm install
npx expo start      # w: 웹으로 열기 / 휴대폰은 Expo Go 앱으로 QR 코드 스캔
```

```bash
npx tsc --noEmit    # 타입체크
npx expo lint       # 린트
npx expo export -p web   # 웹 정적 빌드 (dist/)
```

## 작업 방식

- 기능 단위로 브랜치를 만들고 **PR로 합쳐요.** PR에는 무엇을, 왜 바꿨는지와 확인한 것을 남겨요([PR 템플릿](.github/pull_request_template.md)).
- `main`에 합쳐지면 GitHub Actions가 타입체크 → 린트 → 웹 빌드 → 배포를 자동으로 해요([`deploy.yml`](.github/workflows/deploy.yml)).
