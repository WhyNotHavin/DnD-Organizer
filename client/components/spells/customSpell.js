import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postFirebaseSpell } from "../../store/spells";

function CreateSpell(props) {
  const [form, setValues] = useState({
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
    sphere: "",
    description: [],
    tempDescription: "",
  });

  const handleChange = (evt) => {
    if (evt.target.name === "tempDescription") {
      let newDiscription = evt.target.value.split(/\n/g) || [];
      setValues({
        ...form,
        description: newDiscription,
      });
    } else {
      setValues({
        ...form,
        [evt.target.name]: evt.target.value,
      });
    }
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.addSpell(form);
  };
  return (
    <form className="flex-container" onSubmit={handleSubmit}>
      <div className="custom-spell-header">Create a new spell!</div>
      <div className="custom-spell-container">
        <div className="custom-spell-container-details">
          <div className="custom-spell-inner-container-details">
            <div className="custom-spell-detail">
              <label>Name: </label>
              <input
                className="form-input-custom-spell"
                name="name"
                onChange={handleChange}
                value={form.name}
              />
            </div>
            <div className="custom-spell-detail">
              <label>School: </label>
              <input
                className="form-input-custom-spell"
                name="school"
                onChange={handleChange}
                value={form.school}
              />
            </div>
            <div className="custom-spell-detail">
              <label>Sphere: </label>
              <input
                className="form-input-custom-spell"
                name="sphere"
                onChange={handleChange}
                value={form.sphere}
              />
            </div>
            <div className="custom-spell-detail">
              <label>Level: </label>
              <input
                type="number"
                className="form-input-custom-spell"
                name="level"
                onChange={handleChange}
                value={form.level}
              />
            </div>
            <div className="custom-spell-detail">
              <label>Range: </label>
              <input
                className="form-input-custom-spell"
                name="range"
                onChange={handleChange}
                value={form.range}
              />
            </div>
            <div className="custom-spell-detail">
              <label>Duration: </label>
              <input
                className="form-input-custom-spell"
                name="duration"
                onChange={handleChange}
                value={form.duration}
              />
            </div>
          </div>
          <div className="custom-spell-inner-container-details">
            <div className="custom-spell-detail">
              <label>AoE: </label>
              <input
                className="form-input-custom-spell"
                name="aoe"
                onChange={handleChange}
                value={form.aoe}
              />
            </div>
            <div className="custom-spell-detail">
              <label>Class: </label>
              <input
                className="form-input-custom-spell"
                name="classs"
                onChange={handleChange}
                value={form.classs}
              />
            </div>
            <div className="custom-spell-detail">
              <label>Components: </label>
              <input
                className="form-input-custom-spell"
                name="components"
                onChange={handleChange}
                value={form.components}
              />
            </div>
            <div className="custom-spell-detail">
              <label className="custom-spell-labels">Casting Time: </label>
              <input
                className="form-input-custom-spell"
                name="castingTime"
                onChange={handleChange}
                value={form.castingTime}
              />
            </div>
            <div className="custom-spell-detail">
              <label className="custom-spell-labels">Saving Throw: </label>
              <input
                className="form-input-custom-spell"
                name="savingThrow"
                onChange={handleChange}
                value={form.savingThrow}
              />
            </div>
            <div className="custom-spell-detail">
              <label>Damage: </label>
              <input
                className="form-input-custom-spell"
                name="damage"
                onChange={handleChange}
                value={form.damage}
              />
            </div>
          </div>
        </div>
        <div className="custom-spell-inner-container-details">
          <label></label>
          <textarea
            className="custom-spell-description"
            defaultValue={form.tempDescription}
            onChange={handleChange}
            placeholder="Spell Description"
            name="tempDescription"
            rows="20"
            cols="100"
          ></textarea>
        </div>

        <div className="custom-spell-inner-container-details">
          <button className="custom-spell-submit" type="submit">
            Submit
          </button>
          <div>
            <Link className="custom-spell-cancel" to="/">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch, { history }) => ({
  addSpell: (spell) => dispatch(postFirebaseSpell(spell, history)),
});

export default connect(null, mapDispatchToProps)(CreateSpell);
