var Main = React.createClass({
  getInitialState: function() {
    return { cards: [] };
  },
  updateCards: function(component) {
    var that = this;
    $.ajax("/users").then(function(response) {
      component.setState({cards: response});
      setTimeout(function() {
        that.updateCards(component);
      }, 3000);
    }, function(error) {
      console.log(error);
    });
  },
  componentDidMount: function() {
    this.updateCards(this);
  },
  render: function() {
    var cardsMarkup = this.state.cards.map(function(card) {
      return (
        <Card cardData={card} />
      )
    });
    return (
      <div className="main">
        {cardsMarkup}
      </div>
    );
  }
});

var Card = React.createClass({
  render: function() {
    var data = this.props.cardData;
    var languages = data.current_languages;
    var languagesMarkup = languages.map(function(lang) {
      return (
        <li>{lang}</li>
      );
    });
    return (
      <div className="one-card col-sm-4">
        <div className="">
          <img src={data.avatar_url} height="120" alt="..." />
          <div className="caption">
            <h3>{data.first_name} {data.last_name}</h3>
            <ul>{languagesMarkup}</ul>
          </div>
        </div>
      </div>
    );
  }
});

$(function() {
  React.render(
    <Main />,
    document.getElementById('react')
  );
});
