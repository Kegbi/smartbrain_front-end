import React from "react";

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.entries === this.props.entries &&
      prevProps.name === this.props.name
    ) {
      return null;
    } else {
      this.generateEmoji(this.props.entries);
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    fetch(
      `https://8ox1hni5xg.execute-api.us-east-1.amazonaws.com/prod/rank/create?rank=${this.props.entries}`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ emoji: data.input }))
      .catch(console.log);
  };

  render() {
    return (
      <div>
        <div className="white f3">
          {`${this.props.name}, your current entry count is...`}
        </div>
        <div className="white f1">{this.props.entries}</div>
        <div className="white f2">{`Rank badge: ${this.state.emoji}`}</div>
      </div>
    );
  }
}

export default Rank;
