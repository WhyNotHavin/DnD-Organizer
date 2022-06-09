import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { putSpell, removeSpell } from "../../store/user";

const Spells = (props) => {
  const [filter, setFilters] = useState({
    viewFilters: false,
    class: "",
    school: "",
    components: "",
    level: "",
    sphere: "",
  });
  const [search, setSearch] = useState({
    search: "",
  });

  const handleChange = (evt) => {
    setFilters({
      ...filter,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleFilterToggle = () => {
    setFilters({
      ...filter,
      viewFilters: !filter.viewFilters,
    });
  };

  let spells = props.state.spells || [];
  let userSpellList = [];
  if (props.state.user.info) {
    userSpellList = props.state.user.info.spellList;
  }
  if (filter.class === "wizard") {
    spells = spells.filter((spell) => spell.classs === "Wizard");
  } else if (filter.class === "priest") {
    spells = spells.filter((spell) => spell.classs === "Priest");
  } else {
    spells = props.state.spells;
  }
  return (
    <div>
      <div className="filter-container">
        <div>
          <button className="filter-toggle" onClick={handleFilterToggle}>
            Toggle Filters
          </button>
          {filter.viewFilters ? (
            <div className="filter-inner-container">
              <label>Class</label>
              <select name="class" value={filter.class} onChange={handleChange}>
                <option value="all">All</option>
                <option value="wizard">Wizard</option>
                <option value="priest">Priest</option>
              </select>
              <label>School</label>
              <select
                name="school"
                value={filter.school}
                onChange={handleChange}
              >
                <option value="Abjuration">Abjuration</option>
                <option value="Alteration">Alteration</option>
                <option value="Conjuration/Summoning">
                  Conjuration/Summoning
                </option>
                <option value="Enchantment/Charm">Enchantment/Charm</option>
                <option value="Illusion/Phantasm">Illusion/Phantasm</option>
                <option value="Invocation/Evocation">
                  Invocation/Evocation
                </option>
                <option value="Divination">Divination</option>
                <option value="Necromancy">Necromancy</option>
              </select>
              {filter.class === "priest" ? (
                <div>
                  <label>Sphere</label>
                  <select
                    name="sphere"
                    value={filter.sphere}
                    onChange={handleChange}
                  >
                    <option value="all">All</option>
                    <option value="animal">Animal</option>
                    <option value="astral">Astral</option>
                    <option value="chaos">Chaos</option>
                    <option value="charm">Charm</option>
                    <option value="combat">Combat</option>
                    <option value="creation">Creation</option>
                    <option value="divination">Divination</option>
                    <option value="elemental">Elemental</option>
                    <option value="gaurdian">Gaurdian</option>
                    <option value="healing">Healing</option>
                    <option value="law">Law</option>
                    <option value="necromantic">Necromantic</option>
                    <option value="numbers">Numbers</option>
                    <option value="plant">Plant</option>
                    <option value="protection">Protection</option>
                    <option value="summoning">Summoning</option>
                    <option value="sun">Sun</option>
                    <option value="thought">Thought</option>
                    <option value="time">Time</option>
                    <option value="travelers">Travelers</option>
                    <option value="war">War</option>
                    <option value="wards">Wards</option>
                    <option value="weather">Weather</option>
                  </select>
                </div>
              ) : (
                <></>
              )}
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
          ) : (
            <></>
          )}
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
                  {spell.aoe.length > 20 ? (
                    <>
                      <div className="spell-detail">Area of Effect:</div>
                      <div className="spell-detail">{spell.aoe}</div>
                    </>
                  ) : (
                    <div className="spell-detail">
                      Area of Effect: {spell.aoe}
                    </div>
                  )}

                  {spell.damage ? (
                    <div className="spell-detail">Damage: {spell.damage}</div>
                  ) : (
                    <></>
                  )}
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
                  {spell.sphere ? (
                    <div className="spell-detail">Sphere: {spell.sphere}</div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="description">
                {descriptions.map((description, ind) => {
                  return <p key={ind}>{description}</p>;
                })}
              </div>
              <div className="spell-buttons">
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
                      onClick={() =>
                        props.addSpell(spell, props.state.user.uid)
                      }
                    >
                      Add to Spell Book
                    </button>
                  </div>
                )}
              </div>
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
