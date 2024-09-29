export default function TabBar({ $app, initialState, onClick }) {
  this.state = initialState; // 초기값 설정: 'all'
  this.onClick = onClick;

  // Tab-bar 컴포넌트 만들기
  this.$target = document.createElement('div');
  this.$target.classList = 'tab-bar';
  $app.appendChild(this.$target);

  this.template = () => {
    let temp = `
    <div id="all">전체</div>
    <div id="penguin">펭귄</div>
    <div id="koala">코알라</div>
    <div id="panda">판다</div>
   `;

    return temp;
  };

  // Tab-bar 컴포넌트 렌더링
  this.render = () => {
    this.$target.innerHTML = this.template();

    let $currentTab = document.getElementById(this.state); // 현재 선택된 탭을 id로 가져옴
    $currentTab && ($currentTab.className = 'clicked'); // 해당 id를 가진 탭에 'clicked' 클래스를 추가

    const $tabs = this.$target.querySelectorAll('div');
    $tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        this.onClick(tab.id); // 탭 클릭 시 해당 탭의 id가 onClick 함수로 전달되어 App의 currentTab 업데이트
      });
    });
  };

  // state가 변경될 때 호출되는 함수
  this.setState = (newState) => {
    this.state = newState; // 새로운 상태로 업데이트
    this.render(); // 상태가 변경되면 컴포넌트를 다시 렌더링하여 변경된 상태를 반영
  };

  this.render(); // 초기 렌더링 실행
}
