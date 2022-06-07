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
      classs: "",
      school: "",
      sphere: "",
      range: "",
      aoe: "",
      damage: "",
      castingTime: "",
      duration: "",
      savingThrow: "",
      source: "",
      components: "",
      description: [],
      tempDescription: "",
    };
    this.handleSpellChange = this.handleSpellChange.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.splitComponents = this.splitComponents.bind(this);
  }

  splitComponents(comp) {
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
    return newComp;
  }

  handleSpellChange() {
    const array = this.state.TEMP.split(/\n/g) || [];
    const finished = new Array(14);
    for (let i = 0; i < array.length; i++) {
      // if(array[i] === "VIEW SOURCE") {
      //   i++
      //   finished[0] = array[i]
      // }
      // if()
      switch (true) {
        case array[i]:
          break;
        case array[i] === "VIEW SOURCE":
          i++;
          finished[0] = array[i];
          break;
        case array[i] === "Spell Level":
          i++;
          finished[1] = array[i];
          break;
        case array[i] === "Class":
          i++;
          finished[2] = array[i];
          break;
        case array[i] === "School":
          i++;
          finished[3] = array[i];
          break;
        case array[i] === "Range":
          i++;
          finished[4] = array[i];
          break;
        case array[i] === "AOE":
          i++;
          finished[5] = array[i];
          break;
        case array[i] === "Casting Time":
          i++;
          finished[6] = array[i];
          break;
        case array[i] === "Duration":
          i++;
          finished[7] = array[i];
          break;
        case array[i] === "Save":
          i++;
          finished[8] = array[i];
          break;
        case array[i] === "Requirements":
          i++;
          finished[10] = this.splitComponents(array[i]);
          break;
        case array[i] === "Damage":
          i++;
          finished[12] = array[i];
          break;
        case array[i] === "Sphere":
          i++;
          finished[13] = array[i];
          break;
        case array[i] === "Source":
          i++;

          finished[9] = array[i];
          i++;
          if (array[i] === "PO: Spells & Magic") {
            i += 9;
          }

          finished[11] = array.slice(i);
          break;
        case array[i] === "PO: Spells & Magic":
          i;
          break;
      }
      for (let i = 0; i < finished.length; i++) {
        if (finished[i] === undefined) {
          finished[i] = "";
        }
      }
    }
    this.setState({
      ...this.state,
      name: finished[0],
      level: finished[1],
      classs: finished[2],
      school: finished[3],
      range: finished[4],
      aoe: finished[5],
      castingTime: finished[6],
      duration: finished[7],
      savingThrow: finished[8],
      source: finished[9],
      components: finished[10],
      description: finished[11],
      damage: finished[12],
      sphere: finished[13],
    });
  }
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
            onClick={() => this.props.addSpell(this.state)}
          >
            Add to Spells
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
