import React from "react";
import { Link } from "react-router-dom";

const createSpellMonster = () => {
  return (
    <div className="createSpellMonster-contianer">
      <div className="custom-spell-monster-container">
        <Link className="custom" to="./customSpell">
          Create Custom Spell
        </Link>
        <Link className="custom" to="./monsters/customMonster">
          Create Custom Monster
        </Link>
      </div>
      <Link className="custom" to="./copyPasteSpellMonster">
        Create spell or monster from copy
      </Link>
    </div>
  );
};

export default createSpellMonster;
