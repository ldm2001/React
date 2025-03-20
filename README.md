# 202030225 이동민 

## 2025-03-20
### React Project의 구조 및 역할

- node_modules 
  - 초기 node module 및 새로 설치하는 패키지가 저장됨
  - 초기 파일 37,352 / 폴더 4,579 / 용량은 200MB로 엄청난 양의 파일이 존재
  - git으로 관리하지 않기 때문에 디렉토리 이름이 흐릿하게 나와잇는거 확인 할 수 있음

- public/ 
  - 정적 파일을 저장하는 디렉토리
  - 빌드 후 배포할 HTML, Css, JavaScript 등 보관되는 곳
  - 개발하면서 특별히 수정할 코드는 X

- src/ 
  - React 프로젝트의 주요 코드가 위치하는 디렉토리

- src/App.js
  - 메인 컴포넌트로 필요한 서브 컴포넌트를 모아서 관리

- src/App.css
  - App.js에 적용되는 스타일을 정의하는 파일

- src/index.js
  - React 앱의 진입 점으로 최종 렌더링의 되는 곳
  - ReactDom.createRoot를 사용하여 App.js를 렌더링

- src/index.css
  - 전역 스타일을 정의하는 파일

### 의존성 관리와 package.json

  - package.json은 패키지의 의존성을 관리하는 파일
  - 의존성이란 하나의 소프트웨어가 다른 소프트웨어에 의존하여 동작하는 관계 
  - 협업을 할 때는 팀원들 각자의 컴퓨터에 같은 패키지들을 설치하여 동일한 환경을 구성해야 함
  - 의존성을 무시하면 다른 버전의 패키지를 설치하는 팀원 때문에 오류가 발생할 수 있음

### 의존성을 관리하는 이유
  1. 손쉬운 설치 및 업데이트
  2. 일관된 개발 환경 유지
  3. 중복 설치 방지

### package.json의 의존성 내용과 종류
  1. dependencies: 실제 코드에서 사용하는 라이브러리
  2. devDependencies: 개발할 때만 필요한 라이브러리들
  3. peerDependencies: 필요한 라이브러리지만, 직접 설치하지 않고 사용자에게 맡기는 경우
  4. optionalDependencies: 있어도 되고 없어도 되는 선택적 의존성

### package.json와 package-lock.json의 차이

![alt text](image/image2.png)

### package.json을 유지하는 이유
  1. 프로젝트의 의존성 정보 제공
  2. 버전 범위 설정 가능
  3. 스크립트와 메타데이터 저장
  4. 새로운 패키지 설치 및 관리

### node_module의 재설치
  - 클론을 받은 프로젝트의 경우
```
$ npm install
```

### 오류나 의존성 등의 문제가 생겼을 경우
  1. node modules 폴더와 package-lock.json 파일 삭제
  ```
  $ rm -rf node_modules package-lock.json
  ```
  2. npm 패키지의 임시 저장소인 캐시를 초기화 
  ```
  $ npm cache clean --force
  ```
  3. 패키지를 다시 설치
  ```
  $ npm install
  ```

### package-lock.json을 삭제하는 이유
  1. package-lock.json 손상되었거나 잘못된 의존성이 있을때
  2. 최신 버전의 패키지를 다시 받고 싶을때
  3. 팀프로젝트에서 다른 팀원이 이상한 상태로 package-lock.json을 업데이트 했을때

### 컴포넌트를 사용한 유저 인터페이스 생성
  1. React를 사용하면 component라고 하는 개별 조각으로 사용자 인터페이스를 구축할 수 있음 

Video.js
  ```Javascript
  function Video({ video }) {
  return (
    <div>
      <Thumbnail video={video} />
      <a href={video.url}>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </a>
      <LikeButton video={video} />
    </div>
  );
}
  ```

## 2025-03-13
### Node.JS 
  - 장점
  1. 비동기는 블로킹 I/O로  높은 성능 제공
  2. 풀스택 개발 가능
  3. NPM의 방대한 생태계 활용 가능
  4. 경량 서버 개발에 적합
  5. 실시간 데이터 처리에 강력

  - 단점
  1. CPU 집약적인 작업에 부적합
  2. 보안에 취약

### React Project 생성
```
npx create-react-app 이름
bash 터미널에서 디렉토리 변경
npm run start
```
### React Project의 구조 및 역할
![alt text](image/image1.png)