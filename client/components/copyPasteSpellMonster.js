import React, { Component, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postFirebaseSpell, postSpell } from "../store/spells";

const dummy = {
  name: "Affect Normal Fires",
  level: 1,
  classs: "Wizard",
  school: "Alteration",
  range: "5 yds./level",
  aoe: "10 foot-radius",
  castingTime: "1",
  duration: "2 rds./level",
  savingThrow: "None",
  components: "S,V",
  source: "Players Hand Book page 170",
  test: [1, 2, 3, 4, 5],
};

class copyPasteSpellMonster extends Component {
  constructor() {
    super();
    this.state = {
      TEMP: "TEST",
      name: "",
      level: "",
      class: "",
      school: "",
      range: "",
      aoe: "",
      castingTime: "",
      duration: "",
      savingThrow: "",
      source: "",
      components: "",
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
      p6: "",
      p7: "",
      p8: "",
    };
    this.handleSpellChange = this.handleSpellChange.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  handleSpellChange() {
    const array = this.state.TEMP.split(/\n/g) || [];
    const comp = array[21];
    let newComp = [];
    for (let i = 0; i < comp.length; i++) {
      const letter = comp[i];
      if (letter === "S") {
        newComp.push(letter);
      } else if (letter === "V") {
        newComp.push(letter);
      } else if (letter === "M") {
        newComp.push(letter);
      }
    }
    newComp = newComp.join();
    this.setState({
      ...this.state,
      source: array[23],
      components: newComp,
      savingThrow: array[19],
      duration: array[17],
      castingTime: array[15],
      aoe: array[13],
      range: array[11],
      school: array[8],
      class: array[6],
      level: array[4],
      name: array[2],
    });

    let num = 1;
    for (let i = 24; i < array.length; i++) {
      const ele = array[i];
      if (ele) {
        if (num === 1) {
          num++;
          this.setState({
            p1: ele,
          });
        } else if (num === 2) {
          num++;
          this.setState({
            p2: ele,
          });
        } else if (num === 3) {
          num++;
          this.setState({
            p3: ele,
          });
        } else if (num === 4) {
          this.setState({
            p4: ele,
          });
        } else if (num === 5) {
          this.setState({
            p5: ele,
          });
        } else if (num === 6) {
          this.setState({
            p6: ele,
          });
        } else if (num === 7) {
          this.setState({
            p6: ele,
          });
        } else if (num === 8) {
          this.setState({
            p6: ele,
          });
        }
      }
    }
  }
  componentDidMount() {}
  changeHandler(event) {
    this.setState({ TEMP: event.target.value });
    if (this.state.TEMP.length > 30) {
      this.handleSpellChange();
    }
  }

  render() {
    return (
      <div className="copyPasteSpellMonster-contianer">
        <div className="copy-item">
          <select className="copy-selector">
            <option>Spell</option>
            <option>Monster</option>
          </select>
        </div>
        <div className="copy-item">
          <label htmlFor="copy-paste">Copy {"&"} Paste</label>
          <textarea
            value={this.state.valueArr}
            onChange={(event) => this.changeHandler(event)}
            placeholder="type your comment here"
            className="copy-textarea"
            name="copy-paste"
            rows="20"
            cols="80"
          ></textarea>
        </div>
        <div className="copy-item">
          <button
            className="copy-button"
            onClick={() => this.props.addSpell(dummy)}
          >
            Add to placeholder
          </button>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, { history }) => ({
  addSpell: (spell) => dispatch(postFirebaseSpell(spell, history)),
});

export default connect(null, mapDispatchToProps)(copyPasteSpellMonster);
