import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { putSpell, removeSpell } from "../../store/user";

const Spells = (props) => {
  const [filter, setFilters] = useState({
    viewFilters: false,
    class: "",
    components: "",
    level: "",
    sphere: "",
    damage: "",
    Abjuration: true,
    Alteration: true,
    ConjurationSummoning: true,
    EnchantmentCharm: true,
    IllusionPhantasm: true,
    InvocationEvocation: true,
    Divination: true,
    Necromancy: true,
    animal: true,
    astral: true,
    chaos: true,
    charm: true,
    combat: true,
    creation: true,
    divination: true,
    elemental: true,
    gaurdian: true,
    healing: true,
    law: true,
    necromantic: true,
    numbers: true,
    plant: true,
    protection: true,
    summoning: true,
    sun: true,
    thought: true,
    time: true,
    travelers: true,
    war: true,
    wards: true,
    weather: true,
  });
  const [search, setSearch] = useState({
    search: "",
  });

  const handleChange = (evt) => {
    let value = evt.target.value;
    if (value === "true") {
      value = true;
    }
    if (value === "false") {
      value = false;
    }
    setFilters({
      ...filter,
      [evt.target.name]: value,
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
  if (filter.damage === true) {
    spells = spells.filter((spell) => spell.damage !== "");
  } else if (!filter.damage) {
    spells = spells.filter((spell) => spell.damage === "");
  } else {
    spells = props.state.spells;
  }

  if (filter.Abjuration === "false") {
    spells = spells.filter((spell) => spell.school !== "Abjuration");
  }
  if (filter.Alteration === "false") {
    spells = spells.filter((spell) => spell.school !== "Alteration");
  }
  if (filter.Divination === "false") {
    spells = spells.filter((spell) => spell.school !== "Divination");
  }
  if (filter.Necromancy === "false") {
    spells = spells.filter((spell) => spell.school !== "Necromancy");
  }
  if (filter.ConjurationSummoning === "false") {
    spells = spells.filter((spell) => spell.school !== "Conjuration/Summoning");
  }
  if (filter.EnchantmentCharm === "false") {
    spells = spells.filter((spell) => spell.school !== "Enchantment/Charm");
  }
  if (filter.IllusionPhantasm === "false") {
    spells = spells.filter((spell) => spell.school !== "Illusion/Phantasm");
  }
  if (filter.InvocationEvocation === "false") {
    spells = spells.filter((spell) => spell.school !== "Invocation/Evocation");
  }
  if (filter.astral === "false") {
    spells = spells.filter((spell) => spell.sphere !== "astral");
  }
  if (filter.chaos === "false") {
    spells = spells.filter((spell) => spell.sphere !== "chaos");
  }
  if (filter.charm === "false") {
    spells = spells.filter((spell) => spell.sphere !== "charm");
  }
  if (filter.combat === "false") {
    spells = spells.filter((spell) => spell.sphere !== "combat");
  }
  if (filter.creation === "false") {
    spells = spells.filter((spell) => spell.sphere !== "creation");
  }
  if (filter.divination === "false") {
    spells = spells.filter((spell) => spell.sphere !== "divination");
  }
  if (filter.elemental === "false") {
    spells = spells.filter((spell) => spell.sphere !== "elemental");
  }
  if (filter.gaurdian === "false") {
    spells = spells.filter((spell) => spell.sphere !== "gaurdian");
  }
  if (filter.healing === "false") {
    spells = spells.filter((spell) => spell.sphere !== "healing");
  }
  if (filter.law === "false") {
    spells = spells.filter((spell) => spell.sphere !== "law");
  }
  if (filter.necromantic === "false") {
    spells = spells.filter((spell) => spell.sphere !== "necromantic");
  }
  if (filter.numbers === "false") {
    spells = spells.filter((spell) => spell.sphere !== "numbers");
  }
  if (filter.plant === "false") {
    spells = spells.filter((spell) => spell.sphere !== "plant");
  }
  if (filter.protection === "false") {
    spells = spells.filter((spell) => spell.sphere !== "protection");
  }
  if (filter.summoning === "false") {
    spells = spells.filter((spell) => spell.sphere !== "summoning");
  }
  if (filter.sun === "false") {
    spells = spells.filter((spell) => spell.sphere !== "sun");
  }
  if (filter.thought === "false") {
    spells = spells.filter((spell) => spell.sphere !== "thought");
  }
  if (filter.time === "false") {
    spells = spells.filter((spell) => spell.sphere !== "time");
  }
  if (filter.travelers === "false") {
    spells = spells.filter((spell) => spell.sphere !== "travelers");
  }
  if (filter.war === "false") {
    spells = spells.filter((spell) => spell.sphere !== "war");
  }
  if (filter.wards === "false") {
    spells = spells.filter((spell) => spell.sphere !== "wards");
  }
  if (filter.weather === "false") {
    spells = spells.filter((spell) => spell.sphere !== "weather");
  }
  console.log(filter);
  return (
    <div>
      <div className="filter-container">
        <div className="flex-container">
          <button className="filter-toggle" onClick={handleFilterToggle}>
            Filter Spells {filter.viewFilters ? "^" : "v"}
          </button>
          {filter.viewFilters ? (
            <div className="filter-inner-container">
              <div className="filter-top-container">
                <div className="filter-top-container-detail">
                  <label>Class: </label>
                  <select
                    className="filter-selection"
                    name="class"
                    value={filter.class}
                    onChange={handleChange}
                  >
                    <option value="all">All</option>
                    <option value="wizard">Wizard</option>
                    <option value="priest">Priest</option>
                  </select>
                </div>
                <div className="filter-top-container-detail">
                  <label>Level: </label>
                  <select
                    className="filter-selection"
                    name="level"
                    value={filter.level}
                    onChange={handleChange}
                  >
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
                <div className="filter-top-container-detail">
                  <label>Does Damage: </label>
                  <select
                    className="filter-selection"
                    name="damage"
                    value={filter.damage}
                    onChange={handleChange}
                  >
                    <option value="either">Either</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
              <div className="filter-bottom-container">
                <div className="filter-button-schools">
                  <div className="filter-botton-school-container">
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.Abjuration}
                        className="checkbox"
                        type="checkbox"
                        name={"Abjuration"}
                        onChange={handleChange}
                        checked={filter.Abjuration}
                      />
                      <label>Abjuration</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.Alteration}
                        className="checkbox"
                        type="checkbox"
                        name={"Alteration"}
                        checked={filter.Alteration}
                        onChange={handleChange}
                      />
                      <label>Alteration</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.Divination}
                        className="checkbox"
                        type="checkbox"
                        name={"Divination"}
                        onChange={handleChange}
                        checked={filter.Divination}
                      />
                      <label>Divination</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.Necromancy}
                        className="checkbox"
                        type="checkbox"
                        name={"Necromancy"}
                        onChange={handleChange}
                        checked={filter.Necromancy}
                      />
                      <label>Necromancy</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.ConjurationSummoning}
                        className="checkbox"
                        type="checkbox"
                        name={"ConjurationSummoning"}
                        onChange={handleChange}
                        checked={filter.ConjurationSummoning}
                      />
                      <label>Conjuration/Summoning</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.EnchantmentCharm}
                        className="checkbox"
                        type="checkbox"
                        name={"EnchantmentCharm"}
                        onChange={handleChange}
                        checked={filter.EnchantmentCharm}
                      />
                      <label>Enchantment/Charm</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.IllusionPhantasm}
                        className="checkbox"
                        type="checkbox"
                        name={"IllusionPhantasm"}
                        onChange={handleChange}
                        checked={filter.IllusionPhantasm}
                      />
                      <label>Illusion/Phantasm</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.InvocationEvocation}
                        className="checkbox"
                        type="checkbox"
                        name={"InvocationEvocation"}
                        onChange={handleChange}
                        checked={filter.InvocationEvocation}
                      />
                      <label>Invocation/Evocation</label>
                    </div>
                  </div>
                </div>
                <div className="filter-bottom-sphere">
                  <div className="filter-botton-school-container">
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.astral}
                        className="checkbox"
                        type="checkbox"
                        name={"astral"}
                        onChange={handleChange}
                        checked={filter.astral}
                      />
                      <label>Astral</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.chaos}
                        className="checkbox"
                        type="checkbox"
                        name={"chaos"}
                        onChange={handleChange}
                        checked={filter.chaos}
                      />
                      <label>Chaos</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.charm}
                        className="checkbox"
                        type="checkbox"
                        name={"charm"}
                        onChange={handleChange}
                        checked={filter.charm}
                      />
                      <label>Charm</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.combat}
                        className="checkbox"
                        type="checkbox"
                        name={"combat"}
                        onChange={handleChange}
                        checked={filter.combat}
                      />
                      <label>Combat</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.creation}
                        className="checkbox"
                        type="checkbox"
                        name={"creation"}
                        onChange={handleChange}
                        checked={filter.creation}
                      />
                      <label>Creation</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.divination}
                        className="checkbox"
                        type="checkbox"
                        name={"divination"}
                        onChange={handleChange}
                        checked={filter.divination}
                      />
                      <label>Divination</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.elemental}
                        className="checkbox"
                        type="checkbox"
                        name={"elemental"}
                        onChange={handleChange}
                        checked={filter.elemental}
                      />
                      <label>Elemental</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.gaurdian}
                        className="checkbox"
                        type="checkbox"
                        name={"gaurdian"}
                        onChange={handleChange}
                        checked={filter.gaurdian}
                      />
                      <label>Gaurdian</label>
                    </div>
                  </div>
                  <div className="filter-botton-school-container">
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.healing}
                        className="checkbox"
                        type="checkbox"
                        name={"healing"}
                        onChange={handleChange}
                        checked={filter.healing}
                      />
                      <label>Healing</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.law}
                        className="checkbox"
                        type="checkbox"
                        name={"law"}
                        onChange={handleChange}
                        checked={filter.law}
                      />
                      <label>Law</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.necromantic}
                        className="checkbox"
                        type="checkbox"
                        name={"necromantic"}
                        onChange={handleChange}
                        checked={filter.necromantic}
                      />
                      <label>Necromantic</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.numbers}
                        className="checkbox"
                        type="checkbox"
                        name={"numbers"}
                        onChange={handleChange}
                        checked={filter.numbers}
                      />
                      <label>Numbers</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.plant}
                        className="checkbox"
                        type="checkbox"
                        name={"plant"}
                        onChange={handleChange}
                        checked={filter.plant}
                      />
                      <label>Plant</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.protection}
                        className="checkbox"
                        type="checkbox"
                        name={"protection"}
                        onChange={handleChange}
                        checked={filter.protection}
                      />
                      <label>Protection</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.summoning}
                        className="checkbox"
                        type="checkbox"
                        name={"summoning"}
                        onChange={handleChange}
                        checked={filter.summoning}
                      />
                      <label>Summoning</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.sun}
                        className="checkbox"
                        type="checkbox"
                        name={"sun"}
                        onChange={handleChange}
                        checked={filter.sun}
                      />
                      <label>Sun</label>
                    </div>
                  </div>
                  <div className="filter-botton-school-container">
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.thought}
                        className="checkbox"
                        type="checkbox"
                        name={"thought"}
                        onChange={handleChange}
                        checked={filter.thought}
                      />
                      <label>Thought</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.time}
                        className="checkbox"
                        type="checkbox"
                        name={"time"}
                        onChange={handleChange}
                        checked={filter.time}
                      />
                      <label>Time</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.travelers}
                        className="checkbox"
                        type="checkbox"
                        name={"travelers"}
                        onChange={handleChange}
                        checked={filter.travelers}
                      />
                      <label>Travelers</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.war}
                        className="checkbox"
                        type="checkbox"
                        name={"war"}
                        onChange={handleChange}
                        checked={filter.war}
                      />
                      <label>War</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.wards}
                        className="checkbox"
                        type="checkbox"
                        name={"wards"}
                        onChange={handleChange}
                        checked={filter.wards}
                      />
                      <label>Wards</label>
                    </div>
                    <div className="filter-input-wrapper">
                      <input
                        value={!filter.weather}
                        className="checkbox"
                        type="checkbox"
                        name={"weather"}
                        onChange={handleChange}
                        checked={filter.weather}
                      />
                      <label>Weather</label>
                    </div>
                  </div>
                </div>
              </div>
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
