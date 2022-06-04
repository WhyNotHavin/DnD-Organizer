import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postFirebaseSpell } from "../../store/spells";

const dummy = [
  "Affect Normal Fires",
  "VIEW SOURCE",
  "Affect Normal Fires (S V)",
  "Spell Level",
  "1",
  "Class",
  "Wizard",
  "School",
  "Alteration",
  "Details",
  "Range",
  "5 yds./level",
  "AOE",
  "10 foot-radius",
  "Casting Time",
  "1",
  "Duration",
  "2 rds./level",
  "Save",
  "None",
  "Requirements",
  "Somatic, Verbal,",
  "Source",
  "Players Hand Book page 170",
  "This spell enables the wizard to cause nonmagical fires - from as small as a torch or lantern to as large as the area of effect - to reduce in size and brightness to become mere coals or increase in light to become as bright as full daylight and increase the illumination to double the normal radius. Note that this does not affect either fuel consumption or damage caused by the fire.",
  "The caster can affect any or all fires in the spell's area. He can alter their intensities with a single gesture as long as the spell is in effect.",
  "The spell lasts until the caster cancels it, all fuel is burned, or the duration expires. The caster can also extinguish all flames in the area, which expends the spell immediately. The spell does not affect fire elementals or similar creatures.",
];

class CreateSpell extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      level: 0,
      classs: "",
      school: "",
      range: "",
      components: "",
      duration: "",
      castingTime: "",
      aoe: "",
      savingThrow: "",
      source: "",
      description: [],
      tempDescription: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    if (evt.target.name === "tempDescription") {
      let newDiscription = evt.target.value.split(/\n/g) || [];
      this.setState({
        description: newDiscription,
      });
    }
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({
      duration: "this worked",
    });
    this.props.addSpell(this.state);
  }
  render() {
    const {
      name,
      level,
      classs,
      school,
      range,
      components,
      duration,
      castingTime,
      aoe,
      savingThrow,
      source,
      tempDescription,
    } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Name: </label>
            <input
              className="form-input-name"
              name="name"
              onChange={handleChange}
              value={name}
            />
            <label>School: </label>
            <input
              className="form-input-school"
              name="school"
              onChange={handleChange}
              value={school}
            />
          </div>
          <div>
            <div>
              <label>Level: </label>
              <input
                type="number"
                className="form-input-level"
                name="level"
                onChange={handleChange}
                value={level}
              />
              <label>Range: </label>
              <input
                className="form-input-range"
                name="range"
                onChange={handleChange}
                value={range}
              />
              <label>Duration: </label>
              <input
                className="form-input-duration"
                name="duration"
                onChange={handleChange}
                value={duration}
              />
              <label>AoE: </label>
              <input
                className="form-input-aoe"
                name="aoe"
                onChange={handleChange}
                value={aoe}
              />
            </div>
            <div>
              <label>Class: </label>
              <input
                className="form-input-classs"
                name="classs"
                onChange={handleChange}
                value={classs}
              />
              <label>Components: </label>
              <input
                className="form-input-components"
                name="components"
                onChange={handleChange}
                value={components}
              />
              <label>Casting Time: </label>
              <input
                className="form-input-castingTime"
                name="castingTime"
                onChange={handleChange}
                value={castingTime}
              />
              <label>Saving Throw: </label>
              <input
                className="form-input-savingThrow"
                name="savingThrow"
                onChange={handleChange}
                value={savingThrow}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                defaultValue={tempDescription}
                onChange={handleChange}
                placeholder="tempDescription"
                name="tempDescription"
                rows="20"
                cols="80"
              ></textarea>
            </div>
          </div>
          <div className="form-inner-container">
            <button className="form-submit" type="submit">
              Submit
            </button>
            <Link className="form-cancel" to="/">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  addSpell: (spell) => dispatch(postFirebaseSpell(spell, history)),
});

export default connect(null, mapDispatchToProps)(CreateSpell);
