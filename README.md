# 202030225 이동민 

## 2025-04-18

### 화면이 한 줄로 깨져서 보이는 이유
- square 컴포넌트에서 <button>을 <div>로 감싸서 생기는 문제
- 이 경우는 <>...</>로 감싸거나 <button>만 남기면 됨
- React Fragment를 사용하면 구조도 깔끔하고 유지보수도 편함

`Square.js`
```Javascript
export default function Square({ value, onSquareClick }) {
  return (
    <>
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
}
```

### 과거 움직임 보여주기
- <button>과 같은 리액트 엘리먼트는 일반 자바스크립트 객체이므로 에플리케이션에서 전달할 수 있음
- 리액트에서 여러 엘리먼트를 렌더링하면 리액트 엘리먼트 배열을 사용할 수 있음
- 이미 state에 이동 history 배열이 있기 때문에 이것을 리액트 엘리먼트 배열로 변환해야 함
- 자바스크립트에서 한 배열을 다른 배열로 변환하려면 배열 map 매서드를 사용하면 됨

```javascript
[1,2,3].map((x) => x * 2) // [2, 4, 6]
```

### map함수의 사용

```javascript
const moves = history.map((squares, move) = > { })
```
- map의 기본 구문은 map(callbackFn) 혹은 map(callbackFn, thisArg) 임
- thisArg는 내부에서 this로 사용할 값을 지정하는데 화살표 함수에서는 생략
- squares, move는 화살표 함수의 매개변수
1. 원본 배열 (history): map이 호출된 원본 배열
2. 원본 배열의 인덱스 (move): 현재 순환 중인 원본 배열 요소의 인덱스
3. 요소 값 (squares): 현재 순회 중인 요소 배열의 값

각각의 history 요소에 대한 { }의 실행문(후작업) 실행 -> moves객체에 저장 -> 최종 출력에 사용

### Key 선택하기
- key는 리액트에서 특별하게 미리 지정된 프로퍼티
- 엘리먼트가 생성되면 리액트는 key 프로퍼티를 추출하여 반환되는 엘리먼트에 직접 key를 저장
- key가 props로 전달되는 것처럼 보일수 있지만 리액트는 자동으로 key를 사용해 업데이트 할 컴포넌트를 결정
- key가 지정되지 않은 경우 리액트는 경고를 표시하며 배열의 인덱스를 기본 key로 사용
- 베열 인덱스를 key로 사용하면 리스트 항목의 순서를 바꾸거나 항목을 추가/제거할 때 문제가 발생
- 동적인 리스트를 만들때마다 적절한 key를 할당하는 것을 추천
- 명시적으로 `key={i}`를 전달하면 경고는 사라지지만 배열의 인덱스를 사용할 때와 같은 문제가 발생하므로 대부분은 추천하지 않음



## 2025-04-17

### state 끌어올리기
- Board가 모든 State를 관리하므로 부모 Baord 컴포넌트는 자식 square 컴포넌트가 올바르게 표시될 수 있도록 props를 전달
- Square 클릭하면 자식 Square 컴포넌트가 부모 Board 컴포넌트에 Board의 state를 업데이트 하도록 요청
- Board의 state가 변경되면 Board 컴포넌트와 모든 자식 Square 컴포넌트가 자동으로 다시 렌더링 됨
- Board 컴포넌트에 속한 모든 Square의 state를 유지하면 나중에 승자를 결정 할 수 있음

### state 끌어올리기 (중요)
- DOM <button> 엘리먼트의 onClick 속성은 빌트인 컴포넌트이기 때문에 리액트에서 특별한 의미를 갖음
- 사용자 정의 컴포넌트
- Square의 onSquareClick prop나 Board의 handleClick 함수에 어떠한 이름을 붙여도 코드는 동일하게 작동
- 리액트에서는 주로 이벤트를 나타내는 prop에는 onSomething과 같은 이름을 사용하고, 이벤트를 처리하는 함수를 정의 할 때는 handleSomething과 같은 이름을 사용

### 불변성이 왜 중요할까
- 불변성을 사용하면 복잡한 기능을 훨씬 쉽게 구현할 수 있음
- 기본적으로 부모 컴포넌트의 state가 변경되면 모든 자식 컴포넌트가 자동으로 다시 렌더링 됨
- 여기에 변경사항이 없는 자식 컴포넌트도 포함되기에 트리의 영향을 받지 않는 부분은 리렌더링을 피하는 것이 좋음
- 불변성을 사용하면 컴포넌트가 데이트의 변경 여부를 저렴한 비용으로 판단할 수 있음

### return의 의미
- 자바스크립트에서 return값이 없는 return;은 함수를 즉시 종료하라는 의미
- 이때 값을 반환하지 않으면 자동으로 undefined를 반환

### 구조 분해 할당
- 비구조화 할당, 구조화 할당이라고도 번역되지만 구조 분해 할당을 많이 사용
- 구화 분해 할당은 배열이나 객체의 구조를 해체하여 내부 값을 개별 변수에 쉽게 할당하는 방법 입니다
- 코드의 간결성과 가독성을 높일 수 있음
- map함수에서도 사용되는 방법

### props를 통해 데이터 전달하기
- 리액트의 component architecture를 사용해서 재사용할 수 있는 컴포넌트를 만들어서 중복된 코드를 삭제

### 사용자와 상호작용하는 컴포넌트 만들기
- 컴포넌트는 무언가 기억하기 위해 state 사용

## state 끌어올리기
- 여러 자식 컴포넌트 데이터를 수집하거나 두 자식 컴포넌트가 서로 통신하도록 하려면, 부모 컴포넌트에서 공유 state를 선언해야 함
- 부모 컴포넌트는 props를 통해 해당 state를 자식 컴포넌트에 전달할 수 있음
- 이렇게 하면 자식 컴포넌트가 서로 동기화되고 부모 컴포넌트와도 동기화 되도록 할 수 있음


### 이벤트에 응답하기
- 컴포넌트 내부에 event handler 함수를 선언하면 이벤트에 응답할 수 있음
- onClick={handleClick}의 끝에 소괄호가 없는 것을 주목
- 함수를 호출하지 않고 전달만 하면 됨
- 리액트는 사용자가 버튼을 클릭할때 이벤트 헨들러를 호출

`MyButton.js`
```javascript
export default function MyButton() {
  function handleClick() {
    alert('You clicked me')
  }
  
  return (
    <button onClick={handleClick}>
      I'm a button component
    </button>
  );
}
```

### 화면 업데이트하기
- 컴포넌트가 특정 정보를 기억해 두었다가 표시하기를 원하는 경우가 있습니다
- 예를 들어 버튼이 클릭된 횟수를 세고 싶을 수 있는데 그렇게 할 때는 state를 추가하면 됨

```javascript
import { useState } from 'react';
```
- 리액트에서 useState를 import함
- 보면 useState는 리액트 파일 안에 Named Exports로 선언되어 있는 여러 개의 컴포넌트중 하나라는 것을 알 수 있음
- 컴포넌트 내부에 state 변수를 선언할 수 있음
- useState로부터 현재의 state를 지정할 수 있는 변수인 count와 이를 업데이트할 수 있는 함수인 setCount를 얻을 수 있음
- 변수 이름과 변수 이름 앞에 set을 붙인 업데이트 함수를 관용적으로 사용

`CountState.js`
```javascript
import { useState } from 'react'

export default function CountState() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={handleClick}>
        Clicked {count} times
      </button>
    </div>
  )
}
```

### Hook 사용하기
- use로 시작하는 함수를 Hook이라고 함
- useState는 리액트에서 제공하는 내장 Hook임
- 기존의 것들을 조합하여 자신만의 Hook을 작성할 수 있음

### Hooks의 사용 규칙
1. 최상위에서만 호출해야 함
2. 리액트 함수형 컴포넌트 또는 사용자 Hook 내부에서만 사용 가능
  - 일반적인 자바스크립트 함수에서 useState, useEffect 등의 Hook을 사용할 수 없음

### 이런 제한이 필요한 이유
1. 렌더링 순서를 보장하기 위해서
2. 불필요한 사이드 이펙트 방지

### function형 컴포넌트에서만 Hook을 사용하는 이유
- 과거에는 Class형 컴포넌트는 lifecycle 함수를 통해서 상태를 관리 했음
- 유지보수가 어렵고 복잡해질 수 있었음
- 리액트는 상태관리와 로직을 더 간결하게 만들기 위해 Hooks를 도입
- 리액트 팀은 function형 컴포넌트를 권장하고 있음
- Hook은 function형 컴포넌트 전용으로 설계됨


### Component의 생성 및 nesting
- React는 component로 만들어짐
- component는 버튼처럼 작을 수도 있고 전체 페이지처럼 클 수도 있음
- component는 마크업을 반환하는 JavaScript 함수
- 중첩은 Css 선택자의 중첩 구조를 생각하면 쉽게 이해할 수 있음

`App.js`
```Javascript
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
### export default
- 파일내의 컴포넌트중 기본 컴포넌트를 지정
- JS 문법

### export default 선언 위치는 어디가 좋을까
- 공식 문서처럼 main component의 function 키워드 왼쪽에 선언하는게 좋음
- 한 파일에 여러개 컴포넌트가 있을때 가독성에 좋음

### Named Exports (export)
- 하나의 파일안에 여러 개의 컴포넌트가 있을때 사용
- 컴포넌트를 사용하는 쪽에서는 컴포넌트 정확한 이름을 명시

### Default Exports
- 하나의 파일안에서 하나의 컴포넌트만 내보내는 경우 사용
- 컴포넌트 사용하는 쪽에너는 컴포넌트 정확한 이름을 반드시 명시해야 함

`App.js`
```javascript
import MyB from "./MyButton"

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyB />
    </div>
  );
}
```
MyButton.js
```javascript
export default function MyButton() {
  return (
    <button>I'm a button component</button>
  );
}
```
`App.js`
```javascript
import MyB from "./MyButton"
import { Button1, Button3 } from "./BottonLib";

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyB /><br />
      <Button1 />&nbsp;
      <Button3 />
    </div>
  );
}
```
`ButtonLib.js` (중첩)
```javascript
function Button1() {
  return (
    <button>Button1</button>
  )
}
function Button2() {
  return (
    <button>Button2</button>
  )
}
function Button3() {
  return (
    <button>Button3</button>
  )
}

export { Button1, Button2, Button3 }
```
### JSX로 마크업 작성하기
- 반드시 써야 하는 것은 아니지만 리액트 프로젝트에서는 편의성을 위해 JSX를 사용
- JSX는 HTML보다 엄격한 문법 적용
- JSX에서는 <br /> 같이 싱글 태그를 닫아야 합니다
- React 에서는 여러 개의 컴포넌트를 JSX 태그로 반환할 수 있음 

`AboutPage.js`
```Javascript
export default function AboutPage() {
  return (
    <>
      <h1>About Page</h1>
      <p>Hello!!!</p>
    </>
  )
}
```

### 스타일 추가하기
- 리액트에서는 className으로 css 클래스를 지정
- className은 HTML의 class 속성과 동일한 방식으로 동작

## 데이터 표시하기
- JSX를 사용하면 자바스크립트에 마크업을 넣을 수 있음 (Js안의 마크업 안에 JS를 넣는다는게 더 정확한 표현)
- JSX 코드 내에서 JavaScript로 탈출하여 변수나 표현식을 사용하는 것

`Profile.js`
```javascript
import './Profile.css'

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```
`Profile.css`
```css
.avatar {
  border-radius: 50%;
}
```
### 리스트 렌더링하기
- 컴포넌트 리스트를 렌더링하기 위해서는 for문 및 map() 함수와 같은 자바스크립트 기능 사용
- 목록을 사용 할 때는 각 항목에 대해 고유하게 식별하는 문자열 또는 숫자를 전달해야 함
- 항목을 삽입, 삭제 또는 재정렬할 때 어떤 일이 일어났는지 알기 위해 key를 사용

`Shopping.js`
```javascript
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```

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
  - React를 사용하면 component라고 하는 개별 조각으로 사용자 인터페이스를 구축할 수 있음 

  Video.js 
  ``` Javascript
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

![alt text](image/image3.png)

### 컴포넌트를 작성하는 JavaScript와 마크업
  - React 컴포넌트는 자바스크립트 함수
  - 조건부로 내용을 표시하려면 if문 사용 가능
  - 목록을 표시하려면 배열에 map() 사용 가능

VideoList.js
``` javascript
function VideoList({ videos, emptyHeading }) {
  const count = videos.length;
  let heading = emptyHeading;
  if (count > 0) {
    const noun = count > 1 ? 'Videos' : 'Video';
    heading = count + ' ' + noun;
  }
  return (
    <section>
      <h2>{heading}</h2>
      {videos.map(video =>
        <Video key={video.id} video={video} />
      )}
    </section>
  );
}
```

![alt text](image/image4.png)

- 이 마크업 구문을 JSX라 부름
- React에 의해서 대중화된 자바스크립트 구문의 확장
- 컴포넌트를 쉽게 만들고 관리하고 삭제할 수 있음

### 필요한 곳에 상호작용 요소 추가하기
  - 컴포넌트는 데이터를 받고 화면에 표시할 내용을 반환
  - 사용자가 입력란에 입력하는 것과 같이 상호작용에 응답하여 새 데이터를 전달할 수 있음
  - 그 후 새 데이터와 일치하도록 화면을 업데이트

SearchableVideoList.js
```javascript
import { useState } from 'react';

function SearchableVideoList({ videos }) {
  const [searchText, setSearchText] = useState('');
  const foundVideos = filterVideos(videos, searchText);
  return (
    <>
      <SearchInput
        value={searchText}
        onChange={newText => setSearchText(newText)} />
      <VideoList
        videos={foundVideos}
        emptyHeading={`No matches for “${searchText}”`} />
    </>
  );
}
```
![alt text](image/image5.png)

### 프레임워크를 통해 풀스택으로 만들기
  - React는 라이브러리이므로 컴포넌트를 조합할 수 있지만 데이터를 가져오지는 못함
  - React로 완전한 서비스 제작하려면 Next.js 또는 리믹스 같은 풀스택 프레임워크 추천

confs/[slug].js
```javascript
import { db } from './database.js';
import { Suspense } from 'react';

async function ConferencePage({ slug }) {
  const conf = await db.Confs.find({ slug });
  return (
    <ConferenceLayout conf={conf}>
      <Suspense fallback={<TalksLoading />}>
        <Talks confId={conf.id} />
      </Suspense>
    </ConferenceLayout>
  );
}

async function Talks({ confId }) {
  const talks = await db.Talks.findAll({ confId });
  const videos = talks.map(talk => talk.video);
  return <SearchableVideoList videos={videos} />;
}
```
![alt text](image/image6.png)

- React는 아키텍처이기도 함
- 프레임워크는 서버에서 실행되는 비동기 컴포넌트 또는 빌드 중 실행되는 비동기 컴포넌트에서 데이터를 가져올 수 있도록 함
- 파일이나 DB에서 데이터를 읽고 상호작용하는 컴포넌트에 전달할 수 있음

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