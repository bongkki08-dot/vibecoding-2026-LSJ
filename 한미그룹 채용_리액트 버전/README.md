# 한미그룹 채용 React 앱

## 개발

Node.js LTS가 필요합니다.

```powershell
npm install
npm run dev
```

Vite 개발 서버는 파일 변경을 감지해 브라우저에 반영합니다.

## 빌드 및 배포

```powershell
npm run build
npm run preview
```

배포 파일은 `dist/`에 생성됩니다. `vite.config.js`의 상대 경로 설정으로 저장소 하위 경로에서도 자산 경로가 유지됩니다. 파일을 수정하면서 production 빌드를 자동 갱신하려면 `npm run build:watch`를 사용합니다.

## 구조

- `src/App.jsx`: 정적 페이지 섹션과 공통 스크롤 동작
- `src/sections.jsx`: 메뉴, 직무/복지 데이터, 지원 안내, 설명회, 마감 카운트다운
- `css/`: 기존 반응형 스타일
- `data/`: 직무 및 복지 JSON 원본
- `public/`: 이미지, JSON, Canvas 플레이어 및 iframe 자산
- `legacy-index.html`: 변환 전 정적 페이지 보관본

직무·복지 데이터는 `data/`의 JSON을 수정하면 앱에 반영됩니다. Canvas iframe과 이미지 원본은 `public/`에 배포용으로 복사되어 있습니다.