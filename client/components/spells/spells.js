import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Spells = (props) => {
  const spells = props.state.spells || [];

  return (
    <div>
      {" "}
      <div className="filter-container">
        <div>FILTER PLACEHOLDER</div>
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

export default connect(mapStateToProps)(Spells);
