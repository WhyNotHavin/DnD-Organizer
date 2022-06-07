import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const SingleSpell = (props) => {
  console.log(props);
  const spellList = props.state.user.info.spellList || {};
  let spell = {};

  for (let i = 0; i < spellList.length; i++) {
    if (spellList[i].name === props.match.params.id) {
      spell = spellList[i];
    }
  }
  console.log(spellList[0]);
  console.log(spell);
  return (
    <div>
      {spell.name ? (
        <div>
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
              <div className="spell-detail">Area of Effect: {spell.aoe}</div>
              {spell.damage ? (
                <div className="spell-detail">Damage: {spell.damage}</div>
              ) : (
                <></>
              )}
            </div>
            <div>
              <div className="spell-detail">Class: {spell.classs}</div>
              <div className="spell-detail">Components: {spell.components}</div>
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
          <div className="single-spell-description">
            {spell.description.map((description, ind) => {
              return <p key={ind}>{description}</p>;
            })}
          </div>
          <div className="single-spell-buttons">
            <button>Edit</button>
            <button>Remove</button>
          </div>
        </div>
      ) : (
        <div>You don't have this spell!</div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(SingleSpell);
