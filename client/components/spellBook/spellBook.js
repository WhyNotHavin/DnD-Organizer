import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { putSpell, removeSpell } from "../../store/user";

const SpellBook = (props) => {
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

  const handleSpellLevel = (level) => {
    level = String(level);
    if (level[level.length - 1] === "1") {
      return level + "st lvl";
    } else if (level[level.length - 1] === "2") {
      return level + "nd lvl";
    } else if (level === "3") {
      return level + "rd lvl";
    } else {
      return level + "th lvl";
    }
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
            <select name="school" value={filter.school} onChange={handleChange}>
              <option value="Abjuration">Abjuration</option>
              <option value="Alteration">Alteration</option>
              <option value="Conjuration/Summoning">
                Conjuration/Summoning
              </option>
              <option value="Enchantment/Charm">Enchantment/Charm</option>
              <option value="Illusion/Phantasm">Illusion/Phantasm</option>
              <option value="Invocation/Evocation">Invocation/Evocation</option>
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

        <div>
          <button>Logout</button>
          <Link to="/">Prepared</Link>
        </div>
      </div>
      <div className="spell-book-container">
        {console.log(userSpellList)}
        {userSpellList.map((spell) => {
          return (
            <div className="spell-book-inner-container">
              <Link
                to={"/my/spell-book/" + spell.name}
                className="spell-book-inner-container-details"
              >
                <div>{spell.name}</div>
                <div className="spell-book-inner-container-details-count">
                  {handleSpellLevel(spell.level)}
                </div>
              </Link>
              <div className="spell-book-inner-container-details">
                <>
                  <button className="spell-book-inner-container-details">
                    Prepare
                  </button>
                </>
                <div className="spell-book-inner-container-details-count">
                  x0
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpellBook);
