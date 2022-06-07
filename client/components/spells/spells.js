import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { putSpell, removeSpell } from "../../store/user";

const Spells = (props) => {
  const [filter, setFilters] = useState({
    class: "",
    school: "",
    components: "",
    level: "",
  });
  const [search, setSearch] = useState({
    search: "",
  });

  const spells = props.state.spells || [];
  let userSpellList = [];
  if (props.state.user.info) {
    userSpellList = props.state.user.info.spellList;
  }
  const handleChange = (evt) => {
    setFilters({
      ...filter,
      [evt.target.name]: evt.target.value,
    });
  };
  return (
    <div>
      <div className="filter-container">
        <div className="filter-inner-container">
          <label>Class</label>
          <select name="class" value={filter.class} onChange={handleChange}>
            <option value="cleric">Cleric</option>
            <option value="wizard">Wizard</option>
          </select>
          <label>School</label>
          <select name="school" value={filter.school} onChange={handleChange}>
            <option value="Abjuration">Abjuration</option>
            <option value="Alteration">Alteration</option>
            <option value="Conjuration/Summoning">Conjuration/Summoning</option>
            <option value="Enchantment/Charm">Enchantment/Charm</option>
            <option value="Illusion/Phantasm">Illusion/Phantasm</option>
            <option value="Invocation/Evocation">Invocation/Evocation</option>
            <option value="Divination">Divination</option>
            <option value="Necromancy">Necromancy</option>
          </select>
          <label>Level</label>
          <select name="level" value={filter.level} onChange={handleChange}>
            <option value="1">1st level {"&"} greater</option>
            <option value="2">2nd level {"&"} greater</option>
            <option value="3">3rd level {"&"} greater</option>
            <option value="4">4th level {"&"} greater</option>
            <option value="5">5th level {"&"} greater</option>
            <option value="6">6th level {"&"} greater</option>
            <option value="7">7th level {"&"} greater</option>
            <option value="8">8th level {"&"} greater</option>
            <option value="9">9th level {"&"} greater</option>
            <option value="10">10th level</option>
          </select>
        </div>
        <div id="total-spells">Current Total: {spells.length}</div>
        <Link
          className="create-new-spell"
          params={{ testvalue: "hello" }}
          to="/spells/create"
        >
          Create A New Spell
        </Link>
      </div>
      <div id="main">
        {spells.map((spell) => {
          let descriptions = [];
          if (spell.description) {
            descriptions = spell.description;
          }
          return (
            <div key={spell.id} className="spell-container">
              <div className="spell-header">
                <Link to={`/spells/${spell.id}`} className="spell-header">
                  {spell.name}
                </Link>
                <div className="spell-school">
                  {"("}
                  {spell.school}
                  {")"}
                </div>
              </div>
              <div className="details-container">
                <div>
                  <div className="spell-detail">Level: {spell.level}</div>
                  <div className="spell-detail">Range: {spell.range}</div>
                  <div className="spell-detail">Duration: {spell.duration}</div>
                  <div className="spell-detail">
                    Area of Effect: {spell.aoe}
                  </div>
                </div>
                <div>
                  <div className="spell-detail">Class: {spell.classs}</div>
                  <div className="spell-detail">
                    Components: {spell.components}
                  </div>
                  <div className="spell-detail">
                    Casting Time: {spell.castingTime}
                  </div>
                  <div className="spell-detail">
                    Saving Throw: {spell.savingThrow}
                  </div>
                </div>
              </div>
              <div className="description">
                {descriptions.map((description, ind) => {
                  return <p key={ind}>{description}</p>;
                })}
              </div>
              {userSpellList.includes(spell) ? (
                <div>
                  <button
                    onClick={() =>
                      props.removeSpell(spell, props.state.user.uid)
                    }
                  >
                    Remove from Spell Book
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => props.addSpell(spell, props.state.user.uid)}
                  >
                    Add to Spell Book
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  addSpell: (spell, id) => dispatch(putSpell(spell, id)),
  removeSpell: (spell, id) => dispatch(removeSpell(spell, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Spells);
