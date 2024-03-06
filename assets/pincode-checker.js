class PincodeChecker extends HTMLElement {
  constructor() {
      super();
      this.button = this.querySelector('button');
      this.input = this.querySelector('input');
      this.failureNode = this.querySelector('[data-pincode-failure]')
      this.successNode = this.querySelector('[data-pincode-success]')
      this.estDeliveryNode = this.querySelector('[data-pincode-estdelivery]')

      // Disabling the ATC and Buy now button by default.
      // this.disableAddButton(true)

      // Check if data is already available in local storage, if yes, then use it.
      // Otherwise fetch the data from google sheets.
      this.data = JSON.parse(localStorage.getItem('pincodeSheetData')) || this.fetchSheetsData();

      this.reuseLocalStorageData();
      this.button.addEventListener('click', () => this.checkPincodeAvailability());
  }

  async checkPincodeAvailability() {
      const pincode = this.input.value.trim();
      this.querySelectorAll('p').forEach(elem => elem.classList.add('hidden'))

      // Validate the pincode
      if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
          alert('Please enter a valid 6-digit pincode');
          return;
      }

      try {
          const [header, result] = await this.filterDataFromGoogleSheet(pincode);

          if (result) {
              const deliverableIndex = header.indexOf('Deliverable');
              const EstDeliveryNode = this.querySelector('[data-pincode-estdelivery]')

              if (result[deliverableIndex] === 'TRUE') {
                  this.successNode.classList.remove('hidden');

                  const estDaysIndex = header.indexOf('Est Days');
                  this.estDeliveryNode.textContent = EstDeliveryNode.textContent.replace('[est_Days]', result[estDaysIndex])
                  this.estDeliveryNode.classList.remove('hidden');
                  
                  localStorage.setItem('pincode', pincode);

                  // Enabling the ATC and Buy now button.
                  // this.disableAddButton(false)
              } else {
                  this.failureNode.classList.remove('hidden');
                  // this.disableAddButton(true)
              }

          } else {
              this.failureNode.classList.remove('hidden');
              console.error('Pincode not found on sheet')
          }
      } catch (error) {
          console.error(error);
      }
  }

  async filterDataFromGoogleSheet(pincode) {
      this.data = await this.fetchSheetsData();
      
      const rows = this.data.values;
      const [header, ...dataRows] = rows;
      const result = dataRows.find(row => row[0] === pincode);

      return [header, result];
  }

  fetchSheetsData() {
      if (this.data) return this.data;

      const API_KEY = 'AIzaSyCBhewbeu1FV2o4LQkbfSkSCgGM0oRa8jQ';
      const SPREADSHEET_ID = '1orXoiiLg-sPxlcxkl6m5KanCG2WHGxi-yEGZ4O_JUxw';
      const RANGE = 'Sheet1';
      const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}`;
      const queryString = `?key=${API_KEY}&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING`;

      const url = `${BASE_URL}${queryString}`;
      return fetch(url)
          .then(response => response.json())
          .then(data => {
              // Store the data in local storage
              localStorage.setItem('pincodeSheetData', JSON.stringify(data));
              return data;
          })
          .catch(error => console.error(error));
  }

  reuseLocalStorageData() {
      if (!localStorage.getItem('pincode')) return; 

      this.input.value = localStorage.getItem('pincode')
      this.checkPincodeAvailability()
  }

  disableAddButton(disable) {
      document.querySelector('variant-radios')?.toggleAddButton(disable, 'Add pincode')
      document.querySelector('variant-selects')?.toggleAddButton(disable, 'Add pincode')

      document.querySelectorAll('form[action="/cart/add"] button').forEach( button => {
          if (disable)
              button.setAttribute("title", "Add a pincode to continue!")
          else
              button.removeAttribute("title")
      })
  }
}

customElements.define('pincode-checker', PincodeChecker);