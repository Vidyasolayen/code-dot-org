// Strict linting: Absorb into global config when possible
/* jshint
 unused: true,
 eqeqeq: true,
 maxlen: 120
 */
/* global $ */

var msg = require('../locale');
var constants = require('./constants');
var styles = require('./DesignToggleRowStyles');
var ViewDataButton = require('./ViewDataButton.jsx');
var ScreenSelector = require('./ScreenSelector.jsx');

var Mode = {
  CODE: 'CODE',
  DESIGN: 'DESIGN'
};

var DesignToggleRow = React.createClass({
  propTypes: {
    hideToggle: React.PropTypes.bool.isRequired,
    hideViewDataButton: React.PropTypes.bool.isRequired,
    startInDesignMode: React.PropTypes.bool.isRequired,
    initialScreen: React.PropTypes.string.isRequired,
    screenIds: React.PropTypes.array.isRequired,
    onDesignModeButton: React.PropTypes.func.isRequired,
    onCodeModeButton: React.PropTypes.func.isRequired,
    onViewDataButton: React.PropTypes.func.isRequired,
    onScreenChange: React.PropTypes.func.isRequired,
    onScreenCreate: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      mode: this.props.startInDesignMode ? Mode.DESIGN :  Mode.CODE,
      activeScreen: null
    };
  },

  handleSetMode: function (newMode) {
    if (this.state.mode === newMode) {
      return;
    }
    if (newMode === Mode.CODE) {
      this.props.onCodeModeButton();
    } else {
      this.props.onDesignModeButton();
    }

    this.setState({
      mode: newMode
    });
  },

  handleScreenChange: function (evt) {
    var screenId = evt.target.value;
    if (screenId === constants.NEW_SCREEN) {
      screenId = this.props.onScreenCreate();
    }
    this.props.onScreenChange(screenId);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ activeScreen: newProps.initialScreen });
  },

  render: function () {
    var showDataButton;
    var selectDropdown;

    if (this.state.mode === Mode.CODE) {
      showDataButton = <ViewDataButton onClick={this.props.onViewDataButton}
                                       hide={this.props.hideViewDataButton} />;
    } else if (this.state.mode === Mode.DESIGN) {
      selectDropdown = <ScreenSelector screenIds={this.props.screenIds}
                                       activeScreen={this.state.activeScreen}
                                       onChange={this.handleScreenChange} />;
    }

    return (
      <table style={{width: '100%'}}>
        <tbody>
          <tr>
            <td style={{width: '120px'}}>
              <button
                  id='codeModeButton'
                  style={$.extend({}, styles.codeButtonStyle,
                      this.state.mode === Mode.CODE ? styles.activeStyle : styles.inactiveStyle,
                      this.props.hideToggle ? styles.hiddenStyle : null)}
                  className='no-outline'
                  onClick={this.handleSetMode.bind(this, Mode.CODE)}>
                {msg.codeMode()}
              </button>
              <button
                  id='designModeButton'
                  style={$.extend({}, styles.designButtonStyle,
                      this.state.mode === Mode.DESIGN ? styles.activeStyle : styles.inactiveStyle,
                      this.props.hideToggle ? styles.hiddenStyle : null)}
                  className='no-outline'
                  onClick={this.handleSetMode.bind(this, Mode.DESIGN)}>
                {msg.designMode()}
              </button>
            </td>
            <td style={{maxWidth: 0}}>
              {selectDropdown}
              {showDataButton}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
});
module.exports = DesignToggleRow;
