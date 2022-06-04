import React, { Component } from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import Spells from "./spells/spells";
import createSpellMonster from "./createSpellMonster";
import { fetchSpells, fetchFirebaseData } from "../store/spells";
import copyPasteSpellMonster from "./copyPasteSpellMonster";
import customSpell from "./spells/customSpell";
import Login from "./login/login";
import SignUp from "./login/signup";
class App extends Component {
  componentDidMount() {
    const data = this.props.load();
  }

  render() {
    return (
      <Router>
        <nav>
          <div>
            <Link className="nav" to="/">
              DM
            </Link>
            <Link className="nav" to="/">
              Spells
            </Link>
            <Link className="nav" to="/">
              Monsters
            </Link>
          </div>
          <div>
            {this.props.user.displayName ? (
              <Link className="nav" to="/spells">
                {this.props.user.displayName}
              </Link>
            ) : (
              <Link className="nav" to="/login">
                Login
              </Link>
            )}
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Spells} />
          <Route exact path="/spells" component={Spells} />
          <Route exact path="/spells/customSpell" component={customSpell} />
          <Route exact path="/spells/create" component={createSpellMonster} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/spells/copyPasteSpellMonster"
            component={copyPasteSpellMonster}
          />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = ({ spells, user }) => ({
  spells,
  user,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchAction: (action) => dispatch(action),
  load: () => dispatch(fetchFirebaseData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
