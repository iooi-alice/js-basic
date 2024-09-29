export default function Content({ $app, initialData }) {
  this.state = initialData;

  this.$content = document.createElement('div');
  this.$content.classList = 'content';
  $app.appendChild(this.$content);

  this.template = () => {
    let temp = [];
    if (this.state) {
      this.state.forEach((photo) => {
        temp += `<img src="${photo.url}">`;
      });
    }

    return temp;
  };

  this.render = () => {
    this.$content.innerHTML = this.template();
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
