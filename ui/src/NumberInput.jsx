import React from 'react';

function formatNum(num) {
  return num != null ? num.toString() : '';
}

function unformatNum(str) {
  const val = parseInt(str, 10);
  return Number.isNaN(val) ? null : val;
}

export default class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: formatNum(props.value) };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.value.match(/^\d*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  onBlur(e) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(e, unformatNum(value));
  }

  render() {
    const { value } = this.state;
    return (
      <input
        type="text"
        {...this.props}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
