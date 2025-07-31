# Timer To Do List

Vanilla JavaScript로 구현된 Todo 애플리케이션입니다.

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [구현 요구사항](#구현-요구사항)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)

## 프로젝트 개요

Webpack5를 사용하여 환경분리와 함께 개발환경을 구성하였습니다. Vanilla JavaScript로 사용하면서 기존의 사용하던 기술 스펙인 React, Zustand의 동작방식과 유사하도록 하였고, 컴포넌트 기반 아키텍처, 가상 DOM, 상태 관리, 라우팅 등 프론트엔드 개발 개념들을 생각하면서 구현하였습니다.

## 구현 요구사항 (✅ 진행된 항목들입니다.)

- ✅ 예시 UI 의 요소들을 모두 넣어주세요.
- 할 일 만들기
  - ✅ 할 일 내용의 글자수 제한은 없습니다.
  - ✅ 종료 시간은 초 단위로 숫자 입니다.
  - ✅ 할 일 내용, 종료 시간은 필수 입력 항목입니다.
  - ✅ 할 일 내용, 종료 시간을 바르게 입력 후 “추가” 버튼을 클릭하면 할 일 목록에 추가 됩니다.

### 필수 항목

- 할 일 목록

  - 정렬 기능

    - ✅ “입력한 순”(기본값), “남은 시간 순” 버튼 클릭에 따라 목록 아이템의 정렬이 변경됩니다.
    - ✅ 현재 반영되어 있는 값의 버튼에 활성화 UI 를 적용해 주세요.

  - 종료 기능

    - ✅ 종료된 목록 아이템은 “종료된 할 일” 로 이동됩니다.
    - 전체 종료
      - ✅ 모든 할 일 바로 종료됩니다.
    - 선택 종료
      - ✅ 체크된 목록 아이템이 바로 종료됩니다.
      - ✅ 체크된 목록 아이템이 없을 경우 버튼에 비활성화 UI 를 적용해 주세요.

  - 목록 아이템

    - ✅ 목록 아이템이 추가되면 설정된 시간이 감소하며 시간이 0 이 되면 시간 종료처리 해주세요.
    - ✅ 남은 시간이 5초 이내인 경우 별도의 UI 를 적용해주세요.
    - 종료 기능
      - ✅ 해당 목록 아이템을 바로 종료합니다.
    - 시간 종료
      - ✅ 설정한 시간이 0 이 되면 바로 종료 합니다.
      - ✅ 종료된 목록 아이템을 팝업 형태의 UI 로 알려주세요.
      - ✅ 시간 종료 이외의 종료는 팝업을 노출하지 않습니다.

- 종료된 할 일

  - 목록 아이템
    - ✅ “할 일 목록”에서 종료된 목록 아이템을 “종료된 할 일”로 이동시켜주세요.
    - ✅ 목록 아이템에는 할 일 내용, 초기에 설정된 종료 시간이 표기되어 있어야 합니다.

### 선택 항목

- 수정 기능

  - ✅ 목록 아이템의 내용을 개별적으로 수정할 수 있는 UI 를 구성해 주세요.
  - ✅ 수정 진행 중에는 시간이 멈춰 있어야 합니다.

- 종료 복원

  - ✅ “종료 된 목록” 의 목록 아이템을 복원할 수 있는 기능을 구현해 주세요.
  - ✅ 복원된 목록 아이템의 시간은 최초 설정한 시간이 적용됩니다.

- ✅ 구현된 애플리케이션의 UML 을 작성해 주세요.

### 추가 기능

- React의 라이프 사이클을 가진 컴포넌트 클래스로 기본 ui들을 확장하여 사용합니다.
- 상태 관리를 위해 Zustand같은 store를 만들었고 store의 observe 함수를 사용하여 컴포넌트에서 상태 변화를 감지해 새롭게 render합니다.
- To Do 목록 부분은 React와 같이 리렌더링의 효율성을 올리기 위해 Virtual DOM으로 UI를 그릴수 있게 하였고 Diffing 알고리즘으로 변경된 부분을 업데이트 할 수 있게 하였습니다.

## 프로젝트 구조

```
vanillajs-timer-todoapp/
├── public/
│   └── index.html              # HTML 템플릿
├── src/
│   ├── components/
│   │   ├── core/
│   │   │   ├── Component.js    # 기본 컴포넌트 클래스
│   │   │   ├── Router.js       # 라우팅 시스템
│   │   │   └── vdom/
│   │   │       └── index.js    # 가상 DOM 구현
│   │   ├── layout/
│   │   │   ├── Header.js       # 헤더 컴포넌트
│   │   │   └── Header.scss
│   │   └── ui/
│   │       ├── Button.js       # 버튼 컴포넌트
│   │       ├── Input.js        # 입력 컴포넌트
│   │       ├── Text.js         # 텍스트 컴포넌트
│   │       ├── Check.js        # 체크박스 컴포넌트
│   │       ├── CountDown.js    # 카운트다운 컴포넌트
│   │       └── Popup/
│   │           ├── index.js    # 팝업 시스템
│   │           ├── Popup.scss
│   │           └── PopupContainer.js
│   ├── pages/
│   │   └── Home/
│   │       ├── index.js        # 메인 페이지
│   │       ├── home.scss
│   │       └── view/
│   │           ├── TodoInput.js    # 할 일 입력
│   │           ├── TodoInput.scss
│   │           ├── TodoList.js     # 할 일 목록
│   │           ├── TodoList.scss
│   │           ├── TodoCloseList.js # 종료된 할 일
│   │           ├── TodoListHeader.js
│   │           ├── TodoListHeader.scss
│   │           └── item/
│   │               ├── TodoItem.js
│   │               ├── TodoItem.scss
│   │               ├── TodoCloseItem.js
│   │               └── TodoCloseItem.scss
│   ├── store/
│   │   ├── store.js            # 기본 스토어 클래스
│   │   ├── todoStore.js        # Todo 상태 관리
│   │   └── popupStore.js       # 팝업 상태 관리
│   ├── utils/
│   │   ├── uuid.js             # UUID 생성
│   │   └── regex.js            # 정규식 유틸리티
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── Pretendard-Medium.woff
│   │   │   └── Pretendard-Medium.woff2
│   │   └── images/
│   │       └── check.svg
│   ├── styles/
│   │   └── style.scss          # 글로벌 스타일
│   └── index.js                # 애플리케이션 진입점
├── webpack.common.js           # Webpack 공통 설정
├── webpack.dev.js             # 개발 환경 설정
├── webpack.prod.js            # 프로덕션 환경 설정
├── package.json
└── README.md
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

- Hot Module Replacement (HMR) 지원
- Source map 생성
- 개발 서버 자동 실행

### 3. 프로덕션 빌드

```bash
npm run build
```

- 코드 압축 및 최적화
- console.log 자동 제거
- 파일명 해시 적용
- 트리 쉐이킹

## UML 다이어그램

프로젝트의 상세한 UML 다이어그램은 [project-uml.md](./project-uml.md) 파일에서 확인할 수 있습니다.
