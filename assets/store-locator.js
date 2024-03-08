async function getData() {
  const API_KEY = 'AIzaSyCBhewbeu1FV2o4LQkbfSkSCgGM0oRa8jQ';
  const SPREADSHEET_ID = '1YliWZ-Gu8mC99Bts_LhOkRjMQz1bEHhZL9_0ECjXyEI';
  const RANGE = 'Sheet1';
  const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}`;
  const queryString = `?key=${API_KEY}&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING`;

  const url = `${BASE_URL}${queryString}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const rows = data.values;
      const [header, ...dataRows] = rows;
      // console.log(dataRows)

      let userSelection = [];

      const unqCategory = [];
      const unqState = [];
      const unqCity = [];

      const categoryResult = dataRows.find((row) => {
        if (!unqCategory.includes(row[1])) {
          unqCategory.push(row[1]);
        }
        if (!unqState.includes(row[3])) {
          unqState.push(row[3]);
        }
        if (!unqCity.includes(row[4])) {
          unqCity.push(row[4]);
        }
      });

      let cagryEl = document.getElementById('category-list');
      let stateEl = document.getElementById('state-list');
      let cityEl = document.getElementById('city-list');
      let locationListEl = document.getElementById('locations-list');

      unqCategory.forEach((eachCategory) => {
        let categoryOption = document.createElement('option');
        categoryOption.value = eachCategory;
        categoryOption.textContent = eachCategory;
        cagryEl.appendChild(categoryOption);
        // console.log(eachCategory);
      });

      cagryEl.addEventListener('change', (e) => {
        const userCategoryValue = e.target.value;
        stateEl.value = ""
        cityEl.value = ""
        if (!userSelection.includes(userCategoryValue)) {
          userSelection.push(userCategoryValue);
        }
        const unqState = [];
        dataRows.find((row) => {
          if (row[1] === userCategoryValue) {
            if (!unqState.includes(row[3])) {
              unqState.push(row[3]);
            }
          }
        });

        unqState.forEach((eachCategory) => {
          let stateOption = document.createElement('option');
          stateOption.value = eachCategory;
          stateOption.textContent = eachCategory;
          stateEl.appendChild(stateOption);
          // console.log(eachCategory);
        });

        stateEl.addEventListener('change', (e) => {
          const stateValue = e.target.value;
          cityEl.innerHTML=""

          if (!userSelection.includes(stateValue)) {
            userSelection.push(stateValue);
          }

          const unqCitis = [];
          dataRows.find((row) => {
            if (row[3] === stateValue) {
              if (!unqCitis.includes(row[4])) {
                unqCitis.push(row[4]);
              }
            }
          });

          // console.log(unqCitis)

          unqCitis.innerHTML = ""
          unqCitis.forEach((eachCategory) => {
            let cityOption = document.createElement('option');
            cityOption.value = eachCategory;
            cityOption.textContent = eachCategory;
            cityEl.appendChild(cityOption);
            // console.log(eachCategory);

            cityEl.addEventListener('change', (e) => {
              const cityValue = e.target.value;

              if (!userSelection.includes(cityValue)) {
                userSelection.push(cityValue);
              }
            });
          });
        });
      });

      let btn = document.getElementById('locator-button');
      btn.addEventListener('click', () => {
        const userCategoryValue = cagryEl.value;
        const userStateValue = stateEl.value;
        const userCityValue = cityEl.value;

        let locationData = [];
        dataRows.find((eachRow) => {
          if (eachRow[1] === userCategoryValue && eachRow[3] === userStateValue && eachRow[4] === userCityValue) {
            locationData.push(eachRow);
          }
        });

        console.log(locationData);

        locationListEl.innerHTML = '';
        if (locationData.length===0){
          locationListEl.innerHTML =`<p>No Locations Found</p>`
        }else{

          locationData.forEach((each) => {
            locationListEl.innerHTML += `
            <li class="store-locator__list-item grid__item">
            <h2 class="store-locator__heading">${each[2]}</h2>
            <h2 class="store-locator__place">${each[9]}</h2>
            <h2 class="store-locator__timer">${each[8]}</h2>
            <h2 class="store-locator__phone">${each[11]}</h2>
            <a href="tel:${each[11]}">
            <button class="loction-call" >Call Store</button>
            </a>
            </li>
            
            `;
          });
        }
        });
    })
    .catch((error) => console.error(error));
}

getData();
