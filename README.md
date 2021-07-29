# **2021 한이음 [게이미피케이션을 활용한 모의 투자 어플리케이션]**

> 프로젝트 기간 2021.03 ~ 2021.11

## 🤗 **서버 실행 관련 명령어**

```json
nodemon app.js
```

## 🙏 **버전 관련 정보**

| 라이브러리 | 버전     |
| ---------- | -------- |
| nodejs     | v14.17.3 |
| npm        | v6.14.13 |
| nodemon    | 2.0.12   |
| express    | 4.16.1   |

### 참고사항

-   **express**는 이미 `package.json` 에 dependency로 들어가 있어서 `npm install` 하면 됨
-   **nodemon** 각자 쓰고 있겠지만 혹시 모르니 `nodemon -v` 해 주고 없으면 —global로 install 후 실행 바람(—save 아님!)

## 👥 **깃 컨벤션**

### 💫 **깃 커밋 관련**

vscode code commitizen support 활용: [링크 참고](https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen&ssr=false#overview)

-   [feat] : 기능 추가, kotlin 작업
-   [layout] : xml 작업
-   [fix] : 에러 수정, 버그 수정
-   [docs] : README, 문서
-   [network] : 서버 관련 작업
-   [refactor] : 코드 리펙토링 (기능 변경 없이 코드만 수정할 때)
-   [modify] : 코드 수정 (기능의 변화가 있을 때)
-   [chore] : gradle 세팅, 위의 것 이외에 거의 모든 것

```json
ex) feat(users): [POST] signin

=> 기능(상위 라우터): [메소드] 세부 내용
```

### 🥪 **깃 pr 및 머지 관련**

```json
**[feature/브랜치] ~~기능 수정/구현/삭제 - 작성자이름**
```

형식으로 제목 달아주고 Squash and merge로 머지하기

❗주의: 1개 커밋한 경우 squash and merge 후 머지 확인하기 전에 뜨는 글 제목 및 커밋 로그에 작성하고 explanation 작성할 수 있음!(이때 작성하지 않으면 커밋 로그대로 뜸)
