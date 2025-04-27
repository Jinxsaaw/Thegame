import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const MONSTER_ATTACKS = [
  {
    name: "Fire",
    min: 30,
    max: 90,
    difficulityScale: "easy",
    critChance: 0.4,
    critMultiplier: 1.25,
  },
  {
    name: "Fire",
    min: 30,
    max: 90,
    difficulityScale: "medium",
    critChance: 0.5,
    critMultiplier: 1.5,
  },
  {
    name: "Fire",
    min: 30,
    max: 90,
    difficulityScale: "hardCore",
    critChance: 0.6,
    critMultiplier: 1.75,
  },
  {
    name: "Arcane",
    min: 80,
    max: 140,
    difficulityScale: "easy",
    critChance: 0.4,
    critMultiplier: 1.25,
  },
  {
    name: "Arcane",
    min: 80,
    max: 140,
    difficulityScale: "medium",
    critChance: 0.5,
    critMultiplier: 1.5,
  },
  {
    name: "Arcane",
    min: 80,
    max: 140,
    difficulityScale: "hardCore",
    critChance: 0.6,
    critMultiplier: 1.75,
  },
  {
    name: "Shadow",
    min: 130,
    max: 200,
    difficulityScale: "easy",
    critChance: 0.4,
    critMultiplier: 1.25,
  },
  {
    name: "Shadow",
    min: 130,
    max: 200,
    difficulityScale: "medium",
    critChance: 0.5,
    critMultiplier: 1.5,
  },
  {
    name: "Shadow",
    min: 130,
    max: 200,
    difficulityScale: "hardCore",
    critChance: 0.6,
    critMultiplier: 1.75,
  },
];
const specificKey = "TATAKAE";
const PLAYER_ATTACKS = {
  min: 60,
  max: 150,
  critChance: 0.4,
  critMultiplier: 1.5,
};
const MAX_PLAYER_HEALTH = 1000;
const Game = ({ name }) => {
  // I optimized it and used one single useState for efficientcy.
  // const [easy, setEasy] = useState(false);
  // const [medium, setMedium] = useState(false);
  // const [hardCore, setHardCore] = useState(false);

  const [introProgressBar, setIntroProgressBar] = useState(true);
  const [damageAlert, setDamageAlert] = useState(true);
  const [secondDamageAlert, setSecondDamageAlert] = useState(true);
  const [playerDmgAlert, setPlayerDmgAlert] = useState(``);
  const [monsterDmgAlert, setMonsterDmgAlert] = useState(``);
  const [difficulityLevel, setDifficulityLevel] = useState("");
  const [monsterHealth, setMonsterHealth] = useState(0);
  const [maxMonsterHealth, setMaxMonsterHealth] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(0);
  const [taunt, setTaunt] = useState("");
  const [monsterAttacks, setMonsterAttacks] = useState([]);
  const location = useLocation();

  const handleDifficulityLevel = (difficulity, healthPool) => {
    setDifficulityLevel(difficulity);
    setMonsterHealth(healthPool);
    setMaxMonsterHealth(healthPool);
    setPlayerHealth(MAX_PLAYER_HEALTH);
    setIntroProgressBar(!introProgressBar);
    setMonsterAttacks(
      MONSTER_ATTACKS.filter((spell) => spell.difficulityScale === difficulity)
    );
  };

  // This is working too hard! There is already an onChange prop for buttons.
  // useEffect(() => {
  //   var easyButton = document.getElementById("easy");
  //   var mediumButton = document.getElementById("medium");
  //   var hardcoreButton = document.getElementById("hardcore");
  //   easyButton.addEventListener("click", function easyGame() {
  //     setEasy(!easy);
  //     setIntroProgressBar(!introProgressBar);
  //   });
  //   mediumButton.addEventListener("click", function mediumGame() {
  //     setMedium(!medium);
  //     setIntroProgressBar(!introProgressBar);
  //   });
  //   hardcoreButton.addEventListener("click", function hardCoreGame() {
  //     setHardCore(!hardCore);
  //     setIntroProgressBar(!introProgressBar);
  //   });
  // }, [easy, medium, hardCore, introProgressBar]);

  // const easyGame = () => {
  //   setEasy(!easy);
  //   setMonsterHealth("1000");
  //   setIntroProgressBar(!introProgressBar);
  // };
  // const mediumGame = () => {
  //   setMedium(!medium);
  //   setMonsterHealth("2000");
  //   setIntroProgressBar(!introProgressBar);
  // };
  // const hardCoreGame = () => {
  //   setHardCore(!hardCore);
  //   setMonsterHealth("3000");
  //   setIntroProgressBar(!introProgressBar);
  // };

  useEffect(() => {
    const handleAttack = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const fight = new Promise((resolve, reject) => {
          let monsterHP = document.getElementById("monster");
          let playerHP = document.getElementById("player");
          if (
            location.pathname === "/game" &&
            specificKey === taunt &&
            1 < monsterHP.value &&
            1 < playerHP.value
          ) {
            let playerCrit = Math.random() < PLAYER_ATTACKS.critChance;
            let playerDamage = playerCrit
              ? Math.floor(
                  Math.random() *
                    PLAYER_ATTACKS.critMultiplier *
                    (PLAYER_ATTACKS.max + PLAYER_ATTACKS.min)
                ) + PLAYER_ATTACKS.min
              : Math.floor(
                  Math.random() * (PLAYER_ATTACKS.max + PLAYER_ATTACKS.min)
                ) + PLAYER_ATTACKS.min;
            let randomElement =
              monsterAttacks[Math.floor(Math.random() * monsterAttacks.length)];
            let monsterCrit = Math.random() < randomElement.critChance;
            let monsterDamage = monsterCrit
              ? Math.floor(
                  Math.random() *
                    randomElement.critMultiplier *
                    (randomElement.max - randomElement.min)
                ) + randomElement.min
              : Math.floor(
                  Math.random() * (randomElement.max - randomElement.min)
                ) + randomElement.min;
            resolve({
              playerAttack: playerCrit
                ? `${name} has dealt ${playerDamage} CRITICAL DAMAGE to Monster`
                : `${name} has dealt ${playerDamage} damage to Monster`,
              monsterAttack: monsterCrit
                ? `Monster has dealt ${monsterDamage} CRITICAL ${randomElement.name} DAMAGE to ${name}`
                : `Monster has dealt ${monsterDamage} ${randomElement.name} damage to ${name}`,
              monsterHP: (monsterHP.value -= playerDamage),
              playerHP: (playerHP.value -= monsterDamage),
            });
          } else {
            reject(`This game is case sensetive mate!`);
          }
        });
        fight
          .then((message) => {
            setPlayerDmgAlert(message.playerAttack);
            setMonsterHealth(message.monsterHP);
            setDamageAlert(!damageAlert);
            return message;
          })
          .then((message) => {
            setTimeout(() => {
              setSecondDamageAlert(!secondDamageAlert);
              setMonsterDmgAlert(message.monsterAttack);
              setPlayerHealth(message.playerHP);
            }, 3000);
          })
          .then(() => {
            setTimeout(() => {
              setSecondDamageAlert(!!secondDamageAlert);
              setDamageAlert(!!damageAlert);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
          });
        const end = new Promise((resolve, reject) => {
          let monsterHP = document.getElementById("monster");
          let playerHP = document.getElementById("player");
          if (
            location.pathname === "/game" &&
            specificKey === taunt &&
            monsterHP.value < 1
          ) {
            resolve({
              victory: `Congratz on your victory {name}!`,
              monsterHP: maxMonsterHealth,
              playerHP: MAX_PLAYER_HEALTH,
            });
          } else if (
            location.pathname === "/game" &&
            specificKey === taunt &&
            playerHP.value < 1
          ) {
            reject({
              lose: `Ops! Better luck next time lad!:P`,
              monsterHP: maxMonsterHealth,
              playerHP: MAX_PLAYER_HEALTH,
            });
          }
        });
        end
          .then((message) => {
            setPlayerDmgAlert(message.victory);
            setMonsterHealth(message.monsterHP);
            setPlayerHealth(message.playerHP);
            setDamageAlert(!damageAlert);
            return message;
          })
          .then(() => {
            setTimeout(() => {
              setDamageAlert(!!damageAlert);
            }, 3000);
          })
          .catch((error) => {
            setPlayerDmgAlert(error.lose);
            setMonsterHealth(error.monsterHP);
            setPlayerHealth(error.playerHP);
            setDamageAlert(!damageAlert);
            setTimeout(() => {
              setDamageAlert(!!damageAlert);
            }, 4000);
          });
      }
    };
    document.addEventListener("keydown", handleAttack);
    return () => {
      document.removeEventListener("keydown", handleAttack);
    };
  }, [taunt]);

  return (
    <>
      <div className="game">
        {introProgressBar && damageAlert && secondDamageAlert && (
          <div className="monster-health">
            <progress className="mons" id="1" value={null}></progress>
          </div>
        )}
        {introProgressBar && damageAlert && secondDamageAlert && (
          <div className="player-health">
            <progress className="plyer" id="2" value={null}></progress>
          </div>
        )}
        {introProgressBar && damageAlert && secondDamageAlert && (
          <div className="container">
            <div className="confirmation-text">
              {`How ready are you, ${name}?`}
            </div>
            <div className="button-container">
              <button
                className="cancel-button"
                id="easy"
                onClick={() => handleDifficulityLevel("easy", "1000")}
              >
                Easy
              </button>
              <button
                className="cancel-button"
                id="medium"
                onClick={() => handleDifficulityLevel("medium", "2000")}
              >
                Medium
              </button>
              <button
                className="cancel-button"
                id="hardcore"
                onClick={() => handleDifficulityLevel("hardCore", "3000")}
              >
                Hardcore
              </button>
            </div>
          </div>
        )}

        {!introProgressBar && (
          <div className="monster-health">
            <span className="healths">Monster's Health:</span>
            <progress
              className="monster1"
              id="monster"
              max={maxMonsterHealth}
              value={monsterHealth}
            ></progress>
            <span className="healths">{monsterHealth}</span>
          </div>
        )}
        {!introProgressBar && (
          <div className="player-health">
            <span className="healths">{playerHealth}</span>
            <progress
              className="player1"
              id="player"
              max="1000"
              value={playerHealth}
            ></progress>
            <span className="healths">:{name}'s Health</span>
          </div>
        )}
        {!introProgressBar && damageAlert && (
          <div className="attack-box">
            <label htmlFor="" className="attack-text">
              {`Ok ${name}!`}
              <br />
              {`Let's start the fight by taunting the boss!`}
              <br />
              {`Type in these words:`}
              <br />
              {`TATAKAE`}
              <br />
            </label>

            <input
              type="text"
              id="taunt"
              value={taunt}
              onChange={(e) => setTaunt(e.target.value)}
            />
          </div>
        )}
        {!damageAlert && secondDamageAlert && (
          <div className="player-dmg-box">
            <div className="player-dmg-text">{playerDmgAlert}</div>
          </div>
        )}
        {!damageAlert && !secondDamageAlert && (
          <div className="monster-dmg-box">
            <div className="monster-dmg-text">{monsterDmgAlert}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
