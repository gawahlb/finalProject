import { loadHeaderFooter } from "./utils.mjs";
import { displayDetails, initDd, statSelection, statListener, updateSprite, captureView } from "./pokemonData";
import { displaySaved } from "./saved.js";

loadHeaderFooter();
displayDetails();
initDd();
statSelection();
statListener();
updateSprite();
displaySaved();