/* --------------Global Vars--------------
* json_headers: indices for indexing into json entries
* tables: object for all DOM manipulation; is used to load json data to screen
* main_page: object for displaying the main page instead of tables
* img: this is the stroke order image that appears on overing over the characters in stroke order
* radical_link_base: this base is used for auto generating radical decomp wiki entries 
* stroke_link_base: this base is used for auto generating stroke order gifs
*/ 
const json_headers = [`character`, `pinyin`, `english`, `grammar`, `example_zh`, `example_en`];
const tables = document.querySelector(`.tables`);
const main_page = document.querySelector(`.mainpage`);
const img = document.querySelector(`.stroke_order_image`);
const search_bar = document.querySelector(`.search`);
const radical_link_base = `https://www.dong-chinese.com/wiki/`;
const stroke_link_base = `https://www.strokeorder.com/assets/bishun/animation/`;
let search_table = document.createElement(`table`);
/* -------------------------------------- */


/* --------------onload--------------
* @params none
* @return none
* @description automatically sets up navbar based on `./conf/nav_conf.json` and json rendering system based on the text content of buttons entered
*/
window.onload = () => {
    fetch(`./conf/nav_conf.json`)
        .then((data) => { return data.json(); })
        .then((json) => {
            const navbar = document.querySelector(`.navbar`);
            navbar.textContent = ``;
            for (const i of json) { // Looping through rows
                const temp_ul = document.createElement(`ul`);
                temp_ul.setAttribute(`class`, `navbarrow`);
                for (const j of i) { // Looping through each cell of a certain row
                    const temp_li = document.createElement(`li`);
                    temp_li.setAttribute(`class`, `navitem`);
                    const temp_button_nav = document.createElement(`button`);
                    temp_button_nav.setAttribute(`class`, `navbutton`);
                    temp_button_nav.textContent = j.cell_name;
                    temp_li.appendChild(temp_button_nav);
                    const temp_div = document.createElement(`div`);
                    temp_div.setAttribute(`class`, `navdropdownmenu`);
                    for (const k of j.cell_dropdown_names) { // Looping through each drop down menu item of a certain cell
                        const temp_button = document.createElement(`button`);
                        temp_button.textContent = k;
                        temp_div.appendChild(temp_button);
                    }
                    temp_li.appendChild(temp_div);
                    temp_ul.appendChild(temp_li);
                }
                navbar.appendChild(temp_ul);
            }
            const btns = document.querySelectorAll(`.navdropdownmenu button`);
            for (const i of btns) {
                i.setAttribute(`onclick`, `getOtherPage(this.getAttribute('id'))`);
                if (!i.getAttribute(`id`))
                    i.setAttribute(`id`, `${i.textContent.toLowerCase().replace(` `, `_`)}.json`);
            }
            console.log(`LOG: Loaded successfully!`);
        })
        .catch((err) => { console.log(`LOG: Error in page load: ${err}`);});
}
/* ---------------------------------- */

/* --------------getMainPage--------------
* @params `keypress`: ties the event to when a key is entered
* @return none
* @description runs the search function for every json available
*/
search_bar.addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const search_text = search_bar.value;
        const btns = document.querySelectorAll(`.navdropdownmenu button`);
        search_table.textContent = ``;
        tables.textContent = ``;
        for (const i of btns) {
            fetch(`./jsons/${i.id}`)
                .then((data) => { return data.json(); })
                .then((json) => {
                    readJsonData(json, search_text);
                    //console.log(`${i.id} of table ${search_table} had\n${tables.textContent}`);   
                })
                .catch(() => { /*console.log(`${i.id} of table ${search_table} had\n${tables.textContent}`);*/ });
        }
        search_bar.value = ``;
    }
});


/* --------------getMainPage--------------
* @params none
* @return none
* @description renders main page instead of grammar tables. This is called from clicking the `Chinese Notes` title.
*/
function getMainPage() {
    main_page.style.display = `unset`;
    tables.style.display = `none`;
}
/* ---------------------------------------- */



/* --------------getOtherPage--------------
* @params name: the name of the json file that must be rendered
* @return none
* @description renders json data by displaying it as grammar tables. This is called from clicking stuff in the nav bar. 
*/
function getOtherPage(name) {
    fetch(`./jsons/${name}`)
        .then((data) => { return data.json(); })
        .then((json) => {
            console.log(`LOG: Reading json ${name}`);
            readJsonData(json);
        })
        .catch((err) => {
            console.log(`LOG: error in ${name}: ${err}`);
            getMainPage();
        });
    search_bar.value = ``;
}
/* ---------------------------------------- */



/* --------------addImageEventListeners--------------
* @params none
* @return none
* @description adds event listeners to display the popup gif of stroke order for all hyperlinked characters in the stroke order column 
*/
function addImageEventListeners() {
    const temp_as_stroke = document.querySelectorAll(`.stroke_order_and_radical_info p a`);
    for (const i of temp_as_stroke) {
        i.addEventListener(`mouseenter`, () => {
            img.setAttribute(`src`, i.getAttribute(`id`));
            img.setAttribute(`alt`, `rendering...`);
            const img_rect = i.getBoundingClientRect();
            const img_width = Math.ceil(img_rect.right-img_rect.left);
            img.style.left = `${Math.floor((img_width/2)+img_rect.left-(parseInt(img.getAttribute(`width`), 10)/2))}px`;
            img.style.top = `${Math.floor(img_rect.top+21)}px`;
            img.style.display = `unset`;
        });
        i.addEventListener(`mouseleave`, () => {
            img.setAttribute(`src`, ``);
            img.setAttribute(`alt`, ``);
            img.style.display = `none`;
        });
    }
}
/* -------------------------------------------------- */



/* --------------populate--------------
* @params tr: the header row that needs to be filled with the <td>s we want to display
* @return none
* @description adds each element in `headers` as a table header (<th>) for each table
*/
function populate(tr) {
    const headers = [`Character`, `Pinyin`, `English`, `Grammar`, `Example Usage [CHIN]`, `Example Usage [ENG]`, `Stroke Order & Radical Info`];
    for (const i of headers) {
        let temp_th = document.createElement(`th`);
        temp_th.innerText = i;
        tr.appendChild(temp_th);
    }
}
/* ------------------------------------ */


/* --------------readJsonData--------------
* @params json: the json data to be parsed
* @params search?: the search string if entered.
* @return none
* @description iterates through the json and enters in data to the DOM table based on whether the data is in the search string. If there is no search string, it enters everything.
*/
function readJsonData(json, search=``) {
    let table = null;
    const is_search_empty = (search === ``);
    if (is_search_empty) tables.textContent = ``;
    for (const i of json) { // iterates through all rows entered in the json
        if (is_search_empty) {
            if (i.head) { // if head text exists, separate tables and add in a header html element
                const temp_h2 = document.createElement(`h2`);
                temp_h2.textContent = i.head;
                tables.appendChild(temp_h2);
            } if (i.head || !table) { // if there was a header or there is no table, create a new table to add json data to
                table = document.createElement(`table`);
                const t_headers = document.createElement(`tr`);
                populate(t_headers);
                table.appendChild(t_headers);     
                tables.appendChild(table);   
            }
        } else { 
            if (!document.querySelector(`.tables h2`)) {
                const temp_h2 = document.createElement(`h2`);
                temp_h2.textContent = `Results for "${search}"`;
                tables.appendChild(temp_h2);
            } 
            if (!document.querySelector(`table`)) {
                const t_headers = document.createElement(`tr`);
                populate(t_headers);
                search_table.appendChild(t_headers);     
                tables.appendChild(search_table);  
            }
        }
        const temp_tr = document.createElement(`tr`);
        let search_flag = false;
        for (let j = 0; j < json_headers.length; j++) { // iterates through all json elements (all cells for the row)
            if (!search_flag && i[json_headers[j]].toLowerCase().includes(search.toLowerCase())) search_flag = true;
            const temp_td = document.createElement(`td`);
            temp_td.setAttribute(`class`, `${json_headers[j]}`);
            temp_td.textContent = i[json_headers[j]];
            temp_tr.appendChild(temp_td);
        }
        if (is_search_empty || search_flag) {
            const temp_p_radstroke = document.createElement(`p`);
            let chars_list = [];
            for (let k = 0; k < i[json_headers[0]].length; k++) { // iterates through Chinese characters and generates stroke order gifs and radical composition links
                if ((i[json_headers[0]][k] === `/`) || (chars_list.includes(i[json_headers[0]][k]))) continue;
                else chars_list.push(i[json_headers[0]][k]);
                if (k !== 0) temp_p_radstroke.innerHTML += `，`;
                const temp_a_radstroke = document.createElement(`a`);
                temp_a_radstroke.setAttribute(`id`, `${stroke_link_base}${i[json_headers[0]].charCodeAt(k)}.gif`);
                temp_a_radstroke.setAttribute(`href`, `${radical_link_base}${i[json_headers[0]][k]}`);
                temp_a_radstroke.setAttribute(`target`, `_blank`);
                temp_a_radstroke.textContent += i[json_headers[0]][k];
                temp_p_radstroke.appendChild(temp_a_radstroke);
            }
            const temp_td_radstroke = document.createElement(`td`);
            temp_td_radstroke.setAttribute(`class`, `stroke_order_and_radical_info`);
            temp_td_radstroke.appendChild(temp_p_radstroke);
            temp_tr.appendChild(temp_td_radstroke);
            if (is_search_empty) table.appendChild(temp_tr);
            else search_table.appendChild(temp_tr);
        }
    }
    addImageEventListeners(); // adds event listeners to all stroke order gifs to make them display when hovering over the hyper links
    main_page.style.display = `none`;
    tables.style.display = `unset`;
    return;
}
/* ----------------------------------------- */