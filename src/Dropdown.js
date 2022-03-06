import { createPopper } from 'https://cdn.skypack.dev/@popperjs/core';
import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.triggerRef = React.createRef();
    this.box = React.createRef();

    this.state = {
      show_menu: false,
      toggle: this.props.toggle || null,
    };

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(e) {
    if (this.box && !(this.box?.current?.contains(e.target) || this.box.current == e.target)) {
      this.close();
    } else if (this.state.toggle) {
      this.setState((res) => {
        return {
          ...res,
          toggle: <button className='btn'>{e.target.innerText}</button>,
        };
      });
    }
  }

  toggle(e) {
    e.preventDefault();
    this.setState({ show_menu: !this.state.show_menu });
  }

  close() {
    this.setState({ show_menu: false });
  }

  render() {
    return (
      <div className={'dropdown' + (this.state.show_menu ? ' active' : '')} ref={this.box}>
        {React.cloneElement(this.state.toggle, { onClick: (e) => this.toggle(e), ref: this.triggerRef })}
        {React.cloneElement(this.props.children, { triggerRef: this.triggerRef })}
      </div>
    );
  }
}

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.triggerRef = this.props.triggerRef;
    this.popupRef = React.createRef();

    this.state = {
      placement: this.props.placement || 'bottom-start',
    };
  }

  componentDidMount() {
    this.popper = createPopper(this.triggerRef.current, this.popupRef.current, {
      placement: this.state.placement,
    });
  }

  componentDidUpdate() {
    this.popper.forceUpdate();
  }

  componentWillUnmount() {
    this.popper.destroy();
  }

  render() {
    return (
      <div className='dropdown-menu' ref={this.popupRef}>
        {this.props.children}
      </div>
    );
  }
}

class DropdownItem extends React.Component {
  render() {
    return (
      <button className='dropdown-menu__item' onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class DropdownDivider extends React.Component {
  render() {
    return <div className='dropdown-menu__item--divider'></div>;
  }
}

export { Dropdown, DropdownMenu, DropdownItem, DropdownDivider };
