import { loadHeaderFooter } from "./utils.mjs";
import { displayDetails, initDd, statSelection, statListener, updateSprite } from "./pokemonData";



loadHeaderFooter();
displayDetails();
initDd();
statSelection();
statListener();
updateSprite();