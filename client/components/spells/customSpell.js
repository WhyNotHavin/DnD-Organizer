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
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Name: </label>
          <input
            className="form-input-name"
            name="name"
            onChange={handleChange}
            value={form.name}
          />
          <label>School: </label>
          <input
            className="form-input-school"
            name="school"
            onChange={handleChange}
            value={form.school}
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
              value={form.level}
            />
            <label>Range: </label>
            <input
              className="form-input-range"
              name="range"
              onChange={handleChange}
              value={form.range}
            />
            <label>Duration: </label>
            <input
              className="form-input-duration"
              name="duration"
              onChange={handleChange}
              value={form.duration}
            />
            <label>AoE: </label>
            <input
              className="form-input-aoe"
              name="aoe"
              onChange={handleChange}
              value={form.aoe}
            />
          </div>
          <div>
            <label>Class: </label>
            <input
              className="form-input-classs"
              name="classs"
              onChange={handleChange}
              value={form.classs}
            />
            <label>Components: </label>
            <input
              className="form-input-components"
              name="components"
              onChange={handleChange}
              value={form.components}
            />
            <label>Casting Time: </label>
            <input
              className="form-input-castingTime"
              name="castingTime"
              onChange={handleChange}
              value={form.castingTime}
            />
            <label>Saving Throw: </label>
            <input
              className="form-input-savingThrow"
              name="savingThrow"
              onChange={handleChange}
              value={form.savingThrow}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              defaultValue={form.tempDescription}
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

const mapDispatchToProps = (dispatch, { history }) => ({
  addSpell: (spell) => dispatch(postFirebaseSpell(spell, history)),
});

export default connect(null, mapDispatchToProps)(CreateSpell);
